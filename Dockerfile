# Use the official PHP with Apache image as a base
FROM php:8.3.1-apache

# Install required packages
RUN apt-get update && \
    apt-get install --yes --force-yes \
    cron g++ gettext libicu-dev openssl \
    libc-client-dev libkrb5-dev  \
    libxml2-dev libfreetype6-dev \
    libgd-dev libmcrypt-dev bzip2 \
    libbz2-dev libtidy-dev libcurl4-openssl-dev \
    libz-dev libmemcached-dev libxslt-dev git-core libpq-dev \
    libzip4 libzip-dev libwebp-dev

# PHP Configuration
RUN docker-php-ext-install bcmath bz2 calendar dba exif gettext intl soap tidy xsl zip && \
    docker-php-ext-install mysqli pgsql pdo pdo_mysql pdo_pgsql  && \
    docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp && \
    docker-php-ext-install gd && \
    docker-php-ext-configure imap --with-kerberos --with-imap-ssl && \
    docker-php-ext-install imap && \
    docker-php-ext-configure hash --with-mhash && \
    pecl install xdebug && docker-php-ext-enable xdebug && \
    pecl install mongodb && docker-php-ext-enable mongodb && \
    pecl install redis && docker-php-ext-enable redis && \
    curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/bin/composer

# Install Redis server
RUN apt-get install -y redis-server

# Copy project files
COPY . /var/www/html/

# Apache Configuration
RUN a2enmod rewrite 

# SSL
RUN mv  /etc/apache2/sites-available/default-ssl.conf /etc/apache2/sites-available/000-default-ssl.conf && \
    a2enmod ssl && \
    a2ensite 000-default-ssl && \
    openssl req -subj '/CN=example.com/O=My Company Name LTD./C=US' -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout /etc/ssl/private/ssl-cert-snakeoil.key -out /etc/ssl/certs/ssl-cert-snakeoil.pem

EXPOSE 443
