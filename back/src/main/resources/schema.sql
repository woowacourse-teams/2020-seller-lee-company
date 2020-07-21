DROP TABLE IF EXISTS article;

create table article (
  id int auto_increment primary key ,
  title varchar(250) not null ,
  category varchar(250)  not null ,
  price long not null ,
  contents varchar(250) not null ,
  images varchar(250) not null ,
  tags varchar(250) not null
);