<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

use craft\helpers\ConfigHelper;
use craft\helpers\DateTimeHelper;

return [
    '*' => [
        'defaultWeekStartDay' => 1,
        'omitScriptNameInUrls' => true,
        'resourceBasePath' => dirname(__DIR__) . '/web/cpresources',
        'cpTrigger' => 'admin',
        'preventUserEnumeration' => true,
        'securityKey' => getenv('SECURITY_KEY'),
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
            'engineering-logs@mostlyserious.io' => 'Mostly Serious'
        ]
    ],

    'production' => [
        'allowAdminChanges' => false
    ]
];
