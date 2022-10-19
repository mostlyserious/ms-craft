<?php

use craft\helpers\App;
use craft\helpers\ConfigHelper;
use craft\helpers\DateTimeHelper;

return [
    '*' => [
        'defaultWeekStartDay' => 1,
        'omitScriptNameInUrls' => true,
        'resourceBasePath' => dirname(__DIR__) . '/web/cpresources',
        'cpTrigger' => 'admin',
        'preventUserEnumeration' => true,
        'pageTrigger' => 'page/',
        'maxUploadFileSize' => ConfigHelper::sizeInBytes('256M'),
        'errorTemplatePrefix' => '_',
        'enableGql' => false,
        'defaultSearchTermOptions' => ['subLeft' => true, 'subRight' => true],
        'timezone' => 'America/Chicago',
        'previewTokenDuration' => DateTimeHelper::SECONDS_MONTH,
        'aliases' => [
            '@web' => App::env('PRIMARY_SITE_URL')
        ]
    ],

    'dev' => [
        'devMode' => true,
        'disallowRobots' => true,
        'enableTemplateCaching' => false,
        'backupOnUpdate' => false,
        'userSessionDuration' => false,
        'testToEmailAddress' => [
            App::env('SYSTEM_EMAIL_ADDRESS') => App::env('SYSTEM_EMAIL_NAME')
        ]
    ],

    'staging' => [
        'disallowRobots' => true,
        'allowAdminChanges' => false,
        'testToEmailAddress' => [
            App::env('SYSTEM_EMAIL_ADDRESS') => App::env('SYSTEM_EMAIL_NAME')
        ]
    ],

    'production' => [
        'allowAdminChanges' => false
    ]
];
