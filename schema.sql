DROP DATABASE IF EXISTS redis_test;

CREATE DATABASE redis_test;

USE redis_test;

CREATE TABLE words (
  id int NOT NULL AUTO_INCREMENT,
  word varchar(50) NOT NULL,
  definition varchar(100) NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u <USER> < schema.sql
 *    OR
 *    mysql -u <USER> -p < schema.sql
 *  For example, on a pairing station, it'll be
 *    mysql -u student -p < schema.sql
 *  and then you'll have to enter the password, student
 *  On your personal computer, if you haven't set up
 *  a password, it'll be
 *    mysql -u root < schema.sql
*/

INSERT INTO words (id, word, definition) VALUES (1, "a", "air");
INSERT INTO words (id, word, definition) VALUES (2, "b", "bat");
INSERT INTO words (id, word, definition) VALUES (3, "c", "cat");
INSERT INTO words (id, word, definition) VALUES (4, "d", "drum");
INSERT INTO words (id, word, definition) VALUES (5, "e", "each");
INSERT INTO words (id, word, definition) VALUES (6, "f", "fine");
