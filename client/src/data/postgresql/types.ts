export const dataTypes = [
  {
    id: "pg_type_bool",
    name: "bool",
    category: "Типы данных",
    description: "Логический тип данных (true/false).",
    syntax: "boolean или bool",
    arguments: [
      { name: "value", description: "Логическое значение.", example: "SELECT true::bool;" }
    ],
    example: "CREATE TABLE users (is_active bool);"
  },
  {
    id: "pg_type_bytea",
    name: "bytea",
    category: "Типы данных",
    description: "Бинарные данные ('массив байтов').",
    syntax: "bytea",
    arguments: [
      { name: "value", description: "Последовательность байтов.", example: "SELECT '\\xDEADBEEF'::bytea;" }
    ],
    example: "CREATE TABLE images (data bytea);"
  },
  {
    id: "pg_type_char",
    name: "char",
    category: "Типы данных",
    description: "Символьный тип фиксированной длины. Если длина не указана, по умолчанию 1.",
    syntax: "char(n)",
    arguments: [
      { name: "n", description: "Количество символов.", example: "SELECT 'A'::char(1);" }
    ],
    example: "CREATE TABLE codes (type char(3));"
  },
  {
    id: "pg_type_name",
    name: "name",
    category: "Типы данных",
    description: "Внутренний тип для хранения имен системных идентификаторов. Имеет фиксированную длину 64 байта.",
    syntax: "name",
    arguments: [
      { name: "value", description: "Имя объекта.", example: "SELECT 'my_table'::name;" }
    ],
    example: "SELECT relname FROM pg_class WHERE relname::name = 'users';"
  },
  {
    id: "pg_type_int8",
    name: "int8",
    category: "Типы данных",
    description: "Целое число со знаком, 8 байт (bigint).",
    syntax: "int8 или bigint",
    arguments: [
      { name: "value", description: "Целое число.", example: "SELECT 9223372036854775807::int8;" }
    ],
    example: "CREATE TABLE logs (huge_id int8);"
  },
  {
    id: "pg_type_int2",
    name: "int2",
    category: "Типы данных",
    description: "Целое число со знаком, 2 байта (smallint).",
    syntax: "int2 или smallint",
    arguments: [
      { name: "value", description: "Целое число.", example: "SELECT 32767::int2;" }
    ],
    example: "CREATE TABLE settings (priority int2);"
  },
  {
    id: "pg_type_int2vector",
    name: "int2vector",
    category: "Типы данных",
    description: "Внутренний тип для хранения вектора значений int2.",
    syntax: "int2vector",
    arguments: [
      { name: "value", description: "Набор значений int2.", example: "SELECT '1 2 3'::int2vector;" }
    ],
    example: "SELECT indkey FROM pg_index;"
  },
  {
    id: "pg_type_int4",
    name: "int4",
    category: "Типы данных",
    description: "Целое число со знаком, 4 байта (integer).",
    syntax: "int4 или integer",
    arguments: [
      { name: "value", description: "Целое число.", example: "SELECT 123456::int4;" }
    ],
    example: "CREATE TABLE items (id int4);"
  },
  {
    id: "pg_type_regproc",
    name: "regproc",
    category: "Типы данных",
    description: "Зарегистрированная процедура (OID функции).",
    syntax: "regproc",
    arguments: [
      { name: "value", description: "Имя функции.", example: "SELECT 'now'::regproc;" }
    ],
    example: "SELECT proname FROM pg_proc WHERE oid = 'now'::regproc;"
  },
  {
    id: "pg_type_text",
    name: "text",
    category: "Типы данных",
    description: "Символьная строка неограниченной переменной длины.",
    syntax: "text",
    arguments: [
      { name: "value", description: "Любой текст.", example: "SELECT 'Some long text'::text;" }
    ],
    example: "CREATE TABLE articles (content text);"
  },
  {
    id: "pg_type_oid",
    name: "oid",
    category: "Типы данных",
    description: "Идентификатор объекта (Object Identifier).",
    syntax: "oid",
    arguments: [
      { name: "value", description: "Числовой OID.", example: "SELECT 1234::oid;" }
    ],
    example: "SELECT relname FROM pg_class WHERE oid = 1259;"
  },
  {
    id: "pg_type_tid",
    name: "tid",
    category: "Типы данных",
    description: "Идентификатор кортежа (Tuple Identifier).",
    syntax: "tid",
    arguments: [
      { name: "value", description: "Пара значений (блок, индекс).", example: "SELECT '(0,1)'::tid;" }
    ],
    example: "SELECT ctid, * FROM users;"
  },
  {
    id: "pg_type_xid",
    name: "xid",
    category: "Типы данных",
    description: "Идентификатор транзакции (Transaction ID).",
    syntax: "xid",
    arguments: [
      { name: "value", description: "Числовой ID транзакции.", example: "SELECT '100'::xid;" }
    ],
    example: "SELECT xmin, xmax, * FROM my_table;"
  },
  {
    id: "pg_type_cid",
    name: "cid",
    category: "Типы данных",
    description: "Идентификатор команды (Command Identifier).",
    syntax: "cid",
    arguments: [
      { name: "value", description: "Числовой ID команды.", example: "SELECT '0'::cid;" }
    ],
    example: "SELECT cmin, cmax, * FROM my_table;"
  },
  {
    id: "pg_type_oidvector",
    name: "oidvector",
    category: "Типы данных",
    description: "Внутренний тип для хранения массива значений OID.",
    syntax: "oidvector",
    arguments: [
      { name: "value", description: "Набор OID.", example: "SELECT '1 2 3'::oidvector;" }
    ],
    example: "SELECT proargtypes FROM pg_proc;"
  },
  {
    id: "pg_type_pg_type",
    name: "pg_type",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о типах данных.",
    syntax: "pg_type",
    arguments: [],
    example: "SELECT typname FROM pg_type WHERE oid = 16;"
  },
  {
    id: "pg_type_pg_attribute",
    name: "pg_attribute",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о столбцах таблиц.",
    syntax: "pg_attribute",
    arguments: [],
    example: "SELECT attname FROM pg_attribute WHERE attrelid = 'users'::regclass;"
  },
  {
    id: "pg_type_pg_proc",
    name: "pg_proc",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о функциях и процедурах.",
    syntax: "pg_proc",
    arguments: [],
    example: "SELECT proname FROM pg_proc WHERE prokind = 'f';"
  },
  {
    id: "pg_type_pg_class",
    name: "pg_class",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о таблицах и индексах.",
    syntax: "pg_class",
    arguments: [],
    example: "SELECT relname FROM pg_class WHERE relkind = 'r';"
  },
  {
    id: "pg_type_json",
    name: "json",
    category: "Типы данных",
    description: "Тип данных для хранения JSON (текстовое представление).",
    syntax: "json",
    arguments: [
      { name: "value", description: "JSON-строка.", example: "SELECT '{\"a\": 1}'::json;" }
    ],
    example: "CREATE TABLE settings (data json);"
  },
  {
    id: "pg_type_xml",
    name: "xml",
    category: "Типы данных",
    description: "Тип данных для хранения XML-документов.",
    syntax: "xml",
    arguments: [
      { name: "value", description: "XML-строка.", example: "SELECT '<root>data</root>'::xml;" }
    ],
    example: "CREATE TABLE docs (content xml);"
  },
  {
    id: "pg_type_node_tree",
    name: "pg_node_tree",
    category: "Системные типы",
    description: "Внутренний тип для хранения деревьев узлов (например, правил или представлений).",
    syntax: "pg_node_tree",
    arguments: [],
    example: "SELECT ev_action FROM pg_rewrite;"
  },
  {
    id: "pg_type_ndistinct",
    name: "pg_ndistinct",
    category: "Системные типы",
    description: "Внутренний тип для хранения статистики о количестве уникальных значений.",
    syntax: "pg_ndistinct",
    arguments: [],
    example: "SELECT stany1 FROM pg_statistic;"
  },
  {
    id: "pg_type_dependencies",
    name: "pg_dependencies",
    category: "Системные типы",
    description: "Внутренний тип для хранения информации о зависимостях между столбцами.",
    syntax: "pg_dependencies",
    arguments: [],
    example: "SELECT stasdependencies FROM pg_statistic_ext_data;"
  },
  {
    id: "pg_type_mcv_list",
    name: "pg_mcv_list",
    category: "Системные типы",
    description: "Внутренний тип для хранения списка наиболее часто встречающихся значений (Most Common Values).",
    syntax: "pg_mcv_list",
    arguments: [],
    example: "SELECT stasmsv FROM pg_statistic_ext_data;"
  },
  {
    id: "pg_type_ddl_command",
    name: "pg_ddl_command",
    category: "Системные типы",
    description: "Внутренний псевдотип, используемый в событийных триггерах для представления DDL-команды.",
    syntax: "pg_ddl_command",
    arguments: [],
    example: "SELECT * FROM pg_event_trigger_ddl_commands();"
  },
  {
    id: "pg_type_xid8",
    name: "xid8",
    category: "Системные типы",
    description: "64-битный идентификатор транзакции.",
    syntax: "xid8",
    arguments: [
      { name: "value", description: "ID транзакции.", example: "SELECT '100'::xid8;" }
    ],
    example: "SELECT pg_current_xact_id();"
  },
  {
    id: "pg_type_point",
    name: "point",
    category: "Геометрические типы",
    description: "Точка на плоскости (x, y).",
    syntax: "point(x, y)",
    arguments: [
      { name: "x", description: "Координата X.", example: "SELECT point(1, 2);" },
      { name: "y", description: "Координата Y.", example: "SELECT point(1, 2);" }
    ],
    example: "CREATE TABLE spots (pos point);"
  },
  {
    id: "pg_type_lseg",
    name: "lseg",
    category: "Геометрические типы",
    description: "Отрезок прямой (две точки).",
    syntax: "lseg '((x1,y1),(x2,y2))'",
    arguments: [],
    example: "INSERT INTO paths (segment) VALUES ('((0,0),(1,1))');"
  },
  {
    id: "pg_type_path",
    name: "path",
    category: "Геометрические типы",
    description: "Набор связанных точек (путь).",
    syntax: "path '[(x1,y1),...]' -- открытый, path '((x1,y1),...)' -- замкнутый",
    arguments: [],
    example: "CREATE TABLE routes (track path);"
  },
  {
    id: "pg_type_box",
    name: "box",
    category: "Геометрические типы",
    description: "Прямоугольник (две противоположные вершины).",
    syntax: "box '((x1,y1),(x2,y2))'",
    arguments: [],
    example: "INSERT INTO frames (boundary) VALUES ('((0,0),(10,10))');"
  },
  {
    id: "pg_type_polygon",
    name: "polygon",
    category: "Геометрические типы",
    description: "Замкнутая фигура (многоугольник).",
    syntax: "polygon '((x1,y1),...)'",
    arguments: [],
    example: "CREATE TABLE areas (geom polygon);"
  },
  {
    id: "pg_type_line",
    name: "line",
    category: "Геометрические типы",
    description: "Бесконечная прямая (Ax + By + C = 0).",
    syntax: "line '{A,B,C}'",
    arguments: [],
    example: "INSERT INTO lines (val) VALUES ('{1,-1,0}');"
  },
  {
    id: "pg_type_float4",
    name: "float4",
    category: "Типы данных",
    description: "Число с плавающей точкой одинарной точности (real).",
    syntax: "float4 или real",
    arguments: [],
    example: "CREATE TABLE t (val float4);"
  },
  {
    id: "pg_type_float8",
    name: "float8",
    category: "Типы данных",
    description: "Число с плавающей точкой двойной точности (double precision).",
    syntax: "float8 или double precision",
    arguments: [],
    example: "CREATE TABLE t (val float8);"
  },
  {
    id: "pg_type_unknown",
    name: "unknown",
    category: "Псевдотипы",
    description: "Тип данных для литералов, тип которых еще не определен (например, строковые константы).",
    syntax: "unknown",
    arguments: [],
    example: "SELECT 'something' AS untyped;"
  },
  {
    id: "pg_type_circle",
    name: "circle",
    category: "Геометрические типы",
    description: "Круг (центр и радиус).",
    syntax: "circle '<(x,y),r>'",
    arguments: [],
    example: "CREATE TABLE zones (area circle);"
  },
  {
    id: "pg_type_money",
    name: "money",
    category: "Типы данных",
    description: "Денежная сумма с фиксированной точностью.",
    syntax: "money",
    arguments: [],
    example: "CREATE TABLE products (price money);"
  },
  {
    id: "pg_type_macaddr",
    name: "macaddr",
    category: "Сетевые типы",
    description: "MAC-адрес устройства (6 байт).",
    syntax: "macaddr",
    arguments: [],
    example: "CREATE TABLE devices (mac macaddr);"
  },
  {
    id: "pg_type_inet",
    name: "inet",
    category: "Сетевые типы",
    description: "IP-адрес хоста или сети (v4 или v6).",
    syntax: "inet",
    arguments: [],
    example: "INSERT INTO access_log (ip) VALUES ('192.168.1.1');"
  },
  {
    id: "pg_type_cidr",
    name: "cidr",
    category: "Сетевые типы",
    description: "Сетевой адрес в формате CIDR (v4 или v6).",
    syntax: "cidr",
    arguments: [],
    example: "CREATE TABLE networks (net cidr);"
  },
  {
    id: "pg_type_macaddr8",
    name: "macaddr8",
    category: "Сетевые типы",
    description: "MAC-адрес в формате EUI-64 (8 байт).",
    syntax: "macaddr8",
    arguments: [],
    example: "INSERT INTO iot (mac) VALUES ('08:00:2b:01:02:03:04:05');"
  },
  {
    id: "pg_type_aclitem",
    name: "aclitem",
    category: "Системные типы",
    description: "Элемент списка управления доступом (Access Control List).",
    syntax: "aclitem",
    arguments: [],
    example: "SELECT relacl FROM pg_class WHERE relname = 'users';"
  },
  {
    id: "pg_type_bpchar",
    name: "bpchar",
    category: "Типы данных",
    description: "Символьный тип с дополнением пробелами (char).",
    syntax: "bpchar(n)",
    arguments: [],
    example: "SELECT 'test'::bpchar(10);"
  },
  {
    id: "pg_type_varchar",
    name: "varchar",
    category: "Типы данных",
    description: "Символьная строка ограниченной переменной длины.",
    syntax: "varchar(n)",
    arguments: [
      { name: "n", description: "Максимальная длина.", example: "SELECT 'text'::varchar(50);" }
    ],
    example: "CREATE TABLE users (name varchar(100));"
  },
  {
    id: "pg_type_date",
    name: "date",
    category: "Типы данных",
    description: "Календарная дата (год, месяц, день).",
    syntax: "date",
    arguments: [],
    example: "CREATE TABLE events (event_date date);"
  },
  {
    id: "pg_type_time",
    name: "time",
    category: "Типы данных",
    description: "Время дня (без часового пояса).",
    syntax: "time [ (p) ]",
    arguments: [],
    example: "CREATE TABLE schedule (start_time time);"
  },
  {
    id: "pg_type_timestamp",
    name: "timestamp",
    category: "Типы данных",
    description: "Дата и время (без часового пояса).",
    syntax: "timestamp [ (p) ]",
    arguments: [],
    example: "CREATE TABLE logs (created_at timestamp);"
  },
  {
    id: "pg_type_timestamptz",
    name: "timestamptz",
    category: "Типы данных",
    description: "Дата и время (с часовым поясом).",
    syntax: "timestamptz [ (p) ]",
    arguments: [],
    example: "CREATE TABLE logs (created_at timestamptz);"
  },
  {
    id: "pg_type_interval",
    name: "interval",
    category: "Типы данных",
    description: "Временной интервал (период).",
    syntax: "interval [ fields ] [ (p) ]",
    arguments: [],
    example: "SELECT now() + interval '1 day';"
  },
  {
    id: "pg_type_timetz",
    name: "timetz",
    category: "Типы данных",
    description: "Время дня (с часовым поясом).",
    syntax: "timetz [ (p) ]",
    arguments: [],
    example: "CREATE TABLE schedule (start_time timetz);"
  },
  {
    id: "pg_type_bit",
    name: "bit",
    category: "Типы данных",
    description: "Битовая строка фиксированной длины.",
    syntax: "bit(n)",
    arguments: [],
    example: "SELECT B'101'::bit(3);"
  },
  {
    id: "pg_type_varbit",
    name: "varbit",
    category: "Типы данных",
    description: "Битовая строка переменной длины.",
    syntax: "varbit(n)",
    arguments: [],
    example: "SELECT B'101'::varbit(10);"
  },
  {
    id: "pg_type_numeric",
    name: "numeric",
    category: "Типы данных",
    description: "Десятичное число произвольной точности.",
    syntax: "numeric(precision, scale)",
    arguments: [],
    example: "CREATE TABLE finance (amount numeric(15,2));"
  },
  {
    id: "pg_type_refcursor",
    name: "refcursor",
    category: "Псевдотипы",
    description: "Ссылка на курсор.",
    syntax: "refcursor",
    arguments: [],
    example: "DECLARE my_cursor refcursor;"
  },
  {
    id: "pg_type_regprocedure",
    name: "regprocedure",
    category: "Системные типы",
    description: "Зарегистрированная процедура (с типами аргументов).",
    syntax: "regprocedure",
    arguments: [],
    example: "SELECT 'sum(int4)'::regprocedure;"
  },
  {
    id: "pg_type_regoper",
    name: "regoper",
    category: "Системные типы",
    description: "Зарегистрированный оператор.",
    syntax: "regoper",
    arguments: [],
    example: "SELECT '+'::regoper;"
  },
  {
    id: "pg_type_regoperator",
    name: "regoperator",
    category: "Системные типы",
    description: "Зарегистрированный оператор (с типами аргументов).",
    syntax: "regoperator",
    arguments: [],
    example: "SELECT '+(int4,int4)'::regoperator;"
  },
  {
    id: "pg_type_regclass",
    name: "regclass",
    category: "Системные типы",
    description: "Зарегистрированный класс (таблица, индекс и т.д.).",
    syntax: "regclass",
    arguments: [],
    example: "SELECT 'users'::regclass;"
  },
  {
    id: "pg_type_regcollation",
    name: "regcollation",
    category: "Системные типы",
    description: "Зарегистрированное правило сортировки.",
    syntax: "regcollation",
    arguments: [],
    example: "SELECT 'default'::regcollation;"
  },
  {
    id: "pg_type_regtype",
    name: "regtype",
    category: "Системные типы",
    description: "Зарегистрированный тип данных.",
    syntax: "regtype",
    arguments: [],
    example: "SELECT 'integer'::regtype;"
  },
  {
    id: "pg_type_regrole",
    name: "regrole",
    category: "Системные типы",
    description: "Зарегистрированная роль (пользователь или группа).",
    syntax: "regrole",
    arguments: [],
    example: "SELECT 'postgres'::regrole;"
  },
  {
    id: "pg_type_regnamespace",
    name: "regnamespace",
    category: "Системные типы",
    description: "Зарегистрированное пространство имен (схема).",
    syntax: "regnamespace",
    arguments: [],
    example: "SELECT 'public'::regnamespace;"
  },
  {
    id: "pg_type_uuid",
    name: "uuid",
    category: "Типы данных",
    description: "Универсальный уникальный идентификатор (128 бит).",
    syntax: "uuid",
    arguments: [],
    example: "CREATE TABLE users (id uuid DEFAULT gen_random_uuid());"
  },
  {
    id: "pg_type_pg_lsn",
    name: "pg_lsn",
    category: "Системные типы",
    description: "Номер в журнале предзаписи (Log Sequence Number).",
    syntax: "pg_lsn",
    arguments: [],
    example: "SELECT '0/16B1E60'::pg_lsn;"
  },
  {
    id: "pg_type_tsvector",
    name: "tsvector",
    category: "Полнотекстовый поиск",
    description: "Текстовый вектор для поиска (список лексем).",
    syntax: "tsvector",
    arguments: [],
    example: "SELECT 'a fat cat'::tsvector;"
  },
  {
    id: "pg_type_gtsvector",
    name: "gtsvector",
    category: "Полнотекстовый поиск",
    description: "Внутренний тип для индексов GiST по tsvector.",
    syntax: "gtsvector",
    arguments: [],
    example: "SELECT * FROM pg_type WHERE typname = 'gtsvector';"
  },
  {
    id: "pg_type_tsquery",
    name: "tsquery",
    category: "Полнотекстовый поиск",
    description: "Поисковый запрос для полнотекстового поиска.",
    syntax: "tsquery",
    arguments: [],
    example: "SELECT 'fat & cat'::tsquery;"
  },
  {
    id: "pg_type_regconfig",
    name: "regconfig",
    category: "Системные типы",
    description: "Зарегистрированная конфигурация полнотекстового поиска.",
    syntax: "regconfig",
    arguments: [],
    example: "SELECT 'russian'::regconfig;"
  },
  {
    id: "pg_type_regdictionary",
    name: "regdictionary",
    category: "Системные типы",
    description: "Зарегистрированный словарь полнотекстового поиска.",
    syntax: "regdictionary",
    arguments: [],
    example: "SELECT 'simple'::regdictionary;"
  },
  {
    id: "pg_type_jsonb",
    name: "jsonb",
    category: "Типы данных",
    description: "Двоичное хранилище JSON данных с поддержкой индексации и более быстрой обработкой.",
    syntax: "jsonb",
    arguments: [
      { name: "value", description: "JSON-строка.", example: "SELECT '{\"key\": \"value\"}'::jsonb;" }
    ],
    example: "CREATE TABLE items (data jsonb);"
  },
  {
    id: "pg_type_jsonpath",
    name: "jsonpath",
    category: "Типы данных",
    description: "Тип данных для хранения выражений пути JSON (SQL/JSON path).",
    syntax: "jsonpath",
    arguments: [
      { name: "path", description: "Выражение пути.", example: "SELECT '$.a[*]'::jsonpath;" }
    ],
    example: "SELECT jsonb_path_query('{\"a\": [1,2,3]}', '$.a[*]'::jsonpath);"
  },
  {
    id: "pg_type_txid_snapshot",
    name: "txid_snapshot",
    category: "Системные типы",
    description: "Устаревший тип для снимков состояния транзакций (заменен на pg_snapshot).",
    syntax: "txid_snapshot",
    arguments: [],
    example: "SELECT txid_current_snapshot();"
  },
  {
    id: "pg_type_pg_snapshot",
    name: "pg_snapshot",
    category: "Системные типы",
    description: "Тип данных для хранения снимка состояния транзакций.",
    syntax: "pg_snapshot",
    arguments: [],
    example: "SELECT pg_current_snapshot();"
  },
  {
    id: "pg_type_int4range",
    name: "int4range",
    category: "Диапазоны",
    description: "Диапазон целых чисел (4 байта).",
    syntax: "int4range(lower, upper, [bounds])",
    arguments: [],
    example: "SELECT int4range(1, 10);"
  },
  {
    id: "pg_type_numrange",
    name: "numrange",
    category: "Диапазоны",
    description: "Диапазон числовых значений произвольной точности.",
    syntax: "numrange(lower, upper, [bounds])",
    arguments: [],
    example: "SELECT numrange(1.5, 2.5);"
  },
  {
    id: "pg_type_tsrange",
    name: "tsrange",
    category: "Диапазоны",
    description: "Диапазон отметок времени без часового пояса.",
    syntax: "tsrange(lower, upper, [bounds])",
    arguments: [],
    example: "SELECT tsrange('2023-01-01 12:00', '2023-01-01 13:00');"
  },
  {
    id: "pg_type_tstzrange",
    name: "tstzrange",
    category: "Диапазоны",
    description: "Диапазон отметок времени с часовым поясом.",
    syntax: "tstzrange(lower, upper, [bounds])",
    arguments: [],
    example: "SELECT tstzrange('2023-01-01 12:00+03', '2023-01-01 13:00+03');"
  },
  {
    id: "pg_type_daterange",
    name: "daterange",
    category: "Диапазоны",
    description: "Диапазон дат.",
    syntax: "daterange(lower, upper, [bounds])",
    arguments: [],
    example: "SELECT daterange('2023-01-01', '2023-01-31');"
  },
  {
    id: "pg_type_int8range",
    name: "int8range",
    category: "Диапазоны",
    description: "Диапазон больших целых чисел (8 байт).",
    syntax: "int8range(lower, upper, [bounds])",
    arguments: [],
    example: "SELECT int8range(100000000, 200000000);"
  },
  {
    id: "pg_type_record",
    name: "record",
    category: "Псевдотипы",
    description: "Псевдотип, представляющий неопределенную структуру строки (запись).",
    syntax: "record",
    arguments: [],
    example: "SELECT * FROM my_func() AS (id int, name text);"
  },
  {
    id: "pg_type__record",
    name: "_record",
    category: "Псевдотипы",
    description: "Массив записей (record[]).",
    syntax: "_record",
    arguments: [],
    example: "SELECT ARRAY[ROW(1, 'a'), ROW(2, 'b')]::_record;"
  },
  {
    id: "pg_type_cstring",
    name: "cstring",
    category: "Псевдотипы",
    description: "Внутренний тип для строк, завершающихся нулем (C-style strings). Используется в функциях ввода-вывода.",
    syntax: "cstring",
    arguments: [],
    example: "SELECT * FROM pg_type WHERE typname = 'cstring';"
  },
  {
    id: "pg_type_any",
    name: "any",
    category: "Псевдотипы",
    description: "Псевдотип, обозначающий, что функция может принимать аргумент любого типа.",
    syntax: "any",
    arguments: [],
    example: "CREATE FUNCTION my_func(val any) RETURNS void ...;"
  },
  {
    id: "pg_type_anyarray",
    name: "anyarray",
    category: "Псевдотипы",
    description: "Псевдотип, обозначающий, что функция принимает массив любого типа.",
    syntax: "anyarray",
    arguments: [],
    example: "SELECT array_agg(id) FROM users; -- возвращает anyarray"
  },
  {
    id: "pg_type_void",
    name: "void",
    category: "Псевдотипы",
    description: "Псевдотип, указывающий, что функция не возвращает значения.",
    syntax: "void",
    arguments: [],
    example: "CREATE FUNCTION log_event() RETURNS void AS ...;"
  },
  {
    id: "pg_type_trigger",
    name: "trigger",
    category: "Псевдотипы",
    description: "Тип данных, возвращаемый триггерной функцией.",
    syntax: "trigger",
    arguments: [],
    example: "CREATE FUNCTION notify_trigger() RETURNS trigger AS ...;"
  },
  {
    id: "pg_type_event_trigger",
    name: "event_trigger",
    category: "Псевдотипы",
    description: "Тип данных, возвращаемый событийным триггером.",
    syntax: "event_trigger",
    arguments: [],
    example: "CREATE FUNCTION log_ddl() RETURNS event_trigger AS ...;"
  },
  {
    id: "pg_type_language_handler",
    name: "language_handler",
    category: "Псевдотипы",
    description: "Внутренний тип для функций-обработчиков процедурных языков.",
    syntax: "language_handler",
    arguments: [],
    example: "SELECT * FROM pg_language;"
  },
  {
    id: "pg_type_internal",
    name: "internal",
    category: "Псевдотипы",
    description: "Внутренний тип для функций, которые должны вызываться только самой СУБД.",
    syntax: "internal",
    arguments: [],
    example: "SELECT * FROM pg_proc WHERE prorettype = 'internal'::regtype;"
  },
  {
    id: "pg_type_anyelement",
    name: "anyelement",
    category: "Псевдотипы",
    description: "Псевдотип, обозначающий полиморфный аргумент любого типа.",
    syntax: "anyelement",
    arguments: [],
    example: "SELECT pg_column_size('a'::anyelement);"
  },
  {
    id: "pg_type_anynonarray",
    name: "anynonarray",
    category: "Псевдотипы",
    description: "Полиморфный псевдотип, принимающий любой тип, не являющийся массивом.",
    syntax: "anynonarray",
    arguments: [],
    example: "CREATE FUNCTION f(val anynonarray) ...;"
  },
  {
    id: "pg_type_anyenum",
    name: "anyenum",
    category: "Псевдотипы",
    description: "Полиморфный псевдотип, принимающий любой перечисляемый тип (enum).",
    syntax: "anyenum",
    arguments: [],
    example: "CREATE FUNCTION f(val anyenum) ...;"
  },
  {
    id: "pg_type_fdw_handler",
    name: "fdw_handler",
    category: "Псевдотипы",
    description: "Внутренний тип для функций-обработчиков сторонних данных (Foreign Data Wrapper).",
    syntax: "fdw_handler",
    arguments: [],
    example: "SELECT * FROM pg_foreign_data_wrapper;"
  },
  {
    id: "pg_type_index_am_handler",
    name: "index_am_handler",
    category: "Псевдотипы",
    description: "Внутренний тип для функций-обработчиков методов доступа к индексам.",
    syntax: "index_am_handler",
    arguments: [],
    example: "SELECT * FROM pg_am WHERE amtype = 'i';"
  },
  {
    id: "pg_type_tsm_handler",
    name: "tsm_handler",
    category: "Псевдотипы",
    description: "Внутренний тип для функций-обработчиков выборки данных (Tablesample Method).",
    syntax: "tsm_handler",
    arguments: [],
    example: "SELECT * FROM pg_tablesample_method;"
  },
  {
    id: "pg_type_table_am_handler",
    name: "table_am_handler",
    category: "Псевдотипы",
    description: "Внутренний тип для функций-обработчиков методов доступа к таблицам.",
    syntax: "table_am_handler",
    arguments: [],
    example: "SELECT * FROM pg_am WHERE amtype = 't';"
  },
  {
    id: "pg_type_anyrange",
    name: "anyrange",
    category: "Псевдотипы",
    description: "Полиморфный псевдотип, принимающий любой диапазонный тип.",
    syntax: "anyrange",
    arguments: [],
    example: "CREATE FUNCTION f(val anyrange) ...;"
  },
  {
    id: "pg_type_anycompatible",
    name: "anycompatible",
    category: "Псевдотипы",
    description: "Полиморфный псевдотип, используемый для нахождения общего совместимого типа данных.",
    syntax: "anycompatible",
    arguments: [],
    example: "CREATE FUNCTION f(a anycompatible, b anycompatible) ...;"
  },
  {
    id: "pg_type_anycompatiblearray",
    name: "anycompatiblearray",
    category: "Псевдотипы",
    description: "Массив совместимых полиморфных типов.",
    syntax: "anycompatiblearray",
    arguments: [],
    example: "CREATE FUNCTION f(a anycompatiblearray) ...;"
  },
  {
    id: "pg_type_anycompatiblenonarray",
    name: "anycompatiblenonarray",
    category: "Псевдотипы",
    description: "Совместимый полиморфный тип, не являющийся массивом.",
    syntax: "anycompatiblenonarray",
    arguments: [],
    example: "CREATE FUNCTION f(a anycompatiblenonarray) ...;"
  },
  {
    id: "pg_type_anycompatiblerange",
    name: "anycompatiblerange",
    category: "Псевдотипы",
    description: "Совместимый полиморфный диапазонный тип.",
    syntax: "anycompatiblerange",
    arguments: [],
    example: "CREATE FUNCTION f(a anycompatiblerange) ...;"
  },
  {
    id: "pg_type_anymultirange",
    name: "anymultirange",
    category: "Псевдотипы",
    description: "Полиморфный псевдотип, принимающий любой мультидиапазонный тип.",
    syntax: "anymultirange",
    arguments: [],
    example: "CREATE FUNCTION f(val anymultirange) ...;"
  },
  {
    id: "pg_type_anycompatiblemultirange",
    name: "anycompatiblemultirange",
    category: "Псевдотипы",
    description: "Совместимый полиморфный мультидиапазонный тип.",
    syntax: "anycompatiblemultirange",
    arguments: [],
    example: "CREATE FUNCTION f(a anycompatiblemultirange) ...;"
  },
  {
    id: "pg_type_pg_brin_bloom_summary",
    name: "pg_brin_bloom_summary",
    category: "Системные типы",
    description: "Тип для хранения итоговой информации Bloom-фильтра в индексах BRIN.",
    syntax: "pg_brin_bloom_summary",
    arguments: [],
    example: "SELECT * FROM pg_type WHERE typname = 'pg_brin_bloom_summary';"
  },
  {
    id: "pg_type_pg_brin_minmax_multi_summary",
    name: "pg_brin_minmax_multi_summary",
    category: "Системные типы",
    description: "Тип для хранения итоговой информации min/max в мульти-диапазонных индексах BRIN.",
    syntax: "pg_brin_minmax_multi_summary",
    arguments: [],
    example: "SELECT * FROM pg_type WHERE typname = 'pg_brin_minmax_multi_summary';"
  },
  {
    id: "pg_type__bool",
    name: "_bool",
    category: "Массивы",
    description: "Массив логических значений (boolean[]).",
    syntax: "_bool",
    arguments: [],
    example: "SELECT '{t,f,t}'::_bool;"
  },
  {
    id: "pg_type__bytea",
    name: "_bytea",
    category: "Массивы",
    description: "Массив бинарных данных (bytea[]).",
    syntax: "_bytea",
    arguments: [],
    example: "SELECT ARRAY['\\x01'::bytea, '\\x02'::bytea]::_bytea;"
  },
  {
    id: "pg_type__char",
    name: "_char",
    category: "Массивы",
    description: "Массив символов фиксированной длины (char[]).",
    syntax: "_char",
    arguments: [],
    example: "SELECT '{a,b,c}'::_char;"
  },
  {
    id: "pg_type__name",
    name: "_name",
    category: "Массивы",
    description: "Массив системных имен (name[]).",
    syntax: "_name",
    arguments: [],
    example: "SELECT '{table1,table2}'::_name;"
  },
  {
    id: "pg_type__int8",
    name: "_int8",
    category: "Массивы",
    description: "Массив больших целых чисел (int8[]/bigint[]).",
    syntax: "_int8",
    arguments: [],
    example: "SELECT '{1,2,3}'::_int8;"
  },
  {
    id: "pg_type__int2",
    name: "_int2",
    category: "Массивы",
    description: "Массив коротких целых чисел (int2[]/smallint[]).",
    syntax: "_int2",
    arguments: [],
    example: "SELECT '{1,2,3}'::_int2;"
  },
  {
    id: "pg_type__int2vector",
    name: "_int2vector",
    category: "Массивы",
    description: "Массив векторов int2 (int2vector[]).",
    syntax: "_int2vector",
    arguments: [],
    example: "SELECT ARRAY['1 2'::int2vector, '3 4'::int2vector]::_int2vector;"
  },
  {
    id: "pg_type__int4",
    name: "_int4",
    category: "Массивы",
    description: "Массив целых чисел (int4[]/integer[]).",
    syntax: "_int4",
    arguments: [],
    example: "SELECT '{1,2,3}'::_int4;"
  },
  {
    id: "pg_type_jsonb",
    name: "jsonb",
    category: "Типы данных",
    description: "Двоичное представление JSON с поддержкой индексации и более быстрой обработки.",
    syntax: "jsonb",
    arguments: [],
    example: "CREATE TABLE profiles (data jsonb);"
  },
  {
    id: "pg_type_jsonpath",
    name: "jsonpath",
    category: "Типы данных",
    description: "Тип данных для хранения выражений пути JSON (SQL/JSON path).",
    syntax: "jsonpath",
    arguments: [],
    example: "SELECT '$.a[*].b'::jsonpath;"
  },
  {
    id: "pg_type_int4range",
    name: "int4range",
    category: "Диапазоны",
    description: "Диапазон целых чисел (integer).",
    syntax: "int4range",
    arguments: [],
    example: "SELECT '[1,10)'::int4range;"
  },
  {
    id: "pg_type_numrange",
    name: "numrange",
    category: "Диапазоны",
    description: "Диапазон чисел произвольной точности (numeric).",
    syntax: "numrange",
    arguments: [],
    example: "SELECT '[1.5, 2.5]'::numrange;"
  },
  {
    id: "pg_type_tsrange",
    name: "tsrange",
    category: "Диапазоны",
    description: "Диапазон меток времени без часового пояса.",
    syntax: "tsrange",
    arguments: [],
    example: "SELECT '[2023-01-01, 2023-01-02]'::tsrange;"
  },
  {
    id: "pg_type_tstzrange",
    name: "tstzrange",
    category: "Диапазоны",
    description: "Диапазон меток времени с часовым поясом.",
    syntax: "tstzrange",
    arguments: [],
    example: "SELECT '[2023-01-01 10:00+03, 2023-01-01 11:00+03]'::tstzrange;"
  },
  {
    id: "pg_type_daterange",
    name: "daterange",
    category: "Диапазоны",
    description: "Диапазон дат.",
    syntax: "daterange",
    arguments: [],
    example: "SELECT '[2023-01-01, 2023-01-31]'::daterange;"
  },
  {
    id: "pg_type_int8range",
    name: "int8range",
    category: "Диапазоны",
    description: "Диапазон больших целых чисел (bigint).",
    syntax: "int8range",
    arguments: [],
    example: "SELECT '[1000000000, 2000000000]'::int8range;"
  },
  {
    id: "pg_type_int4multirange",
    name: "int4multirange",
    category: "Мультидиапазоны",
    description: "Набор прерывистых диапазонов целых чисел.",
    syntax: "int4multirange",
    arguments: [],
    example: "SELECT '{[1,2], [5,6]}'::int4multirange;"
  },
  {
    id: "pg_type_nummultirange",
    name: "nummultirange",
    category: "Мультидиапазоны",
    description: "Набор прерывистых диапазонов чисел (numeric).",
    syntax: "nummultirange",
    arguments: [],
    example: "SELECT '{[1.1, 2.2], [3.3, 4.4]}'::nummultirange;"
  },
  {
    id: "pg_type_tsmultirange",
    name: "tsmultirange",
    category: "Мультидиапазоны",
    description: "Набор прерывистых диапазонов меток времени.",
    syntax: "tsmultirange",
    arguments: [],
    example: "SELECT '{[2023-01-01, 2023-01-02], [2023-02-01, 2023-02-02]}'::tsmultirange;"
  },
  {
    id: "pg_type_tstzmultirange",
    name: "tstzmultirange",
    category: "Мультидиапазоны",
    description: "Набор прерывистых диапазонов меток времени с часовым поясом.",
    syntax: "tstzmultirange",
    arguments: [],
    example: "SELECT '{[2023-01-01 10:00, 2023-01-01 11:00]}'::tstzmultirange;"
  },
  {
    id: "pg_type_datemultirange",
    name: "datemultirange",
    category: "Мультидиапазоны",
    description: "Набор прерывистых диапазонов дат.",
    syntax: "datemultirange",
    arguments: [],
    example: "SELECT '{[2023-01-01, 2023-01-10], [2023-01-20, 2023-01-30]}'::datemultirange;"
  },
  {
    id: "pg_type_int8multirange",
    name: "int8multirange",
    category: "Мультидиапазоны",
    description: "Набор прерывистых диапазонов больших целых чисел.",
    syntax: "int8multirange",
    arguments: [],
    example: "SELECT '{[10, 20], [100, 200]}'::int8multirange;"
  },
  {
    id: "pg_type_hstore",
    name: "hstore",
    category: "Дополнительные типы",
    description: "Хранилище пар ключ-значение (требует расширения hstore).",
    syntax: "hstore",
    arguments: [],
    example: "SELECT 'a=>1, b=>2'::hstore;"
  },
  {
    id: "pg_type_ltree",
    name: "ltree",
    category: "Дополнительные типы",
    description: "Тип данных для иерархических древовидных структур (требует расширения ltree).",
    syntax: "ltree",
    arguments: [],
    example: "SELECT 'Top.Science.Astronomy'::ltree;"
  },
  {
    id: "pg_type_citext",
    name: "citext",
    category: "Дополнительные типы",
    description: "Регистронезависимый текстовый тип данных (требует расширения citext).",
    syntax: "citext",
    arguments: [],
    example: "SELECT 'ABC'::citext = 'abc'::citext;"
  },
  {
    id: "pg_type_pg_lsn",
    name: "pg_lsn",
    category: "Системные типы",
    description: "Номер в журнале предзаписи (Log Sequence Number).",
    syntax: "pg_lsn",
    arguments: [],
    example: "SELECT '0/16B1E60'::pg_lsn;"
  },
  {
    id: "pg_type__regproc",
    name: "_regproc",
    category: "Массивы",
    description: "Массив идентификаторов зарегистрированных процедур.",
    syntax: "_regproc",
    arguments: [],
    example: "SELECT '{now,abs}'::_regproc;"
  },
  {
    id: "pg_type__text",
    name: "_text",
    category: "Массивы",
    description: "Массив текстовых строк.",
    syntax: "_text",
    arguments: [],
    example: "SELECT '{apple,banana,cherry}'::_text;"
  },
  {
    id: "pg_type__oid",
    name: "_oid",
    category: "Массивы",
    description: "Массив идентификаторов объектов (OID).",
    syntax: "_oid",
    arguments: [],
    example: "SELECT '{1234,5678}'::_oid;"
  },
  {
    id: "pg_type__tid",
    name: "_tid",
    category: "Массивы",
    description: "Массив идентификаторов кортежей (TID).",
    syntax: "_tid",
    arguments: [],
    example: "SELECT '{\"(0,1)\",\"(0,2)\"}'::_tid;"
  },
  {
    id: "pg_type__xid",
    name: "_xid",
    category: "Массивы",
    description: "Массив идентификаторов транзакций.",
    syntax: "_xid",
    arguments: [],
    example: "SELECT '{100,101}'::_xid;"
  },
  {
    id: "pg_type__cid",
    name: "_cid",
    category: "Массивы",
    description: "Массив идентификаторов команд.",
    syntax: "_cid",
    arguments: [],
    example: "SELECT '{0,1}'::_cid;"
  },
  {
    id: "pg_type__oidvector",
    name: "_oidvector",
    category: "Массивы",
    description: "Массив векторов OID.",
    syntax: "_oidvector",
    arguments: [],
    example: "SELECT ARRAY['1 2'::oidvector]::_oidvector;"
  },
  {
    id: "pg_type__pg_type",
    name: "_pg_type",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_type.",
    syntax: "_pg_type",
    arguments: [],
    example: "SELECT ARRAY[t] FROM pg_type t LIMIT 1;"
  },
  {
    id: "pg_type__pg_attribute",
    name: "_pg_attribute",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_attribute.",
    syntax: "_pg_attribute",
    arguments: [],
    example: "SELECT ARRAY[a] FROM pg_attribute a LIMIT 1;"
  },
  {
    id: "pg_type__pg_proc",
    name: "_pg_proc",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_proc.",
    syntax: "_pg_proc",
    arguments: [],
    example: "SELECT ARRAY[p] FROM pg_proc p LIMIT 1;"
  },
  {
    id: "pg_type__pg_class",
    name: "_pg_class",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_class.",
    syntax: "_pg_class",
    arguments: [],
    example: "SELECT ARRAY[c] FROM pg_class c LIMIT 1;"
  },
  {
    id: "pg_type__json",
    name: "_json",
    category: "Массивы",
    description: "Массив JSON-объектов.",
    syntax: "_json",
    arguments: [],
    example: "SELECT '{\"{\\\"a\\\":1}\", \"{\\\"b\\\":2}\"}'::_json;"
  },
  {
    id: "pg_type__xml",
    name: "_xml",
    category: "Массивы",
    description: "Массив XML-документов.",
    syntax: "_xml",
    arguments: [],
    example: "SELECT '{\"<root/>\",\"<tag/>\"}'::_xml;"
  },
  {
    id: "pg_type__xid8",
    name: "_xid8",
    category: "Массивы",
    description: "Массив 64-битных идентификаторов транзакций.",
    syntax: "_xid8",
    arguments: [],
    example: "SELECT '{100,101}'::_xid8;"
  },
  {
    id: "pg_type__point",
    name: "_point",
    category: "Массивы",
    description: "Массив геометрических точек.",
    syntax: "_point",
    arguments: [],
    example: "SELECT '{\"(1,2)\",\"(3,4)\"}'::_point;"
  },
  {
    id: "pg_type__lseg",
    name: "_lseg",
    category: "Массивы",
    description: "Массив геометрических отрезков.",
    syntax: "_lseg",
    arguments: [],
    example: "SELECT '{\"((0,0),(1,1))\"}'::_lseg;"
  },
  {
    id: "pg_type__path",
    name: "_path",
    category: "Массивы",
    description: "Массив геометрических путей.",
    syntax: "_path",
    arguments: [],
    example: "SELECT '{\"(0,0),(1,1)\"}'::_path;"
  },
  {
    id: "pg_type__box",
    name: "_box",
    category: "Массивы",
    description: "Массив геометрических прямоугольников (боксов).",
    syntax: "_box",
    arguments: [],
    example: "SELECT '{\"(1,1),(0,0)\"}'::_box;"
  },
  {
    id: "pg_type__polygon",
    name: "_polygon",
    category: "Массивы",
    description: "Массив геометрических многоугольников.",
    syntax: "_polygon",
    arguments: [],
    example: "SELECT '{\"(0,0),(1,1),(1,0)\"}'::_polygon;"
  },
  {
    id: "pg_type__line",
    name: "_line",
    category: "Массивы",
    description: "Массив геометрических прямых.",
    syntax: "_line",
    arguments: [],
    example: "SELECT '{\"{1,1,0}\"}'::_line;"
  },
  {
    id: "pg_type__float4",
    name: "_float4",
    category: "Массивы",
    description: "Массив чисел с плавающей точкой одинарной точности (real[]).",
    syntax: "_float4",
    arguments: [],
    example: "SELECT '{1.1,2.2}'::_float4;"
  },
  {
    id: "pg_type__float8",
    name: "_float8",
    category: "Массивы",
    description: "Массив чисел с плавающей точкой двойной точности (double precision[]).",
    syntax: "_float8",
    arguments: [],
    example: "SELECT '{1.1,2.2}'::_float8;"
  },
  {
    id: "pg_type__circle",
    name: "_circle",
    category: "Массивы",
    description: "Массив геометрических кругов.",
    syntax: "_circle",
    arguments: [],
    example: "SELECT '{\"<(0,0),1>\"}'::_circle;"
  },
  {
    id: "pg_type__money",
    name: "_money",
    category: "Массивы",
    description: "Массив денежных сумм.",
    syntax: "_money",
    arguments: [],
    example: "SELECT '{\"$1.00\",\"$2.00\"}'::_money;"
  },
  {
    id: "pg_type__macaddr",
    name: "_macaddr",
    category: "Массивы",
    description: "Массив MAC-адресов.",
    syntax: "_macaddr",
    arguments: [],
    example: "SELECT '{08:00:2b:01:02:03}'::_macaddr;"
  },
  {
    id: "pg_type__inet",
    name: "_inet",
    category: "Массивы",
    description: "Массив сетевых адресов (IP).",
    syntax: "_inet",
    arguments: [],
    example: "SELECT '{192.168.1.1,10.0.0.1}'::_inet;"
  },
  {
    id: "pg_type__cidr",
    name: "_cidr",
    category: "Массивы",
    description: "Массив сетевых адресов в формате CIDR.",
    syntax: "_cidr",
    arguments: [],
    example: "SELECT '{192.168.1.0/24}'::_cidr;"
  },
  {
    id: "pg_type__macaddr8",
    name: "_macaddr8",
    category: "Массивы",
    description: "Массив MAC-адресов (8-байтных).",
    syntax: "_macaddr8",
    arguments: [],
    example: "SELECT '{08:00:2b:01:02:03:04:05}'::_macaddr8;"
  },
  {
    id: "pg_type__aclitem",
    name: "_aclitem",
    category: "Массивы",
    description: "Массив элементов списка управления доступом.",
    syntax: "_aclitem",
    arguments: [],
    example: "SELECT relacl FROM pg_class LIMIT 1;"
  },
  {
    id: "pg_type__bpchar",
    name: "_bpchar",
    category: "Массивы",
    description: "Массив символьных строк фиксированной длины (char[]).",
    syntax: "_bpchar",
    arguments: [],
    example: "SELECT '{a,b,c}'::_bpchar;"
  },
  {
    id: "pg_type__varchar",
    name: "_varchar",
    category: "Массивы",
    description: "Массив символьных строк переменной длины (varchar[]).",
    syntax: "_varchar",
    arguments: [],
    example: "SELECT '{apple,banana}'::_varchar;"
  },
  {
    id: "pg_type__date",
    name: "_date",
    category: "Массивы",
    description: "Массив дат.",
    syntax: "_date",
    arguments: [],
    example: "SELECT '{2023-01-01,2023-01-02}'::_date;"
  },
  {
    id: "pg_type__time",
    name: "_time",
    category: "Массивы",
    description: "Массив значений времени.",
    syntax: "_time",
    arguments: [],
    example: "SELECT '{12:00:00,13:00:00}'::_time;"
  },
  {
    id: "pg_type__timestamp",
    name: "_timestamp",
    category: "Массивы",
    description: "Массив меток времени.",
    syntax: "_timestamp",
    arguments: [],
    example: "SELECT '{2023-01-01 12:00:00}'::_timestamp;"
  },
  {
    id: "pg_type__timestamptz",
    name: "_timestamptz",
    category: "Массивы",
    description: "Массив меток времени с часовым поясом.",
    syntax: "_timestamptz",
    arguments: [],
    example: "SELECT '{2023-01-01 12:00:00+03}'::_timestamptz;"
  },
  {
    id: "pg_type__interval",
    name: "_interval",
    category: "Массивы",
    description: "Массив временных интервалов.",
    syntax: "_interval",
    arguments: [],
    example: "SELECT '{1 day, 2 hours}'::_interval;"
  },
  {
    id: "pg_type__timetz",
    name: "_timetz",
    category: "Массивы",
    description: "Массив значений времени с часовым поясом.",
    syntax: "_timetz",
    arguments: [],
    example: "SELECT '{12:00:00+03, 15:00:00+03}'::_timetz;"
  },
  {
    id: "pg_type__bit",
    name: "_bit",
    category: "Массивы",
    description: "Массив битовых строк фиксированной длины.",
    syntax: "_bit",
    arguments: [],
    example: "SELECT '{B\"101\", B\"110\"}'::_bit;"
  },
  {
    id: "pg_type__varbit",
    name: "_varbit",
    category: "Массивы",
    description: "Массив битовых строк переменной длины.",
    syntax: "_varbit",
    arguments: [],
    example: "SELECT '{B\"10\", B\"1101\"}'::_varbit;"
  },
  {
    id: "pg_type__numeric",
    name: "_numeric",
    category: "Массивы",
    description: "Массив чисел произвольной точности.",
    syntax: "_numeric",
    arguments: [],
    example: "SELECT '{1.1, 2.22, 3.333}'::_numeric;"
  },
  {
    id: "pg_type__refcursor",
    name: "_refcursor",
    category: "Массивы",
    description: "Массив ссылок на курсоры.",
    syntax: "_refcursor",
    arguments: [],
    example: "SELECT '{c1, c2}'::_refcursor;"
  },
  {
    id: "pg_type__regprocedure",
    name: "_regprocedure",
    category: "Массивы",
    description: "Массив зарегистрированных процедур (с типами аргументов).",
    syntax: "_regprocedure",
    arguments: [],
    example: "SELECT '{sum(int4)}'::_regprocedure;"
  },
  {
    id: "pg_type__regoper",
    name: "_regoper",
    category: "Массивы",
    description: "Массив зарегистрированных операторов.",
    syntax: "_regoper",
    arguments: [],
    example: "SELECT '{+, -}'::_regoper;"
  },
  {
    id: "pg_type__regoperator",
    name: "_regoperator",
    category: "Массивы",
    description: "Массив зарегистрированных операторов (с типами аргументов).",
    syntax: "_regoperator",
    arguments: [],
    example: "SELECT '{+(int4,int4)}'::_regoperator;"
  },
  {
    id: "pg_type__regclass",
    name: "_regclass",
    category: "Массивы",
    description: "Массив зарегистрированных классов (таблиц и т.д.).",
    syntax: "_regclass",
    arguments: [],
    example: "SELECT '{users, products}'::_regclass;"
  },
  {
    id: "pg_type__regcollation",
    name: "_regcollation",
    category: "Массивы",
    description: "Массив зарегистрированных правил сортировки.",
    syntax: "_regcollation",
    arguments: [],
    example: "SELECT '{default, \"C\"}'::_regcollation;"
  },
  {
    id: "pg_type__regtype",
    name: "_regtype",
    category: "Массивы",
    description: "Массив зарегистрированных типов данных.",
    syntax: "_regtype",
    arguments: [],
    example: "SELECT '{integer, text}'::_regtype;"
  },
  {
    id: "pg_type__regrole",
    name: "_regrole",
    category: "Массивы",
    description: "Массив зарегистрированных ролей.",
    syntax: "_regrole",
    arguments: [],
    example: "SELECT '{postgres, admin}'::_regrole;"
  },
  {
    id: "pg_type__regnamespace",
    name: "_regnamespace",
    category: "Массивы",
    description: "Массив зарегистрированных пространств имен (схем).",
    syntax: "_regnamespace",
    arguments: [],
    example: "SELECT '{public, pg_catalog}'::_regnamespace;"
  },
  {
    id: "pg_type__uuid",
    name: "_uuid",
    category: "Массивы",
    description: "Массив UUID.",
    syntax: "_uuid",
    arguments: [],
    example: "SELECT '{a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11}'::_uuid;"
  },
  {
    id: "pg_type__pg_lsn",
    name: "_pg_lsn",
    category: "Массивы",
    description: "Массив номеров LSN.",
    syntax: "_pg_lsn",
    arguments: [],
    example: "SELECT '{0/16B1E60, 0/16B1E61}'::_pg_lsn;"
  },
  {
    id: "pg_type__tsvector",
    name: "_tsvector",
    category: "Массивы",
    description: "Массив векторов полнотекстового поиска.",
    syntax: "_tsvector",
    arguments: [],
    example: "SELECT ARRAY['a fat cat'::tsvector]::_tsvector;"
  },
  {
    id: "pg_type__gtsvector",
    name: "_gtsvector",
    category: "Массивы",
    description: "Массив индексов GiST для полнотекстового поиска.",
    syntax: "_gtsvector",
    arguments: [],
    example: "SELECT * FROM pg_type WHERE typname = '_gtsvector';"
  },
  {
    id: "pg_type__tsquery",
    name: "_tsquery",
    category: "Массивы",
    description: "Массив запросов полнотекстового поиска.",
    syntax: "_tsquery",
    arguments: [],
    example: "SELECT '{fat & rat, cat | dog}'::_tsquery;"
  },
  {
    id: "pg_type__regconfig",
    name: "_regconfig",
    category: "Массивы",
    description: "Массив конфигураций полнотекстового поиска.",
    syntax: "_regconfig",
    arguments: [],
    example: "SELECT '{english, russian}'::_regconfig;"
  },
  {
    id: "pg_type__regdictionary",
    name: "_regdictionary",
    category: "Массивы",
    description: "Массив словарей полнотекстового поиска.",
    syntax: "_regdictionary",
    arguments: [],
    example: "SELECT '{simple, english_stem}'::_regdictionary;"
  },
  {
    id: "pg_type__jsonb",
    name: "_jsonb",
    category: "Массивы",
    description: "Массив двоичных JSON-объектов.",
    syntax: "_jsonb",
    arguments: [],
    example: "SELECT '{\"{\\\"a\\\":1}\", \"{\\\"b\\\":2}\"}'::_jsonb;"
  },
  {
    id: "pg_type__jsonpath",
    name: "_jsonpath",
    category: "Массивы",
    description: "Массив путей JSON.",
    syntax: "_jsonpath",
    arguments: [],
    example: "SELECT '{\"$.a\", \"$.b\"}'::_jsonpath;"
  },
  {
    id: "pg_type__txid_snapshot",
    name: "_txid_snapshot",
    category: "Массивы",
    description: "Массив снимков состояния транзакций.",
    syntax: "_txid_snapshot",
    arguments: [],
    example: "SELECT ARRAY[txid_current_snapshot()]::_txid_snapshot;"
  },
  {
    id: "pg_type__pg_snapshot",
    name: "_pg_snapshot",
    category: "Массивы",
    description: "Массив снимков состояния идентификаторов транзакций (современный формат).",
    syntax: "_pg_snapshot",
    arguments: [],
    example: "SELECT ARRAY[pg_current_snapshot()]::_pg_snapshot;"
  },
  {
    id: "pg_type__int4range",
    name: "_int4range",
    category: "Массивы",
    description: "Массив диапазонов целых чисел.",
    syntax: "_int4range",
    arguments: [],
    example: "SELECT '{\"[1,10)\", \"[20,30)\"}'::_int4range;"
  },
  {
    id: "pg_type__numrange",
    name: "_numrange",
    category: "Массивы",
    description: "Массив диапазонов чисел numeric.",
    syntax: "_numrange",
    arguments: [],
    example: "SELECT '{\"[1.1, 2.2]\"}'::_numrange;"
  },
  {
    id: "pg_type__tsrange",
    name: "_tsrange",
    category: "Массивы",
    description: "Массив диапазонов меток времени.",
    syntax: "_tsrange",
    arguments: [],
    example: "SELECT '{\"[2023-01-01, 2023-01-02]\"}'::_tsrange;"
  },
  {
    id: "pg_type__tstzrange",
    name: "_tstzrange",
    category: "Массивы",
    description: "Массив диапазонов меток времени с часовым поясом.",
    syntax: "_tstzrange",
    arguments: [],
    example: "SELECT '{\"[2023-01-01 10:00, 2023-01-01 11:00]\"}'::_tstzrange;"
  },
  {
    id: "pg_type__daterange",
    name: "_daterange",
    category: "Массивы",
    description: "Массив диапазонов дат.",
    syntax: "_daterange",
    arguments: [],
    example: "SELECT '{\"[2023-01-01, 2023-01-31]\"}'::_daterange;"
  },
  {
    id: "pg_type__int8range",
    name: "_int8range",
    category: "Массивы",
    description: "Массив диапазонов bigint.",
    syntax: "_int8range",
    arguments: [],
    example: "SELECT '{\"[100, 200]\"}'::_int8range;"
  },
  {
    id: "pg_type__int4multirange",
    name: "_int4multirange",
    category: "Массивы",
    description: "Массив мультидиапазонов целых чисел.",
    syntax: "_int4multirange",
    arguments: [],
    example: "SELECT '{\"{[1,2], [5,6]}\"}'::_int4multirange;"
  },
  {
    id: "pg_type__nummultirange",
    name: "_nummultirange",
    category: "Массивы",
    description: "Массив мультидиапазонов numeric.",
    syntax: "_nummultirange",
    arguments: [],
    example: "SELECT '{\"{[1.1, 2.2]}\"}'::_nummultirange;"
  },
  {
    id: "pg_type__tsmultirange",
    name: "_tsmultirange",
    category: "Массивы",
    description: "Массив мультидиапазонов меток времени.",
    syntax: "_tsmultirange",
    arguments: [],
    example: "SELECT '{\"{[2023-01-01, 2023-01-02]}\"}'::_tsmultirange;"
  },
  {
    id: "pg_type__tstzmultirange",
    name: "_tstzmultirange",
    category: "Массивы",
    description: "Массив мультидиапазонов меток времени с часовым поясом.",
    syntax: "_tstzmultirange",
    arguments: [],
    example: "SELECT '{\"{[2023-01-01 10:00, 2023-01-01 11:00]}\"}'::_tstzmultirange;"
  },
  {
    id: "pg_type__datemultirange",
    name: "_datemultirange",
    category: "Массивы",
    description: "Массив мультидиапазонов дат.",
    syntax: "_datemultirange",
    arguments: [],
    example: "SELECT '{\"{[2023-01-01, 2023-01-10]}\"}'::_datemultirange;"
  },
  {
    id: "pg_type__int8multirange",
    name: "_int8multirange",
    category: "Массивы",
    description: "Массив мультидиапазонов bigint.",
    syntax: "_int8multirange",
    arguments: [],
    example: "SELECT '{\"{[10, 20]}\"}'::_int8multirange;"
  },
  {
    id: "pg_type__cstring",
    name: "_cstring",
    category: "Массивы",
    description: "Массив C-строк (внутренний тип).",
    syntax: "_cstring",
    arguments: [],
    example: "SELECT * FROM pg_type WHERE typname = '_cstring';"
  },
  {
    id: "pg_type_pg_attrdef",
    name: "pg_attrdef",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий значения по умолчанию для столбцов.",
    syntax: "pg_attrdef",
    arguments: [],
    example: "SELECT adsrc FROM pg_attrdef WHERE adrelid = 'users'::regclass;"
  },
  {
    id: "pg_type__pg_attrdef",
    name: "_pg_attrdef",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_attrdef.",
    syntax: "_pg_attrdef",
    arguments: [],
    example: "SELECT ARRAY[a] FROM pg_attrdef a LIMIT 1;"
  },
  {
    id: "pg_type_pg_constraint",
    name: "pg_constraint",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию об ограничениях (CHECK, PRIMARY KEY, UNIQUE, FOREIGN KEY).",
    syntax: "pg_constraint",
    arguments: [],
    example: "SELECT conname FROM pg_constraint WHERE conrelid = 'users'::regclass;"
  },
  {
    id: "pg_type__pg_constraint",
    name: "_pg_constraint",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_constraint.",
    syntax: "_pg_constraint",
    arguments: [],
    example: "SELECT ARRAY[c] FROM pg_constraint c LIMIT 1;"
  },
  {
    id: "pg_type_pg_inherits",
    name: "pg_inherits",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о наследовании таблиц.",
    syntax: "pg_inherits",
    arguments: [],
    example: "SELECT inhparent::regclass FROM pg_inherits WHERE inhrelid = 'child_table'::regclass;"
  },
  {
    id: "pg_type__pg_inherits",
    name: "_pg_inherits",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_inherits.",
    syntax: "_pg_inherits",
    arguments: [],
    example: "SELECT ARRAY[i] FROM pg_inherits i LIMIT 1;"
  },
  {
    id: "pg_type_pg_index",
    name: "pg_index",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию об индексах.",
    syntax: "pg_index",
    arguments: [],
    example: "SELECT indexrelid::regclass FROM pg_index WHERE indrelid = 'users'::regclass;"
  },
  {
    id: "pg_type__pg_index",
    name: "_pg_index",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_index.",
    syntax: "_pg_index",
    arguments: [],
    example: "SELECT ARRAY[i] FROM pg_index i LIMIT 1;"
  },
  {
    id: "pg_type_pg_operator",
    name: "pg_operator",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию об операторах.",
    syntax: "pg_operator",
    arguments: [],
    example: "SELECT oprname FROM pg_operator WHERE oprname = '+';"
  },
  {
    id: "pg_type__pg_operator",
    name: "_pg_operator",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_operator.",
    syntax: "_pg_operator",
    arguments: [],
    example: "SELECT ARRAY[o] FROM pg_operator o LIMIT 1;"
  },
  {
    id: "pg_type_pg_opfamily",
    name: "pg_opfamily",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о семействах операторов.",
    syntax: "pg_opfamily",
    arguments: [],
    example: "SELECT opfname FROM pg_opfamily WHERE opfmethod = (SELECT oid FROM pg_am WHERE amname = 'btree');"
  },
  {
    id: "pg_type__pg_opfamily",
    name: "_pg_opfamily",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_opfamily.",
    syntax: "_pg_opfamily",
    arguments: [],
    example: "SELECT ARRAY[o] FROM pg_opfamily o LIMIT 1;"
  },
  {
    id: "pg_type_pg_opclass",
    name: "pg_opclass",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о классах операторов.",
    syntax: "pg_opclass",
    arguments: [],
    example: "SELECT opcname FROM pg_opclass WHERE opcmethod = (SELECT oid FROM pg_am WHERE amname = 'btree');"
  },
  {
    id: "pg_type__pg_opclass",
    name: "_pg_opclass",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_opclass.",
    syntax: "_pg_opclass",
    arguments: [],
    example: "SELECT ARRAY[o] FROM pg_opclass o LIMIT 1;"
  },
  {
    id: "pg_type_pg_am",
    name: "pg_am",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о методах доступа к индексам.",
    syntax: "pg_am",
    arguments: [],
    example: "SELECT amname FROM pg_am;"
  },
  {
    id: "pg_type__pg_am",
    name: "_pg_am",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_am.",
    syntax: "_pg_am",
    arguments: [],
    example: "SELECT ARRAY[a] FROM pg_am a LIMIT 1;"
  },
  {
    id: "pg_type_pg_amop",
    name: "pg_amop",
    category: "Системные таблицы",
    description: "Системный каталог, связывающий операторы с семействами операторов для методов доступа.",
    syntax: "pg_amop",
    arguments: [],
    example: "SELECT amopopr::regoperator FROM pg_amop LIMIT 1;"
  },
  {
    id: "pg_type__pg_amop",
    name: "_pg_amop",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_amop.",
    syntax: "_pg_amop",
    arguments: [],
    example: "SELECT ARRAY[a] FROM pg_amop a LIMIT 1;"
  },
  {
    id: "pg_type_pg_amproc",
    name: "pg_amproc",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий вспомогательные процедуры для семейств операторов.",
    syntax: "pg_amproc",
    arguments: [],
    example: "SELECT amproc::regprocedure FROM pg_amproc LIMIT 1;"
  },
  {
    id: "pg_type__pg_amproc",
    name: "_pg_amproc",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_amproc.",
    syntax: "_pg_amproc",
    arguments: [],
    example: "SELECT ARRAY[a] FROM pg_amproc a LIMIT 1;"
  },
  {
    id: "pg_type_pg_language",
    name: "pg_language",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о языках написания функций.",
    syntax: "pg_language",
    arguments: [],
    example: "SELECT lanname FROM pg_language;"
  },
  {
    id: "pg_type__pg_language",
    name: "_pg_language",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_language.",
    syntax: "_pg_language",
    arguments: [],
    example: "SELECT ARRAY[l] FROM pg_language l LIMIT 1;"
  },
  {
    id: "pg_type_pg_largeobject_metadata",
    name: "pg_largeobject_metadata",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий метаданные о больших объектах (Large Objects).",
    syntax: "pg_largeobject_metadata",
    arguments: [],
    example: "SELECT lomowner FROM pg_largeobject_metadata LIMIT 1;"
  },
  {
    id: "pg_type__pg_largeobject_metadata",
    name: "_pg_largeobject_metadata",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_largeobject_metadata.",
    syntax: "_pg_largeobject_metadata",
    arguments: [],
    example: "SELECT ARRAY[m] FROM pg_largeobject_metadata m LIMIT 1;"
  },
  {
    id: "pg_type_pg_largeobject",
    name: "pg_largeobject",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий данные больших объектов.",
    syntax: "pg_largeobject",
    arguments: [],
    example: "SELECT loid, pageno FROM pg_largeobject LIMIT 1;"
  },
  {
    id: "pg_type__pg_largeobject",
    name: "_pg_largeobject",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_largeobject.",
    syntax: "_pg_largeobject",
    arguments: [],
    example: "SELECT ARRAY[l] FROM pg_largeobject l LIMIT 1;"
  },
  {
    id: "pg_type_pg_aggregate",
    name: "pg_aggregate",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию об агрегатных функциях.",
    syntax: "pg_aggregate",
    arguments: [],
    example: "SELECT aggfnoid::regprocedure FROM pg_aggregate LIMIT 1;"
  },
  {
    id: "pg_type__pg_aggregate",
    name: "_pg_aggregate",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_aggregate.",
    syntax: "_pg_aggregate",
    arguments: [],
    example: "SELECT ARRAY[a] FROM pg_aggregate a LIMIT 1;"
  },
  {
    id: "pg_type_pg_statistic",
    name: "pg_statistic",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий статистику данных для оптимизатора.",
    syntax: "pg_statistic",
    arguments: [],
    example: "SELECT starelid::regclass FROM pg_statistic LIMIT 1;"
  },
  {
    id: "pg_type__pg_statistic",
    name: "_pg_statistic",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_statistic.",
    syntax: "_pg_statistic",
    arguments: [],
    example: "SELECT ARRAY[s] FROM pg_statistic s LIMIT 1;"
  },
  {
    id: "pg_type_pg_statistic_ext",
    name: "pg_statistic_ext",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий определения расширенной статистики.",
    syntax: "pg_statistic_ext",
    arguments: [],
    example: "SELECT stxname FROM pg_statistic_ext LIMIT 1;"
  },
  {
    id: "pg_type__pg_statistic_ext",
    name: "_pg_statistic_ext",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_statistic_ext.",
    syntax: "_pg_statistic_ext",
    arguments: [],
    example: "SELECT ARRAY[s] FROM pg_statistic_ext s LIMIT 1;"
  },
  {
    id: "pg_type_pg_statistic_ext_data",
    name: "pg_statistic_ext_data",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий данные расширенной статистики.",
    syntax: "pg_statistic_ext_data",
    arguments: [],
    example: "SELECT stxoid FROM pg_statistic_ext_data LIMIT 1;"
  },
  {
    id: "pg_type__pg_statistic_ext_data",
    name: "_pg_statistic_ext_data",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_statistic_ext_data.",
    syntax: "_pg_statistic_ext_data",
    arguments: [],
    example: "SELECT ARRAY[s] FROM pg_statistic_ext_data s LIMIT 1;"
  },
  {
    id: "pg_type_pg_rewrite",
    name: "pg_rewrite",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий правила перезаписи (Rewrite Rules) для таблиц и представлений.",
    syntax: "pg_rewrite",
    arguments: [],
    example: "SELECT rulename FROM pg_rewrite WHERE ev_class = 'users'::regclass;"
  },
  {
    id: "pg_type__pg_rewrite",
    name: "_pg_rewrite",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_rewrite.",
    syntax: "_pg_rewrite",
    arguments: [],
    example: "SELECT ARRAY[r] FROM pg_rewrite r LIMIT 1;"
  },
  {
    id: "pg_type_pg_trigger",
    name: "pg_trigger",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о триггерах.",
    syntax: "pg_trigger",
    arguments: [],
    example: "SELECT tgname FROM pg_trigger WHERE tgrelid = 'users'::regclass;"
  },
  {
    id: "pg_type__pg_trigger",
    name: "_pg_trigger",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_trigger.",
    syntax: "_pg_trigger",
    arguments: [],
    example: "SELECT ARRAY[t] FROM pg_trigger t LIMIT 1;"
  },
  {
    id: "pg_type_pg_event_trigger",
    name: "pg_event_trigger",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о событийных триггерах (Event Triggers).",
    syntax: "pg_event_trigger",
    arguments: [],
    example: "SELECT evtname FROM pg_event_trigger;"
  },
  {
    id: "pg_type__pg_event_trigger",
    name: "_pg_event_trigger",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_event_trigger.",
    syntax: "_pg_event_trigger",
    arguments: [],
    example: "SELECT ARRAY[e] FROM pg_event_trigger e LIMIT 1;"
  },
  {
    id: "pg_type_pg_description",
    name: "pg_description",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий описания (комментарии) объектов.",
    syntax: "pg_description",
    arguments: [],
    example: "SELECT description FROM pg_description WHERE objoid = 'users'::regclass;"
  },
  {
    id: "pg_type__pg_description",
    name: "_pg_description",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_description.",
    syntax: "_pg_description",
    arguments: [],
    example: "SELECT ARRAY[d] FROM pg_description d LIMIT 1;"
  },
  {
    id: "pg_type_pg_cast",
    name: "pg_cast",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о преобразованиях типов (Casts).",
    syntax: "pg_cast",
    arguments: [],
    example: "SELECT castsource::regtype, casttarget::regtype FROM pg_cast;"
  },
  {
    id: "pg_type__pg_cast",
    name: "_pg_cast",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_cast.",
    syntax: "_pg_cast",
    arguments: [],
    example: "SELECT ARRAY[c] FROM pg_cast c LIMIT 1;"
  },
  {
    id: "pg_type_pg_enum",
    name: "pg_enum",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о значениях перечислимых типов (enum).",
    syntax: "pg_enum",
    arguments: [],
    example: "SELECT enumlabel FROM pg_enum WHERE enumtypid = 'my_enum_type'::regtype;"
  },
  {
    id: "pg_type__pg_enum",
    name: "_pg_enum",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_enum.",
    syntax: "_pg_enum",
    arguments: [],
    example: "SELECT ARRAY[e] FROM pg_enum e LIMIT 1;"
  },
  {
    id: "pg_type_pg_namespace",
    name: "pg_namespace",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о схемах (пространствах имен).",
    syntax: "pg_namespace",
    arguments: [],
    example: "SELECT nspname FROM pg_namespace;"
  },
  {
    id: "pg_type__pg_namespace",
    name: "_pg_namespace",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_namespace.",
    syntax: "_pg_namespace",
    arguments: [],
    example: "SELECT ARRAY[n] FROM pg_namespace n LIMIT 1;"
  },
  {
    id: "pg_type_pg_conversion",
    name: "pg_conversion",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о преобразованиях кодировок символов.",
    syntax: "pg_conversion",
    arguments: [],
    example: "SELECT convname FROM pg_conversion;"
  },
  {
    id: "pg_type__pg_conversion",
    name: "_pg_conversion",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_conversion.",
    syntax: "_pg_conversion",
    arguments: [],
    example: "SELECT ARRAY[c] FROM pg_conversion c LIMIT 1;"
  },
  {
    id: "pg_type_pg_depend",
    name: "pg_depend",
    category: "Системные таблицы",
    description: "Системный каталог, отслеживающий зависимости между объектами базы данных.",
    syntax: "pg_depend",
    arguments: [],
    example: "SELECT classid::regclass, objid FROM pg_depend WHERE refobjid = 'my_table'::regclass;"
  },
  {
    id: "pg_type__pg_depend",
    name: "_pg_depend",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_depend.",
    syntax: "_pg_depend",
    arguments: [],
    example: "SELECT ARRAY[d] FROM pg_depend d LIMIT 1;"
  },
  {
    id: "pg_type_pg_database",
    name: "pg_database",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о доступных базах данных.",
    syntax: "pg_database",
    arguments: [],
    example: "SELECT datname FROM pg_database;"
  },
  {
    id: "pg_type__pg_database",
    name: "_pg_database",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_database.",
    syntax: "_pg_database",
    arguments: [],
    example: "SELECT ARRAY[d] FROM pg_database d LIMIT 1;"
  },
  {
    id: "pg_type_pg_db_role_setting",
    name: "pg_db_role_setting",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий настройки конфигурации, специфичные для ролей и баз данных.",
    syntax: "pg_db_role_setting",
    arguments: [],
    example: "SELECT setconfig FROM pg_db_role_setting;"
  },
  {
    id: "pg_type__pg_db_role_setting",
    name: "_pg_db_role_setting",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_db_role_setting.",
    syntax: "_pg_db_role_setting",
    arguments: [],
    example: "SELECT ARRAY[s] FROM pg_db_role_setting s LIMIT 1;"
  },
  {
    id: "pg_type_pg_tablespace",
    name: "pg_tablespace",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о табличных пространствах.",
    syntax: "pg_tablespace",
    arguments: [],
    example: "SELECT spcname FROM pg_tablespace;"
  },
  {
    id: "pg_type__pg_tablespace",
    name: "_pg_tablespace",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_tablespace.",
    syntax: "_pg_tablespace",
    arguments: [],
    example: "SELECT ARRAY[t] FROM pg_tablespace t LIMIT 1;"
  },
  {
    id: "pg_type_pg_authid",
    name: "pg_authid",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о ролях аутентификации (пользователях и группах).",
    syntax: "pg_authid",
    arguments: [],
    example: "SELECT rolname FROM pg_authid;"
  },
  {
    id: "pg_type__pg_authid",
    name: "_pg_authid",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_authid.",
    syntax: "_pg_authid",
    arguments: [],
    example: "SELECT ARRAY[a] FROM pg_authid a LIMIT 1;"
  },
  {
    id: "pg_type_pg_auth_members",
    name: "pg_auth_members",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о членстве ролей в группах.",
    syntax: "pg_auth_members",
    arguments: [],
    example: "SELECT roleid::regrole, member::regrole FROM pg_auth_members;"
  },
  {
    id: "pg_type__pg_auth_members",
    name: "_pg_auth_members",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_auth_members.",
    syntax: "_pg_auth_members",
    arguments: [],
    example: "SELECT ARRAY[m] FROM pg_auth_members m LIMIT 1;"
  },
  {
    id: "pg_type_pg_shdepend",
    name: "pg_shdepend",
    category: "Системные таблицы",
    description: "Системный каталог, отслеживающий зависимости между общими объектами (например, ролями) и объектами конкретных баз данных.",
    syntax: "pg_shdepend",
    arguments: [],
    example: "SELECT classid::regclass, objid FROM pg_shdepend WHERE refobjid = 'my_role'::regrole;"
  },
  {
    id: "pg_type__pg_shdepend",
    name: "_pg_shdepend",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_shdepend.",
    syntax: "_pg_shdepend",
    arguments: [],
    example: "SELECT ARRAY[s] FROM pg_shdepend s LIMIT 1;"
  },
  {
    id: "pg_type_pg_shdescription",
    name: "pg_shdescription",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий комментарии к общим (shared) объектам.",
    syntax: "pg_shdescription",
    arguments: [],
    example: "SELECT description FROM pg_shdescription WHERE objoid = 'my_role'::regrole;"
  },
  {
    id: "pg_type__pg_shdescription",
    name: "_pg_shdescription",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_shdescription.",
    syntax: "_pg_shdescription",
    arguments: [],
    example: "SELECT ARRAY[d] FROM pg_shdescription d LIMIT 1;"
  },
  {
    id: "pg_type_pg_ts_config",
    name: "pg_ts_config",
    category: "Полнотекстовый поиск",
    description: "Системный каталог, хранящий конфигурации текстового поиска.",
    syntax: "pg_ts_config",
    arguments: [],
    example: "SELECT cfgname FROM pg_ts_config;"
  },
  {
    id: "pg_type__pg_ts_config",
    name: "_pg_ts_config",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_ts_config.",
    syntax: "_pg_ts_config",
    arguments: [],
    example: "SELECT ARRAY[c] FROM pg_ts_config c LIMIT 1;"
  },
  {
    id: "pg_type_pg_ts_config_map",
    name: "pg_ts_config_map",
    category: "Полнотекстовый поиск",
    description: "Системный каталог, сопоставляющий типы токенов со словарями в конфигурациях текстового поиска.",
    syntax: "pg_ts_config_map",
    arguments: [],
    example: "SELECT mapcfg, maptokentype FROM pg_ts_config_map LIMIT 1;"
  },
  {
    id: "pg_type__pg_ts_config_map",
    name: "_pg_ts_config_map",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_ts_config_map.",
    syntax: "_pg_ts_config_map",
    arguments: [],
    example: "SELECT ARRAY[m] FROM pg_ts_config_map m LIMIT 1;"
  },
  {
    id: "pg_type_pg_ts_dict",
    name: "pg_ts_dict",
    category: "Полнотекстовый поиск",
    description: "Системный каталог, хранящий словари текстового поиска.",
    syntax: "pg_ts_dict",
    arguments: [],
    example: "SELECT dictname FROM pg_ts_dict;"
  },
  {
    id: "pg_type__pg_ts_dict",
    name: "_pg_ts_dict",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_ts_dict.",
    syntax: "_pg_ts_dict",
    arguments: [],
    example: "SELECT ARRAY[d] FROM pg_ts_dict d LIMIT 1;"
  },
  {
    id: "pg_type_pg_ts_parser",
    name: "pg_ts_parser",
    category: "Полнотекстовый поиск",
    description: "Системный каталог, хранящий парсеры текстового поиска.",
    syntax: "pg_ts_parser",
    arguments: [],
    example: "SELECT prsname FROM pg_ts_parser;"
  },
  {
    id: "pg_type__pg_ts_parser",
    name: "_pg_ts_parser",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_ts_parser.",
    syntax: "_pg_ts_parser",
    arguments: [],
    example: "SELECT ARRAY[p] FROM pg_ts_parser p LIMIT 1;"
  },
  {
    id: "pg_type_pg_ts_template",
    name: "pg_ts_template",
    category: "Полнотекстовый поиск",
    description: "Системный каталог, хранящий шаблоны для словарей текстового поиска.",
    syntax: "pg_ts_template",
    arguments: [],
    example: "SELECT tmplname FROM pg_ts_template;"
  },
  {
    id: "pg_type__pg_ts_template",
    name: "_pg_ts_template",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_ts_template.",
    syntax: "_pg_ts_template",
    arguments: [],
    example: "SELECT ARRAY[t] FROM pg_ts_template t LIMIT 1;"
  },
  {
    id: "pg_type_pg_extension",
    name: "pg_extension",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию об установленных расширениях.",
    syntax: "pg_extension",
    arguments: [],
    example: "SELECT extname FROM pg_extension;"
  },
  {
    id: "pg_type__pg_extension",
    name: "_pg_extension",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_extension.",
    syntax: "_pg_extension",
    arguments: [],
    example: "SELECT ARRAY[e] FROM pg_extension e LIMIT 1;"
  },
  {
    id: "pg_type_pg_foreign_data_wrapper",
    name: "pg_foreign_data_wrapper",
    category: "Внешние данные",
    description: "Системный каталог, хранящий определения оберток сторонних данных (Foreign Data Wrappers).",
    syntax: "pg_foreign_data_wrapper",
    arguments: [],
    example: "SELECT fdwname FROM pg_foreign_data_wrapper;"
  },
  {
    id: "pg_type__pg_foreign_data_wrapper",
    name: "_pg_foreign_data_wrapper",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_foreign_data_wrapper.",
    syntax: "_pg_foreign_data_wrapper",
    arguments: [],
    example: "SELECT ARRAY[f] FROM pg_foreign_data_wrapper f LIMIT 1;"
  },
  {
    id: "pg_type_pg_foreign_server",
    name: "pg_foreign_server",
    category: "Внешние данные",
    description: "Системный каталог, хранящий определения сторонних серверов.",
    syntax: "pg_foreign_server",
    arguments: [],
    example: "SELECT srvname FROM pg_foreign_server;"
  },
  {
    id: "pg_type__pg_foreign_server",
    name: "_pg_foreign_server",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_foreign_server.",
    syntax: "_pg_foreign_server",
    arguments: [],
    example: "SELECT ARRAY[s] FROM pg_foreign_server s LIMIT 1;"
  },
  {
    id: "pg_type_pg_user_mapping",
    name: "pg_user_mapping",
    category: "Внешние данные",
    description: "Системный каталог, хранящий сопоставления локальных пользователей с удаленными пользователями на сторонних серверах.",
    syntax: "pg_user_mapping",
    arguments: [],
    example: "SELECT umuser::regrole FROM pg_user_mapping;"
  },
  {
    id: "pg_type__pg_user_mapping",
    name: "_pg_user_mapping",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_user_mapping.",
    syntax: "_pg_user_mapping",
    arguments: [],
    example: "SELECT ARRAY[u] FROM pg_user_mapping u LIMIT 1;"
  },
  {
    id: "pg_type_pg_foreign_table",
    name: "pg_foreign_table",
    category: "Внешние данные",
    description: "Системный каталог, хранящий информацию о сторонних таблицах.",
    syntax: "pg_foreign_table",
    arguments: [],
    example: "SELECT ftrelid::regclass FROM pg_foreign_table;"
  },
  {
    id: "pg_type__pg_foreign_table",
    name: "_pg_foreign_table",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_foreign_table.",
    syntax: "_pg_foreign_table",
    arguments: [],
    example: "SELECT ARRAY[f] FROM pg_foreign_table f LIMIT 1;"
  },
  {
    id: "pg_type_pg_policy",
    name: "pg_policy",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий политики защиты строк (Row Level Security).",
    syntax: "pg_policy",
    arguments: [],
    example: "SELECT polname FROM pg_policy WHERE polrelid = 'users'::regclass;"
  },
  {
    id: "pg_type__pg_policy",
    name: "_pg_policy",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_policy.",
    syntax: "_pg_policy",
    arguments: [],
    example: "SELECT ARRAY[p] FROM pg_policy p LIMIT 1;"
  },
  {
    id: "pg_type_pg_replication_origin",
    name: "pg_replication_origin",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий информацию о точках происхождения репликации.",
    syntax: "pg_replication_origin",
    arguments: [],
    example: "SELECT roname FROM pg_replication_origin;"
  },
  {
    id: "pg_type__pg_replication_origin",
    name: "_pg_replication_origin",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_replication_origin.",
    syntax: "_pg_replication_origin",
    arguments: [],
    example: "SELECT ARRAY[r] FROM pg_replication_origin r LIMIT 1;"
  },
  {
    id: "pg_type_pg_default_acl",
    name: "pg_default_acl",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий права доступа по умолчанию (Default Privileges).",
    syntax: "pg_default_acl",
    arguments: [],
    example: "SELECT defaclobjtype FROM pg_default_acl;"
  },
  {
    id: "pg_type__pg_default_acl",
    name: "_pg_default_acl",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_default_acl.",
    syntax: "_pg_default_acl",
    arguments: [],
    example: "SELECT ARRAY[a] FROM pg_default_acl a LIMIT 1;"
  },
  {
    id: "pg_type_pg_init_privs",
    name: "pg_init_privs",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий начальные права доступа для объектов.",
    syntax: "pg_init_privs",
    arguments: [],
    example: "SELECT objoid::regclass, initprivs FROM pg_init_privs LIMIT 1;"
  },
  {
    id: "pg_type__pg_init_privs",
    name: "_pg_init_privs",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_init_privs.",
    syntax: "_pg_init_privs",
    arguments: [],
    example: "SELECT ARRAY[i] FROM pg_init_privs i LIMIT 1;"
  },
  {
    id: "pg_type_pg_seclabel",
    name: "pg_seclabel",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий метки безопасности для объектов базы данных.",
    syntax: "pg_seclabel",
    arguments: [],
    example: "SELECT label FROM pg_seclabel WHERE objoid = 'users'::regclass;"
  },
  {
    id: "pg_type__pg_seclabel",
    name: "_pg_seclabel",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_seclabel.",
    syntax: "_pg_seclabel",
    arguments: [],
    example: "SELECT ARRAY[s] FROM pg_seclabel s LIMIT 1;"
  },
  {
    id: "pg_type_pg_shseclabel",
    name: "pg_shseclabel",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий метки безопасности для общих (shared) объектов.",
    syntax: "pg_shseclabel",
    arguments: [],
    example: "SELECT label FROM pg_shseclabel WHERE objoid = 'my_role'::regrole;"
  },
  {
    id: "pg_type__pg_shseclabel",
    name: "_pg_shseclabel",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_shseclabel.",
    syntax: "_pg_shseclabel",
    arguments: [],
    example: "SELECT ARRAY[s] FROM pg_shseclabel s LIMIT 1;"
  },
  {
    id: "pg_type_pg_collation",
    name: "pg_collation",
    category: "Системные таблицы",
    description: "Системный каталог, хранящий правила сортировки (Collations).",
    syntax: "pg_collation",
    arguments: [],
    example: "SELECT collname FROM pg_collation;"
  },
  {
    id: "pg_type__pg_collation",
    name: "_pg_collation",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_collation.",
    syntax: "_pg_collation",
    arguments: [],
    example: "SELECT ARRAY[c] FROM pg_collation c LIMIT 1;"
  },
  {
    id: "pg_type_pg_subscription",
    name: "pg_subscription",
    category: "Репликация",
    description: "Системный каталог, хранящий информацию о логических подписках.",
    syntax: "pg_subscription",
    arguments: [],
    example: "SELECT subname FROM pg_subscription;"
  },
  {
    id: "pg_type__pg_subscription",
    name: "_pg_subscription",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_subscription.",
    syntax: "_pg_subscription",
    arguments: [],
    example: "SELECT ARRAY[s] FROM pg_subscription s LIMIT 1;"
  },
  {
    id: "pg_type_pg_subscription_rel",
    name: "pg_subscription_rel",
    category: "Репликация",
    description: "Системный каталог, хранящий состояние репликации для каждой таблицы в подписке.",
    syntax: "pg_subscription_rel",
    arguments: [],
    example: "SELECT srsubid, srrelid::regclass FROM pg_subscription_rel;"
  },
  {
    id: "pg_type__pg_subscription_rel",
    name: "_pg_subscription_rel",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_subscription_rel.",
    syntax: "_pg_subscription_rel",
    arguments: [],
    example: "SELECT ARRAY[s] FROM pg_subscription_rel s LIMIT 1;"
  },
  {
    id: "pg_type_pg_publication",
    name: "pg_publication",
    category: "Репликация",
    description: "Системный каталог, хранящий информацию о логических публикациях.",
    syntax: "pg_publication",
    arguments: [],
    example: "SELECT pubname FROM pg_publication;"
  },
  {
    id: "pg_type__pg_publication",
    name: "_pg_publication",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_publication.",
    syntax: "_pg_publication",
    arguments: [],
    example: "SELECT ARRAY[p] FROM pg_publication p LIMIT 1;"
  },
  {
    id: "pg_type_pg_publication_rel",
    name: "pg_publication_rel",
    category: "Репликация",
    description: "Системный каталог, хранящий связь между публикациями и таблицами.",
    syntax: "pg_publication_rel",
    arguments: [],
    example: "SELECT prpubid, prrelid::regclass FROM pg_publication_rel;"
  },
  {
    id: "pg_type__pg_publication_rel",
    name: "_pg_publication_rel",
    category: "Массивы",
    description: "Массив записей из системного каталога pg_publication_rel.",
    syntax: "_pg_publication_rel",
    arguments: [],
    example: "SELECT ARRAY[p] FROM pg_publication_rel p LIMIT 1;"
  }
];
