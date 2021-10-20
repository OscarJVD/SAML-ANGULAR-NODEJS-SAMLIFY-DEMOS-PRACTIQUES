CREATE DATABASE node_mysql_ts;
CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(200) NOT NULL,
    user_password VARCHAR(200) NOT NULL,
    sp VARCHAR(100) NOT NULL,
    query_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

DESC users;