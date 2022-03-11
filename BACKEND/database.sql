CREATE DATABASE QUANLYNHANVIEN


CREATE TABLE departments(
    department_id SERIAL PRIMARY KEY,
    department varchar(100) UNIQUE NOT NULL
)


CREATE TABLE employees(
    employee_id SERIAL PRIMARY KEY,
    firstname varchar(50),
    lastname varchar(50) NOT NULL,
    email varchar(50) UNIQUE,
    department_id SERIAL REFERENCES departments(department_id)
)

CREATE TABLE users( 
    user_id SERIAL PRIMARY KEY,
    user_name varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL,
    employee_id SERIAL REFERENCES employees(employee_id)
)

INSERT INTO users (user_id, user_name, user_password)
VALUES (1, 'admin', 'admin');

INSERT INTO departments (department)
VALUES('Front-end')