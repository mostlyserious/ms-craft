<?php
namespace modules\twighelpers\twigextensions;

use craft\helpers\StringHelper;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class TwigHelpersTwigExtension extends AbstractExtension
{

    public function getName()
    {
        return 'TwigHelpers';
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
        ];
    }

    public function getFilters()
    {
        return [
            new TwigFilter('propSort', [$this, 'propSort'])
        ];
    }

    public function propSort($items, $prop)
    {
        usort($items, function ($item1, $item2) use ($prop) {
            if ($item1[$prop] == $item2[$prop]) return 0;
            return $item1[$prop] > $item2[$prop] ? -1 : 1;
        });

        return $items;
    }

    /**
     * @return string
     */
    public function getUuid()
    {
        return StringHelper::UUID();
    }
}
