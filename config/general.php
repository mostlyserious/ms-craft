<?php

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
            '@web' => getenv('PRIMARY_SITE_URL')
        ]
    ],

    'dev' => [
        'devMode' => true,
        'disallowRobots' => true,
        'enableTemplateCaching' => false,
        'testToEmailAddress' => [
            getenv('SYSTEM_EMAIL_ADDRESS') => getenv('SYSTEM_EMAIL_NAME')
        ]
    ],

    'staging' => [
        'disallowRobots' => true,
        'allowAdminChanges' => false,
        'testToEmailAddress' => [
            getenv('SYSTEM_EMAIL_ADDRESS') => getenv('SYSTEM_EMAIL_NAME')
        ]
    ],

    'production' => [
        'allowAdminChanges' => false
    ]
];
