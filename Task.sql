-- 29.11.2024 --

-- create table as CLIENT_MASTER -- 
 
 /*
 create table client_master(
    CLIENTNO varchar(6) primary key,
    NAME varchar(20)  not null,
    ADDRESH1 varchar(30),
    ADDRESH2 varchar(30),
    CITY  varchar(15),
    PINCODE numeric(8),
    STATE varchar(15),
    BALDUE numeric(10,2)
 );
*/

/*
insert into client_master
values 
('C00001','Ivan Bayross','Mumbai','Mumbai','Mumbai',400054,'Maharashtra',15000),
('C00002','Mamta Muzumdar','Madras','Madras','Madras',780001,'Tamil Nadu',0),
('C00003','Chhaya Bankar','Mumbai','Mumbai','Mumbai',400057,'Maharashtra',5000),
('C00004','Ashwini Joshi','Bangalore','Bangalore','Bangalore',560001,'Karnataka',0),
('C00005','Hansel Colaco','Mumbai','Mumbai','Mumbai',400060,'Maharashtra',2000),
('C00006','Deepak Sharma','Mangalore','Mangalore','Mangalore',560050,'Karnataka',0);
*/

/*
create table product_master(
    PRODUCTNO varchar(6) primary key,
    DESCRIPTION varchar(15) not null,
    PROFITPERCENT numeric(4,2) not null,
    UNITMEASURE varchar(10) not null,
    QTYONHAND numeric(8) not null,
    REORDERLVL numeric(8) not null,
    SELLPRICE decimal(8,2) not null,
    COSTPRICE decimal(8,2) not null
);
*/

/*
insert into product_master
values
('P00001','T-Shirt',5,'Piece',200,50,350,250),
('P00345','Shirt',6,'Piece',150,50,500,350),
('P03453','Kargo',6,'Piece',150,50,500,350),
('P06734','Cotton Jeans',5,'Piece',100,20,600,450),
('P07865','Jeans',5,'Piece',100,20,750,500),
('P07868','Trousers',2,'Piece',150,50,850,550),
('P07885','Pull Overs',2.5,'Piece',80,30,700,450),
('P07965','Denim Shirts',4,'Piece',100,40,350,250),
('P07975','Lycra Tops',5,'Piece',70,30,300,175),
('P07956','lengho',5,'Piece',70,30,300,175),
('P08865','Skirts',5,'Piece',75,30,450,300);
*/
/*
create table salesman_master(
    SALESMANNO varchar(6) primary key,
    SALESMANNAME varchar(20) not null,
    ADDRESS1 varchar(30) not null,
    ADDRESH2 varchar(30) ,
    CITY varchar(20),
    PINCODE numeric(8),
    STATE varchar(20),
    SALAMT numeric(8,2) not null,
    TGTTOGET numeric(6,2) not null,
    YTDSALES numeric(6,2) not null,
    REMARKS varchar(60)
);
*/

/*
insert into salesman_master
values
('S00001','Aman','A/14','Worli','Mumbai',400002,'Maharashtra',3000,100,50,'Good'),
('S00002','Omkar','65','Nariman','Mumbai',400001,'Maharashtra',3000,200,100,'Good'),
('S00003','Raj','P-7','Bandra','Mumbai',400032,'Maharashtra',3000,200,100,'Good'),
('S00004','Ashish','A/5','Juhu','Mumbai',400044,'Maharashtra',3500,200,150,'Good');
*/

/*
create table sales_order(
    ORDERNO varchar(6) primary key,
    CLIENTNO varchar(6),
    ORDERDATE date not null,
    DELYADDR varchar(25),
    SALESMANNO varchar(6),
    DELYTYPE char default 'F',
    BILLYN char,
    DELYDATE date,
    ORDERSTATUS varchar(10) check(ORDERSTATUS in ('in process','fulfilled','backorder','cancelled')),
    foreign key (CLIENTNO) references client_master(CLIENTNO),
    foreign key (SALESMANNO) references salesman_master(SALESMANNO)
);
*/

/*
insert into sales_order
values
('O19001','C00001','2004-06-12',null,'S00001','F','N','2002-07-20','In Process'),
('O19002','C00002','2004-06-25',null,'S00002','P','N','2002-07-27','Cancelled'),
('O46865','C00003','2004-02-18',null,'S00003','F','Y','2002-02-20','Fulfilled'),
('O19003','C00001','2004-04-03',null,'S00001','F','Y','2002-04-07','Fulfilled'),
('O46866','C00004','2004-05-20',null,'S00002','P','N','2002-05-22','Cancelled'),
('O19008','C00005','2004-05-24',null,'S00004','F','N','2002-07-26','In Process');
*/

/*
create table sales_order_details(
    ORDERNO varchar(6),
    PRODUCTNO varchar(6),
    QTYORDERED numeric(8),
    QTYDISP numeric(8),
    PRODUCTRATE numeric(10,2),
    foreign key (ORDERNO) references sales_order(ORDERNO),
    foreign key (PRODUCTNO) references product_master (PRODUCTNO)
);
*/

/*
insert into sales_order_details
values
('O19001','P00001',4,4,525),
('O19001','P07956',2,1,8400),
('O19001','P07885',2,1,5250),
('O19002','P00001',10,0,525),
('O46865','P07868',3,3,3150),
('O46865','P07885',3,1,5250),
('O46865','P00001',10,10,525),
('O46865','P00345',4,4,1050),
('O19003','P03453',2,2,1050),
('O19003','P06734',1,1,12000),
('O46866','P07965',1,0,8400),
('O46866','P07975',1,0,1050),
('O19008','P00001',10,5,525),
('O19008','P07975',5,3,1050);
*/



----- task ------

--> Exercise on retrieving records from a table

-- select NAME from client_master;
-- select * from client_master;
-- select NAME,CITY,STATE from client_master;
-- select DESCRIPTION from product_master;
-- select NAME from client_master where CITY = 'Mumbai';
--  select SALESMANNAME from salesman_master where SALAMT = 3000;


--> Exercise on updating records in a table

-- update client_master 
-- set CITY = 'Bangalore' where CLIENTNO = 'C00005'; 

-- update client_master 
-- set BALDUE = 1000 where CLIENTNO = 'C00001';

-- update product_master
-- set COSTPRICE = 950.00 where DESCRIPTION ='Trousers';

-- update salesman_master
-- set CITY = 'Pune';


--> Exercise on deleting records in a table

/*
--> Delete all salesman from the salesman_master whose salaries are equal to RS.3500

delete from sales_order_details
where ORDERNO = (select ORDERNO from sales_order where SALESMANNO = (select SALESMANNO from salesman_master where SALAMT = 3500));

delete from sales_order
where SALESMANNO = (select SALESMANNO from salesman_master where SALAMT = 3500);

delete from salesman_master
where SALAMT = 3500;
*/

--> Delete all products from product_master where the quantity on hand is equal to 100.

/*
delete from sales_order_details
where PRODUCTNO In (select PRODUCTNO from product_master where QTYONHAND = 100);

delete from product_master
where QTYONHAND = 100;
*/


--> Delete from Client_master where the column state holds the value 'Tamil Nadu'.

/*
delete from sales_order_details
where ORDERNO = (select ORDERNO from sales_order 
where CLIENTNO = (select CLIENTNO from Client_master  where STATE = 'Tamil Nadu'));

delete from sales_order
where CLIENTNO = (select CLIENTNO from client_master where STATE = 'Tamil Nadu');

delete from client_master
where STATE = 'Tamil Nadu';
*/