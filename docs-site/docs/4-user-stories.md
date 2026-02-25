# User Stories

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

## 2. Formato Utilizado

Cada historia de usuario sigue el formato estándar:

> **Como** [tipo de usuario], **quiero** [acción], **para** [beneficio o resultado esperado].

Cada historia incluye sus **criterios de aceptación** que definen cuándo se considera completada, y su **definición de hecho (Definition of Done)** que establece los estándares técnicos mínimos para darla por terminada.

---

## 3. Épicas

El MVP se organiza en dos épicas:

| Épica                               | Descripción                                                           |
| ----------------------------------- | --------------------------------------------------------------------- |
| **E-01 – Autenticación y Usuarios** | Inicio de sesión, cierre de sesión y gestión de usuarios por el Admin |
| **E-02 – Gestión de Contactos**     | Todo lo relacionado con el ciclo de vida de los contactos             |

---

## 4. Historias de Usuario

---

### US-01 – Creación de Usuario por Admin

**Épica:** E-01 – Autenticación
**Prioridad:** Alta
**Referencia SRS:** RF-01

> **Como** Admin de ControlaCRM,
> **quiero** poder crear nuevos usuarios asignándoles un rol,
> **para** controlar quién tiene acceso al sistema y con qué permisos.

**Criterios de Aceptación:**

- [ ] Solo un usuario con rol Admin puede acceder al formulario de creación de usuarios.
- [ ] El formulario solicita nombre completo, correo electrónico, contraseña y rol (Admin o Sales).
- [ ] Si el correo ya está registrado, el sistema muestra un mensaje de error indicándolo.
- [ ] Si la contraseña tiene menos de 8 caracteres, el sistema muestra un error de validación.
- [ ] Al crear el usuario exitosamente, aparece una notificación de éxito y el usuario aparece en la lista.
- [ ] La contraseña nunca se almacena en texto plano.
- [ ] Un usuario con rol Sales no puede acceder a la gestión de usuarios; el intento devuelve error 403.

**Definition of Done:**

- Endpoint `POST /api/users` implementado, protegido por `auth.middleware` y `role.middleware` (solo Admin), documentado en Swagger.
- Validación con Joi en el backend y Zod en el frontend.
- Contraseña hasheada con Argon2 antes de persistir en MongoDB.
- Prueba manual exitosa incluyendo intento de acceso con rol Sales.

---

### US-02 – Inicio de Sesión

**Épica:** E-01 – Autenticación
**Prioridad:** Alta
**Referencia SRS:** RF-02

> **Como** usuario registrado en ControlaCRM,
> **quiero** iniciar sesión con mi correo y contraseña,
> **para** acceder a mis contactos de forma segura.

**Criterios de Aceptación:**

- [ ] El formulario de inicio de sesión solicita correo electrónico y contraseña.
- [ ] Si las credenciales son incorrectas, el sistema muestra un mensaje de error genérico sin revelar cuál campo es incorrecto.
- [ ] Al iniciar sesión exitosamente, el usuario es redirigido al dashboard.
- [ ] Las rutas protegidas no son accesibles sin un token JWT válido.

**Definition of Done:**

- Endpoint `POST /api/auth/login` implementado y documentado en Swagger.
- Validación con Joi en el backend y Zod en el frontend.
- Token JWT retornado con tiempo de expiración definido.
- Rutas protegidas en el frontend redirigen al login si no hay token válido.
- Prueba manual exitosa del flujo completo.

---

### US-03 – Cierre de Sesión

**Épica:** E-01 – Autenticación
**Prioridad:** Media
**Referencia SRS:** RF-03

> **Como** usuario autenticado en ControlaCRM,
> **quiero** poder cerrar mi sesión,
> **para** proteger mi cuenta cuando termine de usar la aplicación.

**Criterios de Aceptación:**

- [ ] Existe un botón o opción de cierre de sesión visible en la interfaz.
- [ ] Al cerrar sesión, el token JWT es eliminado del almacenamiento del cliente.
- [ ] Tras cerrar sesión, el usuario es redirigido a la página de inicio de sesión.
- [ ] Intentar acceder a rutas protegidas después de cerrar sesión redirige al login.

**Definition of Done:**

- Lógica de logout implementada en el cliente (limpieza del token y estado de Zustand).
- Rutas protegidas verifican la existencia del token en cada navegación.
- Prueba manual exitosa del flujo completo.

---

### US-04 – Ver Lista de Contactos

**Épica:** E-02 – Gestión de Contactos
**Prioridad:** Alta
**Referencia SRS:** RF-05

> **Como** usuario autenticado,
> **quiero** ver la lista de mis contactos activos,
> **para** tener una visión general de mis relaciones comerciales.

**Criterios de Aceptación:**

- [ ] La lista muestra únicamente los contactos activos (`active: true`) del usuario autenticado.
- [ ] Cada contacto en la lista muestra al menos: nombre completo, correo electrónico, teléfono y estado.
- [ ] Si el usuario no tiene contactos, se muestra un mensaje indicando que no hay contactos registrados.
- [ ] Cada contacto tiene acciones rápidas para ver detalle, editar y desactivar.

**Definition of Done:**

- Endpoint `GET /api/contacts` implementado, filtra por `assignedTo` y `active: true`, documentado en Swagger.
- Índices de MongoDB utilizados correctamente en la consulta.
- Componente de lista implementado en React con TypeScript.
- Prueba manual exitosa mostrando solo contactos del usuario autenticado.

---

### US-05 – Crear Contacto

**Épica:** E-02 – Gestión de Contactos
**Prioridad:** Alta
**Referencia SRS:** RF-06

