# Documento de Arquitectura del Sistema (SAD)

---

## 1. Información General

| Campo                     | Detalle                                        |
| ------------------------- | ---------------------------------------------- |
| **Nombre del Proyecto**   | ControlaCRM                                    |
| **Autor / Desarrollador** | Angel Didier Serrato Arias                     |
| **Institución**           | Servicio Nacional de Aprendizaje (SENA)        |
| **Programa**              | Tecnólogo en Análisis y Desarrollo de Software |
| **Fecha de Creación**     | Febrero 2026                                   |
| **Versión del Documento** | 1.0                                            |

---

## 2. Propósito

Este documento describe la arquitectura técnica del sistema ControlaCRM, incluyendo la organización del código, las capas de la aplicación, el flujo de datos, las decisiones de diseño y la infraestructura de despliegue. Sirve como guía de referencia durante el desarrollo y mantenimiento del proyecto.

---

## 3. Visión General de la Arquitectura

ControlaCRM sigue una arquitectura **cliente-servidor desacoplada**, donde el frontend y el backend son aplicaciones independientes que se comunican exclusivamente a través de una **API REST**. Ambas aplicaciones conviven en un único repositorio (monorepo) por simplicidad de gestión en el contexto del proyecto.

```
[Cliente - React SPA]  <-->  [API REST - Node.js/Express]  <-->  [MongoDB Atlas]
  controlacrm.serrato.me        controlacrm.serrato.me/api          Cloud (M0)
```

---

## 4. Arquitectura del Backend

### 4.1 Patrón MVC + Service Layer

El backend implementa el patrón **MVC (Model – View – Controller)** adaptado para APIs REST, donde la "Vista" es reemplazada por la respuesta JSON. Se agrega una capa de **Service Layer** entre el Controller y el Model para aislar la lógica de negocio.

El flujo de una petición HTTP sigue este camino:

```
HTTP Request
    │
    ▼
[ Routes ]          → Define los endpoints y aplica middlewares
    │
    ▼
[ Middlewares ]     → Autenticación JWT, validación de datos, manejo de roles
    │
    ▼
[ Controllers ]     → Recibe la request, llama al service, devuelve la response
    │
    ▼
[ Services ]        → Contiene la lógica de negocio, interactúa con los modelos
    │
    ▼
[ Models ]          → Define los schemas de Mongoose e interactúa con MongoDB
    │
    ▼
[ MongoDB Atlas ]   → Persistencia de datos
```

### 4.2 Responsabilidades por Capa

| Capa            | Archivo(s)                    | Responsabilidad                                                         |
| --------------- | ----------------------------- | ----------------------------------------------------------------------- |
| **Routes**      | `routes/*.routes.js`          | Definir endpoints REST y encadenar middlewares y controllers            |
| **Middlewares** | `middlewares/*.middleware.js` | Autenticación JWT, validación de esquemas Joi, manejo de errores, roles |
| **Controllers** | `controllers/*.controller.js` | Recibir la request HTTP, delegar al service y retornar la response JSON |
| **Services**    | `services/*.service.js`       | Lógica de negocio, operaciones sobre los modelos, reglas de dominio     |
| **Models**      | `models/*.model.js`           | Schema de Mongoose, índices, definición de la estructura de datos       |
| **Validators**  | `validators/*.validator.js`   | Esquemas de validación Joi reutilizables por los middlewares            |
| **Config**      | `config/*.config.js`          | Configuración de conexión a MongoDB y Swagger                           |

### 4.3 Estructura de Carpetas del Backend

```
server/
├── package.json
├── README.md
└── src/
    ├── server.js                        # Punto de entrada, configuración de Express
    ├── config/
    │   ├── db.config.js                 # Conexión a MongoDB Atlas con Mongoose
    │   └── swagger.config.js            # Configuración de swagger-jsdoc
    ├── controllers/
    │   ├── auth.controller.js           # Registro, login
    │   ├── contact.controller.js        # CRUD + desactivación de contactos
    │   └── user.controller.js           # Perfil de usuario (preparado para futuro)
    ├── middlewares/
    │   ├── auth.middleware.js           # Verificación y decodificación del token JWT
    │   ├── errorHandler.middleware.js   # Manejador global de errores
    │   ├── role.middleware.js           # Verificación de roles (preparado para futuro)
    │   └── validate.middleware.js       # Middleware genérico de validación con Joi
    ├── models/
    │   ├── contact.model.js             # Schema del contacto con índices
    │   └── user.model.js                # Schema del usuario
    ├── routes/
    │   ├── auth.routes.js               # POST /api/auth/register, /api/auth/login
    │   ├── contact.routes.js            # GET, POST, PUT, PATCH /api/contacts
    │   └── user.routes.js               # GET, PUT /api/users/me
    ├── services/
    │   ├── auth.service.js              # Lógica de registro, login, hashing, JWT
    │   ├── contact.service.js           # Lógica de gestión de contactos
    │   └── user.service.js              # Lógica de perfil de usuario
    └── validators/
        ├── auth.validator.js            # Esquemas Joi para registro y login
        ├── contact.validator.js         # Esquemas Joi para creación y edición de contactos
        └── user.validator.js            # Esquemas Joi para actualización de perfil
```

