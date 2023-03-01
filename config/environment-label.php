<?php

use Craft;
use craft\helpers\App;

return [
    'showLabel' => Craft::$app->user->identity->admin,
    'labelText' => App::env('HTTP_HOST'),
    'prefixText' => sprintf('%s | php@%s | ', App::env('CRAFT_ENVIRONMENT'), App::phpVersion()),
    'labelColor' => App::env('CRAFT_ENVIRONMENT') !== 'production'
        ? (App::devMode() ? '#29333d' : '#facc15')
        : '#10b981',
    'textColor' => App::env('CRAFT_ENVIRONMENT') !== 'production'
        ? (App::devMode() ? '#facc15' : '#29333d')
        : '#29333d'
];
