#!/usr/bin/env sh

rm -r bootstrap/project

cp -r config/project bootstrap/project

rm config/project
rm config/license.key

echo ""
echo "The bootstrap project config has been updated to the current state.\nYou may commit these changes."
echo ""
