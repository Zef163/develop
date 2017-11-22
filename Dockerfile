# Install Node.js LTS Version
FROM node:boron

# Install Node.js Package Manager
RUN apt-get update && apt-get install -y npm

# Create app directory
WORKDIR /var/www/application/

# Copy application to app directory
COPY . .

# Informs Docker that the container listens 3000 port
EXPOSE 3000

# Install app dependencies and run application
COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]