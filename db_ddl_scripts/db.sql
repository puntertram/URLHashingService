
--
-- Table structure for table `URL`
--

DROP TABLE IF EXISTS `URL`;
CREATE TABLE `URL` (
  `HashedURL` varchar(20) NOT NULL,
  `OriginalURL` varchar(1024) DEFAULT NULL,
  `CreationDate` varchar(45) DEFAULT NULL,
  `apiKey` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`HashedURL`)
) ENGINE=InnoDB;

