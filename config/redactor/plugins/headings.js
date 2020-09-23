/* global Redactor */

($R => {
    $R.add('plugin', 'headings', {
        init(app) {
            app.opts.markup = 'h2';
        }
    });
})(Redactor);
