--@block
SELECT * FROM Users

--@block
ALTER TABLE `Users`
DROP COLUMN updatedAt;

--@block
DROP TABLE savings;

--@block
CREATE TABLE Savings (
    SavingsId INT NOT NULL AUTO_INCREMENT,
    savings_name VARCHAR(255) NOT NULL,
    goal_amount INT NOT NULL,
    current_amount INT NOT NULL,
    UserId INT,
    PRIMARY KEY (SavingsId),
    FOREIGN KEY (UserId) REFERENCES Users(id)
);

--@block
ALTER TABLE `savings`
RENAME COLUMN SavingsId TO id

--@block
INSERT INTO Users(LastName, FirstName, Email, Pass)
VALUES ("Fox", "Jamal", "test123@yahoo", "123");

--@block
INSERT INTO Savings (savings_name, goal_amount, current_amount, UserId)
VALUES ("Vacation", 1500, 0, 1)

--@block
SELECT * FROM Savings WHERE Userid = 1
-- UPDATE savings SET current_amount = 1000 WHERE id = 1

--@block
ALTER TABLE Savings 
ALTER COLUMN savings_name
DROP DEFAULT

--@block
DELETE FROM `savings`
WHERE savings_name LIKE '%test%'
