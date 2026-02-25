# Guía de Estándares de Código

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

Este documento establece los estándares y convenciones de código adoptados en el proyecto ControlaCRM, tanto para el backend (Node.js + Express) como para el frontend (React + TypeScript). Su objetivo es garantizar consistencia, legibilidad y mantenibilidad en toda la base de código.

---

## 3. Herramientas de Formato

Ambos proyectos usan **Prettier** como formateador de código. El formato se aplica de forma consistente en cliente y servidor.

| Herramienta | Proyecto              | Propósito                                                    |
| ----------- | --------------------- | ------------------------------------------------------------ |
| Prettier    | `server/` y `client/` | Formato automático de código                                 |
| ESLint      | `client/`             | Análisis estático y detección de errores en TypeScript/React |

> Se recomienda configurar el editor (VSCode) para que ejecute Prettier al guardar cada archivo (`Format on Save`).

---

## 4. Convenciones de Nomenclatura

### 4.1 Archivos

| Tipo de archivo   | Convención               | Ejemplo                 |
| ----------------- | ------------------------ | ----------------------- |
| Controllers       | `<nombre>.controller.js` | `contact.controller.js` |
| Services          | `<nombre>.service.js`    | `contact.service.js`    |
| Models            | `<nombre>.model.js`      | `contact.model.js`      |
| Routes            | `<nombre>.routes.js`     | `contact.routes.js`     |
| Middlewares       | `<nombre>.middleware.js` | `auth.middleware.js`    |
| Validators        | `<nombre>.validator.js`  | `contact.validator.js`  |
| Config            | `<nombre>.config.js`     | `db.config.js`          |
| Páginas React     | `<Nombre>Page.tsx`       | `ContactsPage.tsx`      |
| Componentes React | `<Nombre>.tsx`           | `ProtectedRoute.tsx`    |
| Store Zustand     | `<nombre>Store.ts`       | `authStore.ts`          |
| Servicios Axios   | `api.ts`                 | `api.ts`                |

### 4.2 Variables y Funciones

- Se usa **camelCase** para variables y funciones en todo el proyecto.
- Los nombres deben ser descriptivos y en **inglés**.

```javascript
// ✅ Correcto
const assignedUser = await User.findById(data.assignedTo);
const validStatuses = ["NEW", "IN_PROGRESS", "CONTACTED", "CLOSED"];

// ❌ Incorrecto
const u = await User.findById(data.assignedTo);
const estados = ["NEW", "IN_PROGRESS", "CONTACTED", "CLOSED"];
```

### 4.3 Constantes y Enums

- Las constantes y valores de enums se escriben en **UPPER_SNAKE_CASE**.

```javascript
// ✅ Correcto
const validStatuses = ["NEW", "IN_PROGRESS", "CONTACTED", "CLOSED"];
role: {
  enum: ["admin", "sales"];
}
```

### 4.4 Clases y Modelos

- Los nombres de modelos de Mongoose van en **PascalCase**.

```javascript
// ✅ Correcto
mongoose.model("Contact", contactSchema);
mongoose.model("User", userSchema);
```

---

## 5. Estructura del Backend

### 5.1 Patrón MVC + Service Layer

El backend sigue estrictamente la separación de responsabilidades entre capas. Cada capa tiene una única responsabilidad:

| Capa           | Responsabilidad                                                     | Lo que NO debe hacer                          |
| -------------- | ------------------------------------------------------------------- | --------------------------------------------- |
| **Controller** | Recibir la request, llamar al service, retornar la response         | Lógica de negocio, consultas directas a la BD |
| **Service**    | Lógica de negocio, validaciones de dominio, interacción con modelos | Manipular `req` o `res` directamente          |
| **Model**      | Definir el schema y la estructura de datos                          | Lógica de negocio                             |
| **Validator**  | Definir esquemas Joi para validación de entrada                     | Lógica de negocio                             |
| **Middleware** | Autenticación, validación, manejo de errores                        | Lógica de negocio                             |

### 5.2 Estructura de un Controller

Los controllers son funciones `async` que reciben `(req, res, next)`. Toda la lógica de negocio se delega al service. Los errores siempre se pasan a `next(err)`.

