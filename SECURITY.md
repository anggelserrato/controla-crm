# Política de Seguridad – ControlaCRM

## Versiones Soportadas

Actualmente se proveen actualizaciones de seguridad para la siguiente versión:

| Versión | Soportada |
|---|---|
| 1.0.x | ✅ |

## Reportar una Vulnerabilidad

Si descubres una vulnerabilidad de seguridad en ControlaCRM, te pedimos que la reportes de forma responsable siguiendo estos pasos:

**No abras un Issue público** para reportar vulnerabilidades de seguridad, ya que esto podría exponer el problema antes de que sea corregido.

### Cómo reportar

Envía un reporte detallado directamente al mantenedor del proyecto con la siguiente información:

- Descripción de la vulnerabilidad
- Pasos para reproducirla
- Impacto potencial
- Sugerencia de corrección si la tienes

### Qué esperar después de reportar

- Confirmación de recepción en un plazo razonable
- Evaluación del impacto y la severidad
- Corrección de la vulnerabilidad en la siguiente versión
- Reconocimiento en el changelog si lo deseas

## Prácticas de Seguridad Implementadas

ControlaCRM implementa las siguientes medidas de seguridad:

- Autenticación con JSON Web Tokens (JWT)
- Hash de contraseñas con Argon2
- Cabeceras de seguridad HTTP con Helmet
- CORS restringido al dominio autorizado
- Validación de datos de entrada con Joi (backend) y Zod (frontend)
- Variables de entorno para credenciales sensibles via dotenv
- Soft delete para preservar integridad de datos
- Control de acceso por roles (Admin y Sales)

## Contacto

**Angel Didier Serrato Arias**
Proyecto de Grado – Tecnólogo en Análisis y Desarrollo de Software
Servicio Nacional de Aprendizaje (SENA) – 2026

---

*Documento generado como parte del proyecto ControlaCRM – Proyecto de Grado SENA.*
