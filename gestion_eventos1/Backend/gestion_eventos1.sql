-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2024 a las 19:14:34
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
-- Base de datos: `gestion_eventos1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistente`
--

CREATE TABLE `asistente` (
  `idAsistente` int(11) NOT NULL,
  `domicilio` varchar(50) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `idEvento` int(11) NOT NULL,
  `nombre` varchar(1000) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `imagen` varchar(10000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`idEvento`, `nombre`, `fecha`, `ubicacion`, `descripcion`, `imagen`) VALUES
(2, 'Taller de Programación', '2024-10-20', 'Centro de Innovación', 'Un taller para aprender programación web.', '	\n/uploads/1732637395246-fondo_casa8.png'),
(3, 'Feria de Emprendimientos', '2024-11-30', 'Parque Empresarial', 'Feria para emprendedores locales.', '	\n/uploads/1732637395246-fondo_casa8.png'),
(36, 'Concierto de Rock', '2024-11-20', 'Auditorio Nacional', 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (anónimo) usó una galera de tipos y los mezcló de tal manera que logró fabricar un libro de muestras tipográficas. No sólo sobrevivió cinco siglos, sino que también ingresó a la composición tipográfica electrónica, permaneciendo esencialmente inalterado. Se popularizó en la década de 1960 con la publicación de las hojas Letraset que contenían pasajes de Lorem Ipsum y, más recientemente, con el uso de software de autoedición como Aldus PageMaker, que incluía versiones de Lorem Ipsum. ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (anónim', '	\n/uploads/1732637395246-fondo_casa8.png'),
(37, 'Feria de Comida Internacional', '2024-11-29', 'Parque Central Tilisarao', 'Disfruta de comida internacional y platos típicos. ', NULL),
(39, 'Exposición de Arte Contemporáneo tt', '2024-12-05', 'Museo de Arte Moderno', 'Una exhibición con obras de artistas contemporáneos.', 'data:image/png;base64,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'),
(57, 'Lorem Ipsum y, más recientemente, con el uso de software de autoedición como Aldus PageMaker, que incluía versiones de Lorem Ipsum.', '2024-12-20', 'Lorem Ipsum y, más recientemente, con el uso de software de autoedición como Aldus PageMaker, que incluía versiones de Lorem Ipsum.', 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (anónimo) usó una galera de tipos y los mezcló de tal manera que logró fabricar un libro de muestras tipográficas. No sólo sobrevivió cinco siglos, sino que también ingresó a la composición tipográfica electrónica, permaneciendo esencialmente inalterado. Se popularizó en la década de 1960 con la publicación de las hojas Letraset que contenían pasajes de Lorem Ipsum y, más recientemente, con el uso de software de autoedición como Aldus PageMaker, que incluía versiones de Lorem Ipsum.', '/uploads/1732659881918-FB_IMG_1672516693734.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participacion`
--

CREATE TABLE `participacion` (
  `idParticipacion` int(11) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `idEvento` int(11) DEFAULT NULL,
  `confirmacion` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `participacion`
--

INSERT INTO `participacion` (`idParticipacion`, `idUsuario`, `idEvento`, `confirmacion`) VALUES
(2, 4, 2, 1),
(3, 5, 3, 1),
(4, 1, 2, 1),
(5, 17, 2, 1),
(8, 19, 2, 1),
(10, 21, 3, 0),
(11, 22, 3, 1),
(13, 4, 36, 1),
(28, 23, 39, 1),
(29, 20, 39, 1),
(39, 20, 57, 1),
(41, 23, 57, 0),
(42, 23, 3, 1),
(43, 32, 57, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idRol` int(11) NOT NULL,
  `rolNombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRol`, `rolNombre`) VALUES
(1, 'Organizador'),
(2, 'Asistente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `idRol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `email`, `password`, `idRol`) VALUES
(1, 'Pablo Javier', 'pablo@gmail.com', '$2b$10$nMCCFcU0xmEGw61DcSDao.PeNHJy6.X43NBn3KYYzx02l2N4x1Jqe', 1),
(2, 'Alejandro Fantino', 'ale@gmail.com', '$2b$10$k6paDRtauIQLI/dxEOcereoOrJO96ZIrbqcPB0b4hPp6wNARhNnLe', 1),
(3, 'Micaela Lucero', 'mica@gmail.com', '$2b$10$MmV7Jd.6dWblN8lOWvskYuGURKgCPRJhxb.W1Nx1MhyVjx5.KtN6W', 2),
(4, 'Pipino Cuevas', 'pipino@gmail.com', '$2b$10$nMCCFcU0xmEGw61DcSDao.PeNHJy6.X43NBn3KYYzx02l2N4x1Jqe', 2),
(5, 'Leo Messi', 'leo@gmail.com', '$2b$10$nMCCFcU0xmEGw61DcSDao.PeNHJy6.X43NBn3KYYzx02l2N4x1Jqe', 2),
(17, 'Eduardo Maldonado', 'edu@gmail.com', '$2b$10$k6paDRtauIQLI/dxEOcereoOrJO96ZIrbqcPB0b4hPp6wNARhNnLe', 1),
(18, 'Juan Riquelme', 'juan@gmail.com', '$2b$10$J17mhAR/PVd1/e6B4O.1h.WsIehuB7zGwLH7WvbYsNmU6QBZsJtaS', 2),
(19, 'Beatriz Orellano', 'ore@gmail.com', '$2b$10$NVb0cz4zFrvYBsn84kMeS.v/LBByowaFBmUZ0oswCO/TLQFIpwvxe', 2),
(20, 'Santiago Baigorria', 'san@gmail.com', '$2b$10$tDLM6JItY6kcvBKRbmoQiONJM.3vXTbv1zBGtoBfdqmEZfTV6n7v.', 2),
(21, 'sdfrwerwe', 'sdf@gmail.com', '$2b$10$b3DhLDOxdSQHQ5y8DY7pDOV3d//X.pKm.fzVMtaOzGIclalwQvw6C', 1),
(22, 'Pedro Sancho', 'pe@gmail.com', '$2b$10$MmV7Jd.6dWblN8lOWvskYuGURKgCPRJhxb.W1Nx1MhyVjx5.KtN6W', 1),
(23, 'Javier Hernandez', 'maldonado19994@gmail.com', '$2b$10$NCmLymxTp7k24QeezozMP.KoKWf7EiSB4V.aj1YFY3FyeC3TqUo4S', 1),
(32, 'Cristofano Dupla', 'cris@yahoo.com', '$2b$10$e7X0lMtf7BZYDF4TgTi.5ukz0J7CfzxnBypsxsgNBVMBLnLLgrdA.', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asistente`
--
ALTER TABLE `asistente`
  ADD PRIMARY KEY (`idAsistente`);

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`idEvento`);

--
-- Indices de la tabla `participacion`
--
ALTER TABLE `participacion`
  ADD PRIMARY KEY (`idParticipacion`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idEvento` (`idEvento`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idRol` (`idRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
  MODIFY `idEvento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `participacion`
--
ALTER TABLE `participacion`
  MODIFY `idParticipacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asistente`
--
ALTER TABLE `asistente`
  ADD CONSTRAINT `asistente_ibfk_1` FOREIGN KEY (`idAsistente`) REFERENCES `usuarios` (`idUsuario`);

--
-- Filtros para la tabla `participacion`
--
ALTER TABLE `participacion`
  ADD CONSTRAINT `participacion_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`),
  ADD CONSTRAINT `participacion_ibfk_2` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`idEvento`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
