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

----- 29.11.2024 -----

create table course(
    c_id varchar(10),
    c_name varchar(20),
    primary key (c_id)
);

insert into course
values
('C001','Web Development'),
('C002','App Development'),
('C003','Spoken English'),
('C004','UX-design'),
('C005','Dev-ops');



create table student(
    s_id varchar(10),
    s_name varchar(20),
    primary key(s_id)
);

insert into student
values
('S001','avinash'),
('S002','milan'),
('S003','ugam'),
('S004','sagar'),
('S005','prakash'),
('S006','chetan'),
('S007','girish');



create table conf_student(
    id varchar(10),
    s_id varchar(10),
    c_id varchar(10),
    constraint pk primary key(id),
    constraint fk_stud foreign key(s_id) references student(s_id),
    constraint fk_course foreign key(c_id) references course(c_id),
    constraint chk_id check (id like 'C%')
);

--> Here pk,fk_stud,fk_course and chk_id is called matadata.
--> Error Messages: If a constraint is violated, the database will reference the constraint name in the error message (e.g., "Violation of foreign key constraint fk_stud").
--> Database Management: These names make it easier for developers and database administrators to identify, modify, or drop specific constraints.







