<?php

namespace Modules\TwigHelpers;

use Craft;
use yii\base\Module;
use Modules\TwigHelpers\TwigExtensions\BrightpackTwigExtensions;
use Modules\TwigHelpers\TwigExtensions\TwigHelpersTwigExtension;

class TwigHelpers extends Module
{
    public static $instance;

    /**
     * @inheritdoc
     */
    public function __construct($id, $parent = null, array $config = [])
    {
        Craft::setAlias('@modules/twighelpers', $this->getBasePath());

        static::setInstance($this);

        parent::__construct($id, $parent, $config);
    }

    public function init()
    {
        parent::init();
        self::$instance = $this;

        // Add in our Twig extensions
        Craft::$app->view->registerTwigExtension(new TwigHelpersTwigExtension());
        Craft::$app->view->registerTwigExtension(new BrightpackTwigExtensions());

        Craft::info('twighelpers module loaded', __METHOD__);
    }
}
