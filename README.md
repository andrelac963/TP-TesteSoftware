# TP-TesteSoftware
Trabalho prático de Teste de Software

Grupo: André Luiz Alves Costa

## Fase 1:
1. O link projeto no GitHub: https://github.com/andrelac963/TP-TesteSoftware.git
2. O link do último commit no GitHub: https://github.com/andrelac963/TP-TesteSoftware/commit/086a15ce421ca95eea3c470fd60c951d90df242c
3. O link do último build com sucesso do GitHub Actions: https://github.com/andrelac963/TP-TesteSoftware/actions/runs/12383136147
4. O link do Codecov do sistema: https://app.codecov.io/gh/andrelac963/TP-TesteSoftware

## Fase 2:
1. O link projeto no GitHub: https://github.com/andrelac963/TP-TesteSoftware.git
2. O link do último commit no GitHub: https://github.com/andrelac963/TP-TesteSoftware/commit/086a15ce421ca95eea3c470fd60c951d90df242c
3. O link do último build com sucesso do GitHub Actions: https://github.com/andrelac963/TP-TesteSoftware/actions/runs/12383136147
4. O link do Codecov do sistema: https://app.codecov.io/gh/andrelac963/TP-TesteSoftware
5. O link da apresentação no Youtube: 

# Como executar o projeto

## Pré-requisitos

- Docker
- Docker Compose

## Passos para executar o projeto

### 1. Clonar o repositório

```sh
git clone https://github.com/andrelac963/TP-TesteSoftware.git
cd TP-TesteSoftware
```

### 2. Criar variáveis docker
- Criar .env do docker-compose

- Variáveis para o serviço db_base
DB_CONTAINER_NAME=
DB_VERSION=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

- Variáveis para o serviço api_base
API_CONTAINER_NAME=
API_IMAGE_NAME=
API_PORT=
NODE_VERSION=

- Variáveis para o serviço client_base
CLIENT_CONTAINER_NAME=
CLIENT_IMAGE_NAME=
CLIENT_PORT=

- Variáveis para o serviço nginx_base
NGINX_CONTAINER_NAME=
NGINX_IMAGE_NAME=
NGINX_VERSION=

- Política de reinício
RESTART_POLICY=

### 3. Executar containers

```sh
docker-compose up --build -d
```