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
ALTER TABLE `bills`
RENAME COLUMN billId TO id

--@block
INSERT INTO Users(LastName, FirstName, Email, Pass)
VALUES ("Fox", "Jamal", "test123@yahoo", "123");

--@block
INSERT INTO Savings (savings_name, goal_amount, current_amount, UserId)
VALUES ("Vacation", 1500, 0, 1)

--@block
INSERT INTO DEBTS (debt_name, debt_amount, debt_limit, debt_category, UserId)
Values("Nissan Versa", 10000, 13000, 'Auto', 1)

--@block
SELECT * FROM Debts WHERE Userid = 1
-- UPDATE savings SET current_amount = 1000 WHERE id = 1

--@block
SELECT * FROM Debts
--@block
ALTER TABLE Savings 
ALTER COLUMN savings_name
DROP DEFAULT

--@block
ALTER TABLE Bills
DROP COLUMN bill_long_date

--@block
DELETE FROM `debts`
WHERE debt_category IS NULL

--@block
UPDATE bills SET bill_paid = 1 WHERE id = 1

--@block
SELECT DISTINCT debt_category FROM Debts
