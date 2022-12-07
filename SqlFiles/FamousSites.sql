DROP TABLE LIEUX;

CREATE TABLE IF NOT EXISTS LIEUX(
    numS INTEGER AUTO_INCREMENT PRIMARY KEY,
    nomS VARCHAR(20) NOT NULL,
    latitude DOUBLE NOT NULL,
    lontitude DOUBLE NOT NULL,
    icon VARCHAR(255),
    img VARCHAR(255),
    detail VARCHAR(255)
);

INSERT INTO LIEUX VALUES
(NULL, 'Tour Eiffel', 48.85853948884913, 2.2945134841395256, 'https://www.gigamic.com/files/catalog/products/images/gigamic_pwei_tour-eiffel_model_bd.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/260px-Tour_Eiffel_Wikimedia_Commons.jpg', '30€ le billet :)'),
(NULL, 'Tour de Pise', 43.72315357305774, 10.396682828121708, 'https://assets.stickpng.com/images/580b585b2edbce24c47b2d66.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Tour_de_Pise-2017.jpg/665px-Tour_de_Pise-2017.jpg', '80€ la pizza');