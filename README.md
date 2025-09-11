# Sistema de Gestión de Platillos - Ikigai Sushi API

## Requisitos del Sistema

- **Node.js**: Versión 14 o superior
- **npm**: Versión 6 o superior
- **MySQL**: Versión 5.7 o superior
- **Navegador web**: Chrome, Firefox, Safari o Edge (versiones recientes)

## Descripción General

Esta aplicación es un **sistema completo de gestión de platillos para restaurantes** que permite administrar el menú de manera eficiente. La aplicación combina un **backend API REST** desarrollado en Node.js con Express y un **frontend web** moderno para ofrecer una experiencia completa de gestión de platillos.

### ¿Qué hace la aplicación?

La aplicación permite a los administradores de restaurantes:

- **Gestionar el menú completo**: Crear, editar, ver y eliminar platillos del menú
- **Administrar imágenes**: Subir y gestionar fotos de los platillos
- **Buscar platillos**: Encontrar rápidamente platillos específicos por nombre
- **Controlar precios**: Actualizar precios de manera dinámica
- **Autenticación segura**: Sistema de login para proteger el acceso

### Arquitectura

- **Backend**: API REST con Node.js, Express y MySQL
- **Frontend**: Interfaz web responsive con HTML, CSS y JavaScript
- **Base de Datos**: MySQL para almacenar información de platillos
- **Autenticación**: JWT (JSON Web Tokens) para seguridad
- **Gestión de archivos**: Multer para subida de imágenes

## Características Principales

- ✅ **CRUD completo** de platillos con validación
- 🖼️ **Gestión de imágenes** con subida de archivos
- 🔐 **Sistema de autenticación** con JWT
- 🔍 **Búsqueda en tiempo real** por nombre
- 📱 **Interfaz responsive** y moderna
- 🎨 **Visualización de imágenes** con estilos mejorados
- 🛡️ **Middleware de seguridad** y validación

## Estructura del Proyecto

```
Primer-Practica/
├── public/
│   ├── CSS/
│   │   └── main.css          # Estilos principales
│   ├── img/                  # Carpeta de imágenes
│   ├── JS/
│   │   └── main.js          # Lógica del frontend
│   └── index.html           # Interfaz principal
├── src/
│   ├── Controller/
│   │   └── Platillos.controller.js  # Controlador de platillos
│   ├── Middleware/
│   │   └── Storage.js               # Manejo de archivos
│   ├── Models/
│   │   └── PlatillosModel.js        # Modelo de datos
│   ├── Routes/
│   │   └── Platillos.routes.js      # Rutas de la API
│   ├── app.js                        # Configuración de Express
│   ├── config.js                     # Variables de entorno
│   ├── db.js                        # Conexión a base de datos
│   └── index.js                     # Servidor principal
├── db.sql                          # Script de base de datos
└── package.json                    # Dependencias del proyecto
```

## Base de Datos

La tabla `platillos` tiene la siguiente estructura:

