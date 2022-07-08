<?php

use Modules\App;
use Modules\TwigHelpers\TwigHelpers;

return [
    'modules' => [
        'module' => App::class,
        'twighelpers' => [
            'class' => TwigHelpers::class
        ]
    ],
   'bootstrap' => [
       'module',
       'twighelpers'
   ],
];
