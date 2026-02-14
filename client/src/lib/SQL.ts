export const SQL = [
  // DQL (Data Query Language)
  {
    id: "select",
    name: "SELECT",
    category: "DQL (Data Query Language)",
    description: "Выбирает данные из базы данных.",
    syntax: "SELECT column1, column2, ... FROM table_name;",
    example: "SELECT * FROM employees;",
    arguments: [
      {
        name: "column1, column2, ...",
        description: "Имена столбцов, данные из которых нужно извлечь.",
        example: "SELECT first_name, last_name FROM employees;",
      },
      {
        name: "*",
        description: "Выбирает все столбцы из таблицы.",
        example: "SELECT * FROM products;",
      },
      {
        name: "expression",
        description: "Выражение или расчетное поле.",
        example: "SELECT name, price * 1.1 AS new_price FROM products;",
      },
    ],
  },
  {
    id: "from",
    name: "FROM",
    category: "DQL (Data Query Language)",
    description: "Указывает таблицу, из которой извлекаются данные.",
    syntax: "SELECT columns FROM table_name;",
    example: "SELECT name FROM departments;",
    arguments: [
      {
        name: "table_name",
        description: "Имя таблицы в базе данных.",
        example: "SELECT * FROM sales;",
      },
      {
        name: "alias",
        description: "Псевдоним таблицы для краткости или при объединении.",
        example: "SELECT e.name FROM employees AS e;",
      },
      {
        name: "subquery",
        description:
          "Подзапрос, результат которого используется как временная таблица.",
        example: "SELECT * FROM (SELECT id FROM users) AS t;",
      },
    ],
  },
  {
    id: "where",
    name: "WHERE",
    category: "DQL (Data Query Language)",
    description: "Фильтрует записи на основе заданного условия.",
    syntax: "SELECT columns FROM table WHERE condition;",
    example: "SELECT * FROM users WHERE age > 18;",
    arguments: [
      {
        name: "condition",
        description: "Логическое выражение для фильтрации.",
        example: "WHERE status = 'active'",
      },
      {
        name: "AND / OR",
        description: "Логические операторы для комбинирования условий.",
        example: "WHERE price > 100 AND stock < 10",
      },
      {
        name: "BETWEEN",
        description: "Фильтр по диапазону значений.",
        example: "WHERE salary BETWEEN 30000 AND 50000",
      },
    ],
  },
  {
    id: "group_by",
    name: "GROUP BY",
    category: "DQL (Data Query Language)",
    description:
      "Группирует строки, имеющие одинаковые значения в указанных столбцах.",
    syntax:
      "SELECT column, aggregate_function(column) FROM table GROUP BY column;",
    example: "SELECT department, COUNT(*) FROM employees GROUP BY department;",
    arguments: [
      {
        name: "column",
        description: "Столбец, по которому производится группировка.",
        example: "GROUP BY category",
      },
      {
        name: "expression",
        description: "Выражение для группировки.",
        example: "GROUP BY EXTRACT(YEAR FROM order_date)",
      },
      {
        name: "multiple columns",
        description: "Группировка по нескольким полям.",
        example: "GROUP BY region, city",
      },
    ],
  },
  {
    id: "having",
    name: "HAVING",
    category: "DQL (Data Query Language)",
    description:
      "Фильтрует сгруппированные данные (используется вместе с GROUP BY).",
    syntax:
      "SELECT column, aggregate FROM table GROUP BY column HAVING condition;",
    example:
      "SELECT dept, AVG(salary) FROM emp GROUP BY dept HAVING AVG(salary) > 5000;",
    arguments: [
      {
        name: "condition",
        description: "Условие, применяемое к результату агрегации.",
        example: "HAVING COUNT(*) > 1",
      },
      {
        name: "aggregate function",
        description: "Использование функций в условии.",
        example: "HAVING SUM(total) > 1000",
      },
      {
        name: "combined conditions",
        description: "Несколько условий для групп.",
        example: "HAVING MIN(price) > 10 AND MAX(price) < 100",
      },
    ],
  },
  {
    id: "distinct",
    name: "DISTINCT",
    category: "DQL (Data Query Language)",
    description: "Возвращает только уникальные значения из столбца.",
    syntax: "SELECT DISTINCT column FROM table;",
    example: "SELECT DISTINCT city FROM customers;",
    arguments: [
      {
        name: "column",
        description: "Столбец, для которого нужны уникальные значения.",
        example: "SELECT DISTINCT category FROM products;",
      },
      {
        name: "multiple columns",
        description: "Уникальные комбинации значений нескольких столбцов.",
        example: "SELECT DISTINCT city, country FROM users;",
      },
      {
        name: "with count",
        description: "Подсчет количества уникальных записей.",
        example: "SELECT COUNT(DISTINCT role) FROM accounts;",
      },
    ],
  },
  {
    id: "order_by",
    name: "ORDER BY",
    category: "DQL (Data Query Language)",
    description: "Сортирует результирующий набор данных.",
    syntax: "SELECT columns FROM table ORDER BY column [ASC | DESC];",
    example: "SELECT * FROM products ORDER BY price DESC;",
    arguments: [
      {
        name: "ASC",
        description: "Сортировка по возрастанию (по умолчанию).",
        example: "ORDER BY name ASC",
      },
      {
        name: "DESC",
        description: "Сортировка по убыванию.",
        example: "ORDER BY created_at DESC",
      },
      {
        name: "multiple columns",
        description: "Сортировка по нескольким столбцам последовательно.",
        example: "ORDER BY category ASC, price DESC",
      },
    ],
  },
  {
    id: "limit",
    name: "LIMIT",
    category: "DQL (Data Query Language)",
    description: "Ограничивает количество возвращаемых строк.",
    syntax: "SELECT columns FROM table LIMIT count;",
    example: "SELECT * FROM articles LIMIT 5;",
    arguments: [
      {
        name: "count",
        description: "Максимальное количество строк для вывода.",
        example: "LIMIT 10",
      },
      {
        name: "with offset",
        description: "Пропуск первых строк (в некоторых СУБД).",
        example: "LIMIT 10 OFFSET 20",
      },
      {
        name: "expression",
        description: "Выражение, возвращающее число (в расширенных диалектах).",
        example: "LIMIT (SELECT page_size FROM settings)",
      },
    ],
  },
  {
    id: "offset",
    name: "OFFSET",
    category: "DQL (Data Query Language)",
    description:
      "Пропускает указанное количество строк перед выводом результата.",
    syntax: "SELECT columns FROM table LIMIT count OFFSET offset_count;",
    example: "SELECT * FROM logs OFFSET 100;",
    arguments: [
      {
        name: "offset_count",
        description: "Количество пропускаемых строк.",
        example: "OFFSET 50",
      },
      {
        name: "with limit",
        description: "Используется для пагинации.",
        example: "LIMIT 20 OFFSET 40",
      },
      {
        name: "FETCH NEXT",
        description: "Стандарт SQL (ISO) для смещения.",
        example: "OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY",
      },
    ],
  },
  // DML (Data Manipulation Language)
  {
    id: "insert",
    name: "INSERT",
    category: "DML (Data Manipulation Language)",
    description: "Добавляет новые строки в таблицу.",
    syntax:
      "INSERT INTO table_name (column1, column2) VALUES (value1, value2);",
    example:
      "INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');",
    arguments: [
      {
        name: "INTO table_name",
        description: "Имя таблицы для вставки данных.",
        example: "INSERT INTO products ...",
      },
      {
        name: "(columns)",
        description: "Список столбцов (необязательно, если заполняются все).",
        example: "INSERT INTO tags (name) ...",
      },
      {
        name: "VALUES",
        description: "Набор значений для вставки.",
        example: "VALUES ('Red'), ('Green'), ('Blue')",
      },
    ],
  },
  {
    id: "update",
    name: "UPDATE",
    category: "DML (Data Manipulation Language)",
    description: "Изменяет существующие данные в таблице.",
    syntax: "UPDATE table_name SET column1 = value1 WHERE condition;",
    example: "UPDATE users SET status = 'active' WHERE id = 1;",
    arguments: [
      {
        name: "SET",
        description: "Указывает столбцы и их новые значения.",
        example: "SET price = price * 1.05",
      },
      {
        name: "WHERE",
        description:
          "Условие для выбора обновляемых строк (ВАЖНО: без него обновятся все строки).",
        example: "WHERE category = 'Sale'",
      },
      {
        name: "multiple columns",
        description: "Обновление нескольких полей сразу.",
        example: "SET city = 'Omsk', region = 'Omsk Region'",
      },
    ],
  },
  {
    id: "delete",
    name: "DELETE",
    category: "DML (Data Manipulation Language)",
    description: "Удаляет строки из таблицы.",
    syntax: "DELETE FROM table_name WHERE condition;",
    example: "DELETE FROM users WHERE last_login < '2023-01-01';",
    arguments: [
      {
        name: "FROM table_name",
        description: "Имя таблицы, из которой удаляются данные.",
        example: "DELETE FROM temporary_logs",
      },
      {
        name: "WHERE",
        description: "Условие для удаления конкретных строк.",
        example: "WHERE id = 105",
      },
      {
        name: "TRUNCATE",
        description:
          "Альтернатива для полной очистки таблицы (быстрее DELETE).",
        example: "TRUNCATE TABLE logs;",
      },
    ],
  },
  {
    id: "lock",
    name: "LOCK",
    category: "DML (Data Manipulation Language)",
    description: "Ограничивает доступ к таблице для других транзакций.",
    syntax: "LOCK TABLE table_name IN lock_mode MODE;",
    example: "LOCK TABLE employees IN EXCLUSIVE MODE;",
    arguments: [
      {
        name: "table_name",
        description: "Имя таблицы для блокировки.",
        example: "LOCK TABLE inventory",
      },
      {
        name: "lock_mode",
        description: "Тип блокировки (ACCESS SHARE, EXCLUSIVE и др.).",
        example: "IN SHARE MODE",
      },
      {
        name: "NOWAIT",
        description:
          "Ошибка, если блокировка не может быть получена немедленно.",
        example: "LOCK TABLE orders NOWAIT",
      },
    ],
  },
  {
    id: "call",
    name: "CALL",
    category: "DML (Data Manipulation Language)",
    description: "Выполняет хранимую процедуру.",
    syntax: "CALL procedure_name(arguments);",
    example: "CALL process_orders('2024-01-01');",
    arguments: [
      {
        name: "procedure_name",
        description: "Имя вызываемой процедуры.",
        example: "CALL update_statistics()",
      },
      {
        name: "arguments",
        description: "Параметры, передаваемые в процедуру.",
        example: "CALL calculate_bonus(101, 500)",
      },
      {
        name: "IN/OUT",
        description: "Типы параметров в процедуре.",
        example: "CALL get_user_count(count_variable)",
      },
    ],
  },
  {
    id: "merge",
    name: "MERGE",
    category: "DML (Data Manipulation Language)",
    description:
      "Выполняет вставку, обновление или удаление в зависимости от условия соответствия (UPSERT).",
    syntax:
      "MERGE INTO target USING source ON condition WHEN MATCHED THEN UPDATE ... WHEN NOT MATCHED THEN INSERT ...",
    example:
      "MERGE INTO active_users a USING daily_login d ON (a.id = d.id) WHEN MATCHED THEN UPDATE SET last_login = d.login_time WHEN NOT MATCHED THEN INSERT (id, last_login) VALUES (d.id, d.login_time);",
    arguments: [
      {
        name: "USING",
        description: "Источник данных для сопоставления.",
        example: "USING updates_table",
      },
      {
        name: "WHEN MATCHED",
        description: "Действие, если запись найдена.",
        example: "THEN UPDATE SET status = 'updated'",
      },
      {
        name: "WHEN NOT MATCHED",
        description: "Действие, если запись не найдена.",
        example: "THEN INSERT VALUES (...)",
      },
    ],
  },
  // DCL (Data Control Language)
  {
    id: "grant",
    name: "GRANT",
    category: "DCL (Data Control Language)",
    description:
      "Предоставляет пользователям разрешения на доступ к базе данных или ее объектам.",
    syntax: "GRANT privilege_name ON object_name TO user_name;",
    example: "GRANT SELECT, INSERT ON employees TO analyst_user;",
    arguments: [
      {
        name: "privilege_name",
        description: "Тип разрешения (SELECT, UPDATE, ALL PRIVILEGES и т.д.).",
        example: "GRANT ALL ON products ...",
      },
      {
        name: "object_name",
        description: "Имя таблицы, представления или другого объекта.",
        example: "GRANT UPDATE ON prices ...",
      },
      {
        name: "TO user_name",
        description: "Имя пользователя или роль, которой дается доступ.",
        example: "TO sales_manager",
      },
    ],
  },
  {
    id: "revoke",
    name: "REVOKE",
    category: "DCL (Data Control Language)",
    description: "Озывает ранее предоставленные разрешения у пользователей.",
    syntax: "REVOKE privilege_name ON object_name FROM user_name;",
    example: "REVOKE DELETE ON customers FROM clerk_user;",
    arguments: [
      {
        name: "privilege_name",
        description: "Разрешение, которое нужно отозвать.",
        example: "REVOKE INSERT ON orders ...",
      },
      {
        name: "object_name",
        description: "Объект, доступ к которому ограничивается.",
        example: "REVOKE ALL ON secrets ...",
      },
      {
        name: "FROM user_name",
        description: "Пользователь или роль, у которой отбирается доступ.",
        example: "FROM guest_role",
      },
    ],
  },
  // TCL (Transaction Control Language)
  {
    id: "begin_transaction",
    name: "BEGIN TRANSACTION",
    category: "TCL (Transaction Control Language)",
    description:
      "Открывает новую транзакцию. Все последующие изменения будут временными до завершения.",
    syntax: "BEGIN TRANSACTION; -- или просто BEGIN;",
    example: "BEGIN; UPDATE accounts SET balance = balance - 100 WHERE id = 1;",
    arguments: [
      {
        name: "ISOLATION LEVEL",
        description: "Уровень изоляции транзакции.",
        example: "BEGIN ISOLATION LEVEL SERIALIZABLE;",
      },
      {
        name: "READ ONLY / WRITE",
        description: "Режим доступа транзакции.",
        example: "BEGIN READ ONLY;",
      },
      {
        name: "NAME",
        description: "Имя транзакции (в некоторых СУБД).",
        example: "BEGIN TRANSACTION TransferMoney;",
      },
    ],
  },
  {
    id: "commit",
    name: "COMMIT",
    category: "TCL (Transaction Control Language)",
    description:
      "Сохраняет все изменения, сделанные в текущей транзакции, и завершает ее.",
    syntax: "COMMIT; -- или COMMIT TRANSACTION;",
    example: "UPDATE orders SET status = 'Paid' WHERE id = 50; COMMIT;",
    arguments: [
      {
        name: "WORK",
        description: "Необязательное ключевое слово для совместимости.",
        example: "COMMIT WORK;",
      },
      {
        name: "AND CHAIN",
        description: "Сразу начинает новую транзакцию с теми же параметрами.",
        example: "COMMIT AND CHAIN;",
      },
      {
        name: "TRANSACTION name",
        description: "Завершение именованной транзакции.",
        example: "COMMIT TRANSACTION T1;",
      },
    ],
  },
  {
    id: "rollback",
    name: "ROLLBACK",
    category: "TCL (Transaction Control Language)",
    description: "Отменяет все изменения текущей транзакции и завершает ее.",
    syntax: "ROLLBACK; -- или ROLLBACK TRANSACTION;",
    example:
      "DELETE FROM users; -- Ошибка! ROLLBACK; -- Все пользователи восстановлены.",
    arguments: [
      {
        name: "WORK",
        description:
          "Ключевое слово для синтаксического соответствия стандарту.",
        example: "ROLLBACK WORK;",
      },
      {
        name: "AND CHAIN",
        description: "Отмена и мгновенное открытие новой транзакции.",
        example: "ROLLBACK AND CHAIN;",
      },
      {
        name: "FORCE",
        description: "Принудительный откат (в некоторых корпоративных СУБД).",
        example: "ROLLBACK FORCE '2.15.34';",
      },
    ],
  },
  {
    id: "savepoint",
    name: "SAVEPOINT",
    category: "TCL (Transaction Control Language)",
    description:
      "Создает точку сохранения внутри транзакции, к которой можно будет откатиться.",
    syntax: "SAVEPOINT savepoint_name;",
    example:
      "INSERT INTO logs VALUES ('Step 1'); SAVEPOINT sp1; INSERT INTO logs VALUES ('Step 2');",
    arguments: [
      {
        name: "savepoint_name",
        description: "Произвольное имя для точки сохранения.",
        example: "SAVEPOINT after_header",
      },
      {
        name: "RELEASE",
        description: "Удаляет точку сохранения (без отката изменений).",
        example: "RELEASE SAVEPOINT sp1;",
      },
      {
        name: "re-use",
        description: "Использование того же имени перезаписывает старую точку.",
        example: "SAVEPOINT check_point; -- позже -- SAVEPOINT check_point;",
      },
    ],
  },
  {
    id: "rollback_to",
    name: "ROLLBACK TO",
    category: "TCL (Transaction Control Language)",
    description:
      "Откатывает изменения только до указанной точки сохранения (SAVEPOINT).",
    syntax: "ROLLBACK TO SAVEPOINT savepoint_name;",
    example: "ROLLBACK TO sp1;",
    arguments: [
      {
        name: "SAVEPOINT name",
        description: "Имя точки, до которой нужно вернуться.",
        example: "ROLLBACK TO SAVEPOINT before_update",
      },
      {
        name: "transaction state",
        description: "Транзакция остается открытой после выполнения.",
        example: "ROLLBACK TO sp1; -- Продолжаем работу",
      },
      {
        name: "partial revert",
        description: "Отменяет только часть команд после точки.",
        example: "ROLLBACK TO last_good_state;",
      },
    ],
  },
  // Логические операторы
  {
    id: "and",
    name: "AND",
    category: "Логические операторы",
    description:
      "Возвращает записи, если все условия, разделенные этим оператором, истинны.",
    syntax: "condition1 AND condition2;",
    example: "SELECT * FROM users WHERE status = 'active' AND age > 21;",
    arguments: [
      {
        name: "multiple",
        description: "Можно объединять любое количество условий.",
        example: "WHERE a=1 AND b=2 AND c=3",
      },
      {
        name: "precedence",
        description: "Имеет более высокий приоритет, чем OR.",
        example: "WHERE (a=1 OR b=2) AND c=3",
      },
      {
        name: "nulls",
        description:
          "Если одно из условий NULL, результат может быть NULL или FALSE.",
        example: "WHERE is_verified AND email_confirmed",
      },
    ],
  },
  {
    id: "or",
    name: "OR",
    category: "Логические операторы",
    description: "Возвращает записи, если хотя бы одно из условий истинно.",
    syntax: "condition1 OR condition2;",
    example: "SELECT * FROM products WHERE category = 'Toys' OR price < 10;",
    arguments: [
      {
        name: "alternative",
        description: "Используется для поиска по нескольким вариантам.",
        example: "WHERE city = 'Moscow' OR city = 'London'",
      },
      {
        name: "grouping",
        description: "Рекомендуется использовать скобки при сочетании с AND.",
        example: "WHERE (stock > 0 OR backorder = true) AND price < 50",
      },
      {
        name: "in comparison",
        description: "Часто может быть заменен оператором IN.",
        example: "WHERE id=1 OR id=2 -- тоже самое что WHERE id IN (1,2)",
      },
    ],
  },
  {
    id: "not",
    name: "NOT",
    category: "Логические операторы",
    description: "Инвертирует результат логического выражения.",
    syntax: "NOT condition;",
    example: "SELECT * FROM orders WHERE NOT status = 'cancelled';",
    arguments: [
      {
        name: "with operators",
        description: "Часто используется с LIKE, IN, BETWEEN.",
        example: "WHERE name NOT LIKE 'A%'",
      },
      {
        name: "with null",
        description: "NOT NULL проверяет наличие значения.",
        example: "WHERE phone_number IS NOT NULL",
      },
      {
        name: "negation",
        description: "Отрицает все выражение после себя.",
        example: "WHERE NOT (age < 18 OR parent_id IS NULL)",
      },
    ],
  },
  {
    id: "in",
    name: "IN",
    category: "Логические операторы",
    description:
      "Проверяет, соответствует ли значение любому значению в списке или подзапросе.",
    syntax: "column IN (value1, value2, ...);",
    example:
      "SELECT * FROM users WHERE country IN ('Russia', 'Belarus', 'Kazakhstan');",
    arguments: [
      {
        name: "list",
        description: "Список фиксированных значений.",
        example: "WHERE code IN (100, 200, 300)",
      },
      {
        name: "subquery",
        description: "Результат другого SELECT запроса.",
        example: "WHERE user_id IN (SELECT id FROM admins)",
      },
      {
        name: "not in",
        description: "Выбирает значения, которых нет в списке.",
        example: "WHERE id NOT IN (1, 2, 3)",
      },
    ],
  },
  {
    id: "between",
    name: "BETWEEN",
    category: "Логические операторы",
    description: "Выбирает значения в заданном диапазоне (включая границы).",
    syntax: "column BETWEEN value1 AND value2;",
    example: "SELECT * FROM sales WHERE amount BETWEEN 500 AND 1000;",
    arguments: [
      {
        name: "dates",
        description: "Очень удобно для фильтрации по датам.",
        example: "WHERE date BETWEEN '2023-01-01' AND '2023-12-31'",
      },
      {
        name: "strings",
        description: "Работает и с текстовыми диапазонами (по алфавиту).",
        example: "WHERE name BETWEEN 'A' AND 'M'",
      },
      {
        name: "inclusive",
        description: "Значения границ всегда включены в результат.",
        example: "WHERE age BETWEEN 18 AND 65 -- 18 и 65 тоже попадут",
      },
    ],
  },
  {
    id: "like",
    name: "LIKE",
    category: "Логические операторы",
    description: "Поиск по шаблону с использованием подстановочных знаков.",
    syntax: "column LIKE 'pattern';",
    example: "SELECT * FROM customers WHERE name LIKE 'Ivan%';",
    arguments: [
      {
        name: "% (percent)",
        description: "Заменяет любое количество символов (0 и более).",
        example: "WHERE email LIKE '%@gmail.com'",
      },
      {
        name: "_ (underscore)",
        description: "Заменяет ровно один любой символ.",
        example: "WHERE code LIKE 'A_123' -- например AB123 или AC123",
      },
      {
        name: "ILIKE",
        description: "Регистронезависимый поиск (в PostgreSQL).",
        example: "WHERE name ILIKE 'ivan%'",
      },
    ],
  },
  {
    id: "exists",
    name: "EXISTS",
    category: "Логические операторы",
    description: "Проверяет наличие записей в подзапросе.",
    syntax: "EXISTS (subquery);",
    example:
      "SELECT name FROM departments d WHERE EXISTS (SELECT 1 FROM employees e WHERE e.dept_id = d.id);",
    arguments: [
      {
        name: "correlation",
        description: "Обычно используется с коррелированными подзапросами.",
        example: "WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id)",
      },
      {
        name: "efficiency",
        description:
          "Останавливает поиск, как только найдена хотя бы одна строка.",
        example:
          "SELECT 'Found' WHERE EXISTS (SELECT * FROM big_table LIMIT 1)",
      },
      {
        name: "not exists",
        description: "Проверка на отсутствие записей.",
        example:
          "WHERE NOT EXISTS (SELECT 1 FROM blacklist b WHERE b.email = u.email)",
      },
    ],
  },
  {
    id: "all_operator",
    name: "ALL",
    category: "Логические операторы",
    description:
      "Сравнивает значение со всеми значениями в подзапросе. Условие истинно, если оно верно для всех строк.",
    syntax: "column comparison_operator ALL (subquery);",
    example:
      "SELECT name FROM products WHERE price > ALL (SELECT price FROM competitors);",
    arguments: [
      {
        name: "comparison",
        description: "Используется с =, <>, <, <=, >, >=.",
        example: "WHERE salary >= ALL (subquery)",
      },
      {
        name: "subquery",
        description: "Подзапрос должен возвращать один столбец.",
        example: "WHERE id <> ALL (SELECT id FROM deleted_users)",
      },
      {
        name: "empty set",
        description: "Если подзапрос пуст, ALL всегда возвращает TRUE.",
        example: "WHERE score > ALL (SELECT score FROM empty_table)",
      },
    ],
  },
  {
    id: "any_some_operator",
    name: "ANY | SOME",
    category: "Логические операторы",
    description:
      "Сравнивает значение с любым из значений в подзапросе. Истинно, если хотя бы для одного значения условие верно.",
    syntax: "column comparison_operator ANY (subquery);",
    example:
      "SELECT name FROM employees WHERE salary > ANY (SELECT salary FROM interns);",
    arguments: [
      {
        name: "equivalence",
        description: "SOME — это синоним ANY.",
        example: "WHERE price = ANY (SELECT p FROM prices)",
      },
      {
        name: "in-like",
        description: "= ANY эквивалентно оператору IN.",
        example: "WHERE id = ANY (1, 2, 3)",
      },
      {
        name: "comparison",
        description:
          "Позволяет использовать операторы больше/меньше для списка.",
        example: "WHERE quantity < ANY (SELECT stock FROM inv)",
      },
    ],
  },
  // Арифметические операторы
  {
    id: "add",
    name: "+",
    category: "Арифметические операторы",
    description: "Сложение числовых значений.",
    syntax: "value1 + value2;",
    example: "SELECT price + tax FROM orders;",
    arguments: [
      {
        name: "columns",
        description: "Сложение значений двух столбцов.",
        example: "SELECT salary + bonus FROM employees;",
      },
      {
        name: "literals",
        description: "Прибавление константы.",
        example: "SELECT score + 10 FROM results;",
      },
      {
        name: "intervals",
        description: "В некоторых СУБД — прибавление времени к дате.",
        example: "SELECT created_at + INTERVAL '1 day' FROM events;",
      },
    ],
  },
  {
    id: "subtract",
    name: "-",
    category: "Арифметические операторы",
    description: "Вычитание числовых значений или смена знака.",
    syntax: "value1 - value2;",
    example: "SELECT total - discount FROM sales;",
    arguments: [
      {
        name: "difference",
        description: "Нахождение разницы между полями.",
        example: "SELECT end_time - start_time FROM logs;",
      },
      {
        name: "negative",
        description: "Использование как унарного минуса.",
        example: "SELECT -balance FROM accounts;",
      },
      {
        name: "dates",
        description: "Вычитание дат для получения количества дней.",
        example: "SELECT '2024-01-01'::date - '2023-12-01'::date;",
      },
    ],
  },
  {
    id: "multiply",
    name: "*",
    category: "Арифметические операторы",
    description: "Умножение числовых значений.",
    syntax: "value1 * value2;",
    example: "SELECT price * quantity FROM order_details;",
    arguments: [
      {
        name: "percentage",
        description: "Расчет процентов.",
        example: "SELECT total * 0.15 AS vat FROM invoices;",
      },
      {
        name: "scaling",
        description: "Изменение масштаба значений.",
        example: "SELECT weight_kg * 1000 AS weight_g FROM items;",
      },
      {
        name: "multiple",
        description: "Цепочка умножений.",
        example: "SELECT length * width * height FROM boxes;",
      },
    ],
  },
  {
    id: "divide",
    name: "/",
    category: "Арифметические операторы",
    description: "Деление одного числового значения на другое.",
    syntax: "value1 / value2;",
    example: "SELECT total / 2 FROM sharing;",
    arguments: [
      {
        name: "integer",
        description: "При делении целых чисел результат часто тоже целый.",
        example: "SELECT 5 / 2; -- может вернуть 2",
      },
      {
        name: "float",
        description: "Для точного деления один операнд должен быть дробным.",
        example: "SELECT 5.0 / 2; -- вернет 2.5",
      },
      {
        name: "zero",
        description: "Деление на ноль вызывает ошибку в большинстве СУБД.",
        example: "SELECT amount / NULLIF(qty, 0);",
      },
    ],
  },
  {
    id: "modulo",
    name: "%",
    category: "Арифметические операторы",
    description: "Возвращает остаток от деления.",
    syntax: "value1 % value2; -- или MOD(value1, value2)",
    example: "SELECT 10 % 3; -- вернет 1",
    arguments: [
      {
        name: "parity",
        description: "Проверка на четность/нечетность.",
        example: "WHERE id % 2 = 0 -- только четные ID",
      },
      {
        name: "cycling",
        description: "Используется для циклического перебора значений.",
        example: "SELECT (counter % 10) + 1;",
      },
      {
        name: "distribute",
        description: "Распределение строк по группам (шардинг).",
        example: "WHERE id % 4 = 1",
      },
    ],
  },
  // Операторы сравнения
  {
    id: "equal",
    name: "=",
    category: "Операторы сравнения",
    description: "Проверяет равенство двух значений.",
    syntax: "expression1 = expression2",
    example: "SELECT * FROM users WHERE id = 10;",
    arguments: [
      {
        name: "strings",
        description:
          "Сравнение текстовых строк (чувствительность к регистру зависит от БД).",
        example: "WHERE status = 'active'",
      },
      {
        name: "numbers",
        description: "Сравнение числовых данных.",
        example: "WHERE price = 99.99",
      },
      {
        name: "nulls",
        description: "Внимание: для NULL используйте IS NULL, а не = NULL.",
        example: "WHERE parent_id IS NULL",
      },
    ],
  },
  {
    id: "not_equal",
    name: "!= или <>",
    category: "Операторы сравнения",
    description: "Проверяет неравенство двух значений.",
    syntax: "expression1 != expression2 -- или expression1 <> expression2",
    example: "SELECT * FROM products WHERE category != 'Electronics';",
    arguments: [
      {
        name: "<>",
        description: "Стандартный SQL оператор неравенства.",
        example: "WHERE type <> 'internal'",
      },
      {
        name: "!=",
        description:
          "Более современный синтаксис, поддерживаемый большинством СУБД.",
        example: "WHERE status != 'deleted'",
      },
      {
        name: "filtering",
        description: "Исключение конкретных значений из результата.",
        example: "WHERE id <> 1 -- вернуть всех кроме первого",
      },
    ],
  },
  {
    id: "greater_than",
    name: ">",
    category: "Операторы сравнения",
    description: "Проверяет, что левое значение строго больше правого.",
    syntax: "expression1 > expression2",
    example: "SELECT * FROM orders WHERE total_amount > 1000;",
    arguments: [
      {
        name: "numbers",
        description: "Сравнение числовых величин.",
        example: "WHERE stock > 0",
      },
      {
        name: "dates",
        description: "Выбор записей позже определенной даты.",
        example: "WHERE created_at > '2024-01-01'",
      },
      {
        name: "sorting",
        description:
          "Часто используется в условиях фильтрации перед сортировкой.",
        example: "WHERE rank > 10 ORDER BY rank",
      },
    ],
  },
  {
    id: "less_than",
    name: "<",
    category: "Операторы сравнения",
    description: "Проверяет, что левое значение строго меньше правого.",
    syntax: "expression1 < expression2",
    example: "SELECT * FROM inventory WHERE quantity < 5;",
    arguments: [
      {
        name: "thresholds",
        description: "Проверка пороговых значений.",
        example: "WHERE temperature < 0",
      },
      {
        name: "strings",
        description: "Лексикографическое сравнение (по алфавиту).",
        example: "WHERE name < 'B' -- имена на букву A",
      },
      {
        name: "intervals",
        description: "Сравнение с расчетными интервалами.",
        example: "WHERE duration < INTERVAL '1 hour'",
      },
    ],
  },
  {
    id: "greater_than_or_equal",
    name: ">=",
    category: "Операторы сравнения",
    description: "Проверяет, что левое значение больше или равно правому.",
    syntax: "expression1 >= expression2",
    example: "SELECT * FROM students WHERE score >= 60;",
    arguments: [
      {
        name: "ranges",
        description: "Часто используется для задания нижней границы диапазона.",
        example: "WHERE age >= 18",
      },
      {
        name: "pagination",
        description: "Выборка начиная с определенного ID.",
        example: "WHERE id >= 101 LIMIT 10",
      },
      {
        name: "inclusive",
        description: "Включает само сравниваемое значение в результат.",
        example: "WHERE price >= 10 -- 10 тоже попадет",
      },
    ],
  },
  {
    id: "less_than_or_equal",
    name: "<=",
    category: "Операторы сравнения",
    description: "Проверяет, что левое значение меньше или равно правому.",
    syntax: "expression1 <= expression2",
    example: "SELECT * FROM tasks WHERE priority <= 2;",
    arguments: [
      {
        name: "deadlines",
        description: "Выбор записей до определенного момента включительно.",
        example: "WHERE due_date <= CURRENT_DATE",
      },
      {
        name: "limitations",
        description: "Ограничение верхней границы.",
        example: "WHERE attempts <= 3",
      },
      {
        name: "combinations",
        description: "Используется вместе с >= для замены BETWEEN.",
        example: "WHERE price >= 10 AND price <= 20",
      },
    ],
  },
  // Операторы множеств
  {
    id: "union",
    name: "UNION",
    category: "Операторы множеств",
    description:
      "Объединяет результаты двух SELECT запросов в один набор, удаляя дубликаты.",
    syntax: "SELECT ... UNION SELECT ...",
    example: "SELECT name FROM customers UNION SELECT name FROM suppliers;",
    arguments: [
      {
        name: "columns",
        description:
          "Количество и типы столбцов в обоих запросах должны совпадать.",
        example: "SELECT id, name FROM t1 UNION SELECT id, name FROM t2",
      },
      {
        name: "distinct",
        description: "UNION по умолчанию выполняет DISTINCT.",
        example: "SELECT city FROM users UNION SELECT city FROM offices",
      },
      {
        name: "order_by",
        description:
          "Сортировка применяется ко всему итоговому набору в конце.",
        example: "SELECT n FROM a UNION SELECT n FROM b ORDER BY n",
      },
    ],
  },
  {
    id: "union_all",
    name: "UNION ALL",
    category: "Операторы множеств",
    description:
      "Объединяет результаты запросов, включая все дубликаты (быстрее, чем UNION).",
    syntax: "SELECT ... UNION ALL SELECT ...",
    example: "SELECT city FROM stores UNION ALL SELECT city FROM warehouses;",
    arguments: [
      {
        name: "performance",
        description: "Работает быстрее UNION, так как не ищет дубликаты.",
        example:
          "SELECT log_msg FROM logs_old UNION ALL SELECT log_msg FROM logs_new",
      },
      {
        name: "duplicates",
        description: "Сохраняет все строки, даже если они идентичны.",
        example:
          "SELECT user_id FROM clicks UNION ALL SELECT user_id FROM views",
      },
      {
        name: "reporting",
        description: "Используется, когда важно сохранить полную статистику.",
        example:
          "SELECT total FROM sales_q1 UNION ALL SELECT total FROM sales_q2",
      },
    ],
  },
  {
    id: "intersect",
    name: "INTERSECT",
    category: "Операторы множеств",
    description:
      "Возвращает только те строки, которые присутствуют в обоих результатах запросов.",
    syntax: "SELECT ... INTERSECT SELECT ...",
    example:
      "SELECT user_id FROM active_subscribers INTERSECT SELECT user_id FROM newsletter_readers;",
    arguments: [
      {
        name: "overlap",
        description: "Находит пересечение двух множеств.",
        example:
          "SELECT product_id FROM promo_a INTERSECT SELECT product_id FROM promo_b",
      },
      {
        name: "requirements",
        description: "Как и в UNION, структуры таблиц должны быть идентичны.",
        example:
          "SELECT email FROM staff INTERSECT SELECT email FROM customers",
      },
      {
        name: "distinct",
        description: "Обычно возвращает только уникальные строки.",
        example:
          "SELECT tag FROM post1_tags INTERSECT SELECT tag FROM post2_tags",
      },
    ],
  },
  {
    id: "minus_except",
    name: "MINUS/EXCEPT",
    category: "Операторы множеств",
    description:
      "Возвращает строки из первого запроса, которых нет во втором (EXCEPT в PostgreSQL/SQL Server, MINUS в Oracle).",
    syntax: "SELECT ... EXCEPT SELECT ... -- или MINUS",
    example: "SELECT id FROM all_products EXCEPT SELECT product_id FROM sales;",
    arguments: [
      {
        name: "EXCEPT",
        description: "Синтаксис для PostgreSQL и SQLite.",
        example: "SELECT id FROM t1 EXCEPT SELECT id FROM t2",
      },
      {
        name: "MINUS",
        description: "Синтаксис для Oracle (и некоторых других).",
        example: "SELECT id FROM t1 MINUS SELECT id FROM t2",
      },
      {
        name: "exclusion",
        description:
          "Позволяет легко найти 'недостающие' или 'уникальные для первой таблицы' записи.",
        example:
          "SELECT email FROM users EXCEPT SELECT email FROM unsubscribed",
      },
    ],
  },
  // Операторы JOIN
  {
    id: "inner_join",
    name: "INNER JOIN",
    category: "Операторы JOIN",
    description:
      "Возвращает записи, имеющие совпадающие значения в обеих таблицах.",
    syntax: "SELECT ... FROM t1 INNER JOIN t2 ON t1.id = t2.ref_id;",
    example:
      "SELECT o.id, c.name FROM orders o INNER JOIN customers c ON o.customer_id = c.id;",
    arguments: [
      {
        name: "ON",
        description: "Условие связывания таблиц.",
        example: "JOIN profiles p ON u.id = p.user_id",
      },
      {
        name: "multiple",
        description: "Можно последовательно объединять несколько таблиц.",
        example: "SELECT * FROM t1 JOIN t2 ON ... JOIN t3 ON ...",
      },
      {
        name: "filtering",
        description: "Строки без совпадений отсекаются из результата.",
        example:
          "JOIN categories c ON p.cat_id = c.id -- только товары с категориями",
      },
    ],
  },
  {
    id: "left_join",
    name: "LEFT JOIN",
    category: "Операторы JOIN",
    description:
      "Возвращает все записи из левой таблицы и совпадающие записи из правой (или NULL, если совпадений нет).",
    syntax: "SELECT ... FROM t1 LEFT JOIN t2 ON t1.id = t2.ref_id;",
    example:
      "SELECT u.name, o.order_date FROM users u LEFT JOIN orders o ON u.id = o.user_id;",
    arguments: [
      {
        name: "preservation",
        description:
          "Гарантирует, что все данные из левой (первой) таблицы попадут в отчет.",
        example: "FROM products p LEFT JOIN sales s ON p.id = s.p_id",
      },
      {
        name: "NULL values",
        description:
          "Если в правой таблице нет данных, столбцы заполняются NULL.",
        example: "WHERE o.id IS NULL -- найти пользователей без заказов",
      },
      {
        name: "OUTER",
        description: "Полное название - LEFT OUTER JOIN (синонимы).",
        example: "LEFT OUTER JOIN departments d ON ...",
      },
    ],
  },
  {
    id: "right_join",
    name: "RIGHT JOIN",
    category: "Операторы JOIN",
    description:
      "Возвращает все записи из правой таблицы и совпадающие записи из левой.",
    syntax: "SELECT ... FROM t1 RIGHT JOIN t2 ON t1.id = t2.ref_id;",
    example:
      "SELECT e.name, d.dept_name FROM employees e RIGHT JOIN departments d ON e.dept_id = d.id;",
    arguments: [
      {
        name: "direction",
        description: "Зеркальное отражение LEFT JOIN.",
        example: "FROM orders o RIGHT JOIN customers c ON ...",
      },
      {
        name: "usage",
        description:
          "Используется реже, так как любой RIGHT JOIN можно переписать как LEFT JOIN, поменяв таблицы местами.",
        example: "FROM managers m RIGHT JOIN branches b ON ...",
      },
      {
        name: "integrity",
        description:
          "Помогает найти 'осиротевшие' записи в основной справочной таблице.",
        example: "RIGHT JOIN roles r ON u.role_id = r.id",
      },
    ],
  },
  {
    id: "full_join",
    name: "FULL JOIN",
    category: "Операторы JOIN",
    description:
      "Возвращает все записи, если есть совпадение в одной из таблиц (комбинация LEFT и RIGHT JOIN).",
    syntax: "SELECT ... FROM t1 FULL JOIN t2 ON t1.id = t2.ref_id;",
    example:
      "SELECT * FROM project_a_staff FULL JOIN project_b_staff ON project_a_staff.id = project_b_staff.id;",
    arguments: [
      {
        name: "comprehensive",
        description:
          "Показывает полную картину из обеих таблиц, включая несовпавшие строки с обеих сторон.",
        example: "FULL OUTER JOIN inventory i ON ...",
      },
      {
        name: "COALESCE",
        description:
          "Часто используется вместе с COALESCE для объединения ключевых столбцов.",
        example: "SELECT COALESCE(a.id, b.id) ...",
      },
      {
        name: "compatibility",
        description:
          "В MySQL не поддерживается напрямую (нужно имитировать через UNION).",
        example: "SELECT * FROM t1 FULL JOIN t2 ON ...",
      },
    ],
  },
  {
    id: "cross_join",
    name: "CROSS JOIN",
    category: "Операторы JOIN",
    description:
      "Возвращает декартово произведение строк (каждая строка первой таблицы с каждой строкой второй).",
    syntax: "SELECT ... FROM t1 CROSS JOIN t2;",
    example: "SELECT s.size, c.color FROM sizes s CROSS JOIN colors c;",
    arguments: [
      {
        name: "combinations",
        description:
          "Используется для генерации всех возможных комбинаций данных.",
        example: "FROM months CROSS JOIN products",
      },
      {
        name: "no condition",
        description: "Для этого типа JOIN не указывается условие ON.",
        example: "SELECT * FROM t1, t2; -- старый синтаксис CROSS JOIN",
      },
      {
        name: "volume",
        description:
          "Осторожно: результат может быть очень большим (число строк t1 * число строк t2).",
        example: "CROSS JOIN (SELECT 1 UNION SELECT 2) as multiplier",
      },
    ],
  },
  {
    id: "self_join",
    name: "SELF JOIN",
    category: "Операторы JOIN",
    description: "Объединение таблицы с самой собой.",
    syntax: "SELECT ... FROM table t1 JOIN table t2 ON t1.col = t2.col;",
    example:
      "SELECT e.name as Emp, m.name as Manager FROM employees e JOIN employees m ON e.manager_id = m.id;",
    arguments: [
      {
        name: "aliases",
        description:
          "Обязательно использование разных псевдонимов для таблицы.",
        example: "FROM categories c1 JOIN categories c2 ON ...",
      },
      {
        name: "hierarchy",
        description:
          "Идеально подходит для иерархических структур (начальник-подчиненный, родитель-потомок).",
        example: "ON t1.parent_id = t2.id",
      },
      {
        name: "comparisons",
        description: "Сравнение строк внутри одной таблицы.",
        example:
          "WHERE t1.id <> t2.id AND t1.email = t2.email -- поиск дубликатов",
      },
    ],
  },
  // Битовые операторы
  {
    id: "bit_and",
    name: "&",
    category: "Битовые операторы",
    description:
      "Побитовое И (AND). Сравнивает каждый бит первого операнда с соответствующим битом второго.",
    syntax: "expression1 & expression2",
    example: "SELECT 5 & 3; -- Результат: 1 (0101 & 0011 = 0001)",
    arguments: [
      {
        name: "masking",
        description:
          "Используется для проверки установки определенных битов (флагов).",
        example: "WHERE (flags & 4) > 0",
      },
      {
        name: "integers",
        description: "Работает с целочисленными типами данных.",
        example: "SELECT user_permissions & 1",
      },
      {
        name: "permissions",
        description: "Часто применяется в битовых масках прав доступа.",
        example: "SELECT * FROM roles WHERE (mask & 2) = 2",
      },
    ],
  },
  {
    id: "bit_or",
    name: "|",
    category: "Битовые операторы",
    description:
      "Побитовое ИЛИ (OR). Результат имеет 1 в тех позициях, где хотя бы один из битов равен 1.",
    syntax: "expression1 | expression2",
    example: "SELECT 5 | 3; -- Результат: 7 (0101 | 0011 = 0111)",
    arguments: [
      {
        name: "combining",
        description: "Используется для объединения нескольких битовых флагов.",
        example: "UPDATE users SET flags = flags | 8",
      },
      {
        name: "options",
        description:
          "Применяется для установки дополнительных опций в поле конфигурации.",
        example: "SELECT status | 1 FROM devices",
      },
      {
        name: "results",
        description:
          "Результат всегда равен или больше максимального из операндов.",
        example: "SELECT val | 128 FROM settings",
      },
    ],
  },
  {
    id: "bit_xor",
    name: "^",
    category: "Битовые операторы",
    description:
      "Побитовое исключающее ИЛИ (XOR). Результат имеет 1 только там, где биты операндов различаются.",
    syntax: "expression1 ^ expression2",
    example: "SELECT 5 ^ 3; -- Результат: 6 (0101 ^ 0011 = 0110)",
    arguments: [
      {
        name: "toggling",
        description:
          "Используется для переключения (инверсии) конкретных битов.",
        example: "UPDATE tasks SET status = status ^ 1",
      },
      {
        name: "differences",
        description: "Помогает найти различающиеся биты в двух масках.",
        example: "SELECT mask1 ^ mask2",
      },
      {
        name: "encryption",
        description: "Простейшая форма симметричного шифрования (XOR-шифр).",
        example: "SELECT data ^ key FROM secret_table",
      },
    ],
  },
  {
    id: "bit_not",
    name: "~",
    category: "Битовые операторы",
    description:
      "Побитовое НЕ (NOT). Инвертирует все биты операнда (0 становится 1, и наоборот).",
    syntax: "~ expression",
    example: "SELECT ~5; -- Инвертирует все биты числа 5",
    arguments: [
      {
        name: "unary",
        description: "Это унарный оператор, принимающий только один операнд.",
        example: "SELECT ~flags",
      },
      {
        name: "complement",
        description: "Возвращает дополнение числа до двух.",
        example: "SELECT ~val + 1",
      },
      {
        name: "logic",
        description: "Часто используется вместе с & для очистки битов.",
        example: "UPDATE t SET f = f & ~4 -- сбросить 3-й бит",
      },
    ],
  },
  {
    id: "bit_shift_left",
    name: "<<",
    category: "Битовые операторы",
    description:
      "Побитовый сдвиг влево. Сдвигает биты первого операнда влево на указанное количество позиций.",
    syntax: "expression << distance",
    example: "SELECT 1 << 3; -- Результат: 8 (0001 становится 1000)",
    arguments: [
      {
        name: "multiplication",
        description:
          "Сдвиг влево на N позиций эквивалентен умножению на 2 в степени N.",
        example: "SELECT val << 1; -- Умножение на 2",
      },
      {
        name: "flags",
        description: "Используется для создания битовых масок по позиции.",
        example: "SELECT 1 << bit_pos",
      },
      {
        name: "performance",
        description: "Обычно выполняется быстрее, чем обычное умножение.",
        example: "SELECT price << 2 -- Умножение на 4",
      },
    ],
  },
  // Операторы присваивания
  {
    id: "assign_add",
    name: "+=",
    category: "Операторы присваивания",
    description:
      "Прибавляет значение к переменной и сохраняет результат (используется в процедурах и скриптах).",
    syntax: "@variable += expression",
    example: "SET @total += 100;",
    arguments: [
      {
        name: "shorthand",
        description: "Краткая запись для @v = @v + e.",
        example: "SET @count += 1",
      },
      {
        name: "T-SQL",
        description: "Активно используется в диалекте SQL Server.",
        example: "DECLARE @x INT = 0; SET @x += 5;",
      },
      {
        name: "accumulation",
        description: "Удобно для накопления суммы в циклах.",
        example: "SET @sum += @current_value",
      },
    ],
  },
  {
    id: "assign_sub",
    name: "-=",
    category: "Операторы присваивания",
    description: "Вычитает значение из переменной и сохраняет результат.",
    syntax: "@variable -= expression",
    example: "SET @balance -= 50;",
    arguments: [
      {
        name: "decrement",
        description: "Уменьшение значения счетчика.",
        example: "SET @retries -= 1",
      },
      {
        name: "stock",
        description: "Списание остатков в процедурах.",
        example: "SET @stock_level -= @sold_qty",
      },
      {
        name: "shorthand",
        description: "Эквивалентно @v = @v - e.",
        example: "SET @timer -= interval",
      },
    ],
  },
  {
    id: "assign_mul",
    name: "*=",
    category: "Операторы присваивания",
    description: "Умножает переменную на значение и сохраняет результат.",
    syntax: "@variable *= expression",
    example: "SET @price *= 1.10; -- Наценка 10%",
    arguments: [
      {
        name: "scaling",
        description: "Изменение масштаба переменной.",
        example: "SET @multiplier *= 2",
      },
      {
        name: "compound",
        description: "Расчет сложных процентов или коэффициентов.",
        example: "SET @rate *= @factor",
      },
      {
        name: "shorthand",
        description: "Эквивалентно @v = @v * e.",
        example: "SET @value *= 0.5",
      },
    ],
  },
  {
    id: "assign_div",
    name: "/=",
    category: "Операторы присваивания",
    description: "Делит переменную на значение и сохраняет результат.",
    syntax: "@variable /= expression",
    example: "SET @total /= @count;",
    arguments: [
      {
        name: "reduction",
        description: "Последовательное деление значения.",
        example: "SET @x /= 2",
      },
      {
        name: "averaging",
        description: "Используется при расчете средних величин в скриптах.",
        example: "SET @val /= @divisor",
      },
      {
        name: "shorthand",
        description: "Эквивалентно @v = @v / e.",
        example: "SET @amount /= 10",
      },
    ],
  },
  {
    id: "assign_mod",
    name: "%=",
    category: "Операторы присваивания",
    description: "Вычисляет остаток от деления и сохраняет его в переменной.",
    syntax: "@variable %= expression",
    example: "SET @id %= 10;",
    arguments: [
      {
        name: "rotation",
        description: "Ограничение диапазона значений переменной.",
        example: "SET @angle %= 360",
      },
      {
        name: "logic",
        description:
          "Используется для определения очередности или группировки в циклах.",
        example: "SET @group_id %= @num_groups",
      },
      {
        name: "shorthand",
        description: "Эквивалентно @v = @v % e.",
        example: "SET @counter %= 2",
      },
    ],
  },
  {
    id: "avg",
    name: "AVG()",
    category: "Агрегатные функции",
    description: "Вычисляет среднее значение числового столбца.",
    syntax: "AVG([ALL | DISTINCT] expression)",
    arguments: [
      {
        name: "ALL",
        description:
          "Применяет агрегатную функцию ко всем значениям. По умолчанию.",
        example: "SELECT AVG(ALL price) FROM products;",
      },
      {
        name: "DISTINCT",
        description: "Вычисляет среднее только для уникальных значений.",
        example: "SELECT AVG(DISTINCT price) FROM products;",
      },
      {
        name: "expression",
        description: "Столбец или выражение, для которого вычисляется среднее.",
        example: "SELECT AVG(price * 0.9) FROM products;",
      },
    ],
    example: "SELECT AVG(price) FROM products;",
  },
  {
    id: "checksum_agg",
    name: "CHECKSUM_AGG()",
    category: "Агрегатные функции",
    description: "Вычисляет контрольную сумму значений в группе.",
    syntax: "CHECKSUM_AGG([ALL | DISTINCT] expression)",
    arguments: [
      {
        name: "ALL | DISTINCT",
        description:
          "Определяет, учитывать ли все значения или только уникальные.",
        example: "SELECT CHECKSUM_AGG(DISTINCT price) FROM inventory;",
      },
      {
        name: "expression",
        description:
          "Целочисленное выражение, для которого вычисляется контрольная сумма.",
        example: "SELECT CHECKSUM_AGG(quantity) FROM inventory;",
      },
    ],
    example: "SELECT CHECKSUM_AGG(price) FROM inventory;",
  },
  {
    id: "string_agg",
    name: "STRING_AGG()",
    category: "Агрегатные функции",
    description:
      "Объединяет строковые значения в одну строку с заданным разделителем.",
    syntax: "STRING_AGG(expression, separator) [ <order_clause> ]",
    arguments: [
      {
        name: "expression",
        description: "Строковое выражение для объединения.",
        example: "SELECT STRING_AGG(name, ', ') FROM tags;",
      },
      {
        name: "separator",
        description: "Разделитель между значениями.",
        example: "SELECT STRING_AGG(name, ' | ') FROM tags;",
      },
      {
        name: "order_clause",
        description:
          "Необязательное предложение WITHIN GROUP (ORDER BY ...), определяющее порядок объединения.",
        example: "SELECT STRING_AGG(name, ', ' ORDER BY name) FROM tags;",
      },
    ],
    example: "SELECT STRING_AGG(name, ', ') FROM tags;",
  },
  {
    id: "count",
    name: "COUNT()",
    category: "Агрегатные функции",
    description:
      "Возвращает количество строк, соответствующих заданному критерию.",
    syntax: "COUNT([ALL | DISTINCT] expression)",
    arguments: [
      {
        name: "ALL",
        description:
          "Применяет агрегатную функцию ко всем значениям. По умолчанию.",
        example: "SELECT COUNT(ALL role) FROM users;",
      },
      {
        name: "DISTINCT",
        description: "Возвращает количество уникальных ненулевых значений.",
        example: "SELECT COUNT(DISTINCT city) FROM users;",
      },
      {
        name: "expression",
        description: "Выражение для подсчета. Стандартно - имя столбца.",
        example: "SELECT COUNT(id) FROM products;",
      },
    ],
    example: "SELECT COUNT(id) FROM users;",
  },
  {
    id: "count_all",
    name: "COUNT(*)",
    category: "Агрегатные функции",
    description:
      "Возвращает общее количество строк в таблице, включая строки с NULL значениями.",
    syntax: "COUNT(*)",
    example: "SELECT COUNT(*) FROM orders;",
  },
  {
    id: "sum",
    name: "SUM()",
    category: "Агрегатные функции",
    description: "Вычисляет общую сумму числового столбца.",
    syntax: "SUM([ALL | DISTINCT] expression)",
    arguments: [
      {
        name: "expression",
        description: "Числовое выражение (столбец или расчет).",
        example: "SELECT SUM(quantity * unit_price) FROM order_details;",
      },
    ],
    example: "SELECT SUM(total) FROM sales;",
  },
  {
    id: "every",
    name: "EVERY()",
    category: "АГРЕГИРУЮЩИЕ ФУНКЦИИ",
    description: "Возвращает true, если все значения в группе истинны.",
    syntax: "EVERY(boolean_expression)",
    arguments: [
      {
        name: "boolean_expression",
        description: "Выражение, возвращающее логическое значение.",
        example: "SELECT EVERY(is_active) FROM users;",
      },
    ],
    example: "SELECT EVERY(is_active) FROM users;",
  },
  {
    id: "any_some",
    name: "ANY() | SOME()",
    category: "АГРЕГИРУЮЩИЕ ФУНКЦИИ",
    description:
      "Возвращает true, если хотя бы одно значение в группе истинно.",
    syntax: "ANY(boolean_expression) | SOME(boolean_expression)",
    arguments: [
      {
        name: "boolean_expression",
        description: "Выражение, возвращающее логическое значение.",
        example: "SELECT ANY(is_shipped) FROM orders;",
      },
    ],
    example: "SELECT ANY(is_shipped) FROM orders;",
  },
  {
    id: "stddev_pop",
    name: "STDDEV_POP()",
    category: "АГРЕГИРУЮЩИЕ ФУНКЦИИ",
    description:
      "Вычисляет статистическое стандартное отклонение для совокупности.",
    syntax: "STDDEV_POP(expression)",
    arguments: [
      {
        name: "expression",
        description: "Числовое выражение.",
        example: "SELECT STDDEV_POP(price) FROM products;",
      },
    ],
    example: "SELECT STDDEV_POP(price) FROM products;",
  },
  {
    id: "stddev_samp",
    name: "STDDEV_SAMP()",
    category: "АГРЕГИРУЮЩИЕ ФУНКЦИИ",
    description: "Вычисляет статистическое стандартное отклонение для выборки.",
    syntax: "STDDEV_SAMP(expression)",
    arguments: [
      {
        name: "expression",
        description: "Числовое выражение.",
        example: "SELECT STDDEV_SAMP(amount) FROM sales;",
      },
    ],
    example: "SELECT STDDEV_SAMP(amount) FROM sales;",
  },
  {
    id: "var_pop",
    name: "VAR_POP()",
    category: "АГРЕГИРУЮЩИЕ ФУНКЦИИ",
    description: "Вычисляет статистическую дисперсию для совокупности.",
    syntax: "VAR_POP(expression)",
    arguments: [
      {
        name: "expression",
        description: "Числовое выражение.",
        example: "SELECT VAR_POP(score) FROM results;",
      },
    ],
    example: "SELECT VAR_POP(score) FROM results;",
  },
  {
    id: "var_samp",
    name: "VAR_SAMP()",
    category: "АГРЕГИРУЮЩИЕ ФУНКЦИИ",
    description: "Вычисляет статистическую дисперсию для выборки.",
    syntax: "VAR_SAMP(expression)",
    arguments: [
      {
        name: "expression",
        description: "Числовое выражение.",
        example: "SELECT VAR_SAMP(amount) FROM transactions;",
      },
    ],
    example: "SELECT VAR_SAMP(amount) FROM transactions;",
  },
  {
    id: "grouping",
    name: "GROUPING()",
    category: "АГРЕГИРУЮЩИЕ ФУНКЦИИ",
    description:
      "Указывает, является ли указанное выражение столбца в списке GROUP BY агрегированным или нет.",
    syntax: "GROUPING(column_reference)",
    arguments: [
      {
        name: "column_reference",
        description: "Ссылка на столбец в списке GROUP BY.",
        example:
          "SELECT category, GROUPING(category) FROM products GROUP BY ROLLUP(category);",
      },
    ],
    example:
      "SELECT category, GROUPING(category) FROM products GROUP BY ROLLUP(category);",
  },
  {
    id: "any_value",
    name: "ANY_VALUE()",
    category: "Расширенные агрегирующие функции (SQL:2023)",
    description: "Возвращает произвольное значение из группы.",
    syntax: "ANY_VALUE(expression)",
    arguments: [
      {
        name: "expression",
        description: "Выражение, из которого выбирается значение.",
        example:
          "SELECT category, ANY_VALUE(name) FROM products GROUP BY category;",
      },
    ],
    example:
      "SELECT category, ANY_VALUE(name) FROM products GROUP BY category;",
  },
  {
    id: "listagg",
    name: "LISTAGG()",
    category: "Расширенные агрегирующие функции (SQL:2023)",
    description: "Объединяет значения в одну строку с разделителем.",
    syntax:
      "LISTAGG([ALL | DISTINCT] expression, separator [NULLS FIRST | NULLS LAST])",
    arguments: [
      {
        name: "expression",
        description: "Выражение для объединения.",
        example: "LISTAGG(name, ', ')",
      },
      {
        name: "separator",
        description: "Строка-разделитель.",
        example: "LISTAGG(city, '; ')",
      },
      {
        name: "NULLS FIRST | LAST",
        description: "Определяет порядок обработки NULL значений.",
        example: "LISTAGG(comment, ',' NULLS LAST)",
      },
    ],
    example:
      "SELECT category, LISTAGG(name, ', ') FROM products GROUP BY category;",
  },
  {
    id: "array_agg_sql",
    name: "ARRAY_AGG()",
    category: "Расширенные агрегирующие функции (SQL:2023)",
    description: "Собирает значения в массив.",
    syntax:
      "ARRAY_AGG([DISTINCT] expression [ORDER BY sort_expression [ASC | DESC]] [NULLS FIRST | NULLS LAST])",
    arguments: [
      {
        name: "DISTINCT",
        description: "Удаляет дубликаты перед агрегацией.",
        example: "ARRAY_AGG(DISTINCT color)",
      },
      {
        name: "ORDER BY",
        description: "Сортировка элементов в массиве.",
        example: "ARRAY_AGG(name ORDER BY created_at DESC)",
      },
    ],
    example: "SELECT ARRAY_AGG(name ORDER BY id) FROM users;",
  },
  {
    id: "json_arrayagg",
    name: "JSON_ARRAYAGG()",
    category: "Расширенные агрегирующие функции (SQL:2023)",
    description: "Создает JSON-массив из агрегированных значений.",
    syntax:
      "JSON_ARRAYAGG(expression [ORDER BY sort_expression [ASC | DESC]] [NULLS FIRST | NULLS LAST])",
    arguments: [
      {
        name: "expression",
        description: "Выражение для включения в массив.",
        example: "JSON_ARRAYAGG(price)",
      },
      {
        name: "ORDER BY",
        description: "Порядок элементов в массиве.",
        example: "JSON_ARRAYAGG(name ORDER BY name)",
      },
    ],
    example: "SELECT JSON_ARRAYAGG(name) FROM employees;",
  },
  {
    id: "json_objectagg",
    name: "JSON_OBJECTAGG()",
    category: "Расширенные агрегирующие функции (SQL:2023)",
    description: "Создает JSON-объект из пар ключ-значение.",
    syntax:
      "JSON_OBJECTAGG(key_expression : value_expression [NULL ON NULL | ABSENT ON NULL] [{WITH | WITHOUT} UNIQUE [KEYS]])",
    arguments: [
      {
        name: "key_expression",
        description: "Выражение для ключа объекта.",
        example: "JSON_OBJECTAGG(id : name)",
      },
      {
        name: "value_expression",
        description: "Выражение для значения объекта.",
        example: "JSON_OBJECTAGG(code : price)",
      },
      {
        name: "UNIQUE KEYS",
        description: "Гарантирует уникальность ключей в объекте.",
        example: "JSON_OBJECTAGG(k : v WITH UNIQUE KEYS)",
      },
    ],
    example: "SELECT JSON_OBJECTAGG(id : name) FROM users;",
  },
  // СТРОКОВЫЕ ФУНКЦИИ
  {
    id: "upper",
    name: "UPPER()",
    category: "Строковые функции",
    description: "Преобразует строку в верхний регистр.",
    syntax: "UPPER(character_expression)",
    arguments: [
      {
        name: "character_expression",
        description: "Исходная строка.",
        example: "UPPER('sql')",
      },
    ],
    example: "SELECT UPPER(name) FROM users;",
  },
  {
    id: "lower",
    name: "LOWER()",
    category: "Строковые функции",
    description: "Преобразует строку в нижний регистр.",
    syntax: "LOWER(character_expression)",
    arguments: [
      {
        name: "character_expression",
        description: "Исходная строка.",
        example: "LOWER('SQL')",
      },
    ],
    example: "SELECT LOWER(email) FROM users;",
  },
  {
    id: "substring",
    name: "SUBSTRING()",
    category: "Строковые функции",
    description: "Извлекает подстроку из строки.",
    syntax: "SUBSTRING(string FROM start [FOR length])",
    arguments: [
      {
        name: "FROM start",
        description: "Начальная позиция (с 1).",
        example: "SUBSTRING('SQL' FROM 1)",
      },
      {
        name: "FOR length",
        description: "Количество извлекаемых символов.",
        example: "SUBSTRING('Database' FROM 1 FOR 4)",
      },
    ],
    example: "SELECT SUBSTRING('Hello World' FROM 1 FOR 5);",
  },
  {
    id: "position",
    name: "POSITION()",
    category: "Строковые функции",
    description: "Возвращает позицию подстроки в строке.",
    syntax: "POSITION(substring IN string)",
    arguments: [
      {
        name: "substring",
        description: "Искомая подстрока.",
        example: "POSITION('a' IN 'cat')",
      },
      {
        name: "string",
        description: "Строка поиска.",
        example: "POSITION('@' IN email)",
      },
    ],
    example: "SELECT email, POSITION('@' IN email) FROM users;",
  },
  {
    id: "trim_sql",
    name: "TRIM()",
    category: "Строковые функции",
    description:
      "Удаляет указанные символы с начала, конца или с обеих сторон строки.",
    syntax:
      "TRIM([{LEADING | TRAILING | BOTH} [trim_character] FROM] character_expression)",
    arguments: [
      {
        name: "LEADING",
        description: "Удаляет символы только в начале.",
        example: "TRIM(LEADING '0' FROM '000123')",
      },
      {
        name: "TRAILING",
        description: "Удаляет символы только в конце.",
        example: "TRIM(TRAILING ' ' FROM 'text  ')",
      },
      {
        name: "BOTH",
        description: "Удаляет символы с обеих сторон.",
        example: "TRIM(BOTH '*' FROM '**secret**')",
      },
    ],
    example: "SELECT TRIM(BOTH ' ' FROM '  hello  ');",
  },
  {
    id: "lpad",
    name: "LPAD()",
    category: "Строковые функции",
    description: "Дополняет строку слева до указанной длины.",
    syntax: "LPAD(string, length [, pad_character])",
    arguments: [
      {
        name: "length",
        description: "Целевая длина строки.",
        example: "LPAD('5', 3, '0')",
      },
      {
        name: "pad_character",
        description: "Символ заполнения.",
        example: "LPAD('text', 10, '*')",
      },
    ],
    example: "SELECT LPAD(id::text, 5, '0') FROM orders;",
  },
  {
    id: "rpad",
    name: "RPAD()",
    category: "Строковые функции",
    description: "Дополняет строку справа до указанной длины.",
    syntax: "RPAD(string, length [, pad_character])",
    example: "SELECT RPAD(name, 20, '.') FROM users;",
  },
  {
    id: "initcap",
    name: "INITCAP()",
    category: "Строковые функции",
    description: "Преобразует первую букву каждого слова в верхний регистр.",
    syntax: "INITCAP(character_expression)",
    example: "SELECT INITCAP('ivan ivanov');",
  },
  {
    id: "char_length",
    name: "CHAR_LENGTH()",
    category: "Строковые функции",
    description: "Возвращает количество символов в строке.",
    syntax: "CHAR_LENGTH(character_expression)",
    example: "SELECT CHAR_LENGTH('database');",
  },
  {
    id: "repeat",
    name: "REPEAT()",
    category: "Строковые функции",
    description: "Повторяет строку указанное количество раз.",
    syntax: "REPEAT(string, count)",
    example: "SELECT REPEAT('*', 5);",
  },
  {
    id: "reverse",
    name: "REVERSE()",
    category: "Строковые функции",
    description: "Разворачивает строку задом наперед.",
    syntax: "REVERSE(character_expression)",
    example: "SELECT REVERSE('abc');",
  },
  {
    id: "left_sql",
    name: "LEFT()",
    category: "Строковые функции",
    description: "Возвращает указанное количество символов слева.",
    syntax: "LEFT(string, count)",
    example: "SELECT LEFT('SQL Server', 3);",
  },
  {
    id: "right_sql",
    name: "RIGHT()",
    category: "Строковые функции",
    description: "Возвращает указанное количество символов справа.",
    syntax: "RIGHT(string, count)",
    example: "SELECT RIGHT('SQL Server', 6);",
  },
  // ЧИСЛОВЫЕ ФУНКЦИИ
  {
    id: "abs",
    name: "ABS()",
    category: "Числовые функции",
    description: "Возвращает абсолютное значение (модуль) числа.",
    syntax: "ABS(numeric_expression)",
    example: "SELECT ABS(-5.5); -- 5.5",
  },
  {
    id: "ceil",
    name: "CEIL() | CEILING()",
    category: "Числовые функции",
    description: "Округляет число до ближайшего большего целого.",
    syntax: "CEIL(numeric_expression)",
    example: "SELECT CEIL(4.2); -- 5",
  },
  {
    id: "floor",
    name: "FLOOR()",
    category: "Числовые функции",
    description: "Округляет число до ближайшего меньшего целого.",
    syntax: "FLOOR(numeric_expression)",
    example: "SELECT FLOOR(4.8); -- 4",
  },
  {
    id: "round",
    name: "ROUND()",
    category: "Числовые функции",
    description:
      "Округляет число до указанного количества знаков после запятой.",
    syntax: "ROUND(numeric_expression [, decimal_places])",
    arguments: [
      {
        name: "decimal_places",
        description: "Количество знаков после запятой (по умолчанию 0).",
        example: "ROUND(123.456, 1) -- 123.5",
      },
    ],
    example: "SELECT ROUND(123.456, 2); -- 123.46",
  },
  {
    id: "trunc",
    name: "TRUNC() | TRUNCATE()",
    category: "Числовые функции",
    description: "Отсекает дробную часть числа без округления.",
    syntax: "TRUNC(numeric_expression [, decimal_places])",
    example: "SELECT TRUNC(123.456, 1); -- 123.4",
  },
  {
    id: "mod",
    name: "MOD()",
    category: "Числовые функции",
    description: "Возвращает остаток от деления.",
    syntax: "MOD(n, m)",
    example: "SELECT MOD(10, 3); -- 1",
  },
  {
    id: "sqrt",
    name: "SQRT()",
    category: "Числовые функции",
    description: "Вычисляет квадратный корень.",
    syntax: "SQRT(numeric_expression)",
    example: "SELECT SQRT(16); -- 4",
  },
  {
    id: "power",
    name: "POWER()",
    category: "Числовые функции",
    description: "Возводит число в указанную степень.",
    syntax: "POWER(base, exponent)",
    example: "SELECT POWER(2, 3); -- 8",
  },
  // ФУНКЦИИ СРАВНЕНИЯ
  {
    id: "greatest",
    name: "GREATEST()",
    category: "Функции сравнения",
    description: "Выбирает максимальное значение из списка выражений.",
    syntax: "GREATEST(expression1, expression2 [, expression3, ...])",
    example: "SELECT GREATEST(10, 20, 30); -- 30",
  },
  {
    id: "least",
    name: "LEAST()",
    category: "Функции сравнения",
    description: "Выбирает минимальное значение из списка выражений.",
    syntax: "LEAST(expression1, expression2 [, expression3, ...])",
    example: "SELECT LEAST(10, 20, 30); -- 10",
  },
  {
    id: "width_bucket",
    name: "WIDTH_BUCKET()",
    category: "Функции сравнения",
    description:
      "Распределяет значение по корзинам (buckets) в заданном диапазоне.",
    syntax: "WIDTH_BUCKET(expression, lower_bound, upper_bound, num_buckets)",
    example: "SELECT WIDTH_BUCKET(15, 1, 100, 10); -- 2",
  },
  // ПРОЧИЕ ЧИСЛОВЫЕ ФУНКЦИИ
  {
    id: "random",
    name: "RAND() | RANDOM()",
    category: "Прочие числовые функции",
    description: "Генерирует случайное число от 0.0 до 1.0.",
    syntax: "RANDOM()",
    example: "SELECT RANDOM();",
  },
  {
    id: "random_seed",
    name: "RAND(seed)",
    category: "Прочие числовые функции",
    description:
      "Генерирует воспроизводимое случайное число на основе зерна (seed).",
    syntax: "RAND(seed)",
    example: "SELECT RAND(123);",
  },
  {
    id: "bitand",
    name: "BITAND()",
    category: "Прочие числовые функции",
    description: "Побитовое И (AND).",
    syntax: "BITAND(integer_expr1, integer_expr2)",
    example: "SELECT BITAND(5, 3); -- 1",
  },
  {
    id: "bitandnot",
    name: "BITANDNOT()",
    category: "Прочие числовые функции",
    description: "Побитовое И-НЕ (AND NOT).",
    syntax: "BITANDNOT(integer_expr1, integer_expr2)",
    example: "SELECT BITANDNOT(5, 3); -- 4",
  },
  {
    id: "bitnot",
    name: "BITNOT()",
    category: "Прочие числовые функции",
    description: "Побитовое НЕ (NOT).",
    syntax: "BITNOT(integer_expression)",
    example: "SELECT BITNOT(5);",
  },
  {
    id: "bitor",
    name: "BITOR()",
    category: "Прочие числовые функции",
    description: "Побитовое ИЛИ (OR).",
    syntax: "BITOR(integer_expr1, integer_expr2)",
    example: "SELECT BITOR(5, 3); -- 7",
  },
  {
    id: "bitxor",
    name: "BITXOR()",
    category: "Прочие числовые функции",
    description: "Побитовое исключающее ИЛИ (XOR).",
    syntax: "BITXOR(integer_expr1, integer_expr2)",
    example: "SELECT BITXOR(5, 3); -- 6",
  },
  // ТРИГОНОМЕТРИЧЕСКИЕ ФУНКЦИИ
  {
    id: "sin",
    name: "SIN()",
    category: "Тригонометрические функции",
    description: "Возвращает синус угла, заданного в радианах.",
    syntax: "SIN(numeric_expression)",
    example: "SELECT SIN(1.0);",
  },
  {
    id: "cos",
    name: "COS()",
    category: "Тригонометрические функции",
    description: "Возвращает косинус угла, заданного в радианах.",
    syntax: "COS(numeric_expression)",
    example: "SELECT COS(1.0);",
  },
  {
    id: "tan",
    name: "TAN()",
    category: "Тригонометрические функции",
    description: "Возвращает тангенс угла, заданного в радианах.",
    syntax: "TAN(numeric_expression)",
    example: "SELECT TAN(1.0);",
  },
  {
    id: "asin",
    name: "ASIN()",
    category: "Тригонометрические функции",
    description: "Возвращает арксинус числа (результат в радианах).",
    syntax: "ASIN(numeric_expression)",
    example: "SELECT ASIN(0.5);",
  },
  {
    id: "acos",
    name: "ACOS()",
    category: "Тригонометрические функции",
    description: "Возвращает арккосинус числа (результат в радианах).",
    syntax: "ACOS(numeric_expression)",
    example: "SELECT ACOS(0.5);",
  },
  {
    id: "atan",
    name: "ATAN()",
    category: "Тригонометрические функции",
    description: "Возвращает арктангенс числа (результат в радианах).",
    syntax: "ATAN(numeric_expression)",
    example: "SELECT ATAN(1.0);",
  },
  {
    id: "atan2",
    name: "ATAN2()",
    category: "Тригонометрические функции",
    description: "Возвращает арктангенс для координат y и x.",
    syntax: "ATAN2(y_expression, x_expression)",
    example: "SELECT ATAN2(1, 1);",
  },
  {
    id: "sinh",
    name: "SINH()",
    category: "Тригонометрические функции",
    description: "Возвращает гиперболический синус числа.",
    syntax: "SINH(numeric_expression)",
    example: "SELECT SINH(1.0);",
  },
  {
    id: "cosh",
    name: "COSH()",
    category: "Тригонометрические функции",
    description: "Возвращает гиперболический косинус числа.",
    syntax: "COSH(numeric_expression)",
    example: "SELECT COSH(1.0);",
  },
  {
    id: "tanh",
    name: "TANH()",
    category: "Тригонометрические функции",
    description: "Возвращает гиперболический тангенс числа.",
    syntax: "TANH(numeric_expression)",
    example: "SELECT TANH(1.0);",
  },
  {
    id: "cot",
    name: "COT()",
    category: "Тригонометрические функции",
    description: "Возвращает котангенс угла, заданного в радианах.",
    syntax: "COT(numeric_expression)",
    example: "SELECT COT(1.0);",
  },
  // ЛОГАРИФМИЧЕСКИЕ И ЭКСПОНЕНЦИАЛЬНЫЕ ФУНКЦИИ
  {
    id: "exp",
    name: "EXP()",
    category: "Логарифмические и экспоненциальные функции",
    description: "Возвращает экспоненту (e в степени n).",
    syntax: "EXP(numeric_expression)",
    example: "SELECT EXP(1.0);",
  },
  {
    id: "ln",
    name: "LN()",
    category: "Логарифмические и экспоненциальные функции",
    description: "Возвращает натуральный логарифм числа.",
    syntax: "LN(numeric_expression)",
    example: "SELECT LN(2.71828);",
  },
  {
    id: "log",
    name: "LOG()",
    category: "Логарифмические и экспоненциальные функции",
    description:
      "Возвращает логарифм числа по заданному основанию (или натуральный логарифм в некоторых диалектах).",
    syntax: "LOG([base,] numeric_expression)",
    example: "SELECT LOG(10, 100);",
  },
  {
    id: "log10",
    name: "LOG10()",
    category: "Логарифмические и экспоненциальные функции",
    description: "Возвращает десятичный логарифм числа.",
    syntax: "LOG10(numeric_expression)",
    example: "SELECT LOG10(100);",
  },
  // ПРЕОБРАЗОВАНИЕ УГЛОВ
  {
    id: "degrees",
    name: "DEGREES()",
    category: "Преобразование углов",
    description: "Преобразует радианы в градусы.",
    syntax: "DEGREES(numeric_expression)",
    example: "SELECT DEGREES(PI());",
  },
  {
    id: "radians",
    name: "RADIANS()",
    category: "Преобразование углов",
    description: "Преобразует градусы в радианы.",
    syntax: "RADIANS(numeric_expression)",
    example: "SELECT RADIANS(180.0);",
  },
  {
    id: "pi",
    name: "PI()",
    category: "Преобразование углов",
    description: "Возвращает число Пи.",
    syntax: "PI()",
    example: "SELECT PI();",
  },
  // ОКОННЫЕ ФУНКЦИИ
  {
    id: "row_number",
    name: "ROW_NUMBER()",
    category: "Оконные функции",
    description: "Присваивает уникальный номер каждой строке.",
    syntax:
      "ROW_NUMBER() OVER ([PARTITION BY partition_expr] ORDER BY sort_expr)",
    example:
      "SELECT name, ROW_NUMBER() OVER(ORDER BY salary DESC) FROM employees;",
  },
  {
    id: "rank",
    name: "RANK()",
    category: "Оконные функции",
    description: "Возвращает ранг строки с пропусками.",
    syntax: "RANK() OVER ([PARTITION BY partition_expr] ORDER BY sort_expr)",
    example: "SELECT name, RANK() OVER(ORDER BY score DESC) FROM games;",
  },
  {
    id: "dense_rank",
    name: "DENSE_RANK()",
    category: "Оконные функции",
    description: "Возвращает ранг строки без пропусков.",
    syntax:
      "DENSE_RANK() OVER ([PARTITION BY partition_expr] ORDER BY sort_expr)",
    example: "SELECT name, DENSE_RANK() OVER(ORDER BY score DESC) FROM games;",
  },
  {
    id: "lag",
    name: "LAG()",
    category: "Оконные функции",
    description: "Доступ к значению предыдущей строки.",
    syntax: "LAG(expression [, offset [, default]]) OVER (...)",
    example: "SELECT val, LAG(val) OVER(ORDER BY id) FROM data;",
  },
  {
    id: "lead",
    name: "LEAD()",
    category: "Оконные функции",
    description: "Доступ к значению следующей строки.",
    syntax: "LEAD(expression [, offset [, default]]) OVER (...)",
    example: "SELECT val, LEAD(val) OVER(ORDER BY id) FROM data;",
  },
  // ФУНКЦИИ ДАТЫ И ВРЕМЕНИ
  {
    id: "current_date",
    name: "CURRENT_DATE",
    category: "Функции даты и времени",
    description: "Возвращает текущую дату.",
    syntax: "CURRENT_DATE",
    example: "SELECT CURRENT_DATE;",
  },
  {
    id: "current_time",
    name: "CURRENT_TIME",
    category: "Функции даты и времени",
    description: "Возвращает текущее время с часовым поясом.",
    syntax: "CURRENT_TIME [( time_precision )]",
    example: "SELECT CURRENT_TIME;",
  },
  {
    id: "localtime",
    name: "LOCALTIME",
    category: "Функции даты и времени",
    description: "Возвращает текущее местное время без часового пояса.",
    syntax: "LOCALTIME [( time_precision )]",
    example: "SELECT LOCALTIME;",
  },
  {
    id: "current_timestamp",
    name: "CURRENT_TIMESTAMP",
    category: "Функции даты и времени",
    description: "Возвращает текущую дату и время с часовым поясом.",
    syntax: "CURRENT_TIMESTAMP [( timestamp_precision )]",
    example: "SELECT CURRENT_TIMESTAMP;",
  },
  {
    id: "localtimestamp",
    name: "LOCALTIMESTAMP",
    category: "Функции даты и времени",
    description: "Возвращает текущую дату и время без часового пояса.",
    syntax: "LOCALTIMESTAMP [( timestamp_precision )]",
    example: "SELECT LOCALTIMESTAMP;",
  },
  {
    id: "extract",
    name: "EXTRACT()",
    category: "Функции даты и времени",
    description:
      "Извлекает определенную часть (год, месяц, день и т.д.) из значения даты или времени.",
    syntax: "EXTRACT(field FROM datetime_expression)",
    arguments: [
      {
        name: "field",
        description:
          "Часть даты для извлечения (YEAR, MONTH, DAY, HOUR, MINUTE, SECOND и др.).",
        example: "EXTRACT(YEAR FROM CURRENT_DATE)",
      },
    ],
    example: "SELECT EXTRACT(MONTH FROM CURRENT_TIMESTAMP);",
  },
  {
    id: "date_arithmetic",
    name: "Арифметика дат",
    category: "Функции даты и времени",
    description:
      "Операции сложения и вычитания для дат, меток времени и интервалов.",
    syntax: "expression { + | - } interval",
    arguments: [
      {
        name: "date + interval",
        description: "Добавление интервала к дате.",
        example: "CURRENT_DATE + INTERVAL '1 day'",
      },
      {
        name: "timestamp - interval",
        description: "Вычитание интервала из метки времени.",
        example: "CURRENT_TIMESTAMP - INTERVAL '2 hours'",
      },
      {
        name: "interval + interval",
        description: "Сложение двух интервалов.",
        example: "INTERVAL '1 day' + INTERVAL '2 hours'",
      },
    ],
    example: "SELECT CURRENT_DATE + INTERVAL '1 month' AS next_month;",
  },
  // УСЛОВНЫЕ ВЫРАЖЕНИЯ
  {
    id: "case",
    name: "CASE",
    category: "Условные выражения",
    description: "Универсальное условное выражение, аналог if/else.",
    syntax:
      "CASE [expression]\n  WHEN condition THEN result\n  [ELSE default_result]\nEND",
    example:
      "SELECT name,\n  CASE \n    WHEN salary > 50000 THEN 'High'\n    ELSE 'Standard'\n  END AS salary_level\nFROM employees;",
  },
  {
    id: "coalesce",
    name: "COALESCE()",
    category: "Условные выражения",
    description: "Возвращает первый аргумент, отличный от NULL.",
    syntax: "COALESCE(expression1, expression2 [, ...])",
    arguments: [
      {
        name: "expression1, expression2, ...",
        description: "Список выражений для проверки на NULL.",
        example: "COALESCE(bonus, 0)",
      },
    ],
    example:
      "SELECT name, COALESCE(phone, email, 'N/A') as contact_info FROM contacts;",
  },
  {
    id: "nullif",
    name: "NULLIF()",
    category: "Условные выражения",
    description:
      "Возвращает NULL, если два выражения равны, иначе первое выражение.",
    syntax: "NULLIF(expression1, expression2)",
    arguments: [
      {
        name: "expression1",
        description: "Первое выражение для сравнения.",
        example: "NULLIF(salary, 0)",
      },
      {
        name: "expression2",
        description: "Второе выражение для сравнения.",
        example: "NULLIF(value, -1)",
      },
    ],
    example:
      "SELECT name, salary / NULLIF(hours, 0) as hourly_rate FROM employees;",
  },
  {
    id: "ifnull_isnull",
    name: "IFNULL() | ISNULL()",
    category: "Условные выражения",
    description:
      "Заменяет NULL на указанное значение (зависит от диалекта: IFNULL в MySQL/SQLite, ISNULL в T-SQL).",
    syntax: "IFNULL(expression, replacement) | ISNULL(expression, replacement)",
    arguments: [
      {
        name: "expression",
        description: "Выражение, которое может содержать NULL.",
        example: "IFNULL(discount, 0)",
      },
      {
        name: "replacement",
        description: "Значение для замены, если выражение равно NULL.",
        example: "ISNULL(status, 'unknown')",
      },
    ],
    example:
      "SELECT product_name, IFNULL(description, 'Нет описания') FROM products;",
  },
  // ФУНКЦИИ ПРЕОБРАЗОВАНИЯ ТИПОВ
  {
    id: "cast",
    name: "CAST()",
    category: "Функции преобразования типов",
    description: "Преобразует выражение из одного типа данных в другой.",
    syntax: "CAST(expression AS data_type [FORMAT format_string])",
    arguments: [
      {
        name: "expression",
        description: "Значение или столбец для преобразования.",
        example: "CAST('123' AS INTEGER)",
      },
      {
        name: "data_type",
        description: "Целевой тип данных (INTEGER, VARCHAR, DATE и др.).",
        example: "CAST(price AS VARCHAR)",
      },
      {
        name: "FORMAT",
        description:
          "Необязательная строка формата (поддерживается в некоторых диалектах).",
        example: "CAST(date_col AS VARCHAR FORMAT 'YYYY-MM-DD')",
      },
    ],
    example: "SELECT CAST(created_at AS DATE) FROM users;",
  },
  {
    id: "to_char",
    name: "TO_CHAR()",
    category: "Функции преобразования типов",
    description: "Преобразует число или дату в строку с заданным форматом.",
    syntax: "TO_CHAR(expression, format_string)",
    arguments: [
      {
        name: "expression",
        description: "Числовое выражение или дата.",
        example: "TO_CHAR(123.45, '999.9')",
      },
      {
        name: "format_string",
        description: "Шаблон форматирования.",
        example: "TO_CHAR(CURRENT_DATE, 'DD.MM.YYYY')",
      },
    ],
    example: "SELECT TO_CHAR(hire_date, 'Month DD, YYYY') FROM employees;",
  },
  {
    id: "to_number",
    name: "TO_NUMBER()",
    category: "Функции преобразования типов",
    description: "Преобразует строку в число.",
    syntax: "TO_NUMBER(character_expression [, format_string])",
    arguments: [
      {
        name: "character_expression",
        description: "Строка, содержащая числовое представление.",
        example: "TO_NUMBER('1234.56')",
      },
      {
        name: "format_string",
        description: "Необязательный шаблон формата.",
        example: "TO_NUMBER('1,234.56', '9,999.99')",
      },
    ],
    example: "SELECT TO_NUMBER('123.45');",
  },
  {
    id: "to_date",
    name: "TO_DATE()",
    category: "Функции преобразования типов",
    description: "Преобразует строку в дату согласно заданному формату.",
    syntax: "TO_DATE(character_expression, format_string)",
    arguments: [
      {
        name: "character_expression",
        description: "Строка с датой.",
        example: "TO_DATE('2023-01-01', 'YYYY-MM-DD')",
      },
      {
        name: "format_string",
        description: "Шаблон формата даты.",
        example: "TO_DATE('01/01/23', 'DD/MM/YY')",
      },
    ],
    example: "SELECT TO_DATE('15-05-2024', 'DD-MM-YYYY');",
  },
  {
    id: "to_timestamp",
    name: "TO_TIMESTAMP()",
    category: "Функции преобразования типов",
    description:
      "Преобразует строку в метку времени (timestamp) с заданным форматом.",
    syntax: "TO_TIMESTAMP(character_expression, format_string)",
    arguments: [
      {
        name: "character_expression",
        description: "Строка с датой и временем.",
        example: "TO_TIMESTAMP('2024-05-15 14:30:00', 'YYYY-MM-DD HH24:MI:SS')",
      },
      {
        name: "format_string",
        description: "Шаблон формата.",
        example: "TO_TIMESTAMP('01-01-2024 12:00', 'DD-MM-YYYY HH:MI')",
      },
    ],
    example:
      "SELECT TO_TIMESTAMP('2024-01-01 12:00:00', 'YYYY-MM-DD HH24:MI:SS');",
  },
  // JSON ФУНКЦИИ (SQL:2023)
  {
    id: "json_array",
    name: "JSON_ARRAY()",
    category: "JSON Функции (SQL:2023)",
    description: "Создает JSON-массив из списка выражений.",
    syntax:
      "JSON_ARRAY([expression1 [, expression2, ...]] [NULL ON NULL | ABSENT ON NULL] [RETURNING data_type])",
    arguments: [
      {
        name: "expression",
        description: "Значение для включения в массив.",
        example: "JSON_ARRAY(1, 'two', 3.0)",
      },
      {
        name: "NULL ON NULL",
        description: "Сохранять NULL значения в массиве (по умолчанию).",
        example: "JSON_ARRAY(name NULL ON NULL)",
      },
      {
        name: "ABSENT ON NULL",
        description: "Игнорировать NULL значения.",
        example: "JSON_ARRAY(phone ABSENT ON NULL)",
      },
    ],
    example: "SELECT JSON_ARRAY(id, name, email) FROM users;",
  },
  {
    id: "json_object",
    name: "JSON_OBJECT()",
    category: "JSON Функции (SQL:2023)",
    description: "Создает JSON-объект из пар ключ:значение.",
    syntax:
      "JSON_OBJECT([key1 : value1 [, ...]] [NULL ON NULL | ABSENT ON NULL] [{WITH | WITHOUT} UNIQUE KEYS])",
    arguments: [
      {
        name: "key : value",
        description: "Пара ключ и значение для объекта.",
        example: "JSON_OBJECT('id' : 1, 'name' : 'Ivan')",
      },
      {
        name: "UNIQUE KEYS",
        description: "Гарантирует уникальность ключей в объекте.",
        example: "JSON_OBJECT('k' : 'v' WITH UNIQUE KEYS)",
      },
    ],
    example:
      "SELECT JSON_OBJECT('user_id' : id, 'user_name' : name) FROM employees;",
  },
  {
    id: "json_arrayagg_2023",
    name: "JSON_ARRAYAGG()",
    category: "JSON Функции (SQL:2023)",
    description:
      "Агрегатная функция, создающая JSON-массив из значений группы.",
    syntax:
      "JSON_ARRAYAGG(expression [ORDER BY sort_expression] [NULL ON NULL | ABSENT ON NULL])",
    arguments: [
      {
        name: "expression",
        description: "Выражение для агрегации.",
        example: "JSON_ARRAYAGG(price)",
      },
      {
        name: "ORDER BY",
        description: "Порядок элементов в итоговом массиве.",
        example: "JSON_ARRAYAGG(name ORDER BY name DESC)",
      },
    ],
    example:
      "SELECT department, JSON_ARRAYAGG(name) FROM employees GROUP BY department;",
  },
  {
    id: "json_objectagg_2023",
    name: "JSON_OBJECTAGG()",
    category: "JSON Функции (SQL:2023)",
    description:
      "Агрегатная функция, создающая JSON-объект из пар ключ:значение в группе.",
    syntax:
      "JSON_OBJECTAGG(key_expression : value_expression [NULL ON NULL | ABSENT ON NULL])",
    arguments: [
      {
        name: "key_expression",
        description: "Выражение для ключа (обычно строка).",
        example: "JSON_OBJECTAGG(id : name)",
      },
      {
        name: "value_expression",
        description: "Выражение для значения.",
        example: "JSON_OBJECTAGG(sku : price)",
      },
    ],
    example:
      "SELECT category, JSON_OBJECTAGG(product_id : product_name) FROM products GROUP BY category;",
  },
  {
    id: "json_query",
    name: "JSON_QUERY()",
    category: "JSON Функции (SQL:2023)",
    description:
      "Извлекает JSON-объект или массив из JSON-строки по заданному пути.",
    syntax: "JSON_QUERY(json_expr, path_expr [RETURNING data_type])",
    arguments: [
      {
        name: "json_expr",
        description: "Исходная JSON-строка или столбец.",
        example: "JSON_QUERY(data, '$.address')",
      },
      {
        name: "path_expr",
        description: "SQL/JSON путь (JSONPath).",
        example: "JSON_QUERY(info, '$.tags')",
      },
    ],
    example: "SELECT JSON_QUERY(profile_data, '$.hobbies') FROM users;",
  },
  {
    id: "json_value",
    name: "JSON_VALUE()",
    category: "JSON Функции (SQL:2023)",
    description:
      "Извлекает скалярное (одиночное) значение из JSON-строки по заданному пути.",
    syntax: "JSON_VALUE(json_expr, path_expr [RETURNING data_type])",
    arguments: [
      {
        name: "json_expr",
        description: "Исходная JSON-строка.",
        example: "JSON_VALUE(data, '$.name')",
      },
      {
        name: "path_expr",
        description: "Путь к конкретному значению.",
        example: "JSON_VALUE(config, '$.timeout')",
      },
    ],
    example: "SELECT JSON_VALUE(meta, '$.version') FROM logs;",
  },
  {
    id: "json_extract",
    name: "JSON_EXTRACT()",
    category: "JSON Функции (SQL:2023)",
    description:
      "Извлекает данные из JSON (широко используется в MySQL/SQLite).",
    syntax: "JSON_EXTRACT(json_expression, path_expression)",
    arguments: [
      {
        name: "path_expression",
        description: "Путь в формате '$.key'.",
        example: "JSON_EXTRACT(info, '$.items[0]')",
      },
    ],
    example: "SELECT JSON_EXTRACT(data, '$.user.id') FROM api_responses;",
  },
  // ARRAY ФУНКЦИИ (SQL:2023)
  {
    id: "cardinality",
    name: "CARDINALITY()",
    category: "Array Функции (SQL:2023)",
    description: "Возвращает количество элементов в массиве.",
    syntax: "CARDINALITY(array_expression)",
    arguments: [
      {
        name: "array_expression",
        description: "Массив, размер которого нужно вычислить.",
        example: "CARDINALITY(ARRAY[1, 2, 3])",
      },
    ],
    example: "SELECT name, CARDINALITY(tags) FROM articles;",
  },
  {
    id: "array_agg_2023",
    name: "ARRAY_AGG()",
    category: "Array Функции (SQL:2023)",
    description: "Собирает значения в массив.",
    syntax:
      "ARRAY_AGG([DISTINCT] expression [ORDER BY sort_expr] [NULLS FIRST | NULLS LAST])",
    arguments: [
      {
        name: "expression",
        description: "Выражение для включения в массив.",
        example: "ARRAY_AGG(name)",
      },
      {
        name: "ORDER BY",
        description: "Сортировка элементов внутри массива.",
        example: "ARRAY_AGG(score ORDER BY score DESC)",
      },
    ],
    example:
      "SELECT department, ARRAY_AGG(name ORDER BY hire_date) FROM employees GROUP BY department;",
  },
  {
    id: "array_append",
    name: "ARRAY_APPEND()",
    category: "Array Функции (SQL:2023)",
    description: "Добавляет элемент в конец массива.",
    syntax: "ARRAY_APPEND(array_expression, element_expression)",
    arguments: [
      {
        name: "array_expression",
        description: "Исходный массив.",
        example: "ARRAY_APPEND(tags, 'new-tag')",
      },
      {
        name: "element_expression",
        description: "Элемент для добавления.",
        example: "ARRAY_APPEND(items, 100)",
      },
    ],
    example: "UPDATE posts SET tags = ARRAY_APPEND(tags, 'sql') WHERE id = 1;",
  },
  {
    id: "array_prepend",
    name: "ARRAY_PREPEND()",
    category: "Array Функции (SQL:2023)",
    description: "Добавляет элемент в начало массива.",
    syntax: "ARRAY_PREPEND(element_expression, array_expression)",
    arguments: [
      {
        name: "element_expression",
        description: "Элемент для добавления.",
        example: "ARRAY_PREPEND('first', list)",
      },
      {
        name: "array_expression",
        description: "Целевой массив.",
        example: "ARRAY_PREPEND(1, ARRAY[2, 3])",
      },
    ],
    example: "SELECT ARRAY_PREPEND(0, ids) FROM data;",
  },
  {
    id: "array_cat",
    name: "ARRAY_CAT() | ARRAY_CONCAT()",
    category: "Array Функции (SQL:2023)",
    description: "Объединяет два массива в один.",
    syntax: "ARRAY_CAT(array_expr1, array_expr2)",
    arguments: [
      {
        name: "array_expr1",
        description: "Первый массив.",
        example: "ARRAY_CAT(ARRAY[1,2], ARRAY[3,4])",
      },
      {
        name: "array_expr2",
        description: "Второй массив.",
        example: "ARRAY_CAT(tags1, tags2)",
      },
    ],
    example: "SELECT ARRAY_CAT(tags_personal, tags_work) FROM users;",
  },
  {
    id: "unnest",
    name: "UNNEST()",
    category: "Array Функции (SQL:2023)",
    description: "Разворачивает массив в набор строк.",
    syntax: "UNNEST(array_expression) [WITH ORDINALITY]",
    arguments: [
      {
        name: "WITH ORDINALITY",
        description: "Добавляет столбец с порядковым номером элемента.",
        example: "UNNEST(tags) WITH ORDINALITY",
      },
    ],
    example: "SELECT * FROM UNNEST(ARRAY['a', 'b', 'c']) WITH ORDINALITY;",
  },
  {
    id: "trim_array",
    name: "TRIM_ARRAY()",
    category: "Array Функции (SQL:2023)",
    description: "Удаляет указанное количество элементов с конца массива.",
    syntax: "TRIM_ARRAY(array_expression, num_value)",
    arguments: [
      {
        name: "num_value",
        description: "Количество удаляемых элементов.",
        example: "TRIM_ARRAY(ARRAY[1, 2, 3, 4], 2) -- [1, 2]",
      },
    ],
    example: "SELECT TRIM_ARRAY(history, 1) FROM user_sessions;",
  },
  // ФУНКЦИИ СЕССИИ/КОНТЕКСТА
  {
    id: "current_user",
    name: "CURRENT_USER",
    category: "Функции сессии/контекста",
    description: "Возвращает имя текущего пользователя базы данных.",
    syntax: "CURRENT_USER",
    example: "SELECT CURRENT_USER;",
  },
  {
    id: "current_role",
    name: "CURRENT_ROLE",
    category: "Функции сессии/контекста",
    description: "Возвращает имя текущей активной роли.",
    syntax: "CURRENT_ROLE",
    example: "SELECT CURRENT_ROLE;",
  },
  {
    id: "session_user",
    name: "SESSION_USER",
    category: "Функции сессии/контекста",
    description: "Возвращает имя пользователя, инициировавшего сессию.",
    syntax: "SESSION_USER",
    example: "SELECT SESSION_USER;",
  },
  {
    id: "system_user",
    name: "SYSTEM_USER",
    category: "Функции сессии/контекста",
    description: "Возвращает имя системного пользователя операционной системы.",
    syntax: "SYSTEM_USER",
    example: "SELECT SYSTEM_USER;",
  },
  {
    id: "user_keyword",
    name: "USER",
    category: "Функции сессии/контекста",
    description: "Эквивалент CURRENT_USER в большинстве диалектов.",
    syntax: "USER",
    example: "SELECT USER;",
  },
  {
    id: "current_schema",
    name: "CURRENT_SCHEMA",
    category: "Функции сессии/контекста",
    description: "Возвращает имя текущей используемой схемы.",
    syntax: "CURRENT_SCHEMA",
    example: "SELECT CURRENT_SCHEMA;",
  },
  {
    id: "current_catalog",
    name: "CURRENT_CATALOG",
    category: "Функции сессии/контекста",
    description: "Возвращает имя текущей базы данных (каталога).",
    syntax: "CURRENT_CATALOG",
    example: "SELECT CURRENT_CATALOG;",
  },
  {
    id: "current_path",
    name: "CURRENT_PATH",
    category: "Функции сессии/контекста",
    description:
      "Возвращает список схем, используемых для поиска функций и операторов.",
    syntax: "CURRENT_PATH",
    example: "SELECT CURRENT_PATH;",
  },
  {
    id: "value_keyword",
    name: "VALUE",
    category: "Функции сессии/контекста",
    description:
      "Используется в контексте проверок (CHECK) или доменов для ссылки на текущее значение.",
    syntax: "VALUE",
    example: "CREATE DOMAIN positive_int AS INT CHECK (VALUE > 0);",
  },
  // ФУНКЦИИ ГРУППИРОВКИ
  {
    id: "grouping_func",
    name: "GROUPING()",
    category: "Функции группировки",
    description:
      "Указывает, является ли указанный столбец в списке GROUP BY агрегированным (часть ROLLUP/CUBE) или нет.",
    syntax: "GROUPING(column_reference)",
    arguments: [
      {
        name: "column_reference",
        description: "Ссылка на столбец из списка GROUP BY.",
        example: "GROUPING(category)",
      },
    ],
    example:
      "SELECT category, SUM(price), GROUPING(category) FROM products GROUP BY ROLLUP(category);",
  },
  {
    id: "group_concat",
    name: "GROUP_CONCAT()",
    category: "Функции группировки",
    description:
      "Объединяет значения из группы в одну строку с разделителем (MySQL/SQLite).",
    syntax:
      "GROUP_CONCAT([DISTINCT] expression [ORDER BY sort_expr] [SEPARATOR separator_string])",
    arguments: [
      {
        name: "expression",
        description: "Выражение для объединения.",
        example: "GROUP_CONCAT(name)",
      },
      {
        name: "SEPARATOR",
        description: "Символ-разделитель (по умолчанию запятая).",
        example: "GROUP_CONCAT(city SEPARATOR '; ')",
      },
    ],
    example:
      "SELECT department_id, GROUP_CONCAT(name) FROM employees GROUP BY department_id;",
  },
  {
    id: "listagg_group",
    name: "LISTAGG()",
    category: "Функции группировки",
    description:
      "Агрегатная функция для объединения строк в одну с заданным порядком (Oracle/SQL Standard).",
    syntax:
      "LISTAGG([DISTINCT] expression, separator) WITHIN GROUP (ORDER BY sort_expr)",
    arguments: [
      {
        name: "expression",
        description: "Строковое выражение для объединения.",
        example: "LISTAGG(name, ', ')",
      },
      {
        name: "WITHIN GROUP",
        description: "Определяет порядок элементов в итоговой строке.",
        example: "WITHIN GROUP (ORDER BY hire_date)",
      },
    ],
    example:
      "SELECT job_id, LISTAGG(last_name, '; ') WITHIN GROUP (ORDER BY last_name) FROM employees GROUP BY job_id;",
  },
  // DDL (Data Definition Language)
  {
    id: "create_sql",
    name: "CREATE",
    category: "DDL (Data Definition Language)",
    description:
      "Создает новые объекты в базе данных (таблицы, индексы, представления и т.д.).",
    syntax: "CREATE {TABLE | INDEX | VIEW | DATABASE} object_name (...)",
    example:
      "-- Пример 1: Создание таблицы\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  username VARCHAR(50) NOT NULL\n);\n\n-- Пример 2: Создание индекса\nCREATE INDEX idx_username ON users(username);\n\n-- Пример 3: Создание представления\nCREATE VIEW active_users AS \nSELECT * FROM users WHERE last_login > NOW() - INTERVAL '1 month';",
  },
  {
    id: "drop_sql",
    name: "DROP",
    category: "DDL (Data Definition Language)",
    description: "Удаляет существующие объекты из базы данных.",
    syntax: "DROP {TABLE | INDEX | VIEW | DATABASE} [IF EXISTS] object_name",
    example:
      "-- Пример 1: Удаление таблицы\nDROP TABLE temp_data;\n\n-- Пример 2: Удаление индекса\nDROP INDEX idx_username;\n\n-- Пример 3: Удаление с проверкой существования\nDROP VIEW IF EXISTS report_summary;",
  },
  {
    id: "alter_sql",
    name: "ALTER",
    category: "DDL (Data Definition Language)",
    description:
      "Изменяет структуру существующих объектов (добавление/удаление колонок, смена типов и т.д.).",
    syntax: "ALTER {TABLE | VIEW} object_name action",
    example:
      "-- Пример 1: Добавление новой колонки\nALTER TABLE users ADD COLUMN email VARCHAR(100);\n\n-- Пример 2: Изменение типа данных колонки\nALTER TABLE products ALTER COLUMN price TYPE DECIMAL(12,2);\n\n-- Пример 3: Переименование таблицы\nALTER TABLE old_name RENAME TO new_name;",
  },
  {
    id: "truncate_sql",
    name: "TRUNCATE",
    category: "DDL (Data Definition Language)",
    description:
      "Удаляет все записи из таблицы, сохраняя её структуру. Работает быстрее чем DELETE.",
    syntax: "TRUNCATE TABLE table_name [RESTART IDENTITY] [CASCADE]",
    example:
      "-- Пример 1: Очистка таблицы логов\nTRUNCATE TABLE logs;\n\n-- Пример 2: Очистка со сбросом счетчика ID\nTRUNCATE TABLE sessions RESTART IDENTITY;\n\n-- Пример 3: Каскадная очистка зависимых таблиц\nTRUNCATE TABLE categories CASCADE;",
  },
  {
    id: "comment_sql",
    name: "COMMENT",
    category: "DDL (Data Definition Language)",
    description: "Добавляет описание (комментарий) к объектам базы данных.",
    syntax:
      "COMMENT ON {TABLE | COLUMN | DATABASE} object_name IS 'comment_text'",
    example:
      "-- Пример 1: Комментарий к таблице\nCOMMENT ON TABLE users IS 'Информация о пользователях системы';\n\n-- Пример 2: Комментарий к колонке\nCOMMENT ON COLUMN users.email IS 'Основной email адрес для уведомлений';\n\n-- Пример 3: Удаление комментария\nCOMMENT ON TABLE users IS NULL;",
  },
  {
    id: "rename_sql",
    name: "RENAME",
    category: "DDL (Data Definition Language)",
    description: "Переименовывает существующий объект базы данных.",
    syntax:
      "ALTER {TABLE | COLUMN | INDEX} object_name RENAME [TO | AS] new_name",
    example:
      "-- Пример 1: Переименование таблицы\nALTER TABLE staff RENAME TO employees;\n\n-- Пример 2: Переименование колонки\nALTER TABLE users RENAME COLUMN user_name TO username;\n\n-- Пример 3: Переименование индекса\nALTER INDEX old_idx_name RENAME TO new_idx_name;",
  },
  // ТИПЫ ДАННЫХ
      {
      id: "xml_sql",
      name: "XML",
      category: "Типы данных",
      description: "Тип данных для хранения XML-документов. Обеспечивает проверку корректности структуры (well-formed) и поддержку функций обработки XML (XPath).",
      syntax: "XML",
      example: "CREATE TABLE product_specs (\n  id SERIAL PRIMARY KEY,\n  metadata XML\n);",
      arguments: [
        { name: "CONTENT", description: "XML-содержимое (может иметь более одного корневого элемента).", example: "INSERT INTO t VALUES ('<item>1</item><item>2</item>'::xml);" },
        { name: "DOCUMENT", description: "Полноценный XML-документ (строго один корневой элемент).", example: "INSERT INTO t VALUES ('<root><item>1</item></root>'::xml);" },
        { name: "XMLPARSE", description: "Преобразование строки в тип XML.", example: "SELECT XMLPARSE (DOCUMENT '<?xml version=\"1.0\"?><book><title>Manual</title></book>');" }
      ]
    },
  {
    id: "bigint_sql",
    name: "BIGINT",
    category: "Типы данных",
    description: "Целое число со знаком. Диапазон: от -2^63 до 2^63-1.",
    syntax: "BIGINT",
    example:
      "CREATE TABLE logs (\n  id BIGINT PRIMARY KEY,\n  message TEXT\n);",
  },
  {
    id: "bit_sql",
    name: "BIT",
    category: "Типы данных",
    description: "Битовая строка фиксированной длины.",
    syntax: "BIT(n)",
    example: "CREATE TABLE settings (\n  flags BIT(8)\n);",
    arguments: [
      { name: "n", description: "Количество бит.", example: "BIT(1)" },
    ],
  },
  {
    id: "decimal_sql",
    name: "DECIMAL",
    category: "Типы данных",
    description:
      "Точное числовое значение с фиксированной запятой. Аналог NUMERIC.",
    syntax: "DECIMAL(p, s)",
    example: "CREATE TABLE products (\n  price DECIMAL(10, 2)\n);",
    arguments: [
      {
        name: "p",
        description: "Точность (precision) — общее количество цифр.",
        example: "10",
      },
      {
        name: "s",
        description: "Масштаб (scale) — количество цифр после запятой.",
        example: "2",
      },
    ],
  },
  {
    id: "numeric_sql",
    name: "NUMERIC",
    category: "Типы данных",
    description: "Точное числовое значение с настраиваемой точностью.",
    syntax: "NUMERIC(p, s)",
    example: "CREATE TABLE financial_data (\n  amount NUMERIC(15, 4)\n);",
    arguments: [
      {
        name: "p",
        description: "Общее количество значащих цифр.",
        example: "15",
      },
      {
        name: "s",
        description: "Количество цифр после десятичной точки.",
        example: "4",
      },
    ],
  },
  {
    id: "smallint_sql",
    name: "SMALLINT",
    category: "Типы данных",
    description: "Целое число со знаком. Диапазон: от -32768 до 32767.",
    syntax: "SMALLINT",
    example:
      "CREATE TABLE students (\n  age SMALLINT,\n  grade_level SMALLINT\n);",
  },
  {
    id: "float_sql",
    name: "FLOAT",
    category: "Типы данных",
    description: "Число с плавающей точкой (приблизительное значение).",
    syntax: "FLOAT(p)",
    example: "CREATE TABLE measurements (\n  value FLOAT(24)\n);",
    arguments: [
      {
        name: "p",
        description:
          "Точность в битах (определяет использование REAL или DOUBLE PRECISION).",
        example: "FLOAT(53)",
      },
    ],
  },
  {
    id: "real_sql",
    name: "REAL",
    category: "Типы данных",
    description: "Число с плавающей точкой одинарной точности (4 байта).",
    syntax: "REAL",
    example: "CREATE TABLE sensors (\n  temperature REAL\n);",
  },
  {
    id: "double_precision_sql",
    name: "DOUBLE PRECISION",
    category: "Типы данных",
    description: "Число с плавающей точкой двойной точности (8 байт).",
    syntax: "DOUBLE PRECISION",
    example: "CREATE TABLE physics_data (\n  velocity DOUBLE PRECISION\n);",
  },
  {
    id: "char_sql",
    name: "CHAR",
    category: "Типы данных",
    description: "Строка фиксированной длины. Дополняется пробелами до n.",
    syntax: "CHAR(n)",
    example: "CREATE TABLE iso_codes (\n  country_code CHAR(3)\n);",
    arguments: [
      {
        name: "n",
        description: "Длина строки в символах.",
        example: "CHAR(10)",
      },
    ],
  },
  {
    id: "character_sql",
    name: "CHARACTER",
    category: "Типы данных",
    description: "Полное название типа CHAR. Строка фиксированной длины.",
    syntax: "CHARACTER(n)",
    example: "CREATE TABLE users (\n  gender CHARACTER(1)\n);",
  },
  {
    id: "varchar_sql",
    name: "VARCHAR",
    category: "Типы данных",
    description: "Строка переменной длины с ограничением n символов.",
    syntax: "VARCHAR(n)",
    example: "CREATE TABLE profiles (\n  bio VARCHAR(255)\n);",
    arguments: [
      {
        name: "n",
        description: "Максимальное количество символов.",
        example: "VARCHAR(100)",
      },
    ],
  },
  {
    id: "char_varying_sql",
    name: "CHARACTER VARYING",
    category: "Типы данных",
    description: "Полное название типа VARCHAR. Строка переменной длины.",
    syntax: "CHARACTER VARYING(n)",
    example: "CREATE TABLE documents (\n  title CHARACTER VARYING(200)\n);",
  },
  {
    id: "date_sql",
    name: "DATE",
    category: "Типы данных",
    description: "Календарная дата (год, месяц, день).",
    syntax: "DATE",
    example: "CREATE TABLE events (\n  event_date DATE\n);",
  },
  {
    id: "time_sql",
    name: "TIME",
    category: "Типы данных",
    description: "Время суток без даты.",
    syntax: "TIME [ (p) ] [ WITHOUT TIME ZONE | WITH TIME ZONE ]",
    example: "CREATE TABLE schedule (\n  start_time TIME\n);",
    arguments: [
      {
        name: "p",
        description: "Точность дробной части секунд.",
        example: "TIME(6)",
      },
    ],
  },
  {
    id: "timestamp_sql",
    name: "TIMESTAMP",
    category: "Типы данных",
    description: "Дата и время.",
    syntax: "TIMESTAMP [ (p) ] [ WITHOUT TIME ZONE | WITH TIME ZONE ]",
    example:
      "CREATE TABLE posts (\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);",
  },
  {
    id: "interval_sql",
    name: "INTERVAL",
    category: "Типы данных",
    description: "Временной интервал (промежуток времени).",
    syntax: "INTERVAL [ fields ] [ (p) ]",
    example: "SELECT NOW() + INTERVAL '1 day';",
    arguments: [
      {
        name: "fields",
        description: "Компоненты интервала (YEAR, MONTH, DAY, HOUR и т.д.).",
        example: "INTERVAL '2 hours'",
      },
    ],
  },
  {
    id: "boolean_sql",
    name: "BOOLEAN",
    category: "Типы данных",
    description: "Логический тип данных (TRUE, FALSE, NULL).",
    syntax: "BOOLEAN",
    example: "CREATE TABLE tasks (\n  is_completed BOOLEAN DEFAULT FALSE\n);",
  },
  {
    id: "array_sql",
    name: "ARRAY",
    category: "Типы данных",
    description: "Коллекция элементов одного типа.",
    syntax: "type ARRAY [size] или type[]",
    example: "CREATE TABLE matrix (\n  coordinates INTEGER ARRAY[3]\n);",
    arguments: [
      {
        name: "type",
        description: "Тип данных элементов массива.",
        example: "TEXT[]",
      },
    ],
  },
  {
    id: "multiset_sql",
    name: "MULTISET",
    category: "Типы данных",
    description:
      "Неупорядоченная коллекция элементов (аналог Bag в математике). В отличие от SET, допускает дубликаты.",
    syntax: "type MULTISET",
    example: "CREATE TABLE collections (\n  tags TEXT MULTISET\n);",
  },
  {
    id: "row_sql",
    name: "ROW",
    category: "Типы данных",
    description:
      "Составной тип данных, представляющий структуру строки (кортеж).",
    syntax: "ROW(field1 type, field2 type, ...)",
    example: "SELECT ROW(1, 'apple', true);",
  },
  {
    id: "ref_sql",
    name: "REF",
    category: "Типы данных",
    description: "Ссылка на объект в объектно-ориентированных расширениях SQL.",
    syntax: "REF(type)",
    example: "CREATE TABLE person_refs (\n  p_ref REF(person_type)\n);",
  },
];
