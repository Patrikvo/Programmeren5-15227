USE docent1;
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



