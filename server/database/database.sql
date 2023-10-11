CREATE DATABASE IF NOT EXISTS users;

USE users;

CREATE TABLE admins (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(25) DEFAULT NULL,
    lastname VARCHAR(25) DEFAULT NULL,
    username VARCHAR(25) DEFAULT NULL,
    email VARCHAR(255),
    password VARCHAR(255),
    role ENUM('admin', 'editor'), 
    PRIMARY KEY (id)
);

