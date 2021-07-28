<?php

return [
    'apiKey' => getenv('IMGIX_API_KEY'),
    'imgixDomains' => [
        'public' => getenv('IMGIX_HOST')
    ]
];
