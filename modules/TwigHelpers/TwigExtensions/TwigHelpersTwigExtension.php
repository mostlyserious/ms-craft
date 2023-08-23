<?php

namespace Modules\TwigHelpers\TwigExtensions;

use Twig\TwigFilter;
use Twig\TwigFunction;
use craft\helpers\StringHelper;
use Twig\Extension\GlobalsInterface;
use Twig\Extension\AbstractExtension;

class TwigHelpersTwigExtension extends AbstractExtension implements GlobalsInterface
{
    const DATE_FORMAT = 'n/j/Y';

    const TIME_FORMAT = 'H:i';

    const HEADING_TAGS = '<strong><span><em><br><a><u>';

    public $summaries = [];

    private static $instance;

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
            new TwigFunction('uuid', [$this, 'getUuid']),
            new TwigFunction('env', [$this, 'env']),
        ];
    }

    public function getFilters()
    {
        return [
            new TwigFilter('summaryFromBlocks', [$this, 'summaryFromBlocks']),
            new TwigFilter('propSort', [$this, 'propSort']),
            new TwigFilter('find', [$this, 'find'])
        ];
    }

    public function summaryFromBlocks($entry, $min_chars = 80, $flexability = 40)
    {
        $summary = '';
        $key = implode('-', [ $entry->id, $min_chars ]);

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
}
