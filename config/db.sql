CREATE TABLE USERS(
    id int unsigned auto_increment primary key,
    email varchar(100),
    name varchar(250),
    password varchar(250)
);

CREATE TABLE colors(
    id int unsigned auto_increment primary key,
    color1 varchar(100),
    color2 varchar(100),
    color3 varchar(100),
    color4 varchar(100),
    name_colors varchar(250),
    id_user int unsigned,
    foreign key (id_user) references USERS(id)
);
