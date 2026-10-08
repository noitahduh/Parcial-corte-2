# Examen Práctico Corte 2: Gestión de Vuelos y Reservas (NestJS + TypeORM)

## Descripción
Proyecto base para el desarrollo del examen práctico de **Desarrollo de Entornos Digitales Web** (Corte 2).
El sistema gestiona la administración de **Vuelos (`Flight`)** y la emisión de **Reservas de Pasajes (`Booking`)**, aplicando principios de arquitectura modular, autenticación y autorización basada en permisos JWT, y persistencia relacional con PostgreSQL y TypeORM.

---

## Requisitos Previos
- **Node.js**: v20+ o v22+
- **Docker & Docker Compose** (para ejecutar la base de datos PostgreSQL)
- **Postman** (se proporciona la colección `examen-backend.postman_collection.json`)

---

## Instrucciones de Despliegue Local

### 1. Variables de Entorno
Copia el archivo de ejemplo para configurar tus variables locales:
```bash
cp .env.example .env
```

Verifica los valores dentro de `.env`:
```env
DB_TYPE=postgres
DB_SYNCHRONIZE=true
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=mydatabase_test
SALT_ROUNDS=10
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
```

### 2. Iniciar la Base de Datos con Docker
```bash
docker compose up -d
```

### 3. Instalar Dependencias
```bash
npm install
```

### 4. Inicializar Datos Semilla (Seed)
Ejecuta el script SQL incluido en `db/insert.sql` sobre la base de datos `mydatabase_test` mediante tu gestor preferido (DBeaver, pgAdmin, DataGrip o CLI):
```bash
docker exec -i postgres-db psql -U postgres -d mydatabase_test < db/insert.sql
```

> **Usuarios de Prueba creados:**
> - **Administrador:** `admin@example.com` / `password123`
> - **Pasajero:** `juan@example.com` / `password123`

### 5. Ejecutar la Aplicación en Modo Desarrollo
```bash
npm run start:dev
```
La aplicación iniciará en `http://localhost:3000`.

---

## Colección de Postman
Importa en Postman el archivo:
- `examen-backend.postman_collection.json`

Al realizar login con `/auth/login`, el token JWT se guardará automáticamente en las variables de la colección (`accessToken`), permitiéndote ejecutar los endpoints protegidos directamente.