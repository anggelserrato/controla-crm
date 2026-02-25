# Manual de Usuario

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

## 2. ¿Qué es ControlaCRM?

ControlaCRM es una aplicación web para la gestión de contactos comerciales. Permite a equipos de ventas de micro y pequeñas empresas organizar su base de clientes de forma simple y accesible desde cualquier navegador.

**Acceso:** `https://controlacrm.serrato.me`

---

## 3. Requisitos para Usar el Sistema

- Navegador web actualizado (Chrome, Firefox o Edge).
- Conexión a internet.
- Credenciales de acceso proporcionadas por el administrador.

> No es necesario instalar ningún programa. ControlaCRM funciona completamente desde el navegador.

---

## 4. Roles del Sistema

ControlaCRM maneja dos tipos de usuario:

| Rol       | Descripción                                                                              |
| --------- | ---------------------------------------------------------------------------------------- |
| **Admin** | Administrador del sistema. Gestiona usuarios y tiene acceso total a todos los contactos. |
| **Sales** | Vendedor. Gestiona únicamente los contactos que le han sido asignados.                   |

> Los usuarios no pueden registrarse por su cuenta. El Admin es quien crea y gestiona las cuentas de acceso.

---

## 5. Inicio de Sesión

1. Ingresar a `https://controlacrm.serrato.me`.
2. En la pantalla de inicio de sesión ingresar el **correo electrónico** y la **contraseña** proporcionados por el administrador.
3. Hacer clic en **Iniciar sesión**.

Si las credenciales son correctas, el sistema redirigirá automáticamente al dashboard principal.

**Posibles errores:**

| Mensaje                  | Causa                          | Solución                                  |
| ------------------------ | ------------------------------ | ----------------------------------------- |
| Credenciales incorrectas | Email o contraseña equivocados | Verificar los datos e intentar nuevamente |
| Campos obligatorios      | Se dejaron campos vacíos       | Completar todos los campos                |

---

## 6. Cerrar Sesión

1. Hacer clic en el menú de usuario ubicado en la parte superior de la pantalla.
2. Seleccionar **Cerrar sesión**.

El sistema redirigirá a la pantalla de inicio de sesión.

> Por seguridad, se recomienda cerrar sesión al terminar de usar el sistema, especialmente en computadores compartidos.

---

## 7. Gestión de Contactos

### 7.1 Ver la Lista de Contactos

1. En el menú principal hacer clic en **Contactos**.
2. Se mostrará la lista de todos los contactos activos asignados al usuario.

Cada contacto en la lista muestra: nombre completo, correo electrónico, teléfono y estado actual.

---

### 7.2 Ver el Detalle de un Contacto

1. En la lista de contactos hacer clic sobre el nombre del contacto.
2. Se abrirá la página de detalle con toda la información del contacto:
   - Nombre y apellido
   - Correo electrónico
   - Teléfono
   - Estado
   - Notas
   - Fecha de creación y última actualización

---

### 7.3 Crear un Nuevo Contacto

1. En la lista de contactos hacer clic en el botón **Nuevo Contacto**.
2. Completar el formulario con la información del contacto:

| Campo              | Obligatorio | Descripción                         |
| ------------------ | ----------- | ----------------------------------- |
| Nombre             | Sí          | Nombre del contacto                 |
| Apellido           | Sí          | Apellido del contacto               |
| Correo electrónico | Sí          | Email del contacto                  |
| Teléfono           | No          | Número de teléfono                  |
| Estado             | Sí          | Estado inicial (por defecto: Nuevo) |
| Notas              | No          | Observaciones adicionales           |

3. Hacer clic en **Guardar**.
4. Aparecerá una notificación de éxito y el contacto se agregará a la lista.

---

### 7.4 Estados de un Contacto

Los contactos tienen cuatro estados posibles que representan el progreso en el proceso comercial:

| Estado                        | Descripción                                          |
| ----------------------------- | ---------------------------------------------------- |
| **NEW** (Nuevo)               | Contacto recién registrado, sin gestión iniciada     |
| **IN_PROGRESS** (En progreso) | Contacto en proceso de seguimiento activo            |
| **CONTACTED** (Contactado)    | Se ha establecido comunicación con el contacto       |
| **CLOSED** (Cerrado)          | El proceso comercial con este contacto ha finalizado |

