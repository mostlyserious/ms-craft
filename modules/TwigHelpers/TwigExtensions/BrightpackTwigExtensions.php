<?php

namespace Modules\TwigHelpers\TwigExtensions;

use Craft;
use Twig\TwigFunction;
use Twig\Extension\AbstractExtension;

class BrightpackTwigExtensions extends AbstractExtension
{
    /**
     * @inheritdoc
     */
    public function getName()
    {
        return 'Brightpack';
    }

    /**
     * @inheritdoc
     */
    public function getFunctions()
    {
        return [
            new TwigFunction('entry', [$this, 'entry'], [
                'is_safe' => ['html']
            ]),
            new TwigFunction('asset', [$this, 'asset'], [
                'is_safe' => ['html']
            ]),
            new TwigFunction('external', [$this, 'external'], [
                'is_safe' => ['html']
            ])
        ];
    }

    /**
     * Returns versioned file(s) or the entire tag.
     *
     * @param  string     $file
     * @param  bool       $markup   (optional)
     * @param  bool       $manifest (optional)
     * @param  null|mixed $entry
     * @return string
     */
    public function entry($entry = null, $markup = true, $manifest = 'web/static/entries.json')
    {
        static $all;

        $results = [];
        $manifest_path = $this->join_path(CRAFT_BASE_PATH, $manifest);

        if (!is_file($manifest_path)) {
            return $markup ? '' : [];
        }

        $all = $all ?: json_decode(file_get_contents($manifest_path), true);

        if (!$entry) {
            return $all;
        }

        if (!isset($all[$entry])) {
            return [];
        }

        foreach ($all[$entry] as $i => $value) {
            $ext = pathinfo($value, PATHINFO_EXTENSION);

            switch ($ext) {
                case 'js' :
                    $result = $markup ? sprintf(
                        '<script src="%s" %s async defer></script>',
                        $value,
                        is_array($markup) ? $this->attr($markup, ['media']) : ''
                    ) : $value;
                    break;

                case 'css' :
                    $result = $markup ? sprintf(
                        '<link href="%s" rel="stylesheet" %s>',
                        $value,
                        is_array($markup) ? $this->attr($markup) : ''
                    ) : $value;
                    break;
                default :
                    $result = '';
                    break;
            }

            $this->preload($value);

            $results[] = $result;
        }

        return $markup ? implode(PHP_EOL, $results) : $results;
    }

    /**
     * Returns versioned file(s) or the entire tag.
     *
     * @param  string     $file
     * @param  bool       $markup   (optional)
     * @param  bool       $manifest (optional)
     * @param  null|mixed $entry
     * @return string
     */
    public function asset($entry = null, $markup = true, $manifest = 'web/static/assets.json')
    {
        static $all;

        $manifest_path = $this->join_path(CRAFT_BASE_PATH, $manifest);

        if (!is_file($manifest_path)) {
            return $markup ? '' : [];
        }

        $all = $all ?: json_decode(file_get_contents($manifest_path), true);

        if (!$entry) {
            return $all;
        }

        if (isset($all[$entry])) {
            // if (pathinfo($all[$entry], PATHINFO_EXTENSION) !== 'html') {
            //     $this->preload($all[$entry]);
            // }

            return $all[$entry];
        }

        return null;
    }

    public function external($path)
    {
        if (is_readable(Craft::getAlias($path))) {
            return file_get_contents(Craft::getAlias($path));
        }

        return '';
    }

    protected function preload($resource)
    {
        static $pushed = [];

        if (!is_array($resource)) {
            $resource = [$resource];
        }

        foreach ($resource as $r) {
            $types = ['css' => 'style', 'js' => 'script'];
            $ext = pathinfo($r, PATHINFO_EXTENSION);
            $as = isset($types[$ext]) ? $types[$ext] : 'image';
            if (!in_array($r, $pushed)) {
                header(sprintf('Link: <%s>; as=%s; rel=preload;', $this->url($r), $as), false);
                $pushed[] = $r;
            }
        }

        return $resource;
    }

    protected function attr($attributes = [], $except = [])
    {
        $html = [];

        foreach ((array) $attributes as $key => $value) {
            if (!is_null($value)) {
                if (is_numeric($key)) {
                    if (!in_array($value, (array) $except)) {
                        $pair = $value;
                    }
                } else {
                    if (!in_array($key, (array) $except)) {
                        $pair = $key .'="'. $value .'"';
                    }
                }
            }

            if (!is_null($pair)) {
                $html[] = $pair;
            }
        }

        return count($html) > 0 ? ' '.implode(' ', $html) : '';
    }

    protected function join_path(...$paths)
    {
        return preg_replace_callback('/([^:])\/+/', function ($matches) {
            return $matches[1] . '/';
        }, implode('/', (array) $paths));
    }

    protected function url($path = '')
    {
        $host = parse_url($path, PHP_URL_HOST);

        return trim($host ? $path : $this->join_path(sprintf(
            '%s://%s',
            ($this->is_https() ? 'https' : 'http'),
            $this->request('SERVER_NAME')
        ), $path), '/');
    }

    protected function is_https()
    {
        if ($this->request('HTTPS')) {
            if ('on' === strtolower($this->request('HTTPS'))) {
                return true;
            }
            if ('1' === $this->request('HTTPS')) {
                return true;
            }
        } elseif ($this->request('SERVER_PORT') && ('443' === $this->request('SERVER_PORT'))) {
            return true;
        }

        return false;
    }

    protected function request($only = null, $object = true)
    {
        $return = null;

        $request = array_merge($_GET, $_POST, $_SERVER);

        if ($only) {
            if (!is_array($only)) {
                $return = isset($request[$only]) ? $request[$only] : null;
            } else {
                $return = [];

                foreach ($only as $key) {
                    $value = isset($request[$key]) ? $request[$key] : null;

                    if ($value) {
                        $return[$key] = $value;
                    }
                }
            }
        } else {
            $return = !empty($request) ? $request : null;
        }

        if (!empty($return)) {
            return ($object && is_array($return)) ? (object) $return : $return;
        }
    }
}
