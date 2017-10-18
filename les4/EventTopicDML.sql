
USE user7;
DROP PROCEDURE IF EXISTS EventTopicInsert;
DELIMITER //
CREATE PROCEDURE `EventTopicInsert`
(     IN pName NVARCHAR (120) ,
    OUT pId INT
)
BEGIN
    IF NOT EXISTS (SELECT * from EventTopic WHERE `Name` = pName )
    THEN
        INSERT INTO `EventTopic`
        (
            `EventTopic`.`Name`
        )
        VALUES (
            pName
        );
        -- return the Id of the inserted row
        SELECT LAST_INSERT_ID() INTO pId;
    else
        set pId = -100; -- Name exitst already
    END IF;

END //
DELIMITER ;


-- -------------------------------------------------------------------------------------------


USE user7;
DROP PROCEDURE IF EXISTS EventTopicUpdate;
DELIMITER //
CREATE PROCEDURE `EventTopicUpdate`
(
	pName NVARCHAR (120) ,
	pId INT 
)
BEGIN
UPDATE `EventTopic`
	SET
		`Name` = pName
	WHERE `EventTopic`.`Id` = pId;
END //
DELIMITER ;


-- -------------------------------------------------------------------------------------------


USE user7;
DROP PROCEDURE IF EXISTS EventTopicDelete;
DELIMITER //
CREATE PROCEDURE `EventTopicDelete`
(
	 pId INT 
)
BEGIN
DELETE FROM `EventTopic`
	WHERE `EventTopic`.`Id` = pId;
END //
DELIMITER ;


-- -------------------------------------------------------------------------------------------


USE user7;
DROP PROCEDURE IF EXISTS EventTopicSelectOne;
DELIMITER //
CREATE PROCEDURE `EventTopicSelectOne`
(
	 pId INT 
)
BEGIN
SELECT `EventTopic`.`Name`,
	`EventTopic`.`Id`
 
FROM `EventTopic`
	WHERE `EventTopic`.`Id` = pId;
END //
DELIMITER ;


-- -------------------------------------------------------------------------------------------


USE user7;
DROP PROCEDURE IF EXISTS EventTopicSelectAll;
DELIMITER //
CREATE PROCEDURE `EventTopicSelectAll`
(
)
BEGIN
SELECT `EventTopic`.`Name`,
	`EventTopic`.`Id`
	FROM `EventTopic`
	ORDER BY `Name`;
END //
DELIMITER ;


-- -------------------------------------------------------------------------------------------


USE user7;
DROP PROCEDURE IF EXISTS EventTopicSelectByName;
DELIMITER //
CREATE PROCEDURE `EventTopicSelectByName`
(
	 pName NVARCHAR (120) 
)
BEGIN
SELECT `EventTopic`.`Name`,
	`EventTopic`.`Id`

	FROM `EventTopic`
	WHERE `EventTopic`.`Name` = pName
	ORDER BY `EventTopic`.`Name`;
END //
DELIMITER ;


-- -------------------------------------------------------------------------------------------


USE user7;
DROP PROCEDURE IF EXISTS EventTopicSelectLikeName;
DELIMITER //
CREATE PROCEDURE `EventTopicSelectLikeName`
(
	pName NVARCHAR (120) 
)
BEGIN
SELECT `EventTopic`.`Name`,
	`EventTopic`.`Id`
 
	FROM `EventTopic`
	WHERE `EventTopic`.`Name` like CONCAT(pName, '%')
	ORDER BY `EventTopic`.`Name`;
END //
DELIMITER ;


-- -------------------------------------------------------------------------------------------


USE user7;
DROP PROCEDURE IF EXISTS EventTopicSelectLikeXName;
DELIMITER //
CREATE PROCEDURE `EventTopicSelectLikeXName`
(
	pName NVARCHAR (120) 
)
BEGIN
	SELECT `EventTopic`.`Name`,
	`EventTopic`.`Id`

	FROM `EventTopic`
	WHERE `EventTopic`.`Name` like CONCAT('%', pName, '%')

	ORDER BY `EventTopic`.`Name` ;
END //
DELIMITER ;
