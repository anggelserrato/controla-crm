# Casos de Prueba

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

## 2. Convenciones

| Campo                  | Descripción                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| **ID**                 | Identificador único del caso de prueba                             |
| **Referencia**         | User Story relacionada                                             |
| **Precondiciones**     | Estado necesario antes de ejecutar la prueba                       |
| **Pasos**              | Acciones a ejecutar en orden                                       |
| **Resultado Esperado** | Comportamiento correcto del sistema                                |
| **Estado**             | `PASS` aprobado / `FAIL` fallido / `PENDING` pendiente de ejecutar |

---

## 3. Módulo: Autenticación

---

### CP-01 – Login exitoso con credenciales válidas (Admin)

**Referencia:** US-02
**Herramienta:** Postman
**Precondiciones:** El usuario admin existe en la base de datos con `active: true`.

**Pasos:**

1. Enviar `POST /api/auth/login` con body:

```json
{
  "email": "admin@controlacrm.com",
  "password": "Admin1234!"
}
```

**Resultado Esperado:**

- Código HTTP: `200 OK`
- Respuesta contiene `success: true`
- Respuesta contiene `data.token` con un JWT válido
- Respuesta contiene `data.user.role: "admin"`

**Estado:** `PENDING`

---

### CP-02 – Login exitoso con credenciales válidas (Sales)

**Referencia:** US-02
**Herramienta:** Postman
**Precondiciones:** El usuario sales existe en la base de datos con `active: true`.

**Pasos:**

1. Enviar `POST /api/auth/login` con body:

```json
{
  "email": "sales@controlacrm.com",
  "password": "Sales1234!"
}
```

**Resultado Esperado:**

- Código HTTP: `200 OK`
- Respuesta contiene `success: true`
- Respuesta contiene `data.token` con un JWT válido
- Respuesta contiene `data.user.role: "sales"`

**Estado:** `PENDING`

---

### CP-03 – Login con contraseña incorrecta

**Referencia:** US-02
**Herramienta:** Postman
**Precondiciones:** El usuario existe en la base de datos.

**Pasos:**

1. Enviar `POST /api/auth/login` con body:

```json
{
  "email": "admin@controlacrm.com",
  "password": "contraseña_incorrecta"
}
```

**Resultado Esperado:**

- Código HTTP: `401 Unauthorized`
- Respuesta contiene `success: false`
- El mensaje de error es genérico y no revela cuál campo es incorrecto

**Estado:** `PENDING`

---

### CP-04 – Login con email no registrado

**Referencia:** US-02
**Herramienta:** Postman
**Precondiciones:** Ninguna.

**Pasos:**

1. Enviar `POST /api/auth/login` con body:

```json
{
  "email": "noexiste@controlacrm.com",
  "password": "Admin1234!"
}
```

**Resultado Esperado:**

- Código HTTP: `401 Unauthorized`
- Respuesta contiene `success: false`

**Estado:** `PENDING`

---

### CP-05 – Login con campos vacíos

**Referencia:** US-02
**Herramienta:** Postman
**Precondiciones:** Ninguna.

**Pasos:**

1. Enviar `POST /api/auth/login` con body:

```json
{
  "email": "",
  "password": ""
}
```

**Resultado Esperado:**

- Código HTTP: `400 Bad Request`
- Respuesta contiene `success: false`
- El mensaje indica que los campos son obligatorios

**Estado:** `PENDING`

---

### CP-06 – Acceso a ruta protegida sin token

**Referencia:** US-02
**Herramienta:** Postman
**Precondiciones:** Ninguna.

**Pasos:**

1. Enviar `GET /api/contacts` sin header `Authorization`.

**Resultado Esperado:**

- Código HTTP: `401 Unauthorized`
- Respuesta contiene `success: false`
- Mensaje: "No se proporcionó token de autenticación"

**Estado:** `PENDING`

---

### CP-07 – Acceso a ruta protegida con token expirado

**Referencia:** US-02
**Herramienta:** Postman
**Precondiciones:** Tener un token JWT expirado.

**Pasos:**

1. Enviar `GET /api/contacts` con header `Authorization: Bearer <token_expirado>`.

**Resultado Esperado:**

