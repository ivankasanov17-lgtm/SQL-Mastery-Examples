export const ShemaSQL = [
  {
    "schemaName": "Точки сохранения (SAVEPOINT, RELEASE, ROLLBACK TO)",
    "schemaDefinition": "SAVEPOINT savepoint_name\n\nRELEASE SAVEPOINT savepoint_name\n\nROLLBACK [TRANSACTION] TO [SAVEPOINT] savepoint_name",
    "description": "Механизм точек сохранения позволяет частично откатывать транзакцию, не прерывая её полностью.",
    "fragments": [
      {
        "name": "SAVEPOINT",
        "description": "Создает именованную точку внутри текущей транзакции, к которой можно будет вернуться позже."
      },
      {
        "name": "RELEASE SAVEPOINT",
        "description": "Удаляет точку сохранения, освобождая ресурсы. Изменения, сделанные после неё, остаются частью транзакции."
      },
      {
        "name": "ROLLBACK TO SAVEPOINT",
        "description": "Откатывает все команды, выполненные после создания указанной точки сохранения."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Оператор INSERT",
    "schemaDefinition": "INSERT INTO table_name\n[ ( column_name [, ...] ) ]\n{ VALUES ( value_expression [, ...] ) [, ...]\n| DEFAULT VALUES\n| query\n}",
    "description": "Оператор DML, предназначенный для добавления новых строк в таблицу.",
    "fragments": [
      {
        "name": "INSERT INTO table_name",
        "description": "Указывает целевую таблицу, в которую будут вставлены данные."
      },
      {
        "name": "[ ( column_name [, ...] ) ]",
        "description": "Необязательный список имен столбцов, для которых предоставляются значения."
      },
      {
        "name": "VALUES ( value_expression [, ...] )",
        "description": "Список конкретных значений для вставки в указанные столбцы."
      },
      {
        "name": "DEFAULT VALUES",
        "description": "Заполняет все столбцы значениями по умолчанию."
      },
      {
        "name": "query",
        "description": "Подзапрос (SELECT), результат которого будет вставлен в таблицу."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Оператор UPDATE",
    "schemaDefinition": "UPDATE table_name [ [AS] correlation_name ]\nSET column_name = value_expression [, ...]\n[FROM table_reference [, ...]]\n[WHERE search_condition]",
    "description": "Оператор DML, используемый для изменения существующих данных в таблице.",
    "fragments": [
      {
        "name": "UPDATE table_name",
        "description": "Указывает таблицу, в которой необходимо обновить данные."
      },
      {
        "name": "SET column_name = value_expression",
        "description": "Устанавливает новые значения для указанных столбцов."
      },
      {
        "name": "[FROM table_reference]",
        "description": "Позволяет использовать данные из других таблиц для обновления (специфично для некоторых СУБД, например PostgreSQL)."
      },
      {
        "name": "[WHERE search_condition]",
        "description": "Определяет, какие именно строки должны быть обновлены. Если опущено, обновляются все строки."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Оператор DELETE",
    "schemaDefinition": "DELETE FROM table_name\n[USING table_reference [, ...]]\n[WHERE search_condition]",
    "description": "Оператор DML, предназначенный для удаления строк из таблицы.",
    "fragments": [
      {
        "name": "DELETE FROM table_name",
        "description": "Указывает таблицу, из которой будут удалены данные."
      },
      {
        "name": "[USING table_reference]",
        "description": "Позволяет использовать дополнительные таблицы для определения условий удаления (специфично для PostgreSQL)."
      },
      {
        "name": "[WHERE search_condition]",
        "description": "Условие, определяющее, какие строки подлежат удалению. Если не указано, удаляются все строки."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Оператор MERGE",
    "schemaDefinition": "MERGE INTO target_table [ [AS] target_alias ]\nUSING source_table_or_query [ [AS] source_alias ]\nON merge_condition\nWHEN MATCHED THEN merge_matched_action\n[WHEN MATCHED THEN merge_matched_action ...]\n[WHEN NOT MATCHED THEN merge_not_matched_action ...]",
    "description": "Оператор SQL, позволяющий выполнять вставку, обновление или удаление данных в зависимости от того, найдены ли соответствующие записи в целевой таблице (так называемый 'upsert').",
    "fragments": [
      {
        "name": "MERGE INTO target_table",
        "description": "Указывает целевую таблицу, в которой будут производиться изменения."
      },
      {
        "name": "USING source_table_or_query",
        "description": "Указывает источник данных для сопоставления."
      },
      {
        "name": "ON merge_condition",
        "description": "Условие, по которому сопоставляются строки источника и цели."
      },
      {
        "name": "WHEN MATCHED",
        "description": "Действие, выполняемое, если строка найдена в обеих таблицах (обычно UPDATE или DELETE)."
      },
      {
        "name": "WHEN NOT MATCHED",
        "description": "Действие, выполняемое, если строка есть в источнике, но отсутствует в цели (обычно INSERT)."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Оператор CREATE TABLE",
    "schemaDefinition": "CREATE TABLE table_name (\ncolumn_name data_type [column_constraints] [, ...]\n[table_constraints]\n)\n\ncolumn_constraints ::=\n[CONSTRAINT constraint_name]\n{ [NOT] NULL\n| DEFAULT default_expression\n| GENERATED ALWAYS AS ( generation_expression ) [STORED]\n| GENERATED {ALWAYS | BY DEFAULT} AS IDENTITY\n[ ( identity_options ) ]\n| UNIQUE [USING INDEX index_parameters]\n| PRIMARY KEY [USING INDEX index_parameters]\n| REFERENCES ref_table [ ( ref_column [, ...] ) ]\n[MATCH {FULL | PARTIAL | SIMPLE}]\n[ON DELETE referential_action]\n[ON UPDATE referential_action]\n| CHECK ( search_condition )\n| COLLATE collation_name\n}\n\ntable_constraints ::=\n, [CONSTRAINT constraint_name]\n{ UNIQUE ( column_name [, ...] ) [USING INDEX index_parameters]\n| PRIMARY KEY ( column_name [, ...] ) [USING INDEX index_parameters]\n| FOREIGN KEY ( column_name [, ...] ) \nREFERENCES ref_table [ ( ref_column [, ...] ) ]\n[MATCH {FULL | PARTIAL | SIMPLE}]\n[ON DELETE referential_action]\n[ON UPDATE referential_action]\n| CHECK ( search_condition )\n}\n\nidentity_options ::=\n[START WITH numeric_literal]\n[INCREMENT BY numeric_literal]\n[MINVALUE numeric_literal | NO MINVALUE]\n[MAXVALUE numeric_literal | NO MAXVALUE]\n[CYCLE | NO CYCLE]\n\nreferential_action ::=\nCASCADE | SET NULL | SET DEFAULT | RESTRICT | NO ACTION",
    "description": "Оператор DDL, используемый для создания новой таблицы в базе данных и определения её структуры, включая столбцы, типы данных и ограничения.",
    "fragments": [
      {
        "name": "CREATE TABLE table_name",
        "description": "Задает имя создаваемой таблицы."
      },
      {
        "name": "column_name data_type",
        "description": "Определяет имя столбца и его тип данных (например, INTEGER, VARCHAR)."
      },
      {
        "name": "[NOT] NULL",
        "description": "Ограничение, указывающее, может ли столбец содержать пустые значения (NULL)."
      },
      {
        "name": "DEFAULT default_expression",
        "description": "Устанавливает значение по умолчанию для столбца, если оно не указано при вставке."
      },
      {
        "name": "GENERATED ALWAYS AS IDENTITY",
        "description": "Создает столбец с автоматически генерируемым значением (автоинкремент)."
      },
      {
        "name": "PRIMARY KEY",
        "description": "Определяет столбец или группу столбцов как первичный ключ таблицы."
      },
      {
        "name": "REFERENCES ref_table",
        "description": "Создает внешний ключ (Foreign Key), ссылающийся на другую таблицу."
      },
      {
        "name": "ON DELETE / ON UPDATE",
        "description": "Определяет действия при удалении или обновлении связанных данных (CASCADE, SET NULL и т.д.)."
      },
      {
        "name": "CHECK ( search_condition )",
        "description": "Задает логическое условие, которому должны соответствовать данные в столбце."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Ограничения (CONSTRAINT)",
    "schemaDefinition": "CONSTRAINT constraint_name\n{\n  UNIQUE ( column_name [, ...] )\n| PRIMARY KEY ( column_name [, ...] )\n| FOREIGN KEY ( column_name [, ...] ) REFERENCES ref_table [ ( ref_column [, ...] ) ]\n| CHECK ( search_condition )\n}\n[INITIALLY {IMMEDIATE | DEFERRED}]\n[[NOT] DEFERRABLE]\n[NOT] ENFORCED",
    "description": "Определяет правила для данных в таблице. Ограничения могут быть уровня столбца или уровня таблицы. Они обеспечивают целостность и точность данных.",
    "fragments": [
      {
        "name": "CONSTRAINT constraint_name",
        "description": "Задает имя для ограничения, что позволяет легче управлять им (например, удалять)."
      },
      {
        "name": "UNIQUE",
        "description": "Гарантирует, что все значения в столбце или наборе столбцов уникальны."
      },
      {
        "name": "PRIMARY KEY",
        "description": "Уникально идентифицирует каждую запись в таблице. Не может содержать NULL."
      },
      {
        "name": "FOREIGN KEY",
        "description": "Обеспечивает ссылочную целостность между двумя таблицами."
      },
      {
        "name": "CHECK",
        "description": "Проверяет, чтобы значения в столбце соответствовали заданному логическому условию."
      },
      {
        "name": "DEFERRABLE",
        "description": "Определяет, может ли проверка ограничения быть отложена до конца транзакции."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Управление схемами (CREATE/ALTER/DROP SCHEMA)",
    "schemaDefinition": "CREATE SCHEMA [IF NOT EXISTS] schema_name\n[AUTHORIZATION authorization_identifier]\n\nALTER SCHEMA schema_name\n{ RENAME TO new_schema_name\n| OWNER TO new_owner\n}\n\nDROP SCHEMA [IF EXISTS] schema_name [, ...]\n{CASCADE | RESTRICT}",
    "description": "Команды для создания, изменения и удаления схем (пространств имен) в базе данных.",
    "fragments": [
      {
        "name": "CREATE SCHEMA",
        "description": "Создает новую схему в текущей базе данных."
      },
      {
        "name": "AUTHORIZATION",
        "description": "Назначает владельца создаваемой схемы."
      },
      {
        "name": "ALTER SCHEMA ... RENAME TO",
        "description": "Переименовывает существующую схему."
      },
      {
        "name": "ALTER SCHEMA ... OWNER TO",
        "description": "Изменяет владельца схемы."
      },
      {
        "name": "DROP SCHEMA",
        "description": "Удаляет схему из базы данных."
      },
      {
        "name": "CASCADE",
        "description": "Автоматически удаляет все объекты (таблицы, функции и т.д.), содержащиеся в схеме."
      },
      {
        "name": "RESTRICT",
        "description": "Отказывает в удалении схемы, если она содержит какие-либо объекты (по умолчанию)."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL"
    ]
  },
  {
    "schemaName": "Изменение таблицы (ALTER TABLE)",
    "schemaDefinition": "ALTER TABLE [IF EXISTS] table_name\n{\n  ADD [COLUMN] column_definition [column_constraints]\n| ADD [COLUMN] ( column_definition [, ...] )\n| ADD CONSTRAINT constraint_definition\n| ALTER [COLUMN] column_name\n  {\n    SET DATA TYPE data_type [collate_clause]\n  | SET DEFAULT default_expression\n  | DROP DEFAULT\n  | {SET | DROP} NOT NULL\n  | ADD GENERATED {ALWAYS | BY DEFAULT} AS IDENTITY [ ( identity_options ) ]\n  | DROP IDENTITY [IF EXISTS]\n  }\n| RENAME [COLUMN] column_name TO new_column_name\n| RENAME CONSTRAINT constraint_name TO new_constraint_name\n| DROP [COLUMN] column_name [RESTRICT | CASCADE]\n| DROP CONSTRAINT constraint_name [RESTRICT | CASCADE]\n| SET TABLESPACE tablespace_name\n| OWNER TO new_owner\n} [, ...]",
    "description": "Оператор DDL для изменения структуры существующей таблицы: добавления, изменения или удаления столбцов и ограничений.",
    "fragments": [
      {
        "name": "ADD [COLUMN]",
        "description": "Добавляет новый столбец в таблицу."
      },
      {
        "name": "ADD CONSTRAINT",
        "description": "Добавляет новое ограничение (например, FOREIGN KEY или CHECK) для таблицы."
      },
      {
        "name": "ALTER [COLUMN] ... SET DATA TYPE",
        "description": "Изменяет тип данных существующего столбца."
      },
      {
        "name": "RENAME COLUMN",
        "description": "Переименовывает столбец."
      },
      {
        "name": "DROP COLUMN",
        "description": "Удаляет столбец из таблицы."
      },
      {
        "name": "OWNER TO",
        "description": "Изменяет владельца таблицы (специфично для PostgreSQL)."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Удаление таблицы (DROP TABLE)",
    "schemaDefinition": "DROP TABLE [IF EXISTS] table_name [, ...]\n{CASCADE | RESTRICT}",
    "description": "Оператор DDL для полного удаления таблицы и её данных из базы данных.",
    "fragments": [
      {
        "name": "DROP TABLE",
        "description": "Команда на удаление таблицы."
      },
      {
        "name": "IF EXISTS",
        "description": "Предотвращает ошибку, если таблица не существует."
      },
      {
        "name": "CASCADE",
        "description": "Автоматически удаляет объекты, зависящие от этой таблицы (например, представления)."
      },
      {
        "name": "RESTRICT",
        "description": "Отказывает в удалении, если от таблицы зависят другие объекты (по умолчанию)."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Создание представления (CREATE VIEW)",
    "schemaDefinition": "CREATE VIEW [OR REPLACE] [TEMP | TEMPORARY] [RECURSIVE]\nview_name [ ( column_name [, ...] ) ]\nAS query\n[WITH [CASCADED | LOCAL] CHECK OPTION]",
    "description": "Создает виртуальную таблицу (представление), содержимое которой определяется SQL-запросом.",
    "fragments": [
      {
        "name": "CREATE VIEW",
        "description": "Создает новое представление."
      },
      {
        "name": "OR REPLACE",
        "description": "Заменяет существующее представление, если оно уже есть."
      },
      {
        "name": "AS query",
        "description": "Определяет SQL-запрос (обычно SELECT), который формирует данные представления."
      },
      {
        "name": "WITH CHECK OPTION",
        "description": "Гарантирует, что все изменения данных через представление будут соответствовать условиям в запросе представления."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Изменение представления (ALTER VIEW)",
    "schemaDefinition": "ALTER VIEW view_name\n{ RENAME TO new_view_name\n| RENAME COLUMN column_name TO new_column_name\n| SET ( view_option_name [= view_option_value] [, ...] )\n| RESET ( view_option_name [, ...] )\n| OWNER TO new_owner\n}",
    "description": "Оператор DDL для изменения свойств существующего представления.",
    "fragments": [
      {
        "name": "RENAME TO",
        "description": "Переименовывает представление."
      },
      {
        "name": "RENAME COLUMN",
        "description": "Переименовывает столбец в представлении."
      },
      {
        "name": "OWNER TO",
        "description": "Изменяет владельца представления (специфично для PostgreSQL)."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL"
    ]
  },
  {
    "schemaName": "Удаление представления (DROP VIEW)",
    "schemaDefinition": "DROP VIEW [IF EXISTS] view_name [, ...]\n{CASCADE | RESTRICT}",
    "description": "Оператор DDL для удаления одного или нескольких представлений.",
    "fragments": [
      {
        "name": "DROP VIEW",
        "description": "Команда на удаление представления."
      },
      {
        "name": "CASCADE",
        "description": "Автоматически удаляет объекты, зависящие от этого представления."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Создание индекса (CREATE INDEX)",
    "schemaDefinition": "CREATE INDEX [UNIQUE] index_name\nON table_name [USING index_method]\n( index_expression [collate_clause] [opclass] [ASC | DESC] [NULLS {FIRST | LAST}] [, ...] )\n[INCLUDE ( column_name [, ...] )]\n[WHERE predicate]",
    "description": "Создает индекс для ускорения поиска данных в таблице.",
    "fragments": [
      {
        "name": "UNIQUE",
        "description": "Создает уникальный индекс (значения не могут повторяться)."
      },
      {
        "name": "USING index_method",
        "description": "Указывает метод индексирования (например, btree, hash, gist, gin)."
      },
      {
        "name": "WHERE predicate",
        "description": "Создает частичный индекс только для строк, удовлетворяющих условию."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Изменение индекса (ALTER INDEX)",
    "schemaDefinition": "ALTER INDEX index_name\n{ RENAME TO new_index_name\n| SET TABLESPACE tablespace_name\n| ATTACH PARTITION index_name\n| DETACH PARTITION index_name\n| RESET ( storage_parameter [, ...] )\n| SET ( storage_parameter = value [, ...] )\n}",
    "description": "Оператор DDL для изменения параметров существующего индекса.",
    "fragments": [
      {
        "name": "RENAME TO",
        "description": "Переименовывает индекс."
      },
      {
        "name": "SET TABLESPACE",
        "description": "Перемещает индекс в другое табличное пространство."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Удаление индекса (DROP INDEX)",
    "schemaDefinition": "DROP INDEX [IF EXISTS] index_name [, ...]\n{CASCADE | RESTRICT}",
    "description": "Оператор DDL для удаления индекса из базы данных.",
    "fragments": [
      {
        "name": "DROP INDEX",
        "description": "Команда на удаление индекса."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Создание последовательности (CREATE SEQUENCE)",
    "schemaDefinition": "CREATE SEQUENCE sequence_name\n[AS data_type]\n[INCREMENT BY increment]\n[MINVALUE minvalue | NO MINVALUE]\n[MAXVALUE maxvalue | NO MAXVALUE]\n[START WITH start]\n[CACHE cache]\n[CYCLE | NO CYCLE]",
    "description": "Создает генератор последовательных чисел.",
    "fragments": [
      {
        "name": "INCREMENT BY",
        "description": "Задает шаг приращения последовательности."
      },
      {
        "name": "START WITH",
        "description": "Задает начальное значение последовательности."
      },
      {
        "name": "CYCLE",
        "description": "Позволяет последовательности закольцовываться при достижении предела."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Изменение последовательности (ALTER SEQUENCE)",
    "schemaDefinition": "ALTER SEQUENCE sequence_name\n[AS data_type]\n[INCREMENT BY increment]\n[MINVALUE minvalue | NO MINVALUE]\n[MAXVALUE maxvalue | NO MAXVALUE]\n[RESTART [WITH restart]]\n[CACHE cache]\n[CYCLE | NO CYCLE]\n[OWNER TO new_owner]",
    "description": "Изменяет параметры существующего генератора последовательностей.",
    "fragments": [
      {
        "name": "RESTART WITH",
        "description": "Перезапускает последовательность с нового значения."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Удаление последовательности (DROP SEQUENCE)",
    "schemaDefinition": "DROP SEQUENCE [IF EXISTS] sequence_name [, ...]\n{CASCADE | RESTRICT}",
    "description": "Оператор DDL для удаления генератора последовательностей.",
    "fragments": [
      {
        "name": "DROP SEQUENCE",
        "description": "Команда на удаление последовательности."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Создание домена (CREATE DOMAIN)",
    "schemaDefinition": "CREATE DOMAIN domain_name [AS] data_type\n[DEFAULT default_expression]\n[COLLATE collation_name]\n[domain_constraint [, ...]]\n\ndomain_constraint ::=\n[CONSTRAINT constraint_name]\nCHECK ( value_expression ) [INITIALLY {IMMEDIATE | DEFERRED}] [[NOT] DEFERRABLE]",
    "description": "Создает новый тип данных на основе существующего с возможностью добавления ограничений (например, CHECK).",
    "fragments": [
      {
        "name": "CREATE DOMAIN",
        "description": "Создает новый домен (пользовательский тип данных с ограничениями)."
      },
      {
        "name": "CHECK ( value_expression )",
        "description": "Задает условие, которому должны соответствовать значения этого домена."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Изменение домена (ALTER DOMAIN)",
    "schemaDefinition": "ALTER DOMAIN domain_name\n{\n  SET DEFAULT default_expression\n| DROP DEFAULT\n| {SET | DROP} NOT NULL\n| ADD domain_constraint\n| DROP CONSTRAINT constraint_name [RESTRICT | CASCADE]\n| OWNER TO new_owner\n}",
    "description": "Изменяет определение существующего домена.",
    "fragments": [
      {
        "name": "SET DEFAULT",
        "description": "Устанавливает значение по умолчанию для домена."
      },
      {
        "name": "ADD domain_constraint",
        "description": "Добавляет новое ограничение к домену."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Удаление домена (DROP DOMAIN)",
    "schemaDefinition": "DROP DOMAIN [IF EXISTS] domain_name [, ...]\n{CASCADE | RESTRICT}",
    "description": "Удаляет пользовательский домен.",
    "fragments": [
      {
        "name": "DROP DOMAIN",
        "description": "Команда на удаление домена."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Создание типа (CREATE TYPE)",
    "schemaDefinition": "CREATE TYPE type_name AS (\nattribute_name data_type [collate_clause] [, ...]\n)\n\nCREATE TYPE type_name AS ENUM ( 'label' [, ... ] )\n\nCREATE TYPE type_name AS RANGE (\nSUBTYPE = subtype,\n[COLLATION = collation_name,]\n[SUBTYPE_OPCLASS = operator_class,]\n[CANONICAL = function_name,]\n[SUBTYPE_DIFF = function_name]\n)",
    "description": "Регистрирует новый тип данных для использования в текущей базе данных (составной тип, перечисление или диапазон).",
    "fragments": [
      {
        "name": "AS ( attribute_name data_type )",
        "description": "Создает составной тип (структуру), состоящую из нескольких полей."
      },
      {
        "name": "AS ENUM",
        "description": "Создает перечисляемый тип (набор фиксированных строковых значений)."
      },
      {
        "name": "AS RANGE",
        "description": "Создает диапазонный тип данных."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Удаление типа (DROP TYPE)",
    "schemaDefinition": "DROP TYPE [IF EXISTS] type_name [, ...]\n{CASCADE | RESTRICT}",
    "description": "Удаляет пользовательский тип данных.",
    "fragments": [
      {
        "name": "DROP TYPE",
        "description": "Команда на удаление типа."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Начало транзакции (BEGIN)",
    "schemaDefinition": "BEGIN [TRANSACTION] [transaction_mode [, ...]]\n\ntransaction_mode ::=\n{ ISOLATION LEVEL {READ COMMITTED | REPEATABLE READ | SERIALIZABLE}\n| READ WRITE\n| READ ONLY\n}",
    "description": "Запускает блок транзакции. Все последующие команды будут выполнены атомарно (либо все вместе, либо ни одна).",
    "fragments": [
      {
        "name": "BEGIN",
        "description": "Начало транзакционного блока."
      },
      {
        "name": "ISOLATION LEVEL",
        "description": "Устанавливает уровень изоляции транзакции (защита от параллельных изменений)."
      },
      {
        "name": "READ ONLY",
        "description": "Устанавливает транзакцию только на чтение."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Фиксация транзакции (COMMIT)",
    "schemaDefinition": "COMMIT [TRANSACTION] [WORK]",
    "description": "Сохраняет все изменения, сделанные в текущей транзакции, и завершает её.",
    "fragments": [
      {
        "name": "COMMIT",
        "description": "Команда подтверждения и сохранения изменений."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Откат транзакции (ROLLBACK)",
    "schemaDefinition": "ROLLBACK [TRANSACTION] [WORK]",
    "description": "Отменяет все изменения, сделанные в текущей транзакции, и завершает её.",
    "fragments": [
      {
        "name": "ROLLBACK",
        "description": "Команда отмены всех действий в рамках транзакции."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Точка сохранения (SAVEPOINT)",
    "schemaDefinition": "SAVEPOINT savepoint_name",
    "description": "Создает именованную точку внутри текущей транзакции, к которой можно будет откатиться позже.",
    "fragments": [
      {
        "name": "SAVEPOINT",
        "description": "Устанавливает метку для частичного отката."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Удаление точки сохранения (RELEASE SAVEPOINT)",
    "schemaDefinition": "RELEASE SAVEPOINT savepoint_name",
    "description": "Уничтожает ранее созданную точку сохранения, не откатывая изменения.",
    "fragments": [
      {
        "name": "RELEASE SAVEPOINT",
        "description": "Освобождает ресурсы, связанные с точкой сохранения."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL"
    ]
  },
  {
    "schemaName": "Откат к точке сохранения (ROLLBACK TO SAVEPOINT)",
    "schemaDefinition": "ROLLBACK [TRANSACTION] TO [SAVEPOINT] savepoint_name",
    "description": "Откатывает все команды, выполненные после установленной точки сохранения.",
    "fragments": [
      {
        "name": "ROLLBACK TO SAVEPOINT",
        "description": "Возвращает состояние данных к моменту создания указанной точки сохранения."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Установка режима проверки ограничений (SET CONSTRAINTS)",
    "schemaDefinition": "SET CONSTRAINTS constraint_name [, ...] {DEFERRED | IMMEDIATE}",
    "description": "Устанавливает время проверки ограничений внутри текущей транзакции.",
    "fragments": [
      {
        "name": "DEFERRED",
        "description": "Проверка ограничений откладывается до завершения транзакции (COMMIT)."
      },
      {
        "name": "IMMEDIATE",
        "description": "Проверка ограничений выполняется немедленно после каждой команды (по умолчанию)."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Блокировка таблицы (LOCK)",
    "schemaDefinition": "LOCK [TABLE] table_name [, ...]\n[IN lock_mode MODE]\n[NOWAIT | SKIP LOCKED]\n\nlock_mode ::=\nACCESS SHARE | ROW SHARE | ROW EXCLUSIVE |\nSHARE UPDATE EXCLUSIVE | SHARE | SHARE ROW EXCLUSIVE |\nEXCLUSIVE | ACCESS EXCLUSIVE",
    "description": "Явно блокирует таблицу для предотвращения конфликтов при параллельном доступе.",
    "fragments": [
      {
        "name": "IN lock_mode MODE",
        "description": "Задает уровень строгости блокировки (от ACCESS SHARE до ACCESS EXCLUSIVE)."
      },
      {
        "name": "NOWAIT",
        "description": "Указывает, что команда должна немедленно вернуть ошибку, если блокировку нельзя получить."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL"
    ]
  },
  {
    "schemaName": "Предоставление прав (GRANT)",
    "schemaDefinition": "GRANT privilege_list\nON {table_name [, ...] | SEQUENCE sequence_name [, ...] | FUNCTION function_name ( [arg_type [, ...]] ) [, ...]}\nTO grantee [, ...]\n[WITH GRANT OPTION]",
    "description": "Предоставляет определенные права доступа (SELECT, INSERT, UPDATE и т.д.) к объектам базы данных пользователям или ролям.",
    "fragments": [
      {
        "name": "privilege_list",
        "description": "Список прав (например, SELECT, ALL PRIVILEGES)."
      },
      {
        "name": "WITH GRANT OPTION",
        "description": "Позволяет пользователю, получившему права, передавать их другим пользователям."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL"
    ]
  },
  {
    "schemaName": "Отзыв прав (REVOKE)",
    "schemaDefinition": "REVOKE [GRANT OPTION FOR] privilege_list\nON {table_name [, ...] | SEQUENCE sequence_name [, ...] | FUNCTION function_name ( [arg_type [, ...]] ) [, ...]}\nFROM grantee [, ...]\n[CASCADE | RESTRICT]",
    "description": "Отзывает ранее предоставленные права доступа к объектам базы данных.",
    "fragments": [
      {
        "name": "REVOKE",
        "description": "Команда на отмену прав."
      },
      {
        "name": "CASCADE",
        "description": "Автоматически отзывает права, которые были предоставлены через отозванное право."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL"
    ]
  },
  {
    "schemaName": "Назначение ролей (GRANT ROLE)",
    "schemaDefinition": "GRANT role_name [, ...]\nTO grantee [, ...]\n[WITH ADMIN OPTION]",
    "description": "Назначает одну или несколько ролей пользователю или другой роли.",
    "fragments": [
      {
        "name": "WITH ADMIN OPTION",
        "description": "Позволяет пользователю передавать членство в этой роли другим пользователям."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL"
    ]
  },
  {
    "schemaName": "Отзыв ролей (REVOKE ROLE)",
    "schemaDefinition": "REVOKE [ADMIN OPTION FOR] role_name [, ...]\nFROM grantee [, ...]\n[CASCADE | RESTRICT]",
    "description": "Отзывает членство в роли у пользователя или другой роли.",
    "fragments": [
      {
        "name": "REVOKE role_name",
        "description": "Команда на исключение из роли."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL"
    ]
  },
  {
    "schemaName": "Создание функции (CREATE FUNCTION)",
    "schemaDefinition": "CREATE [OR REPLACE] FUNCTION function_name\n( [ [arg_mode] arg_name arg_type [default_clause] [, ...] ] )\nRETURNS return_type\n{ LANGUAGE lang_name\n| TRANSFORM {FOR TYPE type_name} [, ...]\n| [EXTERNAL] SECURITY {DEFINER | INVOKER}\n| COST execution_cost\n| ROWS result_rows\n| SET configuration_parameter {TO value | = value | FROM CURRENT}\n| AS function_body\n} [...]\n\narg_mode ::= IN | OUT | INOUT | VARIADIC\n\ndefault_clause ::= DEFAULT default_expression",
    "description": "Определяет новую функцию или заменяет существующую.",
    "fragments": [
      {
        "name": "CREATE [OR REPLACE] FUNCTION",
        "description": "Создает новую функцию или обновляет определение существующей."
      },
      {
        "name": "RETURNS return_type",
        "description": "Указывает тип данных, возвращаемый функцией."
      },
      {
        "name": "LANGUAGE lang_name",
        "description": "Задает язык, на котором реализована функция (например, SQL, PL/pgSQL)."
      },
      {
        "name": "SECURITY {DEFINER | INVOKER}",
        "description": "Определяет привилегии, с которыми выполняется функция (создателя или вызывающего)."
      },
      {
        "name": "AS function_body",
        "description": "Тело функции (код)."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Создание процедуры (CREATE PROCEDURE)",
    "schemaDefinition": "CREATE [OR REPLACE] PROCEDURE procedure_name\n( [ [arg_mode] arg_name arg_type [default_clause] [, ...] ] )\nLANGUAGE lang_name\n[TRANSFORM {FOR TYPE type_name} [, ...]]\n[SECURITY {DEFINER | INVOKER}]\n[SET configuration_parameter {TO value | = value | FROM CURRENT}]\nAS procedure_body",
    "description": "Определяет новую процедуру или заменяет существующую. Процедуры вызываются командой CALL.",
    "fragments": [
      {
        "name": "CREATE [OR REPLACE] PROCEDURE",
        "description": "Создает новую процедуру."
      },
      {
        "name": "LANGUAGE lang_name",
        "description": "Язык реализации процедуры."
      },
      {
        "name": "AS procedure_body",
        "description": "Тело процедуры."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Изменение функции (ALTER FUNCTION)",
    "schemaDefinition": "ALTER FUNCTION function_name ( [arg_type [, ...]] )\n{ RENAME TO new_name\n| OWNER TO new_owner\n| SET schema_clause\n| RESET schema_clause\n}",
    "description": "Изменяет определение существующей функции.",
    "fragments": [
      {
        "name": "RENAME TO",
        "description": "Переименовывает функцию."
      },
      {
        "name": "OWNER TO",
        "description": "Сменяет владельца функции."
      },
      {
        "name": "SET / RESET",
        "description": "Устанавливает или сбрасывает параметры конфигурации для функции."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Удаление функции (DROP FUNCTION)",
    "schemaDefinition": "DROP FUNCTION [IF EXISTS] function_name ( [arg_type [, ...]] ) [, ...]\n{CASCADE | RESTRICT}",
    "description": "Удаляет существующую функцию.",
    "fragments": [
      {
        "name": "IF EXISTS",
        "description": "Предотвращает ошибку, если функция не существует."
      },
      {
        "name": "CASCADE",
        "description": "Автоматически удаляет объекты, зависящие от функции."
      },
      {
        "name": "RESTRICT",
        "description": "Запрещает удаление, если есть зависящие объекты."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Удаление процедуры (DROP PROCEDURE)",
    "schemaDefinition": "DROP PROCEDURE [IF EXISTS] procedure_name ( [arg_type [, ...]] ) [, ...]\n{CASCADE | RESTRICT}",
    "description": "Удаляет существующую процедуру.",
    "fragments": [
      {
        "name": "DROP PROCEDURE",
        "description": "Команда удаления процедуры."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Триггеры (CREATE, ALTER, DROP TRIGGER)",
    "schemaDefinition": "CREATE TRIGGER trigger_name\n{BEFORE | AFTER | INSTEAD OF}\n{INSERT | UPDATE | DELETE | TRUNCATE} [OR {INSERT | UPDATE | DELETE | TRUNCATE} ...]\nON table_name\n[FOR [EACH] {ROW | STATEMENT}]\n[WHEN ( condition )]\nEXECUTE FUNCTION function_name ( arguments )\n\nALTER TRIGGER trigger_name\nON table_name\nRENAME TO new_trigger_name\n\nDROP TRIGGER [IF EXISTS] trigger_name\nON table_name\n{CASCADE | RESTRICT}",
    "description": "Триггеры — это специальные хранимые процедуры, которые автоматически выполняются при наступлении определенных событий (вставка, обновление или удаление данных) в таблице.",
    "fragments": [
      {
        "name": "CREATE TRIGGER",
        "description": "Создает новый триггер, связанный с указанной таблицей."
      },
      {
        "name": "{BEFORE | AFTER | INSTEAD OF}",
        "description": "Определяет момент срабатывания: до события, после него или вместо него (обычно для представлений)."
      },
      {
        "name": "{INSERT | UPDATE | DELETE | TRUNCATE}",
        "description": "Событие, вызывающее срабатывание триггера."
      },
      {
        "name": "ON table_name",
        "description": "Имя таблицы, для которой создается триггер."
      },
      {
        "name": "[FOR EACH {ROW | STATEMENT}]",
        "description": "Определяет, будет ли триггер вызываться для каждой измененной строки или один раз для всей команды."
      },
      {
        "name": "[WHEN ( condition )]",
        "description": "Логическое условие, при котором триггер будет выполнен."
      },
      {
        "name": "EXECUTE FUNCTION",
        "description": "Вызов функции, которая содержит логику триггера."
      },
      {
        "name": "ALTER TRIGGER ... RENAME TO",
        "description": "Переименовывает существующий триггер."
      },
      {
        "name": "DROP TRIGGER",
        "description": "Удаляет триггер из базы данных."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Политики безопасности (CREATE POLICY)",
    "schemaDefinition": "CREATE POLICY policy_name\nON table_name\n[AS {PERMISSIVE | RESTRICTIVE}]\nFOR {ALL | SELECT | INSERT | UPDATE | DELETE}\nTO {role_name | PUBLIC | CURRENT_ROLE | CURRENT_USER | SESSION_USER} [, ...]\n[USING ( using_expression )]\n[WITH CHECK ( check_expression )]",
    "description": "Политики безопасности (Row-Level Security) позволяют управлять доступом к строкам таблицы на основе атрибутов пользователя или данных.",
    "fragments": [
      {
        "name": "CREATE POLICY",
        "description": "Создает новую политику управления доступом на уровне строк."
      },
      {
        "name": "AS {PERMISSIVE | RESTRICTIVE}",
        "description": "Тип политики: разрешающая (по умолчанию) или ограничивающая."
      },
      {
        "name": "FOR {ALL | SELECT | ...}",
        "description": "Команда SQL, к которой применяется данная политика."
      },
      {
        "name": "TO role_name",
        "description": "Роли или пользователи, на которых распространяется политика."
      },
      {
        "name": "USING ( expression )",
        "description": "Условие, проверяемое для существующих строк (видимость данных)."
      },
      {
        "name": "WITH CHECK ( expression )",
        "description": "Условие, проверяемое для новых или изменяемых строк (валидация данных)."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Управление политиками безопасности (ALTER, DROP POLICY)",
    "schemaDefinition": "ALTER POLICY policy_name\nON table_name\n[RENAME TO new_policy_name]\n[TO {role_name | PUBLIC | CURRENT_ROLE | CURRENT_USER | SESSION_USER} [, ...]]\n[USING ( using_expression )]\n[WITH CHECK ( check_expression )]\n\nDROP POLICY [IF EXISTS] policy_name\nON table_name",
    "description": "Команды для изменения существующих политик безопасности строк (RLS) или их удаления.",
    "fragments": [
      {
        "name": "ALTER POLICY",
        "description": "Изменяет определение существующей политики безопасности."
      },
      {
        "name": "RENAME TO",
        "description": "Переименовывает политику безопасности."
      },
      {
        "name": "TO role_name",
        "description": "Изменяет список ролей, к которым применяется политика."
      },
      {
        "name": "USING ( expression )",
        "description": "Обновляет условие видимости существующих строк."
      },
      {
        "name": "WITH CHECK ( expression )",
        "description": "Обновляет условие проверки для новых или изменяемых строк."
      },
      {
        "name": "DROP POLICY",
        "description": "Удаляет политику безопасности из указанной таблицы."
      },
      {
        "name": "IF EXISTS",
        "description": "Предотвращает ошибку, если политика не существует."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Анализ плана выполнения (EXPLAIN)",
    "schemaDefinition": "EXPLAIN [ANALYZE] [VERBOSE] statement",
    "description": "Команда EXPLAIN отображает план выполнения оператора, созданный планировщиком запросов. Это основной инструмент для оптимизации производительности SQL-запросов.",
    "fragments": [
      {
        "name": "EXPLAIN",
        "description": "Показывает план выполнения без фактического запуска запроса."
      },
      {
        "name": "ANALYZE",
        "description": "Выполняет запрос и отображает реальное время выполнения и статистику (будьте осторожны с DML командами)."
      },
      {
        "name": "VERBOSE",
        "description": "Выводит дополнительную информацию о плане, такую как список столбцов в узлах плана."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Подготовленные выражения (PREPARE, EXECUTE, DEALLOCATE)",
    "schemaDefinition": "PREPARE plan_name [ ( data_type [, ...] ) ]\nAS statement\n\nEXECUTE plan_name [ ( parameter [, ...] ) ]\n\nDEALLOCATE [PREPARE] [plan_name]",
    "description": "Механизм подготовки запросов позволяет один раз скомпилировать SQL-выражение и многократно выполнять его с разными параметрами, что повышает производительность и безопасность.",
    "fragments": [
      {
        "name": "PREPARE",
        "description": "Создает подготовленное выражение и сохраняет его в текущей сессии."
      },
      {
        "name": "EXECUTE",
        "description": "Выполняет ранее подготовленное выражение, подставляя указанные параметры."
      },
      {
        "name": "DEALLOCATE",
        "description": "Освобождает ресурсы, удаляя подготовленное выражение из памяти сессии."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro",
      "MySQL",
      "SQLite"
    ]
  },
  {
    "schemaName": "Материализованные представления (CREATE, REFRESH MATERIALIZED VIEW)",
    "schemaDefinition": "CREATE MATERIALIZED VIEW view_name\n[ ( column_name [, ...] ) ]\nAS query\n[WITH [NO] DATA]\n\nREFRESH MATERIALIZED VIEW [CONCURRENTLY] view_name\n[WITH [NO] DATA]",
    "description": "Материализованные представления сохраняют результат запроса на диске, что позволяет мгновенно получать доступ к сложным выборкам, но требует периодического обновления данных.",
    "fragments": [
      {
        "name": "CREATE MATERIALIZED VIEW",
        "description": "Создает представление и физически сохраняет его данные."
      },
      {
        "name": "WITH [NO] DATA",
        "description": "Определяет, должны ли данные быть загружены в представление сразу при создании."
      },
      {
        "name": "REFRESH MATERIALIZED VIEW",
        "description": "Обновляет содержимое представления, выполняя исходный запрос заново."
      },
      {
        "name": "CONCURRENTLY",
        "description": "Позволяет обновлять представление без блокировки SELECT-запросов к нему (требует уникального индекса)."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  },
  {
    "schemaName": "Комментарии к объектам (COMMENT ON)",
    "schemaDefinition": "COMMENT ON\n{TABLE object_name\n| COLUMN object_name\n| CONSTRAINT constraint_name ON table_name\n| INDEX object_name\n| SEQUENCE object_name\n| VIEW object_name\n| MATERIALIZED VIEW object_name\n| FUNCTION object_name ( [arg_type [, ...]] )\n| PROCEDURE object_name ( [arg_type [, ...]] )\n| TRIGGER object_name ON table_name\n| TYPE object_name\n| DOMAIN object_name\n}\nIS {string_literal | NULL}",
    "description": "Команда COMMENT позволяет добавлять описания к различным объектам базы данных, которые сохраняются в системном каталоге.",
    "fragments": [
      {
        "name": "COMMENT ON",
        "description": "Указывает тип и имя объекта, для которого создается комментарий."
      },
      {
        "name": "IS 'string'",
        "description": "Текст комментария. Если указано NULL, существующий комментарий удаляется."
      }
    ],
    "supportedDatabases": [
      "PostgreSQL",
      "Postgres Pro"
    ]
  }
]