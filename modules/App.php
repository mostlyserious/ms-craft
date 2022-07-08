<?php

namespace Modules;

use Craft;
use craft\web\View;
use yii\base\Event;
use yii\base\Module;
use craft\services\Assets;
use craft\events\TemplateEvent;
use craft\helpers\StringHelper;
use craft\events\ReplaceAssetEvent;

class App extends Module
{
    public function init()
    {
        Craft::setAlias('@Modules', __DIR__);

        if (Craft::$app->getRequest()->getIsConsoleRequest()) {
            $this->controllerNamespace = 'Modules\\Console\\Controllers';
        } else {
            $this->controllerNamespace = 'Modules\\Controllers';
        }

        if (Craft::$app->request->getIsCpRequest()) {
            Event::on(
                View::class,
                View::EVENT_BEFORE_RENDER_TEMPLATE,
                function (TemplateEvent $event) {
                    $view = Craft::$app->getView();
                    $view->registerCss('
                        .button.button-primary { display: inline-block; padding: 0.5rem 1.5rem; margin-top: 0.5rem; margin-bottom: 0.5rem; border: 4px solid currentcolor; text-transform: uppercase; font-weight: bold; }
                        .button.button-primary:hover { text-decoration: none; }
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