### 4.4 Configuración del Servidor (`server.js`)

El punto de entrada configura Express con los siguientes elementos en orden:

1. `helmet()` – Cabeceras de seguridad HTTP.
2. `cors()` – Configurado para aceptar peticiones desde `controlacrm.serrato.me`.
3. `express.json()` – Parseo del body en formato JSON.
4. `dotenv` – Carga de variables de entorno.
5. Montaje de rutas bajo el prefijo `/api`.
6. Swagger UI montado en `/api/docs`.
7. Middleware global de manejo de errores.

---

## 5. Arquitectura del Frontend

### 5.1 Patrón de Componentes por Responsabilidad

El frontend es una **SPA (Single Page Application)** construida con React 19 y TypeScript. La arquitectura separa las responsabilidades en capas bien definidas.

```
[ Pages ]           → Vistas completas asociadas a una ruta
    │
    ▼
[ Layouts ]         → Estructura visual compartida (público / privado)
    │
    ▼
[ Components ]      → Componentes reutilizables de UI (Shadcn/UI + propios)
    │
    ▼
[ Services ]        → Llamadas HTTP a la API con Axios
    │
    ▼
[ Store ]           → Estado global de autenticación con Zustand
```

### 5.2 Responsabilidades por Capa

| Capa           | Archivo(s)           | Responsabilidad                                                     |
| -------------- | -------------------- | ------------------------------------------------------------------- |
| **Pages**      | `pages/*.tsx`        | Vistas completas asociadas a cada ruta de React Router              |
| **Layouts**    | `layouts/*.tsx`      | Estructura visual compartida entre páginas públicas y privadas      |
| **Components** | `components/*.tsx`   | Componentes reutilizables: ProtectedRoute, componentes Shadcn/UI    |
| **Services**   | `services/api.ts`    | Instancia de Axios configurada con baseURL e interceptores de token |
| **Store**      | `store/authStore.ts` | Estado global del usuario autenticado y token JWT con Zustand       |
| **Lib**        | `lib/utils.ts`       | Utilidades compartidas (cn() para clases de Tailwind)               |

### 5.3 Estructura de Carpetas del Frontend

```
client/
├── components.json                      # Configuración de Shadcn/UI
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.ts
└── src/
    ├── App.tsx                          # Definición del enrutador principal (React Router)
    ├── main.tsx                         # Punto de entrada de React
    ├── index.css                        # Estilos globales y variables de Tailwind/Shadcn
    ├── components/
    │   ├── ProtectedRoute.tsx           # Redirige al login si no hay sesión activa
    │   └── ui/                          # Componentes generados por Shadcn/UI
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── form.tsx
    │       ├── input.tsx
    │       ├── label.tsx
    │       └── sonner.tsx
    ├── layouts/
    │   ├── PublicLayout.tsx             # Layout para páginas sin autenticación (login, register)
    │   └── PrivateLayout.tsx            # Layout para páginas protegidas (dashboard, contactos)
    ├── lib/
    │   └── utils.ts                     # Función cn() para merge de clases Tailwind
    ├── pages/
    │   ├── LandingPage.tsx              # Página de inicio pública
    │   ├── LoginPage.tsx                # Formulario de inicio de sesión
    │   ├── RegisterPage.tsx             # Formulario de registro
    │   ├── ForgotPasswordPage.tsx       # Recuperación de contraseña (preparado para futuro)
    │   ├── DashboardPage.tsx            # Dashboard principal del usuario
    │   ├── ContactsPage.tsx             # Lista de contactos activos
    │   ├── ContactDetailPage.tsx        # Detalle de un contacto
    │   ├── ContactNewPage.tsx           # Formulario de creación de contacto
    │   ├── ContactEditPage.tsx          # Formulario de edición de contacto
    │   └── ProfilePage.tsx              # Perfil del usuario autenticado
    ├── services/
    │   └── api.ts                       # Instancia Axios con baseURL y token interceptor
    └── store/
        └── authStore.ts                 # Estado global: usuario, token, login(), logout()
```

