# Install Node.js LTS Version
FROM node:boron

# Create app directory
WORKDIR /var/www/application/

# Copy application to app directory
COPY . /var/www/application/

# Create a develop user
RUN /usr/sbin/useradd --create-home --home-dir /usr/local/develop --shell /bin/bash develop
RUN /usr/sbin/adduser develop sudo
RUN chown -R develop /usr/local/
RUN chown -R develop /usr/lib/
RUN chown -R develop /usr/bin/

# Change owner for app directory
RUN chown -R develop /var/www/application/

# Switch develop user and install app dependencies
RUN /bin/su - develop -c "cd /var/www/application/ && npm install"

# Informs Docker that the container listens 3000 port
EXPOSE 3000

# Run application
CMD ["npm", "start"]