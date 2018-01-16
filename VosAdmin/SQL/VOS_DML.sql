/* ff */

USE `user7`;

/* modernways.be
-- created by an orm apart
-- Entreprise de modes et de manières modernes
-- MySql DML
-- Created : Sunday 7th of January 2018 11:27:55 AM
-- DML Insert Stored Procedure for Log 
*/
 
DROP PROCEDURE IF EXISTS LogInsert;
DELIMITER //
CREATE PROCEDURE `LogInsert`
(
	IN pUserName NVARCHAR (50) ,
	IN pEmail NVARCHAR (255) ,
	IN pRole NVARCHAR (50) ,
	IN pProcedureCode NVARCHAR (25) ,
	IN pProcedureTitle NVARCHAR (255) ,
	IN pStepTitle VARCHAR (255) ,
	IN pActionCode NVARCHAR (10) ,
	IN pCallNumber VARCHAR (25) ,
	IN pSendNumber VARCHAR (25) ,
	OUT pId INT 
)
BEGIN
INSERT INTO `Log`
	(
		`Log`.`UserName`,
		`Log`.`Email`,
		`Log`.`Role`,
		`Log`.`ProcedureCode`,
		`Log`.`ProcedureTitle`,
		`Log`.`StepTitle`,
		`Log`.`ActionCode`,
		`Log`.`CallNumber`,
		`Log`.`SendNumber`
	)
	VALUES
	(
		pUserName,
		pEmail,
		pRole,
		pProcedureCode,
		pProcedureTitle,
		pStepTitle,
		pActionCode,
		pCallNumber,
		pSendNumber
	);
	/* return the Id of the inserted row  */
	SELECT LAST_INSERT_ID() INTO pId;
END //
DELIMITER ;

/* modernways.be
-- created by an orm apart
-- Entreprise de modes et de manières modernes
-- MySql DML
-- Created : Sunday 7th of January 2018 11:27:55 AM
-- DML Update Stored Procedure for Log
*/
 
DROP PROCEDURE IF EXISTS LogUpdate;
DELIMITER //
CREATE PROCEDURE `LogUpdate`
(
	pUserName NVARCHAR (50) ,
	pEmail NVARCHAR (255) ,
	pRole NVARCHAR (50) ,
	pProcedureCode NVARCHAR (25) ,
	pProcedureTitle NVARCHAR (255) ,
	pStepTitle VARCHAR (255) ,
	pActionCode NVARCHAR (10) ,
	pCallNumber VARCHAR (25) ,
	pSendNumber VARCHAR (25) ,
	pId INT 
)
BEGIN
UPDATE `Log`
	SET
		`UserName` = pUserName,
		`Email` = pEmail,
		`Role` = pRole,
		`ProcedureCode` = pProcedureCode,
		`ProcedureTitle` = pProcedureTitle,
		`StepTitle` = pStepTitle,
		`ActionCode` = pActionCode,
		`CallNumber` = pCallNumber,
		`SendNumber` = pSendNumber
	WHERE `Log`.`Id` = pId;
END //
DELIMITER ;

/* modernways.be
-- created by an orm apart
-- Entreprise de modes et de manières modernes
-- MySql DML
-- Created : Sunday 7th of January 2018 11:27:55 AM
-- DML Delete Stored Procedure for Log 
*/
 
DROP PROCEDURE IF EXISTS LogDelete;
DELIMITER //
CREATE PROCEDURE `LogDelete`
(
	 pId INT 
)
BEGIN
DELETE FROM `Log`
	WHERE `Log`.`Id` = pId;
END //
DELIMITER ;

/* modernways.be
-- created by an orm apart
-- Entreprise de modes et de manières modernes
-- MySql DML
-- Created : Sunday 7th of January 2018 11:27:55 AM
-- DML SelectOne Stored Procedure for Log 
*/
 
DROP PROCEDURE IF EXISTS LogSelectOne;
DELIMITER //
CREATE PROCEDURE `LogSelectOne`
(
	 pId INT 
)
BEGIN
SELECT `Log`.`UserName`,
	`Log`.`Email`,
	`Log`.`Role`,
	`Log`.`ProcedureCode`,
	`Log`.`ProcedureTitle`,
	`Log`.`StepTitle`,
	`Log`.`ActionCode`,
	`Log`.`CallNumber`,
	`Log`.`SendNumber`,
	`Log`.`Id`
 
FROM `Log`
	WHERE `Log`.`Id` = pId;
END //
DELIMITER ;

/* modernways.be
-- created by an orm apart
-- Entreprise de modes et de manières modernes
-- MySql DML
-- Created : Sunday 7th of January 2018 11:27:55 AM
-- DML SelectAll Stored Procedure for table Log 
*/
 
DROP PROCEDURE IF EXISTS LogSelectAll;
DELIMITER //
CREATE PROCEDURE `LogSelectAll`
(
)
BEGIN
SELECT `Log`.`UserName`,
	`Log`.`Id`
	FROM `Log`
	ORDER BY `FirstName`,`LastName`;
