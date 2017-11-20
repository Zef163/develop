# Install Node.js LTS Version
FROM node:boron

# Create app directory
WORKDIR /var/www/application/

# Copy application to app directory
COPY . /var/www/application/

# Informs Docker that the container listens 3000 port
EXPOSE 3000

# Install app dependencies and run application
COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]