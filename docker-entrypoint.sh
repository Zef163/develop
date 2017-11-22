#!/bin/sh

# Work directory
dir="/var/www/application/"

# Install app dependencies
cd ${dir} && npm install

# Run application
cd ${dir} && npm start