<?php

namespace Modules\TwigHelpers\TwigExtensions;

use Twig\TwigFilter;
use Twig\TwigFunction;
use craft\helpers\StringHelper;
use Twig\Extension\GlobalsInterface;
use Twig\Extension\AbstractExtension;

class TwigHelpersTwigExtension extends AbstractExtension implements GlobalsInterface
{
    public function getName()
    {
        return 'TwigHelpers';
    }

    public function getGlobals(): array
    {
        return [

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
            new TwigFilter('propSort', [$this, 'propSort']),
            new TwigFilter('find', [$this, 'find'])
        ];
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
