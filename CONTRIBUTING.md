# Guía de Contribución – ControlaCRM

Gracias por tu interés en contribuir a ControlaCRM. Este documento explica cómo puedes participar en el proyecto de forma ordenada y efectiva.

---

## 1. Requisitos Previos

Antes de contribuir asegúrate de tener instalado:

- Node.js v18 o superior
- npm v9 o superior
- Git
- Una cuenta en GitHub

---

## 2. Cómo Reportar un Bug

Si encuentras un error en el proyecto:

1. Verifica que el bug no haya sido reportado ya en los [Issues](../../issues)
2. Abre un nuevo Issue usando la plantilla de bug report
3. Describe el problema con el mayor detalle posible:
   - Pasos para reproducirlo
   - Comportamiento esperado
   - Comportamiento actual
   - Capturas de pantalla si aplica

---

## 3. Cómo Sugerir una Mejora

Si tienes una idea para mejorar el proyecto:

1. Abre un nuevo Issue usando la plantilla de feature request
2. Describe la mejora y por qué sería útil
3. Espera retroalimentación antes de empezar a implementarla

---

## 4. Flujo de Trabajo para Contribuir con Código

### 4.1 Fork y Clone
```bash
# Fork el repositorio desde GitHub.com
# Luego clona tu fork
git clone https://github.com/tu-usuario/controlacrm.git
cd controlacrm
```

### 4.2 Crear una Rama
Crea una rama descriptiva basada en el issue que vas a trabajar:
```bash
git checkout -b <numero-issue>-descripcion-corta
# Ejemplo: git checkout -b 7-configurar-express-base
```

### 4.3 Instalar Dependencias
```bash
# Servidor
cd server
npm install

# Cliente
cd ../client
npm install
```

### 4.4 Configurar Variables de Entorno
```bash
cd server
cp .env.example .env
# Edita .env con tus valores locales
```

### 4.5 Escribir el Código
- Sigue los estándares definidos en `/docs/coding-standards.md`
- Usa Prettier para formatear el código antes de hacer commit
- Escribe mensajes de commit descriptivos en español o inglés

### 4.6 Convención de Commits
Usa el siguiente formato para los mensajes de commit:

```
tipo: descripción corta en minúsculas

Ejemplos:
feat: agregar endpoint POST /api/contacts
fix: corregir validación de email en loginSchema
docs: actualizar README con instrucciones de instalación
refactor: extraer lógica de negocio al service layer
chore: actualizar dependencias
```

### 4.7 Push y Pull Request
```bash
git add .
git commit -m "feat: descripción del cambio"
git push origin <nombre-de-tu-rama>
```

Luego abre un Pull Request desde GitHub hacia la rama `main` del repositorio original. Completa la plantilla del PR con toda la información requerida.

---

## 5. Estándares de Código

Antes de enviar tu contribución verifica que:

- [ ] El código sigue el patrón MVC + Service Layer del proyecto
- [ ] Los mensajes de error de validación están en español
- [ ] No hay `console.log` de debugging en el código final
- [ ] El código está formateado con Prettier
- [ ] Los errores se lanzan con `err.status` desde los services
- [ ] No se incluyen archivos `.env` ni credenciales en el commit

Consulta la documentación completa en `/docs/coding-standards.md`.

---

## 6. Proceso de Revisión

Una vez enviado el Pull Request:

1. El mantenedor revisará el código en un plazo razonable
2. Puede solicitarse cambios o mejoras antes de hacer merge
3. Una vez aprobado se hará merge a `main`

---

## Contacto

**Angel Didier Serrato Arias**
Proyecto de Grado – Tecnólogo en Análisis y Desarrollo de Software
Servicio Nacional de Aprendizaje (SENA) – 2026

---

*Documento generado como parte del proyecto ControlaCRM – Proyecto de Grado SENA.*
