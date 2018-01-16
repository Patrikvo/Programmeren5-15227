/*
﻿-- An Orm Apart -- Sunday 7th of January 2018 11:07:02 AM
-- 
-- SET GLOBAL TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- mode changes syntax and behavior to conform more closely to standard SQL.
-- It is one of the special combination modes listed at the end of this section.
-- SET GLOBAL sql_mode = 'ANSI';
-- If database does not exist, create the database
-- CREATE DATABASE IF NOT EXISTS docent1;
*/
USE `user7`;
/*
-- With the MySQL FOREIGN_KEY_CHECKS variable,
-- you don't have to worry about the order of your
-- DROP and CREATE TABLE statements at all, and you can
-- write them in any order you like, even the exact opposite.
*/
SET FOREIGN_KEY_CHECKS = 0;

/* modernways.be
-- created by an orm apart
-- Entreprise de modes et de manières modernes
-- MySql: CREATE TABLE Log
-- Created on Sunday 7th of January 2018 11:07:02 AM
*/
 
DROP TABLE IF EXISTS `Log`;
CREATE TABLE `Log` (
	`UserName` NVARCHAR (50) NOT NULL,
	`Email` NVARCHAR (255) NOT NULL,
	`Role` NVARCHAR (50) NOT NULL,
	`ProcedureCode` NVARCHAR (25) NOT NULL,
	`ProcedureTitle` NVARCHAR (255) NOT NULL,
	`StepTitle` VARCHAR (255) NOT NULL,
	`ActionCode` NVARCHAR (10) NOT NULL,
	`CallNumber` VARCHAR (25) NOT NULL,
	`SendNumber` VARCHAR (25) NOT NULL,
	`Id` INT NOT NULL AUTO_INCREMENT,
	CONSTRAINT PRIMARY KEY(Id));

/* With the MySQL FOREIGN_KEY_CHECKS variable,
-- you don't have to worry about the order of your
-- DROP and CREATE TABLE statements at all, and you can
-- write them in any order you like, even the exact opposite. */
SET FOREIGN_KEY_CHECKS = 1;