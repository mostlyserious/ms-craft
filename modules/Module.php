<?php

namespace Modules;

use Craft;
use craft\web\View;
use yii\base\Event;
use craft\services\Assets;
use craft\events\TemplateEvent;
use craft\helpers\StringHelper;
use yii\base\Module as BaseModule;
use craft\events\ReplaceAssetEvent;

class Module extends BaseModule
{
    public function init()
    {
        Craft::setAlias('@modules', __DIR__);

        if (Craft::$app->getRequest()->getIsConsoleRequest()) {
            $this->controllerNamespace = 'Modules\\Console\\Controllers';
        } else {
            $this->controllerNamespace = 'Modules\\Controllers';
        }

        if (Craft::$app->request->getIsCpRequest()) {
            Event::on(
                View::class,
                View::EVENT_BEFORE_RENDER_TEMPLATE,
                function () {
                    $view = Craft::$app->getView();
                    $view->registerCss('
                        .button.button-prose { display: inline-block; padding: 0.5rem 1.5rem; margin-top: 0.5rem; margin-bottom: 0.5rem; border: 4px solid currentcolor; text-transform: uppercase; font-weight: bold; }
                        .button.button-prose:hover { text-decoration: none; }
                        .color-swatches { padding: 0 3px 3px 3px; }
                    ');
                }
            );
        }

        Event::on(
            Assets::class,
            Assets::EVENT_BEFORE_REPLACE_ASSET,
            function (ReplaceAssetEvent $asset) {
                $asset->filename = implode('.', [
                    pathinfo($asset->filename, PATHINFO_FILENAME),
                    StringHelper::randomStringWithChars('abcdefghijklmnopqrstuvwxyz0123456789', 7),
                    strtolower(pathinfo($asset->filename, PATHINFO_EXTENSION))
                ]);
            }
        );
    }
}
