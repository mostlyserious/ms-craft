<?php

return [
    'modules' => [
        'module' => Modules\App::class,
        'twighelpers' => [
            'class' => Modules\TwigHelpers\TwigHelpers::class
        ]
    ],
   'bootstrap' => [
       'module',
       'twighelpers'
   ],
];
