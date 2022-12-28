CREATE TABLE IF NOT EXISTS USER_DATA(
    numU INTEGER AUTO_INCREMENT PRIMARY KEY,
    prenomU VARCHAR(20) NOT NULL,
    nomU VARCHAR(20) NOT NULL,
    mail VARCHAR(50) NOT NULL,
    mdp VARCHAR(255) NOT NULL
);

---------- le mot de passe oiur ce compte est modo ----------
INSERT INTO USER_DATA VALUES
(NULL, "mo", "do", "modo@gmail.com", "$2y$10$sC2JSj6k12k63K6xLYOlMOv9ydlCP3fHOHd1O5Zx3H/i.iYl0dQrO");