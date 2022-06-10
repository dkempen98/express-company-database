INSERT INTO departments (name)
VALUES ('Shipping'),
       ('Development'),
       ('Finance'),
       ('Advertising');

INSERT INTO roles (job_title, salary, department_id)
VALUES ('Delivery Person', 45000, 1),
       ('Loader', 35000, 1),
       ('Senior Dev', 60000, 2),
       ('Junior Dev', 45000, 2),
       ('Accountant', 60000, 3),
       ('Secretary', 35000, 3),
       ('Senior Marketing', 55000, 4),
       ('Junior Marketing', 40000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id, is_manager)
VALUES ('Jose', 'Ramirez', 1, 1, true),
       ('Austin', 'Hedges', 1, 1, false),
       ('Miles', 'Straw', 2, 3, true),
       ('Emmanuel', 'Classe', 2, 3, false),
       ('Shane', 'Bieber', 3, 6, true),
       ('Cal', 'Quantrill', 3, 6, false),
       ('Josh', 'Naylor', 4, 6, false),
       ('Steven', 'Kwan', 4, 6, false),
       ('Tom', 'Hamilton', 5, 10, true),
       ('Terry', 'Francona', 5, 10, false),
       ('Sandy', 'Alomar Jr.', 6, 10, false),
       ('Owen', 'Miller', 7, 10, false),
       ('Triston', 'McKenzie', 8, 10, false)
