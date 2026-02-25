# Documento de Requisitos del Sistema (SRS)

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

Este documento describe los requisitos funcionales y no funcionales del sistema ControlaCRM en su versión MVP. Está dirigido al desarrollador del proyecto y a los evaluadores académicos del SENA, y sirve como referencia base para las fases de diseño, desarrollo y pruebas.

---

## 3. Alcance del Sistema

ControlaCRM es una aplicación web SPA (Single Page Application) que permite a usuarios registrados gestionar su base de contactos comerciales. En su versión MVP el sistema cubre dos módulos principales: autenticación de usuarios y gestión de contactos.

---

## 4. Definiciones y Acrónimos

| Término     | Definición                                                                         |
| ----------- | ---------------------------------------------------------------------------------- |
| MVP         | Minimum Viable Product – versión mínima funcional del producto                     |
| SPA         | Single Page Application – aplicación web de una sola página                        |
| JWT         | JSON Web Token – estándar para autenticación stateless                             |
| CRUD        | Create, Read, Update, Delete – operaciones básicas sobre datos                     |
| Soft Delete | Desactivación lógica de un registro sin eliminarlo físicamente de la base de datos |
| CRM         | Customer Relationship Management – gestión de relaciones con clientes              |
| SRS         | Software Requirements Specification – especificación de requisitos del software    |

---

## 5. Usuarios del Sistema

El sistema maneja dos roles en el MVP. Los usuarios no pueden registrarse por sí mismos; son creados por el Admin.

### 5.1 Admin (Administrador)

Tiene acceso total al sistema. Puede gestionar usuarios (crear, editar, eliminar, listar y ver detalle) y tiene acceso completo a todos los contactos sin restricción de propiedad.

### 5.2 Sales (Vendedor)

Puede iniciar sesión y gestionar únicamente los contactos que le han sido asignados (`assignedTo`). No puede crear, editar ni eliminar usuarios, ni acceder a los contactos de otros usuarios.

---

## 6. Requisitos Funcionales

### RF-01 – Creación de Usuario por Admin

| Campo           | Detalle                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **ID**          | RF-01                                                                                                                    |
| **Nombre**      | Creación de usuario                                                                                                      |
| **Descripción** | El sistema debe permitir al Admin crear nuevos usuarios asignándoles un rol (Admin o Sales). No existe registro público. |
| **Prioridad**   | Alta                                                                                                                     |

**Datos requeridos:**

- Nombre completo
- Correo electrónico (único en el sistema)
- Contraseña (mínimo 8 caracteres)
- Rol: `ADMIN` o `SALES`

**Reglas de negocio:**

- Solo un usuario con rol Admin puede crear nuevos usuarios.
- El correo electrónico no puede estar registrado previamente.
- La contraseña debe almacenarse hasheada usando Argon2, nunca en texto plano.
- El nuevo usuario puede iniciar sesión inmediatamente con las credenciales asignadas.

---

### RF-02 – Inicio de Sesión

| Campo           | Detalle                                                                                      |
| --------------- | -------------------------------------------------------------------------------------------- |
| **ID**          | RF-02                                                                                        |
| **Nombre**      | Inicio de sesión                                                                             |
| **Descripción** | El sistema debe permitir que un usuario registrado inicie sesión con su correo y contraseña. |
| **Prioridad**   | Alta                                                                                         |

**Reglas de negocio:**

- Si las credenciales son correctas, el sistema devuelve un token JWT.
- Si las credenciales son incorrectas, el sistema devuelve un mensaje de error genérico sin especificar cuál campo es incorrecto (por seguridad).
- El token JWT tiene un tiempo de expiración definido.

---

### RF-03 – Cierre de Sesión

| Campo           | Detalle                                                          |
| --------------- | ---------------------------------------------------------------- |
| **ID**          | RF-03                                                            |
| **Nombre**      | Cierre de sesión                                                 |
| **Descripción** | El sistema debe permitir que el usuario cierre su sesión activa. |
| **Prioridad**   | Media                                                            |

**Reglas de negocio:**

- El cierre de sesión se gestiona en el cliente eliminando el token JWT del almacenamiento local.
- Las rutas protegidas deben ser inaccesibles tras cerrar sesión.

---

### RF-04 – Recuperación de Contraseña _(Fuera del MVP actual)_

