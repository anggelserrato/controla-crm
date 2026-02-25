# Diseño de Base de Datos

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

## 2. Motor de Base de Datos

| Campo                          | Detalle                                    |
| ------------------------------ | ------------------------------------------ |
| **Motor**                      | MongoDB                                    |
| **ODM**                        | Mongoose 9                                 |
| **Hosting**                    | MongoDB Atlas – M0 Cluster (capa gratuita) |
| **Tipo**                       | Base de datos NoSQL orientada a documentos |
| **Nombre de la base de datos** | `controlacrm`                              |

MongoDB fue seleccionado por su flexibilidad de esquema, integración nativa con el ecosistema Node.js a través de Mongoose, y disponibilidad gratuita en Atlas para el contexto del MVP.

---

## 3. Colecciones

El MVP utiliza dos colecciones principales: `users` y `contacts`.

---

## 4. Colección `users`

### 4.1 Descripción

Almacena los usuarios del sistema. No existe registro público; los documentos son creados por un usuario con rol `admin`. Cada usuario tiene un rol que determina sus permisos dentro de la aplicación.

### 4.2 Schema

```javascript
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Nunca se retorna en consultas por defecto
    },
    role: {
      type: String,
      enum: ["admin", "sales"],
      default: "sales",
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Null para el primer admin (seed inicial)
    },
  },
  { timestamps: true },
);

// MongoDB genera automáticamente un índice único sobre email
// por la propiedad unique: true definida en el campo
```

### 4.3 Descripción de Campos

| Campo       | Tipo                 | Requerido | Descripción                                                                      |
| ----------- | -------------------- | --------- | -------------------------------------------------------------------------------- |
| `_id`       | ObjectId             | Auto      | Identificador único generado por MongoDB                                         |
| `email`     | String               | Sí        | Correo electrónico del usuario. Único, normalizado a minúsculas                  |
| `password`  | String               | Sí        | Contraseña hasheada con Argon2. Excluida de consultas con `select: false`        |
| `role`      | Enum                 | Sí        | Rol del usuario: `admin` o `sales`. Por defecto `sales`                          |
| `active`    | Boolean              | Sí        | Soft delete lógico. `true` activo, `false` desactivado. Por defecto `true`       |
| `createdBy` | ObjectId (ref: User) | No        | Referencia al Admin que creó el usuario. `null` para el primer admin del sistema |
| `createdAt` | Date                 | Auto      | Fecha de creación del documento (generado por Mongoose `timestamps`)             |
| `updatedAt` | Date                 | Auto      | Fecha de última actualización (generado por Mongoose `timestamps`)               |

### 4.4 Índices

La colección `users` utiliza el índice primario `_id` generado automáticamente por MongoDB, y el índice único sobre `email` derivado de la propiedad `unique: true` definida en el schema. No se definen índices adicionales explícitos en el MVP.

### 4.5 Notas de Diseño

- El campo `password` usa `select: false` para que nunca se incluya en las respuestas de la API de forma accidental. Debe solicitarse explícitamente con `.select('+password')` solo cuando sea necesario (proceso de login).
- El campo `createdBy` permite trazar la auditoría de creación de usuarios. El primer admin del sistema (seed) tendrá este campo en `null`.
- El soft delete mediante el campo `active` permite desactivar usuarios sin perder el historial de contactos que tienen asignados.

---

## 5. Colección `contacts`

### 5.1 Descripción

Almacena los contactos comerciales del sistema. Cada contacto pertenece a un usuario específico a través del campo `assignedTo`. El soft delete se implementa mediante el campo `active`.

### 5.2 Schema

```javascript
const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["NEW", "IN_PROGRESS", "CONTACTED", "CLOSED"],
      default: "NEW",
      required: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
```

### 5.3 Descripción de Campos

| Campo        | Tipo                 | Requerido | Descripción                                                                                                          |
| ------------ | -------------------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| `_id`        | ObjectId             | Auto      | Identificador único generado por MongoDB                                                                             |
| `firstName`  | String               | Sí        | Nombre del contacto                                                                                                  |
| `lastName`   | String               | Sí        | Apellido del contacto                                                                                                |
| `email`      | String               | Sí        | Correo electrónico del contacto                                                                                      |
| `phone`      | String               | No        | Teléfono del contacto                                                                                                |
| `status`     | Enum                 | Sí        | Estado del contacto en el proceso comercial. Valores: `NEW`, `IN_PROGRESS`, `CONTACTED`, `CLOSED`. Por defecto `NEW` |
| `notes`      | String               | No        | Notas adicionales sobre el contacto                                                                                  |
| `assignedTo` | ObjectId (ref: User) | Sí        | Referencia al usuario propietario del contacto                                                                       |
| `active`     | Boolean              | Sí        | Soft delete lógico. `true` activo, `false` desactivado. Por defecto `true`                                           |
| `createdAt`  | Date                 | Auto      | Fecha de creación del documento                                                                                      |
| `updatedAt`  | Date                 | Auto      | Fecha de última actualización                                                                                        |

