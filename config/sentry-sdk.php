<?php

return [
    '*' => [
        'enabled' => false,
        'anonymous' => false,
        'clientDsn' => getenv('SENTRY_DSN'),
        'excludedCodes' => ['400', '404', '429'],
        'release' => null,
        'reportJsErrors' => false
    ],
    'production' => [
        'enabled' => true
    ]
];