### 5.4 Enrutamiento

El enrutamiento se gestiona con **React Router v7**. Las rutas se dividen en dos grupos:

**Rutas públicas** (accesibles sin autenticación):

| Ruta               | Página             |
| ------------------ | ------------------ |
| `/`                | LandingPage        |
| `/login`           | LoginPage          |
| `/forgot-password` | ForgotPasswordPage |

**Rutas privadas** (requieren token JWT válido, gestionadas por `ProtectedRoute`):

| Ruta                 | Página            | Rol requerido |
| -------------------- | ----------------- | ------------- |
| `/dashboard`         | DashboardPage     | Admin, Sales  |
| `/contacts`          | ContactsPage      | Admin, Sales  |
| `/contacts/new`      | ContactNewPage    | Admin, Sales  |
| `/contacts/:id`      | ContactDetailPage | Admin, Sales  |
| `/contacts/:id/edit` | ContactEditPage   | Admin, Sales  |
| `/profile`           | ProfilePage       | Admin, Sales  |
| `/users`             | UsersPage         | Solo Admin    |
| `/users/new`         | UserNewPage       | Solo Admin    |
| `/users/:id`         | UserDetailPage    | Solo Admin    |
| `/users/:id/edit`    | UserEditPage      | Solo Admin    |

---

## 6. Modelo de Datos

### 6.1 Colección `users`

| Campo       | Tipo     | Requerido | Descripción                                |
| ----------- | -------- | --------- | ------------------------------------------ |
| `_id`       | ObjectId | Auto      | Identificador único generado por MongoDB   |
| `name`      | String   | Sí        | Nombre completo del usuario                |
| `email`     | String   | Sí        | Correo electrónico único                   |
| `password`  | String   | Sí        | Contraseña hasheada con Argon2             |
| `createdAt` | Date     | Auto      | Fecha de creación (timestamps de Mongoose) |
| `updatedAt` | Date     | Auto      | Fecha de última actualización              |

### 6.2 Colección `contacts`

| Campo        | Tipo                 | Requerido | Descripción                                                         |
| ------------ | -------------------- | --------- | ------------------------------------------------------------------- |
| `_id`        | ObjectId             | Auto      | Identificador único generado por MongoDB                            |
| `firstName`  | String               | Sí        | Nombre del contacto                                                 |
| `lastName`   | String               | Sí        | Apellido del contacto                                               |
| `email`      | String               | Sí        | Correo electrónico del contacto                                     |
| `phone`      | String               | No        | Teléfono del contacto                                               |
| `status`     | Enum                 | Sí        | Estado: `NEW`, `IN_PROGRESS`, `CONTACTED`, `CLOSED`. Default: `NEW` |
| `notes`      | String               | No        | Notas adicionales                                                   |
| `assignedTo` | ObjectId (ref: User) | Sí        | Usuario propietario del contacto                                    |
| `active`     | Boolean              | Sí        | Soft delete: `true` activo, `false` desactivado. Default: `true`    |
| `createdAt`  | Date                 | Auto      | Fecha de creación                                                   |
| `updatedAt`  | Date                 | Auto      | Fecha de última actualización                                       |

**Índices definidos:**

| Índice                         | Propósito                                           |
| ------------------------------ | --------------------------------------------------- |
| `{ active: 1 }`                | Filtrar contactos activos/inactivos                 |
| `{ assignedTo: 1, active: 1 }` | Consulta principal: contactos activos de un usuario |
| `{ status: 1, active: 1 }`     | Filtrar por estado en contactos activos             |
| `{ email: 1 }`                 | Búsqueda por correo electrónico                     |

---

## 7. Diseño de la API REST

### 7.1 Prefijo Base

Todos los endpoints de la API tienen el prefijo `/api`. La documentación interactiva está disponible en `/api/docs` (Swagger UI).

### 7.2 Endpoints de Autenticación

| Método | Endpoint             | Descripción               | Auth |
| ------ | -------------------- | ------------------------- | ---- |
| POST   | `/api/auth/register` | Registro de nuevo usuario | No   |
| POST   | `/api/auth/login`    | Inicio de sesión          | No   |

