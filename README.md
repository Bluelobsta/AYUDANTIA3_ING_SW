# 🛍️ TechStore API - Catálogo de Productos y Categorías

API REST desarrollada con **Node.js**, **Express**, **Prisma ORM**, **PostgreSQL** y **Zod** para la ayudantía de Ingeniería de Software.

---

## 🚀 Puesta en marcha rápida (Quickstart)

### 1. Clonar e Instalar dependencias

```bash
git clone <URL_DEL_REPOSITORIO>
cd api_rest
npm install
```

### 2. Configurar PostgreSQL y Variables de Entorno

1. Asegúrate de tener tu servidor de **PostgreSQL** iniciado (pgAdmin).
2. Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

3. Ajusta tu usuario y contraseña en el archivo `.env`:

```env
DATABASE_URL="postgresql://TU_USUARIO:TU_PASSWORD@localhost:5432/techstore_db?schema=public"
PORT=3000
```

### 3. Ejecutar Migraciones y Cargar Datos de Prueba (Seed)

```bash
# Ejecutar las migraciones de Prisma (creará las tablas en PostgreSQL)
npm run prisma:migrate

# Cargar categorías y productos de prueba iniciales
npm run prisma:seed
```

### 4. Iniciar la API en modo desarrollo

```bash
npm run dev
```

La API estará corriendo en: `http://localhost:3000`

---

## 🛠️ Herramientas y Scripts Útiles

- **Visor gráfico de la base de datos (Prisma Studio):**

  ```bash
  npm run prisma:studio
  ```

  _(Abre una interfaz web en `http://localhost:5555` para ver y editar registros en PostgreSQL)._

- **Probar los endpoints:**
  Abre el archivo [requests.http](/api_rest/requests.http) en VS Code con la extensión **REST Client** (o importa las rutas en Thunder Client / Postman).

---

## 📂 Estructura del Proyecto

```text
api_rest/
├── prisma/
│   ├── schema.prisma       # Modelos Category y Product (PostgreSQL)
│   └── seed.js             # Datos iniciales de prueba
├── src/
│   ├── config/
│   │   └── prisma.js       # Cliente singleton de Prisma
│   ├── controllers/
│   │   ├── category.controller.js
│   │   └── product.controller.js
│   ├── middlewares/
│   │   ├── error.middleware.js     # Manejo global de errores y Prisma
│   │   └── validate.middleware.js  # Middleware de validación con Zod
│   ├── routes/
│   │   ├── category.routes.js
│   │   ├── product.routes.js
│   │   └── index.js
│   ├── schemas/
│   │   ├── category.schema.js      # Validaciones Zod
│   │   └── product.schema.js
│   ├── app.js              # Configuración de Express y middlewares
│   └── server.js           # Inicio del servidor HTTP
├── requests.http           # 16 peticiones HTTP listas para probar
├── GUIA_CLASE_90MIN.md     # Guion pedagógico para la ayudantía
├── TAREA.md                # Enunciado y rúbrica para los alumnos
└── package.json
```
