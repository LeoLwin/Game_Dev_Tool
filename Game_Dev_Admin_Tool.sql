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
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_patch_per_bundle` (`bundle_id`,`patch_id`),
  CONSTRAINT `fk_patch_bundle` FOREIGN KEY (`bundle_id`) REFERENCES `bundle` (`dev_path_id`),
  CONSTRAINT `Patch_ibfk_1` FOREIGN KEY (`bundle_id`) REFERENCES `bundle` (`dev_path_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patch`
--

LOCK TABLES `Patch` WRITE;
/*!40000 ALTER TABLE `Patch` DISABLE KEYS */;
INSERT INTO `Patch` VALUES (1,1,'Patchkk-98','2022-01-01 03:30:00','kaunghtdddet'),(2,1,'patch_2','2022-01-02 03:30:00','Remark for patch 2'),(3,2,'patch_3','2022-01-03 03:30:00','Remark for patch 3'),(4,3,'patch_4','2022-01-04 03:30:00','Remark for patch 4'),(5,3,'patch_5','2022-01-05 03:30:00','Remark for patch 5'),(6,1,'Patch555','2024-03-10 13:17:23','kdfkdfkd'),(9,2,'Patch555','2024-03-10 14:21:11','kdfkdfkd'),(10,3,'Patch555','2024-03-10 14:21:34','kdfkdfkd'),(13,1,'kkjkjoik','2024-03-12 03:16:41','kdfkdfkd');
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
  `prod_path_id` varchar(255) NOT NULL,
  `dev_path_id` int NOT NULL AUTO_INCREMENT,
  `orientation` varchar(255) NOT NULL,
  `index_fileName` varchar(255) NOT NULL,
  PRIMARY KEY (`dev_path_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bundle`
--

LOCK TABLES `bundle` WRITE;
/*!40000 ALTER TABLE `bundle` DISABLE KEYS */;
INSERT INTO `bundle` VALUES ('Bundle 1','web','prod_path_1',1,'orientation_1','index_fileName_1'),('Bundle 2','cocos','prod_path_2',2,'orientation_2','index_fileName_2'),('Bundle 3','web','prod_path_3',3,'orientation_3','index_fileName_3'),('nananaananan','cocos','a/a/a/a/',4,'kkk','kkkkkkkfdfd'),('maw','cocos','a/a/a/a/',5,'kkkk','kkkkkkkfdfd'),('zaw','cocos','a/a/a/a/',6,'kkkk','kkkkkkkfdfd'),('john','cocos','a/a/a/a/',7,'kkkk','kkkkkkkfdfd'),('marry','cocos','a/a/a/a/',8,'kkkk','kkkkkkkfdfd'),('ballon','cocos','a/a/a/a/',9,'kkk','kkkkkkkfdfd'),('gigi','cocos','a/a/a/a/',10,'kkkk','kkkkkkkfdfd'),('gigi','cocos','a/a/a/a/',11,'kkkk','kkkkkkkfdfd'),('gigi','cocos','a/a/a/a/',12,'kkkk','kkkkkkkfdfd');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (15,'Kaung Htet Lwin','112623038719113060534','phoekaung.3819@gmail.com','Google'),(16,'Kaung Htet Lwin','116111139988458233705','kaunghtet206@gmail.com','Google'),(17,'Kaung Htet Lwin','102833081139937242272','kaunghtetlwin982@gmail.com','Google');
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

-- Dump completed on 2024-03-12 15:46:04
