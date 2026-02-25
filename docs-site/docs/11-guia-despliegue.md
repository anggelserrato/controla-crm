# Guía de Despliegue

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

Este documento describe el proceso paso a paso para desplegar ControlaCRM en producción usando Render.com como plataforma de hosting, MongoDB Atlas como base de datos y Namecheap para la configuración del dominio `controlacrm.serrato.me`.

---

## 3. Infraestructura de Producción

| Componente    | Plataforma             | Plan         | URL                                     |
| ------------- | ---------------------- | ------------ | --------------------------------------- |
| Frontend      | Render.com Static Site | Gratuito     | `https://controlacrm.serrato.me`        |
| Backend       | Render.com Web Service | Gratuito     | `https://controlacrm.serrato.me/api`    |
| Base de datos | MongoDB Atlas M0       | Gratuito     | Conexión interna vía string de conexión |
| Dominio       | Namecheap              | Ya adquirido | `serrato.me`                            |

---

## 4. Requisitos Previos

Antes de iniciar el despliegue asegúrate de tener:

- Cuenta activa en [Render.com](https://render.com)
- Cuenta activa en [MongoDB Atlas](https://cloud.mongodb.com)
- Acceso al panel de DNS de [Namecheap](https://namecheap.com) para el dominio `serrato.me`
- Repositorio del proyecto en GitHub con el código actualizado
- El proyecto funcionando correctamente en entorno local

---

## 5. Paso 1 – Configurar MongoDB Atlas

### 5.1 Crear el Cluster

1. Ingresar a [MongoDB Atlas](https://cloud.mongodb.com).
2. Crear un nuevo proyecto llamado `controlacrm`.
3. Crear un nuevo cluster seleccionando el plan **M0 Free**.
4. Seleccionar la región más cercana (recomendado: `us-east-1`).

### 5.2 Crear el Usuario de Base de Datos

1. En el panel izquierdo ir a **Database Access**.
2. Hacer clic en **Add New Database User**.
3. Método de autenticación: **Password**.
4. Crear un usuario (ejemplo: `controlacrm-admin`) con una contraseña segura.
5. Asignar el rol **Atlas Admin** o **readWriteAnyDatabase**.
6. Guardar el usuario y la contraseña, se necesitarán más adelante.

### 5.3 Configurar el Acceso de Red

1. En el panel izquierdo ir a **Network Access**.
2. Hacer clic en **Add IP Address**.
3. Seleccionar **Allow Access from Anywhere** (`0.0.0.0/0`).

> Esto es necesario porque Render.com no tiene una IP fija en el plan gratuito.

### 5.4 Obtener el String de Conexión

1. En el cluster creado hacer clic en **Connect**.
2. Seleccionar **Connect your application**.
3. Copiar el string de conexión. Tiene este formato:

```
mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/<nombre-db>?retryWrites=true&w=majority
```

4. Reemplazar `<usuario>`, `<password>` y `<nombre-db>` por `controlacrm-admin`, la contraseña creada y `controlacrm` respectivamente.

---

## 6. Paso 2 – Desplegar el Backend en Render

### 6.1 Crear el Web Service

1. Ingresar a [Render.com](https://render.com) y hacer clic en **New > Web Service**.
2. Conectar el repositorio de GitHub del proyecto.
3. Configurar el servicio con los siguientes valores:

| Campo              | Valor                |
| ------------------ | -------------------- |
| **Name**           | `controlacrm-api`    |
| **Root Directory** | `server`             |
| **Runtime**        | `Node`               |
| **Build Command**  | `npm install`        |
| **Start Command**  | `node src/server.js` |
| **Plan**           | Free                 |

### 6.2 Configurar Variables de Entorno

En la sección **Environment Variables** del servicio agregar:

| Variable      | Valor                                              |
| ------------- | -------------------------------------------------- |
| `NODE_ENV`    | `production`                                       |
| `PORT`        | `3000`                                             |
| `MONGODB_URI` | String de conexión de MongoDB Atlas                |
| `JWT_SECRET`  | Una cadena aleatoria segura (mínimo 32 caracteres) |
| `CLIENT_URL`  | `https://controlacrm.serrato.me`                   |

### 6.3 Desplegar

1. Hacer clic en **Create Web Service**.
2. Render iniciará el proceso de build automáticamente.
3. Esperar a que el estado cambie a **Live**.
4. Render asignará una URL temporal como `controlacrm-api.onrender.com`. Anotar esta URL.

---

## 7. Paso 3 – Desplegar el Frontend en Render

### 7.1 Crear el Static Site

1. En Render hacer clic en **New > Static Site**.
2. Conectar el mismo repositorio de GitHub.
3. Configurar con los siguientes valores:

| Campo                 | Valor                          |
| --------------------- | ------------------------------ |
| **Name**              | `controlacrm-client`           |
| **Root Directory**    | `client`                       |
| **Build Command**     | `npm install && npm run build` |
| **Publish Directory** | `dist`                         |
| **Plan**              | Free                           |

### 7.2 Configurar Variables de Entorno

En la sección **Environment Variables** agregar:

| Variable       | Valor                                |
| -------------- | ------------------------------------ |
| `VITE_API_URL` | `https://controlacrm.serrato.me/api` |

### 7.3 Desplegar

1. Hacer clic en **Create Static Site**.
2. Esperar a que el build finalice y el estado sea **Live**.
3. Render asignará una URL temporal como `controlacrm-client.onrender.com`.

---

## 8. Paso 4 – Configurar el Dominio en Namecheap

### 8.1 Agregar Registro CNAME para el Frontend

1. Ingresar al panel de Namecheap y seleccionar el dominio `serrato.me`.
2. Ir a **Advanced DNS**.
3. Agregar un nuevo registro:

| Tipo  | Host          | Valor                             | TTL        |
| ----- | ------------- | --------------------------------- | ---------- |
| CNAME | `controlacrm` | `controlacrm-client.onrender.com` | Automático |

### 8.2 Verificar la Propagación DNS

La propagación DNS puede tardar entre 5 y 30 minutos. Puedes verificarla en [dnschecker.org](https://dnschecker.org) buscando `controlacrm.serrato.me`.

---

## 9. Paso 5 – Configurar el Dominio Personalizado en Render

### 9.1 Frontend

1. En el Static Site de Render ir a **Settings > Custom Domains**.
2. Agregar `controlacrm.serrato.me`.
3. Render verificará automáticamente el registro CNAME.
4. Una vez verificado, Render emite el certificado SSL automáticamente.

### 9.2 Backend

El backend no necesita dominio personalizado propio. Las peticiones a `/api` llegarán a través del frontend usando la variable de entorno `VITE_API_URL` configurada en el cliente.

---

## 10. Paso 6 – Seed Inicial de la Base de Datos

Antes de usar el sistema en producción es necesario crear el primer usuario Admin. Ejecutar el siguiente script desde el entorno local apuntando a la base de datos de producción:

```javascript
// seed.js - Ejecutar una sola vez
import mongoose from "mongoose";
import argon2 from "argon2";
import User from "./src/models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

const hashedPassword = await argon2.hash("Admin1234!");

await User.create({
  email: "admin@controlacrm.com",
  password: hashedPassword,
  role: "admin",
  active: true,
  createdBy: null,
});

console.log("Seed completado: usuario Admin creado.");
await mongoose.disconnect();
```

```bash
# Ejecutar desde la carpeta server/
node seed.js
```

> **Importante:** Cambiar la contraseña del Admin inmediatamente después del primer login en producción.

---

## 11. Verificación Post-Despliegue

Una vez completados todos los pasos, verificar que el sistema funciona correctamente:

- [ ] `https://controlacrm.serrato.me` carga la interfaz del frontend.
- [ ] `https://controlacrm.serrato.me/api/docs` muestra la documentación Swagger.
- [ ] El login con el usuario Admin funciona correctamente.
- [ ] La creación de un contacto de prueba funciona sin errores.
- [ ] El certificado SSL está activo (candado verde en el navegador).

---

## 12. Consideraciones del Plan Gratuito de Render

- El backend (Web Service) entra en modo inactivo tras 15 minutos sin recibir peticiones.
- El primer request después de la inactividad puede tardar hasta **50 segundos** (cold start).
- Este comportamiento es aceptable para el MVP educativo.
- Para eliminarlo en el futuro, se puede migrar al plan de pago de Render (~$7 USD/mes).
