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
        'sendPoweredByHeader' => false,
        'securityKey' => getenv('SECURITY_KEY'),
        'pageTrigger' => 'page/',
        'maxUploadFileSize' => ConfigHelper::sizeInBytes('128M'),
        'errorTemplatePrefix' => '_',
        'enableGql' => false,
        'defaultSearchTermOptions' => array('subLeft' => true, 'subRight' => true),
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
        'testToEmailAddress' => ['devops@mostlyserious.io' => 'Mostly Serious Engineers']
    ],

    'staging' => [
        'disallowRobots' => true,
        'allowAdminChanges' => false
    ],

    'production' => [
        'allowAdminChanges' => false
    ]
];
