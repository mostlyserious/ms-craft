<?php

namespace Modules;

use Craft;
use Exception;
use craft\web\View;
use yii\base\Event;
use craft\helpers\App;
use craft\services\Assets;
use craft\helpers\StringHelper;
use yii\base\Module as BaseModule;
use craft\events\ReplaceAssetEvent;

class Module extends BaseModule
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
                function () {
                    $view = Craft::$app->getView();
                    $view->registerCss('
                        .button.button-prose { display: inline-block; padding: 0.5rem 1.5rem; margin-top: 0.5rem; margin-bottom: 0.5rem; border: 4px solid currentcolor; text-transform: uppercase; font-weight: bold; }
                        .button.button-prose:hover { text-decoration: none; }
                        .color-swatches { padding: 0 3px 3px 3px; }
                    ');

                    if (App::env('ENVIRONMENT') === 'staging' && App::env('MARKERIO_DESTINATION')) {
                        $view->registerJs(sprintf('
                            window.markerConfig = {
                                destination: "%s",
                                source: "snippet"
                            };
                        ', App::env('MARKERIO_DESTINATION')));

                        $view->registerJs('!function(e,r,a){if(!e.__Marker){e.__Marker={};var t=[],n={__cs:t};["show","hide","isVisible","capture","cancelCapture","unload","reload","isExtensionInstalled","setReporter","setCustomData","on","off"].forEach(function(e){n[e]=function(){var r=Array.prototype.slice.call(arguments);r.unshift(e),t.push(r)}}),e.Marker=n;var s=r.createElement("script");s.async=1,s.src="https://edge.marker.io/latest/shim.js";var i=r.getElementsByTagName("script")[0];i.parentNode.insertBefore(s,i)}}(window,document);');
                    }
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
