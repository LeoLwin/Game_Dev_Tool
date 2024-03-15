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
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_patch_per_bundle` (`bundle_id`,`patch_id`),
  CONSTRAINT `fk_patch_bundle` FOREIGN KEY (`bundle_id`) REFERENCES `bundle` (`dev_patch_id`),
  CONSTRAINT `Patch_ibfk_1` FOREIGN KEY (`bundle_id`) REFERENCES `bundle` (`dev_patch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patch`
--

LOCK TABLES `Patch` WRITE;
/*!40000 ALTER TABLE `Patch` DISABLE KEYS */;
INSERT INTO `Patch` VALUES (2,1,'patch_2','2022-01-02 03:30:00','Remark for patch 2',NULL),(3,2,'patch_3','2022-01-03 03:30:00','Remark for patch 3',NULL),(4,3,'patch_4','2022-01-04 03:30:00','Remark for patch 4',NULL),(5,3,'patch_5','2022-01-05 03:30:00','Remark for patch 5',NULL),(6,1,'Patch555','2024-03-10 13:17:23','kdfkdfkd',NULL),(9,2,'Patch555','2024-03-10 14:21:11','kdfkdfkd',NULL),(10,3,'Patch555','2024-03-10 14:21:34','kdfkdfkd',NULL),(16,3,'kkjddddkjoik','2024-03-13 07:46:13','kdfkdfdfdddddszaakd',NULL),(17,5,'kkjddddkjoik','2024-03-13 08:26:39','kdfkdfdfdddddszaakd',NULL),(18,22,'kkjddddkjoik','2024-03-14 05:37:53','kdfkdfdfdddddszaakd',NULL),(19,22,'kdkfjd','2024-03-14 08:14:17','ggddd',NULL),(21,22,'kfjdkfjdjfd','2024-03-14 08:14:43','ggddd',NULL),(22,12,'kaywkdfdyaw','2024-03-14 08:15:02','kdfkdfdfdddddszaakd',NULL),(23,12,'kfjdkfjdjfd','2024-03-15 09:33:24','ggddfdfddd','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/temps/decodedFile.zip'),(24,12,'kdfjkdfd','2024-03-15 09:41:57','ggddfdfddd','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/temps/decodedFile.zip'),(25,2,'kdfjkdfd','2024-03-15 09:43:50','ggddfdfddd','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/temps/decodedFile.zip'),(27,2,'dfdjfkd','2024-03-15 09:47:33','ggddfdfdfasddffdfsdaddd','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/temps/decodedFile.zip'),(29,3,'dfddmdnfjfkd','2024-03-15 09:49:23','ggddfdfdfasddffdfsdaddd','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/decodedFile.zip'),(30,5,'dfddmdnfjfkd','2024-03-15 09:51:38','ggddfdfdfasddffdfsdaddd','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/decodedFile.zip'),(31,1,'dfddmdnfjfkd','2024-03-15 09:51:53','ggddfdfdfasddffdfsdaddd','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/decodedFile.zip'),(33,1,'dfddmdkdfkdfdnfjfkd','2024-03-15 09:57:54','ggddfdfdfasddffdfsdaddd','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/decodedFile.zip'),(34,7,'dfddmdkdfkdfdnfjfkd','2024-03-15 10:01:41','ggddfdfdfasddffdfsdaddd','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/ddf6cba8-0c30-4c6c-bf35-f29a1e4bf5bc'),(36,7,'dfdddkfkdfdmdkdfkdfdnfjfkd','2024-03-15 10:02:34','ggddfdfdfasddffdfsdaddd','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/1d28d34a-a8de-4d97-ae43-09ddb394b60d.zip');
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bundle`
--

LOCK TABLES `bundle` WRITE;
/*!40000 ALTER TABLE `bundle` DISABLE KEYS */;
INSERT INTO `bundle` VALUES ('testtesttest','cocos','a/a/ikop=/a/',1,'kdfddkk','kkkkkkkiue41fdfd'),('Bundle 2','cocos','prod_path_2',2,'orientation_2','index_fileName_2'),('ballodddn','cocos','a/a/a/a/',3,'kkk','kkkkkkkfdfd'),('mawmawd','cocos','a/a/ikop=/a/',5,'kdfddkk','kkkkkkkiue41fdfd'),('zaw','cocos','a/a/a/a/',6,'kkkk','kkkkkkkfdfd'),('john','cocos','a/a/a/a/',7,'kkkk','kkkkkkkfdfd'),('marry','cocos','a/a/a/a/',8,'kkkk','kkkkkkkfdfd'),('ballon','cocos','a/a/a/a/',9,'kkk','kkkkkkkfdfd'),('gigi','cocos','a/a/a/a/',10,'kkkk','kkkkkkkfdfd'),('gigi','cocos','a/a/a/a/',11,'kkkk','kkkkkkkfdfd'),('gigi','cocos','a/a/a/a/',12,'kkkk','kkkkkkkfdfd'),('gigi','cocos','a/a/a/a/',13,'kkkk','kkkkkkkfdfd'),('gigi','cocos','a/a/a/a/',14,'kkkk','kkkkkkkfdfd'),('gigi','cocos','a/a/a/a/',15,'kkkk','ddfdfd'),('gigi','cocos','a/a/a/a/',16,'kkkk','ddfdfd'),('htay','cocos','a/a/admfd/a/',17,'kkkk','dfdf'),('htay','cocos','a/a/admfd/a/',18,'kkkk','dfdf'),('htay','cocos','a/a/admfd/a/',19,'kkkk','dfdf'),('htay','cocos','a/a/admfd/a/',20,'kkkk','dfdf'),('htay','cocos','a/a/admfd/a/',21,'kkkk','dfdf'),('htay','cocos','a/a/admfd/a/',22,'kkkk','dfdf'),('htay','cocos','a/a/admfd/a/',23,'kkddkk','dfdf'),('htay','cocos','a/a/admfd/a/',24,'kkddkk','dfdf'),('htay','cocos','a/a/admfd/a/',25,'kkddkk','dfdf'),('girod','web','a/a/admfd/a/',26,'kkddkoosk','dfjyufdkqlkdf'),('myo','web','a/a/admfd/a/',27,'kkkk','dfdf'),('girod','web','a/a/admfd/a/',28,'kkddkoosk','dfjyufdkqlkdf'),('testtesttest','cocos','a/a/ikop=/a/',29,'kdfddkk','kkkkkkkiue41fdfd'),('hdfaldkfad','web','a/a/admfd/a/',30,'kkkk','dfdf'),('hdfaldkfad','web','a/a/admfd/a/',31,'kkkk','dfdf'),('hdfaldkfad','web','a/a/admfd/a/',32,'kkkk','dfdf'),('hdfaldkfad','web','a/a/admfd/a/',33,'kkkk','dfdf');
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

-- Dump completed on 2024-03-15 17:15:27
