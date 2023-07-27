Create database unite;
use unite;

create table users(
  id Int auto_increment primary key,
  name varchar(50) not null,
  email varchar(50) not null,
  password varchar(50) not null
);

