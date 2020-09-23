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
        'cpTrigger' => 'admin',
        'securityKey' => getenv('SECURITY_KEY'),
        'useProjectConfigFile' => true,
        'pageTrigger' => 'page/',
        'maxUploadFileSize' => ConfigHelper::sizeInBytes('128M'),
        'errorTemplatePrefix' => '_',
        'enableGql' => false
    ],

    'dev' => [
        'devMode' => true,
        'disallowRobots' => true,
        'enableTemplateCaching' => false
    ],

    'staging' => [
        'disallowRobots' => true,
        'allowAdminChanges' => false
    ],

    'production' => [
        'allowAdminChanges' => false
    ]
];
