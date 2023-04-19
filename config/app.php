<?php

use Modules\General;
use Modules\TwigHelpers\TwigHelpers;

return [
    'modules' => [
        'general' => General::class,
        'twighelpers' => TwigHelpers::class
    ],
   'bootstrap' => [
       'general',
       'twighelpers'
   ]
];
