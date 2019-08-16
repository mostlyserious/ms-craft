# Project Name

Powered by Craft CMS

## Software requirements
- node 8
- npm 6
- php >= 7.2
- mysql 5.7
- composer

## Setup instructions

- Copy `.env.example` to `.env`

- Install php dependencies

        $ composer install

- Create mysql database and import a SQL dump
    - You can get a SQL dump from prod by logging into the admin and going to Utilities > Backup Database

- Fill in the database credentials in the `.env` file

- Install frontend dependencies

        $ npm i

- Build frontend dependencies

        $ npm run build

- Startup a php server by using craft's serve command

        $ ./craft serve