### 7.3 Endpoints de Contactos

| Método | Endpoint                       | Descripción                          | Auth |
| ------ | ------------------------------ | ------------------------------------ | ---- |
| GET    | `/api/contacts`                | Listar contactos activos del usuario | Sí   |
| POST   | `/api/contacts`                | Crear nuevo contacto                 | Sí   |
| GET    | `/api/contacts/:id`            | Obtener detalle de un contacto       | Sí   |
| PUT    | `/api/contacts/:id`            | Editar un contacto                   | Sí   |
| PATCH  | `/api/contacts/:id/deactivate` | Desactivar un contacto (soft delete) | Sí   |

### 7.4 Endpoints de Usuario

| Método | Endpoint         | Descripción                               | Auth | Rol          |
| ------ | ---------------- | ----------------------------------------- | ---- | ------------ |
| GET    | `/api/users`     | Listar todos los usuarios                 | Sí   | Solo Admin   |
| POST   | `/api/users`     | Crear nuevo usuario                       | Sí   | Solo Admin   |
| GET    | `/api/users/me`  | Obtener perfil del usuario autenticado    | Sí   | Admin, Sales |
| PUT    | `/api/users/me`  | Actualizar perfil del usuario autenticado | Sí   | Admin, Sales |
| GET    | `/api/users/:id` | Ver detalle de un usuario                 | Sí   | Solo Admin   |
| PUT    | `/api/users/:id` | Editar un usuario                         | Sí   | Solo Admin   |
| DELETE | `/api/users/:id` | Eliminar un usuario                       | Sí   | Solo Admin   |

### 7.5 Formato de Respuesta

Todas las respuestas de la API siguen un formato consistente:

**Respuesta exitosa:**

```json
{
  "success": true,
  "data": {}
}
```

**Respuesta de error:**

```json
{
  "success": false,
  "message": "Descripción del error"
}
```

---

## 8. Seguridad

| Mecanismo                    | Implementación                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| **Autenticación**            | JWT verificado en `auth.middleware.js` en cada ruta protegida                                    |
| **Hashing de contraseñas**   | Argon2 en `auth.service.js`                                                                      |
| **Cabeceras HTTP**           | Helmet configurado en `server.js`                                                                |
| **CORS**                     | Configurado para aceptar solo `controlacrm.serrato.me`                                           |
| **Variables de entorno**     | dotenv: `MONGODB_URI`, `JWT_SECRET`, `PORT`, `CLIENT_URL`                                        |
| **Validación de entrada**    | Joi en backend, Zod en frontend, previniendo datos malformados                                   |
| **Autorización por recurso** | Verificación de `assignedTo === userId` en services de contactos para rol Sales                  |
| **Control de roles**         | `role.middleware.js` verifica que el rol del token JWT tenga permiso para el endpoint solicitado |

---

## 9. Infraestructura y Despliegue

```
                        ┌─────────────────────────────┐
                        │         Namecheap DNS        │
                        │  controlacrm.serrato.me      │
                        │  CNAME → Render.com          │
                        └────────────┬────────────────┘
                                     │
                        ┌────────────▼────────────────┐
                        │          Render.com          │
                        │                              │
                        │  ┌────────────────────────┐  │
                        │  │  Static Site (Frontend) │  │
                        │  │  React SPA (Vite build) │  │
                        │  └────────────┬───────────┘  │
                        │               │               │
                        │  ┌────────────▼───────────┐  │
                        │  │  Web Service (Backend)  │  │
                        │  │  Node.js + Express      │  │
                        │  └────────────┬───────────┘  │
                        └───────────────┼──────────────┘
                                        │
                        ┌───────────────▼──────────────┐
                        │        MongoDB Atlas          │
                        │        M0 Cluster (Free)      │
                        └──────────────────────────────┘
```

| Componente    | Plataforma             | Plan         | Detalles                                           |
| ------------- | ---------------------- | ------------ | -------------------------------------------------- |
| Frontend      | Render.com Static Site | Gratuito     | Build: `npm run build`, directorio: `client/dist`  |
| Backend       | Render.com Web Service | Gratuito     | Start: `node src/server.js`, directorio: `server/` |
| Base de Datos | MongoDB Atlas          | M0 Gratuito  | 512 MB, región us-east-1                           |
| Dominio       | Namecheap              | Ya adquirido | CNAME `controlacrm` → dominio Render               |

