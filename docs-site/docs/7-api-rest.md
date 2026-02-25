# Diseño de API REST

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

## 2. Convenciones Generales

### 2.1 URL Base

| Entorno                   | URL Base                                     |
| ------------------------- | -------------------------------------------- |
| Producción                | `https://controlacrm.serrato.me/api/v1`      |
| Desarrollo                | `http://localhost:3000/api/v1`               |
| Documentación interactiva | `https://controlacrm.serrato.me/api/v1/docs` |

### 2.2 Formato de Datos

- Todas las peticiones y respuestas usan **JSON**.
- El header `Content-Type: application/json` es requerido en peticiones con body.
- Las fechas siguen el formato **ISO 8601** (`2026-02-17T10:30:00.000Z`).

### 2.3 Autenticación

- Las rutas protegidas requieren un token **JWT** enviado en el header de la petición.
- Formato: `Authorization: Bearer <token>`
- El token se obtiene al iniciar sesión y tiene un tiempo de expiración definido.

### 2.4 Formato de Respuesta

Todas las respuestas siguen una estructura consistente:

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

### 2.5 Códigos de Estado HTTP

| Código                      | Significado         | Cuándo se usa                              |
| --------------------------- | ------------------- | ------------------------------------------ |
| `200 OK`                    | Éxito               | GET, PUT, PATCH exitosos                   |
| `201 Created`               | Creado              | POST exitoso que crea un recurso           |
| `400 Bad Request`           | Error de validación | Datos de entrada inválidos                 |
| `401 Unauthorized`          | No autenticado      | Token ausente o inválido                   |
| `403 Forbidden`             | No autorizado       | Token válido pero sin permisos suficientes |
| `404 Not Found`             | No encontrado       | El recurso solicitado no existe            |
| `409 Conflict`              | Conflicto           | Email duplicado en registro                |
| `500 Internal Server Error` | Error del servidor  | Error inesperado en el backend             |

---

## 3. Autenticación

### POST `/api/v1/auth/login`

Inicia sesión y retorna un token JWT.

**Autenticación requerida:** No

**Body:**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta exitosa `200 OK`:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "email": "usuario@ejemplo.com",
      "role": "sales"
    }
  }
}
```

**Errores posibles:**

| Código | Mensaje                    |
| ------ | -------------------------- |
| `400`  | Datos de entrada inválidos |
| `401`  | Credenciales incorrectas   |

### POST `/api/v1/auth/refresh`

Renueva el JWT del usuario autenticado. El token actual debe estar vigente (no expirado).

**Autenticación requerida:** Sí — Admin y Sales

**Body:** No requerido. El token se envía en el header `Authorization: Bearer <token>`.

**Respuesta exitosa `200 OK`:**

```json
{
  "success": true,
  "message": "Token refrescado exitosamente",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "email": "usuario@empresa.com",
      "role": "sales"
    }
  }
}
```

**Errores posibles:**

| Código | Mensaje                            |
| ------ | ---------------------------------- |
| `401`  | Token ausente, inválido o expirado |

---

> Todos los endpoints de esta sección requieren autenticación. Los endpoints de gestión (crear, listar, editar, eliminar) son exclusivos del rol **Admin**.

---

### GET `/api/v1/users`

Lista todos los usuarios del sistema.

**Autenticación requerida:** Sí — Solo Admin

**Respuesta exitosa `200 OK`:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "email": "vendedor@empresa.com",
      "role": "sales",
      "active": true,
      "createdBy": "64f1a2b3c4d5e6f7a8b9c0d0",
      "createdAt": "2026-02-01T10:00:00.000Z",
      "updatedAt": "2026-02-01T10:00:00.000Z"
    }
  ]
}
```

**Errores posibles:**

| Código | Mensaje                                      |
| ------ | -------------------------------------------- |
| `401`  | Token ausente o inválido                     |
| `403`  | No tienes permisos para realizar esta acción |

---

### POST `/api/v1/users`

Crea un nuevo usuario.

**Autenticación requerida:** Sí — Solo Admin

**Body:**

```json
{
  "email": "nuevo@empresa.com",
  "password": "contraseña123",
  "role": "sales"
}
```

