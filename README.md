# Teddy List Backend

Este guia explica como configurar e executar a aplicação NestJS em sua máquina local.

---

## Pré-requisitos

Certifique-se de que você tenha os seguintes itens instalados:

1. **Node.js** (v16 ou superior)
   - Você pode baixar e instalar a versão mais recente em [Node.js Official Website](https://nodejs.org/).

2. **NPM** ou **Yarn**
   - O NPM vem junto com o Node.js.
   - Para instalar o Yarn:
     ```bash
     npm install -g yarn
     ```

3. **PostgreSQL**
   - Certifique-se de que o PostgreSQL esteja instalado e em execução.
   - Você pode baixá-lo em [PostgreSQL Official Website](https://www.postgresql.org/).

4. **NestJS CLI** (Opcional, mas recomendado)
   - Instale a CLI globalmente:
     ```bash
     npm install -g @nestjs/cli
     ```

---

## Passos para Configuração

1. **Clone o Repositório**
   ```bash
   git clone <url-do-repositorio>
   ```

2. **Navegue até o Diretório do Projeto**
   ```bash
   cd <nome-do-diretorio>
   ```

3. **Instale as Dependências**
   Usando NPM:
   ```bash
   npm install
   ```
   Ou usando Yarn:
   ```bash
   yarn install
   ```

4. **Configuração do Banco de Dados**
   - Crie um banco de dados no PostgreSQL para o projeto.
   - Atualize as credenciais de conexão no arquivo `src/config/ormconfig.ts` ou `.env` (dependendo de como está configurado).
     Exemplo de `.env`:
     ```env
     DATABASE_HOST=localhost
     DATABASE_PORT=5432
     DATABASE_USER=seu_usuario
     DATABASE_PASSWORD=sua_senha
     DATABASE_NAME=seu_banco_de_dados
     ```

5. **Rodar Migrações** (se aplicável)
   - Certifique-se de que todas as tabelas necessárias sejam criadas no banco de dados executando:
     ```bash
     npm run typeorm:migration:run
     ```

6. **Inicie a Aplicação**
   Modo desenvolvimento:
   ```bash
   npm run start:dev
   ```
   Modo produção:
   ```bash
   npm run build
   npm run start:prod
   ```

---

## Endpoints Disponíveis

### 1. Listar Todos os Clientes
**Rota:** `GET /clientes`

### 2. Criar um Cliente
**Rota:** `POST /clientes`

### 3. Editar um Cliente
**Rota:** `PATCH /clientes/:id`

### 4. Remover um Cliente
**Rota:** `DELETE /clientes/:id`

---

## Testes

1. **Executar Testes Unitários**
   ```bash
   npm run test
   ```

---

## Problemas Comuns

1. **Erro de Conexão com o Banco de Dados**
   - Verifique se o PostgreSQL está em execução e as credenciais no arquivo `.env` estão corretas.

2. **Porta Já em Uso**
   - Alterne a porta no arquivo `src/main.ts` ou no `.env`:
     ```env
     PORT=3001
     ```

---