- Código HTTP: `401 Unauthorized`
- Respuesta contiene `code: "TOKEN_EXPIRED"`

**Estado:** `PENDING`

---

### CP-08 – Cierre de sesión en el frontend

**Referencia:** US-03
**Herramienta:** Navegador
**Precondiciones:** Usuario autenticado en la interfaz.

**Pasos:**

1. Iniciar sesión en `http://localhost:5173/login`.
2. Hacer clic en la opción de cerrar sesión.
3. Intentar navegar manualmente a `/dashboard`.

**Resultado Esperado:**

- El usuario es redirigido a `/login` tras cerrar sesión.
- Al intentar acceder a `/dashboard`, el sistema redirige a `/login`.
- El token ya no está disponible en el estado de Zustand.

**Estado:** `PENDING`

---

## 4. Módulo: Gestión de Usuarios

---

### CP-09 – Crear usuario como Admin

**Referencia:** US-01
**Herramienta:** Postman
**Precondiciones:** Token JWT de usuario Admin disponible.

**Pasos:**

1. Enviar `POST /api/users` con header `Authorization: Bearer <token_admin>` y body:

```json
{
  "email": "nuevo_sales@empresa.com",
  "password": "Sales1234!",
  "role": "sales"
}
```

**Resultado Esperado:**

- Código HTTP: `201 Created`
- Respuesta contiene `success: true`
- El nuevo usuario aparece en la respuesta con `role: "sales"` y `active: true`
- La contraseña no aparece en la respuesta

**Estado:** `PENDING`

---

### CP-10 – Crear usuario con email duplicado

**Referencia:** US-01
**Herramienta:** Postman
**Precondiciones:** Token JWT de Admin. El email ya existe en la base de datos.

**Pasos:**

1. Enviar `POST /api/users` con un email ya registrado.

**Resultado Esperado:**

- Código HTTP: `409 Conflict`
- Respuesta contiene `success: false`
- Mensaje indica que el email ya está registrado

**Estado:** `PENDING`

---

### CP-11 – Crear usuario como Sales (acceso denegado)

**Referencia:** US-01
**Herramienta:** Postman
**Precondiciones:** Token JWT de usuario Sales disponible.

**Pasos:**

1. Enviar `POST /api/users` con header `Authorization: Bearer <token_sales>` y body válido.

**Resultado Esperado:**

- Código HTTP: `403 Forbidden`
- Respuesta contiene `success: false`

**Estado:** `PENDING`

---

### CP-12 – Listar usuarios como Admin

**Referencia:** US-01
**Herramienta:** Postman
**Precondiciones:** Token JWT de Admin. Al menos un usuario existe.

**Pasos:**

1. Enviar `GET /api/users` con header `Authorization: Bearer <token_admin>`.

**Resultado Esperado:**

- Código HTTP: `200 OK`
- Respuesta contiene `success: true`
- `data` es un array con los usuarios del sistema
- Ningún usuario en la lista expone el campo `password`

**Estado:** `PENDING`

---

### CP-13 – Listar usuarios como Sales (acceso denegado)

**Referencia:** US-01
**Herramienta:** Postman
**Precondiciones:** Token JWT de Sales.

**Pasos:**

1. Enviar `GET /api/users` con header `Authorization: Bearer <token_sales>`.

**Resultado Esperado:**

- Código HTTP: `403 Forbidden`
- Respuesta contiene `success: false`

**Estado:** `PENDING`

---

### CP-14 – Eliminar usuario como Admin

**Referencia:** US-01
**Herramienta:** Postman
**Precondiciones:** Token JWT de Admin. El usuario a eliminar existe.

**Pasos:**

1. Enviar `DELETE /api/users/:id` con header `Authorization: Bearer <token_admin>`.

**Resultado Esperado:**

- Código HTTP: `200 OK`
- Respuesta contiene `success: true`
- El usuario eliminado ya no aparece en `GET /api/users`

**Estado:** `PENDING`

---

## 5. Módulo: Gestión de Contactos

---

### CP-15 – Listar contactos como Sales (solo propios)

**Referencia:** US-04
**Herramienta:** Postman
**Precondiciones:** Token JWT de Sales. El usuario tiene al menos un contacto asignado. Existen contactos de otros usuarios en la base de datos.

