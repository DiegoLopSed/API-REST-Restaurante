-- Script para insertar datos de ejemplo en la tabla platillos
-- Base de datos: restaurante
-- Tabla: platillos

USE `restaurante`;

-- Insertar platillos de ejemplo para el restaurante Ikigai Sushi
INSERT INTO `platillos` (`nombre`, `precio`, `imagen`) VALUES
('Sashimi de Salmón', 25.50, 'sashimi_salmon.jpg'),
('Roll California', 18.00, 'roll_california.jpg'),
('Teriyaki de Pollo', 16.50, 'teriyaki_pollo.jpg');

-- Verificar los datos insertados
SELECT * FROM `platillos` ORDER BY `id`;
