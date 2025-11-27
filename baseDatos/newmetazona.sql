-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2025 a las 23:10:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `newmetazona`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `slug` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`) VALUES
(1, 'Frutas y Verduras', 'frutas'),
(2, 'Carnes', 'carnes'),
(3, 'Pescados', 'pescados'),
(4, 'Lácteos', 'lacteos'),
(5, 'Cereales', 'cereales'),
(6, 'Bebidas', 'bebidas'),
(7, 'Congelados', 'congelados'),
(8, 'Snacks', 'snacks'),
(9, 'Limpieza', 'limpieza'),
(10, 'Higiene', 'higiene');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `stock` int(11) DEFAULT 0,
  `sku` varchar(64) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `price`, `image_url`, `stock`, `sku`, `created_at`) VALUES
(41, 1, 'Cebolla', 2.10, 'img/cebolla.png', 100, 'FRU-001', '2025-11-27 16:28:05'),
(42, 1, 'Lechuga', 0.99, 'img/lechuga.png', 100, 'FRU-002', '2025-11-27 16:28:05'),
(43, 1, 'Naranja', 1.80, 'img/naranja.png', 100, 'FRU-003', '2025-11-27 16:28:05'),
(44, 1, 'Pepino', 1.25, 'img/pepino.png', 100, 'FRU-004', '2025-11-27 16:28:05'),
(45, 1, 'Pimiento', 2.00, 'img/pimiento.png', 100, 'FRU-005', '2025-11-27 16:28:05'),
(46, 1, 'Plátano', 1.20, 'img/platano.png', 100, 'FRU-006', '2025-11-27 16:28:05'),
(47, 1, 'Zanahoria', 1.15, 'img/zanahoria.png', 100, 'FRU-007', '2025-11-27 16:28:05'),
(48, 1, 'Tomate', 2.10, 'img/tomate.png', 100, 'FRU-008', '2025-11-27 16:28:05'),
(49, 1, 'Manzana', 1.99, 'img/manzana.png', 100, 'FRU-009', '2025-11-27 16:28:05'),
(50, 1, 'Pera', 2.10, 'img/pera.png', 100, 'FRU-010', '2025-11-27 16:28:05'),
(51, 2, 'Hamburgesa Ternera', 4.99, 'img/hamburgesaTernera.png', 100, 'CAR-001', '2025-11-27 16:29:00'),
(52, 2, 'Ternera', 9.50, 'img/ternera.png', 100, 'CAR-002', '2025-11-27 16:29:00'),
(53, 2, 'Cerdo', 7.40, 'img/cerdo.png', 100, 'CAR-003', '2025-11-27 16:29:00'),
(54, 2, 'Pechuga de pollo', 6.80, 'img/pechugaPollo.png', 100, 'CAR-004', '2025-11-27 16:29:00'),
(55, 2, 'Chuletas de Cordero', 11.20, 'img/chuletaCordero.png', 100, 'CAR-005', '2025-11-27 16:29:00'),
(56, 2, 'Albóndigas', 5.60, 'img/albondigas.png', 100, 'CAR-006', '2025-11-27 16:29:00'),
(57, 2, 'Carne Picada', 6.50, 'img/carne_picada.png', 100, 'CAR-007', '2025-11-27 16:29:00'),
(58, 2, 'Hamburgesa Pollo', 3.40, 'img/hamburgesaPollo.png', 100, 'CAR-008', '2025-11-27 16:29:00'),
(59, 2, 'Jamón Serrano', 15.00, 'img/jamonSerrano.png', 100, 'CAR-009', '2025-11-27 16:29:00'),
(60, 2, 'Pechugas de Pavo', 6.20, 'img/pechugaPavo.png', 100, 'CAR-010', '2025-11-27 16:29:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products_category` (`category_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
