<?php

echo shell_exec('php craft migrate/all');
echo shell_exec('php craft project-config/apply');
