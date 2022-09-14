<?php

namespace Modules\TwigHelpers;

use Craft;
use yii\base\Module;
use Modules\TwigHelpers\TwigExtensions\VitepackTwigExtensions;
use Modules\TwigHelpers\TwigExtensions\TwigHelpersTwigExtension;

class TwigHelpers extends Module
{
    public static $instance;

    /**
     * @inheritdoc
     */
    public function __construct($id, $parent = null, array $config = [])
    {
        Craft::setAlias('Modules/TwigHelpers', $this->getBasePath());

        static::setInstance($this);

        parent::__construct($id, $parent, $config);
    }

    public function init()
    {
        parent::init();
        self::$instance = $this;

        Craft::$app->view->registerTwigExtension(new TwigHelpersTwigExtension());
        Craft::$app->view->registerTwigExtension(new VitepackTwigExtensions());

        Craft::info('twighelpers module loaded', __METHOD__);
    }
}