```javascript
// contact.controller.js
import * as contactService from "../services/contact.service.js";

export const createContact = async (req, res, next) => {
  try {
    const contact = await contactService.createContact(req.body);
    res.status(201).json({
      success: true,
      message: "Contacto creado exitosamente",
      data: contact,
    });
  } catch (err) {
    next(err); // Siempre delegar errores al middleware global
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filters = status ? { status } : {};

    // RN-08: Sales users only see their assigned contacts
    if (req.user.role === "sales") {
      filters.assignedTo = req.user.id;
    }

    const contacts = await contactService.getContacts(filters);
    res.json({ success: true, data: contacts });
  } catch (err) {
    next(err);
  }
};
```

**Reglas del controller:**

- Siempre usar `try/catch` y pasar el error a `next(err)`.
- No escribir lógica de negocio dentro del controller.
- Las reglas de negocio que aplican según el rol del usuario (`req.user.role`) sí pueden vivir en el controller como filtros de entrada antes de llamar al service.
- Documentar las reglas de negocio relevantes con comentarios tipo `// RN-XX:`.

### 5.3 Estructura de un Service

Los services contienen toda la lógica de negocio. Se comunican con los modelos de Mongoose. Los errores se lanzan con `throw` adjuntando un código de estado HTTP.

```javascript
// contact.service.js
import Contact from "../models/contact.model.js";

export const getContactById = async (id) => {
  // Validar formato de ObjectId antes de consultar
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    const err = new Error("ID de contacto inválido");
    err.status = 400;
    throw err;
  }

  const contact = await Contact.findById(id)
    .populate("assignedTo", "email role")
    .lean();

  if (!contact || !contact.active) {
    const err = new Error("Contacto no encontrado");
    err.status = 404;
    throw err;
  }

  return contact;
};

export const deleteContact = async (id) => {
  // Soft delete: cambiar active a false en lugar de eliminar el documento
  const contact = await Contact.findByIdAndUpdate(
    id,
    { active: false },
    { new: true },
  ).lean();

  if (!contact) {
    const err = new Error("Contacto no encontrado");
    err.status = 404;
    throw err;
  }

  return contact;
};
```

**Reglas del service:**

- Lanzar errores con `err.status` para que el middleware de errores retorne el código HTTP correcto.
- Validar el formato del ObjectId antes de hacer consultas a MongoDB.
- Usar `.lean()` en consultas de solo lectura para obtener objetos JavaScript planos (mejor rendimiento).
- Usar `.populate()` para resolver referencias cuando la respuesta las requiera.
- Documentar las reglas de negocio con comentarios tipo `// RN-XX:`.
- El soft delete siempre usa `{ active: false }`, nunca `deleteOne()` o `findByIdAndDelete()`.

### 5.4 Estructura de un Validator (Joi)

Los validators definen esquemas Joi que son usados por el middleware `validate.middleware.js`. Cada mensaje de error debe estar en **español** para el usuario final.

```javascript
// contact.validator.js
import Joi from "joi";

export const contactSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "string.empty": "El nombre es obligatorio.",
    "any.required": "El nombre es obligatorio.",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "El email debe ser válido.",
      "string.empty": "El email es obligatorio.",
      "any.required": "El email es obligatorio.",
    }),
  phone: Joi.string().allow("").messages({
    "string.base": "El teléfono debe ser un texto.",
  }),
  status: Joi.string()
    .valid("NEW", "IN_PROGRESS", "CONTACTED", "CLOSED")
    .default("NEW"),
}).unknown(false); // Rechaza campos no definidos en el schema
```

**Reglas del validator:**

- Usar `.unknown(false)` para rechazar campos no esperados en el body.
- Los campos opcionales usan `.allow('')` para aceptar strings vacíos.
- Los mensajes de error van en español.
- Exportar un schema por operación cuando las reglas de validación difieren (ej: `contactSchema` para crear, `statusSchema` para actualizar estado).

### 5.5 Estructura del Middleware de Autenticación

```javascript
// auth.middleware.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No se proporcionó token de autenticación",
    });
  }

  const token = authHeader.split(" ")[1]; // Extraer token del formato "Bearer <token>"

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Diferenciar tipos de error JWT para mensajes más claros
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expirado",
          code: "TOKEN_EXPIRED",
        });
      }
      return res.status(401).json({
        success: false,
        message: "Token inválido o malformado",
        code: "INVALID_TOKEN",
      });
    }

    req.user = decoded; // El payload del token queda disponible en req.user
    next();
  });
};
```

**Reglas del middleware:**

