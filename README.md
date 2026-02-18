# ControlaCRM

Aplicación web CRM para la gestión de contactos comerciales, desarrollada como proyecto de grado del programa Tecnólogo en Análisis y Desarrollo de Software del SENA.

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Variables de Entorno](#variables-de-entorno)
- [Ejecución en Desarrollo](#ejecución-en-desarrollo)
- [Roles y Permisos](#roles-y-permisos)
- [Documentación de la API](#documentación-de-la-api)
- [Despliegue](#despliegue)
- [Autor](#autor)

---

## Descripción

ControlaCRM es una SPA (Single Page Application) que permite a micro y pequeñas empresas gestionar su base de contactos comerciales. El sistema maneja dos roles: **Admin**, que administra usuarios y tiene acceso total a los contactos, y **Sales**, que gestiona únicamente sus propios contactos asignados.

El proyecto aplica el patrón **MVC + Service Layer** en el backend y una arquitectura de componentes por responsabilidad en el frontend.

---

## Stack Tecnológico

### Backend

- **Runtime:** Node.js
- **Framework:** Express 5
- **Base de datos:** MongoDB + Mongoose 9
- **Autenticación:** JSON Web Tokens (JWT)
- **Hash de contraseñas:** Argon2
- **Validación:** Joi
- **Documentación API:** Swagger (swagger-jsdoc + swagger-ui-express)
- **Seguridad:** Helmet, CORS
- **Variables de entorno:** dotenv

### Frontend

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 7
- **Estilos:** Tailwind CSS v4 + Shadcn/UI
- **Enrutamiento:** React Router v7
- **HTTP Client:** Axios
- **Formularios:** React Hook Form + Zod
- **Estado global:** Zustand
- **Notificaciones:** React Hot Toast
- **Iconos:** Lucide React

---

## Estructura del Proyecto

```
controlacrm/
├── README.md
├── client/                        # Frontend React + TypeScript
│   └── src/
│       ├── components/            # Componentes reutilizables y Shadcn/UI
│       ├── layouts/               # Layouts público y privado
│       ├── lib/                   # Utilidades (cn())
│       ├── pages/                 # Vistas asociadas a rutas
│       ├── services/              # Instancia Axios configurada
│       └── store/                 # Estado global con Zustand
└── server/                        # Backend Node.js + Express
    └── src/
        ├── config/                # Conexión a MongoDB y Swagger
        ├── controllers/           # Capa de entrada HTTP
        ├── middlewares/           # Auth JWT, validación, errores, roles
        ├── models/                # Schemas de Mongoose
        ├── routes/                # Definición de endpoints
        ├── services/              # Lógica de negocio
        └── validators/            # Esquemas de validación Joi
```

---

## Requisitos Previos

Asegúrate de tener instalado en tu máquina:

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) v9 o superior
- Una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas) con un cluster M0 (gratuito) creado

---

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/controlacrm.git
cd controlacrm
```

### 2. Instalar dependencias del servidor

```bash
cd server
npm install
```

### 3. Instalar dependencias del cliente

```bash
cd ../client
npm install
```

### 4. Configurar variables de entorno

Crea el archivo `.env` en la carpeta `server/` basándote en el archivo de ejemplo:

```bash
cd ../server
cp .env.example .env
```

Luego edita el archivo `.env` con tus valores reales. Ver sección [Variables de Entorno](#variables-de-entorno).

---

## Variables de Entorno

### Server (`server/.env`)

```env
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/controlacrm
JWT_SECRET=tu_secreto_jwt_muy_seguro
CLIENT_URL=http://localhost:5173
```

| Variable      | Descripción                                 |
| ------------- | ------------------------------------------- |
| `PORT`        | Puerto en el que corre el servidor Express  |
| `MONGODB_URI` | Cadena de conexión a MongoDB Atlas          |
| `JWT_SECRET`  | Secreto para firmar y verificar tokens JWT  |
| `CLIENT_URL`  | URL del frontend para configuración de CORS |

> **Importante:** El archivo `.env` nunca debe subirse al repositorio. Está incluido en `.gitignore`.

---

## Ejecución en Desarrollo

Abre dos terminales:

**Terminal 1 – Servidor:**

```bash
cd server
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

**Terminal 2 – Cliente:**

```bash
cd client
npm run dev
```

El cliente estará disponible en `http://localhost:5173`

---

## Roles y Permisos

| Acción                         | Admin | Sales        |
| ------------------------------ | ----- | ------------ |
| Iniciar sesión                 | ✅    | ✅           |
| Crear usuarios                 | ✅    | ❌           |
| Listar usuarios                | ✅    | ❌           |
| Editar usuarios                | ✅    | ❌           |
| Eliminar usuarios              | ✅    | ❌           |
| Ver todos los contactos        | ✅    | ❌           |
| Ver sus propios contactos      | ✅    | ✅           |
| Crear contactos                | ✅    | ✅           |
| Editar contactos               | ✅    | Solo propios |
| Desactivar contactos           | ✅    | Solo propios |
| Actualizar estado de contactos | ✅    | Solo propios |

> Los usuarios son creados exclusivamente por el Admin. No existe registro público.

---

## Documentación de la API

La documentación interactiva de la API está disponible en Swagger UI:

- **Desarrollo:** `http://localhost:3000/api/docs`
- **Producción:** `https://controlacrm.serrato.me/api/docs`

---

## Despliegue

El proyecto está desplegado en **Render.com** bajo el dominio `controlacrm.serrato.me`.

| Componente    | Plataforma         | URL                                  |
| ------------- | ------------------ | ------------------------------------ |
| Frontend      | Render Static Site | `https://controlacrm.serrato.me`     |
| Backend       | Render Web Service | `https://controlacrm.serrato.me/api` |
| Base de datos | MongoDB Atlas M0   | Conexión interna                     |

El dominio está configurado en **Namecheap** mediante un registro CNAME apuntando a Render.

> **Nota:** El backend usa la capa gratuita de Render, por lo que puede experimentar un tiempo de arranque en frío de hasta 50 segundos tras períodos de inactividad.

---

## Autor

**Angel Didier Serrato Arias**
Proyecto de Grado – Tecnólogo en Análisis y Desarrollo de Software
Servicio Nacional de Aprendizaje (SENA) – 2026

---