**Pasos:**

1. Enviar `GET /api/contacts` con header `Authorization: Bearer <token_sales>`.

**Resultado Esperado:**

- Código HTTP: `200 OK`
- `data` contiene únicamente los contactos donde `assignedTo` corresponde al usuario autenticado
- No aparecen contactos de otros usuarios
- No aparecen contactos con `active: false`

**Estado:** `PENDING`

---

### CP-16 – Listar contactos como Admin (todos)

**Referencia:** US-04
**Herramienta:** Postman
**Precondiciones:** Token JWT de Admin. Existen contactos de múltiples usuarios.

**Pasos:**

1. Enviar `GET /api/contacts` con header `Authorization: Bearer <token_admin>`.

**Resultado Esperado:**

- Código HTTP: `200 OK`
- `data` contiene todos los contactos activos del sistema sin filtro por usuario

**Estado:** `PENDING`

---

### CP-17 – Crear contacto con datos válidos

**Referencia:** US-05
**Herramienta:** Postman
**Precondiciones:** Token JWT de Sales disponible.

**Pasos:**

1. Enviar `POST /api/contacts` con header `Authorization: Bearer <token_sales>` y body:

```json
{
  "firstName": "Carlos",
  "lastName": "Ramírez",
  "email": "carlos@empresa.com",
  "phone": "3001234567",
  "status": "NEW",
  "notes": "Primer contacto"
}
```

**Resultado Esperado:**

- Código HTTP: `201 Created`
- Respuesta contiene `success: true`
- El campo `assignedTo` en la respuesta corresponde al usuario autenticado (no viene del body)
- El campo `active` es `true`
- El campo `status` es `NEW`

**Estado:** `PENDING`

---

### CP-18 – Crear contacto sin campos obligatorios

**Referencia:** US-05
**Herramienta:** Postman
**Precondiciones:** Token JWT de Sales disponible.

**Pasos:**

1. Enviar `POST /api/contacts` con body incompleto (sin `firstName` y sin `email`):

```json
{
  "lastName": "Ramírez",
  "phone": "3001234567"
}
```

**Resultado Esperado:**

- Código HTTP: `400 Bad Request`
- Respuesta contiene `success: false`
- El mensaje indica los campos faltantes

**Estado:** `PENDING`

---

### CP-19 – Ver detalle de contacto propio (Sales)

**Referencia:** US-06
**Herramienta:** Postman
**Precondiciones:** Token JWT de Sales. El contacto existe y está asignado al usuario autenticado.

**Pasos:**

1. Enviar `GET /api/contacts/:id` con header `Authorization: Bearer <token_sales>`.

**Resultado Esperado:**

- Código HTTP: `200 OK`
- Respuesta contiene todos los campos del contacto
- El campo `assignedTo` está populado con `email` y `role` del usuario

**Estado:** `PENDING`

---

### CP-20 – Ver detalle de contacto ajeno (Sales)

**Referencia:** US-06
**Herramienta:** Postman
**Precondiciones:** Token JWT de Sales. El contacto existe pero está asignado a otro usuario.

**Pasos:**

1. Enviar `GET /api/contacts/:id` con el ID de un contacto de otro usuario.

**Resultado Esperado:**

- Código HTTP: `403 Forbidden` o `404 Not Found`
- Respuesta contiene `success: false`

**Estado:** `PENDING`

---

### CP-21 – Editar contacto propio (Sales)

**Referencia:** US-07
**Herramienta:** Postman
**Precondiciones:** Token JWT de Sales. El contacto existe y está asignado al usuario autenticado.

**Pasos:**

1. Enviar `PUT /api/contacts/:id` con header `Authorization: Bearer <token_sales>` y body:

```json
{
  "firstName": "Carlos",
  "lastName": "Ramírez",
  "email": "carlos.actualizado@empresa.com",
  "status": "CONTACTED",
  "notes": "Llamada realizada"
}
```

**Resultado Esperado:**

- Código HTTP: `200 OK`
- Respuesta contiene `success: true`
- Los campos actualizados reflejan los nuevos valores
- El campo `updatedAt` tiene una fecha más reciente que `createdAt`

