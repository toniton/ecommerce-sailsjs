#!/usr/bin/env bash

# I want to make sure that the directory is clean and has nothing left over from
# previous deployments. The servers auto scale so the directory may or may not
# exist.
cd /var/www/html/paytron/server
forever stop app.js
if [ -d /var/www/html/paytron/server/ ]; then
    rm -rf /var/www/html/paytron/server/
fi
mkdir -vp /var/www/html/paytron/server/