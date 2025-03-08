FROM php:8.0-cli-alpine

# Install necessary packages including PostgreSQL development libraries
RUN apk add --no-cache postgresql-dev php8-pgsql && \
    docker-php-ext-install pgsql pdo_pgsql pdo

# Set working directory
WORKDIR /app

# Copy the application files
COPY . /app

# Expose port 3000
EXPOSE 3000

# Start the PHP built-in web server
CMD ["php", "-S", "0.0.0.0:3000", "-t", "/app"]