**Estado:** `PENDING`

---

### CP-22 – Actualizar estado de contacto

**Referencia:** US-07
**Herramienta:** Postman
**Precondiciones:** Token JWT de Sales. El contacto existe y está asignado al usuario autenticado.

**Pasos:**

1. Enviar `PATCH /api/contacts/:id/status` con body:

```json
{
  "status": "IN_PROGRESS"
}
```

**Resultado Esperado:**

- Código HTTP: `200 OK`
- Respuesta contiene `success: true`
- El campo `status` en la respuesta es `IN_PROGRESS`

**Estado:** `PENDING`

---

### CP-23 – Actualizar estado con valor inválido

**Referencia:** US-07
**Herramienta:** Postman
**Precondiciones:** Token JWT de Sales. El contacto existe.

**Pasos:**

1. Enviar `PATCH /api/contacts/:id/status` con body:

```json
{
  "status": "INVALIDO"
}
```

**Resultado Esperado:**

- Código HTTP: `400 Bad Request`
- Respuesta contiene `success: false`
- Mensaje indica los valores válidos para el estado

**Estado:** `PENDING`

---

### CP-24 – Desactivar contacto propio (Sales)

**Referencia:** US-08
**Herramienta:** Postman
**Precondiciones:** Token JWT de Sales. El contacto existe y está asignado al usuario autenticado.

**Pasos:**

1. Enviar `DELETE /api/contacts/:id` con header `Authorization: Bearer <token_sales>`.
2. Enviar `GET /api/contacts` para verificar que el contacto desaparece de la lista.
3. Verificar directamente en MongoDB Atlas que el documento existe con `active: false`.

**Resultado Esperado:**

- Paso 1: Código HTTP `200 OK`, `success: true`
- Paso 2: El contacto desactivado no aparece en la lista
- Paso 3: El documento sigue existiendo en la base de datos con `active: false`

**Estado:** `PENDING`

---

### CP-25 – Desactivar contacto ajeno (Sales)

**Referencia:** US-08
**Herramienta:** Postman
**Precondiciones:** Token JWT de Sales. El contacto existe pero está asignado a otro usuario.

**Pasos:**

1. Enviar `DELETE /api/contacts/:id` con el ID de un contacto de otro usuario.

**Resultado Esperado:**

- Código HTTP: `403 Forbidden` o `404 Not Found`
- Respuesta contiene `success: false`
- El contacto no es modificado en la base de datos

**Estado:** `PENDING`

---

## 6. Módulo: Interfaz de Usuario

---

### CP-26 – Ruta privada redirige al login sin sesión

**Referencia:** US-02
**Herramienta:** Navegador
**Precondiciones:** Sin sesión activa (sin token en Zustand).

**Pasos:**

1. Abrir el navegador en modo incógnito.
2. Navegar directamente a `http://localhost:5173/dashboard`.

**Resultado Esperado:**

- El sistema redirige automáticamente a `/login`
- No se muestra ningún contenido del dashboard

**Estado:** `PENDING`

---

### CP-27 – Formulario de login muestra errores de validación

**Referencia:** US-02
**Herramienta:** Navegador
**Precondiciones:** Ninguna.

**Pasos:**

1. Abrir `http://localhost:5173/login`.
2. Dejar los campos vacíos y hacer clic en el botón de iniciar sesión.

**Resultado Esperado:**

- Se muestran mensajes de error por campo indicando que son obligatorios
- No se realiza ninguna petición a la API

**Estado:** `PENDING`

---

### CP-28 – Notificación de éxito al crear contacto

**Referencia:** US-05
**Herramienta:** Navegador
**Precondiciones:** Usuario Sales autenticado en la interfaz.

**Pasos:**

1. Navegar a la página de creación de contacto.
2. Completar el formulario con datos válidos.
3. Enviar el formulario.

**Resultado Esperado:**

- Aparece una notificación de éxito (React Hot Toast)
- El nuevo contacto aparece en la lista de contactos
- El formulario se limpia o redirige correctamente

**Estado:** `PENDING`

---

### CP-29 – Modal de confirmación antes de desactivar contacto

**Referencia:** US-08
**Herramienta:** Navegador
**Precondiciones:** Usuario autenticado con al menos un contacto en la lista.

