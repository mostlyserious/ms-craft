# MS Craft

A Craft CMS starter used for new sites built by the Mostly Serious team. It's designed to pair with our build tool, [Brightpack](https://github.com/mostlyserious/brightpack).

## Software requirements
- node >= 14.0
- php >= 7.4
- mysql >= 5.7
- composer >= 2.0

## Setup instructions

- Copy `.env.example` to `.env`

- Install php dependencies
```
$ composer install
```

- Create mysql database and import a SQL dump
    - You can get a SQL dump from prod by logging into the admin and going to Utilities > Backup Database

- Fill in the database credentials in the `.env` file

- Install frontend dependencies
```
$ npm i
```

- Build frontend dependencies
```
$ npm run build
```

- Startup a php server by using craft's serve command
```
$ ./craft serve
```
