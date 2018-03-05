#!/usr/bin/env bash

# I want to make sure that the directory is clean and has nothing left over from
# previous deployments. The servers auto scale so the directory may or may not
# exist.
cd /var/www/html/ecommerce
if [-f /var/www/html/ecommerce/pm2.json]; then
    pm2 stop pm2.json
fi
if [ -d /var/www/html/ecommerce/ ]; then
    sudo rm -rf /var/www/html/ecommerce/
fi
mkdir -vp /var/www/html/ecommerce/