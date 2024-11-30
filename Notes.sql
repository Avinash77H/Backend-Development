--  22/11/2024 
-- window + R
-- cmd 
-- mysql -u root -p
-> default user/main admin
-- password:admin@1234

-- mysql >
-> above sentance called a prompt

=> show databases exists in your user
-- show databases;

+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sakila             |
| sys                |
| test               |
| world              |
+--------------------+
7 rows in set (0.12 sec)

=> for create databases

-- create database <db-name>

=> for to to  inside exists database
-- use <db-name>

-- -- Date:23.11.2024 -- --

=> for create table
--  create table <tb-name>(col1 dataType(length)...);

mysql>  create table student(
    -> sid varchar(5),
    ->  sname varchar(10));
Query OK, 0 rows affected (0.12 sec)

=> show schema of exists table
-- desc student;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| sid   | varchar(5)  | YES  |     | NULL    |       |
| sname | varchar(10) | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
2 rows in set (0.01 sec)

=> insert data into exist table
-- insert into student (col1 , col2) values '11','avinash');
-- insert into student values ('11','avinash');
 Query OK, 1 row affected (0.01 sec) 

 => create table student1 (sid varchar(10) primary key,
    sname varchar(20)
 );

-- insert into student1 values ('11','avinash'),('11','avinash');


-- mysql> insert into student1 values
--     ->     ('11','avinash'),
--     ->     ('11','avinash');
-- => ERROR 1062 (23000): Duplicate entry '11' for key 'student1.PRIMARY;

=> composite key :- combination of multiple uniq column

==> create a composite key

/* create table student2(
      sid varchar(5),
      sname varchar(10),
      scontact varchar(10),
      PRIMARY KEY (sid,sname)
    ); 
*/    

Query OK, 0 rows affected (0.02 sec)

-- desc student2;

+----------+-------------+------+-----+---------+-------+
| Field    | Type        | Null | Key | Default | Extra |
+----------+-------------+------+-----+---------+-------+
| sid      | varchar(5)  | NO   | PRI | NULL    |       |
| sname    | varchar(10) | NO   | PRI | NULL    |       |
| scontact | varchar(10) | YES  |     | NULL    |       |
+----------+-------------+------+-----+---------+-------+
3 rows in set (0.00 sec)


-- -- 25.11.2024 

-- mysql> select * from stud1;

+----+----------+
| id | name     |
+----+----------+
|  1 | avinash  |
|  2 | milan    |
|  3 | sagar    |
|  4 | rahul    |
|  5 | salman   |
|  6 | abhishek |
+----+----------+
6 rows in set (0.00 sec)

-- -- where clause

-- mysql> select * from stud1
    --    where name = 'avinash'; 

+----+---------+
| id | name    |
+----+---------+
|  1 | avinash |
+----+---------+
1 row in set (0.00 sec)

-- delete row

-- mysql> delete from stud1 where name = 'sagar';
    Query OK, 1 row affected (0.00 sec)

-- mysql> select * from stud1;
+----+----------+
| id | name     |
+----+----------+
|  1 | avinash  |
|  2 | milan    |
|  4 | rahul    |
|  5 | salman   |
|  6 | abhishek |
+----+----------+
5 rows in set (0.00 sec)

-- -- like predicate 

--> first char a
-- mysql> select * from stud1 where name like 'a%';
+----+----------+
| id | name     |
+----+----------+
|  1 | avinash  |
|  6 | abhishek |
+----+----------+
2 rows in set (0.00 sec)

--> last char n
-- mysql> select * from stud1 where name like '%n';
+----+--------+
| id | name   |
+----+--------+
|  2 | milan  |
|  5 | salman |
+----+--------+
2 rows in set (0.00 sec)

--> second char a
-- mysql> select * from stud1 where name like '_a%';
+----+--------+
| id | name   |
+----+--------+
|  4 | rahul  |
|  5 | salman |
+----+--------+
2 rows in set (0.00 sec)

--> second last char a
-- mysql> select * from stud1 where name like '%a_';
+----+--------+
| id | name   |
+----+--------+
|  2 | milan  |
|  5 | salman |
+----+--------+
2 rows in set (0.00 sec)




--  mysql> select * from stud1;
+----+----------+
| id | name     |
+----+----------+
|  1 | avinash  |
|  2 | milan    |
|  4 | rahul    |
|  5 | salman   |
|  6 | abhishek |
+----+----------+
5 rows in set (0.00 sec)

-- mysql>  select * from stud2;
+----+----------+------------+
| id | name     | contact    |
+----+----------+------------+
|  1 | abhishek | 9917887987 |
|  2 | avinash  | 9917887987 |
|  3 | chetan   | 9917887987 |
|  4 | arpit    | 9917887987 |
|  5 | divyesh  | 9917887987 |
|  6 | darshan  | 9917887987 |
|  7 | smit     | 9917887987 |
+----+----------+------------+
7 rows in set (0.00 sec)

-- mysql>  select * from stud3;
+----+----------+----------+
| id | name     | city     |
+----+----------+----------+
|  1 | abhishek | junagadh |
|  2 | avinash  | junagadh |
|  3 | chetan   | amreli   |
|  4 | arpit    | surat    |
|  5 | divyesh  | surat    |
|  6 | darshan  | rajkot   |
|  7 | smit     | somnath  |
+----+----------+----------+
7 rows in set (0.00 sec)

-- -- -- delete table,truncate table and drop table

--> delete table

mysql> delete from stud1;
Query OK, 5 rows affected (0.00 sec)

mysql> desc stud1;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| id    | int         | NO   | PRI | NULL    |       |
| name  | varchar(20) | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
2 rows in set (0.00 sec)

mysql> select * from stud1;
Empty set (0.00 sec)


--> truncate table

mysql> truncate table stud2;
Query OK, 0 rows affected (0.05 sec)

mysql> desc stud2;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| id      | int         | NO   | PRI | NULL    |       |
| name    | varchar(20) | YES  |     | NULL    |       |
| contact | varchar(10) | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
3 rows in set (0.00 sec)

mysql> select * from stud2;
Empty set (0.00 sec)


--> drop table 

mysql> drop table stud3;
Query OK, 0 rows affected (0.01 sec)

mysql> desc stud3;
ERROR 1146 (42S02): Table 'test.stud3' doesnt exist

mysql> select * from stud3;
ERROR 1146 (42S02): Table 'test.stud3' doesnt exist

-- select * from stud1;
-- select * from stud2;

mysql> select * from stud1;
Empty set (0.00 sec)

mysql> select * from stud2;
Empty set (0.00 sec)

mysql> select * from stud3;
ERROR 1146 (42S02): Table 'test.stud3' doesnt exist



/*
    insert into student1
    (id,name,marks)
    values
    (1,'avinash',77),
    (2,'milan',null),
    (3,'ugam',80),
    (4,'brij',100),
    (5,'swati',90);
*/

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
('P06734','Cotton Jeans',5,'Piece',100,20,600,450),
('P07865','Jeans',5,'Piece',100,20,750,500),
('P07868','Trousers',2,'Piece',150,50,850,550),
('P07885','Pull Overs',2.5,'Piece',80,30,700,450),
('P07965','Denim Shirts',4,'Piece',100,40,350,250),
('P07975','Lycra Tops',5,'Piece',70,30,300,175),
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