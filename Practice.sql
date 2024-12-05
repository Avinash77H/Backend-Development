--- update ---
update
  student1
set
  sname = 'rima'
where
  sid = 's005';

create table student1(
  sid varchar(20),
  sname varchar(20),
  city varchar(20),
  constraint s_pk primary key(sid),
  constraint chk_sid check (sid like 'S%')
);

insert into
  student1
values
  ('s001', 'avinash', 'junagadh'),
  ('s002', 'ugam', 'visavadar'),
  ('s003', 'milan', 'kalsari'),
  ('s004', 'chetan', 'amareli'),
  ('s005', 'abhishek', 'bhamariya');

alter table
  student1
add
  email varchar(20);

update
  student1
set
  email = 'rima@gmail.com'
where
  sname = 'rima';

update
  student1
set
  email = 'milan@gmail.com'
where
  sname = 'milan';

update
  student1
set
  email = 'chetan@gmail.com'
where
  sname = 'chetan';

create table course(
  cid varchar(20),
  cname varchar(20),
  duration int,
  constraint c_pk primary key(cid),
  constraint chk_cid check (cid like 'C%')
);

insert into
  course
values
  ('06', 'SQL', 0.15);

insert into
  course
values
  ('c01', 'javascript', 2),
  ('c02', 'DSA', 8),
  ('c03', 'c++', 2),
  ('c04', 'html', 1),
  ('c05', 'css', 1);

create table registered_student(
  rsid varchar(20),
  rcid varchar(20),
  constraint rstudent_id foreign key(rsid) references student1(sid),
  constraint rcourse_id foreign key(rcid) references course(cid)
);

alter table
  registered_student
add
  primary key(rsid, rcid);

insert into
  registered_student
values
  ('s001', 'c01'),
  ('s001', 'c02');

insert into
  registered_student
values
  ('s001', 'c04'),
  ('s001', 'c05'),
  ('s002', 'c02'),
  ('s002', 'c01');

select
  cname
from
  course
where
  cid in (
    select
      rcid
    from
      registered_student
    where
      rsid = 's001'
  );

select
  cname
from
  course
where
  cid in (
    select
      rcid
    from
      registered_student
    where
      rsid = 's002'
  );

create table employee(
  empId int primary key,
  name varchar(20),
  age int,
  salary float(7, 2)
);

insert into
  employee (empId, name, age, salary)
values
  (007, 'sahil', 38, 55000.00),
  (003, 'ugam', 17, 90000.00),
  (004, 'chetan', null, 15000.00),
  (005, 'abhishek', 10, 44000.00);

update
  employee
set
  salary = (0.1 * salary) + salary -- set salary = salary * 1.10
where
  age > 38;


  ----- 03.12.2024 -----

  create table student(
    id int primary key,
    name varchar(20),
    marks int 
  );

  insert into student
  (id,name,marks)
  values
  (1,'avinash',77),
  (2,'milan',98),
  (3,'ugam',88),
  (4,'chetan',86),
  (6,'smit',50),
  (7,'javed',35),
  (8,'rima',60);

  create table course(
    id int primary key,
    cname varchar(20)
  );

  insert into course
  values
  (1,'html'),
  (2,'css'),
  (3,'javascript'),
  (4,'react'),
  (5,'mysql');

  create table batch(
    bid int primary key,
    stdid int ,
    cid int,
    constraint student_id foreign key(stdid) references  student(id),
    constraint course_id foreign key(cid)
    references course(id)
  );

  insert into batch
  values
  (01,2,1),
  (02,1,3),
  (03,2,3),
  (04,7,5);

  select * from student
  inner join course
  on student.id = course.id;

  ---- 04.12.2024 ---- 
  
  ---> inner join

  /*
    select columns from table1
    inner join from table2
    to table1.column_name = table2.column_name
    where .....
    order by .....; 
  */

    create table city(
    cid varchar(20) primary key,
    cname varchar(20)
  );

  insert into city
  (cid,cname)
  values
  ('c1','junagadh'),
  ('c2','delhi'),
  ('c3','visavadar'),
  ('c4','amareli'),
  ('c5','rajkot'),
  ('c6','surat'),
  ('c7','ankleshwar');

  create table student(
    sid int primary key,
    name varchar(200),
    age int,
    city varchar(20),
    constraint city_name foreign key(city) references city(cid)
  );

  insert into student
  (sid,name,age,city)
  values
  (101,'avinash',24,'c1'),
  (102,'ugam',25,'c2'),
  (104,'sahil',20,null),
  (105,'mehul',30,'c7'),
  (106,'vinayak',32,null);

select s.sid,s.name,s.age,cname from student as s   
left join city
on s.city = city.cid;

select * from student as s   
left join city
on s.city = city.cid;

select * from student as s   
right join city
on s.city = city.cid
order by cname;


---- 05.12.2024 ----

  /* inner join or join */
select s.sid , s.name ,s.age,c.cname from student as S
 join city as C
on s.city = c.cid
order by c.cid;

  /* left join */

  select * from student
  left join city
  on student.city = city.cid
  order by name;

  /* right join */

  select * from student
  right join city 
  on student.city = city.cid
  order by city.cname;

  /* cross join*/

  select * from student 
  cross join city;


 --- city table ---

  create table city(
    cid int ,
    city varchar(20),
    constraint pk_city_id primary key(cid)
  );

  insert into city
  values
  (1,'Agra'),
  (2,'Bhopal'),
  (3,'Delhi'),
  (4,'Noida');

  --- courses table ---

  create table courses(
    crid int,
    course varchar(20),
    constraint pk_course_id primary key(crid)
  );

  insert into courses
  values
  (1,'Btech'),
  (2,'BCA'),
  (3,'BBA');


 --- student table ----
 create table student(
  id int,
  name varchar(20),
  age int ,
  courses int,
  city int,
  constraint pk_student_id primary key(id),
   constraint fk_student_courses foreign key(courses) references courses(crid),
  constraint fk_student_city foreign key(city) references city(cid)
 );

 insert into student
 values
 (1,'Ram Kumar',19,1,1),
 (2,'Salman Khan',18,3,2),
 (3,'Meera Khan',19,1,1),
 (4,'Sarita Kumari',21,2,3);

 ---- multiple table join ---- 

 select s.id,s.name,s.age,cr.course,c.city from student s
 inner join courses cr
 on s.courses = cr.crid
 inner join city C
 on s.city = c.cid
 order by s.name;

 select c.city,count(s.city) as total from student s
 inner join city c
 on s.city = c.cid
 group by city
 having total > 1;
