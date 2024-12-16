# Declarando argumentos
ARG NGINX_VERSION=latest

# Construindo o container com a imagem do Nginx
FROM nginx:${NGINX_VERSION} AS builder

# Copiando o arquivo de configuração nginx.conf personalizado para o contêiner
COPY nginx/nginx.conf /etc/nginx/

# Atualizando e instalando os pacotes necessários
RUN apk update && apk upgrade && \
    apk --update add logrotate openssl bash && \
    apk add --no-cache certbot certbot-nginx

# Removendo a configuração padrão do Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Adicionando o usuário www-data
RUN adduser -D -H -u 1000 -s /bin/bash www-data -G www-data

# Criando diretórios para o conteúdo do site e dá suas respectivas permissões
RUN mkdir -p /var/www && \
    chown -R www-data:www-data /var/www && \
    chmod 755 -R /var/www

# Criando diretórios para as configurações do Nginx
RUN mkdir -p /etc/nginx/sites-available /etc/nginx/conf.d && \
    chown -R www-data:www-data /etc/nginx/sites-available /etc/nginx/conf.d

# Definindo o diretório de trabalho para o Nginx
WORKDIR /etc/nginx

# Removendo pacotes não utilizados para reduzir o tamanho da imagem
RUN apk del --no-cache