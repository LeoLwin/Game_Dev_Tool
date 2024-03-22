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
  `file_Patch` varchar(255) DEFAULT NULL,
  `environment` enum('development','production') DEFAULT 'development',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_patch_per_bundle` (`bundle_id`,`patch_id`),
  CONSTRAINT `fk_patch_bundle` FOREIGN KEY (`bundle_id`) REFERENCES `bundle` (`dev_patch_id`),
  CONSTRAINT `Patch_ibfk_1` FOREIGN KEY (`bundle_id`) REFERENCES `bundle` (`dev_patch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=286 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patch`
--

LOCK TABLES `Patch` WRITE;
/*!40000 ALTER TABLE `Patch` DISABLE KEYS */;
INSERT INTO `Patch` VALUES (247,46,'kaywkdfdyaw','2024-03-21 05:04:27','kaungHtetLwin','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/46/extract-46f4d95f24-bdd3-4852-9a59-3db1dec104a5','production'),(264,47,'ay82','2024-03-21 08:48:17','ddad','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/47/extract-47e8587db9-b0a7-43b9-9dae-baeca515ee0d','development'),(265,48,'ay82','2024-03-21 08:49:20','ddad','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/48/extract-481634f612-14a1-4aaf-a340-bef052003045','production'),(266,45,'20240321151637','2024-03-21 08:49:27','dfdf','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/45/extract-45666ee4e4-2782-4691-b6bd-ba524501b04f','development'),(269,45,'20240321153025','2024-03-21 09:00:32','dsfsfds','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/45/extract-45264a4ac7-54c5-48be-af3b-737eacd96a8b','development'),(271,45,'20240321152815','2024-03-21 09:06:32','TTUYTUYT','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/45/extract-4504c769de-665d-4f65-871b-0d1cdbe2ef83','development'),(272,47,'20240321152815','2024-03-21 09:06:52','TTUYTUYT','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/47/extract-47931b7eac-6eff-47e6-9656-71ec48d9c370','development'),(274,48,'20240321152815','2024-03-21 09:08:50','TTUYTUYT','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/48/extract-483c9a98e9-b400-4363-9b96-5740ee572c81','development'),(275,54,'20240322105456','2024-03-22 04:25:04','fads','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/54/extract-545595d0c5-dcf3-464c-840c-c144047131d9','development'),(277,54,'20240322105550','2024-03-22 04:26:02','dfasdfas','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/54/extract-541122950b-e090-4bb6-b5bb-395de3a06891','development'),(281,54,'20240322110338','2024-03-22 04:34:24','dfdferet','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/54/extract-54c5daa490-4726-4a79-8823-ed10fd8c4350','development'),(284,54,'20240322111721','2024-03-22 04:47:45','dfdsfas','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/54/extract-541e985460-cc86-4c5b-8736-d10660d3c44b','development'),(285,53,'20240322111844','2024-03-22 04:48:50','dfsd','/media/kaunghtetlwin/2AF88162F8812D5F/StudioAMK/Game_Dev_Admin_Tool_Server/uploads/53/extract-53412e9dda-5ba3-4276-a64f-7175279e4733','development');
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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bundle`
--

LOCK TABLES `bundle` WRITE;
/*!40000 ALTER TABLE `bundle` DISABLE KEYS */;
INSERT INTO `bundle` VALUES ('jjcocos','cocos','a/a/ikop=/a/',45,'kdfddkk','kkkkkkkiue41fdfd'),('thae','cocos','a/a/admfd/a/',46,'kkkk','dfdf'),('thae','cocos','a/a/admfd/a/',47,'kkkk','dfdf'),('bab','cocos','a/a/admfd/a/',48,'kkddkoosk','dfjyufdkqlkdf'),('Shan','cocos','a/a/admfd/a/',49,'kkkk','dfdf'),('kyawzawya','web','fdfd',50,'dfd','dsfdffd'),('winwin','web','dfdf',51,'dfdfd','dfdfd'),('ggi','web','asd',52,'dss','fsd'),('dfdfd','web','dfd',53,'dfdf','fdsf'),('dfdf','cocos','dfdf',54,'dfdfsd','dsfdsfad');
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

-- Dump completed on 2024-03-22 11:31:36
