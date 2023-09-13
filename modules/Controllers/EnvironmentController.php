<?php

namespace Modules\Controllers;

use craft\web\Controller;

class EnvironmentController extends Controller
{
    public function actionIndex()
    {
        $this->requireAdmin(false);

        $parts = explode('.', $_SERVER['HTTP_HOST']);
        end($parts);
        $root = prev($parts);

        if ($root === 'mostlyserious' || $root === 'frb') {
            $fallback = prev($parts);
            $root = $fallback && $fallback !== 'www' ? $fallback : $root;
        }

        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header(sprintf('Content-Disposition: attachment; filename=%s.env', $root));
        header('Content-Transfer-Encoding: binary');
        header('Connection: Keep-Alive');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');

        $file = CRAFT_BASE_PATH . '/.env';

        if (is_file($file)) {
            return file_get_contents($file);
        }

        foreach ($_ENV as $key => $value) {
            echo sprintf('%s="%s"%s', $key, $value, PHP_EOL);
        }

        exit;
    }
}