```sql
CREATE TABLE `platillos` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `nombre` varchar(80) DEFAULT NULL,
    `descripcion` text DEFAULT NULL,
    `precio` decimal(10,2) DEFAULT NULL,
    `imagen` varchar(150) DEFAULT NULL,
    PRIMARY KEY (`id`)
);
```

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/platillos` | Obtener todos los platillos |
| GET | `/platillo/:id` | Obtener un platillo específico |
| POST | `/platillos` | Crear un nuevo platillo |
| PUT | `/platillo/:id` | Actualizar un platillo existente |
| DELETE | `/platillo/:id` | Eliminar un platillo |

## Funcionalidades del Frontend

### 1. Visualización de Platillos
- Tabla con columnas: ID, Imagen, Nombre, Descripción, Precio, Acciones
- Imágenes mostradas con estilos mejorados y hover effects
- Fallback a imagen placeholder si no hay imagen disponible

### 2. Operaciones CRUD
- **Crear**: Formulario con campos para nombre, descripción, precio e imagen
- **Leer**: Vista de lista con búsqueda en tiempo real
- **Actualizar**: Formulario pre-llenado con opción de cambiar imagen
- **Eliminar**: Confirmación y eliminación inmediata

### 3. Gestión de Imágenes
- Subida de archivos JPG, JPEG y PNG
- Almacenamiento en carpeta `public/img/`
- Nombres únicos basados en timestamp
- Validación de tipos de archivo

## Dependencias del Proyecto

### Dependencias Principales

La aplicación utiliza las siguientes dependencias principales:

| Dependencia | Versión | Propósito |
|-------------|---------|-----------|
| **express** | ^5.1.0 | Framework web para Node.js |
| **mysql2** | ^3.14.3 | Cliente MySQL para Node.js |
| **bcryptjs** | ^3.0.2 | Encriptación de contraseñas |
| **jsonwebtoken** | ^9.0.2 | Autenticación con JWT |
| **multer** | ^2.0.2 | Manejo de subida de archivos |
| **cors** | ^2.8.5 | Configuración de CORS |
| **dotenv** | ^17.2.1 | Variables de entorno |
| **morgan** | ^1.10.1 | Logger de peticiones HTTP |

### Comandos de Instalación

#### Instalación Completa (Recomendado)
```bash
npm install
```

#### Instalación Individual de Dependencias
```bash
# Framework web
npm install express@^5.1.0

# Base de datos
npm install mysql2@^3.14.3

# Seguridad y autenticación
npm install bcryptjs@^3.0.2
npm install jsonwebtoken@^9.0.2

# Manejo de archivos
npm install multer@^2.0.2

# Configuración y utilidades
npm install cors@^2.8.5
npm install dotenv@^17.2.1
npm install morgan@^1.10.1
```

## Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd Primer-Practica
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear archivo `.env` con:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_password
   DB_DATABASE=restaurantes
   DB_PORT=3306
   ```

4. **Configurar base de datos**
   ```bash
   mysql -u root -p < db.sql
   ```

5. **Ejecutar el servidor**
   ```bash
   npm start
   ```

6. **Abrir en navegador**
   ```
   http://localhost:5000
   ```

## Uso

### Crear un Nuevo Platillo
1. Llenar el formulario de creación
2. Seleccionar una imagen (opcional)
3. Hacer clic en "Crear"

### Editar un Platillo
1. Hacer clic en "Ver" en la fila del platillo
2. Los campos se llenarán automáticamente
3. Modificar los valores deseados
4. Seleccionar nueva imagen si es necesario
5. Hacer clic en "Actualizar"

### Eliminar un Platillo
1. Hacer clic en "Borrar" en la fila del platillo
2. Confirmar la eliminación

### Buscar Platillos
- Usar el campo de búsqueda para filtrar por nombre
- La búsqueda es en tiempo real

## Stack Tecnológico

### Backend
- **Node.js**: Runtime de JavaScript
- **Express.js**: Framework web minimalista
- **MySQL**: Base de datos relacional
- **JWT**: Autenticación basada en tokens
- **Multer**: Middleware para manejo de archivos
- **bcryptjs**: Encriptación de contraseñas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos y responsive
- **JavaScript ES6+**: Lógica del cliente
- **Fetch API**: Comunicación con el backend

### Herramientas de Desarrollo
- **Morgan**: Logger de peticiones HTTP
- **CORS**: Configuración de políticas de origen cruzado
- **dotenv**: Gestión de variables de entorno

## Características Técnicas

- **Validación de archivos**: Solo acepta imágenes JPG, JPEG y PNG
- **Manejo de errores**: Respuestas HTTP apropiadas y mensajes de usuario
- **Seguridad**: Validación de entrada y sanitización de datos
- **Performance**: Caché de datos en el frontend
- **UX**: Feedback visual inmediato para todas las operaciones

## Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
