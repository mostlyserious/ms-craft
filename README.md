# MS Craft

A Craft CMS starter used for new sites built by the [Mostly Serious](https://www.mostlyserious.io) team. It's designed to pair with our build tool, [Brightpack](https://github.com/mostlyserious/brightpack).

> **[Project Technical Documentation](#)**

## Software requirements
- node >= 14.0
- php >= 8.0.2
- mysql >= 5.7.8
- composer >= 2.0

## Setup instructions

> **More detailed instructions can be found in the [MS Craft Package Guide](https://www.notion.so/mostlyserious/MS-Craft-Package-Guide-528990ba0bbb47a7b4408fb2cc25b0ec).**

- Copy `.env.example` to `.env`

- Install php dependencies

```
composer install
```

- Create mysql database and import a SQL dump
    - You can get a SQL dump from prod by logging into the admin and going to Utilities > Backup Database

- Fill in the database credentials in the `.env` file

- Install front-end dependencies
Currently, installation requires [Yarn](https://yarnpkg.com) to work properly.

```shell
yarn
```

- Build front-end dependencies

```shell
yarn build
```

> or

```shell
npm run build
```

- Startup a php server by using Craft's `serve` command, or use a local `.test` domain with [Laravel Valet](https://laravel.com/docs/9.x/valet).

```shell
php craft serve
```
