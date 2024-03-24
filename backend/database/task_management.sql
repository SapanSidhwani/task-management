
DROP DATABASE IF EXISTS `task_management`;
CREATE DATABASE `task_Management`;

USE `task_management`;

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `pId` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `pType` varchar(200) NOT NULL
);

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `rId` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `rName` varchar(200) NOT NULL
);

DROP TABLE IF EXISTS `rolepermissions`;
CREATE TABLE `rolepermissions` (
  `rId` int(11) NOT NULL,
  `pId` int(11) NOT NULL,
  PRIMARY KEY (`rId`,`pId`),
  FOREIGN KEY (`rId`) REFERENCES `roles` (`rId`),
  FOREIGN KEY (`pId`) REFERENCES `permissions` (`pId`) 
);


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `roleId` int(11) DEFAULT NULL,
  FOREIGN KEY (`roleId`) REFERENCES `roles` (`rId`)
);

INSERT INTO `users`(`userId`, `username`, `email`, `password`, `status`, `roleId`) VALUES ('1','Sapan','XQD8H@example.com','1234','1','2');

INSERT INTO `users`(`userId`, `username`, `email`, `password`, `status`, `roleId`) VALUES ('2','Rahil','XQ123H@example.com','1234', '1','1');

INSERT INTO `users`(`userId`, `username`, `email`, `password`, `status`, `roleId`) VALUES ('3','Sajal','XQadas8H@example.com','1234', '1', '4');

INSERT INTO `users`(`userId`, `username`, `email`, `password`, `status`, `roleId`) VALUES ('4','Rohit','XQDdadaH@example.com','1234', '1','3');


INSERT INTO `roles`(`rId`, `rName`) VALUES ('1','Senior PHP Developer');
INSERT INTO `roles`(`rId`, `rName`) VALUES ('2','Junior PHP Developer');
INSERT INTO `roles`(`rId`, `rName`) VALUES ('3','Digital Marketing');
INSERT INTO `roles`(`rId`, `rName`) VALUES ('4','Frontend Developer');

INSERT INTO `permissions`(`pId`, `pType`) VALUES ('1','Can Edit');
INSERT INTO `permissions`(`pId`, `pType`) VALUES ('2','Can Delete');
INSERT INTO `permissions`(`pId`, `pType`) VALUES ('3','Can Read');
INSERT INTO `permissions`(`pId`, `pType`) VALUES ('4','Can Create');

INSERT INTO `rolepermissions`(`rId`, `pId`) VALUES ('1','1');
INSERT INTO `rolepermissions`(`rId`, `pId`) VALUES ('1','4');
INSERT INTO `rolepermissions`(`rId`, `pId`) VALUES ('2','4');
INSERT INTO `rolepermissions`(`rId`, `pId`) VALUES ('3','2');
INSERT INTO `rolepermissions`(`rId`, `pId`) VALUES ('4','3');
INSERT INTO `rolepermissions`(`rId`, `pId`) VALUES ('3','3');


