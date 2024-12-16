# Declarando argumentos
ARG NODE_VERSION=latest

# Construindo o container com a imagem do Node
FROM node:${NODE_VERSION} AS builder

# Atualizando o sistema operacional e instalando o bash
RUN apk update && apk upgrade
RUN apk add bash

# Excluindo node_modules e package-lock.json caso existam
RUN rm -rf ./api/node_modules
RUN rm -rf ./api/package-lock.json

# Copiando os arquivos da aplicação para o container
RUN mkdir /api
COPY ./api /api

# Definindo o diretório de trabalho para a aplicação
WORKDIR /api

# Instalando as dependências do projeto dentro do container e buildando a aplicação
RUN npm install