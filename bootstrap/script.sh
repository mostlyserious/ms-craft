#!/usr/bin/env sh

rm -r config/project
rm config/project.yaml

cp -r bootstrap/project config/project
cp bootstrap/project.yaml config/project.yaml

if command -v valet &> /dev/null
then
    valet php craft clear-caches/all
else
    php craft clear-caches/all
fi

echo ""
echo "Your project YAML files have been bootstrapped.\nTo finish applying these updates, navigate to the projects admin and select Utilities > Project Config > Reapply Everything > Use YAML."
echo ""

while true; do
    read -p "Remove bootstrap directory? (yes|no): " yn
    case $yn in
        [Yy]* ) rm -r bootstrap; break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done
