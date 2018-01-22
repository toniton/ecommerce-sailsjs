#!/usr/bin/env bash

# I have left a few things in here and will explain this further (see below)
#rsync --delete-before --verbose --archive --exclude "htdocs/media/" --exclude ".*" --exclude "htdocs/var/" --exclude "htdocs/app/etc/local.xml" /var/www/release/ /var/www/magento/ > /var/log/deploy.log

sudo mkdir -vp /var/www/html/ecommerce/config/ssl/
sudo cp -r /etc/ssl/paytron/* /var/www/html/ecommerce/config/ssl/

if [ -d /var/www/html/ecommerce/.tmp/ ]; then
    sudo chown -R 1000 /var/www/html/ecommerce/.tmp/*
    sudo rm -rf /var/www/html/ecommerce/.tmp/public/
fi

cd /var/www/html/ecommerce && sudo npm i && sudo su && pm2 startOrRestart pm2.json --env production --watch