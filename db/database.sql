CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employee(
    id INT (11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT (12) DEFAULT NULL,
    PRIMARY KEY (id)
);

INSERT INTO employee VALUES 
(1, 'David', 1000),
(2, 'Eva', 1230),
(3, 'Maria', 1540),
(4, 'Alejandro', 950);