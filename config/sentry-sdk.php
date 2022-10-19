<?php

use craft\helpers\App;

return [
    '*' => [
        'enabled' => false,
        'anonymous' => false,
        'clientDsn' => App::env('SENTRY_DSN'),
        'excludedCodes' => ['400', '404', '429'],
        'release' => null,
        'reportJsErrors' => true
    ],
    'production' => [
        'enabled' => (bool) App::env('SENTRY_DSN')
    ]
];
