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
CREATE TABLE Bills (
    billId INT NOT NULL AUTO_INCREMENT,
    bill_name VARCHAR(255) NOT NULL,
    bill_amount VARCHAR(255) NOT NULL,
    bill_date VARCHAR(255) NOT NULL,
    bill_long_date VARCHAR(255) NOT NULL,
    bill_paid BOOLEAN NOT NULL,
    UserId INT,
    PRIMARY KEY (billId),
    FOREIGN KEY (UserId) REFERENCES Users(id)
)

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
INSERT INTO Bills (bill_name, bill_amount, bill_date, bill_long_date, bill_paid, UserId)
Values("xFinity", 75, '21', '2022-09-21', FALSE, 1)

--@block
SELECT * FROM Savings WHERE Userid = 1
-- UPDATE savings SET current_amount = 1000 WHERE id = 1

--@block
SELECT * FROM Bills
--@block
ALTER TABLE Savings 
ALTER COLUMN savings_name
DROP DEFAULT

--@block
ALTER TABLE Bills
DROP COLUMN bill_long_date

--@block
DELETE FROM `savings`
WHERE savings_name LIKE '%test%'
