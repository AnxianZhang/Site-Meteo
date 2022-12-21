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
(NULL, 'Tour de Pise', 43.72315357305774, 10.396682828121708, 'https://cdn-icons-png.flaticon.com/512/1256/1256049.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Tour_de_Pise-2017.jpg/665px-Tour_de_Pise-2017.jpg', '80€ la pizza'),
(NULL, 'Taj Mahal', 27.175412029508465, 78.04226021413929, 'https://freepngimg.com/download/taj_mahal/33092-9-taj-mahal-photos.png', 'https://rochesfleuries.com/wp-content/uploads/2019/09/visite-taj-mahal-1024x683.jpg', "blanc + bleu = jole"),
(NULL, 'Cité interdite', 40.18965860495749, 116.38931617630404, 'https://png.pngtree.com/png-clipart/20220125/original/pngtree-the-imperial-palace-png-image_7213186.png', 'https://cdn2.civitatis.com/china/pekin/guia/ciudad-prohibida.jpg', "il est interdit d'enter !"),
(NULL, 'Mont Fuji', 35.36132465268525, 138.72740627109457, 'https://cdn-icons-png.flaticon.com/512/5896/5896886.png', 'https://www.travel-price.fr/images/content/voir-le-mont-fuji.jpg', "allez graimper ça :)"),
(NULL, 'Pyramide de Khéops', 29.97935529588269, 31.13420189701451, "https://cdn-icons-png.flaticon.com/512/218/218764.png", "https://upload.wikimedia.org/wikipedia/commons/a/a0/Great_Pyramid_of_Giza.jpg", "c'est un triangle");