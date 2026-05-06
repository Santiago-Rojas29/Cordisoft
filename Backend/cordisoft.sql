-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 06-05-2026 a las 21:22:25
-- Versión del servidor: 8.4.3
-- Versión de PHP: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cordisoft`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aprendiz`
--

CREATE TABLE `aprendiz` (
  `id_aprendiz` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `documento` bigint DEFAULT NULL,
  `id_ficha` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `aprendiz`
--

INSERT INTO `aprendiz` (`id_aprendiz`, `nombre`, `documento`, `id_ficha`) VALUES
(1, 'Edwin Andres Rojas Sanchez', 1083880832, 1),
(2, 'Santiago Anacona Rojas', 162373272, 1),
(3, 'Luciano Meneses Meneses', 139493920, 1),
(4, 'Victor Manuel', 132992302, 1),
(5, 'Katherine Molina Chilatra', 1182819303, 1),
(6, 'Adriana Fernanda Pachongo Lasso', 187329930, 1),
(7, 'Daniel Stiven Muñoz', 1839189303, 1),
(8, 'Jhan Breyner', 1198399049, 1),
(9, 'Kevin Santiago', 12981393433, 1),
(10, 'Johan Karl Cedeño Prada', 1232718938, 1),
(11, 'Jehison David', 1233994839, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areas`
--

CREATE TABLE `areas` (
  `id_area` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `estado` enum('Activa','Inactiva') DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `descripcion` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `areas`
--

INSERT INTO `areas` (`id_area`, `nombre`, `estado`, `id_usuario`, `descripcion`) VALUES
(1, 'ADSO', 'Activa', 6, 'Informatica'),
(3, 'tics', 'Activa', 28, 'wwewwe');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bodega`
--

CREATE TABLE `bodega` (
  `id_bodega` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `ubicacion` varchar(200) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `id_area` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `bodega`
--

INSERT INTO `bodega` (`id_bodega`, `nombre`, `ubicacion`, `estado`, `id_area`) VALUES
(1, 'TICS', 'No se', 'Activo', 1),
(3, 'PAE', 'Allá', 'Activo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallesolicitud`
--

CREATE TABLE `detallesolicitud` (
  `id_detalle` int NOT NULL,
  `id_solicitud` int DEFAULT NULL,
  `id_material` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `id_aprendiz` int DEFAULT NULL,
  `estado_item` enum('pendiente','entregado','devuelto','dañado') DEFAULT NULL,
  `cantidad_devuelta` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `detallesolicitud`
--

INSERT INTO `detallesolicitud` (`id_detalle`, `id_solicitud`, `id_material`, `cantidad`, `id_aprendiz`, `estado_item`, `cantidad_devuelta`) VALUES
(39, 36, 8, 1, 1, 'pendiente', 0),
(40, 36, 8, 1, 2, 'pendiente', 0),
(41, 36, 8, 1, 3, 'pendiente', 0),
(42, 36, 8, 1, 3, 'pendiente', 0),
(43, 36, 8, 1, 9, 'pendiente', 0),
(44, 36, 11, 1, 5, 'pendiente', 0),
(45, 37, 4, 1, 2, 'pendiente', 0),
(46, 37, 4, 1, 7, 'pendiente', 0),
(47, 37, 4, 1, 9, 'pendiente', 0),
(48, 38, 5, 1, 2, 'dañado', 0),
(49, 38, 5, 1, 4, 'dañado', 0),
(50, 39, 9, 1, 4, NULL, 0),
(51, 39, 9, 1, 7, NULL, 0),
(52, 39, 9, 1, 8, NULL, 0),
(53, 39, 5, 1, 7, NULL, 0),
(54, 39, 5, 1, 9, NULL, 0),
(55, 40, 4, 1, 5, NULL, 0),
(56, 41, 9, 1, 3, NULL, 0),
(57, 41, 9, 1, 7, NULL, 0),
(58, 42, 11, 1, 1, NULL, 0),
(59, 42, 10, 1, 2, NULL, 0),
(60, 43, 8, 1, 3, NULL, 0),
(61, 43, 4, 1, 1, NULL, 0),
(62, 44, 5, 1, 2, 'dañado', 0),
(63, 44, 9, 1, 3, 'dañado', 0),
(64, 44, 10, 1, 1, 'dañado', 0),
(65, 44, 8, 1, 6, 'dañado', 0),
(66, 44, 4, 1, 11, 'dañado', 0),
(67, 44, 11, 1, 10, 'dañado', 0),
(68, 45, 25, 1, 2, NULL, 0),
(69, 45, 25, 1, 4, NULL, 0),
(70, 45, 22, 1, 4, NULL, 0),
(71, 45, 22, 1, 8, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ficha`
--

CREATE TABLE `ficha` (
  `id_ficha` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `estado` enum('Activa','Inactiva') DEFAULT NULL,
  `id_area` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `codigo` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `ficha`
--

INSERT INTO `ficha` (`id_ficha`, `nombre`, `estado`, `id_area`, `id_usuario`, `codigo`) VALUES
(1, 'ADSO', 'Activa', 1, 4, 3063316),
(2, 'ADSI', 'Activa', 3, 28, 34345354);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `material`
--

CREATE TABLE `material` (
  `id_material` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `codigo` int DEFAULT NULL,
  `tipo` enum('consumible','no consumible') DEFAULT NULL,
  `estado` varchar(200) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `id_area` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `id_bodega` int DEFAULT NULL,
  `id_ficha` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `material`
--

INSERT INTO `material` (`id_material`, `nombre`, `codigo`, `tipo`, `estado`, `descripcion`, `id_area`, `cantidad`, `id_bodega`, `id_ficha`) VALUES
(4, 'Cafe', 2321, 'consumible', 'Activo', 'olaola', 1, 20, 1, 1),
(5, 'Pala', 223424, 'consumible', 'Activo', 'metalica', 1, 5, 1, 1),
(8, 'Teclado', 32323432, 'consumible', 'Activo', 'Negro', 1, 10, 1, 1),
(9, 'Cable', 673463, 'consumible', 'Activo', 'De cobre', 1, 3, 1, 1),
(10, 'Mouse', 54556, 'consumible', 'Activo', 'Para adso', 1, 1, 1, 1),
(11, 'Memoria USB', 45566543, 'consumible', 'Activo', '16GB', 1, 4, 1, 1),
(17, 'Audifonos', 543254, 'consumible', 'Activo', 'Audifonos negros', 3, 16, 3, 2),
(18, 'Abono', 2434556, 'consumible', '', 'Abono para el cafe', 3, 5, 3, 2),
(22, 'Lapices', 435665, 'consumible', 'Activo', 'Lapices con buen filo', 3, 29, 1, 1),
(25, 'Lapiceros', 5456453, 'consumible', 'Activo', 'Lapiceros color rojo', 3, 20, 1, 2),
(26, 'Pintura', 3467687, 'consumible', 'Activo', 'Pintura de color verde', 3, 1, 3, 2),
(27, 'Modem', 4555643, 'consumible', 'Activo', 'Pal wifi', 3, 2, 3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientoinventario`
--

CREATE TABLE `movimientoinventario` (
  `id_movimiento` int NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_solicitud` int DEFAULT NULL,
  `id_material` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `tipoMovimiento` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamo`
--

CREATE TABLE `prestamo` (
  `id_prestamo` int NOT NULL,
  `id_solicitud` int NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `estado_prestamo` enum('pendiente','activo','devuelto') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `prestamo`
--

INSERT INTO `prestamo` (`id_prestamo`, `id_solicitud`, `fecha_inicio`, `fecha_fin`, `estado_prestamo`) VALUES
(17, 31, '2026-04-13 00:00:00', '2026-04-12 23:00:24', 'devuelto'),
(18, 34, '2026-04-13 00:00:00', '2026-04-12 23:14:58', 'devuelto'),
(19, 37, '2026-04-13 00:00:00', NULL, 'pendiente'),
(20, 38, '2026-04-20 00:00:00', '2026-04-19 20:19:12', 'devuelto'),
(21, 39, '2026-04-20 00:00:00', NULL, 'activo'),
(22, 40, '2026-04-20 00:00:00', NULL, 'activo'),
(23, 41, '2026-04-20 00:00:00', NULL, 'activo'),
(24, 42, '2026-04-20 00:00:00', NULL, 'activo'),
(25, 44, '2026-04-20 00:00:00', '2026-04-19 21:12:10', 'devuelto'),
(26, 45, '2026-04-20 00:00:00', NULL, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre`) VALUES
(1, 'Instructor'),
(2, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `id_solicitud` int NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `tipo_solicitud` enum('solicitud','prestamo') NOT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `solicitud`
--

INSERT INTO `solicitud` (`id_solicitud`, `id_usuario`, `tipo_solicitud`, `fecha_creacion`, `fecha_entrega`, `estado`) VALUES
(31, 27, 'prestamo', '2026-04-13', NULL, 'Rechazada'),
(32, 27, 'solicitud', '2026-04-13', NULL, 'Rechazada'),
(33, 27, 'solicitud', '2026-04-13', NULL, 'Aprobada'),
(34, 27, 'prestamo', '2026-04-13', NULL, 'Aprobada'),
(35, 27, 'prestamo', '2026-04-13', NULL, 'Rechazada'),
(36, 27, 'prestamo', '2026-04-13', NULL, 'Aprobada'),
(37, 27, 'prestamo', '2026-04-13', NULL, 'Rechazada'),
(38, 27, 'prestamo', '2026-04-20', NULL, 'Aprobada'),
(39, 27, 'prestamo', '2026-04-20', NULL, 'Aprobada'),
(40, 29, 'prestamo', '2026-04-20', NULL, 'Aprobada'),
(41, 29, 'prestamo', '2026-04-20', NULL, 'Aprobada'),
(42, 29, 'prestamo', '2026-04-20', NULL, 'Aprobada'),
(43, 28, 'prestamo', '2026-04-20', NULL, 'Aprobada'),
(44, 28, 'prestamo', '2026-04-20', NULL, 'Aprobada'),
(45, 28, 'prestamo', '2026-04-20', NULL, 'Aprobada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL,
  `correo_electronico` varchar(100) DEFAULT NULL,
  `identificacion` bigint DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellidos` varchar(150) DEFAULT NULL,
  `estado` enum('Activo','Inactivo') DEFAULT NULL,
  `id_rol` int DEFAULT NULL,
  `contraseña` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `correo_electronico`, `identificacion`, `nombre`, `apellidos`, `estado`, `id_rol`, `contraseña`) VALUES
(4, '00sgor@gmail.com', 1083881583, 'Santiago', 'Anacona Rojas', 'Activo', 2, '$2b$08$ajvXe90mWh/M7W8.gBHZ9.2qkQr5oo11f7H/guATlhdUDWYsnHaFe'),
(6, 'rojas@gmail.com', 327327843, 'Andrezz', 'Rojas', 'Activo', 2, '$2b$08$HPWYfrwj3WpLn6EJQBW6du3bfCuhG4tQZQtpiDHSRVePg8QNh9sDi'),
(27, 'rojassanchezedwinandres@gmail.com', 1083881583, 'Edwin Andres', 'Rojas', 'Activo', 1, '$2b$08$S4t06z5a3l7HveScJNiX6ujVClcB.tojgWTLE6m5wnbNKpmcl23Jq'),
(28, 'victor@gmail.com', 3344334, 'Victor Manuel ', 'Cerquera Lozada', 'Activo', 1, '$2b$08$3Rw72oQftjozR90zM5USQuuOQUOx4bC34TViCWreW8bk7HBcalGpK'),
(29, 'adriana@gmail.com', 323436732, 'Adriana Fernanda', 'Pachongo Lasso', 'Activo', 1, '$2b$08$50LdTDjyNH4tEQg2ng29seu/qH4aLzeztl/.5PrLKkBIt/Jpur1EG');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aprendiz`
--
ALTER TABLE `aprendiz`
  ADD PRIMARY KEY (`id_aprendiz`),
  ADD KEY `pertenece` (`id_ficha`);

--
-- Indices de la tabla `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id_area`),
  ADD KEY `controla` (`id_usuario`);

--
-- Indices de la tabla `bodega`
--
ALTER TABLE `bodega`
  ADD PRIMARY KEY (`id_bodega`),
  ADD KEY `esta` (`id_area`);

--
-- Indices de la tabla `detallesolicitud`
--
ALTER TABLE `detallesolicitud`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `necesita` (`id_material`),
  ADD KEY `conlleva` (`id_solicitud`),
  ADD KEY `va` (`id_aprendiz`);

--
-- Indices de la tabla `ficha`
--
ALTER TABLE `ficha`
  ADD PRIMARY KEY (`id_ficha`),
  ADD KEY `lidera` (`id_usuario`),
  ADD KEY `contiene` (`id_area`);

--
-- Indices de la tabla `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`id_material`),
  ADD KEY `almacena` (`id_bodega`),
  ADD KEY `asignada` (`id_ficha`),
  ADD KEY `llega` (`id_area`);

--
-- Indices de la tabla `movimientoinventario`
--
ALTER TABLE `movimientoinventario`
  ADD PRIMARY KEY (`id_movimiento`),
  ADD KEY `lleva` (`id_material`),
  ADD KEY `genera` (`id_usuario`),
  ADD KEY `crea` (`id_solicitud`);

--
-- Indices de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD PRIMARY KEY (`id_prestamo`),
  ADD KEY `fk_prestamo_solicitud` (`id_solicitud`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`id_solicitud`),
  ADD KEY `hace` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `tiene` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aprendiz`
--
ALTER TABLE `aprendiz`
  MODIFY `id_aprendiz` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `areas`
--
ALTER TABLE `areas`
  MODIFY `id_area` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `bodega`
--
ALTER TABLE `bodega`
  MODIFY `id_bodega` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `detallesolicitud`
--
ALTER TABLE `detallesolicitud`
  MODIFY `id_detalle` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de la tabla `ficha`
--
ALTER TABLE `ficha`
  MODIFY `id_ficha` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `material`
--
ALTER TABLE `material`
  MODIFY `id_material` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `movimientoinventario`
--
ALTER TABLE `movimientoinventario`
  MODIFY `id_movimiento` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  MODIFY `id_prestamo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `id_solicitud` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `aprendiz`
--
ALTER TABLE `aprendiz`
  ADD CONSTRAINT `pertenece` FOREIGN KEY (`id_ficha`) REFERENCES `ficha` (`id_ficha`);

--
-- Filtros para la tabla `areas`
--
ALTER TABLE `areas`
  ADD CONSTRAINT `controla` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `bodega`
--
ALTER TABLE `bodega`
  ADD CONSTRAINT `esta` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id_area`);

--
-- Filtros para la tabla `detallesolicitud`
--
ALTER TABLE `detallesolicitud`
  ADD CONSTRAINT `conlleva` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitud` (`id_solicitud`),
  ADD CONSTRAINT `necesita` FOREIGN KEY (`id_material`) REFERENCES `material` (`id_material`),
  ADD CONSTRAINT `va` FOREIGN KEY (`id_aprendiz`) REFERENCES `aprendiz` (`id_aprendiz`);

--
-- Filtros para la tabla `ficha`
--
ALTER TABLE `ficha`
  ADD CONSTRAINT `contiene` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id_area`),
  ADD CONSTRAINT `lidera` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `material`
--
ALTER TABLE `material`
  ADD CONSTRAINT `almacena` FOREIGN KEY (`id_bodega`) REFERENCES `bodega` (`id_bodega`),
  ADD CONSTRAINT `asignada` FOREIGN KEY (`id_ficha`) REFERENCES `ficha` (`id_ficha`),
  ADD CONSTRAINT `asignado` FOREIGN KEY (`id_ficha`) REFERENCES `ficha` (`id_ficha`),
  ADD CONSTRAINT `estaEn` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id_area`),
  ADD CONSTRAINT `llega` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id_area`);

--
-- Filtros para la tabla `movimientoinventario`
--
ALTER TABLE `movimientoinventario`
  ADD CONSTRAINT `crea` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitud` (`id_solicitud`),
  ADD CONSTRAINT `genera` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `lleva` FOREIGN KEY (`id_material`) REFERENCES `material` (`id_material`);

--
-- Filtros para la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD CONSTRAINT `fk_prestamo_solicitud` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitud` (`id_solicitud`) ON DELETE CASCADE;

--
-- Filtros para la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD CONSTRAINT `hace` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `tiene` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
