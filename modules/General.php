<?php

namespace Modules;

use Craft;
use craft\web\View;
use yii\base\Event;
use yii\base\Module;
use craft\helpers\App;
use craft\base\Element;
use craft\services\Assets;
use benf\neo\Plugin as Neo;
use benf\neo\elements\Block;
use craft\events\ModelEvent;
use craft\helpers\ArrayHelper;
use benf\neo\records\BlockType;
use craft\helpers\StringHelper;
use Illuminate\Support\Collection;
use craft\events\ReplaceAssetEvent;
use percipiolondon\colourswatches\ColourSwatches;
use Modules\TwigHelpers\TwigExtensions\VitepackTwigExtensions;
use percipiolondon\colourswatches\fields\ColourSwatches as ColourSwatchesField;

class General extends Module
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
                    Craft::$app->view->registerHtml(
                        VitepackTwigExtensions::instance()->vite('src/js/cp.js'),
                        View::POS_HEAD
                    );

                    if (Craft::$app->config->env === 'staging' && App::env('MARKERIO_PROJECT')) {
                        Craft::$app->view->registerJs(sprintf('
                            window.markerConfig = {
                                project: "%s",
                                source: "snippet"
                            };
                        ', App::env('MARKERIO_PROJECT')));

                        Craft::$app->view->registerJs('!function(e,r,a){if(!e.__Marker){e.__Marker={};var t=[],n={__cs:t};["show","hide","isVisible","capture","cancelCapture","unload","reload","isExtensionInstalled","setReporter","setCustomData","on","off"].forEach(function(e){n[e]=function(){var r=Array.prototype.slice.call(arguments);r.unshift(e),t.push(r)}}),e.Marker=n;var s=r.createElement("script");s.async=1,s.src="https://edge.marker.io/latest/shim.js";var i=r.getElementsByTagName("script")[0];i.parentNode.insertBefore(s,i)}}(window,document);');
                    }
                }
            );
        }

        Event::on(
            Element::class,
            Element::EVENT_BEFORE_SAVE,
            function (ModelEvent $event) {
                $element = $event->sender;

                if (!$element->fieldLayout) {
                    return;
                }

                if (isset($element->section) && $element->section->handle === 'moduleListing') {
                    $blocks_field = Craft::$app->fields->getFieldByHandle('blocks');
                    $block_types = ArrayHelper::index(Neo::$plugin->blockTypes->getByFieldId($blocks_field->id), 'handle');
                    $existing = $element->blocks->all();
                    $existing_handles = array_map(fn ($block) => $block->type->handle, $existing);

                    $block_records = array_filter(BlockType::find()->where([
                        'topLevel' => true,
                        'fieldId' => $blocks_field->id,
                    ])->orderBy('RAND()')->all(), function ($block) use ($existing_handles) {
                        return !in_array($block->handle, $existing_handles);
                    });

                    $existing = array_map(function ($block) {
                        if (isset($block->type->handle)) {
                            return $this->newBlockFrom($block);
                        }

                        return $block;
                    }, $existing);

                    foreach ($block_records as $record) {
                        $block = Block::find()->where(['typeId' => $record->id])->one();
                        if ($block) {
                            $existing[] = $this->newBlockFrom($block);
                            $this->handleChildren($block, $existing);
                        }
                    }

                    $element->setFieldValue('blocks', array_filter($existing, function ($block) use ($block_types) {
                        return isset($block['type'], $block_types[$block['type']]);
                    }));
                }

                $palettes = ColourSwatches::$plugin->settings->palettes;
                $fields = new Collection($element->fieldLayout->customFields);
                $background = $fields->whereInstanceOf(ColourSwatchesField::class)->first();

                if ($background && isset($palettes[$background->palette]) && !$element->getFieldValue($background->handle)) {
                    $options = new Collection($palettes[$background->palette]);
                    $element->setFieldValue($background->handle, $options->firstWhere('default', true) ?: $options->first());
                    $element->setScenario(Element::SCENARIO_LIVE);
                }
            }
        );

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

    protected function newBlockFrom($block)
    {
        return [
            'modified' => 1,
            'type' => $block->type->handle,
            'enabled' => 1,
            'collapsed' => 0,
            'level' => $block->level,
            'fields' => $block->serializedFieldValues
        ];
    }

    protected function handleChildren($block, &$existing)
    {
        $block->children->collect()->each(function ($child) use (&$existing) {
            $existing[] = $this->newBlockFrom($child);
            $this->handleChildren($child, $existing);
        });
    }
}
