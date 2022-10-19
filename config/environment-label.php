<?php

use Craft;
use craft\helpers\App;

return [
    'showLabel' => Craft::$app->user->identity->admin,
    'labelText' => App::env('HTTP_HOST'),
    'prefixText' => sprintf('%s | ', App::env('CRAFT_ENVIRONMENT')),
    'suffixText' => sprintf(' | php@%s', App::phpVersion()),
    'labelColor' => App::env('CRAFT_ENVIRONMENT') !== 'production'
        ? (App::devMode() ? '#3c3c3c' : '#facc15')
        : '#10b981',
    'textColor' => App::env('CRAFT_ENVIRONMENT') !== 'production'
        ? (App::devMode() ? '#facc15' : '#3c3c3c')
        : '#3c3c3c'
];
