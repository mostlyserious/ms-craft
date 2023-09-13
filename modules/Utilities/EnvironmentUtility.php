<?php

namespace Modules\Utilities;

use Craft;
use craft\base\Utility;

class EnvironmentUtility extends Utility
{
    /**
     * @inheritdoc
     */
    public static function displayName(): string
    {
        return Craft::t('app', 'Environment');
    }

    /**
     * @inheritdoc
     */
    public static function id(): string
    {
        return 'environment';
    }

    /**
     * @inheritdoc
     */
    public static function iconPath(): ?string
    {
        return Craft::getAlias('@appicons/world.svg');
    }

    /**
     * @inheritdoc
     */
    public static function contentHtml(): string
    {
        return Craft::$app->view->renderTemplate('general/environmentUtility', [
            'env' => $_ENV
        ]);
    }
}