**Pasos:**

1. Hacer clic en la acción de desactivar un contacto.
2. Verificar que aparece el modal de confirmación.
3. Hacer clic en "Cancelar".
4. Verificar que el contacto sigue activo en la lista.

**Resultado Esperado:**

- El modal aparece antes de ejecutar la desactivación
- Al cancelar, el contacto permanece en la lista sin cambios

**Estado:** `PENDING`

---

### CP-30 – Desactivar contacto desde el modal de confirmación

**Referencia:** US-08
**Herramienta:** Navegador
**Precondiciones:** Usuario autenticado con al menos un contacto en la lista.

**Pasos:**

1. Hacer clic en la acción de desactivar un contacto.
2. Confirmar la acción en el modal.

**Resultado Esperado:**

- Aparece una notificación de éxito
- El contacto desaparece de la lista inmediatamente
- No es necesario recargar la página

**Estado:** `PENDING`

---

## 7. Resumen de Casos de Prueba

| ID    | Descripción                              | Módulo        | Herramienta | Estado  |
| ----- | ---------------------------------------- | ------------- | ----------- | ------- |
| CP-01 | Login exitoso Admin                      | Autenticación | Postman     | PENDING |
| CP-02 | Login exitoso Sales                      | Autenticación | Postman     | PENDING |
| CP-03 | Login con contraseña incorrecta          | Autenticación | Postman     | PENDING |
| CP-04 | Login con email no registrado            | Autenticación | Postman     | PENDING |
| CP-05 | Login con campos vacíos                  | Autenticación | Postman     | PENDING |
| CP-06 | Acceso sin token                         | Autenticación | Postman     | PENDING |
| CP-07 | Acceso con token expirado                | Autenticación | Postman     | PENDING |
| CP-08 | Cierre de sesión en frontend             | Autenticación | Navegador   | PENDING |
| CP-09 | Crear usuario como Admin                 | Usuarios      | Postman     | PENDING |
| CP-10 | Crear usuario con email duplicado        | Usuarios      | Postman     | PENDING |
| CP-11 | Crear usuario como Sales (denegado)      | Usuarios      | Postman     | PENDING |
| CP-12 | Listar usuarios como Admin               | Usuarios      | Postman     | PENDING |
| CP-13 | Listar usuarios como Sales (denegado)    | Usuarios      | Postman     | PENDING |
| CP-14 | Eliminar usuario como Admin              | Usuarios      | Postman     | PENDING |
| CP-15 | Listar contactos propios (Sales)         | Contactos     | Postman     | PENDING |
| CP-16 | Listar todos los contactos (Admin)       | Contactos     | Postman     | PENDING |
| CP-17 | Crear contacto con datos válidos         | Contactos     | Postman     | PENDING |
| CP-18 | Crear contacto sin campos obligatorios   | Contactos     | Postman     | PENDING |
| CP-19 | Ver detalle de contacto propio           | Contactos     | Postman     | PENDING |
| CP-20 | Ver detalle de contacto ajeno (Sales)    | Contactos     | Postman     | PENDING |
| CP-21 | Editar contacto propio                   | Contactos     | Postman     | PENDING |
| CP-22 | Actualizar estado de contacto            | Contactos     | Postman     | PENDING |
| CP-23 | Actualizar estado con valor inválido     | Contactos     | Postman     | PENDING |
| CP-24 | Desactivar contacto propio (soft delete) | Contactos     | Postman     | PENDING |
| CP-25 | Desactivar contacto ajeno (Sales)        | Contactos     | Postman     | PENDING |
| CP-26 | Ruta privada redirige sin sesión         | Interfaz      | Navegador   | PENDING |
| CP-27 | Validación en formulario de login        | Interfaz      | Navegador   | PENDING |
| CP-28 | Notificación al crear contacto           | Interfaz      | Navegador   | PENDING |
| CP-29 | Modal de confirmación al desactivar      | Interfaz      | Navegador   | PENDING |
| CP-30 | Desactivar contacto desde modal          | Interfaz      | Navegador   | PENDING |

**Total de casos:** 30 | **PASS:** 0 | **FAIL:** 0 | **PENDING:** 30