### 5.4 Índices

| Índice                         | Tipo                 | Propósito                                                                    |
| ------------------------------ | -------------------- | ---------------------------------------------------------------------------- |
| `{ active: 1 }`                | Ascendente           | Filtra contactos activos/inactivos                                           |
| `{ assignedTo: 1, active: 1 }` | Compuesto ascendente | Consulta principal del rol Sales: contactos activos de un usuario específico |
| `{ status: 1, active: 1 }`     | Compuesto ascendente | Filtra contactos por estado dentro de los activos                            |
| `{ email: 1 }`                 | Ascendente           | Búsqueda de contactos por correo electrónico                                 |

### 5.5 Estados del Contacto

El campo `status` representa el progreso del contacto en el proceso comercial:

| Estado        | Descripción                                          |
| ------------- | ---------------------------------------------------- |
| `NEW`         | Contacto recién registrado, sin gestión iniciada     |
| `IN_PROGRESS` | Contacto en proceso de seguimiento activo            |
| `CONTACTED`   | Se ha establecido comunicación con el contacto       |
| `CLOSED`      | El proceso comercial con este contacto ha finalizado |

### 5.6 Notas de Diseño

- El email del contacto no tiene restricción `unique` a nivel de colección, ya que una misma persona podría ser contacto de diferentes usuarios del sistema.
- El índice compuesto `{ assignedTo: 1, active: 1 }` es el más importante del sistema ya que es utilizado en la consulta principal del rol Sales: `Contact.find({ assignedTo: userId, active: true })`.
- La relación con `User` es una referencia (`ref: 'User'`) que puede popularse con `.populate('assignedTo')` cuando sea necesario mostrar los datos del propietario.

---

## 6. Relaciones entre Colecciones

```
users
  _id ──────────────────────────────┐
  email                             │
  password                          │  (1 usuario crea muchos usuarios)
  role                              │
  active                            ▼
  createdBy ──────────────► users._id  (auto-referencia)
  createdAt
  updatedAt
       │
       │ (1 usuario tiene muchos contactos)
       ▼
contacts
  _id
  firstName
  lastName
  email
  phone
  status
  notes
  assignedTo ──────────────► users._id
  active
  createdAt
  updatedAt
```

### 6.1 Relación `users` → `users` (auto-referencia)

- **Tipo:** Uno a muchos (un Admin puede crear muchos usuarios)
- **Campo:** `users.createdBy` → `users._id`
- **Cardinalidad:** Un Admin puede tener muchos usuarios creados; un usuario fue creado por un solo Admin (o ninguno en el caso del primer admin)

### 6.2 Relación `users` → `contacts`

- **Tipo:** Uno a muchos (un usuario tiene muchos contactos)
- **Campo:** `contacts.assignedTo` → `users._id`
- **Cardinalidad:** Un usuario puede tener muchos contactos; un contacto pertenece a un solo usuario

---

## 7. Consultas Principales

Las siguientes consultas representan las operaciones más frecuentes del sistema y están respaldadas por los índices definidos:

### Listar contactos activos de un usuario (Sales)

```javascript
Contact.find({ assignedTo: userId, active: true });
// Usa índice: { assignedTo: 1, active: 1 }
```

### Listar todos los contactos activos (Admin)

```javascript
Contact.find({ active: true });
// Usa índice: { active: 1 }
```

### Buscar usuario por email en login

```javascript
User.findOne({ email }).select("+password");
// Usa índice: { email: 1 }
// select('+password') necesario porque el campo tiene select: false
```

### Listar usuarios activos (Admin)

```javascript
User.find({ active: true });
// Usa índice: { active: 1 }
```

### Desactivar un contacto (soft delete)

```javascript
Contact.findByIdAndUpdate(id, { active: false }, { new: true });
// Operación por _id (índice primario de MongoDB)
```

---

## 8. Consideraciones de Seguridad

- El campo `password` de la colección `users` tiene `select: false`, lo que garantiza que nunca sea retornado en ninguna consulta a menos que se solicite explícitamente. Esto previene filtraciones accidentales de contraseñas hasheadas.
- Las contraseñas se almacenan exclusivamente como hash generado por Argon2, nunca en texto plano.
- Las operaciones que modifican documentos verifican en el Service Layer que el usuario autenticado tenga autorización sobre el recurso antes de ejecutar la consulta.

---

## 9. Seed Inicial

Para que el sistema sea funcional desde el primer despliegue, se requiere un **seed** que cree el primer usuario Admin, ya que no existe registro público.

```javascript
// Ejemplo de seed inicial
{
  email: "admin@controlacrm.com",
  password: "<hash_argon2>",
  role: "admin",
  active: true,
  createdBy: null   // El primer admin no tiene creador
}
```

Este seed debe ejecutarse una sola vez durante la configuración inicial del entorno de producción y desarrollo.
