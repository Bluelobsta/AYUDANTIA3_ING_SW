# 📋 Tarea Práctica: Extensión de la API de Catálogo (TechStore)

**Curso:** Ingeniería de Software  
**Tema:** API REST con Node.js/Express, Prisma ORM, PostgreSQL y Validación con Zod  
**Modalidad:** Individual o Parejas (según definición del curso)

---

## 🎯 Objetivo de la Tarea
El objetivo de esta actividad es consolidar los conocimientos adquiridos en la ayudantía extendiendo la API **TechStore** con nuevas entidades en la base de datos, relaciones 1:N, validación estricta de datos de entrada con Zod y reglas de negocio en los controladores.

---

## 📦 Contexto del Negocio
La tienda en línea **TechStore** necesita incorporar dos nuevas funcionalidades esenciales para su plataforma de comercio electrónico:
1. **Sistema de Reseñas y Calificaciones (`Review`):** Los clientes pueden calificar los productos del 1 al 5 y dejar comentarios sobre su experiencia.
2. **Entidad de Marcas / Fabricantes (`Brand`):** Los productos ahora deben poder asociarse a una marca (ej: "Apple", "Logitech", "Sony", "Samsung").

---

## 🛠️ Requerimientos Técnicos

### 1. Modelado en Prisma (`prisma/schema.prisma`)
Deberás crear y migrar los siguientes dos modelos y actualizar el modelo `Product`:

#### A. Modelo `Brand` (Marca)
* `id`: Entero, autoincremental, clave primaria.
* `name`: String (máx. 80 caracteres), único, obligatorio.
* `country`: String (máx. 60 caracteres), opcional.
* `website`: String (máx. 200 caracteres), opcional.
* Relación 1:N con `Product` (Una marca tiene muchos productos; cada producto pertenece opcionalmente o de forma obligatoria a una marca).

#### B. Modelo `Review` (Reseña de Producto)
* `id`: Entero, autoincremental, clave primaria.
* `author`: String (máx. 100 caracteres), obligatorio.
* `rating`: Entero (del 1 al 5), obligatorio.
* `comment`: String (mínimo 10 caracteres, máx. 500 caracteres), obligatorio.
* `createdAt`: DateTime (valor por defecto: `now()`).
* `productId`: Clave foránea referenciando a `Product` con borrado en cascada (`onDelete: Cascade`).

> ⚠️ **Importante:** Deberás ejecutar `npx prisma migrate dev --name add_brand_and_review` para registrar los cambios en PostgreSQL.

---

### 2. Esquemas de Validación con Zod (`src/schemas/`)
Crea los esquemas de validación necesarios para sanitizar las entradas:

* `createBrandSchema`:
  * `name`: String no vacío, mín. 2, máx. 80 caracteres.
  * `country`: String opcional, máx. 60 caracteres.
  * `website`: String opcional con formato de URL válido (`z.string().url().optional()`).
* `createReviewSchema`:
  * `author`: String no vacío, mín. 2, máx. 100 caracteres.
  * `rating`: Número entero entre 1 y 5 (inclusive).
  * `comment`: String de al menos 10 caracteres y máximo 500 caracteres.

---

### 3. Endpoints a Implementar

#### 📂 Marcas (`/api/brands`)
* `GET /api/brands`: Retorna todas las marcas con la cantidad de productos que tiene cada una (`_count`).
* `POST /api/brands`: Crea una nueva marca (aplica validación Zod). Si el nombre ya existe, debe retornar `409 Conflict`.

#### 📂 Reseñas de Productos (`/api/products/:id/reviews`)
* `GET /api/products/:id/reviews`: Retorna todas las reseñas del producto especificado y además calcula e incluye en la respuesta el **promedio de calificación** (`averageRating`).
* `POST /api/products/:id/reviews`: Registra una nueva reseña para el producto (aplica validación Zod).
  * **Regla de negocio:** No se pueden crear reseñas para productos inexistentes (devolver `404 Not Found`).

#### 📂 Filtrado Avanzado en Productos (`/api/products`)
* Modificar el endpoint existente `GET /api/products` para permitir filtrar también por marca (`brandId` o `brandName`).

---

## 🧪 Pruebas y Evidencias
Debes incluir en la raíz del proyecto un archivo `tests.http` (o exportar una colección de Thunder Client / Postman en formato JSON) con al menos las siguientes pruebas:
1. Crear una marca válida.
2. Intentar crear una marca con URL inválida o nombre corto (probar respuesta `400 Bad Request`).
3. Crear un producto asignado a una marca y categoría.
4. Crear una reseña válida para dicho producto.
5. Intentar crear una reseña con calificación fuera de rango (ej. `rating: 0` o `rating: 6`) (probar respuesta `400 Bad Request`).
6. Obtener las reseñas del producto y verificar el promedio de calificación.
7. Filtrar productos por marca y categoría.

---

## 📊 Rúbrica de Evaluación (Escala 1.0 a 7.0)

| Criterio | Descripción | Puntaje / Ponderación |
| :--- | :--- | :---: |
| **Modelado Prisma y Migraciones** | Modelos `Brand` y `Review` correctamente definidos con tipos de datos adecuados, relaciones 1:N y migración generada sin errores en PostgreSQL. | **20%** |
| **Validación de Datos con Zod** | Esquemas Zod implementados y aplicados mediante middleware en todos los endpoints requeridos, rechazando payloads inválidos con `400 Bad Request`. | **25%** |
| **Controladores y Lógica de Negocio** | Implementación correcta de los endpoints requeridos, cálculo de promedio de calificaciones, filtrado por query params y códigos HTTP adecuados (200, 201, 400, 404, 409). | **30%** |
| **Arquitectura y Limpieza de Código** | Respeto de la arquitectura en capas (`routes` -> `middlewares` -> `controllers` -> `prisma`), separación de responsabilidades y manejo de errores con `try/catch/next`. | **15%** |
| **Archivo de Pruebas / HTTP Client** | Archivo `.http` o colección Postman/Thunder Client con los casos de prueba de éxito y error solicitados. | **10%** |

---

## 🚀 Instrucciones de Entrega
1. Subir el proyecto a un repositorio de GitHub (público o privado agregando a los ayudantes).
2. Incluir un archivo `README.md` con las instrucciones para clonar, instalar dependencias (`npm install`), configurar variables de entorno y ejecutar migraciones (`npx prisma migrate dev`).
3. **NO** subir la carpeta `node_modules/` ni el archivo `.env` real (utilizar `.gitignore`).
