const chalk = require('chalk');
const { suite } = require('uvu');
const assert = require('uvu/assert');
const WebDriver = require('selenium-webdriver');
const AxeBuilder = require('@axe-core/webdriverjs');
const Chrome = require('selenium-webdriver/chrome');

const test = suite('Accessibility');

let driver,
    axe;

test('Home', analyze('https://ms-craft.test'));
// test('Module Listing', analyze('https://ms-craft.test/module-listing'));

test.before(async () => {
    const options = new Chrome.Options().addArguments('--headless');

    driver = await new WebDriver.Builder()
        .setChromeOptions(options)
        .forBrowser('chrome')
        .build();

    axe = await new AxeBuilder(driver);
    axe.exclude('iframe');
});

test.after(async () => {
    await driver.quit();
});

test.run();

function analyze(url, except = []) {
    return async () => {
        axe.disableRules(except);

        await driver.get(url);
        const results = await axe.analyze();

        if (results.violations.length) {
            report(results, except);
        }

        assert.is(results.violations.length, 0);
    };
}

function report(results) {
    console.log(`\n`);
    console.log(chalk.bgCyan.black(` ${results.url} `));

    results.violations.forEach((violation, i) => {
        console.log(chalk.bold.green(`\n${i + 1}.0 ${'-'.repeat(48)}`));
        console.log(chalk.magenta(violation.description));
        console.log(chalk.magenta(violation.help));

        violation.nodes.forEach((node, n) => {
            console.log(`\n`);
            switch (node.impact) {
                case 'minor':
                    console.log(chalk.bold.green(`${i + 1}.${n + 1}`), chalk.bgWhite.black(` ${node.impact} `));
                    break;
                case 'moderate':
                    console.log(chalk.bold.green(`${i + 1}.${n + 1}`), chalk.bgYellow.black(` ${node.impact} `));
                    break;
                case 'serious':
                case 'critical':
                    console.log(chalk.bold.green(`${i + 1}.${n + 1}`), chalk.bgRed.black(` ${node.impact} `));
                    break;
            }
            console.log(chalk.blue(node.html));
            console.log(node.failureSummary);
        });
    });
}
