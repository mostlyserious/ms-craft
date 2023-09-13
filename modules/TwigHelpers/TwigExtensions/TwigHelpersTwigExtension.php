<?php

namespace Modules\TwigHelpers\TwigExtensions;

use Twig\TwigFilter;
use Twig\TwigFunction;
use craft\helpers\StringHelper;
use Twig\Extension\GlobalsInterface;
use Twig\Extension\AbstractExtension;
use verbb\hyper\links\Custom as HypeLink;
use percipiolondon\colourswatches\ColourSwatches;

class TwigHelpersTwigExtension extends AbstractExtension implements GlobalsInterface
{
    public $summaries = [];

    private static $instance;
    const DATE_FORMAT = 'n/j/Y';

    const TIME_FORMAT = 'H:i';

    const HEADING_TAGS = '<strong><span><em><br><a><u>';

    public static function instance()
    {
        if (!self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function getName()
    {
        return 'TwigHelpers';
    }

    public function getGlobals(): array
    {
        return [
            'DATE_FORMAT' => static::DATE_FORMAT,
            'TIME_FORMAT' => static::TIME_FORMAT,
            'HEADING_TAGS' => static::HEADING_TAGS
        ];
    }

    /**
     * Returns an array of Twig functions, used in Twig templates via:
     *
     *      {% set this = someFunction('something') %}
     *
     * @return array
     */
    public function getFunctions()
    {
        return [
            new TwigFunction('swatch', [$this, 'getSwatch']),
            new TwigFunction('hyper', [$this, 'createLink']),
            new TwigFunction('uuid', [$this, 'getUuid'])
        ];
    }

    public function getFilters()
    {
        return [
            new TwigFilter('summaryFromBlocks', [$this, 'summaryFromBlocks']),
            new TwigFilter('propSort', [$this, 'propSort']),
            new TwigFilter('hyper', [$this, 'createLink']),
            new TwigFilter('find', [$this, 'find'])
        ];
    }

    public function summaryFromBlocks($entry, $min_chars = 80, $flexability = 40)
    {
        $summary = '';
        $key = implode('-', [$entry->id, $min_chars]);

        if (isset($this->summaries[$key])) {
            return $this->summaries[$key];
        }

        if (isset($entry->blocks)) {
            if (!$summary) {
                $summary = trim(strip_tags($entry->blocks->richText(':notempty:')->one()->richText ?? ''));
            }

            if (!$summary) {
                $summary = trim(strip_tags($entry->blocks->body(':notempty:')->one()->body ?? ''));
            }

            if (!$summary) {
                $summary = trim(strip_tags($entry->blocks->excerpt(':notempty:')->one()->excerpt ?? ''));
            }
        }

        if ($summary) {
            $sentences = explode('. ', $summary);
            $summary = '';

            foreach ($sentences as $sentence) {
                if (strlen($summary) < $min_chars) {
                    $summary = trim("{$summary} {$sentence}.");
                }
            }
        }

        $summary = preg_replace('/\n+/', ' ', trim($summary));

        return $this->summaries[$key] = StringHelper::safeTruncate($summary, $min_chars + $flexability, '…');
    }

    public function propSort($items, $prop)
    {
        usort($items, function ($item1, $item2) use ($prop) {
            if ($item1[$prop] == $item2[$prop]) {
                return 0;
            }

            return $item1[$prop] > $item2[$prop] ? -1 : 1;
        });

        return $items;
    }

    public function find($items, $key, $value)
    {
        foreach ($items as $item) {
            if ((isset($item[$key]) && $item[$key] === $value)
                || (isset($item->$key) && $item->$key === $value)
                || (isset($item->$key->value) && $item->$key->value === $value)) {
                return $item;
            }
        }
    }

    /**
     * @return string
     */
    public function getUuid()
    {
        return StringHelper::UUID();
    }

    public function getSwatch($palette_handle, $label = null)
    {
        $pallette = ColourSwatches::$plugin->settings->palettes[$palette_handle];

        return current(array_filter($pallette, function ($color) use ($label) {
            return $label ? $color['label'] === $label : $color['default'];
        }));
    }

    public function createLink($args = [])
    {
        $link = new HypeLink();
        $link->handle = 'custom';
        $link->isCustom = true;

        foreach ($args as $key => $value) {
            $link->$key = $value;
        }

        return $link;
    }
}