END //
DELIMITER ;

/* modernways.be
-- created by an orm apart
-- Entreprise de modes et de manières modernes
-- MySql DML
-- Created : Sunday 7th of January 2018 11:27:55 AM
-- DML SelectByUserName Stored Procedure for table Log
*/
 
DROP PROCEDURE IF EXISTS LogSelectByUserName;
DELIMITER //
CREATE PROCEDURE `LogSelectByUserName`
(
	 pUserName NVARCHAR (50) 
)
BEGIN
SELECT `Log`.`UserName`,
	`Log`.`Id`

	FROM `Log`
	WHERE `Log`.`UserName` = pUserName
	ORDER BY `Log`.`UserName`;
END //
DELIMITER ;

/* modernways.be
-- created by an orm apart
-- Entreprise de modes et de manières modernes
-- MySql DML
-- Created : Sunday 7th of January 2018 11:27:55 AM
-- DML SelectByEmail Stored Procedure for table Log
*/
 
DROP PROCEDURE IF EXISTS LogSelectByEmail;
DELIMITER //
CREATE PROCEDURE `LogSelectByEmail`
(
	 pEmail NVARCHAR (255) 
)
BEGIN
SELECT `Log`.`UserName`,
	`Log`.`Id`

	FROM `Log`
	WHERE `Log`.`Email` = pEmail
	ORDER BY `Log`.`Email`;
END //
DELIMITER ;

/* modernways.be
-- created by an orm apart
-- Entreprise de modes et de manières modernes
-- MySql DML
-- Created : Sunday 7th of January 2018 11:27:55 AM
-- DML SelectById Stored Procedure for table Log
*/
 
DROP PROCEDURE IF EXISTS LogSelectById;
DELIMITER //
CREATE PROCEDURE `LogSelectById`
(
	 pId INT 
)
BEGIN
SELECT `Log`.`UserName`,
	`Log`.`Id`

	FROM `Log`
	WHERE `Log`.`Id` = pId;
END //
DELIMITER ;

/* modernways.be
-- created by an orm apart
-- Entreprise de modes et de manières modernes
-- MySql DML
-- Created : Sunday 7th of January 2018 11:27:55 AM
-- DML SelectLikeUserName Stored Procedure for table Log 
*/
 
DROP PROCEDURE IF EXISTS LogSelectLikeUserName;
DELIMITER //
CREATE PROCEDURE `LogSelectLikeUserName`
(
	pUserName NVARCHAR (50) 
)
BEGIN
SELECT `Log`.`UserName`,
	`Log`.`Id`
 
	FROM `Log`
	WHERE `Log`.`UserName` like CONCAT(pUserName, '%')
	ORDER BY `Log`.`UserName`;
END //
DELIMITER ;

/* modernways.be
-- created by an orm apart
-- Entreprise de modes et de manières modernes
-- MySql DML
-- Created : Sunday 7th of January 2018 11:27:55 AM
-- DML SelectLikeEmail Stored Procedure for table Log 
*/ 

DROP PROCEDURE IF EXISTS LogSelectLikeEmail;
DELIMITER //
CREATE PROCEDURE `LogSelectLikeEmail`
(
	pEmail NVARCHAR (255) 
)
BEGIN
SELECT `Log`.`UserName`,
	`Log`.`Id`
 
	FROM `Log`
	WHERE `Log`.`Email` like CONCAT(pEmail, '%')
	ORDER BY `Log`.`Email`;
END //
DELIMITER ;

/* modernways.be
-- created by an orm apart
-- Entreprise de modes et de manières modernes
-- MySql DML
-- Created : Sunday 7th of January 2018 11:27:55 AM
-- DML SelectLikeXUserName Stored Procedure for table Log
*/
 
DROP PROCEDURE IF EXISTS LogSelectLikeXUserName;
DELIMITER //
CREATE PROCEDURE `LogSelectLikeXUserName`
(
	pUserName NVARCHAR (50) 
)
BEGIN
	SELECT `Log`.`UserName`,
	`Log`.`Id`

	FROM `Log`
	WHERE `Log`.`UserName` like CONCAT('%', pUserName, '%')

	ORDER BY `Log`.`UserName` ;
END //
DELIMITER ;

/* modernways.be
-- created by an orm apart
-- Entreprise de modes et de manières modernes
-- MySql DML
-- Created : Sunday 7th of January 2018 11:27:55 AM
-- DML SelectLikeXEmail Stored Procedure for table Log
*/
 
DROP PROCEDURE IF EXISTS LogSelectLikeXEmail;
DELIMITER //
CREATE PROCEDURE `LogSelectLikeXEmail`
(
	pEmail NVARCHAR (255) 
)
BEGIN
	SELECT `Log`.`UserName`,
	`Log`.`Id`

	FROM `Log`
	WHERE `Log`.`Email` like CONCAT('%', pEmail, '%')

	ORDER BY `Log`.`Email` ;
END //
DELIMITER ;
