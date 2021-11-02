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

return [
    '*' => [
        'defaultWeekStartDay' => 1,
        'omitScriptNameInUrls' => true,
        'resourceBasePath' => dirname(__DIR__) . '/web/cpresources',
        'cpTrigger' => 'admin',
        'preventUserEnumeration' => true,
        'sendPoweredByHeader' => false,
        'securityKey' => getenv('SECURITY_KEY'),
        'useProjectConfigFile' => true,
        'pageTrigger' => 'page/',
        'maxUploadFileSize' => ConfigHelper::sizeInBytes('128M'),
        'errorTemplatePrefix' => '_',
        'enableGql' => false,
        'timezone' => 'America/Chicago'
    ],

    'dev' => [
        'devMode' => true,
        'disallowRobots' => true,
        'enableTemplateCaching' => false,
        'backupOnUpdate' => false,
        'userSessionDuration' => false
    ],

    'staging' => [
        'disallowRobots' => true,
        'allowAdminChanges' => false
    ],

    'production' => [
        'allowAdminChanges' => false
    ]
];