**Respuesta exitosa `201 Created`:**

```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "email": "nuevo@empresa.com",
    "role": "sales",
    "active": true,
    "createdBy": "64f1a2b3c4d5e6f7a8b9c0d0",
    "createdAt": "2026-02-17T10:00:00.000Z",
    "updatedAt": "2026-02-17T10:00:00.000Z"
  }
}
```

**Errores posibles:**

| Código | Mensaje                                      |
| ------ | -------------------------------------------- |
| `400`  | Datos de entrada inválidos                   |
| `401`  | Token ausente o inválido                     |
| `403`  | No tienes permisos para realizar esta acción |
| `409`  | El correo electrónico ya está registrado     |

---

### GET `/api/v1/users/:id`

Retorna el detalle de un usuario específico.

**Autenticación requerida:** Sí — Solo Admin

**Parámetros de ruta:**

| Parámetro | Tipo     | Descripción    |
| --------- | -------- | -------------- |
| `id`      | ObjectId | ID del usuario |

**Respuesta exitosa `200 OK`:**

```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "email": "vendedor@empresa.com",
    "role": "sales",
    "active": true,
    "createdBy": "64f1a2b3c4d5e6f7a8b9c0d0",
    "createdAt": "2026-02-01T10:00:00.000Z",
    "updatedAt": "2026-02-01T10:00:00.000Z"
  }
}
```

**Errores posibles:**

| Código | Mensaje                                      |
| ------ | -------------------------------------------- |
| `401`  | Token ausente o inválido                     |
| `403`  | No tienes permisos para realizar esta acción |
| `404`  | Usuario no encontrado                        |

---

### PUT `/api/v1/users/:id`

Actualiza los datos de un usuario.

**Autenticación requerida:** Sí — Solo Admin

**Parámetros de ruta:**

| Parámetro | Tipo     | Descripción             |
| --------- | -------- | ----------------------- |
| `id`      | ObjectId | ID del usuario a editar |

**Body:**

```json
{
  "email": "nuevo_email@empresa.com",
  "role": "admin"
}
```

**Respuesta exitosa `200 OK`:**

```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "email": "nuevo_email@empresa.com",
    "role": "admin",
    "active": true,
    "createdAt": "2026-02-01T10:00:00.000Z",
    "updatedAt": "2026-02-17T12:00:00.000Z"
  }
}
```

**Errores posibles:**

| Código | Mensaje                                      |
| ------ | -------------------------------------------- |
| `400`  | Datos de entrada inválidos                   |
| `401`  | Token ausente o inválido                     |
| `403`  | No tienes permisos para realizar esta acción |
| `404`  | Usuario no encontrado                        |
| `409`  | El correo electrónico ya está registrado     |

---

### DELETE `/api/v1/users/:id`

Elimina un usuario del sistema.

**Autenticación requerida:** Sí — Solo Admin

**Parámetros de ruta:**

| Parámetro | Tipo     | Descripción               |
| --------- | -------- | ------------------------- |
| `id`      | ObjectId | ID del usuario a eliminar |

**Respuesta exitosa `200 OK`:**

```json
{
  "success": true,
  "data": {
    "message": "Usuario eliminado correctamente"
  }
}
```

**Errores posibles:**

| Código | Mensaje                                      |
| ------ | -------------------------------------------- |
| `401`  | Token ausente o inválido                     |
| `403`  | No tienes permisos para realizar esta acción |
| `404`  | Usuario no encontrado                        |

---

## 5. Contactos

> Todos los endpoints de esta sección requieren autenticación. El rol **Sales** solo puede operar sobre sus propios contactos (`assignedTo === userId`). El rol **Admin** puede operar sobre todos los contactos.

---

### GET `/api/v1/contacts`

Lista los contactos activos.

**Autenticación requerida:** Sí — Admin y Sales

**Comportamiento por rol:**

- **Admin:** retorna todos los contactos donde `active: true`.
- **Sales:** retorna solo los contactos donde `assignedTo === userId` y `active: true`.

