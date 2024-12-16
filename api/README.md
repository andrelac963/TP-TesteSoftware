# Como executar o backend localmente

## Pré-requisitos

- Node.js
- Docker
- Docker Compose

## Passos para executar o backend

### 1. Clonar o repositório

```sh
git clone https://github.com/andrelac963/TP-TesteSoftware.git
cd TP-TesteSoftware/api
```

### 2. Criar banco de dados
- Criar docker-compose.yml com container do Postgres
- Criar .env do docker-compose com as informações do banco
DB_CONTAINER_NAME=
DB_VERSION=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

```sh
docker-compose up --build -d
```

### 3. Executar projeto
- Crie .env da api com DB_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_CONTAINER_NAME}:${DB_PORT}/${DB_NAME}?schema=public
- Substituir variáveis pelos valores utilizados no docker-compose

```sh
npm install
npx prisma migrate dev
npm run dev
```