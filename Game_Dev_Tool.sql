/*
SQLyog Ultimate
MySQL - 5.7.40-log : Database - show_game_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`Game_Dev_Admin_Tool` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `Game_Dev_Admin_Tool`;

DROP TABLE IF EXISTS `Patch`;

CREATE TABLE Patch (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bundle_id INT NOT NULL,
    FOREIGN KEY (bundle_id) REFERENCES bundle(dev_path_id),
    patch_id VARCHAR(255) NOT NULL,
    update_dateTime TIMESTAMP NOT NULL,
    remark VARCHAR(255),
    CONSTRAINT unique_patch_per_bundle UNIQUE (bundle_id, patch_id)
);

DROP TABLE IF EXISTS `bundle`;

CREATE TABLE bundle (
    name VARCHAR(255) NOT NULL,
    type ENUM('web', 'coces') NOT NULL,
    prod_path_id VARCHAR(255) NOT NULL,
    dev_path_id VARCHAR(255) NOT NULL,
    orientation VARCHAR(255) NOT NULL,
    index_fileName VARCHAR(255) NOT NULL
);


