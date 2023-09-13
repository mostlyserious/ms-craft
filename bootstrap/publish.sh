#!/usr/bin/env sh

rm -r bootstrap/project

cp -r config/project bootstrap/project

rm -r config/project
rm -r config/license.key

git checkout web/cpresources/.gitkeep

echo ""
echo "The bootstrap project config has been updated to the current state.\nYou may commit these changes."
echo ""
