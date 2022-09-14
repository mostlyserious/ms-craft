<?php

use Modules\Module;
use Modules\TwigHelpers\TwigHelpers;

return [
    'modules' => [
        'module' => Module::class,
        'twighelpers' => TwigHelpers::class
    ],
   'bootstrap' => [
       'module',
       'twighelpers'
   ]
];
