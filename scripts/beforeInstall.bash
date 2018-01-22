#!/usr/bin/env bash

# I want to make sure that the directory is clean and has nothing left over from
# previous deployments. The servers auto scale so the directory may or may not
# exist.
cd /var/www/html/ecommerce
pm2 stop pm2.json
if [ -d /var/www/html/ecommerce/ ]; then
    rm -rf /var/www/html/ecommerce/
fi
mkdir -vp /var/www/html/ecommerce/