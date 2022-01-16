--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `CreationDate` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userId`) 
) ENGINE=InnoDB;

--
-- Table structure for table `Account`
--

DROP TABLE IF EXISTS `Account`;

CREATE TABLE `Account` (
  `apiKey` varchar(200) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `quota_write` varchar(45) DEFAULT NULL,
  `used_write` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`apiKey`),
  KEY `fk_Account_1_idx` (`userId`),
  CONSTRAINT `fk_Account_1` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`)
) ENGINE=InnoDB;


