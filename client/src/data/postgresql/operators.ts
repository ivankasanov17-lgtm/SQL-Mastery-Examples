export const operators = [
  {
    id: "pg_op_not_null",
    name: "!!",
    category: "Операторы",
    description: "Префиксный оператор для проверки на NOT NULL (в некоторых контекстах или расширениях) или логическое отрицание.",
    syntax: "!! expression",
    arguments: [
      { name: "expression", description: "Выражение для проверки.", example: "SELECT !! true;" }
    ],
    example: "SELECT !! true;"
  },
  {
    id: "pg_op_not_match_regex",
    name: "!~",
    category: "Операторы",
    description: "Оператор 'не соответствует регистрозависимому регулярному выражению'.",
    syntax: "string !~ pattern",
    arguments: [
      { name: "string", description: "Проверяемая строка.", example: "SELECT 'apple' !~ '^[0-9]';" },
      { name: "pattern", description: "Регулярное выражение POSIX.", example: "SELECT 'apple' !~ '^[0-9]';" }
    ],
    example: "SELECT name FROM users WHERE name !~ '^Admin';"
  },
  {
    id: "pg_op_not_match_regex_ci",
    name: "!~*",
    category: "Операторы",
    description: "Оператор 'не соответствует регистронезависимому регулярному выражению'.",
    syntax: "string !~* pattern",
    arguments: [
      { name: "string", description: "Проверяемая строка.", example: "SELECT 'Apple' !~* '^admin';" },
      { name: "pattern", description: "Регулярное выражение POSIX (регистр игнорируется).", example: "SELECT 'Apple' !~* '^admin';" }
    ],
    example: "SELECT title FROM posts WHERE title !~* 'реклама';"
  },
  {
    id: "pg_op_not_like",
    name: "!~~",
    category: "Операторы",
    description: "Эквивалент оператора NOT LIKE.",
    syntax: "string !~~ pattern",
    arguments: [
      { name: "string", description: "Проверяемая строка.", example: "SELECT 'hello' !~~ 'he%';" },
      { name: "pattern", description: "Шаблон LIKE.", example: "SELECT 'hello' !~~ 'he%';" }
    ],
    example: "SELECT * FROM products WHERE code !~~ 'TEST%';"
  },
  {
    id: "pg_op_not_ilike",
    name: "!~~*",
    category: "Операторы",
    description: "Эквивалент оператора NOT ILIKE (регистронезависимый NOT LIKE).",
    syntax: "string !~~* pattern",
    arguments: [
      { name: "string", description: "Проверяемая строка.", example: "SELECT 'Hello' !~~* 'he%';" },
      { name: "pattern", description: "Шаблон ILIKE.", example: "SELECT 'Hello' !~~* 'he%';" }
    ],
    example: "SELECT * FROM users WHERE login !~~* 'guest%';"
  },
  {
    id: "pg_op_hash",
    name: "#",
    category: "Операторы",
    description: "Побитовое исключающее ИЛИ (XOR) или оператор получения количества элементов в массиве/наборе (в зависимости от контекста).",
    syntax: "expression # expression",
    arguments: [
      { name: "expression", description: "Целочисленное значение или объект.", example: "SELECT 5 # 3;" }
    ],
    example: "SELECT 5 # 3; -- Результат: 6"
  },
  {
    id: "pg_op_abs",
    name: "##",
    category: "Операторы",
    description: "Оператор вычисления абсолютного значения (в некоторых контекстах) или специфичный оператор геометрических типов.",
    syntax: "## expression",
    arguments: [
      { name: "expression", description: "Числовое значение или геометрический объект.", example: "SELECT ## -5;" }
    ],
    example: "SELECT ## lseg '((0,0),(1,1))'; -- Длина отрезка"
  },
  {
    id: "pg_op_delete_json",
    name: "#-",
    category: "Операторы",
    description: "Удаляет поле или элемент массива по указанному пути в JSONB.",
    syntax: "jsonb #- path",
    arguments: [
      { name: "jsonb", description: "Исходный JSONB объект.", example: "SELECT '{\"a\": [1, 2, 3]}'::jsonb #- '{a,1}';" },
      { name: "path", description: "Путь к элементу в виде массива строк.", example: "SELECT '{\"a\": [1, 2, 3]}'::jsonb #- '{a,1}';" }
    ],
    example: "SELECT '{\"user\": {\"name\": \"Ivan\", \"age\": 25}}'::jsonb #- '{user,age}';"
  },
  {
    id: "pg_op_get_json_path",
    name: "#>",
    category: "Операторы",
    description: "Извлекает JSON-объект по указанному пути.",
    syntax: "jsonb #> path",
    arguments: [
      { name: "jsonb", description: "JSONB объект.", example: "SELECT '{\"a\": {\"b\": 1}}'::jsonb #> '{a,b}';" },
      { name: "path", description: "Путь к элементу.", example: "SELECT '{\"a\": {\"b\": 1}}'::jsonb #> '{a,b}';" }
    ],
    example: "SELECT '{\"data\": {\"items\": [10, 20]}}'::jsonb #> '{data,items,0}';"
  },
  {
    id: "pg_op_get_json_path_text",
    name: "#>>",
    category: "Операторы",
    description: "Извлекает JSON-объект по указанному пути в виде текста.",
    syntax: "jsonb #>> path",
    arguments: [
      { name: "jsonb", description: "JSONB объект.", example: "SELECT '{\"a\": {\"b\": 1}}'::jsonb #>> '{a,b}';" },
      { name: "path", description: "Путь к элементу.", example: "SELECT '{\"a\": {\"b\": 1}}'::jsonb #>> '{a,b}';" }
    ],
    example: "SELECT '{\"info\": {\"status\": \"active\"}}'::jsonb #>> '{info,status}';"
  },
  {
    id: "pg_op_mod",
    name: "%",
    category: "Операторы",
    description: "Оператор вычисления остатка от деления (модуль).",
    syntax: "number % divisor",
    arguments: [
      { name: "number", description: "Делимое.", example: "SELECT 10 % 3;" },
      { name: "divisor", description: "Делитель.", example: "SELECT 10 % 3;" }
    ],
    example: "SELECT id FROM table WHERE id % 2 = 0; -- Поиск четных ID"
  },
  {
    id: "pg_op_bit_and",
    name: "&",
    category: "Операторы",
    description: "Побитовое И (AND).",
    syntax: "value & mask",
    arguments: [
      { name: "value", description: "Числовое значение.", example: "SELECT 7 & 4;" },
      { name: "mask", description: "Битовая маска.", example: "SELECT 7 & 4;" }
    ],
    example: "SELECT flags & 1 FROM users; -- Проверка младшего бита"
  },
  {
    id: "pg_op_overlap",
    name: "&&",
    category: "Операторы",
    description: "Оператор проверки пересечения (массивы, диапазоны, геометрия).",
    syntax: "a && b",
    arguments: [
      { name: "a", description: "Первый массив или диапазон.", example: "SELECT ARRAY[1,2] && ARRAY[2,3];" },
      { name: "b", description: "Второй массив или диапазон.", example: "SELECT ARRAY[1,2] && ARRAY[2,3];" }
    ],
    example: "SELECT * FROM schedules WHERE work_days && '{Monday, Tuesday}'::text[];"
  },
  {
    id: "pg_op_range_not_extend_right",
    name: "&<",
    category: "Операторы",
    description: "Проверяет, что первый диапазон не распространяется вправо за второй.",
    syntax: "range &< range",
    arguments: [
      { name: "range", description: "Диапазон для сравнения.", example: "SELECT int4range(1, 10) &< int4range(5, 15);" }
    ],
    example: "SELECT int4range(1, 5) &< int4range(3, 7);"
  },
  {
    id: "pg_op_range_not_extend_up",
    name: "&<|",
    category: "Операторы",
    description: "Проверяет, что первый объект не распространяется вверх за второй (геометрический).",
    syntax: "box &<| box",
    arguments: [
      { name: "box", description: "Прямоугольник или другой геометрический объект.", example: "SELECT box '((0,0),(1,1))' &<| box '((0,0),(2,2))';" }
    ],
    example: "SELECT * FROM map_objects WHERE area &<| box '((0,0),(100,100))';"
  },
  {
    id: "pg_op_range_not_extend_left",
    name: "&>",
    category: "Операторы",
    description: "Проверяет, что первый диапазон не распространяется влево за второй.",
    syntax: "range &> range",
    arguments: [
      { name: "range", description: "Диапазон для сравнения.", example: "SELECT int4range(5, 15) &> int4range(1, 10);" }
    ],
    example: "SELECT int4range(10, 20) &> int4range(5, 15);"
  },
  {
    id: "pg_op_mul",
    name: "*",
    category: "Операторы",
    description: "Оператор умножения.",
    syntax: "a * b",
    arguments: [
      { name: "a", description: "Множитель.", example: "SELECT 5 * 5;" },
      { name: "b", description: "Множитель.", example: "SELECT 5 * 5;" }
    ],
    example: "SELECT price * quantity AS total FROM orders;"
  },
  {
    id: "pg_op_lt_spec",
    name: "*<",
    category: "Операторы",
    description: "Оператор 'меньше' для специфических типов данных или расширений.",
    syntax: "a *< b",
    arguments: [
      { name: "a", description: "Левое значение.", example: "SELECT 'a' *< 'b';" }
    ],
    example: "SELECT * FROM table WHERE col *< 'value';"
  },
  {
    id: "pg_op_lte_spec",
    name: "*<=",
    category: "Операторы",
    description: "Оператор 'меньше или равно' для специфических типов.",
    syntax: "a *<= b",
    arguments: [
      { name: "a", description: "Левое значение.", example: "SELECT 1 *<= 2;" }
    ],
    example: "SELECT * FROM table WHERE col *<= 10;"
  },
  {
    id: "pg_op_neq_spec",
    name: "*<>",
    category: "Операторы",
    description: "Оператор 'не равно' для специфических типов.",
    syntax: "a *<> b",
    arguments: [
      { name: "a", description: "Значение для сравнения.", example: "SELECT 1 *<> 2;" }
    ],
    example: "SELECT * FROM table WHERE col *<> 0;"
  },
  {
    id: "pg_op_eq_spec",
    name: "*=",
    category: "Операторы",
    description: "Оператор 'равно' для специфических типов (например, в расширениях или старых стилях join).",
    syntax: "a *= b",
    arguments: [
      { name: "a", description: "Значение для сравнения.", example: "SELECT 1 *= 1;" }
    ],
    example: "SELECT * FROM table WHERE col *= 'val';"
  },
  {
    id: "pg_op_gt_spec",
    name: "*>",
    category: "Операторы",
    description: "Оператор 'больше' для специфических типов.",
    syntax: "a *> b",
    arguments: [
      { name: "a", description: "Левое значение.", example: "SELECT 2 *> 1;" }
    ],
    example: "SELECT * FROM table WHERE col *> 5;"
  },
  {
    id: "pg_op_gte_spec",
    name: "*>=",
    category: "Операторы",
    description: "Оператор 'больше или равно' для специфических типов.",
    syntax: "a *>= b",
    arguments: [
      { name: "a", description: "Левое значение.", example: "SELECT 2 *>= 2;" }
    ],
    example: "SELECT * FROM table WHERE col *>= 10;"
  },
  {
    id: "pg_op_add",
    name: "+",
    category: "Операторы",
    description: "Оператор сложения (числа, даты, интервалы).",
    syntax: "a + b",
    arguments: [
      { name: "a", description: "Слагаемое.", example: "SELECT now() + interval '1 day';" },
      { name: "b", description: "Слагаемое.", example: "SELECT 10 + 20;" }
    ],
    example: "SELECT price + tax FROM products;"
  },
  {
    id: "pg_op_sub",
    name: "-",
    category: "Операторы",
    description: "Оператор вычитания или унарный минус.",
    syntax: "a - b",
    arguments: [
      { name: "a", description: "Уменьшаемое.", example: "SELECT 100 - 50;" },
      { name: "b", description: "Вычитаемое.", example: "SELECT 100 - 50;" }
    ],
    example: "SELECT balance - withdrawal FROM accounts;"
  },
  {
    id: "pg_op_get_json",
    name: "->",
    category: "Операторы",
    description: "Извлекает поле JSON по ключу или элемент массива по индексу.",
    syntax: "json -> key_or_index",
    arguments: [
      { name: "json", description: "JSON или JSONB объект.", example: "SELECT '{\"a\":1}'::json -> 'a';" },
      { name: "key_or_index", description: "Ключ (текст) или индекс (число).", example: "SELECT '[10,20]'::json -> 0;" }
    ],
    example: "SELECT data -> 'name' FROM profiles;"
  },
  {
    id: "pg_op_get_json_text",
    name: "->>",
    category: "Операторы",
    description: "Извлекает поле JSON по ключу или элемент массива по индексу в виде текста.",
    syntax: "json ->> key_or_index",
    arguments: [
      { name: "json", description: "JSON или JSONB объект.", example: "SELECT '{\"a\":1}'::json ->> 'a';" },
      { name: "key_or_index", description: "Ключ (текст) или индекс (число).", example: "SELECT '[10,20]'::json ->> 0;" }
    ],
    example: "SELECT data ->> 'id' FROM items;"
  },
  {
    id: "pg_op_is_adjacent",
    name: "-|-",
    category: "Операторы",
    description: "Проверяет, являются ли два диапазона смежными (граничат, но не пересекаются).",
    syntax: "range -|- range",
    arguments: [
      { name: "range", description: "Диапазон для проверки.", example: "SELECT int4range(1, 5) -|- int4range(5, 10);" }
    ],
    example: "SELECT numrange(1.1, 2.2) -|- numrange(2.2, 3.3);"
  },
  {
    id: "pg_op_div",
    name: "/",
    category: "Операторы",
    description: "Оператор деления.",
    syntax: "a / b",
    arguments: [
      { name: "a", description: "Делимое.", example: "SELECT 10 / 2;" },
      { name: "b", description: "Делитель.", example: "SELECT 10 / 2;" }
    ],
    example: "SELECT total_sum / count AS average FROM stats;"
  },
  {
    id: "pg_op_lt",
    name: "<",
    category: "Операторы",
    description: "Оператор 'меньше'.",
    syntax: "a < b",
    arguments: [
      { name: "a", description: "Левое значение.", example: "SELECT 1 < 2;" },
      { name: "b", description: "Правое значение.", example: "SELECT 1 < 2;" }
    ],
    example: "SELECT * FROM products WHERE price < 100;"
  },
  {
    id: "pg_op_dist",
    name: "<->",
    category: "Операторы",
    description: "Оператор вычисления расстояния (геометрия, векторы, tsvector).",
    syntax: "a <-> b",
    arguments: [
      { name: "a", description: "Первая точка или вектор.", example: "SELECT point(0,0) <-> point(1,1);" },
      { name: "b", description: "Вторая точка или вектор.", example: "SELECT point(0,0) <-> point(1,1);" }
    ],
    example: "SELECT * FROM locations ORDER BY location <-> point(40.7, -74.0) LIMIT 10;"
  },
  {
    id: "pg_op_bit_shift_left",
    name: "<<",
    category: "Операторы",
    description: "Побитовый сдвиг влево или оператор 'строго слева' (для геометрии/сетей).",
    syntax: "a << b",
    arguments: [
      { name: "a", description: "Значение или сетевой адрес.", example: "SELECT 1 << 4;" },
      { name: "b", description: "Величина сдвига или адрес.", example: "SELECT 1 << 4;" }
    ],
    example: "SELECT inet '192.168.1.0/24' << inet '192.168.0.0/16';"
  },
  {
    id: "pg_op_inet_contained_eq",
    name: "<<=",
    category: "Операторы",
    description: "Проверяет, содержится ли адрес в сети или равен ей.",
    syntax: "inet <<= inet",
    arguments: [
      { name: "addr", description: "Сетевой адрес.", example: "SELECT inet '192.168.1.1' <<= inet '192.168.1.0/24';" }
    ],
    example: "SELECT * FROM log WHERE ip <<= inet '10.0.0.0/8';"
  },
  {
    id: "pg_op_strictly_below",
    name: "<<|",
    category: "Операторы",
    description: "Оператор 'строго ниже' (для геометрических типов).",
    syntax: "a <<| b",
    arguments: [
      { name: "a", description: "Геометрический объект.", example: "SELECT point(0,0) <<| point(0,1);" }
    ],
    example: "SELECT * FROM areas WHERE boundary <<| box '((0,10),(10,20))';"
  },
  {
    id: "pg_op_lte",
    name: "<=",
    category: "Операторы",
    description: "Оператор 'меньше или равно'.",
    syntax: "a <= b",
    arguments: [
      { name: "a", description: "Левое значение.", example: "SELECT 5 <= 10;" }
    ],
    example: "SELECT * FROM orders WHERE created_at <= now();"
  },
  {
    id: "pg_op_neq",
    name: "<>",
    category: "Операторы",
    description: "Оператор 'не равно'.",
    syntax: "a <> b",
    arguments: [
      { name: "a", description: "Первое значение.", example: "SELECT 1 <> 2;" }
    ],
    example: "SELECT * FROM users WHERE status <> 'deleted';"
  },
  {
    id: "pg_op_contained_in",
    name: "<@",
    category: "Операторы",
    description: "Оператор 'содержится в' (для массивов, диапазонов, JSONB, геометрии).",
    syntax: "a <@ b",
    arguments: [
      { name: "a", description: "Элемент или подмножество.", example: "SELECT ARRAY[1] <@ ARRAY[1,2];" },
      { name: "b", description: "Контейнер (массив, диапазон и т.д.).", example: "SELECT ARRAY[1] <@ ARRAY[1,2];" }
    ],
    example: "SELECT * FROM events WHERE tags <@ ARRAY['work', 'urgent']::text[];"
  },
  {
    id: "pg_op_is_below",
    name: "<^",
    category: "Операторы",
    description: "Проверяет, находится ли первый объект ниже второго (геометрия).",
    syntax: "a <^ b",
    arguments: [
      { name: "a", description: "Объект.", example: "SELECT point(1,1) <^ point(1,2);" }
    ],
    example: "SELECT * FROM shapes WHERE p <^ point(0,0);"
  },
  {
    id: "pg_op_eq",
    name: "=",
    category: "Операторы",
    description: "Оператор равенства.",
    syntax: "a = b",
    arguments: [
      { name: "a", description: "Левое значение.", example: "SELECT 1 = 1;" }
    ],
    example: "SELECT * FROM users WHERE id = 101;"
  },
  {
    id: "pg_op_gt",
    name: ">",
    category: "Операторы",
    description: "Оператор 'больше'.",
    syntax: "a > b",
    arguments: [
      { name: "a", description: "Левое значение.", example: "SELECT 2 > 1;" }
    ],
    example: "SELECT * FROM products WHERE stock > 0;"
  },
  {
    id: "pg_op_gte",
    name: ">=",
    category: "Операторы",
    description: "Оператор 'больше или равно'.",
    syntax: "a >= b",
    arguments: [
      { name: "a", description: "Левое значение.", example: "SELECT 10 >= 10;" }
    ],
    example: "SELECT * FROM employees WHERE age >= 18;"
  },
  {
    id: "pg_op_bit_shift_right",
    name: ">>",
    category: "Операторы",
    description: "Побитовый сдвиг вправо или оператор 'строго справа' (для геометрии/сетей).",
    syntax: "a >> b",
    arguments: [
      { name: "a", description: "Значение или сетевой адрес.", example: "SELECT 16 >> 2;" }
    ],
    example: "SELECT inet '192.168.0.0/16' >> inet '192.168.1.0/24';"
  },
  {
    id: "pg_op_inet_contains_eq",
    name: ">>=",
    category: "Операторы",
    description: "Проверяет, содержит ли сеть адрес или равна ему.",
    syntax: "inet >>= inet",
    arguments: [
      { name: "net", description: "Сетевой адрес.", example: "SELECT inet '192.168.1.0/24' >>= inet '192.168.1.1';" }
    ],
    example: "SELECT * FROM white_list WHERE network >>= '1.2.3.4';"
  },
  {
    id: "pg_op_strictly_above",
    name: ">^",
    category: "Операторы",
    description: "Оператор 'строго выше' (для геометрических типов).",
    syntax: "a >^ b",
    arguments: [
      { name: "a", description: "Объект.", example: "SELECT point(0,1) >^ point(0,0);" }
    ],
    example: "SELECT * FROM objects WHERE pos >^ point(0,0);"
  },
  {
    id: "pg_op_json_exists",
    name: "?",
    category: "Операторы",
    description: "Проверяет существование ключа в JSONB или является ли значение NULL (в некоторых расширениях).",
    syntax: "jsonb ? text",
    arguments: [
      { name: "jsonb", description: "JSONB объект.", example: "SELECT '{\"a\":1}'::jsonb ? 'a';" },
      { name: "key", description: "Искомый ключ.", example: "SELECT '{\"a\":1}'::jsonb ? 'a';" }
    ],
    example: "SELECT * FROM logs WHERE data ? 'error_code';"
  },
  {
    id: "pg_op_path_interacts",
    name: "?#",
    category: "Операторы",
    description: "Проверяет пересечение путей (геометрия).",
    syntax: "path ?# path",
    arguments: [
      { name: "path", description: "Геометрический путь.", example: "SELECT path '[(0,0),(1,1)]' ?# path '[(0,1),(1,0)]';" }
    ],
    example: "SELECT * FROM routes WHERE path ?# '[(0,0),(10,10)]';"
  },
  {
    id: "pg_op_json_exists_all",
    name: "?&",
    category: "Операторы",
    description: "Проверяет существование всех указанных ключей в JSONB.",
    syntax: "jsonb ?& text[]",
    arguments: [
      { name: "jsonb", description: "JSONB объект.", example: "SELECT '{\"a\":1, \"b\":2}'::jsonb ?& ARRAY['a', 'b'];" }
    ],
    example: "SELECT * FROM profiles WHERE settings ?& ARRAY['theme', 'lang'];"
  },
  {
    id: "pg_op_is_horizontal",
    name: "?-",
    category: "Операторы",
    description: "Проверяет горизонтальность (линии, отрезки).",
    syntax: "?- expression",
    arguments: [
      { name: "expression", description: "Геометрический объект.", example: "SELECT ?- lseg '((0,0),(1,0))';" }
    ],
    example: "SELECT * FROM lines WHERE ?- line;"
  },
  {
    id: "pg_op_is_perpendicular",
    name: "?-|",
    category: "Операторы",
    description: "Проверяет перпендикулярность объектов.",
    syntax: "a ?-| b",
    arguments: [
      { name: "a", description: "Объект 1.", example: "SELECT lseg '((0,0),(1,0))' ?-| lseg '((0,0),(0,1))';" }
    ],
    example: "SELECT * FROM walls WHERE w1 ?-| w2;"
  },
  {
    id: "pg_op_json_exists_any",
    name: "?|",
    category: "Операторы",
    description: "Проверяет существование любого из указанных ключей в JSONB.",
    syntax: "jsonb ?| text[]",
    arguments: [
      { name: "jsonb", description: "JSONB объект.", example: "SELECT '{\"a\":1}'::jsonb ?| ARRAY['a', 'x'];" }
    ],
    example: "SELECT * FROM tasks WHERE flags ?| ARRAY['urgent', 'blocked'];"
  },
  {
    id: "pg_op_is_vertical",
    name: "?||",
    category: "Операторы",
    description: "Проверяет вертикальность (линии, отрезки).",
    syntax: "?|| expression",
    arguments: [
      { name: "expression", description: "Геометрический объект.", example: "SELECT ?|| lseg '((0,0),(0,1))';" }
    ],
    example: "SELECT * FROM lines WHERE ?|| line;"
  },
  {
    id: "pg_op_abs_geom",
    name: "@",
    category: "Операторы",
    description: "Оператор вычисления абсолютного значения или площади/длины (геометрия).",
    syntax: "@ expression",
    arguments: [
      { name: "expression", description: "Объект или число.", example: "SELECT @ circle '((0,0), 2)';" }
    ],
    example: "SELECT @ area FROM shapes;"
  },
  {
    id: "pg_op_length_geom",
    name: "@-@",
    category: "Операторы",
    description: "Вычисляет общую длину (пути, границы).",
    syntax: "@-@ expression",
    arguments: [
      { name: "expression", description: "Геометрический объект.", example: "SELECT @-@ path '[(0,0),(1,0),(1,1)]';" }
    ],
    example: "SELECT @-@ boundary FROM plots;"
  },
  {
    id: "pg_op_contains",
    name: "@>",
    category: "Операторы",
    description: "Оператор 'содержит' (массивы, диапазоны, JSONB, геометрия).",
    syntax: "a @> b",
    arguments: [
      { name: "a", description: "Контейнер.", example: "SELECT ARRAY[1,2] @> ARRAY[1];" },
      { name: "b", description: "Содержимое.", example: "SELECT '{\"a\":1, \"b\":2}'::jsonb @> '{\"a\":1}';" }
    ],
    example: "SELECT * FROM orders WHERE items @> '[{\"id\": 101}]'::jsonb;"
  },
  {
    id: "pg_op_jsonb_path_exists",
    name: "@?",
    category: "Операторы",
    description: "Проверяет, возвращает ли JSON путь какой-либо элемент для данного JSONB.",
    syntax: "jsonb @? jsonpath",
    arguments: [
      { name: "jsonb", description: "JSONB объект.", example: "SELECT '{\"a\":1}'::jsonb @? '$.a';" }
    ],
    example: "SELECT * FROM data WHERE doc @? '$.items[*] ? (@ > 10)';"
  },
  {
    id: "pg_op_tsquery_match",
    name: "@@",
    category: "Операторы",
    description: "Оператор соответствия для полнотекстового поиска или JSONB путей.",
    syntax: "text @@ tsquery",
    arguments: [
      { name: "text", description: "Текст или tsvector.", example: "SELECT 'hello world'::tsvector @@ 'hello'::tsquery;" }
    ],
    example: "SELECT * FROM articles WHERE body_tsvector @@ to_tsquery('russian', 'база & данных');"
  },
  {
    id: "pg_op_deprecated_match",
    name: "@@@",
    category: "Операторы",
    description: "Устаревший оператор соответствия (в некоторых версиях или расширениях).",
    syntax: "a @@@ b",
    arguments: [
      { name: "a", description: "Значение.", example: "SELECT 'val' @@@ 'query';" }
    ],
    example: "SELECT * FROM t WHERE col @@@ 'q';"
  },
  {
    id: "pg_op_power",
    name: "^",
    category: "Операторы",
    description: "Оператор возведения в степень.",
    syntax: "base ^ exponent",
    arguments: [
      { name: "base", description: "Основание.", example: "SELECT 2.0 ^ 3.0;" },
      { name: "exponent", description: "Показатель степени.", example: "SELECT 2.0 ^ 3.0;" }
    ],
    example: "SELECT 10 ^ 2; -- Результат: 100"
  },
  {
    id: "pg_op_starts_with",
    name: "^@",
    category: "Операторы",
    description: "Оператор 'начинается с' (эффективно использует индексы для строк).",
    syntax: "string ^@ prefix",
    arguments: [
      { name: "string", description: "Строка.", example: "SELECT 'PostgreSQL' ^@ 'Post';" }
    ],
    example: "SELECT * FROM users WHERE username ^@ 'admin_';"
  },
  {
    id: "pg_op_bit_or",
    name: "|",
    category: "Операторы",
    description: "Побитовое ИЛИ (OR).",
    syntax: "value | mask",
    arguments: [
      { name: "value", description: "Числовое значение.", example: "SELECT 5 | 2;" }
    ],
    example: "SELECT flags | 4 FROM settings;"
  },
  {
    id: "pg_op_not_extend_below",
    name: "|&>",
    category: "Операторы",
    description: "Проверяет, что первый объект не распространяется ниже второго (геометрия).",
    syntax: "a |&> b",
    arguments: [
      { name: "a", description: "Геометрический объект.", example: "SELECT box '((0,0),(1,1))' |&> box '((0,-1),(1,0))';" }
    ],
    example: "SELECT * FROM map_objects WHERE area |&> box '((0,0),(100,100))';"
  },
  {
    id: "pg_op_cube_root",
    name: "|/",
    category: "Операторы",
    description: "Оператор вычисления кубического корня.",
    syntax: "|/ expression",
    arguments: [
      { name: "expression", description: "Числовое значение.", example: "SELECT |/ 27.0;" }
    ],
    example: "SELECT |/ volume FROM containers;"
  },
  {
    id: "pg_op_strictly_above_spec",
    name: "|>>",
    category: "Операторы",
    description: "Оператор 'строго выше' для специфических типов (например, lbit или геометрия).",
    syntax: "a |>> b",
    arguments: [
      { name: "a", description: "Объект.", example: "SELECT box '((0,2),(1,3))' |>> box '((0,0),(1,1))';" }
    ],
    example: "SELECT * FROM layers WHERE bounds |>> active_view;"
  },
  {
    id: "pg_op_concat",
    name: "||",
    category: "Операторы",
    description: "Конкатенация строк или массивов.",
    syntax: "string || string",
    arguments: [
      { name: "left", description: "Левый операнд (строка или массив).", example: "'Hello ' || 'World'" },
      { name: "right", description: "Правый операнд (строка или массив).", example: "ARRAY[1] || ARRAY[2]" }
    ],
    example: "SELECT 'Postgre' || 'SQL';"
  },
  {
    id: "pg_op_sqrt",
    name: "||/",
    category: "Операторы",
    description: "Оператор вычисления квадратного корня.",
    syntax: "||/ expression",
    arguments: [
      { name: "expression", description: "Числовое значение.", example: "SELECT ||/ 16.0;" }
    ],
    example: "SELECT ||/ area FROM squares;"
  },
  {
    id: "pg_op_match_regex",
    name: "~",
    category: "Операторы",
    description: "Оператор соответствия регистрозависимому регулярному выражению.",
    syntax: "string ~ pattern",
    arguments: [
      { name: "string", description: "Строка.", example: "SELECT 'apple' ~ 'a.p';" }
    ],
    example: "SELECT * FROM users WHERE email ~ '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';"
  },
  {
    id: "pg_op_match_regex_ci",
    name: "~*",
    category: "Операторы",
    description: "Оператор соответствия регистронезависимому регулярному выражению.",
    syntax: "string ~* pattern",
    arguments: [
      { name: "string", description: "Строка.", example: "SELECT 'Apple' ~* 'apple';" }
    ],
    example: "SELECT * FROM posts WHERE content ~* 'postgres';"
  },
  {
    id: "pg_op_tilde_lte_tilde",
    name: "~<=~",
    category: "Операторы",
    description: "Оператор сравнения строк (меньше или равно) с учетом локали или специфических правил расширений.",
    syntax: "string ~<=~ string",
    arguments: [
      { name: "a", description: "Первая строка.", example: "SELECT 'a' ~<=~ 'b';" }
    ],
    example: "SELECT * FROM table WHERE col ~<=~ 'target';"
  },
  {
    id: "pg_op_tilde_lt_tilde",
    name: "~<~",
    category: "Операторы",
    description: "Оператор сравнения строк (меньше) с учетом локали или специфических правил расширений.",
    syntax: "string ~<~ string",
    arguments: [
      { name: "a", description: "Первая строка.", example: "SELECT 'a' ~<~ 'b';" }
    ],
    example: "SELECT * FROM table WHERE col ~<~ 'target';"
  },
  {
    id: "pg_op_tilde_eq",
    name: "~=",
    category: "Операторы",
    description: "Оператор равенства для специфических типов (геометрия, расширения).",
    syntax: "a ~= b",
    arguments: [
      { name: "a", description: "Объект.", example: "SELECT point(1,1) ~= point(1,1);" }
    ],
    example: "SELECT * FROM shapes WHERE area ~= box '((0,0),(1,1))';"
  },
  {
    id: "pg_op_tilde_gte_tilde",
    name: "~>=~",
    category: "Операторы",
    description: "Оператор сравнения строк (больше или равно) с учетом локали.",
    syntax: "string ~>=~ string",
    arguments: [
      { name: "a", description: "Первая строка.", example: "SELECT 'b' ~>=~ 'a';" }
    ],
    example: "SELECT * FROM table WHERE col ~>=~ 'target';"
  },
  {
    id: "pg_op_tilde_gt_tilde",
    name: "~>~",
    category: "Операторы",
    description: "Оператор сравнения строк (больше) с учетом локали.",
    syntax: "string ~>~ string",
    arguments: [
      { name: "a", description: "Первая строка.", example: "SELECT 'b' ~>~ 'a';" }
    ],
    example: "SELECT * FROM table WHERE col ~>~ 'target';"
  },
  {
    id: "pg_op_like",
    name: "~~",
    category: "Операторы",
    description: "Эквивалент оператора LIKE.",
    syntax: "string ~~ pattern",
    arguments: [
      { name: "string", description: "Строка.", example: "SELECT 'hello' ~~ 'he%';" }
    ],
    example: "SELECT * FROM products WHERE name ~~ 'Phone%';"
  },
  {
    id: "pg_op_ilike",
    name: "~~*",
    category: "Операторы",
    description: "Эквивалент оператора ILIKE.",
    syntax: "string ~~* pattern",
    arguments: [
      { name: "string", description: "Строка.", example: "SELECT 'Hello' ~~* 'he%';" }
    ],
    example: "SELECT * FROM users WHERE login ~~* 'admin%';"
  }
];
