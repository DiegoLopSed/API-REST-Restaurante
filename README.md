# 🍣 Ikigai Sushi - API REST

API REST para gestión de platillos de restaurante desarrollada con Node.js, Express y MySQL.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Base de Datos](#base-de-datos)
- [Adaptabilidad a Diferentes Bases de Datos](#adaptabilidad-a-diferentes-bases-de-datos)
- [Uso](#uso)
- [Scripts Disponibles](#scripts-disponibles)
- [Autor](#autor)

## 📝 Descripción

Ikigai Sushi es una API REST completa para la gestión de platillos de restaurante. Proporciona operaciones CRUD (Create, Read, Update, Delete) para manejar el inventario de platillos, incluyendo información como nombre, descripción y precio.

## ✨ Características

- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar platillos
- ✅ **Validación de Datos**: Manejo seguro de parámetros con prepared statements
- ✅ **Manejo de Errores**: Respuestas HTTP apropiadas y manejo de excepciones
- ✅ **CORS Habilitado**: Compatible con aplicaciones frontend
- ✅ **Logging**: Registro de peticiones con Morgan
- ✅ **Configuración Flexible**: Variables de entorno para diferentes entornos
- ✅ **Base de Datos Adaptable**: Fácil migración entre diferentes sistemas de BD

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **MySQL2** - Driver de MySQL para Node.js
- **CORS** - Middleware para Cross-Origin Resource Sharing
- **Morgan** - Middleware de logging HTTP
- **Dotenv** - Gestión de variables de entorno

## 🚀 Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/DiegoLopSed/API-REST-Restaurante.git
cd Primer-Practica
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

4. **Configurar la base de datos** (ver sección de configuración)

5. **Ejecutar el proyecto:**
```bash
npm run dev
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=restaurantes
DB_PORT=3306
```

### Base de Datos

1. **Crear la base de datos:**
```sql
CREATE DATABASE restaurantes;
```

2. **Ejecutar el script SQL:**
```bash
mysql -u tu_usuario -p restaurantes < db.sql
```

**Estructura de la tabla `makis`:**
```sql
CREATE TABLE makis (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(80) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id)
);
```

## 📁 Estructura del Proyecto

```
Primer-Practica/
├── src/
│   ├── Controller/
│   │   └── Platillos.controller.js    # Lógica de negocio
│   ├── Routes/
│   │   └── Platillos.routes.js        # Definición de rutas
│   ├── Models/
│   │   └── PlatillosModel.js          # Modelos de datos
│   ├── app.js                         # Configuración de Express
│   ├── index.js                       # Punto de entrada
│   ├── config.js                      # Configuración de variables
│   └── db.js                          # Conexión a base de datos
├── db.sql                             # Script de base de datos
├── package.json                       # Dependencias y scripts
└── README.md                          # Documentación
```

## 🔌 API Endpoints

### Platillos

#### Obtener todos los platillos
```http
GET /platillos
```

**Respuesta:**
```json
[
    {
        "id": 1,
        "nombre": "Maki California",
        "descripcion": "Roll de salmón, aguacate y pepino",
        "precio": 12.50
    }
]
```

#### Obtener un platillo por ID
```http
GET /platillo/:id
```

**Parámetros:**
- `id` (number): ID del platillo

**Respuesta:**
```json
{
    "id": 1,
    "nombre": "Maki California",
    "descripcion": "Roll de salmón, aguacate y pepino",
    "precio": 12.50
}
```

#### Crear un nuevo platillo
```http
POST /platillos
```

**Body:**
```json
{
    "nombre": "Maki California",
    "descripcion": "Roll de salmón, aguacate y pepino",
    "precio": 12.50
}
```

**Respuesta:**
```json
{
    "message": "Platillo Guardado"
}
```

#### Actualizar un platillo
```http
PUT /platillo/:id
```

**Parámetros:**
- `id` (number): ID del platillo

**Body:**
```json
{
    "nombre": "Maki California Actualizado",
    "descripcion": "Roll de salmón fresco, aguacate y pepino",
    "precio": 15.99
}
```

**Respuesta:**
```json
{
    "message": "Platillo actualizado correctamente"
}
```

#### Eliminar un platillo
```http
DELETE /platillo/:id
```

**Parámetros:**
- `id` (number): ID del platillo

**Respuesta:**
```json
{
    "message": "Platillo eliminado correctamente"
}
```

## 🗄️ Base de Datos

### Tabla: `makis`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | BIGINT | Clave primaria autoincremental |
| `nombre` | VARCHAR(80) | Nombre del platillo |
| `descripcion` | TEXT | Descripción detallada |
| `precio` | DECIMAL(10,2) | Precio del platillo |

## 🔄 Adaptabilidad a Diferentes Bases de Datos

El proyecto está diseñado para ser fácilmente adaptable a diferentes sistemas de base de datos. Para migrar a otra base de datos:

### 1. Cambiar el Driver de Base de Datos

**Para PostgreSQL:**
```bash
npm uninstall mysql2
npm install pg
```

**Para SQLite:**
```bash
npm uninstall mysql2
npm install sqlite3
```

### 2. Modificar `src/db.js`

**PostgreSQL:**
```javascript
import pkg from 'pg';
const { Pool } = pkg;

export const connection = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
});
```

**SQLite:**
```javascript
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const connection = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
});
```

### 3. Adaptar Consultas SQL

Las consultas en el controlador son estándar SQL, pero pueden requerir ajustes menores:

**MySQL:**
```sql
INSERT INTO makis (nombre, descripcion, precio) VALUES (?, ?, ?)
```

**PostgreSQL:**
```sql
INSERT INTO makis (nombre, descripcion, precio) VALUES ($1, $2, $3)
```

### 4. Actualizar Variables de Entorno

```env
# PostgreSQL
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_DATABASE=restaurantes
DB_PORT=5432

# SQLite (no requiere variables de BD)
```

## 💻 Uso

### Ejemplos con cURL

**Obtener todos los platillos:**
```bash
curl http://localhost:3000/platillos
```

**Crear un platillo:**
```bash
curl -X POST http://localhost:3000/platillos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Maki California","descripcion":"Roll de salmón","precio":12.50}'
```

**Actualizar un platillo:**
```bash
curl -X PUT http://localhost:3000/platillo/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Maki Actualizado","descripcion":"Nueva descripción","precio":15.99}'
```

**Eliminar un platillo:**
```bash
curl -X DELETE http://localhost:3000/platillo/1
```

### Ejemplos con JavaScript

```javascript
// Obtener platillos
fetch('http://localhost:3000/platillos')
    .then(response => response.json())
    .then(data => console.log(data));

// Crear platillo
fetch('http://localhost:3000/platillos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        nombre: 'Maki California',
        descripcion: 'Roll de salmón',
        precio: 12.50
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

## 📜 Scripts Disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo con auto-reload
npm test         # Ejecutar tests (configurado como alias de dev)
```

## 👨‍💻 Autor

**Diego Lopez Sedeño**

- **Proyecto:** - API REST
- **Versión:** 1.0.0
- **Licencia:** ISC

---

## 📝 Notas Adicionales

- El proyecto utiliza ES6 modules (`"type": "module"` en package.json)
- Todas las consultas SQL utilizan prepared statements para prevenir inyección SQL
- El servidor incluye middleware CORS para permitir peticiones desde diferentes dominios
- Los logs de peticiones HTTP se registran automáticamente con Morgan
- El manejo de errores es consistente en todos los endpoints

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
