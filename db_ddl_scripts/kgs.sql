
--
-- Table structure for table `Counter`
--

DROP TABLE IF EXISTS `Counter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Counter` (
  `id` int(11) NOT NULL,
  `value` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

--
-- Table structure for table `UnusedKeys`
--

DROP TABLE IF EXISTS `UnusedKeys`;
CREATE TABLE `UnusedKeys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key_value` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

INSERT INTO `kgs_db`.`Counter` (`id`, `value`) VALUES ('1', '0');
INSERT INTO `kgs_db`.`Counter` (`id`, `value`) VALUES ('2', '0');

