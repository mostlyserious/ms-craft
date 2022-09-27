<?php

namespace Modules\TwigHelpers\TwigExtensions;

use Craft;
use Twig\TwigFunction;
use Twig\Extension\AbstractExtension;

class VitepackTwigExtensions extends AbstractExtension
{
    /**
     * @inheritdoc
     */
    public function getName()
    {
        return 'Vitepack';
    }

    /**
     * @inheritdoc
     */
    public function getFunctions()
    {
        return [
            new TwigFunction('vite', [$this, 'vite'], [
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

    public function vite($target = null, $args = [])
    {
        static $all;

        $results = [];
        $base = isset($args['base']) ? $args['base'] : '/static/';
        $outdir = isset($args['outdir']) ? $args['outdir'] : 'web/static';

        $manifest_path = $this->joinPath(CRAFT_BASE_PATH, $outdir, 'manifest.dev.json');

        if (!is_file($manifest_path)) {
            $manifest_path = $this->joinPath(CRAFT_BASE_PATH, $outdir, 'manifest.json');
        }

        if (!is_file($manifest_path)) {
            return '';
        }

        $all = $all ?: json_decode(file_get_contents($manifest_path), true);

        if (isset($all['url'])) {
            foreach ($all['inputs'] as $input) {
                if (!$target || $input === $target) {
                    $this->inputMarkup($input, $all['url'], $results);
                }
            }
        }

        $entries = array_filter($all, function ($entry) use ($target) {
            if (!isset($entry['src'])) {
                return;
            }

            $ext = pathinfo($entry['src'], PATHINFO_EXTENSION);

            return in_array($ext, ['css', 'js'])
                && isset($entry['isEntry'])
                && $entry['isEntry']
                && (!$target || $entry['src'] === $target);
        });

        foreach ($entries as $entry) {
            $input = $entry['file'];

            if (isset($entry['imports']) && count($entry['imports'])) {
                foreach ($entry['imports'] as $import) {
                    $this->inputMarkup(str_ireplace('_', 'assets/', $import), $base, $results);
                }
            }

            if (isset($entry['css']) && count($entry['css'])) {
                foreach ($entry['css'] as $import) {
                    $this->inputMarkup($import, $base, $results);
                }
            }

            $this->inputMarkup($input, $base, $results);
        }

        return implode(PHP_EOL, $results);
    }

    public function asset($input, $args = [])
    {
        static $all;

        $base = isset($args['base']) ? $args['base'] : '/static/';
        $outdir = isset($args['outdir']) ? $args['outdir'] : 'web/static';

        $manifest_path = $this->joinPath(CRAFT_BASE_PATH, $outdir, 'manifest.dev.json');

        if (!is_file($manifest_path)) {
            $manifest_path = $this->joinPath(CRAFT_BASE_PATH, $outdir, 'manifest.json');
        }

        if (!is_file($manifest_path)) {
            return '';
        }

        $all = $all ?: json_decode(file_get_contents($manifest_path), true);

        $input = $this->joinPath('src', $input);

        if (isset($all['url'], $all['inputs'][$input])) {
            return $this->joinPath($all['url'], $all['inputs'][$input]);
        }

        if (isset($all[$input], $all[$input]['file'])) {
            return $this->joinPath($base, $all[$input]['file']);
        }

        if (isset($all[$input], $all[$input]['assets']) && count($all[$input]['assets'])) {
            return $this->joinPath($base, $all[$input]['assets'][0]);
        }

        if (isset($all['url'])) {
            return $this->joinPath($all['url'], $input);
        }

        return '';
    }

    public function external($path)
    {
        if (is_readable(Craft::getAlias($path))) {
            return file_get_contents(Craft::getAlias($path));
        }

        return '';
    }

    protected function inputMarkup($input, $base, &$results)
    {
        static $loaded = [];

        if (isset($loaded[$input]) and $loaded[$input]) {
            return;
        }

        $legacy = strpos($input, 'legacy') !== false;
        $ext = pathinfo($input, PATHINFO_EXTENSION);

        switch ($ext) {
            case 'js':
                $results[] = $legacy ? sprintf(
                    '<script nomodule crossorigin src="%s" async defer></script>',
                    $this->joinPath($base, $input)
                ) : sprintf(
                    '<script type="module" crossorigin src="%s" async defer></script>',
                    $this->joinPath($base, $input)
                );
                break;
            case 'css':
                $results[] = sprintf(
                    '<link href="%s" rel="stylesheet">',
                    $this->joinPath($base, $input)
                );
                break;
        }

        $loaded[$input] = true;
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
                        $pair = $key . '="' . $value . '"';
                    }
                }
            }

            if (!is_null($pair)) {
                $html[] = $pair;
            }
        }

        return count($html) > 0 ? ' ' . implode(' ', $html) : '';
    }

    protected function joinPath(...$paths)
    {
        return preg_replace_callback('/([^:])\/+/', function ($matches) {
            return $matches[1] . '/';
        }, implode('/', (array) $paths));
    }

    protected function url($path = '')
    {
        $host = parse_url($path, PHP_URL_HOST);

        return trim($host ? $path : $this->joinPath(sprintf(
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
