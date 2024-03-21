-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: Game_Dev_Admin_Tool
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `Game_Dev_Admin_Tool`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `Game_Dev_Admin_Tool` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `Game_Dev_Admin_Tool`;

--
-- Table structure for table `Patch`
--

DROP TABLE IF EXISTS `Patch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Patch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bundle_id` int NOT NULL,
  `patch_id` varchar(255) NOT NULL,
  `update_dateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `remark` varchar(255) DEFAULT NULL,
  `file_Patch` varchar(255) DEFAULT NULL,
  `environment` enum('development','production') DEFAULT 'development',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_patch_per_bundle` (`bundle_id`,`patch_id`),
  CONSTRAINT `fk_patch_bundle` FOREIGN KEY (`bundle_id`) REFERENCES `bundle` (`dev_patch_id`),
  CONSTRAINT `Patch_ibfk_1` FOREIGN KEY (`bundle_id`) REFERENCES `bundle` (`dev_patch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=248 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patch`
--

LOCK TABLES `Patch` WRITE;
/*!40000 ALTER TABLE `Patch` DISABLE KEYS */;
INSERT INTO `Patch` VALUES (245,46,'kaywkdfdyaw','2024-03-21 05:00:26','kaungHtetLwin','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/46/extract-462de2ae7b-8ce9-401a-b7d3-f1128b21bc82','production'),(246,45,'ah82','2024-03-21 05:01:59','ddad','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/45/extract-4510abf9e1-ad53-4ca1-b457-8bfe675e1e77','development'),(247,46,'20240321113350','2024-03-21 05:04:27','dfd','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/46/extract-46f4d95f24-bdd3-4852-9a59-3db1dec104a5','development');
/*!40000 ALTER TABLE `Patch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bundle`
--

DROP TABLE IF EXISTS `bundle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bundle` (
  `name` varchar(255) NOT NULL,
  `type` enum('web','cocos') NOT NULL,
  `prod_patch_id` varchar(255) NOT NULL,
  `dev_patch_id` int NOT NULL AUTO_INCREMENT,
  `orientation` varchar(255) NOT NULL,
  `index_fileName` varchar(255) NOT NULL,
  PRIMARY KEY (`dev_patch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bundle`
--

LOCK TABLES `bundle` WRITE;
/*!40000 ALTER TABLE `bundle` DISABLE KEYS */;
INSERT INTO `bundle` VALUES ('jjcocos','cocos','a/a/ikop=/a/',45,'kdfddkk','kkkkkkkiue41fdfd'),('thae','cocos','a/a/admfd/a/',46,'kkkk','dfdf'),('thae','cocos','a/a/admfd/a/',47,'kkkk','dfdf'),('bab','cocos','a/a/admfd/a/',48,'kkddkoosk','dfjyufdkqlkdf');
/*!40000 ALTER TABLE `bundle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `social_id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `provider` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (18,'Kaung Htet Lwin','112623038719113060534','phoekaung.3819@gmail.com','Google'),(19,'Kaung Htet Lwin','116111139988458233705','kaunghtet206@gmail.com','Google'),(20,'Thiri Shwesin','105180924494579800087','thirihaha@gmail.com','Google');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-21 11:37:02
