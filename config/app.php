<?php

return [
    'modules' => [
        'app-module' => Modules\App::class,
        'twighelpers' => [
            'class' => Modules\TwigHelpers\TwigHelpers::class
        ]
    ],
   'bootstrap' => [
       'app-module',
       'twighelpers'
   ],
];
