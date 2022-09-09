--@block
SELECT * FROM Users

--@block
ALTER TABLE `Users`
DROP COLUMN updatedAt;

--@block
INSERT INTO Users(LastName, FirstName, Email, Pass)
VALUES ("Fox", "Jamal", "test123@yahoo", "123");