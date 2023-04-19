#!/usr/bin/env sh

rm config/license.key
rm -r config/project

cp -r bootstrap/project config/project

if command -v valet &> /dev/null
then
    valet php craft clear-caches/all
else
    php craft clear-caches/all
fi

echo ""
echo "Your project YAML files have been bootstrapped.\nTo finish applying these updates run \`php craft up\`"
echo ""

while true; do
    read -p "Remove bootstrap directory? (yes|no): " yn
    case $yn in
        [Yy]* ) rm -r bootstrap; break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done