| Campo           | Detalle                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| **ID**          | RF-04                                                                                                         |
| **Nombre**      | Recuperación de contraseña                                                                                    |
| **Descripción** | El sistema permitirá al usuario restablecer su contraseña mediante un enlace enviado a su correo electrónico. |
| **Prioridad**   | Baja (planeado para versión futura)                                                                           |

**Nota:** Esta funcionalidad requiere integración con un servicio de envío de correos (Resend o Nodemailer con Gmail SMTP). No está incluida en el MVP actual y se implementará en una iteración posterior.

---

### RF-05 – Listar Contactos

| Campo           | Detalle                                                               |
| --------------- | --------------------------------------------------------------------- |
| **ID**          | RF-05                                                                 |
| **Nombre**      | Listado de contactos                                                  |
| **Descripción** | El sistema debe mostrar al usuario la lista de sus contactos activos. |
| **Prioridad**   | Alta                                                                  |

**Reglas de negocio:**

- Solo se muestran contactos donde `active: true`.
- Solo se muestran los contactos asignados al usuario autenticado (`assignedTo`).
- Los contactos desactivados no aparecen en ninguna vista del MVP.

---

### RF-06 – Crear Contacto

| Campo           | Detalle                                                          |
| --------------- | ---------------------------------------------------------------- |
| **ID**          | RF-06                                                            |
| **Nombre**      | Creación de contacto                                             |
| **Descripción** | El sistema debe permitir al usuario registrar un nuevo contacto. |
| **Prioridad**   | Alta                                                             |

**Campos del contacto:**

| Campo       | Tipo   | Requerido | Descripción                                                            |
| ----------- | ------ | --------- | ---------------------------------------------------------------------- |
| `firstName` | String | Sí        | Nombre del contacto                                                    |
| `lastName`  | String | Sí        | Apellido del contacto                                                  |
| `email`     | String | Sí        | Correo electrónico                                                     |
| `phone`     | String | No        | Teléfono de contacto                                                   |
| `status`    | Enum   | Sí        | Estado: `NEW`, `IN_PROGRESS`, `CONTACTED`, `CLOSED`. Por defecto `NEW` |
| `notes`     | String | No        | Notas adicionales sobre el contacto                                    |

**Reglas de negocio:**

- El campo `assignedTo` se asigna automáticamente al usuario autenticado.
- El campo `active` se establece en `true` por defecto.
- La validación de los datos de entrada se realiza con Joi en el backend y Zod en el frontend.

---

### RF-07 – Ver Detalle de Contacto

| Campo           | Detalle                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------- |
| **ID**          | RF-07                                                                                       |
| **Nombre**      | Detalle de contacto                                                                         |
| **Descripción** | El sistema debe mostrar una página con la información completa de un contacto seleccionado. |
| **Prioridad**   | Alta                                                                                        |

**Reglas de negocio:**

- El usuario solo puede ver el detalle de contactos que le fueron asignados.
- Se muestran todos los campos del contacto incluyendo fechas de creación y última actualización (`createdAt`, `updatedAt`).

---

### RF-08 – Editar Contacto

| Campo           | Detalle                                                                           |
| --------------- | --------------------------------------------------------------------------------- |
| **ID**          | RF-08                                                                             |
| **Nombre**      | Edición de contacto                                                               |
| **Descripción** | El sistema debe permitir al usuario modificar los datos de un contacto existente. |
| **Prioridad**   | Alta                                                                              |

**Reglas de negocio:**

- Solo el usuario propietario del contacto puede editarlo.
- Todos los campos del contacto son editables excepto `assignedTo` y `active`.
- La fecha `updatedAt` se actualiza automáticamente por Mongoose al guardar cambios.

---

### RF-09 – Desactivar Contacto (Soft Delete)

| Campo           | Detalle                                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **ID**          | RF-09                                                                                                                  |
| **Nombre**      | Desactivación de contacto                                                                                              |
| **Descripción** | El sistema debe permitir al usuario desactivar un contacto. El registro no se elimina físicamente de la base de datos. |
| **Prioridad**   | Alta                                                                                                                   |

**Reglas de negocio:**

- Al desactivar un contacto, el campo `active` cambia de `true` a `false`.
- El contacto desactivado deja de aparecer en la lista y no es accesible desde la interfaz.
- La confirmación de la desactivación se solicita mediante un modal antes de ejecutar la acción.
- Solo el usuario propietario del contacto puede desactivarlo.