---

## 10. Decisiones de Arquitectura

| Decisión                  | Justificación                                                                                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Monorepo**              | Simplifica la gestión del proyecto para un desarrollador individual, facilita la entrega como proyecto de grado                                       |
| **MVC + Service Layer**   | Separa responsabilidades claramente, facilita pruebas y escalabilidad futura                                                                          |
| **JWT stateless**         | No requiere manejo de sesiones en el servidor, adecuado para APIs REST desacopladas                                                                   |
| **Roles Admin/Sales**     | Separación mínima de responsabilidades adecuada para el contexto MiPyme: un administrador controla el acceso y los vendedores gestionan sus contactos |
| **Soft Delete**           | Preserva el historial de datos sin eliminar registros físicamente, permite recuperación futura                                                        |
| **Mongoose**              | ODM maduro con soporte de schemas, validaciones e índices, adecuado para MongoDB                                                                      |
| **Zod + React Hook Form** | Validación type-safe en el frontend, integración nativa con TypeScript                                                                                |
| **Zustand**               | Estado global ligero sin boilerplate excesivo, adecuado para el tamaño del MVP                                                                        |
| **Shadcn/UI**             | Componentes accesibles y personalizables sin dependencia de una librería de UI cerrada                                                                |

---

## 11. Limitaciones Conocidas del MVP

### 11.1 Arquitectura Single-Tenant

ControlaCRM MVP está diseñado con una arquitectura **single-tenant**, lo que significa que todos los datos de usuarios y contactos conviven en la misma base de datos sin separación por empresa u organización.

**Implicación actual:** El sistema está pensado para ser usado por una sola empresa a la vez. Si múltiples empresas usaran la misma instancia del sistema, el Admin de una empresa tendría acceso a los datos de otra.

**Impacto en la distribución:** Si se quisiera distribuir ControlaCRM como un producto SaaS (Software as a Service) donde múltiples empresas lo contraten y usen simultáneamente, la arquitectura actual no lo soporta de forma segura.

### 11.2 Creación del Primer Admin

El primer usuario Admin debe crearse manualmente ejecutando el script `npm run seed`. No existe un flujo de registro público ni una pantalla de onboarding para nuevas empresas.

### 11.3 Sin Recuperación de Contraseña

La recuperación de contraseña no está implementada en el MVP. Requiere integración con un servicio de email (Resend o Nodemailer) que está fuera del alcance actual.

---

## 12. Evolución Futura – Arquitectura Multi-Tenant

Para convertir ControlaCRM en un producto distribuible donde múltiples empresas puedan usarlo simultáneamente, se requiere evolucionar hacia una arquitectura **multi-tenant**.

### 12.1 Qué es Multi-Tenant

En un modelo multi-tenant cada empresa que contrata el servicio tiene su propio espacio aislado de datos dentro del mismo sistema:

```
Empresa A → su Admin → sus Sales → sus Contactos
Empresa B → su Admin → sus Sales → sus Contactos
Empresa C → su Admin → sus Sales → sus Contactos
```

### 12.2 Cambios de Arquitectura Requeridos

**En la base de datos:**

- Agregar colección `organizations` con campos: `name`, `plan`, `active`, `createdAt`
- Agregar campo `organizationId` a los modelos `User` y `Contact`
- Todos los índices deben incluir `organizationId` como primer campo

**En el backend:**

- Crear middleware `tenant.middleware.js` que identifica la organización desde el token JWT
- Agregar `organizationId` al payload del JWT al hacer login
- Filtrar todas las consultas por `organizationId` en los services
- Crear endpoint de registro público para nuevas organizaciones: `POST /api/auth/register`

**En el frontend:**

- Implementar pantalla de registro de nueva empresa
- Implementar pantalla de onboarding para configurar el primer Admin

### 12.3 Impacto Estimado

| Componente  | Cambio                                           |
| ----------- | ------------------------------------------------ |
| Modelos     | Agregar `organizationId` a User y Contact        |
| Middlewares | Nuevo middleware `tenant.middleware.js`          |
| Services    | Filtrar todas las consultas por `organizationId` |
| Auth        | Incluir `organizationId` en el payload JWT       |
| Frontend    | Pantalla de registro y onboarding                |

> Esta evolución está planificada para una versión futura de ControlaCRM y no forma parte del alcance del MVP actual del proyecto de grado.
