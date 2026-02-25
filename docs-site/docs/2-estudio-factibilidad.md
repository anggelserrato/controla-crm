# Estudio de Factibilidad

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

## 2. Objetivo del Estudio

Determinar si el proyecto ControlaCRM es viable desde los aspectos técnico, operativo, económico y legal, con el fin de justificar su desarrollo como proyecto de grado y como producto funcional orientado a micro y pequeñas empresas de Bogotá, Colombia.

---

## 3. Factibilidad Técnica

### 3.1 Tecnologías Disponibles

Todas las tecnologías seleccionadas para el proyecto son de código abierto, con documentación activa, comunidades grandes y sin costo de licencia.

| Capa          | Tecnología                           | Disponibilidad                                   |
| ------------- | ------------------------------------ | ------------------------------------------------ |
| Backend       | Node.js, Express 5, Mongoose         | ✅ Gratuito / Open Source                        |
| Base de Datos | MongoDB Atlas (capa gratuita)        | ✅ Gratuito hasta 512 MB                         |
| Frontend      | React 19, TypeScript, Vite 7         | ✅ Gratuito / Open Source                        |
| UI            | Tailwind CSS v4, Shadcn/UI           | ✅ Gratuito / Open Source                        |
| Despliegue    | Render.com                           | ✅ Capa gratuita disponible                      |
| Dominio       | `controlacrm.serrato.me` (Namecheap) | ✅ Subdominio del dominio existente `serrato.me` |
| DNS           | Namecheap DNS apuntando a Render     | ✅ Configuración estándar de CNAME               |

### 3.2 Infraestructura de Despliegue

El proyecto será desplegado íntegramente en **Render.com**, aprovechando la capa gratuita para tanto el servicio de backend (Web Service) como el frontend (Static Site). La base de datos estará alojada en **MongoDB Atlas** en su capa gratuita (M0 Cluster).

El acceso público se realizará a través del subdominio `controlacrm.serrato.me`, configurado mediante un registro **CNAME** en Namecheap apuntando al dominio generado por Render.

| Componente         | Plataforma    | Plan        | URL                                     |
| ------------------ | ------------- | ----------- | --------------------------------------- |
| Backend (API REST) | Render.com    | Gratuito    | `controlacrm.serrato.me/api`            |
| Frontend (SPA)     | Render.com    | Gratuito    | `controlacrm.serrato.me`                |
| Base de Datos      | MongoDB Atlas | M0 Gratuito | Conexión interna vía string de conexión |

### 3.3 Conocimientos Técnicos del Desarrollador

El desarrollador cuenta con formación en el programa Tecnólogo en Análisis y Desarrollo de Software del SENA, con conocimientos en:

- Desarrollo web full-stack con JavaScript/TypeScript.
- Bases de datos relacionales y no relacionales.
- Consumo y construcción de APIs REST.
- Control de versiones con Git y GitHub.
- Fundamentos de seguridad en aplicaciones web.

**Conclusión técnica:** El proyecto es técnicamente factible. Las herramientas están disponibles, son gratuitas y el desarrollador posee las competencias necesarias para ejecutarlo.

---

## 4. Factibilidad Operativa

### 4.1 Necesidad Real del Producto

Las micro y pequeñas empresas (MiPymes) de Bogotá frecuentemente administran sus contactos de clientes mediante hojas de cálculo, libretas físicas o aplicaciones de mensajería, lo que genera desorganización, pérdida de información y dificultades para el seguimiento comercial. ControlaCRM busca resolver esta problemática con una solución web simple y accesible.

### 4.2 Facilidad de Uso

El MVP está diseñado con una interfaz moderna, responsiva y con soporte de modo claro/oscuro, lo que reduce la curva de aprendizaje para usuarios no técnicos. Las operaciones principales (gestión de contactos) son intuitivas y no requieren capacitación especializada.

### 4.3 Mantenimiento

Al ser desarrollado por una sola persona y estar alojado en plataformas administradas (Render, MongoDB Atlas), el mantenimiento operativo es mínimo. Las actualizaciones de código se realizarán mediante despliegue continuo desde el repositorio de GitHub.

**Conclusión operativa:** El proyecto es operativamente factible. Resuelve una necesidad concreta, es fácil de usar y su mantenimiento no representa una carga significativa para el desarrollador.

---

## 5. Factibilidad Económica

### 5.1 Costos del Proyecto

Dado que el proyecto es de carácter educativo y personal, todos los recursos utilizados corresponden a planes gratuitos o a inversiones ya existentes.

| Recurso                                           | Costo Mensual | Observación                            |
| ------------------------------------------------- | ------------- | -------------------------------------- |
| Render.com (Frontend + Backend)                   | $0 USD        | Capa gratuita                          |
| MongoDB Atlas (M0 Cluster)                        | $0 USD        | Capa gratuita, 512 MB                  |
| Dominio `serrato.me` (Namecheap)                  | Ya adquirido  | El subdominio no tiene costo adicional |
| Herramientas de desarrollo (VSCode, Git, Node.js) | $0 USD        | Open Source / Gratuito                 |
| **Total mensual estimado**                        | **$0 USD**    |                                        |

### 5.2 Consideraciones

- La capa gratuita de Render puede implicar tiempos de arranque en frío (cold start) de hasta 50 segundos tras períodos de inactividad. Esto es aceptable para un MVP educativo.
- Si el proyecto escala en el futuro, se podría migrar al plan de pago de Render (~$7 USD/mes) para eliminar el cold start.

**Conclusión económica:** El proyecto es económicamente factible. El costo de desarrollo y operación del MVP es de $0 USD mensuales, haciendo uso exclusivo de recursos gratuitos y ya disponibles.

---

## 6. Factibilidad Legal

### 6.1 Licencias de Software

Todas las tecnologías utilizadas en el proyecto están licenciadas bajo esquemas de código abierto (MIT, Apache 2.0, ISC) que permiten su uso libre, incluso en proyectos con fines educativos y comerciales, sin restricciones.

### 6.2 Protección de Datos

El sistema almacenará información de contactos de clientes (nombre, empresa, correo, teléfono). En el contexto colombiano, esto implica considerar la **Ley 1581 de 2012 (Ley de Protección de Datos Personales)** y su decreto reglamentario 1377 de 2013. Para el MVP educativo se tendrán en cuenta los siguientes principios:

- Los datos se almacenan de forma segura con contraseñas hasheadas (Argon2).
- La autenticación mediante JWT protege el acceso a la información.
- No se compartirán datos con terceros.

### 6.3 Propiedad Intelectual

El proyecto es de autoría original de Angel Didier Serrato Arias, desarrollado como proyecto de grado del SENA. El código fuente podrá ser publicado en GitHub bajo la licencia que el autor defina.

**Conclusión legal:** El proyecto es legalmente factible. El uso de librerías open source es permitido, y el manejo de datos personales se realizará con las medidas básicas de seguridad requeridas por la normativa colombiana.

---

## 7. Conclusión General

| Dimensión | Resultado   |
| --------- | ----------- |
| Técnica   | ✅ Factible |
| Operativa | ✅ Factible |
| Económica | ✅ Factible |
| Legal     | ✅ Factible |

El proyecto ControlaCRM es **viable en todas sus dimensiones**. Se cuenta con las tecnologías, los conocimientos, los recursos económicos y el marco legal necesarios para llevar a cabo su desarrollo e implementación como MVP funcional.
