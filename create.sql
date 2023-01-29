DROP TABLE IF EXISTS sales_line;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS user;






CREATE TABLE user (
    uId int NOT NULL AUTO_INCREMENT,
    uName varchar(255),
    userName varchar(255),
    userPassword varchar(255),
    uEmail varchar(255),
    PRIMARY KEY (uId)
);


CREATE TABLE products (
    pId int NOT NULL AUTO_INCREMENT,
    pImage varchar(255),
    pName varchar(255),
    pPrice int(3),
    pSize varchar(255),
    pStockNo int(3),
    pGender varchar(255),
    PRIMARY KEY (pId)
);


CREATE TABLE sales_line (
    slId int NOT NULL AUTO_INCREMENT,
	saleId int NOT NULL,
    uId int , 
    pId int, 
    stockReq int, 
    sAddress VARCHAR(255), 
    sTotal int,
    PRIMARY KEY (slId),
	FOREIGN KEY (pId) REFERENCES products(pId),
	FOREIGN KEY (uId) REFERENCES user(uId)

);


INSERT INTO products (pImage,pName,pGender,pPrice,pSize,pStockNo )
VALUES ('images/male-g1268c6d2e_1920.jpg','Normie Pants','Male',10,'M', 10),
('images/fashion-gdfb6e2ddc_1920.jpg','Newfoundland Pattern Skirt','Female',14,'L', 10),
('images/fashion-shoes-sneakers.jpg','Cashual Runners','Unisex',66,'L',20),
('images/gettyimages-141841206-612x61.jpg','Hawaiian TShirt','Male',25,'S',20),
('images/gettyimages-141841206-612x612.jpg','Orange Beanie','Unisex',15,'XS',10),
('images/wool-garment-color-stylish-sport.jpg','Striped Socks','Female',4,'M',5),
('images/ssrco,toddler_hoodie,youth,heather_grey,flatlay_front,square,600x600-bg,f8f8f8.1.jpg','Hoodie','Male',70,'XL',32);
