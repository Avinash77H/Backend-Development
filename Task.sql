
create table client_master(
    client_no varchar(6) ,
    name varchar(20),
    address1 varchar(30),
    address2 varchar(30),
    city varchar(15),
    pincode numeric(8),
    state varchar(15),
    bal_due numeric(10,2),
    constraint pk_client_no primary key(client_no)
);

insert into client_master values('C00001', 'Ivan Bayross', 'A', '5', 'Mumbai', 400054, 'Maharashtra', 15000);
insert into client_master values('C00002', 'Mamta Muzumdar', 'C', '10', 'Madras', 780001, 'Tamil Nadu', 0);
insert into client_master values('C00003', 'Chhaya Bankar', 'B', '7', 'Mumbai', 400057, 'Maharashtra', 5000);
insert into client_master values('C00004', 'Ashwini Joshi', 'E', '2', 'Bangalore', 560001, 'Karnataka', 0);
insert into client_master values('C00005', 'Hansel Colaco', 'A', '2', 'Mumbai', 400060, 'Maharashtra', 2000);
insert into client_master values('C00006', 'Deepak Sharma', 'B', '3', 'Mangalore', 560050, 'Karnataka', 0);


create table product_master(
    product_no varchar(6) ,
    description varchar(15),
    profit_percent numeric(4,2),
    unit_measure varchar(10),
    qty_on_hand numeric(8),
    reorder_lvl numeric(8),
    sell_price numeric(8,2),
    cost_price numeric(8,2),
    constraint pk_product_no primary key(product_no)
);

insert into product_master values('P00001', 'T-Shirts', 5, 'Piece', 200, 50, 350, 250);
insert into product_master values('P0345', 'Shirts', 6, 'Piece', 150, 50, 500, 350);
insert into product_master values('P06734', 'Cotton Jeans', 5, 'Piece', 100, 20, 600, 450);
insert into product_master values('P07865', 'Jeans', 5, 'Piece', 100, 20, 750, 500);
insert into product_master values('P07868', 'Trousers', 2, 'Piece', 150, 50, 850, 550);
insert into product_master values('P07885', 'Pull Overs', 2.5, 'Piece', 80, 30, 700, 450);
insert into product_master values('P07965', 'Denim Shirts', 4, 'Piece', 100, 40, 350, 250);
insert into product_master values('P07975', 'Lycra Tops', 5, 'Piece', 70, 30, 300, 175);
insert into product_master values('P08865', 'Skirts', 5, 'Piece', 75, 30, 450, 300);


create table salesman_master(
    salesman_no varchar(6),
    salesman_name varchar(20),
    address1 varchar(30),
    address2 varchar(30),
    city varchar(20),
    pincode numeric(8),
    state varchar(20),
    sal_amt numeric(8,2),
    tgt_to_get numeric(6,2),
    ytd_sales numeric(6,2),
    remarks varchar(60),
    constraint pk_salesman_no primary key(salesman_no)
);

insert into salesman_master values('S00001', 'Aman', 'A/14', 'Worli', 'Mumbai', 400002, 'Maharashtra', 3000, 100, 50, 'Good');
insert into salesman_master values('S00002', 'Omkar', '65', 'Nariman', 'Mumbai', 400001, 'Maharashtra', 3000, 200, 100, 'Good');
insert into salesman_master values('S00003', 'Raj', 'P-7', 'Bandra', 'Mumbai', 400032, 'Maharashtra', 3000, 200, 100, 'Good');
insert into salesman_master values('S00004', 'Ashish', 'A/5', 'Juhu', 'Mumbai', 400044, 'Maharashtra', 3500, 200, 150, 'Good');


create table sales_order(
    order_no varchar(6),
    client_no varchar(6),
    order_date date NOT NULL,
    dely_addr varchar(25),
    salesman_no varchar(6),
    dely_type char(1),
    bill_yn char(1),
    dely_date date,
    order_status varchar(10),
    constraint pk_order_no primary key(order_no),
    CONSTRAINT CHK_order_no CHECK (order_no LIKE 'O%'),
    CONSTRAINT FK_CLIENT_ID FOREIGN KEY (client_no) REFERENCES client_master(client_no),
    CONSTRAINT FK_SALESMAN_ID FOREIGN KEY (salesman_no) REFERENCES salesman_master(salesman_no),
    CONSTRAINT CHK_order_status CHECK ((order_status = "In Process") || (order_status = "Fulfilled") || (order_status = "BackOrder") || (order_status = "Cancelled"))
);