- El token siempre se extrae del header `Authorization` en formato `Bearer <token>`.
- Diferenciar los tipos de error JWT (`TokenExpiredError`, `JsonWebTokenError`) para dar mensajes específicos al cliente.
- El payload decodificado se adjunta a `req.user` para que esté disponible en controllers y services.
- Validar que el payload contenga los campos mínimos esperados (`id`, `role`).

---

## 6. Formato de Respuesta de la API

Todas las respuestas de la API siguen este formato consistente. Nunca retornar datos crudos sin la envoltura `success/data`.

```javascript
// ✅ Respuesta exitosa con datos
res.status(201).json({
  success: true,
  message: "Contacto creado exitosamente", // Opcional, solo en mutaciones
  data: contact,
});

// ✅ Respuesta exitosa sin datos adicionales
res.json({ success: true, data: contacts });

// ✅ Respuesta de error (desde middleware global)
res.status(err.status || 500).json({
  success: false,
  message: err.message || "Error interno del servidor",
});
```

---

## 7. Manejo de Errores

Los errores se propagan desde los services hacia el middleware global de errores. Nunca se manejan directamente en los controllers con `res.status().json()` para errores de negocio.

```javascript
// ✅ Correcto - lanzar desde el service
const err = new Error('Contacto no encontrado');
err.status = 404;
throw err;

// ✅ Correcto - capturar en el controller y delegar
} catch (err) {
  next(err);
}

// ❌ Incorrecto - manejar el error directamente en el controller
} catch (err) {
  res.status(404).json({ success: false, message: err.message });
}
```

---

## 8. Variables de Entorno

Las variables sensibles nunca se escriben directamente en el código. Se acceden siempre mediante `process.env`.

```javascript
// ✅ Correcto
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;

// ❌ Incorrecto
const JWT_SECRET = "mi_secreto_hardcodeado";
```

**Variables de entorno requeridas en el servidor:**

| Variable      | Descripción                                 |
| ------------- | ------------------------------------------- |
| `PORT`        | Puerto en el que corre el servidor          |
| `MONGODB_URI` | Cadena de conexión a MongoDB Atlas          |
| `JWT_SECRET`  | Secreto para firmar y verificar tokens JWT  |
| `CLIENT_URL`  | URL del frontend para configuración de CORS |

---

## 9. Comentarios en el Código

- Los comentarios deben explicar el **por qué**, no el **qué**. El código debe ser lo suficientemente claro para explicar el qué por sí mismo.
- Las reglas de negocio se documentan con el prefijo `// RN-XX:` para trazabilidad con el SRS.

```javascript
// ✅ Correcto - explica por qué
// RN-04: Force initial status to NEW regardless of what the client sends
data.status = 'NEW';

// RN-07: Validate assigned user is active and has sales role
const assignedUser = await User.findById(data.assignedTo);

// ✅ Correcto - explica una decisión no obvia
// select: false prevents password from being returned in queries by default
password: { type: String, select: false }

// ❌ Incorrecto - describe lo obvio
// Find contact by id
const contact = await Contact.findById(id);
```

---

## 10. Estándares del Frontend

### 10.1 TypeScript

- Usar TypeScript en todos los archivos del cliente (`.tsx`, `.ts`).
- Tipar explícitamente las props de componentes y las respuestas de la API.
- Evitar el uso de `any`; preferir tipos específicos o `unknown`.

### 10.2 Componentes React

- Un componente por archivo.
- Usar **function components** con hooks, nunca class components.
- Los componentes de página van en `pages/`, los reutilizables en `components/`.

```typescript
// ✅ Correcto
const ContactsPage = () => {
  return <div>...</div>;
};

export default ContactsPage;
```

### 10.3 Formularios

- Todos los formularios usan **React Hook Form** con validación **Zod**.
- Los schemas Zod se definen fuera del componente para evitar recreaciones en cada render.

```typescript
// ✅ Correcto - schema fuera del componente
const loginSchema = z.object({
  email: z.string().email("El email debe ser válido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

const LoginPage = () => {
  const form = useForm({ resolver: zodResolver(loginSchema) });
  // ...
};
```

### 10.4 Peticiones HTTP

- Todas las peticiones a la API se hacen a través de la instancia de Axios configurada en `services/api.ts`.
- Nunca usar `fetch` nativo ni crear instancias adicionales de Axios.

### 10.5 Estado Global

- El estado global de autenticación se gestiona con **Zustand** en `store/authStore.ts`.
- El store expone: el usuario autenticado, el token, `login()` y `logout()`.
- No se usa Context API para estado global; todo pasa por Zustand.
