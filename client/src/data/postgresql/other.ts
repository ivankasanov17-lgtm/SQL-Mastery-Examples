export const other = [
  {
    id: "dml_select",
    name: "SELECT",
    category: "DML",
    description: "Извлекает строки из таблицы или представления. Позволяет выбирать конкретные столбцы, фильтровать, группировать и сортировать данные.",
    syntax: "SELECT [ALL | DISTINCT] column1, column2, ... FROM table_name [WHERE condition] [GROUP BY column] [HAVING condition] [ORDER BY column [ASC | DESC]] [LIMIT number] [OFFSET number];",
    arguments: [
      { name: "ALL", description: "Возвращает все строки (по умолчанию).", example: "SELECT ALL name FROM users;" },
      { name: "DISTINCT", description: "Удаляет дубликаты из результирующего набора.", example: "SELECT DISTINCT city FROM users;" },
      { name: "column1, column2, ...", description: "Список столбцов для выборки.", example: "SELECT name, email FROM users;" },
      { name: "FROM table_name", description: "Таблица, из которой выбираются данные.", example: "FROM users" },
      { name: "WHERE condition", description: "Условие фильтрации строк.", example: "WHERE age > 18" }
    ],
    example: "SELECT name, email FROM users WHERE active = true ORDER BY created_at DESC;"
  },
  {
    id: "dml_insert",
    name: "INSERT",
    category: "DML",
    description: "Вставляет новые строки в таблицу.",
    syntax: "INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);",
    arguments: [
      { name: "table_name", description: "Имя таблицы для вставки.", example: "INSERT INTO users ..." },
      { name: "(column1, column2, ...)", description: "Список столбцов, в которые будут вставлены данные.", example: "(name, email)" },
      { name: "VALUES (value1, value2, ...)", description: "Список значений, соответствующих столбцам.", example: "VALUES ('John', 'john@example.com')" }
    ],
    example: "INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');"
  },
  {
    id: "dml_update",
    name: "UPDATE",
    category: "DML",
    description: "Изменяет существующие строки в таблице.",
    syntax: "UPDATE table_name SET column1 = value1, column2 = value2, ... [WHERE condition];",
    arguments: [
      { name: "table_name", description: "Имя таблицы для обновления.", example: "UPDATE users" },
      { name: "SET column1 = value1, ...", description: "Присваивание новых значений столбцам.", example: "SET status = 'active'" },
      { name: "WHERE condition", description: "Условие, определяющее, какие строки обновлять. Если пропущено, обновляются все строки.", example: "WHERE id = 5" }
    ],
    example: "UPDATE users SET status = 'inactive' WHERE last_login < '2023-01-01';"
  },
  {
    id: "dml_delete",
    name: "DELETE",
    category: "DML",
    description: "Удаляет строки из таблицы.",
    syntax: "DELETE FROM table_name [WHERE condition];",
    arguments: [
      { name: "FROM table_name", description: "Имя таблицы, из которой удаляются данные.", example: "DELETE FROM users" },
      { name: "WHERE condition", description: "Условие, определяющее, какие строки удалять. Если пропущено, удаляются все строки.", example: "WHERE id = 10" }
    ],
    example: "DELETE FROM users WHERE status = 'banned';"
  },
  {
    id: "dml_returning",
    name: "RETURNING",
    category: "DML",
    description: "Возвращает значения измененных строк после INSERT, UPDATE или DELETE.",
    syntax: "INSERT / UPDATE / DELETE ... RETURNING { * | output_expression [AS alias] [, ...] };",
    arguments: [
      { name: "*", description: "Возвращает все столбцы измененной строки.", example: "RETURNING *" },
      { name: "output_expression", description: "Выражение или имя столбца для возврата.", example: "RETURNING id, created_at" },
      { name: "AS alias", description: "Псевдоним для возвращаемого столбца.", example: "RETURNING id AS new_id" }
    ],
    example: "INSERT INTO users (name) VALUES ('Bob') RETURNING id, name;"
  },
  {
    id: "dml_values",
    name: "VALUES",
    category: "DML",
    description: "Генерирует \"строку\" или набор строк, которые можно использовать в INSERT или как подзапрос.",
    syntax: "VALUES (expression [, ...]) [, ...];",
    arguments: [
      { name: "(expression [, ...])", description: "Список значений для одной строки.", example: "(1, 'One')" }
    ],
    example: "INSERT INTO numbers (id, name) VALUES (1, 'One'), (2, 'Two');"
  },
  {
    id: "dml_limit",
    name: "LIMIT",
    category: "DML",
    description: "Ограничивает количество возвращаемых строк в запросе.",
    syntax: "LIMIT { count | ALL };",
    arguments: [
      { name: "count", description: "Максимальное количество строк для возврата.", example: "LIMIT 10" },
      { name: "ALL", description: "Возвращает все строки (эквивалентно отсутствию LIMIT).", example: "LIMIT ALL" }
    ],
    example: "SELECT * FROM users ORDER BY id LIMIT 5;"
  },
  {
    id: "dml_offset",
    name: "OFFSET",
    category: "DML",
    description: "Пропускает указанное количество строк перед началом возврата строк.",
    syntax: "OFFSET start [ ROW | ROWS ];",
    arguments: [
      { name: "start", description: "Количество строк для пропуска.", example: "OFFSET 10" },
      { name: "ROW | ROWS", description: "Необязательное ключевое слово для ясности.", example: "OFFSET 5 ROWS" }
    ],
    example: "SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 20;"
  },
  {
    id: "dml_order_by",
    name: "ORDER BY",
    category: "DML",
    description: "Сортирует результирующий набор строк.",
    syntax: "ORDER BY expression [ ASC | DESC | USING operator ] [ NULLS { FIRST | LAST } ] [, ...];",
    arguments: [
      { name: "expression", description: "Столбец или выражение для сортировки.", example: "ORDER BY last_name" },
      { name: "ASC", description: "Сортировка по возрастанию (по умолчанию).", example: "ORDER BY age ASC" },
      { name: "DESC", description: "Сортировка по убыванию.", example: "ORDER BY age DESC" },
      { name: "NULLS FIRST | LAST", description: "Определяет, где будут находиться значения NULL.", example: "ORDER BY score DESC NULLS LAST" }
    ],
    example: "SELECT * FROM products ORDER BY price DESC, name ASC;"
  },
  {
    id: "dml_where",
    name: "WHERE",
    category: "DML",
    description: "Фильтрует строки на основе заданного условия.",
    syntax: "WHERE condition;",
    arguments: [
      { name: "condition", description: "Логическое выражение, которое должно быть истинным для включения строки.", example: "WHERE age >= 21 AND city = 'New York'" }
    ],
    example: "SELECT * FROM users WHERE active = true;"
  },
  {
    id: "dml_group_by",
    name: "GROUP BY",
    category: "DML",
    description: "Группирует строки, имеющие одинаковые значения в указанных столбцах, часто используется с агрегатными функциями.",
    syntax: "GROUP BY grouping_element [, ...];",
    arguments: [
      { name: "grouping_element", description: "Столбец или выражение для группировки.", example: "GROUP BY department_id" }
    ],
    example: "SELECT department_id, COUNT(*) FROM employees GROUP BY department_id;"
  },
  {
    id: "dml_having",
    name: "HAVING",
    category: "DML",
    description: "Фильтрует группы строк, созданные с помощью GROUP BY. Применяется после группировки, в отличие от WHERE.",
    syntax: "HAVING condition;",
    arguments: [
      { name: "condition", description: "Условие фильтрации групп.", example: "HAVING COUNT(*) > 5" }
    ],
    example: "SELECT city, COUNT(*) FROM users GROUP BY city HAVING COUNT(*) > 100;"
  },
  {
    id: "ddl_create_table",
    name: "CREATE TABLE",
    category: "DDL",
    description: "Создает новую таблицу в базе данных.",
    syntax: "CREATE TABLE [IF NOT EXISTS] table_name (column_name data_type [column_constraint] [, ...]) [INHERITS (parent_table)] [PARTITION BY {RANGE | LIST | HASH} (column_name)];",
    arguments: [
      { name: "IF NOT EXISTS", description: "Предотвращает ошибку, если таблица уже существует.", example: "CREATE TABLE IF NOT EXISTS users ..." },
      { name: "table_name", description: "Имя создаваемой таблицы.", example: "CREATE TABLE products" },
      { name: "column_name data_type", description: "Имя столбца и его тип данных.", example: "id SERIAL PRIMARY KEY" },
      { name: "INHERITS (parent_table)", description: "Наследует столбцы от родительской таблицы.", example: "INHERITS (users)" },
      { name: "PARTITION BY", description: "Определяет стратегию партиционирования таблицы.", example: "PARTITION BY RANGE (created_at)" }
    ],
    example: "CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT NOT NULL, created_at TIMESTAMP DEFAULT NOW());"
  },
  {
    id: "ddl_alter_table",
    name: "ALTER TABLE",
    category: "DDL",
    description: "Изменяет структуру существующей таблицы (добавление/удаление столбцов, изменение типов, ограничений и т.д.).",
    syntax: "ALTER TABLE [IF EXISTS] table_name action [, ...];",
    arguments: [
      { name: "table_name", description: "Имя изменяемой таблицы.", example: "ALTER TABLE users" },
      { name: "action", description: "Действие (ADD COLUMN, DROP COLUMN, ALTER COLUMN, RENAME TO и т.д.).", example: "ADD COLUMN age INT" }
    ],
    example: "ALTER TABLE users ADD COLUMN phone_number VARCHAR(20);"
  },
  {
    id: "ddl_drop_table",
    name: "DROP TABLE",
    category: "DDL",
    description: "Удаляет таблицу из базы данных.",
    syntax: "DROP TABLE [IF EXISTS] table_name [, ...] [CASCADE | RESTRICT];",
    arguments: [
      { name: "IF EXISTS", description: "Предотвращает ошибку, если таблица не существует.", example: "DROP TABLE IF EXISTS old_data" },
      { name: "table_name", description: "Имя удаляемой таблицы.", example: "DROP TABLE users" },
      { name: "CASCADE", description: "Автоматически удаляет объекты, зависящие от таблицы (например, представления).", example: "DROP TABLE users CASCADE" },
      { name: "RESTRICT", description: "Запрещает удаление, если есть зависимые объекты (по умолчанию).", example: "DROP TABLE users RESTRICT" }
    ],
    example: "DROP TABLE IF EXISTS temp_users CASCADE;"
  },
  {
    id: "ddl_truncate",
    name: "TRUNCATE",
    category: "DDL",
    description: "Быстро удаляет все строки из одной или нескольких таблиц.",
    syntax: "TRUNCATE [TABLE] table_name [, ...] [RESTART IDENTITY | CONTINUE IDENTITY] [CASCADE | RESTRICT];",
    arguments: [
      { name: "table_name", description: "Имя очищаемой таблицы.", example: "TRUNCATE users" },
      { name: "RESTART IDENTITY", description: "Сбрасывает последовательности, связанные со столбцами таблицы.", example: "TRUNCATE users RESTART IDENTITY" },
      { name: "CASCADE", description: "Очищает также все таблицы, имеющие внешние ключи на данную таблицу.", example: "TRUNCATE users CASCADE" }
    ],
    example: "TRUNCATE TABLE logs RESTART IDENTITY;"
  },
  {
    id: "ddl_create_index",
    name: "CREATE INDEX",
    category: "DDL",
    description: "Создает индекс для ускорения поиска данных в таблице.",
    syntax: "CREATE [UNIQUE] INDEX [CONCURRENTLY] [name] ON table_name [USING method] (column_name [ASC | DESC] [NULLS {FIRST | LAST}] [, ...]);",
    arguments: [
      { name: "UNIQUE", description: "Создает уникальный индекс (значения не могут повторяться).", example: "CREATE UNIQUE INDEX ..." },
      { name: "CONCURRENTLY", description: "Создает индекс без блокировки таблицы для записи.", example: "CREATE INDEX CONCURRENTLY ..." },
      { name: "USING method", description: "Метод индексирования (btree, hash, gist, spgist, gin, brin).", example: "USING btree" },
      { name: "(column_name ...)", description: "Столбец или выражение для индексации.", example: "(email)" }
    ],
    example: "CREATE INDEX idx_users_email ON users (email);"
  },
  {
    id: "ddl_drop_index",
    name: "DROP INDEX",
    category: "DDL",
    description: "Удаляет индекс.",
    syntax: "DROP INDEX [CONCURRENTLY] [IF EXISTS] name [, ...] [CASCADE | RESTRICT];",
    arguments: [
      { name: "CONCURRENTLY", description: "Удаляет индекс без блокировки таблицы.", example: "DROP INDEX CONCURRENTLY idx_name" },
      { name: "IF EXISTS", description: "Предотвращает ошибку, если индекс не существует.", example: "DROP INDEX IF EXISTS idx_name" },
      { name: "name", description: "Имя удаляемого индекса.", example: "DROP INDEX idx_users_email" }
    ],
    example: "DROP INDEX IF EXISTS idx_users_email;"
  },
  {
    id: "ddl_create_view",
    name: "CREATE VIEW",
    category: "DDL",
    description: "Создает представление (виртуальную таблицу) на основе запроса.",
    syntax: "CREATE [OR REPLACE] VIEW name [ ( column_name [, ...] ) ] AS query;",
    arguments: [
      { name: "OR REPLACE", description: "Заменяет представление, если оно уже существует.", example: "CREATE OR REPLACE VIEW ..." },
      { name: "name", description: "Имя представления.", example: "CREATE VIEW active_users" },
      { name: "AS query", description: "SELECT запрос, определяющий представление.", example: "AS SELECT * FROM users WHERE active = true" }
    ],
    example: "CREATE VIEW active_users AS SELECT id, name FROM users WHERE status = 'active';"
  },
  {
    id: "ddl_drop_view",
    name: "DROP VIEW",
    category: "DDL",
    description: "Удаляет представление.",
    syntax: "DROP VIEW [IF EXISTS] name [, ...] [CASCADE | RESTRICT];",
    arguments: [
      { name: "IF EXISTS", description: "Предотвращает ошибку, если представление не существует.", example: "DROP VIEW IF EXISTS v_name" },
      { name: "name", description: "Имя удаляемого представления.", example: "DROP VIEW active_users" },
      { name: "CASCADE", description: "Удаляет объекты, зависящие от представления.", example: "DROP VIEW active_users CASCADE" }
    ],
    example: "DROP VIEW IF EXISTS active_users;"
  },
  {
    id: "ddl_create_sequence",
    name: "CREATE SEQUENCE",
    category: "DDL",
    description: "Создает генератор последовательностей чисел.",
    syntax: "CREATE SEQUENCE [IF NOT EXISTS] name [INCREMENT [ BY ] increment] [MINVALUE minvalue | NO MINVALUE] [MAXVALUE maxvalue | NO MAXVALUE] [START [ WITH ] start];",
    arguments: [
      { name: "name", description: "Имя последовательности.", example: "CREATE SEQUENCE user_id_seq" },
      { name: "INCREMENT BY", description: "Шаг увеличения последовательности.", example: "INCREMENT BY 1" },
      { name: "START WITH", description: "Начальное значение.", example: "START WITH 1000" }
    ],
    example: "CREATE SEQUENCE order_seq START 1000 INCREMENT 1;"
  },
  {
    id: "ddl_drop_sequence",
    name: "DROP SEQUENCE",
    category: "DDL",
    description: "Удаляет последовательность.",
    syntax: "DROP SEQUENCE [IF EXISTS] name [, ...] [CASCADE | RESTRICT];",
    arguments: [
      { name: "IF EXISTS", description: "Предотвращает ошибку, если последовательность не существует.", example: "DROP SEQUENCE IF EXISTS seq_name" },
      { name: "name", description: "Имя удаляемой последовательности.", example: "DROP SEQUENCE order_seq" }
    ],
    example: "DROP SEQUENCE IF EXISTS order_seq;"
  },
  {
    id: "join_inner",
    name: "INNER JOIN",
    category: "Joins",
    description: "Возвращает строки, когда есть совпадение в обеих таблицах.",
    syntax: "SELECT ... FROM table1 [INNER] JOIN table2 ON table1.column = table2.column;",
    arguments: [
      { name: "table1, table2", description: "Таблицы для соединения.", example: "users JOIN orders" },
      { name: "ON condition", description: "Условие соединения.", example: "ON users.id = orders.user_id" }
    ],
    example: "SELECT users.name, orders.amount FROM users INNER JOIN orders ON users.id = orders.user_id;"
  },
  {
    id: "join_left",
    name: "LEFT JOIN",
    category: "Joins",
    description: "Возвращает все строки из левой таблицы и совпадающие строки из правой таблицы. Если совпадений нет, результат содержит NULL с правой стороны.",
    syntax: "SELECT ... FROM table1 LEFT [OUTER] JOIN table2 ON table1.column = table2.column;",
    arguments: [
      { name: "LEFT JOIN", description: "Ключевое слово для левого внешнего соединения.", example: "users LEFT JOIN orders" }
    ],
    example: "SELECT users.name, orders.amount FROM users LEFT JOIN orders ON users.id = orders.user_id;"
  },
  {
    id: "join_right",
    name: "RIGHT JOIN",
    category: "Joins",
    description: "Возвращает все строки из правой таблицы и совпадающие строки из левой таблицы. Если совпадений нет, результат содержит NULL с левой стороны.",
    syntax: "SELECT ... FROM table1 RIGHT [OUTER] JOIN table2 ON table1.column = table2.column;",
    arguments: [
      { name: "RIGHT JOIN", description: "Ключевое слово для правого внешнего соединения.", example: "users RIGHT JOIN orders" }
    ],
    example: "SELECT users.name, orders.amount FROM users RIGHT JOIN orders ON users.id = orders.user_id;"
  },
  {
    id: "join_full",
    name: "FULL JOIN",
    category: "Joins",
    description: "Возвращает строки, когда есть совпадение в одной из таблиц. То есть возвращает все строки из левой и правой таблиц, с NULL там, где нет совпадений.",
    syntax: "SELECT ... FROM table1 FULL [OUTER] JOIN table2 ON table1.column = table2.column;",
    arguments: [
      { name: "FULL JOIN", description: "Ключевое слово для полного внешнего соединения.", example: "users FULL JOIN orders" }
    ],
    example: "SELECT users.name, orders.amount FROM users FULL JOIN orders ON users.id = orders.user_id;"
  },
  {
    id: "join_cross",
    name: "CROSS JOIN",
    category: "Joins",
    description: "Возвращает декартово произведение двух таблиц (каждая строка первой таблицы соединяется с каждой строкой второй таблицы).",
    syntax: "SELECT ... FROM table1 CROSS JOIN table2;",
    arguments: [
      { name: "CROSS JOIN", description: "Ключевое слово для перекрестного соединения.", example: "colors CROSS JOIN sizes" }
    ],
    example: "SELECT * FROM colors CROSS JOIN sizes;"
  },
  {
    id: "join_natural",
    name: "NATURAL JOIN",
    category: "Joins",
    description: "Создает неявное соединение на основе столбцов с одинаковыми именами в обеих таблицах.",
    syntax: "SELECT ... FROM table1 NATURAL [INNER | LEFT | RIGHT | FULL] JOIN table2;",
    arguments: [
      { name: "NATURAL", description: "Автоматически находит столбцы с одинаковыми именами для условия соединения.", example: "NATURAL JOIN" }
    ],
    example: "SELECT * FROM employees NATURAL JOIN departments;"
  },
  {
    id: "transaction_begin",
    name: "BEGIN",
    category: "Управление транзакциями",
    description: "Начинает блок транзакции. Все последующие команды выполняются в рамках одной транзакции до COMMIT или ROLLBACK.",
    syntax: "BEGIN [WORK | TRANSACTION] [ISOLATION LEVEL {SERIALIZABLE | REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED}];",
    arguments: [
      { name: "WORK | TRANSACTION", description: "Необязательные ключевые слова для ясности.", example: "BEGIN TRANSACTION" },
      { name: "ISOLATION LEVEL", description: "Устанавливает уровень изоляции транзакции.", example: "ISOLATION LEVEL SERIALIZABLE" }
    ],
    example: "BEGIN; UPDATE accounts SET balance = balance - 100 WHERE id = 1;"
  },
  {
    id: "transaction_commit",
    name: "COMMIT",
    category: "Управление транзакциями",
    description: "Фиксирует изменения, сделанные в текущей транзакции, делая их видимыми для других пользователей.",
    syntax: "COMMIT [WORK | TRANSACTION];",
    arguments: [
      { name: "WORK | TRANSACTION", description: "Необязательные ключевые слова.", example: "COMMIT WORK" }
    ],
    example: "COMMIT;"
  },
  {
    id: "transaction_rollback",
    name: "ROLLBACK",
    category: "Управление транзакциями",
    description: "Отменяет текущую транзакцию и все изменения, сделанные в ней.",
    syntax: "ROLLBACK [WORK | TRANSACTION];",
    arguments: [
      { name: "WORK | TRANSACTION", description: "Необязательные ключевые слова.", example: "ROLLBACK TRANSACTION" }
    ],
    example: "ROLLBACK;"
  },
  {
    id: "other_in",
    name: "IN",
    category: "Прочие базовые конструкции",
    description: "Проверяет, соответствует ли значение любому значению в списке или подзапросе.",
    syntax: "expression IN (value [, ...]) | expression IN (subquery);",
    arguments: [
      { name: "value [, ...]", description: "Список значений для проверки.", example: "IN (1, 2, 3)" },
      { name: "subquery", description: "Подзапрос, возвращающий один столбец значений.", example: "IN (SELECT id FROM users)" }
    ],
    example: "SELECT * FROM users WHERE id IN (1, 5, 10);"
  },
  {
    id: "other_between",
    name: "BETWEEN",
    category: "Прочие базовые конструкции",
    description: "Проверяет, находится ли значение в указанном диапазоне (включительно).",
    syntax: "expression BETWEEN begin_expression AND end_expression;",
    arguments: [
      { name: "begin_expression", description: "Начало диапазона.", example: "BETWEEN 10" },
      { name: "end_expression", description: "Конец диапазона.", example: "AND 20" }
    ],
    example: "SELECT * FROM products WHERE price BETWEEN 100 AND 500;"
  },
  {
    id: "other_is_null",
    name: "IS NULL",
    category: "Прочие базовые конструкции",
    description: "Проверяет, является ли значение NULL.",
    syntax: "expression IS NULL;",
    arguments: [
      { name: "expression", description: "Выражение для проверки.", example: "email IS NULL" }
    ],
    example: "SELECT * FROM users WHERE phone IS NULL;"
  },
  {
    id: "other_is_not_null",
    name: "IS NOT NULL",
    category: "Прочие базовые конструкции",
    description: "Проверяет, что значение не является NULL.",
    syntax: "expression IS NOT NULL;",
    arguments: [
      { name: "expression", description: "Выражение для проверки.", example: "email IS NOT NULL" }
    ],
    example: "SELECT * FROM users WHERE email IS NOT NULL;"
  },
  {
    id: "other_exists",
    name: "EXISTS",
    category: "Прочие базовые конструкции",
    description: "Проверяет, возвращает ли подзапрос хотя бы одну строку. Возвращает TRUE, если подзапрос возвращает строки.",
    syntax: "EXISTS (subquery);",
    arguments: [
      { name: "subquery", description: "Подзапрос для проверки.", example: "EXISTS (SELECT 1 FROM orders WHERE user_id = users.id)" }
    ],
    example: "SELECT name FROM users WHERE EXISTS (SELECT 1 FROM orders WHERE user_id = users.id);"
  },
  {
    id: "other_case",
    name: "CASE",
    category: "Прочие базовые конструкции",
    description: "Условное выражение, аналогичное if-then-else в других языках программирования.",
    syntax: "CASE WHEN condition THEN result [WHEN ... THEN ...] [ELSE result] END;",
    arguments: [
      { name: "WHEN condition THEN result", description: "Условие и результат, если условие истинно.", example: "WHEN age >= 18 THEN 'Adult'" },
      { name: "ELSE result", description: "Результат, если ни одно условие не выполнено.", example: "ELSE 'Minor'" }
    ],
    example: "SELECT name, CASE WHEN age >= 18 THEN 'Adult' ELSE 'Minor' END AS status FROM users;"
  },
  {
    id: "other_cast",
    name: "CAST",
    category: "Прочие базовые конструкции",
    description: "Преобразует значение одного типа данных в другой.",
    syntax: "CAST (expression AS type) | expression::type;",
    arguments: [
      { name: "expression", description: "Значение для преобразования.", example: "'123'" },
      { name: "type", description: "Целевой тип данных.", example: "INTEGER" }
    ],
    example: "SELECT CAST('100' AS INTEGER) + 50; -- или '100'::INTEGER + 50"
  },
  {
    id: "other_union",
    name: "UNION",
    category: "Прочие базовые конструкции",
    description: "Объединяет результаты двух или более запросов в один результирующий набор. UNION удаляет дубликаты, UNION ALL сохраняет их.",
    syntax: "query1 UNION [ALL | DISTINCT] query2;",
    arguments: [
      { name: "ALL", description: "Включает все строки, в том числе дубликаты.", example: "UNION ALL" },
      { name: "DISTINCT", description: "Удаляет дубликаты (по умолчанию).", example: "UNION DISTINCT" }
    ],
    example: "SELECT city FROM customers UNION SELECT city FROM suppliers;"
  },
  {
    id: "cte_with",
    name: "WITH (CTE)",
    category: "CTE",
    description: "Определяет временный именованный набор данных (Common Table Expression), который можно использовать в основном запросе. Улучшает читаемость и позволяет переиспользовать логику.",
    syntax: "WITH cte_name [(column_name [, ...])] AS (query) [, ...] SELECT ...;",
    arguments: [
      { name: "cte_name", description: "Имя временной таблицы.", example: "WITH regional_sales AS ..." },
      { name: "(query)", description: "Запрос, формирующий CTE.", example: "(SELECT region, SUM(amount) FROM orders GROUP BY region)" }
    ],
    example: "WITH regional_sales AS (SELECT region, SUM(amount) AS total_sales FROM orders GROUP BY region) SELECT region, total_sales FROM regional_sales WHERE total_sales > 10000;"
  },
  {
    id: "cte_recursive",
    name: "WITH RECURSIVE",
    category: "CTE",
    description: "Позволяет CTE ссылаться на само себя. Полезно для работы с иерархическими данными (деревья, графы).",
    syntax: "WITH RECURSIVE cte_name AS (initial_query UNION [ALL] recursive_query) SELECT ...;",
    arguments: [
      { name: "initial_query", description: "Базовая часть рекурсии (нерекурсивный член).", example: "SELECT 1" },
      { name: "recursive_query", description: "Рекурсивная часть, ссылающаяся на cte_name.", example: "SELECT n + 1 FROM t WHERE n < 100" }
    ],
    example: "WITH RECURSIVE t(n) AS (VALUES (1) UNION ALL SELECT n+1 FROM t WHERE n < 10) SELECT sum(n) FROM t;"
  },
  {
    id: "window_over",
    name: "OVER",
    category: "Оконные функции",
    description: "Определяет окно (набор строк), к которому применяется оконная функция. Позволяет выполнять вычисления по набору строк, связанных с текущей строкой.",
    syntax: "function_name() OVER ( [PARTITION BY expression [, ...]] [ORDER BY expression [ASC | DESC] [, ...]] [frame_clause] );",
    arguments: [
      { name: "PARTITION BY", description: "Разделяет строки на группы (окна).", example: "PARTITION BY department_id" },
      { name: "ORDER BY", description: "Определяет порядок строк внутри каждой группы.", example: "ORDER BY salary DESC" },
      { name: "frame_clause", description: "Определяет подмножество строк внутри партиции (например, ROWS BETWEEN ...).", example: "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW" }
    ],
    example: "SELECT name, salary, AVG(salary) OVER (PARTITION BY department_id) FROM employees;"
  },
  {
    id: "window_partition_by",
    name: "PARTITION BY",
    category: "Оконные функции",
    description: "Разделяет результирующий набор на партиции, к которым применяется оконная функция независимо.",
    syntax: "PARTITION BY expression [, ...];",
    arguments: [
      { name: "expression", description: "Столбец или выражение для группировки.", example: "PARTITION BY city" }
    ],
    example: "SELECT city, SUM(population) OVER (PARTITION BY country) FROM cities;"
  },
  {
    id: "window_order_by",
    name: "ORDER BY (Window)",
    category: "Оконные функции",
    description: "Определяет порядок обработки строк внутри партиции оконной функции.",
    syntax: "ORDER BY expression [ASC | DESC] [NULLS {FIRST | LAST}] [, ...];",
    arguments: [
      { name: "expression", description: "Столбец для сортировки.", example: "ORDER BY created_at" }
    ],
    example: "SELECT id, ROW_NUMBER() OVER (ORDER BY id) FROM users;"
  },
  {
    id: "window_frame",
    name: "Window Frame",
    category: "Оконные функции",
    description: "Определяет набор строк внутри партиции для вычислений (например, скользящее среднее).",
    syntax: "{ ROWS | RANGE | GROUPS } BETWEEN frame_start AND frame_end;",
    arguments: [
      { name: "ROWS", description: "Физические строки.", example: "ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING" },
      { name: "RANGE", description: "Логический диапазон значений.", example: "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW" }
    ],
    example: "SELECT salary, SUM(salary) OVER (ORDER BY salary ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) FROM employees;"
  },
  {
    id: "window_lag",
    name: "LAG",
    category: "Оконные функции",
    description: "Возвращает значение из строки, находящейся на заданном смещении перед текущей строкой в окне.",
    syntax: "LAG(value [, offset [, default_value]]) OVER (...);",
    arguments: [
      { name: "value", description: "Выражение для возврата.", example: "LAG(salary)" },
      { name: "offset", description: "Количество строк назад (по умолчанию 1).", example: "LAG(salary, 1)" },
      { name: "default_value", description: "Значение, если строки нет (по умолчанию NULL).", example: "LAG(salary, 1, 0)" }
    ],
    example: "SELECT date, sales, LAG(sales) OVER (ORDER BY date) AS prev_sales FROM daily_sales;"
  },
  {
    id: "window_lead",
    name: "LEAD",
    category: "Оконные функции",
    description: "Возвращает значение из строки, находящейся на заданном смещении после текущей строки в окне.",
    syntax: "LEAD(value [, offset [, default_value]]) OVER (...);",
    arguments: [
      { name: "value", description: "Выражение для возврата.", example: "LEAD(salary)" },
      { name: "offset", description: "Количество строк вперед (по умолчанию 1).", example: "LEAD(salary, 1)" }
    ],
    example: "SELECT date, sales, LEAD(sales) OVER (ORDER BY date) AS next_sales FROM daily_sales;"
  },
  {
    id: "window_first_value",
    name: "FIRST_VALUE",
    category: "Оконные функции",
    description: "Возвращает значение из первой строки в окне.",
    syntax: "FIRST_VALUE(value) OVER (...);",
    arguments: [
      { name: "value", description: "Выражение для возврата.", example: "FIRST_VALUE(name)" }
    ],
    example: "SELECT name, salary, FIRST_VALUE(salary) OVER (ORDER BY salary DESC) AS highest_salary FROM employees;"
  },
  {
    id: "window_last_value",
    name: "LAST_VALUE",
    category: "Оконные функции",
    description: "Возвращает значение из последней строки в окне.",
    syntax: "LAST_VALUE(value) OVER (...);",
    arguments: [
      { name: "value", description: "Выражение для возврата.", example: "LAST_VALUE(name)" }
    ],
    example: "SELECT name, salary, LAST_VALUE(salary) OVER (ORDER BY salary ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS lowest_salary FROM employees;"
  },
  {
    id: "window_nth_value",
    name: "NTH_VALUE",
    category: "Оконные функции",
    description: "Возвращает значение из n-й строки в окне.",
    syntax: "NTH_VALUE(value, nth) OVER (...);",
    arguments: [
      { name: "value", description: "Выражение для возврата.", example: "NTH_VALUE(name, 2)" },
      { name: "nth", description: "Номер строки (1-based).", example: "2" }
    ],
    example: "SELECT name, salary, NTH_VALUE(salary, 2) OVER (ORDER BY salary DESC) AS second_highest FROM employees;"
  },
  {
    id: "window_row_number",
    name: "ROW_NUMBER",
    category: "Оконные функции",
    description: "Присваивает уникальный номер каждой строке в партиции, начиная с 1.",
    syntax: "ROW_NUMBER() OVER (...);",
    arguments: [],
    example: "SELECT name, ROW_NUMBER() OVER (ORDER BY name) AS row_num FROM users;"
  },
  {
    id: "data_copy",
    name: "COPY",
    category: "Работа с данными",
    description: "Копирует данные между файлом и таблицей. Эффективный способ массовой загрузки/выгрузки данных.",
    syntax: "COPY table_name [(column_name [, ...])] FROM {'filename' | STDIN} [WITH] (option [, ...]);",
    arguments: [
      { name: "FROM 'filename'", description: "Путь к файлу для чтения данных.", example: "FROM '/tmp/data.csv'" },
      { name: "TO 'filename'", description: "Путь к файлу для записи данных.", example: "TO '/tmp/output.csv'" },
      { name: "(FORMAT csv, HEADER)", description: "Опции формата (CSV, TEXT, BINARY) и наличие заголовка.", example: "(FORMAT csv, HEADER)" }
    ],
    example: "COPY users FROM '/path/to/users.csv' WITH (FORMAT csv, HEADER);"
  },
  {
    id: "data_explain",
    name: "EXPLAIN",
    category: "Работа с данными",
    description: "Показывает план выполнения запроса, который планировщик PostgreSQL сгенерировал для переданного оператора.",
    syntax: "EXPLAIN [(option [, ...])] statement;",
    arguments: [
      { name: "ANALYZE", description: "Выполняет запрос и показывает реальное время выполнения.", example: "EXPLAIN ANALYZE SELECT ..." },
      { name: "BUFFERS", description: "Показывает использование буферов (чтение с диска/из памяти).", example: "EXPLAIN (ANALYZE, BUFFERS) SELECT ..." }
    ],
    example: "EXPLAIN ANALYZE SELECT * FROM users WHERE id = 1;"
  },
  {
    id: "data_vacuum",
    name: "VACUUM",
    category: "Работа с данными",
    description: "Очищает базу данных, удаляя \"мертвые\" кортежи (строки), освобождая место. Также может обновлять статистику.",
    syntax: "VACUUM [(FULL, FREEZE, VERBOSE, ANALYZE)] [table_name];",
    arguments: [
      { name: "FULL", description: "Полная очистка, блокирует таблицу и переписывает её, максимально освобождая место.", example: "VACUUM FULL users" },
      { name: "ANALYZE", description: "Обновляет статистику для планировщика запросов.", example: "VACUUM ANALYZE users" }
    ],
    example: "VACUUM ANALYZE users;"
  },
  {
    id: "data_analyze",
    name: "ANALYZE",
    category: "Работа с данными",
    description: "Сбор статистики о содержимом таблиц базы данных. Эта статистика используется планировщиком запросов для построения эффективных планов выполнения.",
    syntax: "ANALYZE [VERBOSE] [table_name];",
    arguments: [
      { name: "VERBOSE", description: "Выводит сообщения о ходе выполнения.", example: "ANALYZE VERBOSE users" }
    ],
    example: "ANALYZE users;"
  },
  {
    id: "data_reindex",
    name: "REINDEX",
    category: "Работа с данными",
    description: "Перестраивает индекс. Полезно, если индекс поврежден или раздут.",
    syntax: "REINDEX {INDEX | TABLE | SCHEMA | DATABASE | SYSTEM} [CONCURRENTLY] name;",
    arguments: [
      { name: "INDEX name", description: "Перестраивает конкретный индекс.", example: "REINDEX INDEX idx_users_email" },
      { name: "TABLE name", description: "Перестраивает все индексы таблицы.", example: "REINDEX TABLE users" },
      { name: "CONCURRENTLY", description: "Перестраивает индекс без блокировки таблицы (только для INDEX и TABLE).", example: "REINDEX INDEX CONCURRENTLY idx_name" }
    ],
    example: "REINDEX TABLE users;"
  },
  {
    id: "ddl_create_materialized_view",
    name: "CREATE MATERIALIZED VIEW",
    category: "DDL (Продвинутый)",
    description: "Создает материализованное представление — снимок данных запроса, который сохраняется физически.",
    syntax: "CREATE MATERIALIZED VIEW [IF NOT EXISTS] name AS query [WITH [NO] DATA];",
    arguments: [
      { name: "WITH DATA", description: "Заполняет представление данными при создании (по умолчанию).", example: "WITH DATA" },
      { name: "WITH NO DATA", description: "Создает пустое представление (нужно обновить позже).", example: "WITH NO DATA" }
    ],
    example: "CREATE MATERIALIZED VIEW monthly_sales AS SELECT * FROM sales WHERE date > '2023-01-01';"
  },
  {
    id: "ddl_refresh_materialized_view",
    name: "REFRESH MATERIALIZED VIEW",
    category: "DDL (Продвинутый)",
    description: "Обновляет данные в материализованном представлении.",
    syntax: "REFRESH MATERIALIZED VIEW [CONCURRENTLY] name [WITH [NO] DATA];",
    arguments: [
      { name: "CONCURRENTLY", description: "Обновляет представление без блокировки чтения (требует уникального индекса).", example: "REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales" }
    ],
    example: "REFRESH MATERIALIZED VIEW monthly_sales;"
  },
  {
    id: "ddl_create_function",
    name: "CREATE FUNCTION",
    category: "DDL (Продвинутый)",
    description: "Создает пользовательскую функцию.",
    syntax: "CREATE [OR REPLACE] FUNCTION name ( [argname argtype [, ...]] ) RETURNS rettype LANGUAGE lang_name AS 'definition';",
    arguments: [
      { name: "RETURNS rettype", description: "Тип возвращаемого значения.", example: "RETURNS INTEGER" },
      { name: "LANGUAGE lang_name", description: "Язык реализации (plpgsql, sql, c и т.д.).", example: "LANGUAGE plpgsql" },
      { name: "AS 'definition'", description: "Тело функции.", example: "AS $$ BEGIN RETURN 1; END; $$" }
    ],
    example: "CREATE FUNCTION add(a INT, b INT) RETURNS INT LANGUAGE plpgsql AS $$ BEGIN RETURN a + b; END; $$;"
  },
  {
    id: "ddl_create_procedure",
    name: "CREATE PROCEDURE",
    category: "DDL (Продвинутый)",
    description: "Создает хранимую процедуру. В отличие от функций, процедуры могут управлять транзакциями (COMMIT/ROLLBACK).",
    syntax: "CREATE [OR REPLACE] PROCEDURE name ( [argname argtype [, ...]] ) LANGUAGE lang_name AS 'definition';",
    arguments: [
      { name: "LANGUAGE", description: "Язык процедуры.", example: "LANGUAGE plpgsql" }
    ],
    example: "CREATE PROCEDURE update_stats() LANGUAGE plpgsql AS $$ BEGIN UPDATE stats SET val = val + 1; COMMIT; END; $$;"
  },
  {
    id: "ddl_create_trigger",
    name: "CREATE TRIGGER",
    category: "DDL (Продвинутый)",
    description: "Создает триггер, который автоматически выполняется при определенных событиях (INSERT, UPDATE, DELETE).",
    syntax: "CREATE [OR REPLACE] TRIGGER name {BEFORE | AFTER | INSTEAD OF} {event [OR ...]} ON table_name [FOR [EACH] {ROW | STATEMENT}] EXECUTE FUNCTION func_name();",
    arguments: [
      { name: "BEFORE | AFTER", description: "Когда запускать триггер.", example: "BEFORE INSERT" },
      { name: "FOR EACH ROW", description: "Запускать для каждой измененной строки.", example: "FOR EACH ROW" },
      { name: "EXECUTE FUNCTION", description: "Функция, которая будет выполнена.", example: "EXECUTE FUNCTION log_change()" }
    ],
    example: "CREATE TRIGGER check_update BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION check_user_status();"
  },
  {
    id: "ddl_create_type",
    name: "CREATE TYPE",
    category: "DDL (Продвинутый)",
    description: "Создает пользовательский тип данных (составной тип или ENUM).",
    syntax: "CREATE TYPE name AS (attribute_name data_type [, ...]) | ENUM ('label' [, ...]);",
    arguments: [
      { name: "AS (...)", description: "Определение полей составного типа.", example: "AS (city text, street text)" },
      { name: "ENUM", description: "Перечисление допустимых значений.", example: "ENUM ('active', 'inactive')" }
    ],
    example: "CREATE TYPE status_enum AS ENUM ('open', 'closed', 'pending');"
  },
  {
    id: "ddl_create_domain",
    name: "CREATE DOMAIN",
    category: "DDL (Продвинутый)",
    description: "Создает домен — тип данных с ограничениями (constraints).",
    syntax: "CREATE DOMAIN name [AS] data_type [DEFAULT expression] [CONSTRAINT name CHECK (condition)];",
    arguments: [
      { name: "AS data_type", description: "Базовый тип данных.", example: "AS INTEGER" },
      { name: "CHECK (condition)", description: "Условие проверки значений.", example: "CHECK (VALUE > 0)" }
    ],
    example: "CREATE DOMAIN positive_int AS INTEGER CHECK (VALUE > 0);"
  },
  {
    id: "ddl_create_extension",
    name: "CREATE EXTENSION",
    category: "DDL (Продвинутый)",
    description: "Загружает расширение в текущую базу данных.",
    syntax: "CREATE EXTENSION [IF NOT EXISTS] extension_name [CASCADE];",
    arguments: [
      { name: "IF NOT EXISTS", description: "Не выдавать ошибку, если расширение уже установлено.", example: "IF NOT EXISTS" },
      { name: "extension_name", description: "Имя расширения.", example: "uuid-ossp" }
    ],
    example: "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"
  },
  {
    id: "ddl_comment",
    name: "COMMENT",
    category: "DDL (Продвинутый)",
    description: "Добавляет комментарий к объекту базы данных.",
    syntax: "COMMENT ON {TABLE | COLUMN | FUNCTION | ...} object_name IS 'text';",
    arguments: [
      { name: "object_name", description: "Имя объекта.", example: "users" },
      { name: "IS 'text'", description: "Текст комментария.", example: "IS 'Таблица пользователей'" }
    ],
    example: "COMMENT ON TABLE users IS 'Stores user account information';"
  },
  {
    id: "dcl_grant",
    name: "GRANT",
    category: "DCL",
    description: "Предоставляет права доступа к объектам базы данных пользователям или ролям.",
    syntax: "GRANT {privilege [, ...] | ALL} ON object TO {role_name | PUBLIC} [WITH GRANT OPTION];",
    arguments: [
      { name: "privilege", description: "Тип права (SELECT, INSERT, UPDATE, DELETE, ALL).", example: "SELECT, INSERT" },
      { name: "object", description: "Объект, к которому предоставляется доступ (TABLE name, DATABASE name).", example: "TABLE users" },
      { name: "WITH GRANT OPTION", description: "Позволяет получателю передавать это право другим.", example: "WITH GRANT OPTION" }
    ],
    example: "GRANT SELECT, INSERT ON users TO app_user;"
  },
  {
    id: "dcl_revoke",
    name: "REVOKE",
    category: "DCL",
    description: "Отзывает ранее предоставленные права доступа.",
    syntax: "REVOKE [GRANT OPTION FOR] {privilege [, ...] | ALL} ON object FROM {role_name | PUBLIC} [CASCADE | RESTRICT];",
    arguments: [
      { name: "privilege", description: "Тип отзываемого права.", example: "DELETE" },
      { name: "CASCADE", description: "Отзывает права также у тех, кому они были переданы через GRANT OPTION.", example: "CASCADE" }
    ],
    example: "REVOKE DELETE ON users FROM app_user;"
  },
  {
    id: "dcl_create_role",
    name: "CREATE ROLE",
    category: "DCL",
    description: "Создает новую роль базы данных (пользователя или группу).",
    syntax: "CREATE ROLE name [WITH] [LOGIN | NOLOGIN] [SUPERUSER | NOSUPERUSER] [CREATEDB | NOCREATEDB] [CREATEROLE | NOCREATEROLE] [PASSWORD 'password'];",
    arguments: [
      { name: "LOGIN", description: "Разрешает вход в базу данных (делает роль пользователем).", example: "LOGIN" },
      { name: "PASSWORD", description: "Устанавливает пароль для роли.", example: "PASSWORD 'secret'" },
      { name: "SUPERUSER", description: "Дает полные права администратора (использовать с осторожностью).", example: "SUPERUSER" }
    ],
    example: "CREATE ROLE app_admin WITH LOGIN PASSWORD 'secure_pass' CREATEDB;"
  },
  {
    id: "dcl_create_user",
    name: "CREATE USER",
    category: "DCL",
    description: "Псевдоним для CREATE ROLE ... LOGIN. Создает пользователя базы данных.",
    syntax: "CREATE USER name [WITH] [option ...];",
    arguments: [
      { name: "option", description: "Те же опции, что и у CREATE ROLE.", example: "PASSWORD '12345'" }
    ],
    example: "CREATE USER john WITH PASSWORD 'qwerty';"
  },
  {
    id: "dcl_alter_role",
    name: "ALTER ROLE",
    category: "DCL",
    description: "Изменяет атрибуты существующей роли.",
    syntax: "ALTER ROLE name [WITH] option [...];",
    arguments: [
      { name: "option", description: "Новые параметры роли (например, новый пароль).", example: "PASSWORD 'new_pass'" }
    ],
    example: "ALTER ROLE john WITH PASSWORD 'new_secret_password';"
  },
  {
    id: "dcl_drop_role",
    name: "DROP ROLE",
    category: "DCL",
    description: "Удаляет роль.",
    syntax: "DROP ROLE [IF EXISTS] name [, ...];",
    arguments: [
      { name: "IF EXISTS", description: "Предотвращает ошибку, если роль не существует.", example: "IF EXISTS" }
    ],
    example: "DROP ROLE IF EXISTS john;"
  },
  {
    id: "admin_show",
    name: "SHOW",
    category: "Администрирование",
    description: "Показывает текущее значение параметра конфигурации.",
    syntax: "SHOW {configuration_parameter | ALL};",
    arguments: [
      { name: "configuration_parameter", description: "Имя параметра.", example: "work_mem" },
      { name: "ALL", description: "Показывает все параметры.", example: "ALL" }
    ],
    example: "SHOW max_connections;"
  },
  {
    id: "admin_set",
    name: "SET",
    category: "Администрирование",
    description: "Изменяет значение параметра конфигурации для текущей сессии.",
    syntax: "SET [SESSION | LOCAL] configuration_parameter {TO | =} {value | 'value' | DEFAULT};",
    arguments: [
      { name: "SESSION", description: "Действует до конца сессии (по умолчанию).", example: "SET SESSION" },
      { name: "LOCAL", description: "Действует только в текущей транзакции.", example: "SET LOCAL" }
    ],
    example: "SET work_mem = '64MB';"
  },
  {
    id: "admin_alter_system",
    name: "ALTER SYSTEM",
    category: "Администрирование",
    description: "Изменяет глобальные параметры конфигурации в файле postgresql.auto.conf. Требует перезагрузки конфигурации или сервера.",
    syntax: "ALTER SYSTEM SET configuration_parameter {TO | =} {value | 'value' | DEFAULT};",
    arguments: [
      { name: "configuration_parameter", description: "Параметр для изменения.", example: "max_connections" }
    ],
    example: "ALTER SYSTEM SET max_connections = 200;"
  },
  {
    id: "admin_pg_hba",
    name: "pg_hba.conf",
    category: "Администрирование",
    description: "Файл конфигурации аутентификации клиентов (Host-Based Authentication).",
    syntax: "TYPE  DATABASE  USER  ADDRESS  METHOD",
    arguments: [
      { name: "TYPE", description: "Тип соединения (local, host, hostssl).", example: "host" },
      { name: "DATABASE", description: "База данных (all, specific_db).", example: "all" },
      { name: "USER", description: "Пользователь (all, specific_user).", example: "all" },
      { name: "ADDRESS", description: "IP-адрес или подсеть клиента.", example: "0.0.0.0/0" },
      { name: "METHOD", description: "Метод аутентификации (md5, scram-sha-256, trust, reject).", example: "scram-sha-256" }
    ],
    example: "host    all             all             0.0.0.0/0            scram-sha-256"
  },
  {
    id: "admin_postgresql_conf",
    name: "postgresql.conf",
    category: "Администрирование",
    description: "Основной файл конфигурации сервера PostgreSQL.",
    syntax: "parameter = value",
    arguments: [
      { name: "parameter", description: "Имя настройки.", example: "listen_addresses" },
      { name: "value", description: "Значение настройки.", example: "'*'" }
    ],
    example: "listen_addresses = '*'"
  },
  {
    id: "lock_table",
    name: "LOCK",
    category: "Блокировки",
    description: "Явно блокирует таблицу в указанном режиме. Блокировка действует до конца транзакции.",
    syntax: "LOCK [TABLE] [ONLY] name [, ...] [IN lock_mode MODE] [NOWAIT];",
    arguments: [
      { name: "lock_mode", description: "Режим блокировки (ACCESS SHARE, ROW SHARE, ROW EXCLUSIVE, SHARE UPDATE EXCLUSIVE, SHARE, SHARE ROW EXCLUSIVE, EXCLUSIVE, ACCESS EXCLUSIVE).", example: "ACCESS EXCLUSIVE" },
      { name: "NOWAIT", description: "Не ждать освобождения блокировки, а сразу выдать ошибку, если заблокировать не удалось.", example: "NOWAIT" }
    ],
    example: "BEGIN; LOCK TABLE users IN ACCESS EXCLUSIVE MODE; ... COMMIT;"
  },
  {
    id: "lock_for_update",
    name: "SELECT FOR UPDATE",
    category: "Блокировки",
    description: "Блокирует выбранные строки для обновления, предотвращая их изменение другими транзакциями до завершения текущей.",
    syntax: "SELECT ... FOR UPDATE [OF table_name [, ...]] [NOWAIT | SKIP LOCKED];",
    arguments: [
      { name: "NOWAIT", description: "Ошибка, если строка заблокирована.", example: "NOWAIT" },
      { name: "SKIP LOCKED", description: "Пропускает заблокированные строки.", example: "SKIP LOCKED" }
    ],
    example: "SELECT * FROM orders WHERE status = 'pending' FOR UPDATE SKIP LOCKED;"
  },
  {
    id: "lock_for_share",
    name: "SELECT FOR SHARE",
    category: "Блокировки",
    description: "Блокирует строки для чтения. Другие транзакции могут читать, но не могут изменять или удалять эти строки.",
    syntax: "SELECT ... FOR SHARE [OF table_name [, ...]] [NOWAIT | SKIP LOCKED];",
    arguments: [
      { name: "FOR SHARE", description: "Режим разделяемой блокировки.", example: "FOR SHARE" }
    ],
    example: "SELECT * FROM products WHERE id = 1 FOR SHARE;"
  },
  {
    id: "lock_for_no_key_update",
    name: "SELECT FOR NO KEY UPDATE",
    category: "Блокировки",
    description: "Похоже на FOR UPDATE, но блокировка слабее — не блокирует SELECT FOR KEY SHARE. Используется, когда не меняются ключевые поля (Primary Key, Unique).",
    syntax: "SELECT ... FOR NO KEY UPDATE [OF table_name [, ...]] [NOWAIT | SKIP LOCKED];",
    arguments: [
      { name: "FOR NO KEY UPDATE", description: "Блокировка для обновления неключевых полей.", example: "FOR NO KEY UPDATE" }
    ],
    example: "SELECT * FROM users WHERE id = 10 FOR NO KEY UPDATE;"
  },
  {
    id: "lock_for_key_share",
    name: "SELECT FOR KEY SHARE",
    category: "Блокировки",
    description: "Самая слабая блокировка строк. Гарантирует, что ключевые поля не будут изменены, но позволяет другим обновлять неключевые поля.",
    syntax: "SELECT ... FOR KEY SHARE [OF table_name [, ...]] [NOWAIT | SKIP LOCKED];",
    arguments: [
      { name: "FOR KEY SHARE", description: "Блокировка ключевых полей от изменения.", example: "FOR KEY SHARE" }
    ],
    example: "SELECT * FROM users WHERE id = 10 FOR KEY SHARE;"
  },
  {
    id: "lock_isolation_level",
    name: "SET TRANSACTION ISOLATION LEVEL",
    category: "Блокировки",
    description: "Устанавливает уровень изоляции для текущей транзакции.",
    syntax: "SET TRANSACTION ISOLATION LEVEL {SERIALIZABLE | REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED};",
    arguments: [
      { name: "READ COMMITTED", description: "Видит только зафиксированные данные (по умолчанию).", example: "READ COMMITTED" },
      { name: "REPEATABLE READ", description: "Видит снимок данных на момент начала транзакции.", example: "REPEATABLE READ" },
      { name: "SERIALIZABLE", description: "Строжайшая изоляция, эмулирует последовательное выполнение.", example: "SERIALIZABLE" }
    ],
    example: "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;"
  },
  {
    id: "partition_range",
    name: "PARTITION BY RANGE",
    category: "Партиционирование",
    description: "Разделяет таблицу на партиции по диапазонам значений (например, по датам или числам).",
    syntax: "CREATE TABLE name (...) PARTITION BY RANGE (column);",
    arguments: [
      { name: "column", description: "Столбец, по которому идет разделение.", example: "created_at" }
    ],
    example: "CREATE TABLE sales (id int, date date) PARTITION BY RANGE (date);"
  },
  {
    id: "partition_list",
    name: "PARTITION BY LIST",
    category: "Партиционирование",
    description: "Разделяет таблицу на партиции по списку конкретных значений (например, по регионам или статусам).",
    syntax: "CREATE TABLE name (...) PARTITION BY LIST (column);",
    arguments: [
      { name: "column", description: "Столбец для разделения.", example: "country_code" }
    ],
    example: "CREATE TABLE users (id int, country_code text) PARTITION BY LIST (country_code);"
  },
  {
    id: "partition_hash",
    name: "PARTITION BY HASH",
    category: "Партиционирование",
    description: "Разделяет таблицу на партиции, используя хеш-функцию от значения столбца. Полезно для равномерного распределения данных.",
    syntax: "CREATE TABLE name (...) PARTITION BY HASH (column);",
    arguments: [
      { name: "column", description: "Столбец для хеширования.", example: "user_id" }
    ],
    example: "CREATE TABLE logs (id int, message text) PARTITION BY HASH (id);"
  },
  {
    id: "partition_attach",
    name: "ATTACH PARTITION",
    category: "Партиционирование",
    description: "Присоединяет существующую таблицу в качестве новой партиции к партиционированной таблице.",
    syntax: "ALTER TABLE name ATTACH PARTITION partition_name {FOR VALUES partition_bound_spec | DEFAULT};",
    arguments: [
      { name: "partition_name", description: "Имя присоединяемой таблицы.", example: "sales_2023" },
      { name: "FOR VALUES", description: "Диапазон или список значений для этой партиции.", example: "FOR VALUES FROM ('2023-01-01') TO ('2024-01-01')" }
    ],
    example: "ALTER TABLE sales ATTACH PARTITION sales_2023 FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');"
  },
  {
    id: "partition_detach",
    name: "DETACH PARTITION",
    category: "Партиционирование",
    description: "Отсоединяет партицию от родительской таблицы, превращая её в обычную независимую таблицу.",
    syntax: "ALTER TABLE name DETACH PARTITION partition_name [CONCURRENTLY | FINALIZE];",
    arguments: [
      { name: "CONCURRENTLY", description: "Отсоединяет без блокировки родительской таблицы.", example: "CONCURRENTLY" }
    ],
    example: "ALTER TABLE sales DETACH PARTITION sales_2022;"
  },
  {
    id: "fts_to_tsvector",
    name: "to_tsvector",
    category: "Полнотекстовый поиск",
    description: "Преобразует документ (текст) в тип tsvector, который представляет собой список лексем (нормализованных слов) для эффективного поиска.",
    syntax: "to_tsvector([config,] document);",
    arguments: [
      { name: "config", description: "Конфигурация языка (например, 'english', 'russian'). Если не указана, используется default_text_search_config.", example: "'english'" },
      { name: "document", description: "Текст для индексации.", example: "'The quick brown fox'" }
    ],
    example: "SELECT to_tsvector('english', 'The quick brown fox jumps over the lazy dog');"
  },
  {
    id: "fts_to_tsquery",
    name: "to_tsquery",
    category: "Полнотекстовый поиск",
    description: "Преобразует строку запроса в тип tsquery, который используется для поиска совпадений в tsvector. Поддерживает логические операторы (&, |, !).",
    syntax: "to_tsquery([config,] querytext);",
    arguments: [
      { name: "querytext", description: "Текст запроса с операторами.", example: "'fox & dog'" }
    ],
    example: "SELECT to_tsquery('english', 'fox & !cat');"
  },
  {
    id: "fts_match",
    name: "@@ (Match)",
    category: "Полнотекстовый поиск",
    description: "Оператор соответствия. Возвращает TRUE, если tsvector соответствует tsquery.",
    syntax: "tsvector @@ tsquery;",
    arguments: [
      { name: "tsvector", description: "Вектор документа.", example: "to_tsvector('body text')" },
      { name: "tsquery", description: "Запрос поиска.", example: "to_tsquery('search')" }
    ],
    example: "SELECT title FROM articles WHERE to_tsvector(body) @@ to_tsquery('postgresql & performance');"
  },
  {
    id: "backup_pg_dump",
    name: "pg_dump",
    category: "Репликация и бэкапы",
    description: "Утилита командной строки для создания логической резервной копии (дампа) одной базы данных PostgreSQL.",
    syntax: "pg_dump [options] dbname > dumpfile",
    arguments: [
      { name: "-F format", description: "Формат вывода (p - plain, c - custom, d - directory, t - tar).", example: "-Fc" },
      { name: "-f file", description: "Имя выходного файла.", example: "-f backup.dump" }
    ],
    example: "pg_dump -U postgres -Fc my_database > my_database.dump"
  },
  {
    id: "backup_pg_restore",
    name: "pg_restore",
    category: "Репликация и бэкапы",
    description: "Утилита для восстановления базы данных из архива, созданного pg_dump (в форматах custom, directory или tar).",
    syntax: "pg_restore [options] dumpfile",
    arguments: [
      { name: "-d dbname", description: "Имя базы данных для восстановления.", example: "-d new_db" },
      { name: "-C", description: "Создать базу данных перед восстановлением.", example: "-C" }
    ],
    example: "pg_restore -U postgres -d new_db my_database.dump"
  },
  {
    id: "backup_pg_basebackup",
    name: "pg_basebackup",
    category: "Репликация и бэкапы",
    description: "Утилита для создания физической резервной копии всего кластера базы данных (base backup). Используется для настройки репликации.",
    syntax: "pg_basebackup -D datadir [options]",
    arguments: [
      { name: "-D directory", description: "Каталог для сохранения бэкапа.", example: "-D /var/lib/postgresql/data" },
      { name: "-R", description: "Создать конфигурацию для репликации (standby.signal).", example: "-R" }
    ],
    example: "pg_basebackup -h primary_host -D /var/lib/postgresql/14/main -U replicator -P -R"
  },
  {
    id: "repl_wal",
    name: "WAL (Write-Ahead Logging)",
    category: "Репликация и бэкапы",
    description: "Журнал предзаписи. Механизм обеспечения целостности данных. Все изменения сначала записываются в WAL, а затем в файлы данных. Используется для восстановления после сбоев и репликации.",
    syntax: "N/A (Архитектурный компонент)",
    arguments: [],
    example: "Настройка в postgresql.conf: wal_level = replica"
  },
  {
    id: "repl_logical",
    name: "Logical Replication",
    category: "Репликация и бэкапы",
    description: "Метод репликации данных на уровне логических изменений (строк), а не физических блоков. Позволяет реплицировать отдельные таблицы и между разными версиями/ОС.",
    syntax: "N/A (Концепция)",
    arguments: [],
    example: "Использует PUBLICATION и SUBSCRIPTION."
  },
  {
    id: "repl_physical",
    name: "Physical Replication",
    category: "Репликация и бэкапы",
    description: "Побитовая репликация всего кластера базы данных (через WAL). Создает точную копию (Standby) основного сервера (Primary).",
    syntax: "N/A (Концепция)",
    arguments: [],
    example: "Использует Streaming Replication и pg_basebackup."
  },
  {
    id: "repl_create_publication",
    name: "CREATE PUBLICATION",
    category: "Репликация и бэкапы",
    description: "Создает публикацию — набор таблиц, изменения в которых будут передаваться подписчикам (логическая репликация).",
    syntax: "CREATE PUBLICATION name [FOR TABLE table_name [, ...] | FOR ALL TABLES];",
    arguments: [
      { name: "FOR TABLE", description: "Список таблиц для публикации.", example: "FOR TABLE users, orders" },
      { name: "FOR ALL TABLES", description: "Публикует все таблицы в базе.", example: "FOR ALL TABLES" }
    ],
    example: "CREATE PUBLICATION my_pub FOR TABLE users, orders;"
  },
  {
    id: "repl_create_subscription",
    name: "CREATE SUBSCRIPTION",
    category: "Репликация и бэкапы",
    description: "Создает подписку на удаленную публикацию. Применяет изменения с издателя к локальным таблицам.",
    syntax: "CREATE SUBSCRIPTION name CONNECTION 'conninfo' PUBLICATION publication_name [, ...];",
    arguments: [
      { name: "CONNECTION", description: "Строка подключения к базе-издателю.", example: "CONNECTION 'host=192.168.1.50 port=5432 dbname=mydb user=rep_user password=pass'" },
      { name: "PUBLICATION", description: "Имя публикации на издателе.", example: "PUBLICATION my_pub" }
    ],
    example: "CREATE SUBSCRIPTION my_sub CONNECTION 'host=primary_db dbname=mydb' PUBLICATION my_pub;"
  },
  {
    id: "adv_create_tablespace",
    name: "CREATE TABLESPACE",
    category: "Прочие продвинутые темы",
    description: "Создает новое табличное пространство, позволяя хранить данные на разных физических дисках.",
    syntax: "CREATE TABLESPACE tablespace_name LOCATION 'directory';",
    arguments: [
      { name: "LOCATION", description: "Путь к директории на сервере (должен быть пустым и принадлежать пользователю postgres).", example: "LOCATION '/mnt/ssd/data'" }
    ],
    example: "CREATE TABLESPACE fast_ssd LOCATION '/mnt/ssd/pg_data';"
  },
  {
    id: "adv_create_schema",
    name: "CREATE SCHEMA",
    category: "Прочие продвинутые темы",
    description: "Создает новую схему (пространство имен) в текущей базе данных.",
    syntax: "CREATE SCHEMA [IF NOT EXISTS] schema_name [AUTHORIZATION user_name];",
    arguments: [
      { name: "AUTHORIZATION", description: "Назначает владельца схемы.", example: "AUTHORIZATION app_user" }
    ],
    example: "CREATE SCHEMA IF NOT EXISTS analytics AUTHORIZATION analyst;"
  },
  {
    id: "adv_lateral",
    name: "LATERAL JOIN",
    category: "Прочие продвинутые темы",
    description: "Позволяет подзапросу в FROM ссылаться на столбцы предшествующих таблиц в том же списке FROM. Похоже на цикл for-each.",
    syntax: "SELECT ... FROM table1, LATERAL (SELECT * FROM table2 WHERE ...) ss;",
    arguments: [
      { name: "LATERAL", description: "Ключевое слово, разрешающее доступ к внешним столбцам.", example: "LATERAL (...)" }
    ],
    example: "SELECT u.name, l.last_order_date FROM users u, LATERAL (SELECT date AS last_order_date FROM orders WHERE user_id = u.id ORDER BY date DESC LIMIT 1) l;"
  },
  {
    id: "adv_tablesample",
    name: "TABLESAMPLE",
    category: "Прочие продвинутые темы",
    description: "Возвращает случайную выборку строк из таблицы.",
    syntax: "SELECT ... FROM table_name TABLESAMPLE method (argument) [REPEATABLE (seed)];",
    arguments: [
      { name: "method", description: "Метод выборки (SYSTEM - по блокам, BERNOULLI - по строкам).", example: "BERNOULLI" },
      { name: "argument", description: "Процент выборки (0-100).", example: "10" },
      { name: "REPEATABLE", description: "Обеспечивает повторяемость выборки при том же seed.", example: "REPEATABLE (42)" }
    ],
    example: "SELECT * FROM large_table TABLESAMPLE BERNOULLI(1);"
  },
  {
    id: "adv_listen_notify",
    name: "LISTEN / NOTIFY",
    category: "Прочие продвинутые темы",
    description: "Механизм асинхронных уведомлений между клиентами базы данных.",
    syntax: "LISTEN channel; NOTIFY channel [, payload];",
    arguments: [
      { name: "channel", description: "Имя канала связи.", example: "new_order" },
      { name: "payload", description: "Строка данных, передаваемая с уведомлением.", example: "'order_id: 123'" }
    ],
    example: "LISTEN new_orders; -- В другой сессии: NOTIFY new_orders, 'Order #100 created';"
  },
  {
    id: "adv_prepare",
    name: "PREPARE",
    category: "Прочие продвинутые темы",
    description: "Создает подготовленный оператор (prepared statement) для оптимизации повторного выполнения.",
    syntax: "PREPARE name [(data_types)] AS statement;",
    arguments: [
      { name: "name", description: "Имя подготовленного оператора.", example: "get_user" },
      { name: "statement", description: "SQL запрос с параметрами ($1, $2...).", example: "SELECT * FROM users WHERE id = $1" }
    ],
    example: "PREPARE get_user(int) AS SELECT * FROM users WHERE id = $1;"
  },
  {
    id: "adv_execute",
    name: "EXECUTE",
    category: "Прочие продвинутые темы",
    description: "Выполняет ранее подготовленный оператор.",
    syntax: "EXECUTE name [(parameters)];",
    arguments: [
      { name: "parameters", description: "Значения параметров.", example: "EXECUTE get_user(1)" }
    ],
    example: "EXECUTE get_user(42);"
  },
  {
    id: "adv_deallocate",
    name: "DEALLOCATE",
    category: "Прочие продвинутые темы",
    description: "Удаляет подготовленный оператор, освобождая ресурсы.",
    syntax: "DEALLOCATE [PREPARE] {name | ALL};",
    arguments: [
      { name: "name", description: "Имя оператора.", example: "get_user" },
      { name: "ALL", description: "Удаляет все подготовленные операторы текущей сессии.", example: "ALL" }
    ],
    example: "DEALLOCATE get_user;"
  },
  {
    id: "adv_do",
    name: "DO",
    category: "Прочие продвинутые темы",
    description: "Выполняет анонимный блок кода (процедуру) без создания функции в базе данных.",
    syntax: "DO [LANGUAGE lang_name] code;",
    arguments: [
      { name: "LANGUAGE", description: "Язык блока (по умолчанию plpgsql).", example: "LANGUAGE plpgsql" },
      { name: "code", description: "Тело блока.", example: "$$ BEGIN RAISE NOTICE 'Hello'; END $$" }
    ],
    example: "DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM users) THEN INSERT INTO users VALUES (1, 'Admin'); END IF; END $$;"
  },
  {
    id: "adv_security_definer",
    name: "SECURITY DEFINER",
    category: "Прочие продвинутые темы",
    description: "Атрибут функции. Функция выполняется с правами создателя (владельца), а не того, кто её вызывает.",
    syntax: "CREATE FUNCTION ... SECURITY DEFINER;",
    arguments: [],
    example: "CREATE FUNCTION get_secret() RETURNS text SECURITY DEFINER AS $$ SELECT secret FROM hidden_table; $$ LANGUAGE sql;"
  },
  {
    id: "adv_volatility",
    name: "IMMUTABLE | STABLE | VOLATILE",
    category: "Прочие продвинутые темы",
    description: "Категории изменчивости функций, влияющие на оптимизацию.",
    syntax: "CREATE FUNCTION ... IMMUTABLE | STABLE | VOLATILE;",
    arguments: [
      { name: "IMMUTABLE", description: "Функция всегда возвращает один результат для одних аргументов (нет побочных эффектов, не читает БД).", example: "IMMUTABLE" },
      { name: "STABLE", description: "Результат постоянен в рамках одного запроса (может читать БД, но не видит изменений текущей транзакции).", example: "STABLE" },
      { name: "VOLATILE", description: "Результат может меняться в любой момент (random(), timeofday(), чтение изменяемых таблиц). По умолчанию.", example: "VOLATILE" }
    ],
    example: "CREATE FUNCTION add(a int, b int) RETURNS int IMMUTABLE AS $$ SELECT a + b; $$ LANGUAGE sql;"
  }
];