---

### 7.5 Editar un Contacto

1. Desde la lista o la página de detalle, hacer clic en la opción **Editar**.
2. Modificar los campos necesarios en el formulario.
3. Hacer clic en **Guardar cambios**.
4. Aparecerá una notificación de éxito con los datos actualizados.

---

### 7.6 Desactivar un Contacto

Desactivar un contacto lo retira de la lista sin eliminarlo permanentemente de la base de datos.

1. Desde la lista o la página de detalle, hacer clic en la opción **Desactivar**.
2. Aparecerá un mensaje de confirmación preguntando si está seguro.
3. Hacer clic en **Confirmar** para desactivar o en **Cancelar** para mantener el contacto activo.
4. Si se confirma, el contacto desaparece de la lista y aparece una notificación de éxito.

> **Nota:** Esta acción no elimina el contacto de forma permanente. El registro se conserva en el sistema con estado inactivo.

---

## 8. Gestión de Usuarios (Solo Admin)

Esta sección está disponible únicamente para usuarios con rol **Admin**.

### 8.1 Ver la Lista de Usuarios

1. En el menú principal hacer clic en **Usuarios**.
2. Se mostrará la lista de todos los usuarios registrados en el sistema.

---

### 8.2 Crear un Nuevo Usuario

1. En la lista de usuarios hacer clic en **Nuevo Usuario**.
2. Completar el formulario:

| Campo              | Obligatorio | Descripción                              |
| ------------------ | ----------- | ---------------------------------------- |
| Correo electrónico | Sí          | Email de acceso del nuevo usuario        |
| Contraseña         | Sí          | Contraseña inicial (mínimo 8 caracteres) |
| Rol                | Sí          | Admin o Sales                            |

3. Hacer clic en **Guardar**.
4. El nuevo usuario podrá iniciar sesión de inmediato con las credenciales asignadas.

> Comunicar las credenciales al usuario de forma segura y recomendarle cambiar su contraseña en el primer acceso.

---

### 8.3 Editar un Usuario

1. En la lista de usuarios hacer clic en la opción **Editar** del usuario correspondiente.
2. Modificar los campos necesarios.
3. Hacer clic en **Guardar cambios**.

---

### 8.4 Eliminar un Usuario

1. En la lista de usuarios hacer clic en la opción **Eliminar** del usuario correspondiente.
2. Confirmar la acción en el mensaje que aparece.

> **Advertencia:** Eliminar un usuario es una acción permanente. Los contactos asignados a ese usuario permanecerán en el sistema pero quedarán sin un vendedor activo asignado.

---

## 9. Modo Claro y Modo Oscuro

ControlaCRM soporta modo claro y modo oscuro. Para cambiar entre ellos:

1. Hacer clic en el ícono de tema ubicado en la barra superior de la aplicación.
2. Seleccionar **Claro** u **Oscuro** según preferencia.

El sistema recordará la preferencia durante la sesión activa.

---

## 10. Preguntas Frecuentes

**¿Puedo recuperar mi contraseña si la olvido?**
La recuperación de contraseña no está disponible en esta versión. Contactar al administrador del sistema para que restablezca las credenciales.

**¿Puedo ver los contactos de otros vendedores?**
No. Cada vendedor (rol Sales) solo puede ver y gestionar los contactos que le han sido asignados. Solo el Admin tiene acceso a todos los contactos.

**¿Se pierden los datos al desactivar un contacto?**
No. Desactivar un contacto solo lo oculta de la lista. El registro se conserva en la base de datos y podría recuperarse en versiones futuras del sistema.

**¿La aplicación funciona en el celular?**
Sí. La interfaz está diseñada para adaptarse a pantallas de diferentes tamaños (responsiva), por lo que puede usarse desde el navegador de un teléfono móvil.

**¿Qué hago si la aplicación tarda mucho en responder?**
El servidor puede tardar hasta 50 segundos en responder después de un período de inactividad. Esto es normal en la versión actual. Esperar unos segundos y volver a intentar la acción.
