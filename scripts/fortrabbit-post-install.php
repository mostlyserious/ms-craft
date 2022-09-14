<?php

echo shell_exec('php craft migrate/all --interactive=0');
echo shell_exec('php craft project-config/apply');
