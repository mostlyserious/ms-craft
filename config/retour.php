<?php

use craft\helpers\App;

return [
    'createUriChangeRedirects' => App::env('CRAFT_ENVIRONMENT') === 'production'
];
