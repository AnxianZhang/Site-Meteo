CREATE TABLE IF NOT EXISTS USER_DATA(
    numU INTEGER AUTO_INCREMENT PRIMARY KEY,
    prenomU VARCHAR(20) NOT NULL,
    nomU VARCHAR(20),
    mail VARCHAR(50),
    mdp VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS USER_LIEUX(
    numU INTEGER REFERENCES USER(numU),
    numS INTEGER REFERENCES LIEUX(NumS)
);