**Respuesta exitosa `200 OK`:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0e1",
      "firstName": "Carlos",
      "lastName": "Ramírez",
      "email": "carlos@empresa.com",
      "phone": "3001234567",
      "status": "NEW",
      "notes": "Contacto referido por proveedor",
      "assignedTo": {
        "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
        "email": "vendedor@empresa.com"
      },
      "active": true,
      "createdAt": "2026-02-10T09:00:00.000Z",
      "updatedAt": "2026-02-10T09:00:00.000Z"
    }
  ]
}
```

**Errores posibles:**

| Código | Mensaje                  |
| ------ | ------------------------ |
| `401`  | Token ausente o inválido |

---

### POST `/api/v1/contacts`

Crea un nuevo contacto.

**Autenticación requerida:** Sí — Admin y Sales

**Body:**

```json
{
  "firstName": "Carlos",
  "lastName": "Ramírez",
  "email": "carlos@empresa.com",
  "phone": "3001234567",
  "notes": "Contacto referido por proveedor"
}
```

> El campo `assignedTo` se asigna automáticamente en el backend desde el token JWT (`req.user.id`). No debe enviarse en el body.

**Respuesta exitosa `201 Created`:**

```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0e1",
    "firstName": "Carlos",
    "lastName": "Ramírez",
    "email": "carlos@empresa.com",
    "phone": "3001234567",
    "status": "NEW",
    "notes": "Contacto referido por proveedor",
    "assignedTo": "64f1a2b3c4d5e6f7a8b9c0d1",
    "active": true,
    "createdAt": "2026-02-17T10:00:00.000Z",
    "updatedAt": "2026-02-17T10:00:00.000Z"
  }
}
```

**Errores posibles:**

| Código | Mensaje                    |
| ------ | -------------------------- |
| `400`  | Datos de entrada inválidos |
| `401`  | Token ausente o inválido   |

---

### GET `/api/v1/contacts/:id`

Retorna el detalle de un contacto.

**Autenticación requerida:** Sí — Admin y Sales

**Parámetros de ruta:**

| Parámetro | Tipo     | Descripción     |
| --------- | -------- | --------------- |
| `id`      | ObjectId | ID del contacto |

**Respuesta exitosa `200 OK`:**

```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0e1",
    "firstName": "Carlos",
    "lastName": "Ramírez",
    "email": "carlos@empresa.com",
    "phone": "3001234567",
    "status": "IN_PROGRESS",
    "notes": "Contacto referido por proveedor",
    "assignedTo": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "email": "vendedor@empresa.com"
    },
    "active": true,
    "createdAt": "2026-02-10T09:00:00.000Z",
    "updatedAt": "2026-02-15T14:30:00.000Z"
  }
}
```

**Errores posibles:**

| Código | Mensaje                                   |
| ------ | ----------------------------------------- |
| `401`  | Token ausente o inválido                  |
| `403`  | No tienes permisos para ver este contacto |
| `404`  | Contacto no encontrado                    |

---

### PUT `/api/v1/contacts/:id`

Actualiza los datos de un contacto.

**Autenticación requerida:** Sí — Admin y Sales (Sales solo sus propios contactos)

**Parámetros de ruta:**

| Parámetro | Tipo     | Descripción              |
| --------- | -------- | ------------------------ |
| `id`      | ObjectId | ID del contacto a editar |

**Body:**

```json
{
  "firstName": "Carlos",
  "lastName": "Ramírez",
  "email": "carlos.nuevo@empresa.com",
  "phone": "3009876543",
  "notes": "Llamada realizada el 15 de febrero"
}
```

> Los campos `assignedTo`, `active` y `status` no son editables por este endpoint. Para cambiar el estado usa `PATCH /api/v1/contacts/:id/status`.

**Respuesta exitosa `200 OK`:**

```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0e1",
    "firstName": "Carlos",
    "lastName": "Ramírez",
    "email": "carlos.nuevo@empresa.com",
    "phone": "3009876543",
    "status": "CONTACTED",
    "notes": "Llamada realizada el 15 de febrero",
    "assignedTo": "64f1a2b3c4d5e6f7a8b9c0d1",
    "active": true,
    "createdAt": "2026-02-10T09:00:00.000Z",
    "updatedAt": "2026-02-17T11:00:00.000Z"
  }
}
```

**Errores posibles:**

| Código | Mensaje                                      |
| ------ | -------------------------------------------- |
| `400`  | Datos de entrada inválidos                   |
| `401`  | Token ausente o inválido                     |
| `403`  | No tienes permisos para editar este contacto |
| `404`  | Contacto no encontrado                       |

---

---

### PATCH `/api/v1/contacts/:id/status`

Actualiza únicamente el estado de un contacto.

**Autenticación requerida:** Sí — Admin y Sales (Sales solo sus propios contactos)

**Parámetros de ruta:**

| Parámetro | Tipo     | Descripción     |
| --------- | -------- | --------------- |
| `id`      | ObjectId | ID del contacto |

**Body:**

```json
{
  "status": "IN_PROGRESS"
}
```

> Valores válidos: `NEW`, `IN_PROGRESS`, `CONTACTED`, `CLOSED`.

**Respuesta exitosa `200 OK`:**

```json
{
  "success": true,
  "message": "Estado del contacto actualizado",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0e1",
    "firstName": "Carlos",
    "lastName": "Ramírez",
    "status": "IN_PROGRESS",
    "assignedTo": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "email": "vendedor@empresa.com"
    },
    "active": true,
    "createdAt": "2026-02-10T09:00:00.000Z",
    "updatedAt": "2026-02-17T11:00:00.000Z"
  }
}
```

**Errores posibles:**

| Código | Mensaje                                         |
| ------ | ----------------------------------------------- |
| `400`  | Estado inválido                                 |
| `401`  | Token ausente o inválido                        |
| `403`  | No tienes permiso para actualizar este contacto |
| `404`  | Contacto no encontrado                          |

---

### DELETE `/api/v1/contacts/:id`

Desactiva un contacto (soft delete). El registro permanece en la base de datos con `active: false`.

**Autenticación requerida:** Sí — Admin y Sales (Sales solo sus propios contactos)

**Parámetros de ruta:**

| Parámetro | Tipo     | Descripción                  |
| --------- | -------- | ---------------------------- |
| `id`      | ObjectId | ID del contacto a desactivar |

**Body:** No requerido

**Respuesta exitosa `200 OK`:**

```json
{
  "success": true,
  "message": "Contacto eliminado exitosamente",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0e1",
    "active": false
  }
}
```

**Errores posibles:**

| Código | Mensaje                                       |
| ------ | --------------------------------------------- |
| `401`  | Token ausente o inválido                      |
| `403`  | No tienes permiso para eliminar este contacto |
| `404`  | Contacto no encontrado                        |

---

## 6. Resumen de Endpoints

| Método | Endpoint                      | Descripción                       | Auth | Rol          |
| ------ | ----------------------------- | --------------------------------- | ---- | ------------ |
| POST   | `/api/v1/auth/login`          | Iniciar sesión                    | No   | —            |
| POST   | `/api/v1/auth/refresh`        | Renovar token JWT                 | Sí   | Admin, Sales |
| GET    | `/api/v1/users`               | Listar usuarios                   | Sí   | Solo Admin   |
| POST   | `/api/v1/users`               | Crear usuario                     | Sí   | Solo Admin   |
| GET    | `/api/v1/users/:id`           | Ver detalle de usuario            | Sí   | Solo Admin   |
| PUT    | `/api/v1/users/:id`           | Editar usuario                    | Sí   | Solo Admin   |
| DELETE | `/api/v1/users/:id`           | Eliminar usuario                  | Sí   | Solo Admin   |
| GET    | `/api/v1/contacts`            | Listar contactos activos          | Sí   | Admin, Sales |
| POST   | `/api/v1/contacts`            | Crear contacto                    | Sí   | Admin, Sales |
| GET    | `/api/v1/contacts/:id`        | Ver detalle de contacto           | Sí   | Admin, Sales |
| PUT    | `/api/v1/contacts/:id`        | Editar contacto                   | Sí   | Admin, Sales |
| PATCH  | `/api/v1/contacts/:id/status` | Actualizar estado del contacto    | Sí   | Admin, Sales |
| DELETE | `/api/v1/contacts/:id`        | Desactivar contacto (soft delete) | Sí   | Admin, Sales |
