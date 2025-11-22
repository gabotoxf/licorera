-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-11-2025 a las 22:15:07
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
-- Base de datos: `boutique_licores`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `categoria_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen_url` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`categoria_id`, `nombre`, `descripcion`, `imagen_url`) VALUES
(1, 'M', 'Other atresia and stenosis of urethra and bladder neck', 'https://robohash.org/laborerecusandaeest.png?size=50x50&set=set1'),
(2, 'S', 'Passenger in pk-up/van injured in clsn w 2/3-whl mv in traf', 'https://robohash.org/estquiaaut.png?size=50x50&set=set1'),
(3, 'XS', 'Synovial hypertrophy, not elsewhere classified, shoulder', 'https://robohash.org/magniquiquia.png?size=50x50&set=set1'),
(4, 'L', 'Other disorders of branched-chain amino-acid metabolism', 'https://robohash.org/suntporrovel.png?size=50x50&set=set1'),
(5, 'A', 'Displ seg fx shaft of rad, r arm, 7thM', 'https://robohash.org/exautprovident.png?size=50x50&set=set1'),
(6, 'N', 'Flat foot [pes planus] (acquired), right foot', 'https://robohash.org/beataequoscupiditate.png?size=50x50&set=set1'),
(7, 'Y', 'Corrosion of first degree of right hand, unsp site, subs', 'https://robohash.org/voluptatemauttempora.png?size=50x50&set=set1'),
(8, 'R', 'Oth physl fx lower end rad, left arm, subs for fx w malunion', 'https://robohash.org/laboreestvoluptatem.png?size=50x50&set=set1'),
(9, 'W', 'Other specified cestode infections', 'https://robohash.org/odiovoluptatemnon.png?size=50x50&set=set1'),
(10, '3XL', 'Puncture wound without foreign body of unsp ear, sequela', 'https://robohash.org/idsapientevoluptas.png?size=50x50&set=set1'),
(11, '34XL', 'Palindromic rheumatism, unspecified hand', 'https://robohash.org/ullamuttotam.png?size=50x50&set=set1'),
(12, 'M4', 'Decreased fetal movements, unspecified trimester, fetus 5', 'https://robohash.org/quivoluptasnisi.png?size=50x50&set=set1'),
(13, 'S3', 'Unspecified subluxation of unspecified hip, subs encntr', 'https://robohash.org/ipsumsedut.png?size=50x50&set=set1'),
(14, 'XL4', 'Nondisp fx of neck of MC bone, subs for fx w malunion', 'https://robohash.org/consequaturdoloret.png?size=50x50&set=set1'),
(15, 'X2S', 'Burn of unsp deg mult sites of unsp wrist and hand, sequela', 'https://robohash.org/odioutamet.png?size=50x50&set=set1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `pedido_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `fecha_pedido` datetime DEFAULT current_timestamp(),
  `estado` enum('pendiente','confirmado','preparando','enviado','entregado') DEFAULT 'pendiente',
  `total` decimal(10,2) NOT NULL,
  `direccion_envio` text DEFAULT NULL,
  `metodo_pago` varchar(50) DEFAULT NULL,
  `notas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`pedido_id`, `usuario_id`, `fecha_pedido`, `estado`, `total`, `direccion_envio`, `metodo_pago`, `notas`) VALUES
(1, 1, '0000-00-00 00:00:00', 'pendiente', 0.00, '5 Village Green Lane', 'diners-club-enroute', 'Milt op w thermal radn effect of nuclr weapon, milt, sequela'),
(2, 2, '0000-00-00 00:00:00', '', 0.00, '3707 Hagan Point', 'jcb', 'Nondisp oblique fx shaft of l fibula, 7thH'),
(3, 3, '0000-00-00 00:00:00', '', 0.00, '5344 Mayfield Avenue', 'china-unionpay', '4-part fracture of surgical neck of unsp humerus, sequela'),
(4, 4, '0000-00-00 00:00:00', '', 0.00, '3 Basil Alley', 'jcb', 'Other shellfish poisoning, assault, initial encounter'),
(5, 5, '0000-00-00 00:00:00', 'pendiente', 0.00, '626 Parkside Place', 'jcb', 'Rupture of synovium, unspecified ankle');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos_items`
--

CREATE TABLE `pedidos_items` (
  `item_id` int(11) NOT NULL,
  `pedido_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) GENERATED ALWAYS AS (`cantidad` * `precio`) STORED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `producto_id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `marca` varchar(100) DEFAULT NULL,
  `tipo_licor` varchar(50) DEFAULT NULL,
  `pais_origen` varchar(100) DEFAULT NULL,
  `grado_alcoholico` decimal(4,2) DEFAULT NULL,
  `stock` int(11) DEFAULT 0,
  `imagen_url` varchar(500) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`producto_id`, `nombre`, `descripcion`, `precio`, `categoria_id`, `marca`, `tipo_licor`, `pais_origen`, `grado_alcoholico`, `stock`, `imagen_url`, `activo`, `fecha_creacion`) VALUES
(1, '2XL', 'Unspecified injury of bronchus, unilateral', 24.99, 1, 'Lenovo', 'Sydney', 'Australia', 65.00, 1, 'https://robohash.org/quisdoloremmagni.png?size=50x50&set=set1', 0, '2025-11-21 15:03:51'),
(2, 'XL', 'Disp fx of coronoid process of unsp ulna, init for clos fx', 299.99, 2, 'Micromax', 'Mapalacsiao', 'Philippines', 85.00, 2, 'https://robohash.org/nonetsit.png?size=50x50&set=set1', 1, '2025-11-21 15:03:51'),
(3, 'S', 'External constriction, right hip, initial encounter', 19.99, 3, 'Panasonic', 'Götene', 'Sweden', 99.00, 3, 'https://robohash.org/providentmagnamex.png?size=50x50&set=set1', 1, '2025-11-21 15:03:51'),
(4, 'M', 'Loc skin eruption due to drugs and meds taken internally', 59.99, 4, 'Realme', 'Đình Lập', 'Vietnam', 18.00, 4, 'https://robohash.org/quiarerumlaboriosam.png?size=50x50&set=set1', 1, '2025-11-21 15:03:51'),
(5, '2XL', 'Oth injury of femoral artery, right leg, init encntr', 4.49, 5, 'Gigabyte', 'Stryszawa', 'Poland', 94.00, 5, 'https://robohash.org/nemoilloqui.png?size=50x50&set=set1', 0, '2025-11-21 15:03:51'),
(6, '2XL', 'Unsp fx left patella, subs for opn fx type I/2 w nonunion', 15.99, 6, 'Sagem', 'Annecy', 'France', 66.00, 6, 'https://robohash.org/autemconsequaturdistinctio.png?size=50x50&set=set1', 0, '2025-11-21 15:03:52'),
(7, '2XL', 'Displ seg fx shaft of ulna, l arm, 7thQ', 6.99, 7, 'Motorola', 'Armação', 'Brazil', 57.00, 7, 'https://robohash.org/erroresseminima.png?size=50x50&set=set1', 1, '2025-11-21 15:03:52'),
(8, 'S', 'Other derangements of patella, unspecified knee', 3.99, 8, 'Micromax', 'Kiihtelysvaara', 'Finland', 50.00, 8, 'https://robohash.org/quitemporesed.png?size=50x50&set=set1', 1, '2025-11-21 15:03:52'),
(9, 'S', 'Displacement of internal prosth dev/grft, subs', 3.99, 9, 'Nokia', 'Arevashogh', 'Armenia', 67.00, 9, 'https://robohash.org/evenietofficiaqui.png?size=50x50&set=set1', 0, '2025-11-21 15:03:52'),
(10, 'XS', 'Nondisp fx of 5th metatarsal bone, r ft, 7thK', 6.49, 10, 'Samsung', 'Alexandria', 'Egypt', 49.00, 10, 'https://robohash.org/quasdoloresnecessitatibus.png?size=50x50&set=set1', 0, '2025-11-21 15:03:52'),
(11, '2XL', 'Recurrent and perst hematur w diffuse membranous glomrlneph', 2.69, 11, 'Samsung', 'Kemil', 'Indonesia', 70.00, 11, 'https://robohash.org/corporisquasnon.png?size=50x50&set=set1', 1, '2025-11-21 15:03:52'),
(12, 'L', 'Malig neoplasm of prph nerves of upper limb, inc shoulder', 34.99, 12, 'Nokia', 'Cabanas', 'Portugal', 34.00, 12, 'https://robohash.org/voluptatematfuga.png?size=50x50&set=set1', 1, '2025-11-21 15:03:52'),
(13, 'S', 'Oth acc to oth private fix-wing arcrft inj occupant, sequela', 79.99, 13, 'LG', 'Sulahan', 'Indonesia', 20.00, 13, 'https://robohash.org/laudantiumsedest.png?size=50x50&set=set1', 0, '2025-11-21 15:03:52'),
(14, 'L', 'Struck by sea lion, subsequent encounter', 39.99, 14, 'Huawei', 'Tekstil’shchiki', 'Russia', 87.00, 14, 'https://robohash.org/autemquosquia.png?size=50x50&set=set1', 1, '2025-11-21 15:03:52'),
(15, '2XL', 'Nondisp seg fx shaft of ulna, l arm, 7thP', 24.99, 15, 'Panasonic', 'Panjing', 'China', 90.00, 15, 'https://robohash.org/beataenecessitatibusminima.png?size=50x50&set=set1', 0, '2025-11-21 15:03:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `tipo_usuario` enum('cliente','admin','empleado') DEFAULT 'cliente',
  `fecha_registro` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `email`, `password_hash`, `nombre`, `apellido`, `fecha_nacimiento`, `telefono`, `direccion`, `tipo_usuario`, `fecha_registro`) VALUES
(1, 'jdonavan0@house.gov', '$2a$04$Lxs.ai8RpQnv9EbzbU6kUOsB4n4tU.wsN99CHsHdO4ipJ/5fCjj.a', 'Justen', 'Donavan', '0000-00-00', '607-526-9071', '0 Chive Terrace', 'cliente', '2025-11-21 14:49:26'),
(2, 'ttregidga1@microsoft.com', '$2a$04$mBbjLbG97LYdFLsosogntO3y2HwffOA4bjt7sEbhz1fhoWRedkIYi', 'Thomasine', 'Tregidga', '0000-00-00', '300-842-0692', '5 Meadow Valley Crossing', 'cliente', '2025-11-21 14:49:26'),
(3, 'dbresnahan2@dedecms.com', '$2a$04$kN7pVkaZXEPROV.itGLJg.8Kt0HewYyFvLMEsgMYPrv4ATJZN1aeO', 'Dale', 'Bresnahan', '0000-00-00', '470-473-1464', '4 Caliangt Pass', 'cliente', '2025-11-21 14:49:26'),
(4, 'lrosberg3@youku.com', '$2a$04$QEW4JBNFr0IKKck8CftG3OnkXmlSlefk/lrNEpAjq4SfDsfAqaGlO', 'Lamont', 'Rosberg', '0000-00-00', '806-545-9140', '43 Chive Parkway', 'cliente', '2025-11-21 14:49:26'),
(5, 'abennoe4@free.fr', '$2a$04$OlKUuNoiK7Ua2H2J4ZpUD.906AQWzMvBR0sMF2Ijzhliwig729ICC', 'Audi', 'Bennoe', '0000-00-00', '667-910-7758', '380 Red Cloud Road', 'admin', '2025-11-21 14:49:26'),
(16, 'gabriel@ejemplo.com', '$2a$12$sQLiQUq7nHmzi8982hmifuAfoqCEXo/WRr.6lB4hThiU4uICixkvS', 'Gabriel', 'Ulloa', '2000-02-02', '123456789', 'Av. Principal 456', 'cliente', '2025-11-21 15:46:58');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`categoria_id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`pedido_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `pedidos_items`
--
ALTER TABLE `pedidos_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `pedido_id` (`pedido_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`producto_id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `categoria_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `pedido_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pedidos_items`
--
ALTER TABLE `pedidos_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `producto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `pedidos_items`
--
ALTER TABLE `pedidos_items`
  ADD CONSTRAINT `pedidos_items_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`pedido_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pedidos_items_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`categoria_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