insert into sales_order values('O19001', 'C00001', '04-06-12', 'Mumbai', 'S00001', 'F', 'N', '02-07-20', 'In Process');
insert into sales_order values('O19002', 'C00002', '04-06-25', 'Surat', 'S00002', 'P', 'N', '02-06-27', 'Cancelled');
insert into sales_order values('O46865', 'C00003', '04-02-18', 'Mumbai', 'S00003', 'F', 'Y', '02-02-20', 'Fulfilled');
insert into sales_order values('O19003', 'C00001', '04-04-03', 'Pune', 'S00001', 'F', 'Y', '02-04-07', 'Fulfilled');
insert into sales_order values('O46866', 'C00004', '04-05-20', 'Pune', 'S00002', 'P', 'N', '02-05-22', 'Cancelled');
insert into sales_order values('O19008', 'C00005', '04-05-24', 'Mumbai', 'S00004', 'F', 'N', '02-07-26', 'In Process');

create table sales_order_details(
    order_no varchar(6),
    product_no varchar(6),
    qty_ordered numeric(8),
    qty_disp numeric(8),
    product_rate numeric(10,2),
    CONSTRAINT FK_order_no FOREIGN KEY (order_no) REFERENCES sales_order(order_no),
    CONSTRAINT FK_product_no FOREIGN KEY (product_no) REFERENCES product_master(product_no)
);

insert into sales_order_details values('O19001', 'P00001', 4, 4, 525);
insert into sales_order_details values('O19001', 'P07965', 2, 1, 8400);
insert into sales_order_details values('O19001', 'P07885', 2, 1, 5250);
insert into sales_order_details values('O19002', 'P00001', 10, 0, 525);
insert into sales_order_details values('O46865', 'P07868', 3, 3, 3150);
insert into sales_order_details values('O46865', 'P07885', 3, 1, 5250);
insert into sales_order_details values('O46865', 'P00001', 10, 10, 525);
insert into sales_order_details values('O46865', 'P0345', 4, 4, 1050);
insert into sales_order_details values('O19003', 'P08865', 2, 2, 1050);
insert into sales_order_details values('O19003', 'P06734', 1, 1, 12000);
insert into sales_order_details values('O46866', 'P07965', 1, 0, 8400);
insert into sales_order_details values('O19008', 'P00001', 10, 5, 525);
insert into sales_order_details values('O19008', 'P07975', 5, 3, 1050);

----- task ------

--> Exercise on retrieving records from a table

-- select NAME from client_master;
-- select * from client_master;
-- select NAME,CITY,STATE from client_master;
-- select DESCRIPTION from product_master;
-- select NAME from client_master where CITY = 'Mumbai';
--  select salesman_name from salesman_master where sal_amt = 3000;


--> Exercise on updating records in a table

/* 

update client_master 
 set CITY = 'Bangalore' where client_no = 'C00005'; 


 update client_master 
 set bal_due = 1000 where client_no = 'C00001';

 update product_master
 set cost_price = 950.00 where DESCRIPTION ='Trousers';

 update salesman_master
 set CITY = 'Pune';

 */

--> Exercise on deleting records in a table

/*
--> Delete all salesman from the salesman_master whose salaries are equal to RS.3500

delete from sales_order_details
where ORDER_NO = (select ORDER_NO from sales_order where SALESMAN_NO = (select SALESMAN_NO from salesman_master where SAL_AMT = 3500));

delete from sales_order
where SALESMAN_NO = (select SALESMAN_NO from salesman_master where SAL_AMT = 3500);

delete from salesman_master
where SAL_AMT = 3500;
*/

--> Delete all products from product_master where the quantity on hand is equal to 100.

/*
delete from sales_order_details
where PRODUCT_NO In (select PRODUCT_NO from product_master where QTY_ON_HAND = 100);

delete from product_master
where QTY_ON_HAND = 100;
*/


--> Delete from Client_master where the column state holds the value 'Tamil Nadu'.

/*
delete from sales_order_details
where ORDER_NO = (select ORDER_NO from sales_order 
where CLIENT_NO = (select CLIENT_NO from Client_master  where STATE = 'Tamil Nadu'));

delete from sales_order
where CLIENT_NO = (select CLIENT_NO from client_master where STATE = 'Tamil Nadu');

delete from client_master
where STATE = 'Tamil Nadu';
*/


/* Join Exercise */

--> 1.Find out the product, which have been sold to 'Ivan Bayross'.

/* ANSI style*/

select pm.description,cm.name as client_name from product_master pm 
inner join sales_order_details sod on sod.product_no = pm.product_no 
inner join sales_order so on so.order_no = sod.order_no 
inner join client_master cm on cm.client_no = so.client_no 
where cm.name = 'Ivan Bayross';

+--------------+--------------+
| description  | client_name  |
+--------------+--------------+
| T-Shirts     | Ivan Bayross |
| Denim Shirts | Ivan Bayross |
| Pull Overs   | Ivan Bayross |
| Cotton Jeans | Ivan Bayross |
+--------------+--------------+


