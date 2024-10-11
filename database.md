use mydatabase;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
SHOW TABLES;
DESCRIBE users;
INSERT INTO users (username, password) VALUES ('testuser', 'testpassword');
SELECT * FROM users;
ALTER TABLE users ADD email VARCHAR(255) NOT NULL;




