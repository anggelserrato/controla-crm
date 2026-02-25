# Plan de Pruebas

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

Este documento define la estrategia, alcance, herramientas y criterios de las pruebas aplicadas al MVP de ControlaCRM. Su objetivo es verificar que el sistema cumple con los requisitos funcionales y no funcionales definidos en el SRS antes de su despliegue en producción.

---

## 3. Alcance de las Pruebas

### Incluido

- Endpoints de la API REST (autenticación, usuarios y contactos).
- Flujos de usuario en la interfaz web (navegador).
- Validación de datos de entrada en formularios y API.
- Control de acceso por roles (Admin y Sales).

### Excluido

- Pruebas de carga o estrés (fuera del alcance del MVP).
- Pruebas automatizadas con Jest o Supertest (planificadas para versiones futuras).
- Pruebas en navegadores distintos a Chrome y Firefox.
- Pruebas en dispositivos móviles nativos.

---

## 4. Tipos de Pruebas

### 4.1 Pruebas de API REST con Postman

Se verifican todos los endpoints de la API organizados en una colección de Postman. Cada request valida el código de estado HTTP, la estructura de la respuesta y el comportamiento según el rol del usuario.

**Herramienta:** Postman
**Entorno:** Desarrollo local (`http://localhost:3000/api`)

### 4.2 Pruebas Manuales de Interfaz

Se verifican los flujos de usuario en el navegador, comprobando que la interfaz responde correctamente a las acciones del usuario, muestra los mensajes de error y éxito apropiados y protege las rutas privadas.

**Herramienta:** Navegador web (Chrome)
**Entorno:** Desarrollo local (`http://localhost:5173`)

---

## 5. Módulos a Probar

| Módulo                      | Tipo de Prueba | Herramienta         |
| --------------------------- | -------------- | ------------------- |
| Autenticación (login)       | API + Interfaz | Postman + Navegador |
| Gestión de Usuarios (Admin) | API + Interfaz | Postman + Navegador |
| Gestión de Contactos        | API + Interfaz | Postman + Navegador |
| Control de acceso por roles | API + Interfaz | Postman + Navegador |
| Validación de formularios   | Interfaz       | Navegador           |
| Rutas protegidas            | Interfaz       | Navegador           |

---

## 6. Entornos de Prueba

| Entorno        | Backend                              | Frontend                         | Base de Datos                                  |
| -------------- | ------------------------------------ | -------------------------------- | ---------------------------------------------- |
| **Desarrollo** | `http://localhost:3000`              | `http://localhost:5173`          | MongoDB Atlas M0 (base de datos de desarrollo) |
| **Producción** | `https://controlacrm.serrato.me/api` | `https://controlacrm.serrato.me` | MongoDB Atlas M0 (base de datos de producción) |

> Las pruebas principales se ejecutan en el entorno de desarrollo para evitar afectar datos reales en producción.

---

## 7. Datos de Prueba

Para ejecutar las pruebas se requieren los siguientes datos precargados en la base de datos de desarrollo mediante el seed inicial:

| Rol   | Email                   | Contraseña   |
| ----- | ----------------------- | ------------ |
| Admin | `admin@controlacrm.com` | `Admin1234!` |
| Sales | `sales@controlacrm.com` | `Sales1234!` |

---

## 8. Criterios de Aceptación

Las pruebas se consideran exitosas cuando:

- Todos los endpoints retornan el código HTTP esperado para cada escenario.
- La estructura de las respuestas JSON sigue el formato `{ success, data }` o `{ success, message }`.
- Los roles Admin y Sales tienen acceso únicamente a los recursos que les corresponden.
- Los formularios del frontend muestran mensajes de error claros cuando los datos son inválidos.
- Las rutas privadas redirigen al login cuando no hay sesión activa.
- El soft delete desactiva el contacto sin eliminarlo de la base de datos.

---

## 9. Criterios de Fallo

Una prueba se considera fallida cuando:

- El endpoint retorna un código HTTP distinto al esperado.
- La respuesta no incluye los campos `success` y `data` o `message`.
- Un usuario con rol Sales puede acceder a recursos de otro usuario o a endpoints exclusivos del Admin.
- Un contacto desactivado sigue apareciendo en la lista.
- El sistema no muestra mensajes de error ante datos inválidos.
- Una ruta privada es accesible sin token JWT válido.

---

## 10. Estrategia de Reporte

Los resultados de las pruebas se registran en el documento **Casos de Prueba**, donde cada caso indica su estado final: **PASS** (aprobado) o **FAIL** (fallido). Los casos fallidos se corrigen antes del despliegue en producción.

---

## 11. Pruebas Futuras (Fuera del MVP)

| Tipo                          | Herramienta Sugerida  | Descripción                                                          |
| ----------------------------- | --------------------- | -------------------------------------------------------------------- |
| Pruebas unitarias de services | Jest                  | Verificar la lógica de negocio de cada service de forma aislada      |
| Pruebas de integración de API | Jest + Supertest      | Pruebas automatizadas de endpoints sobre una base de datos de prueba |
| Pruebas de componentes React  | React Testing Library | Verificar el comportamiento de componentes individuales              |