/*  Theta style */

select pm.description,cm.name as client_name from sales_order so,sales_order_details sod,product_master pm,client_master cm
where so.order_no = sod.order_no and sod.product_no = pm.product_no and cm.client_no = so.client_no and cm.name = 'Ivan Bayross';

+--------------+--------------+
| description  | client_name  |
+--------------+--------------+
| T-Shirts     | Ivan Bayross |
| Denim Shirts | Ivan Bayross |
| Pull Overs   | Ivan Bayross |
| Cotton Jeans | Ivan Bayross |
+--------------+--------------+


--> 2.Find out the products and their quantities that will have to be delivered in the current month.

    /* ANSI style */

-- here current month consider as a 06

select pm.description,so.order_no,so.order_date,sod.qty_disp,so.order_status from sales_order so 
inner join sales_order_details sod on so.order_no = sod.order_no
inner join product_master pm on pm.product_no = sod.product_no
where order_date like "%06%";

+--------------+----------+------------+----------+--------------+
| description  | order_no | order_date | qty_disp | order_status |
+--------------+----------+------------+----------+--------------+
| T-Shirts     | O19001   | 2004-06-12 |        4 | In Process   |
| Denim Shirts | O19001   | 2004-06-12 |        1 | In Process   |
| Pull Overs   | O19001   | 2004-06-12 |        1 | In Process   |
| T-Shirts     | O19002   | 2004-06-25 |        0 | Cancelled    |
+--------------+----------+------------+----------+--------------+
4 rows in set (0.00 sec)

    /* Theta style */

select pm.description,so.order_no,so.order_date,sod.qty_disp,so.order_status from sales_order so,sales_order_details sod,product_master pm
where so.order_no = sod.order_no and sod.product_no = pm.product_no
and so.order_date like "%06%";

+--------------+----------+------------+----------+--------------+
| description  | order_no | order_date | qty_disp | order_status |
+--------------+----------+------------+----------+--------------+
| T-Shirts     | O19001   | 2004-06-12 |        4 | In Process   |
| Denim Shirts | O19001   | 2004-06-12 |        1 | In Process   |
| Pull Overs   | O19001   | 2004-06-12 |        1 | In Process   |
| T-Shirts     | O19002   | 2004-06-25 |        0 | Cancelled    |
+--------------+----------+------------+----------+--------------+

--> 3.List the ProductNo and description of constantly sold products.

        /* ANSI style */

select distinct pm.description from sales_order so
inner join sales_order_details sod on so.order_no = sod.order_no
inner join product_master pm on sod.product_no = pm.product_no;

+--------------+
| description  |
+--------------+
| T-Shirts     |
| Denim Shirts |
| Pull Overs   |
| Skirts       |
| Cotton Jeans |
| Trousers     |
| Shirts       |
| Lycra Tops   |
+--------------+
8 rows in set (0.00 sec)

        /* Theta style */

select distinct pm.description from sales_order so, sales_order_details sod, product_master pm
where so.order_no = sod.order_no and sod.product_no = pm.product_no ;

+--------------+
| description  |
+--------------+
| T-Shirts     |
| Denim Shirts |
| Pull Overs   |
| Skirts       |
| Cotton Jeans |
| Trousers     |
| Shirts       |
| Lycra Tops   |
+--------------+

--> 4.Find The names of clients who have purchased 'Trousers'.

        /* ANSI style */

select pm.description,cm.name as client_name from sales_order so
inner join sales_order_details sod on so.order_no = sod.order_no
inner join product_master pm on sod.product_no = pm.product_no
inner join client_master cm on so.client_no = cm.client_no
where pm.description = 'Trousers';

+-------------+---------------+
| description | client_name   |
+-------------+---------------+
| Trousers    | Chhaya Bankar |
+-------------+---------------+
1 row in set (0.00 sec)

        /* Theta style */

select pm.description,cm.name as client_name from sales_order so,sales_order_details sod,product_master pm,client_master cm
where so.order_no = sod.order_no and pm.product_no = sod.product_no and cm.client_no = so.client_no
and description = 'Trousers';

+-------------+---------------+
| description | client_name   |
+-------------+---------------+
| Trousers    | Chhaya Bankar |
+-------------+---------------+
1 row in set (0.00 sec)

--> 5.List the Products and orders from customers who have orderded less than 5 units of 'Pull Overs'.

    /* ANSI style*/

select pm.description,cm.name as client_name,sod.qty_ordered from sales_order so
inner join sales_order_details sod on so.order_no = sod.order_no
inner join product_master pm on sod.product_no = pm.product_no
inner join client_master cm on so.client_no = cm.client_no
where pm.description = 'Pull Overs' and sod.qty_ordered < 5;