> **Como** usuario autenticado,
> **quiero** registrar un nuevo contacto con su información básica,
> **para** mantener organizada mi base de clientes.

**Criterios de Aceptación:**

- [ ] El formulario de creación solicita: nombre, apellido, correo electrónico, teléfono (opcional), estado y notas (opcional).
- [ ] Los campos nombre, apellido, correo y estado son obligatorios.
- [ ] El estado por defecto es `NEW`.
- [ ] Si la validación falla, se muestran mensajes de error por campo.
- [ ] Al crear el contacto exitosamente, aparece una notificación de éxito y el contacto aparece en la lista.
- [ ] El campo `assignedTo` se asigna automáticamente al usuario autenticado sin intervención del usuario.

**Definition of Done:**

- Endpoint `POST /api/contacts` implementado y documentado en Swagger.
- Validación con Joi en el backend y Zod + React Hook Form en el frontend.
- Campo `assignedTo` asignado desde el token JWT en el backend, nunca desde el body del request.
- Notificación de éxito con React Hot Toast.
- Prueba manual exitosa del flujo completo.

---

### US-06 – Ver Detalle de Contacto

**Épica:** E-02 – Gestión de Contactos
**Prioridad:** Alta
**Referencia SRS:** RF-07

> **Como** usuario autenticado,
> **quiero** ver la información completa de un contacto,
> **para** conocer todos sus datos y el historial de su estado.

**Criterios de Aceptación:**

- [ ] Al hacer clic en un contacto de la lista, se navega a una página de detalle.
- [ ] La página de detalle muestra todos los campos del contacto: nombre, apellido, correo, teléfono, estado, notas, fecha de creación y fecha de última actualización.
- [ ] Si el contacto no pertenece al usuario autenticado, el sistema devuelve un error 403 y redirige.
- [ ] Desde la página de detalle se puede acceder a las acciones de editar y desactivar.

**Definition of Done:**

- Endpoint `GET /api/contacts/:id` implementado, verifica que `assignedTo` coincida con el usuario autenticado, documentado en Swagger.
- Página de detalle implementada en React con React Router.
- Prueba manual exitosa incluyendo intento de acceso a contacto ajeno.

---

### US-07 – Editar Contacto

**Épica:** E-02 – Gestión de Contactos
**Prioridad:** Alta
**Referencia SRS:** RF-08

> **Como** usuario autenticado,
> **quiero** poder editar la información de un contacto existente,
> **para** mantener sus datos actualizados.

**Criterios de Aceptación:**

- [ ] El formulario de edición viene precargado con los datos actuales del contacto.
- [ ] Todos los campos son editables excepto `assignedTo` y `active`.
- [ ] Si la validación falla, se muestran mensajes de error por campo.
- [ ] Al guardar exitosamente, aparece una notificación de éxito y los datos actualizados se reflejan en la interfaz.
- [ ] Solo el propietario del contacto puede editarlo; cualquier otro intento devuelve error 403.

**Definition of Done:**

- Endpoint `PUT /api/contacts/:id` implementado, verifica propiedad del contacto, documentado en Swagger.
- Validación con Joi en el backend y Zod + React Hook Form en el frontend.
- Formulario de edición precargado con datos actuales usando React Hook Form.
- Notificación de éxito con React Hot Toast.
- Prueba manual exitosa incluyendo intento de edición de contacto ajeno.

---

### US-08 – Desactivar Contacto

**Épica:** E-02 – Gestión de Contactos
**Prioridad:** Alta
**Referencia SRS:** RF-09

> **Como** usuario autenticado,
> **quiero** poder desactivar un contacto que ya no es relevante,
> **para** mantener mi lista limpia sin perder el historial del registro.

**Criterios de Aceptación:**

- [ ] Al intentar desactivar un contacto, aparece un modal de confirmación preguntando si está seguro.
- [ ] Si el usuario confirma, el contacto se desactiva (`active: false`) y desaparece de la lista.
- [ ] Si el usuario cancela en el modal, no ocurre ningún cambio.
- [ ] Tras desactivar exitosamente, aparece una notificación de éxito.
- [ ] Solo el propietario del contacto puede desactivarlo; cualquier otro intento devuelve error 403.
- [ ] El registro permanece en la base de datos con `active: false`.

**Definition of Done:**

- Endpoint `PATCH /api/contacts/:id/deactivate` implementado, verifica propiedad, documentado en Swagger.
- Modal de confirmación implementado con Shadcn/UI Dialog.
- El campo `active` cambia a `false` sin eliminar el documento de MongoDB.
- La lista se actualiza automáticamente tras la desactivación.
- Notificación de éxito con React Hot Toast.
- Prueba manual exitosa incluyendo verificación en base de datos de que el registro persiste.

---

## 5. Resumen de Historias

| ID    | Historia                      | Épica                         | Prioridad | Referencia SRS |
| ----- | ----------------------------- | ----------------------------- | --------- | -------------- |
| US-01 | Creación de usuario por Admin | E-01 Autenticación y Usuarios | Alta      | RF-01          |
| US-02 | Inicio de sesión              | E-01 Autenticación y Usuarios | Alta      | RF-02          |
| US-03 | Cierre de sesión              | E-01 Autenticación y Usuarios | Media     | RF-03          |
| US-04 | Ver lista de contactos        | E-02 Contactos                | Alta      | RF-05          |
| US-05 | Crear contacto                | E-02 Contactos                | Alta      | RF-06          |
| US-06 | Ver detalle de contacto       | E-02 Contactos                | Alta      | RF-07          |
| US-07 | Editar contacto               | E-02 Contactos                | Alta      | RF-08          |
| US-08 | Desactivar contacto           | E-02 Contactos                | Alta      | RF-09          |
