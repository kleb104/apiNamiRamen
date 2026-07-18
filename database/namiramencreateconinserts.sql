CREATE DATABASE  IF NOT EXISTS `nami_restaurant_db_api` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `nami_restaurant_db_api`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nami_restaurant_db_api
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_categoria` (`nombre_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (5,'Bebidas'),(7,'Combos'),(3,'Entradas'),(4,'Platos Principales'),(6,'Postres'),(1,'Ramen'),(2,'Sushi & Rolls');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `combo_productos`
--

DROP TABLE IF EXISTS `combo_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combo_productos` (
  `id_combo` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `es_principal` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id_combo`,`id_producto`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `combo_productos_ibfk_1` FOREIGN KEY (`id_combo`) REFERENCES `combos` (`id`),
  CONSTRAINT `combo_productos_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `combo_productos`
--

LOCK TABLES `combo_productos` WRITE;
/*!40000 ALTER TABLE `combo_productos` DISABLE KEYS */;
INSERT INTO `combo_productos` VALUES (1,1,1,1),(1,13,1,0),(2,5,1,0),(2,14,1,1),(3,1,1,0),(3,5,1,1),(4,5,1,0),(4,13,1,1),(4,14,1,0),(5,18,1,0),(5,20,1,1),(5,21,1,0);
/*!40000 ALTER TABLE `combo_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `combos`
--

DROP TABLE IF EXISTS `combos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_combo` varchar(100) NOT NULL,
  `precio_especial` decimal(10,2) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_combo` (`nombre_combo`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `combos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `combos`
--

LOCK TABLES `combos` WRITE;
/*!40000 ALTER TABLE `combos` DISABLE KEYS */;
INSERT INTO `combos` VALUES (1,'Combo Clásico Nami',10500.00,7,1),(2,'Combo Mar y Tierra',11500.00,7,1),(3,'Combo Sushi + Ramen',10200.00,7,1),(4,'Combo Premium Wagyu',12000.00,7,1),(5,'Combo Dulce Matinal',5800.00,7,1);
/*!40000 ALTER TABLE `combos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direcciones_entrega`
--

DROP TABLE IF EXISTS `direcciones_entrega`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direcciones_entrega` (
  `id_pedido` int(11) NOT NULL,
  `direccion_exacta` text NOT NULL,
  `detalles_adicionales` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  CONSTRAINT `direcciones_entrega_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direcciones_entrega`
--

LOCK TABLES `direcciones_entrega` WRITE;
/*!40000 ALTER TABLE `direcciones_entrega` DISABLE KEYS */;
/*!40000 ALTER TABLE `direcciones_entrega` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estaciones`
--

DROP TABLE IF EXISTS `estaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_estacion` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_estacion` (`nombre_estacion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estaciones`
--

LOCK TABLES `estaciones` WRITE;
/*!40000 ALTER TABLE `estaciones` DISABLE KEYS */;
INSERT INTO `estaciones` VALUES (1,'Barra Sushi'),(2,'Cocina Caliente'),(4,'Control de Calidad'),(5,'Estación de Bebidas'),(3,'Estación de Emplatado');
/*!40000 ALTER TABLE `estaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredientes`
--

DROP TABLE IF EXISTS `ingredientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_ingrediente` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_ingrediente` (`nombre_ingrediente`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredientes`
--

LOCK TABLES `ingredientes` WRITE;
/*!40000 ALTER TABLE `ingredientes` DISABLE KEYS */;
INSERT INTO `ingredientes` VALUES (47,'Aceite de chili'),(34,'Aceite de sésamo'),(26,'Aguacate'),(42,'Ajonjolí tostado'),(16,'Arroz para sushi'),(8,'Atún rojo'),(22,'Bambú menma'),(3,'Caldo dashi'),(1,'Caldo de cerdo tonkotsu'),(2,'Caldo de pollo'),(4,'Caldo miso'),(9,'Camarón'),(13,'Cangrejo kani'),(20,'Cebollín'),(25,'Champiñón enoki'),(24,'Champiñón shiitake'),(5,'Chashu de cerdo'),(23,'Espinaca blanqueada'),(14,'Fideos ramen'),(15,'Fideos soba'),(17,'Fideos udon'),(18,'Huevo marinado ajitsuke'),(40,'Jengibre encurtido'),(43,'Katsuobushi (hojuelas de bonito)'),(48,'Kimchi'),(29,'Lechuga iceberg'),(21,'Maíz dulce'),(35,'Mayonesa japonesa'),(19,'Nori (alga marina)'),(45,'Pan panko'),(46,'Pasta de wasabi'),(49,'Pasta gochujang'),(33,'Pasta miso'),(27,'Pepino japonés'),(6,'Pollo teriyaki'),(10,'Pulpo'),(41,'Queso crema'),(30,'Rábano daikon'),(11,'Res wagyu'),(7,'Salmón fresco'),(31,'Salsa de soya'),(38,'Salsa okonomiyaki'),(32,'Salsa ponzu'),(36,'Salsa sriracha'),(37,'Salsa teriyaki'),(44,'Tempura (fritura crujiente)'),(12,'Tofu firme'),(39,'Vinagre de arroz'),(28,'Zanahoria juliana');
/*!40000 ALTER TABLE `ingredientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_menu` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `id_combo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_menu` (`id_menu`),
  KEY `id_producto` (`id_producto`),
  KEY `id_combo` (`id_combo`),
  CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`id_menu`) REFERENCES `menus` (`id`),
  CONSTRAINT `menu_items_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  CONSTRAINT `menu_items_ibfk_3` FOREIGN KEY (`id_combo`) REFERENCES `combos` (`id`),
  CONSTRAINT `chk_item_type` CHECK (`id_producto` is not null or `id_combo` is not null)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (1,1,18,NULL),(2,1,20,NULL),(3,1,19,NULL),(4,1,21,NULL),(8,1,NULL,5),(9,2,15,NULL),(10,2,11,NULL),(11,2,8,NULL),(12,2,12,NULL),(13,2,18,NULL),(14,2,14,NULL),(15,2,13,NULL),(16,2,16,NULL),(17,2,9,NULL),(24,2,NULL,1),(25,3,6,NULL),(26,3,18,NULL),(27,3,5,NULL),(28,3,1,NULL),(29,3,19,NULL),(30,3,4,NULL),(31,3,3,NULL),(32,3,7,NULL),(33,3,2,NULL),(40,3,NULL,2),(41,3,NULL,4),(42,3,NULL,3),(43,4,8,NULL),(44,4,10,NULL),(45,4,16,NULL),(46,4,17,NULL);
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_menu` varchar(100) NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `hora_apertura` time NOT NULL,
  `hora_cierre` time NOT NULL,
  `activo` tinyint(1) DEFAULT 0,
  `creado_por` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creado_por` (`creado_por`),
  CONSTRAINT `menus_ibfk_1` FOREIGN KEY (`creado_por`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` VALUES (1,'Menú Matinal','2026-07-01','2026-12-31','07:00:00','11:30:00',0,1),(2,'Menú de Tarde','2026-07-01','2026-12-31','12:00:00','17:00:00',1,1),(3,'Menú Nocturno','2026-07-01','2026-12-31','18:00:00','22:00:00',0,1),(4,'Menú Ejecutivo','2026-01-01','2026-12-31','11:00:00','15:00:00',0,1);
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pedido` int(11) NOT NULL,
  `metodo_pago` enum('Tarjeta de crédito','Tarjeta de débito','Efectivo') NOT NULL,
  `monto_pagado` decimal(10,2) NOT NULL,
  `vuelto` decimal(10,2) DEFAULT 0.00,
  `fecha_pago` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_pedido` (`id_pedido`),
  CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_detalles`
--

DROP TABLE IF EXISTS `pedido_detalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_detalles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `id_combo` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `observaciones` text DEFAULT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pedido` (`id_pedido`),
  KEY `id_producto` (`id_producto`),
  KEY `id_combo` (`id_combo`),
  CONSTRAINT `pedido_detalles_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id`),
  CONSTRAINT `pedido_detalles_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  CONSTRAINT `pedido_detalles_ibfk_3` FOREIGN KEY (`id_combo`) REFERENCES `combos` (`id`),
  CONSTRAINT `chk_detalle_type` CHECK (`id_producto` is not null or `id_combo` is not null)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_detalles`
--

LOCK TABLES `pedido_detalles` WRITE;
/*!40000 ALTER TABLE `pedido_detalles` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido_detalles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `id_empleado` int(11) DEFAULT NULL,
  `fecha_hora` timestamp NOT NULL DEFAULT current_timestamp(),
  `metodo_entrega` enum('Entrega a domicilio','Recogida en tienda') NOT NULL,
  `estado_pedido` enum('Pendiente de pago','Aceptada','Preparación','Procesando','Entregada') DEFAULT 'Pendiente de pago',
  `subtotal` decimal(10,2) NOT NULL DEFAULT 0.00,
  `impuesto` decimal(10,2) NOT NULL DEFAULT 0.00,
  `costo_envio` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_empleado` (`id_empleado`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`id_empleado`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `procesos_preparacion`
--

DROP TABLE IF EXISTS `procesos_preparacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `procesos_preparacion` (
  `id_producto` int(11) NOT NULL,
  `id_estacion` int(11) NOT NULL,
  `orden_paso` int(11) NOT NULL,
  PRIMARY KEY (`id_producto`,`id_estacion`),
  KEY `id_estacion` (`id_estacion`),
  CONSTRAINT `procesos_preparacion_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  CONSTRAINT `procesos_preparacion_ibfk_2` FOREIGN KEY (`id_estacion`) REFERENCES `estaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procesos_preparacion`
--

LOCK TABLES `procesos_preparacion` WRITE;
/*!40000 ALTER TABLE `procesos_preparacion` DISABLE KEYS */;
INSERT INTO `procesos_preparacion` VALUES (1,2,1),(1,3,3),(1,4,2),(2,2,1),(2,3,3),(2,4,2),(3,2,1),(3,3,2),(4,2,1),(4,3,2),(5,1,1),(5,3,2),(6,1,1),(6,3,2),(7,1,1),(7,3,2),(8,2,1),(8,3,2),(9,2,1),(9,3,2),(10,2,1),(10,3,2),(11,2,1),(11,3,2),(12,2,1),(12,3,2),(13,2,1),(13,3,2),(14,2,1),(14,3,2),(15,2,1),(15,3,2),(16,2,1),(16,3,2),(17,2,1),(17,3,2),(18,3,1),(19,3,1),(20,1,1),(20,3,2),(21,2,1),(21,3,2);
/*!40000 ALTER TABLE `procesos_preparacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_ingredientes`
--

DROP TABLE IF EXISTS `producto_ingredientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_ingredientes` (
  `id_producto` int(11) NOT NULL,
  `id_ingrediente` int(11) NOT NULL,
  PRIMARY KEY (`id_producto`,`id_ingrediente`),
  KEY `id_ingrediente` (`id_ingrediente`),
  CONSTRAINT `producto_ingredientes_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  CONSTRAINT `producto_ingredientes_ibfk_2` FOREIGN KEY (`id_ingrediente`) REFERENCES `ingredientes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_ingredientes`
--

LOCK TABLES `producto_ingredientes` WRITE;
/*!40000 ALTER TABLE `producto_ingredientes` DISABLE KEYS */;
INSERT INTO `producto_ingredientes` VALUES (1,4),(1,12),(1,14),(1,18),(1,19),(1,20),(1,21),(1,23),(1,24),(1,33),(1,34),(2,1),(2,5),(2,14),(2,18),(2,19),(2,20),(2,22),(2,31),(2,34),(3,1),(3,11),(3,14),(3,20),(3,33),(3,34),(3,42),(3,47),(4,2),(4,6),(4,14),(4,18),(4,19),(4,20),(4,22),(4,31),(5,7),(5,16),(5,31),(5,39),(5,40),(5,46),(6,9),(6,16),(6,19),(6,26),(6,27),(6,35),(6,36),(6,44),(7,8),(7,16),(7,19),(7,35),(7,36),(7,42),(7,46),(8,5),(8,20),(8,32),(8,34),(8,40),(9,10),(9,20),(9,35),(9,38),(9,43),(10,6),(10,31),(10,35),(10,40),(10,45),(11,34),(11,42),(12,20),(12,31),(12,39),(12,48),(13,6),(13,16),(13,20),(13,31),(13,34),(13,39),(13,40),(13,42),(14,11),(14,16),(14,20),(14,31),(14,34),(14,40),(14,42),(15,16),(15,18),(15,23),(15,24),(15,28),(15,34),(15,42),(15,49),(16,6),(16,16),(16,20),(16,29),(16,37),(16,42),(17,6),(17,17),(17,20),(17,25),(17,28),(17,31),(17,34),(18,34),(20,16),(20,39);
/*!40000 ALTER TABLE `producto_ingredientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `id_categoria` int(11) NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Ramen Miso','Caldo de pasta miso con profundidad umami, fideos ramen frescos, tofu firme salteado, huevo marinado ajitsuke, champiñones shiitake, maíz dulce, espinaca blanqueada y nori. Terminado con aceite de sésamo.',6200.00,'https://images.pexels.com/photos/23658622/pexels-photo-23658622.jpeg',1,1),(2,'Tonkotsu Nami','Caldo de cerdo cocido durante 18 horas hasta lograr una textura cremosa y profunda. Incluye chashu de cerdo, huevo marinado, nori, cebollín, bambú y un toque de aceite de sésamo.',6500.00,'https://images.pexels.com/photos/34313367/pexels-photo-34313367.jpeg',1,1),(3,'Spicy Tantanmen','Ramen picante de inspiración Sichuan con caldo de cerdo y sésamo, carne molida de res, pasta de chili y aceite de chili. Intenso, adictivo y con un calor que va creciendo.',6800.00,'https://images.pexels.com/photos/19867361/pexels-photo-19867361.jpeg',1,1),(4,'Shoyu Ramen','Caldo de pollo y soya de sabor delicado y equilibrado. Con chashu de pollo, huevo marinado, nori y menma. Ideal para quienes se acercan al ramen por primera vez.',5500.00,'https://images.pexels.com/photos/37106178/pexels-photo-37106178.jpeg',1,1),(5,'Nigiri de Salmón (x6)','Seis piezas de nigiri con arroz para sushi sazonado con vinagre de arroz y láminas de salmón fresco de primera calidad. Acompañadas de jengibre encurtido, wasabi y salsa de soya.',5500.00,'https://images.pexels.com/photos/28992204/pexels-photo-28992204.jpeg',2,1),(6,'Dragon Roll','Roll de camarón tempura y pepino cubierto con láminas de aguacate, mayonesa japonesa y sriracha. Ocho piezas con presentación de escamas de dragón.',6200.00,'https://images.pexels.com/photos/6563256/pexels-photo-6563256.jpeg',2,1),(7,'Spicy Tuna Roll','Atún rojo fresco con pasta de wasabi, mayonesa japonesa y sriracha. Cubierto con ajonjolí tostado. Ocho piezas.',6500.00,'https://images.pexels.com/photos/15264029/pexels-photo-15264029.jpeg',2,1),(8,'Gyoza (x6)','Seis dumplings de cerdo y jengibre sellados a la plancha con base crujiente y vapor interior. Servidos con salsa ponzu.',3200.00,'https://images.pexels.com/photos/7719909/pexels-photo-7719909.jpeg',3,1),(9,'Takoyaki (x6)','Seis bolitas de pulpo estilo Osaka cubiertas con salsa okonomiyaki, mayonesa japonesa y katsuobushi.',3600.00,'https://images.pexels.com/photos/31302952/pexels-photo-31302952.jpeg',3,1),(10,'Karaage de Pollo','Trozos de pollo marinados en soya y jengibre, fritos con panko hasta lograr una costra dorada y crujiente. Con mayonesa japonesa.',3800.00,'https://images.pexels.com/photos/1860202/pexels-photo-1860202.jpeg',3,1),(11,'Edamame al Vapor','Vainas de soya al vapor con sal marina y aceite de sésamo. Entrada ligera, nutritiva y perfecta para compartir.',2200.00,'https://images.pexels.com/photos/29935499/pexels-photo-29935499.jpeg',3,1),(12,'Kimchi Pancake','Tortilla coreana crujiente de kimchi y cebollín. Servida con salsa de soya y vinagre de arroz. Sabor intenso y textura irresistible.',3400.00,'https://images.pexels.com/photos/5774156/pexels-photo-5774156.jpeg',3,1),(13,'Pollo a la Naranja','Trozos de pechuga rebozados y fritos, bañados en salsa agridulce de naranja con jengibre, ajo y soya. Servido sobre arroz al vapor con ajonjolí tostado y cebollín.',5800.00,'https://images.pexels.com/photos/19725443/pexels-photo-19725443.jpeg',4,1),(14,'Mongolian Beef','Tiras de res salteadas a fuego alto en wok con salsa de soya, azúcar moreno, ajo y jengibre. Terminado con cebollín generoso y ajonjolí tostado. Servido sobre arroz blanco. Dulce, salado e intenso.',7200.00,'https://images.pexels.com/photos/26341193/pexels-photo-26341193.jpeg',4,1),(15,'Bibimbap Coreano','Arroz con vegetales salteados (zanahoria, espinaca, champiñón), huevo frito y pasta gochujang. Mezclá todo en el tazón antes de comer para integrar los sabores.',5500.00,'https://images.pexels.com/photos/7491952/pexels-photo-7491952.jpeg',4,1),(16,'Pollo Teriyaki Don','Bowl de arroz con pollo glaseado en salsa teriyaki, acompañado de ensalada de repollo y ajonjolí tostado.',5000.00,'https://images.pexels.com/photos/17308537/pexels-photo-17308537.jpeg',4,1),(17,'Udon Salteado','Fideos udon gruesos salteados con pollo, champiñón enoki, zanahoria, salsa de soya y aceite de sésamo.',5200.00,'https://images.pexels.com/photos/9028686/pexels-photo-9028686.jpeg',4,1),(18,'Matcha Latte','Leche vaporizada con polvo de matcha japonés de primera calidad. Disponible frío o caliente.',2500.00,'https://images.pexels.com/photos/34334882/pexels-photo-34334882.jpeg',5,1),(19,'Ramune Soda','Refresco japonés embotellado con el clásico sistema de canica. Sabor original limón-lima.',1800.00,'https://images.pexels.com/photos/4045205/pexels-photo-4045205.jpeg',5,1),(20,'Mochi Ice Cream (x3)','Tres piezas de mochi rellenas de helado. Sabores disponibles: matcha, fresa y vainilla. Suave por fuera, cremoso por dentro.',3000.00,'https://images.pexels.com/photos/37357446/pexels-photo-37357446.jpeg',6,1),(21,'Taiyaki','Waffle japonés en forma de pez relleno de pasta de anko (frijol rojo dulce). Crujiente por fuera y suave por dentro.',2800.00,'https://images.pexels.com/photos/30697934/pexels-photo-30697934.jpeg',6,1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_rol` (`nombre_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador'),(4,'Cliente'),(3,'Cocina'),(2,'Encargado');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguimiento_cocina`
--

DROP TABLE IF EXISTS `seguimiento_cocina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seguimiento_cocina` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pedido_detalle` int(11) NOT NULL,
  `id_estacion` int(11) NOT NULL,
  `estado_estacion` enum('En cola','En preparación','Terminado') DEFAULT 'En cola',
  `tiempo_inicio` datetime DEFAULT NULL,
  `tiempo_fin` datetime DEFAULT NULL,
  `id_usuario_cocina` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pedido_detalle` (`id_pedido_detalle`),
  KEY `id_estacion` (`id_estacion`),
  KEY `id_usuario_cocina` (`id_usuario_cocina`),
  CONSTRAINT `seguimiento_cocina_ibfk_1` FOREIGN KEY (`id_pedido_detalle`) REFERENCES `pedido_detalles` (`id`),
  CONSTRAINT `seguimiento_cocina_ibfk_2` FOREIGN KEY (`id_estacion`) REFERENCES `estaciones` (`id`),
  CONSTRAINT `seguimiento_cocina_ibfk_3` FOREIGN KEY (`id_usuario_cocina`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguimiento_cocina`
--

LOCK TABLES `seguimiento_cocina` WRITE;
/*!40000 ALTER TABLE `seguimiento_cocina` DISABLE KEYS */;
/*!40000 ALTER TABLE `seguimiento_cocina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena_hash` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `id_rol` int(11) NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Mariana Solano Vargas','admin1@nami.com','$2b$10$D7lbX2GlCEWUxGGod5Ph7ucAtft0PGzJZS89QfwJqze2lXdvlJ7Um','8888-1001',1,'2026-06-21 20:03:28'),(2,'Carlos Jiménez Rojas','admin2@nami.com','$2b$10$0gs0GY2csoJ4qdAWj5vVfOHudzfwnduo2IYXx2v3Kh7ipwTDdR2uu','8888-1002',1,'2026-06-21 20:03:28'),(3,'Daniela Fernández Castro','encargado1@nami.com','$2b$10$U7NMTQ.v2IVUHrHr9wq6Oub8zdSw4YDVHSXgkGFSNpo5CHwglnDCy','8888-2001',2,'2026-06-21 20:03:28'),(4,'Esteban Mora Quesada','encargado2@nami.com','$2b$10$Pd2p8yMSzRBv2yzbbwUNme4B5RwFWCGOmelvxU4IoSX67V9akKdGa','8888-2002',2,'2026-06-21 20:03:28'),(5,'Luis Hernández Pérez','cocina1@nami.com','$2b$10$Qq7ZhrNo9Tt1IWrRINBJ5.Gh2mj0FBpf5A8txPuUkRGulwu831ugW','8888-3001',3,'2026-06-21 20:03:28'),(6,'Sofía Araya Méndez','cocina2@nami.com','$2b$10$pWpAaQFL53mK9lbDiFHTWO0xsDqQxt9QPBKneBshbtOzDEQTvbKDm','8888-3002',3,'2026-06-21 20:03:28'),(7,'José Ramírez Vega','cliente1@nami.com','$2b$10$BJPEFpNwSqOyYf/ecLkz3O7llj1xHoUcIR85BRQoIqwBx/vOj89iW','8888-4001',4,'2026-06-21 20:03:28'),(8,'Andrea Chacón Salas','cliente2@nami.com','$2b$10$9i/5i9ITk96jExpoHNSIpOdlqrodYOy1Oq2MF4dFmgCz2w05HcvX.','8888-4002',4,'2026-06-21 20:03:28'),(9,'Pablo Castillo Brenes','cliente3@nami.com','$2b$10$qSvtQJsWt1CXc.u70i3K9Oe1lIJw5IfkRNc0sq4SbD9YwUsnpcsUq','8888-4003',4,'2026-06-21 20:03:28');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-17 18:48:00