+-------------+---------------+-------------+
| description | client_name   | qty_ordered |
+-------------+---------------+-------------+
| Pull Overs  | Ivan Bayross  |           2 |
| Pull Overs  | Chhaya Bankar |           3 |
+-------------+---------------+-------------+
2 rows in set (0.00 sec)

    /* Theta style*/

select pm.description,cm.name as client_name,sod.qty_ordered from sales_order so,sales_order_details sod,product_master pm,client_master cm
where so.order_no = sod.order_no and pm.product_no = sod.product_no and cm.client_no = so.client_no
and description = 'Pull Overs' and sod.qty_ordered < 5;

+-------------+---------------+-------------+
| description | client_name   | qty_ordered |
+-------------+---------------+-------------+
| Pull Overs  | Ivan Bayross  |           2 |
| Pull Overs  | Chhaya Bankar |           3 |
+-------------+---------------+-------------+

--> 6.Find the products and their quantities for the ordered by 'Ivan Bayross' and 'Mamta Muzumdar'.

    /* ANSI style*/

select cm.name,pm.description,sod.qty_ordered from sales_order so 
inner join sales_order_details sod on so.order_no = sod.order_no
inner join product_master pm on pm.product_no = sod.product_no
inner join client_master cm on cm.client_no = so.client_no
where cm.name in ('Ivan Bayross', 'Mamta Muzumdar');

+----------------+--------------+-------------+
| name           | description  | qty_ordered |
+----------------+--------------+-------------+
| Ivan Bayross   | T-Shirts     |           4 |
| Ivan Bayross   | Denim Shirts |           2 |
| Ivan Bayross   | Pull Overs   |           2 |
| Ivan Bayross   | Skirts       |           2 |
| Ivan Bayross   | Cotton Jeans |           1 |
| Mamta Muzumdar | T-Shirts     |          10 |
+----------------+--------------+-------------+
6 rows in set (0.00 sec)

    /* Theta style*/

select cm.name,pm.description,sod.qty_ordered from sales_order so, sales_order_details sod,product_master pm,client_master cm
where so.order_no = sod.order_no and sod.product_no = pm.product_no and so.client_no = cm.client_no
and cm.name in ('Ivan Bayross', 'Mamta Muzumdar');

+----------------+--------------+-------------+
| name           | description  | qty_ordered |
+----------------+--------------+-------------+
| Ivan Bayross   | T-Shirts     |           4 |
| Ivan Bayross   | Denim Shirts |           2 |
| Ivan Bayross   | Pull Overs   |           2 |
| Ivan Bayross   | Skirts       |           2 |
| Ivan Bayross   | Cotton Jeans |           1 |
| Mamta Muzumdar | T-Shirts     |          10 |
+----------------+--------------+-------------+
6 rows in set (0.00 sec)

--> 7. Find the products and their quantities for the ordered placed by ClientNo 'C00001' and 'C00002'.

    /* ANSI Style */
select cm.name,pm.description,sod.qty_ordered from sales_order so 
inner join sales_order_details sod on so.order_no = sod.order_no
inner join product_master pm on pm.product_no = sod.product_no
inner join client_master cm on cm.client_no = so.client_no
where so.client_no in ('C00001','C00002');

+----------------+--------------+-------------+
| name           | description  | qty_ordered |
+----------------+--------------+-------------+
| Ivan Bayross   | T-Shirts     |           4 |
| Ivan Bayross   | Denim Shirts |           2 |
| Ivan Bayross   | Pull Overs   |           2 |
| Ivan Bayross   | Skirts       |           2 |
| Ivan Bayross   | Cotton Jeans |           1 |
| Mamta Muzumdar | T-Shirts     |          10 |
+----------------+--------------+-------------+
6 rows in set (0.00 sec)


    /* Theta Style */

select cm.name,pm.description,sod.qty_ordered from sales_order so, sales_order_details sod,product_master pm,client_master cm
where so.order_no = sod.order_no and sod.product_no = pm.product_no and so.client_no = cm.client_no
and cm.client_no in ('C00001','C00002');

+----------------+--------------+-------------+
| name           | description  | qty_ordered |
+----------------+--------------+-------------+
| Ivan Bayross   | T-Shirts     |           4 |
| Ivan Bayross   | Denim Shirts |           2 |
| Ivan Bayross   | Pull Overs   |           2 |
| Ivan Bayross   | Skirts       |           2 |
| Ivan Bayross   | Cotton Jeans |           1 |
| Mamta Muzumdar | T-Shirts     |          10 |
+----------------+--------------+-------------+
6 rows in set (0.00 sec)

