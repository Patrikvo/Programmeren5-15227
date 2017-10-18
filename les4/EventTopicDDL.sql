-- Globals instellen (alleen op je lokale MySQL Server, niet op die van de school)
SET GLOBAL TRANSACTION ISOLATION LEVEL SERIALIZABLE;
SET GLOBAL sql_mode = 'ANSI';


-- Database maken (alleen op je lokale MySQL Server, niet op die van de school) en activeren

-- If database does not exist, create the database
CREATE DATABASE IF NOT EXISTS user7;
USE user7;

--  Foreign Key constraints opheffen

-- With the MySQL FOREIGN_KEY_CHECKS variable,
-- you don't have to worry about the order of your
-- DROP and CREATE TABLE statements at all, and you can
-- write them in any order you like, even the exact opposite.
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `EventTopic`;
CREATE TABLE `EventTopic` (
`Name` NVARCHAR (120) NOT NULL,
 `Id` INT NOT NULL AUTO_INCREMENT,
    CONSTRAINT PRIMARY KEY(Id) );

SET FOREIGN_KEY_CHECKS = 1;