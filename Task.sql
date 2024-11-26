-- Table Name: CLIENT_MASTER
-- Description: Used to store client information.

create table CLIENT_MASTER(
  CLIENTNO varchar(6),
  NAME varchar(20),
  ADDRESS1 varchar(30),
  ADDRESH2 varchar(30),
  CITY varchar(15),
  PINCODE int(8),
  STATE varchar(15),
  BALDUE decimal(10,2)
);

-- Table Name: PRODUCT_MASTER
-- Description: Used to store product information.

create table PRODUCT_MASTER(
  PRODUCTNO varchar(6),
  DESCRIPTION varchar(15),
  PROFITPERCENT decimal(4,2),
  UNITMEASUE varchar(10),
  QTYONHAND int(8),
  REORDERLVL int(8),
  SELLPRICE decimal(8,2), 
  COSTPRICE decimal(8,2)
);


-- Table Name: SALESMAN_MASTER
-- Description: Used to store salesman infomation working for the company.

create table SALESMAN_MASTER(
  SALESMANNO varchar(6),
  SALESMANNAME varchar(20),
  ADDRESH1 varchar(30),
  ADDRESH2 varchar(30),
  CITY varchar(20),
  PINCODE int(8),
  STATE varchar(20),
  SALAMT decimal(8,2),
  TGTTOGET decimal(6,2),
  YTDSALES decimal(6,2),
  REMARKS varchar(60)
);