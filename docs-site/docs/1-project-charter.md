# Project Charter

---

## 1. Información General

| Campo                     | Detalle                                        |
| ------------------------- | ---------------------------------------------- |
| **Nombre del Proyecto**   | ControlaCRM                                    |
| **Autor / Desarrollador** | Angel Didier Serrato Arias                     |
| **Institución**           | Servicio Nacional de Aprendizaje (SENA)        |
| **Programa**              | Tecnólogo en Análisis y Desarrollo de Software |
| **Tipo de Proyecto**      | Proyecto de Grado – Educativo                  |
| **Fecha de Creación**     | Febrero 2026                                   |
| **Versión del Documento** | 1.0                                            |

---

## 2. Descripción del Proyecto

ControlaCRM es una aplicación web de gestión de relaciones con clientes (CRM) desarrollada como proyecto de grado del programa Tecnólogo en Análisis y Desarrollo de Software del SENA. El proyecto busca aplicar de forma integral los conocimientos adquiridos durante la formación, construyendo un producto funcional orientado a las necesidades reales de micro y pequeñas empresas de Bogotá, Colombia.

El alcance inicial corresponde a un **MVP (Minimum Viable Product)** enfocado exclusivamente en la **gestión de contactos**, como punto de partida para una solución CRM escalable.

---

## 3. Justificación

Las micro y pequeñas empresas (MiPymes) de Bogotá, Colombia, frecuentemente carecen de herramientas accesibles para gestionar sus relaciones con clientes de forma organizada. Las soluciones CRM existentes en el mercado suelen ser costosas o complejas para negocios de este tamaño. ControlaCRM nace como una alternativa simple, funcional y adaptada a este contexto, desarrollada con tecnologías modernas y de código abierto.

Adicionalmente, el proyecto representa la oportunidad de demostrar competencias técnicas en desarrollo de software full-stack adquiridas durante el programa de formación del SENA.

---

## 4. Objetivos del Proyecto

### Objetivo General

Desarrollar un MVP de aplicación web CRM que permita a micro y pequeñas empresas de Bogotá gestionar su base de contactos de manera simple y eficiente.

### Objetivos Específicos

- Implementar un módulo de gestión de contactos con operaciones CRUD completas.
- Aplicar el patrón de arquitectura MVC con Service Layer en el backend.
- Construir una interfaz de usuario moderna, responsiva y accesible.
- Documentar el proyecto siguiendo las fases del SDLC.
- Aplicar buenas prácticas de seguridad, validación y documentación de API.

---

## 5. Alcance del MVP

### Incluido

- Inicio de sesión de usuarios con autenticación JWT.
- Sistema de roles: **Admin** y **Sales**.
- El Admin gestiona usuarios (crear, editar, eliminar, listar) y tiene acceso total a los contactos.
- El Sales gestiona únicamente sus propios contactos asignados (crear, leer, actualizar, desactivar con soft delete).
- Cada contacto almacena: nombre, apellido, correo electrónico, teléfono, estado, notas y usuario asignado.
- Interfaz web responsiva con soporte de modo claro/oscuro.
- Documentación de API con Swagger.

### Excluido (fuera del MVP)

- Registro público de usuarios (los usuarios son creados por el Admin).
- Gestión de oportunidades de venta o pipeline.
- Módulo de tareas o recordatorios.
- Reportes y estadísticas.
- Integración con servicios externos (email, calendario, etc.).
- Aplicación móvil nativa.

---

## 6. Stack Tecnológico

### Backend

| Tecnología                                   | Uso                  |
| -------------------------------------------- | -------------------- |
| Node.js + Express 5                          | Servidor y API REST  |
| MongoDB + Mongoose                           | Base de datos NoSQL  |
| JSON Web Tokens (JWT)                        | Autenticación        |
| Argon2                                       | Hash de contraseñas  |
| Joi                                          | Validación de datos  |
| Swagger (swagger-jsdoc + swagger-ui-express) | Documentación de API |
| Helmet + CORS                                | Seguridad HTTP       |
| dotenv                                       | Variables de entorno |

### Frontend

| Tecnología                  | Uso                             |
| --------------------------- | ------------------------------- |
| React 19 + TypeScript       | Interfaz de usuario             |
| Vite 7                      | Bundler y entorno de desarrollo |
| Tailwind CSS v4 + Shadcn/UI | Estilos y componentes UI        |
| React Router v7             | Navegación SPA                  |
| Axios                       | Peticiones HTTP                 |
| React Hook Form + Zod       | Formularios y validación        |
| Zustand                     | Estado global                   |
| React Hot Toast             | Notificaciones                  |
| Lucide React                | Iconografía                     |
| Shadcn Themes               | Modo claro/oscuro               |

### Patrón de Arquitectura

- **Backend:** MVC (Model – View – Controller) + Service Layer
- **Frontend:** Arquitectura de componentes con separación por features

---

## 7. Interesados del Proyecto (Stakeholders)

| Rol                 | Nombre / Descripción                          |
| ------------------- | --------------------------------------------- |
| Desarrollador       | Angel Didier Serrato Arias                    |
| Usuario Objetivo    | Micro y pequeñas empresas de Bogotá, Colombia |
| Evaluador Académico | Instructor(es) del programa SENA              |

---

## 8. Restricciones

- El proyecto es desarrollado por una sola persona.
- No se cuenta con presupuesto para infraestructura de pago (se priorizarán servicios gratuitos o de capa libre).
- El alcance del MVP está limitado al módulo de gestión de contactos.
- La fecha límite definida para la entrega del MVP es **febrero de 2026**.

---

## 9. Supuestos

- Se cuenta con acceso a internet y herramientas de desarrollo sin costo.
- MongoDB Atlas (capa gratuita) estará disponible para el entorno de desarrollo y producción del MVP.
- El despliegue del MVP se realizará en plataformas gratuitas (por ejemplo, Render para el backend y Vercel para el frontend).

---

## 10. Riesgos Iniciales

| Riesgo                                                   | Probabilidad | Impacto | Mitigación                                                      |
| -------------------------------------------------------- | ------------ | ------- | --------------------------------------------------------------- |
| Alcance mal definido que genere reprocesos               | Media        | Alto    | Documentar bien los requisitos antes de desarrollar             |
| Curva de aprendizaje en tecnologías nuevas               | Media        | Medio   | Consultar documentación oficial y comunidad                     |
| Falta de tiempo por actividades personales               | Alta         | Medio   | Organizar el trabajo en tareas pequeñas sin fecha límite rígida |
| Problemas de compatibilidad entre versiones de librerías | Baja         | Medio   | Fijar versiones en package.json y probar en entorno limpio      |

---

## 11. Criterios de Éxito del MVP

- El Admin puede crear usuarios y gestionar todos los contactos sin errores críticos.
- El Sales puede iniciar sesión y gestionar únicamente sus propios contactos sin errores críticos.
- La API REST está documentada y funcional en Swagger.
- El código sigue el patrón MVC + Service Layer de forma consistente.
- La interfaz es responsiva y funciona correctamente en navegadores modernos.
- El proyecto está documentado siguiendo las fases del SDLC.

---

## 12. Aprobación

| Rol           | Nombre                     | Firma | Fecha        |
| ------------- | -------------------------- | ----- | ------------ |
| Desarrollador | Angel Didier Serrato Arias |       | Febrero 2026 |
