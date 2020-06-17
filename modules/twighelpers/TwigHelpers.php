<?php

namespace modules\twighelpers;

use modules\twighelpers\assetbundles\uuidmodule\UuidModuleAsset;
use modules\twighelpers\twigextensions\TwigHelpersTwigExtension;
use modules\twighelpers\twigextensions\BrightpackTwigExtensions;
use modules\twighelpers\twigextensions\UuidModuleTwigExtension;

use Craft;
use craft\events\RegisterTemplateRootsEvent;
use craft\events\TemplateEvent;
use craft\i18n\PhpMessageSource;
use craft\web\View;

use yii\base\Event;
use yii\base\InvalidConfigException;
use yii\base\Module;


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
        // Craft::$app->view->registerTwigExtension(new TwigHelpersTwigExtension());
        Craft::$app->view->registerTwigExtension(new BrightpackTwigExtensions());

        Craft::info('twighelpers module loaded', __METHOD__);
    }

}
