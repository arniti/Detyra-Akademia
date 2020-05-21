create table Users 
(
	User_ID int primary key not null AUTO_INCREMENT,
    LastName varchar(50) not null,
    FirstName varchar(50) not null,
    Email varchar(50) not null
)

create table Products 
(
	Prod_ID int primary key not null AUTO_INCREMENT,
    ProductName varchar(50) not null,
    Manufacturer varchar(50) not null,
    Price float not null
)

create table sales
(
	User_ID int, 
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID),
	Prod_ID int,
    FOREIGN KEY (Prod_ID) REFERENCES Products(Prod_ID)
)
select * from Products
select * from Users
select * from sales