---

## 7. Requisitos No Funcionales

### RNF-01 – Seguridad

- Las contraseñas deben almacenarse con hash Argon2.
- Todas las rutas de la API que requieran autenticación deben validar el token JWT en cada petición.
- El backend debe usar Helmet para configurar cabeceras HTTP de seguridad.
- El backend debe configurar CORS para aceptar peticiones únicamente desde el dominio autorizado (`controlacrm.serrato.me`).
- Las variables sensibles (cadena de conexión a MongoDB, secreto JWT) deben gestionarse mediante variables de entorno con dotenv.

### RNF-02 – Validación de Datos

- Toda entrada de datos del usuario debe validarse tanto en el frontend (Zod) como en el backend (Joi).
- Los mensajes de error de validación deben ser claros y descriptivos para el usuario.

### RNF-03 – Rendimiento

- La API debe responder en menos de 2 segundos en condiciones normales de uso.
- Las consultas a MongoDB deben estar optimizadas mediante los índices definidos en el schema (`active`, `assignedTo + active`, `status + active`, `email`).

### RNF-04 – Usabilidad

- La interfaz debe ser responsiva y funcionar correctamente en dispositivos móviles, tablets y escritorio.
- El sistema debe soportar modo claro y modo oscuro mediante Shadcn Themes.
- Las notificaciones de éxito y error deben mostrarse mediante React Hot Toast.

### RNF-05 – Mantenibilidad

- El código del backend debe seguir el patrón MVC con Service Layer de forma consistente.
- El código debe estar formateado con Prettier en ambos proyectos (cliente y servidor).
- La API REST debe estar documentada con Swagger y accesible en `/api/docs`.

### RNF-06 – Disponibilidad

- El sistema estará desplegado en Render.com en capa gratuita.
- Se acepta un tiempo de arranque en frío (cold start) de hasta 50 segundos tras períodos de inactividad, dado el contexto educativo del proyecto.

### RNF-07 – Escalabilidad

- La arquitectura MVC + Service Layer debe permitir agregar nuevos módulos (oportunidades, tareas, reportes) en futuras iteraciones sin reestructurar el proyecto base.

---

## 8. Restricciones del Sistema

- El MVP cubre únicamente los módulos de autenticación, gestión de usuarios y gestión de contactos.
- El sistema maneja dos roles: Admin y Sales, con permisos diferenciados.
- No existe registro público; los usuarios son creados exclusivamente por el Admin.
- La recuperación de contraseña no está disponible en el MVP.
- El sistema no envía notificaciones por correo en el MVP.

---

## 9. Diagrama de Casos de Uso (Descripción Textual)

El sistema cuenta con dos actores en el MVP:

**Admin:**

- Iniciar sesión.
- Cerrar sesión.
- Crear, listar, ver detalle, editar y eliminar usuarios.
- Ver todos los contactos del sistema.
- Crear, ver detalle, editar y desactivar cualquier contacto.

**Sales:**

- Iniciar sesión.
- Cerrar sesión.
- Ver la lista de sus propios contactos activos.
- Crear un nuevo contacto.
- Ver el detalle de sus propios contactos.
- Editar sus propios contactos.
- Desactivar sus propios contactos mediante confirmación en modal.

---

## 10. Matriz de Trazabilidad

| Requisito                           | Módulo              | Prioridad | Estado        |
| ----------------------------------- | ------------------- | --------- | ------------- |
| RF-01 Creación de usuario por Admin | Gestión de Usuarios | Alta      | Pendiente     |
| RF-02 Inicio de sesión              | Autenticación       | Alta      | Pendiente     |
| RF-03 Cierre de sesión              | Autenticación       | Media     | Pendiente     |
| RF-04 Recuperación de contraseña    | Autenticación       | Baja      | Fuera del MVP |
| RF-05 Listar contactos              | Contactos           | Alta      | Pendiente     |
| RF-06 Crear contacto                | Contactos           | Alta      | Pendiente     |
| RF-07 Ver detalle de contacto       | Contactos           | Alta      | Pendiente     |
| RF-08 Editar contacto               | Contactos           | Alta      | Pendiente     |
| RF-09 Desactivar contacto           | Contactos           | Alta      | Pendiente     |
