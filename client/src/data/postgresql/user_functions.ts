export const userFunctions = [
  { 
    id: "pg_brin_minmax_union", 
    name: "brin_minmax_union", 
    category: "Пользовательские функции", 
    description: "Объединяет два minmax-интервала в BRIN-индексе.", 
    syntax: "brin_minmax_union(internal, internal, internal)",
    arguments: [{ name: "internal", description: "Состояния интервалов.", example: "s1, s2" }],
    example: "-- Используется при агрегации блоков в BRIN" 
  },
  { 
    id: "pg_brin_summarize_new_values", 
    name: "brin_summarize_new_values", 
    category: "Пользовательские функции", 
    description: "Сканирует таблицу и добавляет сводную информацию о новых строках в BRIN-индекс.", 
    syntax: "brin_summarize_new_values(regclass)",
    arguments: [{ name: "index", description: "Имя или OID индекса.", example: "'my_idx'::regclass" }],
    example: "SELECT brin_summarize_new_values('my_table_brin_idx');" 
  },
  { 
    id: "pg_brin_summarize_range", 
    name: "brin_summarize_range", 
    category: "Пользовательские функции", 
    description: "Создает сводную информацию для конкретного диапазона страниц в BRIN-индексе.", 
    syntax: "brin_summarize_range(regclass, bigint)",
    arguments: [
      { name: "index", description: "Имя или OID индекса.", example: "'my_idx'::regclass" },
      { name: "block", description: "Номер блока.", example: "0" }
    ],
    example: "SELECT brin_summarize_range('my_idx', 0);" 
  },
  { 
    id: "pg_brinhandler", 
    name: "brinhandler", 
    category: "Пользовательские функции", 
    description: "Обработчик метода доступа BRIN.", 
    syntax: "brinhandler(internal)",
    arguments: [{ name: "internal", description: "Внутренние параметры.", example: "..." }],
    example: "-- Системная функция для регистрации метода доступа" 
  },
  { 
    id: "pg_broadcast", 
    name: "broadcast", 
    category: "Пользовательские функции", 
    description: "Возвращает широковещательный адрес для сетевого адреса (тип inet).", 
    syntax: "broadcast(inet)",
    arguments: [{ name: "inet", description: "Сетевой адрес/сеть.", example: "'192.168.1.5/24'::inet" }],
    example: "SELECT broadcast('192.168.1.5/24'::inet);" 
  },
  { 
    id: "pg_btarraycmp", 
    name: "btarraycmp", 
    category: "Пользовательские функции", 
    description: "Сравнивает два массива (используется B-деревом).", 
    syntax: "btarraycmp(anyarray, anyarray)",
    arguments: [
      { name: "arr1", description: "Первый массив.", example: "ARRAY[1,2]" },
      { name: "arr2", description: "Второй массив.", example: "ARRAY[1,3]" }
    ],
    example: "SELECT btarraycmp(ARRAY[1,2], ARRAY[1,3]);" 
  },
  { 
    id: "pg_btboolcmp", 
    name: "btboolcmp", 
    category: "Пользовательские функции", 
    description: "Сравнивает два логических значения (используется B-деревом).", 
    syntax: "btboolcmp(boolean, boolean)",
    arguments: [
      { name: "b1", description: "Первое значение.", example: "true" },
      { name: "b2", description: "Второе значение.", example: "false" }
    ],
    example: "SELECT btboolcmp(true, false);" 
  },
  { 
    id: "pg_btboolskipsupport", 
    name: "btboolskipsupport", 
    category: "Пользовательские функции", 
    description: "Поддержка пропуска значений (Index Skip Scan) для типа boolean.", 
    syntax: "btboolskipsupport(internal)",
    arguments: [{ name: "internal", description: "Внутренний контекст.", example: "..." }],
    example: "-- Внутренняя функция оптимизатора" 
  },
  { 
    id: "pg_btbpchar_pattern_cmp", 
    name: "btbpchar_pattern_cmp", 
    category: "Пользовательские функции", 
    description: "Сравнение bpchar по правилам C locale для B-дерева.", 
    syntax: "btbpchar_pattern_cmp(character, character)",
    arguments: [
      { name: "arg1", description: "Первая строка.", example: "'a'" },
      { name: "arg2", description: "Вторая строка.", example: "'b'" }
    ],
    example: "SELECT btbpchar_pattern_cmp('a'::char(1), 'b'::char(1));" 
  },
  { 
    id: "pg_btbpchar_pattern_sortsupport", 
    name: "btbpchar_pattern_sortsupport", 
    category: "Пользовательские функции", 
    description: "Поддержка быстрой сортировки bpchar (C locale) в B-дереве.", 
    syntax: "btbpchar_pattern_sortsupport(internal)",
    arguments: [{ name: "internal", description: "Контекст сортировки.", example: "..." }],
    example: "-- Внутренняя оптимизация B-tree" 
  },
  { 
    id: "pg_btcharcmp", 
    name: "btcharcmp", 
    category: "Пользовательские функции", 
    description: "Сравнение значений типа \"char\" (однобайтовый символ) в B-дереве.", 
    syntax: "btcharcmp(\"char\", \"char\")",
    arguments: [
      { name: "c1", description: "Первый символ.", example: "'a'::\"char\"" },
      { name: "c2", description: "Второй символ.", example: "'b'::\"char\"" }
    ],
    example: "SELECT btcharcmp('a'::\"char\", 'b'::\"char\");" 
  },
  { 
    id: "pg_btcharskipsupport", 
    name: "btcharskipsupport", 
    category: "Пользовательские функции", 
    description: "Поддержка пропуска значений (Index Skip Scan) для типа \"char\".", 
    syntax: "btcharskipsupport(internal)",
    arguments: [{ name: "internal", description: "Контекст.", example: "..." }],
    example: "-- Внутренняя оптимизация B-tree" 
  },
  { 
    id: "pg_btequalimage", 
    name: "btequalimage", 
    category: "Пользовательские функции", 
    description: "Проверяет, является ли тип данных 'equal image' для дедупликации в B-дереве.", 
    syntax: "btequalimage(oid)",
    arguments: [{ name: "type_oid", description: "OID типа.", example: "23" }],
    example: "SELECT btequalimage(23);" 
  },
  { 
    id: "pg_brin_inclusion_add_value", 
    name: "brin_inclusion_add_value", 
    category: "Пользовательские функции", 
    description: "Добавляет значение в BRIN-индекс типа inclusion (для диапазонов).", 
    syntax: "brin_inclusion_add_value(internal, internal, internal, internal)",
    arguments: [{ name: "internal", description: "Внутреннее состояние индекса.", example: "state" }],
    example: "-- Используется механизмом BRIN для включений" 
  },
  { 
    id: "pg_brin_inclusion_consistent", 
    name: "brin_inclusion_consistent", 
    category: "Пользовательские функции", 
    description: "Проверяет соответствие значения диапазону в BRIN-индексе inclusion.", 
    syntax: "brin_inclusion_consistent(internal, internal, internal)",
    arguments: [{ name: "internal", description: "Состояние.", example: "state" }],
    example: "-- Используется при поиске по индексу" 
  },
  { 
    id: "pg_brin_inclusion_opcinfo", 
    name: "brin_inclusion_opcinfo", 
    category: "Пользовательские функции", 
    description: "Информация о классе операторов для BRIN inclusion.", 
    syntax: "brin_inclusion_opcinfo(internal)",
    arguments: [{ name: "internal", description: "Тип.", example: "type" }],
    example: "-- Системная функция" 
  },
  { 
    id: "pg_brin_inclusion_union", 
    name: "brin_inclusion_union", 
    category: "Пользовательские функции", 
    description: "Объединяет два диапазона в BRIN-индексе inclusion.", 
    syntax: "brin_inclusion_union(internal, internal, internal)",
    arguments: [{ name: "internal", description: "Состояния.", example: "s1, s2" }],
    example: "-- Используется при агрегации диапазонов" 
  },
  { 
    id: "pg_brin_minmax_add_value", 
    name: "brin_minmax_add_value", 
    category: "Пользовательские функции", 
    description: "Добавляет значение в стандартный BRIN-индекс minmax.", 
    syntax: "brin_minmax_add_value(internal, internal, internal, internal)",
    arguments: [{ name: "internal", description: "Состояние.", example: "state" }],
    example: "-- Обновляет минимальное и максимальное значения в блоке" 
  },
  { 
    id: "pg_brin_minmax_consistent", 
    name: "brin_minmax_consistent", 
    category: "Пользовательские функции", 
    description: "Проверяет, попадает ли значение в диапазон min/max блока BRIN.", 
    syntax: "brin_minmax_consistent(internal, internal, internal)",
    arguments: [{ name: "internal", description: "Состояние.", example: "state" }],
    example: "-- Используется при фильтрации блоков" 
  },
  { 
    id: "pg_brin_minmax_multi_add_value", 
    name: "brin_minmax_multi_add_value", 
    category: "Пользовательские функции", 
    description: "Добавляет значение в BRIN-индекс minmax-multi (хранит несколько диапазонов).", 
    syntax: "brin_minmax_multi_add_value(internal, internal, internal, internal)",
    arguments: [{ name: "internal", description: "Состояние.", example: "state" }],
    example: "-- Поддерживает более точные границы для разреженных данных" 
  },
  { 
    id: "pg_brin_minmax_multi_consistent", 
    name: "brin_minmax_multi_consistent", 
    category: "Пользовательские функции", 
    description: "Проверяет соответствие значения нескольким диапазонам minmax-multi.", 
    syntax: "brin_minmax_multi_consistent(internal, internal, internal, integer)",
    arguments: [{ name: "internal", description: "Состояние.", example: "state" }],
    example: "-- Используется в расширенных BRIN-индексах" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_date", 
    name: "brin_minmax_multi_distance_date", 
    category: "Пользовательские функции", 
    description: "Вычисляет расстояние между датами для оптимизации minmax-multi.", 
    syntax: "brin_minmax_multi_distance_date(internal, internal)",
    arguments: [{ name: "date", description: "Значения дат.", example: "d1, d2" }],
    example: "-- Оценивает близость значений для группировки в диапазоны" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_float4", 
    name: "brin_minmax_multi_distance_float4", 
    category: "Пользовательские функции", 
    description: "Вычисляет расстояние между float4 для minmax-multi.", 
    syntax: "brin_minmax_multi_distance_float4(internal, internal)",
    arguments: [{ name: "float", description: "Числа.", example: "f1, f2" }],
    example: "-- Используется для построения компактных индексов" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_float8", 
    name: "brin_minmax_multi_distance_float8", 
    category: "Пользовательские функции", 
    description: "Вычисляет расстояние между float8 для minmax-multi.", 
    syntax: "brin_minmax_multi_distance_float8(internal, internal)",
    arguments: [{ name: "float", description: "Числа.", example: "f1, f2" }],
    example: "-- Внутренняя метрика индекса" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_inet", 
    name: "brin_minmax_multi_distance_inet", 
    category: "Пользовательские функции", 
    description: "Вычисляет расстояние между IP-адресами (inet) для minmax-multi.", 
    syntax: "brin_minmax_multi_distance_inet(internal, internal)",
    arguments: [{ name: "inet", description: "IP-адреса.", example: "i1, i2" }],
    example: "-- Помогает индексировать сетевые диапазоны" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_int2", 
    name: "brin_minmax_multi_distance_int2", 
    category: "Пользовательские функции", 
    description: "Вычисляет расстояние между int2 для minmax-multi.", 
    syntax: "brin_minmax_multi_distance_int2(internal, internal)",
    arguments: [{ name: "int", description: "Целые числа.", example: "n1, n2" }],
    example: "-- Используется для малых целых чисел" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_int4", 
    name: "brin_minmax_multi_distance_int4", 
    category: "Пользовательские функции", 
    description: "Вычисляет расстояние между int4 для minmax-multi.", 
    syntax: "brin_minmax_multi_distance_int4(internal, internal)",
    arguments: [{ name: "int", description: "Целые числа.", example: "n1, n2" }],
    example: "-- Стандартная метрика для integer" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_int8", 
    name: "brin_minmax_multi_distance_int8", 
    category: "Пользовательские функции", 
    description: "Вычисляет расстояние между int8 (bigint) для minmax-multi.", 
    syntax: "brin_minmax_multi_distance_int8(internal, internal)",
    arguments: [{ name: "int", description: "Большие целые числа.", example: "n1, n2" }],
    example: "-- Метрика для bigint" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_interval", 
    name: "brin_minmax_multi_distance_interval", 
    category: "Пользовательские функции", 
    description: "Вычисляет расстояние между интервалами времени для minmax-multi.", 
    syntax: "brin_minmax_multi_distance_interval(internal, internal)",
    arguments: [{ name: "interval", description: "Интервалы.", example: "v1, v2" }],
    example: "-- Группировка временных интервалов" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_macaddr", 
    name: "brin_minmax_multi_distance_macaddr", 
    category: "Пользовательские функции", 
    description: "Вычисляет расстояние между MAC-адресами для minmax-multi.", 
    syntax: "brin_minmax_multi_distance_macaddr(internal, internal)",
    arguments: [{ name: "macaddr", description: "MAC-адреса.", example: "m1, m2" }],
    example: "-- Позволяет эффективно индексировать MAC-адреса" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_macaddr8", 
    name: "brin_minmax_multi_distance_macaddr8", 
    category: "Пользовательские функции", 
    description: "Вычисляет расстояние между значениями macaddr8 для оптимизации индексов BRIN multi-range.", 
    syntax: "brin_minmax_multi_distance_macaddr8(internal, internal)",
    arguments: [
      { name: "arg1", description: "Первое значение macaddr8 (внутреннее представление).", example: "internal_val1" },
      { name: "arg2", description: "Второе значение macaddr8 (внутреннее представление).", example: "internal_val2" }
    ],
    example: "-- Внутренняя функция для поддержки BRIN индексов типа macaddr8" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_numeric", 
    name: "brin_minmax_multi_distance_numeric", 
    category: "Пользовательские функции", 
    description: "Вычисляет расстояние между числовыми значениями (numeric) для построения диапазонов в BRIN multi-range индексах.", 
    syntax: "brin_minmax_multi_distance_numeric(internal, internal)",
    arguments: [
      { name: "arg1", description: "Первое числовое значение (internal).", example: "internal_numeric1" },
      { name: "arg2", description: "Второе числовое значение (internal).", example: "internal_numeric2" }
    ],
    example: "-- Используется для оценки плотности данных типа numeric в BRIN" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_pg_lsn", 
    name: "brin_minmax_multi_distance_pg_lsn", 
    category: "Пользовательские функции", 
    description: "Определяет расстояние между позициями в логе транзакций (LSN) для оптимизации BRIN индексов.", 
    syntax: "brin_minmax_multi_distance_pg_lsn(internal, internal)",
    arguments: [
      { name: "arg1", description: "Первое значение pg_lsn.", example: "lsn_val1" },
      { name: "arg2", description: "Второе значение pg_lsn.", example: "lsn_val2" }
    ],
    example: "-- Помогает эффективно группировать диапазоны LSN в индексах" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_tid", 
    name: "brin_minmax_multi_distance_tid", 
    category: "Пользовательские функции", 
    description: "Вычисляет логическое расстояние между идентификаторами строк (TID) для BRIN multi-range.", 
    syntax: "brin_minmax_multi_distance_tid(internal, internal)",
    arguments: [
      { name: "arg1", description: "Первый идентификатор строки (TID).", example: "tid_val1" },
      { name: "arg2", description: "Второй идентификатор строки (TID).", example: "tid_val2" }
    ],
    example: "-- Внутренняя метрика для оптимизации хранения TID в BRIN" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_time", 
    name: "brin_minmax_multi_distance_time", 
    category: "Пользовательские функции", 
    description: "Вычисляет временную разницу между значениями типа time для формирования диапазонов в BRIN.", 
    syntax: "brin_minmax_multi_distance_time(internal, internal)",
    arguments: [
      { name: "arg1", description: "Первое значение времени (time).", example: "time_val1" },
      { name: "arg2", description: "Второе значение времени (time).", example: "time_val2" }
    ],
    example: "-- Используется для кластеризации временных данных в индексах" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_timestamp", 
    name: "brin_minmax_multi_distance_timestamp", 
    category: "Пользовательские функции", 
    description: "Вычисляет расстояние между значениями timestamp для BRIN multi-range.", 
    syntax: "brin_minmax_multi_distance_timestamp(internal, internal)",
    arguments: [
      { name: "arg1", description: "Первое значение метки времени.", example: "ts1" },
      { name: "arg2", description: "Второе значение метки времени.", example: "ts2" }
    ],
    example: "-- Оптимизация временных диапазонов в BRIN" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_timetz", 
    name: "brin_minmax_multi_distance_timetz", 
    category: "Пользовательские функции", 
    description: "Вычисляет расстояние между значениями timetz для BRIN multi-range.", 
    syntax: "brin_minmax_multi_distance_timetz(internal, internal)",
    arguments: [
      { name: "arg1", description: "Первое значение времени с часовым поясом.", example: "ttz1" },
      { name: "arg2", description: "Второе значение времени с часовым поясом.", example: "ttz2" }
    ],
    example: "-- Используется для кластеризации данных timetz" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_uuid", 
    name: "brin_minmax_multi_distance_uuid", 
    category: "Пользовательские функции", 
    description: "Вычисляет логическое расстояние между UUID для BRIN multi-range.", 
    syntax: "brin_minmax_multi_distance_uuid(internal, internal)",
    arguments: [
      { name: "arg1", description: "Первый UUID.", example: "u1" },
      { name: "arg2", description: "Второе UUID.", example: "u2" }
    ],
    example: "-- Группировка UUID в блоках индекса" 
  },
  { 
    id: "pg_brin_minmax_multi_opcinfo", 
    name: "brin_minmax_multi_opcinfo", 
    category: "Пользовательские функции", 
    description: "Возвращает информацию о классе операторов для BRIN multi-range.", 
    syntax: "brin_minmax_multi_opcinfo(internal)",
    arguments: [{ name: "internal", description: "Внутренний тип.", example: "type_info" }],
    example: "-- Системная функция поддержки индексов" 
  },
  { 
    id: "pg_brin_minmax_multi_options", 
    name: "brin_minmax_multi_options", 
    category: "Пользовательские функции", 
    description: "Обрабатывает параметры (options) для индекса BRIN multi-range.", 
    syntax: "brin_minmax_multi_options(internal)",
    arguments: [{ name: "internal", description: "Указатель на параметры.", example: "reloptions" }],
    example: "-- Вызывается при создании индекса с параметрами" 
  },
  { 
    id: "pg_brin_minmax_multi_summary_in", 
    name: "brin_minmax_multi_summary_in", 
    category: "Пользовательские функции", 
    description: "Функция ввода для сводки BRIN multi-range.", 
    syntax: "brin_minmax_multi_summary_in(cstring)",
    arguments: [{ name: "cstring", description: "Строковое представление сводки.", example: "'...'::cstring" }],
    example: "SELECT brin_minmax_multi_summary_in('...');" 
  },
  { 
    id: "pg_brin_minmax_multi_summary_out", 
    name: "brin_minmax_multi_summary_out", 
    category: "Пользовательские функции", 
    description: "Функция вывода для сводки BRIN multi-range.", 
    syntax: "brin_minmax_multi_summary_out(pg_brin_minmax_multi_summary)",
    arguments: [{ name: "summary", description: "Объект сводки.", example: "summary_data" }],
    example: "SELECT brin_minmax_multi_summary_out(summary);" 
  },
  { 
    id: "pg_brin_minmax_multi_summary_recv", 
    name: "brin_minmax_multi_summary_recv", 
    category: "Пользовательские функции", 
    description: "Прием сводки BRIN multi-range в двоичном формате.", 
    syntax: "brin_minmax_multi_summary_recv(internal)",
    arguments: [{ name: "internal", description: "Двоичный буфер.", example: "buf" }],
    example: "-- Внутреннее использование" 
  },
  {
    id: "pg_get_bit",
    name: "get_bit",
    category: "Пользовательские функции",
    description: "Извлекает бит из строки байтов (bytea) или битовой строки (bit).",
    syntax: "get_bit(bytea, bigint) | get_bit(bit, integer)",
    arguments: [
      { name: "string", description: "Исходная строка (bytea или bit).", example: "E'\\\\000'::bytea" },
      { name: "n", description: "Позиция бита (начиная с 0).", example: "1" }
    ],
    example: "SELECT get_bit(E'\\\\001'::bytea, 7);"
  },
  {
    id: "pg_get_byte",
    name: "get_byte",
    category: "Пользовательские функции",
    description: "Извлекает байт из строки байтов.",
    syntax: "get_byte(bytea, integer)",
    arguments: [
      { name: "string", description: "Строка байтов.", example: "E'\\\\001'::bytea" },
      { name: "offset", description: "Смещение байта.", example: "0" }
    ],
    example: "SELECT get_byte(E'\\\\001'::bytea, 0);"
  },
  {
    id: "pg_get_current_ts_config",
    name: "get_current_ts_config",
    category: "Пользовательские функции",
    description: "Возвращает OID текущей конфигурации полнотекстового поиска.",
    syntax: "get_current_ts_config()",
    arguments: [],
    example: "SELECT get_current_ts_config();"
  },
  {
    id: "pg_getdatabaseencoding",
    name: "getdatabaseencoding",
    category: "Пользовательские функции",
    description: "Возвращает название кодировки текущей базы данных.",
    syntax: "getdatabaseencoding()",
    arguments: [],
    example: "SELECT getdatabaseencoding();"
  },
  {
    id: "pg_getpgusername",
    name: "getpgusername",
    category: "Пользовательские функции",
    description: "Возвращает имя текущего пользователя базы данных.",
    syntax: "getpgusername()",
    arguments: [],
    example: "SELECT getpgusername();"
  },
  {
    id: "pg_gin_clean_pending_list",
    name: "gin_clean_pending_list",
    category: "Пользовательские функции",
    description: "Очищает список ожидающих записей GIN-индекса, перемещая их в основную структуру.",
    syntax: "gin_clean_pending_list(regclass)",
    arguments: [{ name: "index", description: "Имя или OID GIN-индекса.", example: "'my_gin_idx'::regclass" }],
    example: "SELECT gin_clean_pending_list('my_idx');"
  },
  {
    id: "pg_gin_cmp_prefix",
    name: "gin_cmp_prefix",
    category: "Пользовательские функции",
    description: "Функция сравнения префиксов для GIN-индексов.",
    syntax: "gin_cmp_prefix(text, text, smallint, internal)",
    arguments: [
      { name: "prefix", description: "Префикс для поиска.", example: "'pre'" },
      { name: "entry", description: "Запись в индексе.", example: "'prefix'" }
    ],
    example: "-- Используется механизмом GIN"
  },
  {
    id: "pg_gin_cmp_tslexeme",
    name: "gin_cmp_tslexeme",
    category: "Пользовательские функции",
    description: "Сравнение лексем в GIN-индексе для полнотекстового поиска.",
    syntax: "gin_cmp_tslexeme(text, text)",
    arguments: [
      { name: "lex1", description: "Первая лексема.", example: "'cat'" },
      { name: "lex2", description: "Вторая лексема.", example: "'dog'" }
    ],
    example: "SELECT gin_cmp_tslexeme('a', 'b');"
  },
  {
    id: "pg_gin_compare_jsonb",
    name: "gin_compare_jsonb",
    category: "Пользовательские функции",
    description: "Сравнение элементов jsonb для GIN-индекса.",
    syntax: "gin_compare_jsonb(text, text)",
    arguments: [{ name: "internal", description: "Внутренние ключи jsonb.", example: "..." }],
    example: "-- Системная функция для jsonb_ops"
  },
  {
    id: "pg_gin_consistent_jsonb",
    name: "gin_consistent_jsonb",
    category: "Пользовательские функции",
    description: "Проверка соответствия ключей jsonb условию запроса в GIN.",
    syntax: "gin_consistent_jsonb(internal, smallint, jsonb, integer, internal, internal, internal, internal)",
    arguments: [{ name: "check", description: "Массив состояний соответствия ключей.", example: "check_array" }],
    example: "-- Используется при выполнении запросов к jsonb"
  },
  {
    id: "pg_gin_consistent_jsonb_path",
    name: "gin_consistent_jsonb_path",
    category: "Пользовательские функции",
    description: "Проверка соответствия путей jsonb (jsonb_path_ops) в GIN.",
    syntax: "gin_consistent_jsonb_path(internal, smallint, jsonb, integer, internal, internal, internal, internal)",
    arguments: [{ name: "check", description: "Состояния ключей пути.", example: "check_array" }],
    example: "-- Оптимизация поиска по путям в jsonb"
  },
  {
    id: "pg_gin_extract_jsonb",
    name: "gin_extract_jsonb",
    category: "Пользовательские функции",
    description: "Извлекает ключи из jsonb для индексации в GIN.",
    syntax: "gin_extract_jsonb(jsonb, internal, internal)",
    arguments: [{ name: "item", description: "Объект jsonb.", example: "'{\"a\":1}'::jsonb" }],
    example: "-- Вызывается при построении индекса"
  },
  {
    id: "pg_gin_extract_jsonb_path",
    name: "gin_extract_jsonb_path",
    category: "Пользовательские функции",
    description: "Извлекает хэшированные пути из jsonb для jsonb_path_ops.",
    syntax: "gin_extract_jsonb_path(jsonb, internal, internal)",
    arguments: [{ name: "item", description: "Объект jsonb.", example: "'{\"a\":1}'::jsonb" }],
    example: "-- Оптимизировано для операторов @>"
  },
  {
    id: "pg_gin_extract_jsonb_query",
    name: "gin_extract_jsonb_query",
    category: "Пользовательские функции",
    description: "Извлекает ключи из поискового запроса к jsonb для GIN.",
    syntax: "gin_extract_jsonb_query(jsonb, internal, smallint, internal, internal, internal, internal)",
    arguments: [{ name: "query", description: "Запрос jsonb.", example: "'{\"a\":1}'::jsonb" }],
    example: "-- Используется при планировании поиска"
  },
  {
    id: "pg_gin_extract_jsonb_query_path",
    name: "gin_extract_jsonb_query_path",
    category: "Пользовательские функции",
    description: "Извлекает пути из поискового запроса к jsonb для jsonb_path_ops.",
    syntax: "gin_extract_jsonb_query_path(jsonb, internal, smallint, internal, internal, internal, internal)",
    arguments: [{ name: "query", description: "Запрос jsonb.", example: "'{\"a\":1}'::jsonb" }],
    example: "-- Поддержка эффективного поиска по путям"
  },
  {
    id: "pg_gin_extract_tsquery",
    name: "gin_extract_tsquery",
    category: "Пользовательские функции",
    description: "Извлекает лексемы из tsquery или tsvector для поиска в GIN.",
    syntax: "gin_extract_tsquery(query, ...)",
    arguments: [{ name: "query", description: "Поисковый запрос.", example: "to_tsquery('english', 'cat')" }],
    example: "-- Используется в полнотекстовом поиске"
  },
  {
    id: "pg_gin_extract_tsvector",
    name: "gin_extract_tsvector",
    category: "Пользовательские функции",
    description: "Извлекает лексемы из tsvector для индексации в GIN.",
    syntax: "gin_extract_tsvector(tsvector, ...)",
    arguments: [{ name: "vector", description: "Текстовый вектор.", example: "to_tsvector('hello world')" }],
    example: "-- Формирует список ключей индекса"
  },
  {
    id: "pg_gin_triconsistent_jsonb",
    name: "gin_triconsistent_jsonb",
    category: "Пользовательские функции",
    description: "Трехзначная логика проверки соответствия jsonb в GIN (MAYBE/YES/NO).",
    syntax: "gin_triconsistent_jsonb(internal, smallint, jsonb, integer, internal, internal, internal)",
    arguments: [{ name: "check", description: "Состояния ключей.", example: "check_array" }],
    example: "-- Оптимизация для больших наборов данных"
  },
  {
    id: "pg_gin_triconsistent_jsonb_path",
    name: "gin_triconsistent_jsonb_path",
    category: "Пользовательские функции",
    description: "Трехзначная логика для путей jsonb в GIN.",
    syntax: "gin_triconsistent_jsonb_path(internal, smallint, jsonb, integer, internal, internal, internal)",
    arguments: [{ name: "check", description: "Состояния путей.", example: "check_array" }],
    example: "-- Ускоряет фильтрацию по путям"
  },
  {
    id: "pg_gin_tsquery_consistent",
    name: "gin_tsquery_consistent",
    category: "Пользовательские функции",
    description: "Проверка соответствия текстового запроса вектору в GIN.",
    syntax: "gin_tsquery_consistent(internal, smallint, tsquery, integer, internal, internal, internal, internal)",
    arguments: [{ name: "check", description: "Результаты проверки лексем.", example: "check_array" }],
    example: "-- Ядро полнотекстового поиска GIN"
  },
  {
    id: "pg_gin_tsquery_triconsistent",
    name: "gin_tsquery_triconsistent",
    category: "Пользовательские функции",
    description: "Трехзначная логика для полнотекстового поиска в GIN.",
    syntax: "gin_tsquery_triconsistent(internal, smallint, tsvector, integer, internal, internal, internal)",
    arguments: [{ name: "check", description: "Состояния лексем.", example: "check_array" }],
    example: "-- Позволяет избежать полных сканирований"
  },
  {
    id: "pg_ginarrayconsistent",
    name: "ginarrayconsistent",
    category: "Пользовательские функции",
    description: "Проверяет соответствие элементов массива условию запроса в GIN.",
    syntax: "ginarrayconsistent(internal, smallint, anyarray, integer, internal, internal, internal, internal)",
    arguments: [{ name: "check", description: "Состояния элементов.", example: "check_array" }],
    example: "-- Поддержка операторов &&, @>, <@"
  },
  {
    id: "pg_ginarrayextract",
    name: "ginarrayextract",
    category: "Пользовательские функции",
    description: "Извлекает элементы из массива для индексации в GIN.",
    syntax: "ginarrayextract(anyarray, internal, internal)",
    arguments: [{ name: "array", description: "Исходный массив.", example: "ARRAY[1,2,3]" }],
    example: "-- Формирует ключи индекса для массивов"
  },
  {
    id: "pg_ginarraytriconsistent",
    name: "ginarraytriconsistent",
    category: "Пользовательские функции",
    description: "Трехзначная логика для массивов в GIN.",
    syntax: "ginarraytriconsistent(internal, smallint, anyarray, integer, internal, internal, internal)",
    arguments: [{ name: "check", description: "Состояния элементов.", example: "check_array" }],
    example: "-- Оптимизация поиска в больших массивах"
  },
  {
    id: "pg_ginhandler",
    name: "ginhandler",
    category: "Пользовательские функции",
    description: "Обработчик метода доступа GIN.",
    syntax: "ginhandler(internal)",
    arguments: [{ name: "internal", description: "Внутренние параметры.", example: "..." }],
    example: "-- Системная функция регистрации GIN"
  },
  {
    id: "pg_ginqueryarrayextract",
    name: "ginqueryarrayextract",
    category: "Пользовательские функции",
    description: "Извлекает элементы из поискового запроса к массиву для GIN.",
    syntax: "ginqueryarrayextract(anyarray, internal, smallint, internal, internal, internal, internal)",
    arguments: [{ name: "query", description: "Запрос (массив).", example: "ARRAY[1,2]" }],
    example: "-- Подготовка ключей для поиска в массивах"
  },
  {
    id: "pg_gist_box_consistent",
    name: "gist_box_consistent",
    category: "Пользовательские функции",
    description: "Проверяет соответствие прямоугольника (box) условию запроса в GiST.",
    syntax: "gist_box_consistent(internal, box, smallint, oid, internal)",
    arguments: [{ name: "box", description: "Прямоугольник.", example: "'(0,0),(1,1)'::box" }],
    example: "-- Геометрический поиск в GiST"
  },
  {
    id: "pg_gist_box_distance",
    name: "gist_box_distance",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между прямоугольниками для поиска ближайших соседей (KNN) в GiST.",
    syntax: "gist_box_distance(internal, box, smallint, oid, internal)",
    arguments: [{ name: "box", description: "Целевой прямоугольник.", example: "'(0,0),(1,1)'::box" }],
    example: "-- Используется в ORDER BY <-> "
  },
  {
    id: "pg_gist_box_penalty",
    name: "gist_box_penalty",
    category: "Пользовательские функции",
    description: "Вычисляет штраф за включение прямоугольника в узел GiST (увеличение площади).",
    syntax: "gist_box_penalty(internal, internal, internal)",
    arguments: [{ name: "entry", description: "Запись индекса.", example: "..." }],
    example: "-- Определяет оптимальное место для новой записи"
  },
  {
    id: "pg_gist_box_picksplit",
    name: "gist_box_picksplit",
    category: "Пользовательские функции",
    description: "Разделяет набор прямоугольников на две группы при переполнении страницы GiST.",
    syntax: "gist_box_picksplit(internal, internal)",
    arguments: [{ name: "entryvec", description: "Вектор записей.", example: "..." }],
    example: "-- Балансировка дерева GiST"
  },
  {
    id: "pg_gist_box_same",
    name: "gist_box_same",
    category: "Пользовательские функции",
    description: "Проверяет идентичность двух прямоугольников для GiST.",
    syntax: "gist_box_same(box, box, internal)",
    arguments: [
      { name: "b1", description: "Первый прямоугольник.", example: "'(0,0),(1,1)'" },
      { name: "b2", description: "Второй прямоугольник.", example: "'(0,0),(1,1)'" }
    ],
    example: "SELECT gist_box_same('(0,0),(1,1)'::box, '(0,0),(1,1)'::box, NULL);"
  },
  {
    id: "pg_gist_box_union",
    name: "gist_box_union",
    category: "Пользовательские функции",
    description: "Вычисляет объединяющий прямоугольник (bounding box) для набора записей GiST.",
    syntax: "gist_box_union(internal, internal)",
    arguments: [{ name: "entryvec", description: "Вектор записей.", example: "..." }],
    example: "-- Формирует охватывающую границу узла"
  },
  {
    id: "pg_gist_circle_compress",
    name: "gist_circle_compress",
    category: "Пользовательские функции",
    description: "Сжимает окружность (circle) в прямоугольник (box) для хранения в GiST.",
    syntax: "gist_circle_compress(internal)",
    arguments: [{ name: "entry", description: "Запись окружности.", example: "..." }],
    example: "-- Используется для индексации кругов через MBR"
  },
  {
    id: "pg_gist_circle_consistent",
    name: "gist_circle_consistent",
    category: "Пользовательские функции",
    description: "Проверяет соответствие окружности условию запроса в GiST.",
    syntax: "gist_circle_consistent(internal, circle, smallint, oid, internal)",
    arguments: [{ name: "circle", description: "Окружность.", example: "'<(0,0),5>'::circle" }],
    example: "-- Поиск пересекающихся или вложенных окружностей"
  },
  {
    id: "pg_gist_circle_distance",
    name: "gist_circle_distance",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между окружностями для KNN поиска в GiST.",
    syntax: "gist_circle_distance(internal, circle, smallint, oid, internal)",
    arguments: [{ name: "circle", description: "Окружность.", example: "'<(0,0),5>'::circle" }],
    example: "-- Поддержка ORDER BY <-> для окружностей"
  },
  {
    id: "pg_gist_point_compress",
    name: "gist_point_compress",
    category: "Пользовательские функции",
    description: "Подготавливает точку (point) для хранения в GiST.",
    syntax: "gist_point_compress(internal)",
    arguments: [{ name: "entry", description: "Запись точки.", example: "..." }],
    example: "-- Внутренняя обработка точек в GiST"
  },
  {
    id: "pg_gist_point_consistent",
    name: "gist_point_consistent",
    category: "Пользовательские функции",
    description: "Проверка соответствия точки условию запроса в GiST.",
    syntax: "gist_point_consistent(internal)",
    arguments: [{ name: "internal", description: "Внутреннее состояние.", example: "..." }],
    example: "-- Базовая функция поиска точек"
  },
  {
    id: "pg_diagonal",
    name: "diagonal",
    category: "Пользовательские функции",
    description: "Вычисляет длину диагонали прямоугольника (тип box).",
    syntax: "diagonal(box)",
    arguments: [{ name: "box", description: "Прямоугольник.", example: "'(10,10),(0,0)'::box" }],
    example: "SELECT diagonal('(10,10),(0,0)'::box);"
  },
  {
    id: "pg_diameter",
    name: "diameter",
    category: "Пользовательские функции",
    description: "Возвращает диаметр круга (тип circle).",
    syntax: "diameter(circle)",
    arguments: [{ name: "circle", description: "Круг.", example: "'<(5,5),2>'::circle" }],
    example: "SELECT diameter('<(5,5),2>'::circle);"
  },
  {
    id: "pg_dispell_init",
    name: "dispell_init",
    category: "Пользовательские функции",
    description: "Внутренняя функция инициализации для словаря ISpell.",
    syntax: "dispell_init(internal)",
    arguments: [{ name: "internal", description: "Внутреннее состояние.", example: "..." }],
    example: "-- Используется при настройке полнотекстового поиска"
  },
  {
    id: "pg_dispell_lexize",
    name: "dispell_lexize",
    category: "Пользовательские функции",
    description: "Функция лексического анализа для словаря ISpell.",
    syntax: "dispell_lexize(internal, internal, internal, internal)",
    arguments: [
      { name: "dict", description: "Указатель на словарь.", example: "internal" },
      { name: "token", description: "Токен для анализа.", example: "internal" }
    ],
    example: "-- Вызывается механизмом FTS"
  },
  {
    id: "pg_dist_bp",
    name: "dist_bp",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между прямоугольником и точкой.",
    syntax: "dist_bp(box, point)",
    arguments: [
      { name: "box", description: "Прямоугольник.", example: "'(2,2),(0,0)'::box" },
      { name: "point", description: "Точка.", example: "'(3,3)'::point" }
    ],
    example: "SELECT dist_bp('(2,2),(0,0)'::box, '(3,3)'::point);"
  },
  {
    id: "pg_dist_bs",
    name: "dist_bs",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между прямоугольником и отрезком.",
    syntax: "dist_bs(box, lseg)",
    arguments: [
      { name: "box", description: "Прямоугольник.", example: "'(2,2),(0,0)'::box" },
      { name: "lseg", description: "Отрезок.", example: "'[(3,3),(4,4)]'::lseg" }
    ],
    example: "SELECT dist_bs('(2,2),(0,0)'::box, '[(3,3),(4,4)]'::lseg);"
  },
  {
    id: "pg_dist_cpoint",
    name: "dist_cpoint",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между окружностью и точкой.",
    syntax: "dist_cpoint(circle, point)",
    arguments: [
      { name: "circle", description: "Окружность.", example: "'<(0,0),1>'::circle" },
      { name: "point", description: "Точка.", example: "'(2,2)'::point" }
    ],
    example: "SELECT dist_cpoint('<(0,0),1>'::circle, '(2,2)'::point);"
  },
  {
    id: "pg_dist_cpoly",
    name: "dist_cpoly",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между окружностью и многоугольником.",
    syntax: "dist_cpoly(circle, polygon)",
    arguments: [
      { name: "circle", description: "Окружность.", example: "'<(0,0),1>'::circle" },
      { name: "polygon", description: "Многоугольник.", example: "'((2,2),(3,2),(2,3))'::polygon" }
    ],
    example: "SELECT dist_cpoly('<(0,0),1>'::circle, '((2,2),(3,2),(2,3))'::polygon);"
  },
  {
    id: "pg_dist_lp",
    name: "dist_lp",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между бесконечной прямой и точкой.",
    syntax: "dist_lp(line, point)",
    arguments: [
      { name: "line", description: "Прямая.", example: "'{1,-1,0}'::line" },
      { name: "point", description: "Точка.", example: "'(1,2)'::point" }
    ],
    example: "SELECT dist_lp('{1,-1,0}'::line, '(1,2)'::point);"
  },
  {
    id: "pg_dist_ls",
    name: "dist_ls",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между бесконечной прямой и отрезком.",
    syntax: "dist_ls(line, lseg)",
    arguments: [
      { name: "line", description: "Прямая.", example: "'{1,-1,0}'::line" },
      { name: "lseg", description: "Отрезок.", example: "'[(1,2),(3,4)]'::lseg" }
    ],
    example: "SELECT dist_ls('{1,-1,0}'::line, '[(1,2),(3,4)]'::lseg);"
  },
  {
    id: "pg_dist_pathp",
    name: "dist_pathp",
    category: "Пользовательские функции",
    description: "Вычисляет кратчайшее расстояние между контуром (path) и точкой.",
    syntax: "dist_pathp(path, point)",
    arguments: [
      { name: "path", description: "Контур (замкнутый или разомкнутый).", example: "'((0,0),(1,1),(2,0))'::path" },
      { name: "point", description: "Точка.", example: "'(1,0)'::point" }
    ],
    example: "SELECT dist_pathp('((0,0),(1,1),(2,0))'::path, '(1,0)'::point);"
  },
  {
    id: "pg_dist_pb",
    name: "dist_pb",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между точкой и прямоугольником.",
    syntax: "dist_pb(point, box)",
    arguments: [
      { name: "point", description: "Точка.", example: "'(3,3)'::point" },
      { name: "box", description: "Прямоугольник.", example: "'(2,2),(0,0)'::box" }
    ],
    example: "SELECT dist_pb('(3,3)'::point, '(2,2),(0,0)'::box);"
  },
  {
    id: "pg_dist_pc",
    name: "dist_pc",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между точкой и окружностью.",
    syntax: "dist_pc(point, circle)",
    arguments: [
      { name: "point", description: "Точка.", example: "'(2,2)'::point" },
      { name: "circle", description: "Окружность.", example: "'<(0,0),1>'::circle" }
    ],
    example: "SELECT dist_pc('(2,2)'::point, '<(0,0),1>'::circle);"
  },
  {
    id: "pg_dist_pl",
    name: "dist_pl",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между точкой и бесконечной прямой.",
    syntax: "dist_pl(point, line)",
    arguments: [
      { name: "point", description: "Точка.", example: "'(1,2)'::point" },
      { name: "line", description: "Прямая.", example: "'{1,-1,0}'::line" }
    ],
    example: "SELECT dist_pl('(1,2)'::point, '{1,-1,0}'::line);"
  },
  {
    id: "pg_dist_polyc",
    name: "dist_polyc",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между многоугольником и окружностью.",
    syntax: "dist_polyc(polygon, circle)",
    arguments: [
      { name: "polygon", description: "Многоугольник.", example: "'((2,2),(3,2),(2,3))'::polygon" },
      { name: "circle", description: "Окружность.", example: "'<(0,0),1>'::circle" }
    ],
    example: "SELECT dist_polyc('((2,2),(3,2),(2,3))'::polygon, '<(0,0),1>'::circle);"
  },
  {
    id: "pg_dist_polyp",
    name: "dist_polyp",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между многоугольником и точкой.",
    syntax: "dist_polyp(polygon, point)",
    arguments: [
      { name: "polygon", description: "Многоугольник.", example: "'((0,0),(2,0),(1,1))'::polygon" },
      { name: "point", description: "Точка.", example: "'(3,3)'::point" }
    ],
    example: "SELECT dist_polyp('((0,0),(2,0),(1,1))'::polygon, '(3,3)'::point);"
  },
  {
    id: "pg_dist_ppath",
    name: "dist_ppath",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между точкой и контуром.",
    syntax: "dist_ppath(point, path)",
    arguments: [
      { name: "point", description: "Точка.", example: "'(1,0)'::point" },
      { name: "path", description: "Контур.", example: "'((0,0),(1,1),(2,0))'::path" }
    ],
    example: "SELECT dist_ppath('(1,0)'::point, '((0,0),(1,1),(2,0))'::path);"
  },
  {
    id: "pg_dist_ppoly",
    name: "dist_ppoly",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между точкой и многоугольником.",
    syntax: "dist_ppoly(point, polygon)",
    arguments: [
      { name: "point", description: "Точка.", example: "'(3,3)'::point" },
      { name: "polygon", description: "Многоугольник.", example: "'((0,0),(2,0),(1,1))'::polygon" }
    ],
    example: "SELECT dist_ppoly('(3,3)'::point, '((0,0),(2,0),(1,1))'::polygon);"
  },
  {
    id: "pg_dist_ps",
    name: "dist_ps",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между точкой и отрезком.",
    syntax: "dist_ps(point, lseg)",
    arguments: [
      { name: "point", description: "Точка.", example: "'(2,2)'::point" },
      { name: "lseg", description: "Отрезок.", example: "'[(0,0),(1,1)]'::lseg" }
    ],
    example: "SELECT dist_ps('(2,2)'::point, '[(0,0),(1,1)]'::lseg);"
  },
  {
    id: "pg_dist_sb",
    name: "dist_sb",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между отрезком и прямоугольником.",
    syntax: "dist_sb(lseg, box)",
    arguments: [
      { name: "lseg", description: "Отрезок.", example: "'[(3,3),(4,4)]'::lseg" },
      { name: "box", description: "Прямоугольник.", example: "'(2,2),(0,0)'::box" }
    ],
    example: "SELECT dist_sb('[(3,3),(4,4)]'::lseg, '(2,2),(0,0)'::box);"
  },
  {
    id: "pg_dist_sl",
    name: "dist_sl",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между отрезком и бесконечной прямой.",
    syntax: "dist_sl(lseg, line)",
    arguments: [
      { name: "lseg", description: "Отрезок.", example: "'[(1,2),(3,4)]'::lseg" },
      { name: "line", description: "Прямая.", example: "'{1,-1,0}'::line" }
    ],
    example: "SELECT dist_sl('[(1,2),(3,4)]'::lseg, '{1,-1,0}'::line);"
  },
  {
    id: "pg_dist_sp",
    name: "dist_sp",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между отрезком и точкой.",
    syntax: "dist_sp(lseg, point)",
    arguments: [
      { name: "lseg", description: "Отрезок.", example: "'[(0,0),(1,1)]'::lseg" },
      { name: "point", description: "Точка.", example: "'(2,2)'::point" }
    ],
    example: "SELECT dist_sp('[(0,0),(1,1)]'::lseg, '(2,2)'::point);"
  },
  {
    id: "pg_div",
    name: "div",
    category: "Пользовательские функции",
    description: "Возвращает целочисленный результат деления.",
    syntax: "div(numeric, numeric)",
    arguments: [
      { name: "y", description: "Делимое.", example: "25" },
      { name: "x", description: "Делитель.", example: "4" }
    ],
    example: "SELECT div(25, 4); -- Результат: 6"
  },
  {
    id: "pg_dlog1",
    name: "dlog1",
    category: "Пользовательские функции",
    description: "Внутренняя реализация натурального логарифма (ln) для double precision.",
    syntax: "dlog1(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "10.0" }],
    example: "SELECT dlog1(10.0);"
  },
  {
    id: "pg_dlog10",
    name: "dlog10",
    category: "Пользовательские функции",
    description: "Внутренняя реализация десятичного логарифма (log10) для double precision.",
    syntax: "dlog10(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "100.0" }],
    example: "SELECT dlog10(100.0);"
  },
  {
    id: "pg_domain_in",
    name: "domain_in",
    category: "Пользовательские функции",
    description: "Функция ввода для типов данных на базе доменов.",
    syntax: "domain_in(cstring, oid, integer)",
    arguments: [
      { name: "input", description: "Строковое представление значения.", example: "'value'::cstring" },
      { name: "type_oid", description: "OID базового типа.", example: "23" },
      { name: "typmod", description: "Модификатор типа.", example: "-1" }
    ],
    example: "-- Внутренняя функция для обработки доменов"
  },
  {
    id: "pg_domain_recv",
    name: "domain_recv",
    category: "Пользовательские функции",
    description: "Функция приема двоичных данных для типов на базе доменов.",
    syntax: "domain_recv(internal, oid, integer)",
    arguments: [
      { name: "buf", description: "Двоичный буфер.", example: "internal" },
      { name: "type_oid", description: "OID базового типа.", example: "23" },
      { name: "typmod", description: "Модификатор типа.", example: "-1" }
    ],
    example: "-- Используется при передаче данных в двоичном формате"
  },
  {
    id: "pg_dpow",
    name: "dpow",
    category: "Пользовательские функции",
    description: "Возводит число в степень (double precision).",
    syntax: "dpow(double precision, double precision)",
    arguments: [
      { name: "base", description: "Основание.", example: "2.0" },
      { name: "exp", description: "Показатель степени.", example: "3.0" }
    ],
    example: "SELECT dpow(2.0, 3.0); -- Результат: 8.0"
  },
  {
    id: "pg_dround",
    name: "dround",
    category: "Пользовательские функции",
    description: "Округляет число до ближайшего целого (double precision).",
    syntax: "dround(double precision)",
    arguments: [{ name: "x", description: "Число для округления.", example: "42.6" }],
    example: "SELECT dround(42.6); -- Результат: 43.0"
  },
  {
    id: "pg_dsimple_init",
    name: "dsimple_init",
    category: "Пользовательские функции",
    description: "Инициализация простого словаря (simple dictionary) для полнотекстового поиска.",
    syntax: "dsimple_init(internal)",
    arguments: [{ name: "internal", description: "Внутреннее состояние.", example: "..." }],
    example: "-- Используется в конфигурациях FTS"
  },
  {
    id: "pg_dsimple_lexize",
    name: "dsimple_lexize",
    category: "Пользовательские функции",
    description: "Лексический анализ для простого словаря (simple dictionary).",
    syntax: "dsimple_lexize(internal, internal, internal, internal)",
    arguments: [
      { name: "dict", description: "Указатель на словарь.", example: "internal" },
      { name: "token", description: "Токен.", example: "internal" }
    ],
    example: "-- Выполняет поиск стоп-слов в простом словаре"
  },
  {
    id: "pg_dsnowball_init",
    name: "dsnowball_init",
    category: "Пользовательские функции",
    description: "Инициализация словаря Snowball (стеммер) для полнотекстового поиска.",
    syntax: "dsnowball_init(internal)",
    arguments: [{ name: "internal", description: "Внутреннее состояние.", example: "..." }],
    example: "-- Поддержка многоязычного стемминга"
  },
  {
    id: "pg_dsnowball_lexize",
    name: "dsnowball_lexize",
    category: "Пользовательские функции",
    description: "Лексический анализ (стемминг) для словаря Snowball.",
    syntax: "dsnowball_lexize(internal, internal, internal, internal)",
    arguments: [
      { name: "dict", description: "Указатель на словарь.", example: "internal" },
      { name: "token", description: "Слово для обработки.", example: "internal" }
    ],
    example: "-- Извлекает корень слова (стем)"
  },
  {
    id: "pg_dsqrt",
    name: "dsqrt",
    category: "Пользовательские функции",
    description: "Вычисляет квадратный корень (double precision).",
    syntax: "dsqrt(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "16.0" }],
    example: "SELECT dsqrt(16.0); -- Результат: 4.0"
  },
  {
    id: "pg_dsynonym_init",
    name: "dsynonym_init",
    category: "Пользовательские функции",
    description: "Инициализация словаря синонимов для полнотекстового поиска.",
    syntax: "dsynonym_init(internal)",
    arguments: [{ name: "internal", description: "Внутреннее состояние.", example: "..." }],
    example: "-- Загрузка файла синонимов"
  },
  {
    id: "pg_dsynonym_lexize",
    name: "dsynonym_lexize",
    category: "Пользовательские функции",
    description: "Лексический анализ для словаря синонимов.",
    syntax: "dsynonym_lexize(internal, internal, internal, internal)",
    arguments: [
      { name: "dict", description: "Указатель на словарь.", example: "internal" },
      { name: "token", description: "Слово для поиска синонима.", example: "internal" }
    ],
    example: "-- Заменяет слово его синонимом"
  },
  {
    id: "pg_dtrunc",
    name: "dtrunc",
    category: "Пользовательские функции",
    description: "Усекает число, отбрасывая дробную часть (double precision).",
    syntax: "dtrunc(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "42.9" }],
    example: "SELECT dtrunc(42.9); -- Результат: 42.0"
  },
  {
    id: "pg_elem_contained_by_multirange",
    name: "elem_contained_by_multirange",
    category: "Пользовательские функции",
    description: "Проверяет, содержится ли элемент в мультидиапазоне.",
    syntax: "elem_contained_by_multirange(anyelement, anymultirange)",
    arguments: [
      { name: "element", description: "Элемент (например, число или дата).", example: "5" },
      { name: "multirange", description: "Мультидиапазон.", example: "'{[1,10]}'::int4multirange" }
    ],
    example: "SELECT elem_contained_by_multirange(5, '{[1,10]}'::int4multirange);"
  },
  {
    id: "pg_elem_contained_by_range",
    name: "elem_contained_by_range",
    category: "Пользовательские функции",
    description: "Проверяет, содержится ли элемент в заданном диапазоне.",
    syntax: "elem_contained_by_range(anyelement, anyrange)",
    arguments: [
      { name: "element", description: "Элемент.", example: "5" },
      { name: "range", description: "Диапазон.", example: "'[1,10]'::int4range" }
    ],
    example: "SELECT elem_contained_by_range(5, '[1,10]'::int4range);"
  },
  {
    id: "pg_elem_contained_by_range_support",
    name: "elem_contained_by_range_support",
    category: "Пользовательские функции",
    description: "Внутренняя функция поддержки для планировщика при проверке вхождения элемента в диапазон.",
    syntax: "elem_contained_by_range_support(internal)",
    arguments: [{ name: "internal", description: "Внутренний контекст планировщика.", example: "..." }],
    example: "-- Используется оптимизатором запросов"
  },
  {
    id: "pg_encode",
    name: "encode",
    category: "Пользовательские функции",
    description: "Кодирует двоичные данные (bytea) в текстовое представление (hex, escape, base64).",
    syntax: "encode(data bytea, format text)",
    arguments: [
      { name: "data", description: "Двоичные данные.", example: "E'\\\\000'::bytea" },
      { name: "format", description: "Формат кодирования (hex, escape, base64).", example: "'base64'" }
    ],
    example: "SELECT encode(E'abc'::bytea, 'base64');"
  },
  {
    id: "pg_enum_cmp",
    name: "enum_cmp",
    category: "Пользовательские функции",
    description: "Сравнивает два значения перечислимого типа (возвращает -1, 0 или 1).",
    syntax: "enum_cmp(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение enum.", example: "'val1'::my_enum" },
      { name: "arg2", description: "Второе значение enum.", example: "'val2'::my_enum" }
    ],
    example: "SELECT enum_cmp('a'::my_enum, 'b'::my_enum);"
  },
  {
    id: "pg_enum_eq",
    name: "enum_eq",
    category: "Пользовательские функции",
    description: "Проверяет равенство двух значений перечислимого типа.",
    syntax: "enum_eq(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'val1'::my_enum" },
      { name: "arg2", description: "Второе значение.", example: "'val1'::my_enum" }
    ],
    example: "SELECT enum_eq('val1'::my_enum, 'val1'::my_enum);"
  },
  {
    id: "pg_enum_ge",
    name: "enum_ge",
    category: "Пользовательские функции",
    description: "Оператор 'больше или равно' для перечислимых типов.",
    syntax: "enum_ge(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'b'::my_enum" },
      { name: "arg2", description: "Второе значение.", example: "'a'::my_enum" }
    ],
    example: "SELECT enum_ge('b'::my_enum, 'a'::my_enum);"
  },
  {
    id: "pg_enum_gt",
    name: "enum_gt",
    category: "Пользовательские функции",
    description: "Оператор 'больше' для перечислимых типов.",
    syntax: "enum_gt(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'b'::my_enum" },
      { name: "arg2", description: "Второе значение.", example: "'a'::my_enum" }
    ],
    example: "SELECT enum_gt('b'::my_enum, 'a'::my_enum);"
  },
  {
    id: "pg_enum_in",
    name: "enum_in",
    category: "Пользовательские функции",
    description: "Функция ввода для перечислимых типов (преобразует строку в значение enum).",
    syntax: "enum_in(cstring, oid)",
    arguments: [
      { name: "input", description: "Строковое имя значения.", example: "'my_val'::cstring" },
      { name: "type_oid", description: "OID типа enum.", example: "12345" }
    ],
    example: "-- Внутренняя функция преобразования"
  },
  {
    id: "pg_enum_larger",
    name: "enum_larger",
    category: "Пользовательские функции",
    description: "Возвращает большее из двух значений перечислимого типа.",
    syntax: "enum_larger(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'a'::my_enum" },
      { name: "arg2", description: "Второе значение.", example: "'b'::my_enum" }
    ],
    example: "SELECT enum_larger('a'::my_enum, 'b'::my_enum);"
  },
  {
    id: "pg_enum_le",
    name: "enum_le",
    category: "Пользовательские функции",
    description: "Оператор 'меньше или равно' для перечислимых типов.",
    syntax: "enum_le(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'a'::my_enum" },
      { name: "arg2", description: "Второе значение.", example: "'b'::my_enum" }
    ],
    example: "SELECT enum_le('a'::my_enum, 'b'::my_enum);"
  },
  {
    id: "pg_enum_lt",
    name: "enum_lt",
    category: "Пользовательские функции",
    description: "Оператор 'меньше' для перечислимых типов.",
    syntax: "enum_lt(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'a'::my_enum" },
      { name: "arg2", description: "Второе значение.", example: "'b'::my_enum" }
    ],
    example: "SELECT enum_lt('a'::my_enum, 'b'::my_enum);"
  },
  {
    id: "pg_enum_ne",
    name: "enum_ne",
    category: "Пользовательские функции",
    description: "Оператор 'не равно' для перечислимых типов.",
    syntax: "enum_ne(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'a'::my_enum" },
      { name: "arg2", description: "Второе значение.", example: "'b'::my_enum" }
    ],
    example: "SELECT enum_ne('a'::my_enum, 'b'::my_enum);"
  },
  {
    id: "pg_enum_out",
    name: "enum_out",
    category: "Пользовательские функции",
    description: "Функция вывода для перечислимых типов (преобразует значение enum в строку).",
    syntax: "enum_out(anyenum)",
    arguments: [{ name: "enum_val", description: "Значение enum.", example: "'val'::my_enum" }],
    example: "SELECT enum_out('val'::my_enum);"
  },
  {
    id: "pg_enum_smaller",
    name: "enum_smaller",
    category: "Пользовательские функции",
    description: "Возвращает меньшее из двух значений перечислимого типа.",
    syntax: "enum_smaller(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'a'::my_enum" },
      { name: "arg2", description: "Второе значение.", example: "'b'::my_enum" }
    ],
    example: "SELECT enum_smaller('a'::my_enum, 'b'::my_enum);"
  },
  {
    id: "pg_eqjoinsel",
    name: "eqjoinsel",
    category: "Пользовательские функции",
    description: "Оценивает селективность соединения по равенству (используется планировщиком).",
    syntax: "eqjoinsel(internal, oid, internal, smallint, internal)",
    arguments: [
      { name: "root", description: "Информация о планировщике.", example: "internal" },
      { name: "operator", description: "OID оператора равенства.", example: "96" }
    ],
    example: "-- Внутренняя функция планировщика для оценки стоимости JOIN"
  },
  {
    id: "pg_eqsel",
    name: "eqsel",
    category: "Пользовательские функции",
    description: "Оценивает селективность оператора равенства для условий WHERE.",
    syntax: "eqsel(internal, oid, internal, integer)",
    arguments: [
      { name: "root", description: "Данные планировщика.", example: "internal" },
      { name: "operator", description: "OID оператора.", example: "96" }
    ],
    example: "-- Используется планировщиком для оценки количества строк"
  },
  {
    id: "pg_erf",
    name: "erf",
    category: "Пользовательские функции",
    description: "Вычисляет функцию ошибок (error function).",
    syntax: "erf(double precision)",
    arguments: [{ name: "x", description: "Аргумент функции.", example: "1.0" }],
    example: "SELECT erf(1.0);"
  },
  {
    id: "pg_erfc",
    name: "erfc",
    category: "Пользовательские функции",
    description: "Вычисляет дополняющую функцию ошибок (complementary error function).",
    syntax: "erfc(double precision)",
    arguments: [{ name: "x", description: "Аргумент функции.", example: "1.0" }],
    example: "SELECT erfc(1.0);"
  },
  {
    id: "pg_euc_cn_to_mic",
    name: "euc_cn_to_mic",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_CN в MULE_INTERNAL (MIC).",
    syntax: "euc_cn_to_mic(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src_encoding", description: "Исходная кодировка.", example: "integer" }],
    example: "-- Внутренняя функция перекодирования"
  },
  {
    id: "pg_euc_cn_to_utf8",
    name: "euc_cn_to_utf8",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_CN в UTF8.",
    syntax: "euc_cn_to_utf8(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Исходные данные.", example: "internal" }],
    example: "-- Используется механизмом конвертации кодировок"
  },
  {
    id: "pg_euc_jis_2004_to_shift_jis_2004",
    name: "euc_jis_2004_to_shift_jis_2004",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_JIS_2004 в SHIFT_JIS_2004.",
    syntax: "euc_jis_2004_to_shift_jis_2004(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Внутренняя японская перекодировка"
  },
  {
    id: "pg_euc_jis_2004_to_utf8",
    name: "euc_jis_2004_to_utf8",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_JIS_2004 в UTF8.",
    syntax: "euc_jis_2004_to_utf8(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Конвертация в Unicode"
  },
  {
    id: "pg_euc_jp_to_mic",
    name: "euc_jp_to_mic",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_JP в MIC.",
    syntax: "euc_jp_to_mic(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Системная перекодировка"
  },
  {
    id: "pg_euc_jp_to_sjis",
    name: "euc_jp_to_sjis",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_JP в SJIS.",
    syntax: "euc_jp_to_sjis(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Системная перекодировка"
  },
  {
    id: "pg_euc_jp_to_utf8",
    name: "euc_jp_to_utf8",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_JP в UTF8.",
    syntax: "euc_jp_to_utf8(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Системная перекодировка"
  },
  {
    id: "pg_euc_kr_to_mic",
    name: "euc_kr_to_mic",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_KR в MIC.",
    syntax: "euc_kr_to_mic(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Системная перекодировка"
  },
  {
    id: "pg_euc_kr_to_utf8",
    name: "euc_kr_to_utf8",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_KR в UTF8.",
    syntax: "euc_kr_to_utf8(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Системная перекодировка"
  },
  {
    id: "pg_euc_tw_to_big5",
    name: "euc_tw_to_big5",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_TW в BIG5.",
    syntax: "euc_tw_to_big5(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Системная перекодировка"
  },
  {
    id: "pg_euc_tw_to_mic",
    name: "euc_tw_to_mic",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_TW в MIC.",
    syntax: "euc_tw_to_mic(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Системная перекодировка"
  },
  {
    id: "pg_euc_tw_to_utf8",
    name: "euc_tw_to_utf8",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_TW в UTF8.",
    syntax: "euc_tw_to_utf8(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Системная перекодировка"
  },
  {
    id: "pg_event_trigger_in",
    name: "event_trigger_in",
    category: "Пользовательские функции",
    description: "Функция ввода для типа данных event_trigger.",
    syntax: "event_trigger_in(cstring)",
    arguments: [{ name: "input", description: "Имя триггера события.", example: "'my_event_trigger'::cstring" }],
    example: "-- Внутренняя функция для обработки триггеров событий"
  },
  {
    id: "pg_event_trigger_out",
    name: "event_trigger_out",
    category: "Пользовательские функции",
    description: "Функция вывода для типа данных event_trigger.",
    syntax: "event_trigger_out(event_trigger)",
    arguments: [{ name: "trigger", description: "Объект триггера события.", example: "..." }],
    example: "-- Системная функция вывода"
  },
  {
    id: "pg_exp_dp",
    name: "exp",
    name_display: "exp (double precision)",
    category: "Пользовательские функции",
    description: "Вычисляет экспоненту (e в степени x) для double precision.",
    syntax: "exp(double precision)",
    arguments: [{ name: "x", description: "Показатель степени.", example: "1.0" }],
    example: "SELECT exp(1.0); -- Вернет значение числа Эйлера (~2.718)"
  },
  {
    id: "pg_exp_numeric",
    name: "exp",
    name_display: "exp (numeric)",
    category: "Пользовательские функции",
    description: "Вычисляет экспоненту (e в степени x) для типа numeric.",
    syntax: "exp(numeric)",
    arguments: [{ name: "x", description: "Показатель степени.", example: "1.0::numeric" }],
    example: "SELECT exp(1.0::numeric);"
  },
  {
    id: "pg_extract_date",
    name: "extract",
    name_display: "extract (date)",
    category: "Пользовательские функции",
    description: "Извлекает компоненты (год, месяц, день) из даты.",
    syntax: "extract(field text FROM source date)",
    arguments: [
      { name: "field", description: "Поле для извлечения (year, month, day).", example: "'year'" },
      { name: "source", description: "Исходная дата.", example: "CURRENT_DATE" }
    ],
    example: "SELECT extract(year FROM CURRENT_DATE);"
  },
  {
    id: "pg_extract_time",
    name: "extract",
    name_display: "extract (time)",
    category: "Пользовательские функции",
    description: "Извлекает компоненты (час, минута, секунда) из времени без часового пояса.",
    syntax: "extract(field text FROM source time)",
    arguments: [
      { name: "field", description: "Поле (hour, minute, second).", example: "'hour'" },
      { name: "source", description: "Значение времени.", example: "'12:30:00'::time" }
    ],
    example: "SELECT extract(hour FROM '12:30:00'::time);"
  },
  {
    id: "pg_extract_timetz",
    name: "extract",
    name_display: "extract (timetz)",
    category: "Пользовательские функции",
    description: "Извлекает компоненты из времени с часовым поясом.",
    syntax: "extract(field text FROM source timetz)",
    arguments: [
      { name: "field", description: "Поле (hour, minute, timezone).", example: "'timezone'" },
      { name: "source", description: "Время с часовым поясом.", example: "CURRENT_TIME" }
    ],
    example: "SELECT extract(timezone FROM CURRENT_TIME);"
  },
  {
    id: "pg_extract_timestamp",
    name: "extract",
    name_display: "extract (timestamp)",
    category: "Пользовательские функции",
    description: "Извлекает компоненты из метки времени без часового пояса.",
    syntax: "extract(field text FROM source timestamp)",
    arguments: [
      { name: "field", description: "Поле (year, month, day, hour, etc.).", example: "'month'" },
      { name: "source", description: "Метка времени.", example: "now()::timestamp" }
    ],
    example: "SELECT extract(month FROM now()::timestamp);"
  },
  {
    id: "pg_extract_interval",
    name: "extract",
    name_display: "extract (interval)",
    category: "Пользовательские функции",
    description: "Извлекает компоненты из временного интервала.",
    syntax: "extract(field text FROM source interval)",
    arguments: [
      { name: "field", description: "Поле (day, hour, minute).", example: "'day'" },
      { name: "source", description: "Интервал.", example: "'1 day 2 hours'::interval" }
    ],
    example: "SELECT extract(day FROM '1 day 2 hours'::interval);"
  },
  {
    id: "pg_extract_timestamptz",
    name: "extract",
    name_display: "extract (timestamptz)",
    category: "Пользовательские функции",
    description: "Извлекает компоненты из метки времени с часовым поясом.",
    syntax: "extract(field text FROM source timestamptz)",
    arguments: [
      { name: "field", description: "Поле (epoch, year, day, etc.).", example: "'epoch'" },
      { name: "source", description: "Метка времени с поясом.", example: "now()" }
    ],
    example: "SELECT extract(epoch FROM now());"
  },
  {
    id: "pg_factorial",
    name: "factorial",
    category: "Пользовательские функции",
    description: "Вычисляет факториал числа.",
    syntax: "factorial(bigint)",
    arguments: [{ name: "n", description: "Число (bigint).", example: "5" }],
    example: "SELECT factorial(5); -- Результат: 120"
  },
  {
    id: "pg_family",
    name: "family",
    category: "Пользовательские функции",
    description: "Возвращает семейство протокола для сетевого адреса (4 для IPv4, 6 для IPv6).",
    syntax: "family(inet)",
    arguments: [{ name: "address", description: "Сетевой адрес.", example: "'127.0.0.1'::inet" }],
    example: "SELECT family('127.0.0.1'::inet); -- Результат: 4"
  },
  {
    id: "pg_fdw_handler_in",
    name: "fdw_handler_in",
    category: "Пользовательские функции",
    description: "Функция ввода для обработчика сторонних данных (FDW).",
    syntax: "fdw_handler_in(cstring)",
    arguments: [{ name: "input", description: "Имя обработчика.", example: "'postgres_fdw_handler'::cstring" }],
    example: "-- Используется при регистрации FDW"
  },
  {
    id: "pg_fdw_handler_out",
    name: "fdw_handler_out",
    category: "Пользовательские функции",
    description: "Функция вывода для типа fdw_handler.",
    syntax: "fdw_handler_out(fdw_handler)",
    arguments: [{ name: "handler", description: "Объект обработчика.", example: "..." }],
    example: "-- Системная функция вывода"
  },
  {
    id: "pg_float4_int2",
    name: "float4",
    name_display: "float4 (из smallint)",
    category: "Пользовательские функции",
    description: "Преобразует малое целое число (smallint) в число с плавающей точкой.",
    syntax: "float4(smallint)",
    arguments: [{ name: "n", description: "Число smallint.", example: "42::smallint" }],
    example: "SELECT float4(42::smallint);"
  },
  {
    id: "pg_float4_numeric",
    name: "float4",
    name_display: "float4 (из numeric)",
    category: "Пользовательские функции",
    description: "Преобразует число типа numeric в float4.",
    syntax: "float4(numeric)",
    arguments: [{ name: "n", description: "Число numeric.", example: "10.5::numeric" }],
    example: "SELECT float4(10.5::numeric);"
  },
  {
    id: "pg_float4_int4",
    name: "float4",
    name_display: "float4 (из integer)",
    category: "Пользовательские функции",
    description: "Преобразует целое число (integer) в float4.",
    syntax: "float4(integer)",
    arguments: [{ name: "n", description: "Число integer.", example: "100" }],
    example: "SELECT float4(100);"
  },
  {
    id: "pg_float4_jsonb",
    name: "float4",
    name_display: "float4 (из jsonb)",
    category: "Пользовательские функции",
    description: "Извлекает числовое значение из jsonb и преобразует в float4.",
    syntax: "float4(jsonb)",
    arguments: [{ name: "j", description: "JSONB объект/значение.", example: "'1.23'::jsonb" }],
    example: "SELECT float4('1.23'::jsonb);"
  },
  {
    id: "pg_float4_int8",
    name: "float4",
    name_display: "float4 (из bigint)",
    category: "Пользовательские функции",
    description: "Преобразует большое целое число (bigint) в float4.",
    syntax: "float4(bigint)",
    arguments: [{ name: "n", description: "Число bigint.", example: "1000000000::bigint" }],
    example: "SELECT float4(1000000000::bigint);"
  },
  {
    id: "pg_float4_float8",
    name: "float4",
    name_display: "float4 (из double precision)",
    category: "Пользовательские функции",
    description: "Преобразует число двойной точности (float8) в float4.",
    syntax: "float4(double precision)",
    arguments: [{ name: "n", description: "Число double precision.", example: "1.23456789::float8" }],
    example: "SELECT float4(1.23456789::float8);"
  },
  {
    id: "pg_float48div",
    name: "float48div",
    category: "Пользовательские функции",
    description: "Деление числа real (float4) на double precision (float8).",
    syntax: "float48div(real, double precision)",
    arguments: [
      { name: "a", description: "Делимое (real).", example: "10.0::real" },
      { name: "b", description: "Делитель (float8).", example: "2.0::float8" }
    ],
    example: "SELECT float48div(10.0::real, 2.0::float8);"
  },
  {
    id: "pg_float48eq",
    name: "float48eq",
    category: "Пользовательские функции",
    description: "Проверка равенства real и double precision.",
    syntax: "float48eq(real, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "1.0::float8" }
    ],
    example: "SELECT float48eq(1.0::real, 1.0::float8);"
  },
  {
    id: "pg_float48ge",
    name: "float48ge",
    category: "Пользовательские функции",
    description: "Проверка 'больше или равно' для real и double precision.",
    syntax: "float48ge(real, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "2.0::real" },
      { name: "b", description: "Второе число.", example: "1.0::float8" }
    ],
    example: "SELECT float48ge(2.0::real, 1.0::float8);"
  },
  {
    id: "pg_float48gt",
    name: "float48gt",
    category: "Пользовательские функции",
    description: "Проверка 'больше' для real и double precision.",
    syntax: "float48gt(real, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "2.0::real" },
      { name: "b", description: "Второе число.", example: "1.0::float8" }
    ],
    example: "SELECT float48gt(2.0::real, 1.0::float8);"
  },
  {
    id: "pg_float48le",
    name: "float48le",
    category: "Пользовательские функции",
    description: "Проверка 'меньше или равно' для real и double precision.",
    syntax: "float48le(real, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "2.0::float8" }
    ],
    example: "SELECT float48le(1.0::real, 2.0::float8);"
  },
  {
    id: "pg_float48lt",
    name: "float48lt",
    category: "Пользовательские функции",
    description: "Проверка 'меньше' для real и double precision.",
    syntax: "float48lt(real, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "2.0::float8" }
    ],
    example: "SELECT float48lt(1.0::real, 2.0::float8);"
  },
  {
    id: "pg_float48mi",
    name: "float48mi",
    category: "Пользовательские функции",
    description: "Вычитание double precision из real.",
    syntax: "float48mi(real, double precision)",
    arguments: [
      { name: "a", description: "Уменьшаемое.", example: "5.0::real" },
      { name: "b", description: "Вычитаемое.", example: "2.0::float8" }
    ],
    example: "SELECT float48mi(5.0::real, 2.0::float8);"
  },
  {
    id: "pg_float48mul",
    name: "float48mul",
    category: "Пользовательские функции",
    description: "Умножение real на double precision.",
    syntax: "float48mul(real, double precision)",
    arguments: [
      { name: "a", description: "Множитель 1.", example: "2.5::real" },
      { name: "b", description: "Множитель 2.", example: "4.0::float8" }
    ],
    example: "SELECT float48mul(2.5::real, 4.0::float8);"
  },
  {
    id: "pg_float48ne",
    name: "float48ne",
    category: "Пользовательские функции",
    description: "Проверка 'не равно' для real и double precision.",
    syntax: "float48ne(real, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "2.0::float8" }
    ],
    example: "SELECT float48ne(1.0::real, 2.0::float8);"
  },
  {
    id: "pg_float48pl",
    name: "float48pl",
    category: "Пользовательские функции",
    description: "Сложение real и double precision.",
    syntax: "float48pl(real, double precision)",
    arguments: [
      { name: "a", description: "Слагаемое 1.", example: "1.5::real" },
      { name: "b", description: "Слагаемое 2.", example: "2.5::float8" }
    ],
    example: "SELECT float48pl(1.5::real, 2.5::float8);"
  },
  {
    id: "pg_float4_accum",
    name: "float4_accum",
    category: "Пользовательские функции",
    description: "Агрегатная функция накопления для вычисления статистики по числам типа real.",
    syntax: "float4_accum(double precision[], real)",
    arguments: [
      { name: "state", description: "Текущее состояние агрегации (массив).", example: "ARRAY[0,0,0]::double precision[]" },
      { name: "new_val", description: "Новое значение.", example: "1.5::real" }
    ],
    example: "-- Используется внутри агрегатов типа AVG или STDDEV для real"
  },
  {
    id: "pg_float4abs",
    name: "float4abs",
    category: "Пользовательские функции",
    description: "Возвращает абсолютное значение (модуль) числа типа real.",
    syntax: "float4abs(real)",
    arguments: [{ name: "x", description: "Число.", example: "-5.5::real" }],
    example: "SELECT float4abs(-5.5::real); -- Результат: 5.5"
  },
  {
    id: "pg_float4div",
    name: "float4div",
    category: "Пользовательские функции",
    description: "Деление двух чисел типа real.",
    syntax: "float4div(real, real)",
    arguments: [
      { name: "a", description: "Делимое.", example: "10.0::real" },
      { name: "b", description: "Делитель.", example: "2.0::real" }
    ],
    example: "SELECT float4div(10.0::real, 2.0::real);"
  },
  {
    id: "pg_float4eq",
    name: "float4eq",
    category: "Пользовательские функции",
    description: "Оператор равенства для типа real.",
    syntax: "float4eq(real, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "1.0::real" }
    ],
    example: "SELECT float4eq(1.0::real, 1.0::real);"
  },
  {
    id: "pg_float4ge",
    name: "float4ge",
    category: "Пользовательские функции",
    description: "Оператор 'больше или равно' для типа real.",
    syntax: "float4ge(real, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "2.0::real" },
      { name: "b", description: "Второе число.", example: "1.0::real" }
    ],
    example: "SELECT float4ge(2.0::real, 1.0::real);"
  },
  {
    id: "pg_float4gt",
    name: "float4gt",
    category: "Пользовательские функции",
    description: "Оператор 'больше' для типа real.",
    syntax: "float4gt(real, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "2.0::real" },
      { name: "b", description: "Второе число.", example: "1.0::real" }
    ],
    example: "SELECT float4gt(2.0::real, 1.0::real);"
  },
  {
    id: "pg_float4in",
    name: "float4in",
    category: "Пользовательские функции",
    description: "Функция ввода для типа real (преобразование строки в real).",
    syntax: "float4in(cstring)",
    arguments: [{ name: "input", description: "Строковое представление числа.", example: "'1.23'::cstring" }],
    example: "SELECT float4in('1.23');"
  },
  {
    id: "pg_float4larger",
    name: "float4larger",
    category: "Пользовательские функции",
    description: "Возвращает большее из двух чисел типа real.",
    syntax: "float4larger(real, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "2.0::real" }
    ],
    example: "SELECT float4larger(1.0::real, 2.0::real);"
  },
  {
    id: "pg_float4le",
    name: "float4le",
    category: "Пользовательские функции",
    description: "Оператор 'меньше или равно' для типа real.",
    syntax: "float4le(real, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "2.0::real" }
    ],
    example: "SELECT float4le(1.0::real, 2.0::real);"
  },
  {
    id: "pg_float4lt",
    name: "float4lt",
    category: "Пользовательские функции",
    description: "Оператор 'меньше' для типа real.",
    syntax: "float4lt(real, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "2.0::real" }
    ],
    example: "SELECT float4lt(1.0::real, 2.0::real);"
  },
  {
    id: "pg_float4mi",
    name: "float4mi",
    category: "Пользовательские функции",
    description: "Вычитание двух чисел типа real.",
    syntax: "float4mi(real, real)",
    arguments: [
      { name: "a", description: "Уменьшаемое.", example: "5.0::real" },
      { name: "b", description: "Вычитаемое.", example: "2.0::real" }
    ],
    example: "SELECT float4mi(5.0::real, 2.0::real);"
  },
  {
    id: "pg_float4mul",
    name: "float4mul",
    category: "Пользовательские функции",
    description: "Умножение двух чисел типа real.",
    syntax: "float4mul(real, real)",
    arguments: [
      { name: "a", description: "Множитель 1.", example: "2.0::real" },
      { name: "b", description: "Множитель 2.", example: "3.0::real" }
    ],
    example: "SELECT float4mul(2.0::real, 3.0::real);"
  },
  {
    id: "pg_float4ne",
    name: "float4ne",
    category: "Пользовательские функции",
    description: "Оператор 'не равно' для типа real.",
    syntax: "float4ne(real, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "2.0::real" }
    ],
    example: "SELECT float4ne(1.0::real, 2.0::real);"
  },
  {
    id: "pg_float4out",
    name: "float4out",
    category: "Пользовательские функции",
    description: "Функция вывода для типа real (преобразование real в строку).",
    syntax: "float4out(real)",
    arguments: [{ name: "val", description: "Число real.", example: "1.23::real" }],
    example: "SELECT float4out(1.23::real);"
  },
  {
    id: "pg_float4pl",
    name: "float4pl",
    category: "Пользовательские функции",
    description: "Сложение двух чисел типа real.",
    syntax: "float4pl(real, real)",
    arguments: [
      { name: "a", description: "Слагаемое 1.", example: "1.5::real" },
      { name: "b", description: "Слагаемое 2.", example: "2.5::real" }
    ],
    example: "SELECT float4pl(1.5::real, 2.5::real);"
  },
  {
    id: "pg_float4recv",
    name: "float4recv",
    category: "Пользовательские функции",
    description: "Функция приема двоичных данных для типа real.",
    syntax: "float4recv(internal)",
    arguments: [{ name: "buf", description: "Двоичный буфер.", example: "internal" }],
    example: "-- Внутреннее использование"
  },
  {
    id: "pg_float4send",
    name: "float4send",
    category: "Пользовательские функции",
    description: "Функция отправки двоичных данных для типа real.",
    syntax: "float4send(real)",
    arguments: [{ name: "val", description: "Число real.", example: "1.23::real" }],
    example: "-- Внутреннее использование"
  },
  {
    id: "pg_float4smaller",
    name: "float4smaller",
    category: "Пользовательские функции",
    description: "Возвращает меньшее из двух чисел типа real.",
    syntax: "float4smaller(real, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "2.0::real" }
    ],
    example: "SELECT float4smaller(1.0::real, 2.0::real);"
  },
  {
    id: "pg_float4um",
    name: "float4um",
    category: "Пользовательские функции",
    description: "Унарный минус для типа real (смена знака).",
    syntax: "float4um(real)",
    arguments: [{ name: "x", description: "Число.", example: "5.0::real" }],
    example: "SELECT float4um(5.0::real); -- Результат: -5.0"
  },
  {
    id: "pg_float4up",
    name: "float4up",
    category: "Пользовательские функции",
    description: "Унарный плюс для типа real.",
    syntax: "float4up(real)",
    arguments: [{ name: "x", description: "Число.", example: "5.0::real" }],
    example: "SELECT float4up(5.0::real); -- Результат: 5.0"
  },
  {
    id: "pg_float8_numeric",
    name: "float8",
    name_display: "float8 (из numeric)",
    category: "Пользовательские функции",
    description: "Преобразует число типа numeric в double precision.",
    syntax: "float8(numeric)",
    arguments: [{ name: "n", description: "Число numeric.", example: "10.5::numeric" }],
    example: "SELECT float8(10.5::numeric);"
  },
  {
    id: "pg_float8_int2",
    name: "float8",
    name_display: "float8 (из smallint)",
    category: "Пользовательские функции",
    description: "Преобразует smallint в double precision.",
    syntax: "float8(smallint)",
    arguments: [{ name: "n", description: "Число smallint.", example: "42::smallint" }],
    example: "SELECT float8(42::smallint);"
  },
  {
    id: "pg_float8_float4",
    name: "float8",
    name_display: "float8 (из real)",
    category: "Пользовательские функции",
    description: "Преобразует real (float4) в double precision.",
    syntax: "float8(real)",
    arguments: [{ name: "n", description: "Число real.", example: "1.23::real" }],
    example: "SELECT float8(1.23::real);"
  },
  {
    id: "pg_float8_jsonb",
    name: "float8",
    name_display: "float8 (из jsonb)",
    category: "Пользовательские функции",
    description: "Извлекает число из jsonb и преобразует в double precision.",
    syntax: "float8(jsonb)",
    arguments: [{ name: "j", description: "JSONB значение.", example: "'1.23'::jsonb" }],
    example: "SELECT float8('1.23'::jsonb);"
  },
  {
    id: "pg_float8_int4",
    name: "float8",
    name_display: "float8 (из integer)",
    category: "Пользовательские функции",
    description: "Преобразует integer в double precision.",
    syntax: "float8(integer)",
    arguments: [{ name: "n", description: "Число integer.", example: "100" }],
    example: "SELECT float8(100);"
  },
  {
    id: "pg_float8_int8",
    name: "float8",
    name_display: "float8 (из bigint)",
    category: "Пользовательские функции",
    description: "Преобразует bigint в double precision.",
    syntax: "float8(bigint)",
    arguments: [{ name: "n", description: "Число bigint.", example: "1000000000::bigint" }],
    example: "SELECT float8(1000000000::bigint);"
  },
  {
    id: "pg_float84div",
    name: "float84div",
    category: "Пользовательские функции",
    description: "Деление double precision на real.",
    syntax: "float84div(double precision, real)",
    arguments: [
      { name: "a", description: "Делимое (float8).", example: "10.0::float8" },
      { name: "b", description: "Делитель (real).", example: "2.0::real" }
    ],
    example: "SELECT float84div(10.0::float8, 2.0::real);"
  },
  {
    id: "pg_float84eq",
    name: "float84eq",
    category: "Пользовательские функции",
    description: "Сравнение на равенство double precision и real.",
    syntax: "float84eq(double precision, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::float8" },
      { name: "b", description: "Второе число.", example: "1.0::real" }
    ],
    example: "SELECT float84eq(1.0::float8, 1.0::real);"
  },
  {
    id: "pg_float84ge",
    name: "float84ge",
    category: "Пользовательские функции",
    description: "Оператор 'больше или равно' для double precision и real.",
    syntax: "float84ge(double precision, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "2.0::float8" },
      { name: "b", description: "Второе число.", example: "1.0::real" }
    ],
    example: "SELECT float84ge(2.0::float8, 1.0::real);"
  },
  {
    id: "pg_float84gt",
    name: "float84gt",
    category: "Пользовательские функции",
    description: "Оператор 'больше' для double precision и real.",
    syntax: "float84gt(double precision, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "2.0::float8" },
      { name: "b", description: "Второе число.", example: "1.0::real" }
    ],
    example: "SELECT float84gt(2.0::float8, 1.0::real);"
  },
  {
    id: "pg_float84le",
    name: "float84le",
    category: "Пользовательские функции",
    description: "Оператор 'меньше или равно' для double precision и real.",
    syntax: "float84le(double precision, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::float8" },
      { name: "b", description: "Второе число.", example: "2.0::real" }
    ],
    example: "SELECT float84le(1.0::float8, 2.0::real);"
  },
  {
    id: "pg_float84lt",
    name: "float84lt",
    category: "Пользовательские функции",
    description: "Оператор 'меньше' для double precision и real.",
    syntax: "float84lt(double precision, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::float8" },
      { name: "b", description: "Второе число.", example: "2.0::real" }
    ],
    example: "SELECT float84lt(1.0::float8, 2.0::real);"
  },
  {
    id: "pg_float84mi",
    name: "float84mi",
    category: "Пользовательские функции",
    description: "Вычитание real из double precision.",
    syntax: "float84mi(double precision, real)",
    arguments: [
      { name: "a", description: "Уменьшаемое.", example: "5.0::float8" },
      { name: "b", description: "Вычитаемое.", example: "2.0::real" }
    ],
    example: "SELECT float84mi(5.0::float8, 2.0::real);"
  },
  {
    id: "pg_float84mul",
    name: "float84mul",
    category: "Пользовательские функции",
    description: "Умножение double precision на real.",
    syntax: "float84mul(double precision, real)",
    arguments: [
      { name: "a", description: "Множитель 1.", example: "2.0::float8" },
      { name: "b", description: "Множитель 2.", example: "3.0::real" }
    ],
    example: "SELECT float84mul(2.0::float8, 3.0::real);"
  },
  {
    id: "pg_float84ne",
    name: "float84ne",
    category: "Пользовательские функции",
    description: "Оператор 'не равно' для double precision и real.",
    syntax: "float84ne(double precision, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::float8" },
      { name: "b", description: "Второе число.", example: "2.0::real" }
    ],
    example: "SELECT float84ne(1.0::float8, 2.0::real);"
  },
  {
    id: "pg_float84pl",
    name: "float84pl",
    category: "Пользовательские функции",
    description: "Сложение double precision и real.",
    syntax: "float84pl(double precision, real)",
    arguments: [
      { name: "a", description: "Слагаемое 1.", example: "1.5::float8" },
      { name: "b", description: "Слагаемое 2.", example: "2.5::real" }
    ],
    example: "SELECT float84pl(1.5::float8, 2.5::real);"
  },
  {
    id: "pg_float8_accum",
    name: "float8_accum",
    category: "Пользовательские функции",
    description: "Агрегатная функция накопления для вычисления статистики по числам типа double precision.",
    syntax: "float8_accum(double precision[], double precision)",
    arguments: [
      { name: "state", description: "Текущее состояние агрегации (массив).", example: "ARRAY[0,0,0]::double precision[]" },
      { name: "new_val", description: "Новое значение.", example: "1.5::float8" }
    ],
    example: "-- Используется внутри агрегатов типа AVG или STDDEV для float8"
  },
  {
    id: "pg_float8_avg",
    name: "float8_avg",
    category: "Пользовательские функции",
    description: "Вычисляет среднее значение на основе накопленного состояния (для double precision).",
    syntax: "float8_avg(double precision[])",
    arguments: [{ name: "state", description: "Состояние агрегации.", example: "ARRAY[10, 5, 50.0]" }],
    example: "-- Внутренняя функция для финального этапа агрегации AVG"
  },
  {
    id: "pg_float8_combine",
    name: "float8_combine",
    category: "Пользовательские функции",
    description: "Объединяет два состояния агрегации для параллельных вычислений (double precision).",
    syntax: "float8_combine(double precision[], double precision[])",
    arguments: [
      { name: "state1", description: "Первое состояние.", example: "ARRAY[...]" },
      { name: "state2", description: "Второе состояние.", example: "ARRAY[...]" }
    ],
    example: "-- Используется для параллельной агрегации"
  },
  {
    id: "pg_float8_corr",
    name: "float8_corr",
    category: "Пользовательские функции",
    description: "Вычисляет коэффициент корреляции на основе накопленного состояния.",
    syntax: "float8_corr(double precision[])",
    arguments: [{ name: "state", description: "Состояние агрегации.", example: "ARRAY[...]" }],
    example: "SELECT float8_corr(state_data);"
  },
  {
    id: "pg_float8_covar_pop",
    name: "float8_covar_pop",
    category: "Пользовательские функции",
    description: "Вычисляет популяционную ковариацию на основе состояния.",
    syntax: "float8_covar_pop(double precision[])",
    arguments: [{ name: "state", description: "Состояние агрегации.", example: "ARRAY[...]" }],
    example: "-- Внутренняя статистическая функция"
  },
  {
    id: "pg_float8_covar_samp",
    name: "float8_covar_samp",
    category: "Пользовательские функции",
    description: "Вычисляет выборочную ковариацию на основе состояния.",
    syntax: "float8_covar_samp(double precision[])",
    arguments: [{ name: "state", description: "Состояние агрегации.", example: "ARRAY[...]" }],
    example: "-- Внутренняя статистическая функция"
  },
  {
    id: "pg_float8_regr_accum",
    name: "float8_regr_accum",
    category: "Пользовательские функции",
    description: "Накапливает состояние для вычисления линейной регрессии.",
    syntax: "float8_regr_accum(double precision[], double precision, double precision)",
    arguments: [
      { name: "state", description: "Текущее состояние.", example: "ARRAY[...]" },
      { name: "new_y", description: "Зависимая переменная.", example: "10.5" },
      { name: "new_x", description: "Независимая переменная.", example: "2.1" }
    ],
    example: "-- Используется агрегатами REGR_*"
  },
  {
    id: "pg_float8_regr_avgx",
    name: "float8_regr_avgx",
    category: "Пользовательские функции",
    description: "Вычисляет среднее значение независимой переменной (x) в регрессии.",
    syntax: "float8_regr_avgx(double precision[])",
    arguments: [{ name: "state", description: "Состояние регрессии.", example: "ARRAY[...]" }],
    example: "-- Финальная функция для REGR_AVGX"
  },
  {
    id: "pg_float8_regr_avgy",
    name: "float8_regr_avgy",
    category: "Пользовательские функции",
    description: "Вычисляет среднее значение зависимой переменной (y) в регрессии.",
    syntax: "float8_regr_avgy(double precision[])",
    arguments: [{ name: "state", description: "Состояние регрессии.", example: "ARRAY[...]" }],
    example: "-- Финальная функция для REGR_AVGY"
  },
  {
    id: "pg_float8_regr_combine",
    name: "float8_regr_combine",
    category: "Пользовательские функции",
    description: "Объединяет два состояния регрессии для параллельных вычислений.",
    syntax: "float8_regr_combine(double precision[], double precision[])",
    arguments: [{ name: "state1", description: "Состояние 1.", example: "..." }],
    example: "-- Параллельная регрессия"
  },
  {
    id: "pg_float8_regr_intercept",
    name: "float8_regr_intercept",
    category: "Пользовательские функции",
    description: "Вычисляет Y-пересечение линии регрессии.",
    syntax: "float8_regr_intercept(double precision[])",
    arguments: [{ name: "state", description: "Состояние регрессии.", example: "..." }],
    example: "-- Финальная функция для REGR_INTERCEPT"
  },
  {
    id: "pg_float8_regr_r2",
    name: "float8_regr_r2",
    category: "Пользовательские функции",
    description: "Вычисляет коэффициент детерминации (R-квадрат).",
    syntax: "float8_regr_r2(double precision[])",
    arguments: [{ name: "state", description: "Состояние регрессии.", example: "..." }],
    example: "-- Финальная функция для REGR_R2"
  },
  {
    id: "pg_float8_regr_slope",
    name: "float8_regr_slope",
    category: "Пользовательские функции",
    description: "Вычисляет наклон линии регрессии.",
    syntax: "float8_regr_slope(double precision[])",
    arguments: [{ name: "state", description: "Состояние регрессии.", example: "..." }],
    example: "-- Финальная функция для REGR_SLOPE"
  },
  {
    id: "pg_float8_regr_sxx",
    name: "float8_regr_sxx",
    category: "Пользовательские функции",
    description: "Вычисляет 'сумму квадратов x'.",
    syntax: "float8_regr_sxx(double precision[])",
    arguments: [{ name: "state", description: "Состояние регрессии.", example: "..." }],
    example: "-- Статистический компонент регрессии"
  },
  {
    id: "pg_float8_regr_sxy",
    name: "float8_regr_sxy",
    category: "Пользовательские функции",
    description: "Вычисляет 'сумму произведений x*y'.",
    syntax: "float8_regr_sxy(double precision[])",
    arguments: [{ name: "state", description: "Состояние регрессии.", example: "..." }],
    example: "-- Статистический компонент регрессии"
  },
  {
    id: "pg_float8_regr_syy",
    name: "float8_regr_syy",
    category: "Пользовательские функции",
    description: "Вычисляет 'сумму квадратов y'.",
    syntax: "float8_regr_syy(double precision[])",
    arguments: [{ name: "state", description: "Состояние регрессии.", example: "..." }],
    example: "-- Статистический компонент регрессии"
  },
  {
    id: "pg_float8_stddev_pop",
    name: "float8_stddev_pop",
    category: "Пользовательские функции",
    description: "Вычисляет популяционное стандартное отклонение.",
    syntax: "float8_stddev_pop(double precision[])",
    arguments: [{ name: "state", description: "Состояние агрегации.", example: "..." }],
    example: "-- Статистика для генеральной совокупности"
  },
  {
    id: "pg_float8_stddev_samp",
    name: "float8_stddev_samp",
    category: "Пользовательские функции",
    description: "Вычисляет выборочное стандартное отклонение.",
    syntax: "float8_stddev_samp(double precision[])",
    arguments: [{ name: "state", description: "Состояние агрегации.", example: "..." }],
    example: "-- Статистика для выборки"
  },
  {
    id: "pg_float8_var_pop",
    name: "float8_var_pop",
    category: "Пользовательские функции",
    description: "Вычисляет популяционную дисперсию.",
    syntax: "float8_var_pop(double precision[])",
    arguments: [{ name: "state", description: "Состояние агрегации.", example: "..." }],
    example: "-- Статистика дисперсии"
  },
  {
    id: "pg_float8_var_samp",
    name: "float8_var_samp",
    category: "Пользовательские функции",
    description: "Вычисляет выборочную дисперсию.",
    syntax: "float8_var_samp(double precision[])",
    arguments: [{ name: "state", description: "Состояние агрегации.", example: "..." }],
    example: "-- Статистика дисперсии для выборки"
  },
  {
    id: "pg_float8abs",
    name: "float8abs",
    category: "Пользовательские функции",
    description: "Возвращает абсолютное значение (модуль) числа типа double precision.",
    syntax: "float8abs(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "-123.45::float8" }],
    example: "SELECT float8abs(-123.45::float8); -- Результат: 123.45"
  },
  {
    id: "pg_float8div",
    name: "float8div",
    category: "Пользовательские функции",
    description: "Деление двух чисел типа double precision.",
    syntax: "float8div(double precision, double precision)",
    arguments: [
      { name: "a", description: "Делимое.", example: "10.0" },
      { name: "b", description: "Делитель.", example: "2.0" }
    ],
    example: "SELECT float8div(10.0, 2.0);"
  },
  {
    id: "pg_float8eq",
    name: "float8eq",
    category: "Пользовательские функции",
    description: "Оператор равенства для типа double precision.",
    syntax: "float8eq(double precision, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0" },
      { name: "b", description: "Второе число.", example: "1.0" }
    ],
    example: "SELECT float8eq(1.0, 1.0);"
  },
  {
    id: "pg_float8ge",
    name: "float8ge",
    category: "Пользовательские функции",
    description: "Оператор 'больше или равно' для типа double precision.",
    syntax: "float8ge(double precision, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "2.0" },
      { name: "b", description: "Второе число.", example: "1.0" }
    ],
    example: "SELECT float8ge(2.0, 1.0);"
  },
  {
    id: "pg_float8gt",
    name: "float8gt",
    category: "Пользовательские функции",
    description: "Оператор 'больше' для типа double precision.",
    syntax: "float8gt(double precision, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "2.0" },
      { name: "b", description: "Второе число.", example: "1.0" }
    ],
    example: "SELECT float8gt(2.0, 1.0);"
  },
  {
    id: "pg_float8in",
    name: "float8in",
    category: "Пользовательские функции",
    description: "Функция ввода для типа double precision (преобразование строки в float8).",
    syntax: "float8in(cstring)",
    arguments: [{ name: "input", description: "Строковое представление числа.", example: "'3.14'::cstring" }],
    example: "SELECT float8in('3.14');"
  },
  {
    id: "pg_float8larger",
    name: "float8larger",
    category: "Пользовательские функции",
    description: "Возвращает большее из двух чисел типа double precision.",
    syntax: "float8larger(double precision, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0" },
      { name: "b", description: "Второе число.", example: "2.0" }
    ],
    example: "SELECT float8larger(1.0, 2.0);"
  },
  {
    id: "pg_float8le",
    name: "float8le",
    category: "Пользовательские функции",
    description: "Оператор 'меньше или равно' для типа double precision.",
    syntax: "float8le(double precision, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0" },
      { name: "b", description: "Второе число.", example: "2.0" }
    ],
    example: "SELECT float8le(1.0, 2.0);"
  },
  {
    id: "pg_float8lt",
    name: "float8lt",
    category: "Пользовательские функции",
    description: "Оператор 'меньше' для типа double precision.",
    syntax: "float8lt(double precision, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0" },
      { name: "b", description: "Второе число.", example: "2.0" }
    ],
    example: "SELECT float8lt(1.0, 2.0);"
  },
  {
    id: "pg_float8mi",
    name: "float8mi",
    category: "Пользовательские функции",
    description: "Вычитание двух чисел типа double precision.",
    syntax: "float8mi(double precision, double precision)",
    arguments: [
      { name: "a", description: "Уменьшаемое.", example: "10.0" },
      { name: "b", description: "Вычитаемое.", example: "3.0" }
    ],
    example: "SELECT float8mi(10.0, 3.0);"
  },
  {
    id: "pg_float8mul",
    name: "float8mul",
    category: "Пользовательские функции",
    description: "Умножение двух чисел типа double precision.",
    syntax: "float8mul(double precision, double precision)",
    arguments: [
      { name: "a", description: "Множитель 1.", example: "2.0" },
      { name: "b", description: "Множитель 2.", example: "4.0" }
    ],
    example: "SELECT float8mul(2.0, 4.0);"
  },
  {
    id: "pg_float8ne",
    name: "float8ne",
    category: "Пользовательские функции",
    description: "Оператор 'не равно' для типа double precision.",
    syntax: "float8ne(double precision, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0" },
      { name: "b", description: "Второе число.", example: "2.0" }
    ],
    example: "SELECT float8ne(1.0, 2.0);"
  },
  {
    id: "pg_float8out",
    name: "float8out",
    category: "Пользовательские функции",
    description: "Функция вывода для типа double precision (преобразование в строку).",
    syntax: "float8out(double precision)",
    arguments: [{ name: "val", description: "Число float8.", example: "1.23" }],
    example: "SELECT float8out(1.23);"
  },
  {
    id: "pg_float8pl",
    name: "float8pl",
    category: "Пользовательские функции",
    description: "Сложение двух чисел типа double precision.",
    syntax: "float8pl(double precision, double precision)",
    arguments: [
      { name: "a", description: "Слагаемое 1.", example: "1.5" },
      { name: "b", description: "Слагаемое 2.", example: "2.5" }
    ],
    example: "SELECT float8pl(1.5, 2.5);"
  },
  {
    id: "pg_float8recv",
    name: "float8recv",
    category: "Пользовательские функции",
    description: "Функция приема двоичных данных для типа double precision.",
    syntax: "float8recv(internal)",
    arguments: [{ name: "buf", description: "Двоичный буфер.", example: "internal" }],
    example: "-- Внутреннее использование"
  },
  {
    id: "pg_float8send",
    name: "float8send",
    category: "Пользовательские функции",
    description: "Функция отправки двоичных данных для типа double precision.",
    syntax: "float8send(double precision)",
    arguments: [{ name: "val", description: "Число float8.", example: "1.23" }],
    example: "-- Внутреннее использование"
  },
  {
    id: "pg_float8smaller",
    name: "float8smaller",
    category: "Пользовательские функции",
    description: "Возвращает меньшее из двух чисел типа double precision.",
    syntax: "float8smaller(double precision, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0" },
      { name: "b", description: "Второе число.", example: "2.0" }
    ],
    example: "SELECT float8smaller(1.0, 2.0);"
  },
  {
    id: "pg_float8um",
    name: "float8um",
    category: "Пользовательские функции",
    description: "Унарный минус для типа double precision.",
    syntax: "float8um(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "5.0" }],
    example: "SELECT float8um(5.0); -- Результат: -5.0"
  },
  {
    id: "pg_float8up",
    name: "float8up",
    category: "Пользовательские функции",
    description: "Унарный плюс для типа double precision.",
    syntax: "float8up(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "5.0" }],
    example: "SELECT float8up(5.0); -- Результат: 5.0"
  },
  {
    id: "pg_floor_numeric",
    name: "floor",
    name_display: "floor (numeric)",
    category: "Пользовательские функции",
    description: "Возвращает ближайшее целое число, меньшее или равное аргументу (для numeric).",
    syntax: "floor(numeric)",
    arguments: [{ name: "n", description: "Число numeric.", example: "3.9" }],
    example: "SELECT floor(3.9); -- Результат: 3"
  },
  {
    id: "pg_floor_float8",
    name: "floor",
    name_display: "floor (double precision)",
    category: "Пользовательские функции",
    description: "Возвращает ближайшее целое число, меньшее или равное аргументу (для double precision).",
    syntax: "floor(double precision)",
    arguments: [{ name: "n", description: "Число с плавающей точкой.", example: "3.9" }],
    example: "SELECT floor(3.9::float8); -- Результат: 3"
  },
  {
    id: "pg_flt4_mul_cash",
    name: "flt4_mul_cash",
    category: "Пользовательские функции",
    description: "Умножение числа типа real на денежную сумму (money).",
    syntax: "flt4_mul_cash(real, money)",
    arguments: [
      { name: "multiplier", description: "Множитель (real).", example: "2.5::real" },
      { name: "amount", description: "Сумма денег.", example: "10.00::money" }
    ],
    example: "SELECT flt4_mul_cash(2.5::real, 10.00::money);"
  },
  {
    id: "pg_flt8_mul_cash",
    name: "flt8_mul_cash",
    category: "Пользовательские функции",
    description: "Умножение числа типа double precision на денежную сумму (money).",
    syntax: "flt8_mul_cash(double precision, money)",
    arguments: [
      { name: "multiplier", description: "Множитель (float8).", example: "2.5" },
      { name: "amount", description: "Сумма денег.", example: "10.00::money" }
    ],
    example: "SELECT flt8_mul_cash(2.5, 10.00::money);"
  },
  {
    id: "pg_fmgr_c_validator",
    name: "fmgr_c_validator",
    category: "Пользовательские функции",
    description: "Функция-валидатор для функций, написанных на языке C.",
    syntax: "fmgr_c_validator(oid)",
    arguments: [{ name: "foid", description: "OID функции.", example: "1234::oid" }],
    example: "-- Используется внутри системного каталога"
  },
  {
    id: "pg_fmgr_internal_validator",
    name: "fmgr_internal_validator",
    category: "Пользовательские функции",
    description: "Функция-валидатор для встроенных (internal) функций.",
    syntax: "fmgr_internal_validator(oid)",
    arguments: [{ name: "foid", description: "OID функции.", example: "1234::oid" }],
    example: "-- Используется внутри системного каталога"
  },
  {
    id: "pg_fmgr_sql_validator",
    name: "fmgr_sql_validator",
    category: "Пользовательские функции",
    description: "Функция-валидатор для функций, написанных на языке SQL.",
    syntax: "fmgr_sql_validator(oid)",
    arguments: [{ name: "foid", description: "OID функции.", example: "1234::oid" }],
    example: "-- Используется внутри системного каталога"
  },
  {
    id: "pg_format_simple",
    name: "format",
    name_display: "format (text)",
    category: "Пользовательские функции",
    description: "Форматирует строку в соответствии со спецификаторами.",
    syntax: "format(text)",
    arguments: [{ name: "format_str", description: "Строка формата.", example: "'Hello'" }],
    example: "SELECT format('Hello');"
  },
  {
    id: "pg_format_variadic",
    name: "format",
    name_display: "format (variadic)",
    category: "Пользовательские функции",
    description: "Форматирует строку, заменяя спецификаторы (%s, %I, %L) значениями аргументов.",
    syntax: "format(text, VARIADIC \"any\")",
    arguments: [
      { name: "format_str", description: "Строка формата с плейсхолдерами.", example: "'Hello, %s!'" },
      { name: "args", description: "Список аргументов.", example: "'World'" }
    ],
    example: "SELECT format('Hello, %s!', 'World'); -- Результат: Hello, World!"
  },
  {
    id: "pg_format_type",
    name: "format_type",
    category: "Пользовательские функции",
    description: "Возвращает SQL-имя типа данных по его OID и модификатору.",
    syntax: "format_type(oid, integer)",
    arguments: [
      { name: "type_oid", description: "OID типа.", example: "23" },
      { name: "typemod", description: "Модификатор типа (-1 если нет).", example: "-1" }
    ],
    example: "SELECT format_type(23, -1); -- Результат: integer"
  },
  {
    id: "pg_gamma",
    name: "gamma",
    category: "Пользовательские функции",
    description: "Вычисляет гамма-функцию (Γ) для заданного числа.",
    syntax: "gamma(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "5.0" }],
    example: "SELECT gamma(5.0); -- Результат: 24 (факториал 4)"
  },
  {
    id: "pg_gb18030_to_utf8",
    name: "gb18030_to_utf8",
    category: "Пользовательские функции",
    description: "Внутренняя функция преобразования кодировки GB18030 в UTF8.",
    syntax: "gb18030_to_utf8(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "args", description: "Системные параметры конвертации.", example: "..." }],
    example: "-- Используется механизмом CONVERSION"
  },
  {
    id: "pg_gbk_to_utf8",
    name: "gbk_to_utf8",
    category: "Пользовательские функции",
    description: "Внутренняя функция преобразования кодировки GBK в UTF8.",
    syntax: "gbk_to_utf8(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "args", description: "Системные параметры конвертации.", example: "..." }],
    example: "-- Используется механизмом CONVERSION"
  },
  {
    id: "pg_gcd_numeric",
    name: "gcd",
    name_display: "gcd (numeric)",
    category: "Пользовательские функции",
    description: "Вычисляет наибольший общий делитель (НОД) двух чисел (numeric).",
    syntax: "gcd(numeric, numeric)",
    arguments: [
      { name: "a", description: "Первое число.", example: "12" },
      { name: "b", description: "Второе число.", example: "18" }
    ],
    example: "SELECT gcd(12::numeric, 18::numeric); -- Результат: 6"
  },
  {
    id: "pg_gcd_int8",
    name: "gcd",
    name_display: "gcd (bigint)",
    category: "Пользовательские функции",
    description: "Вычисляет наибольший общий делитель (НОД) двух чисел (bigint).",
    syntax: "gcd(bigint, bigint)",
    arguments: [
      { name: "a", description: "Первое число.", example: "12" },
      { name: "b", description: "Второе число.", example: "18" }
    ],
    example: "SELECT gcd(12::bigint, 18::bigint); -- Результат: 6"
  },
  {
    id: "pg_gcd_int4",
    name: "gcd",
    name_display: "gcd (integer)",
    category: "Пользовательские функции",
    description: "Вычисляет наибольший общий делитель (НОД) двух чисел (integer).",
    syntax: "gcd(integer, integer)",
    arguments: [
      { name: "a", description: "Первое число.", example: "12" },
      { name: "b", description: "Второе число.", example: "18" }
    ],
    example: "SELECT gcd(12, 18); -- Результат: 6"
  },
  {
    id: "pg_gen_random_uuid",
    name: "gen_random_uuid",
    category: "Пользовательские функции",
    description: "Генерирует случайный UUID (версии 4).",
    syntax: "gen_random_uuid()",
    arguments: [],
    example: "SELECT gen_random_uuid();"
  },
  {
    id: "pg_generate_series_timestamptz",
    name: "generate_series",
    name_display: "generate_series (timestamptz)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность меток времени с часовым поясом.",
    syntax: "generate_series(timestamp with time zone, timestamp with time zone, interval)",
    arguments: [
      { name: "start", description: "Начало.", example: "'2023-01-01'::timestamptz" },
      { name: "stop", description: "Конец.", example: "'2023-01-02'::timestamptz" },
      { name: "step", description: "Шаг (интервал).", example: "'6 hours'::interval" }
    ],
    example: "SELECT generate_series('2023-01-01'::timestamptz, '2023-01-02'::timestamptz, '6 hours'::interval);"
  },
  {
    id: "pg_generate_series_int8_step",
    name: "generate_series",
    name_display: "generate_series (bigint, шаг)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность чисел bigint с заданным шагом.",
    syntax: "generate_series(bigint, bigint, bigint)",
    arguments: [
      { name: "start", description: "Начало.", example: "1" },
      { name: "stop", description: "Конец.", example: "10" },
      { name: "step", description: "Шаг.", example: "2" }
    ],
    example: "SELECT generate_series(1::bigint, 10::bigint, 2::bigint);"
  },
  {
    id: "pg_generate_series_int4",
    name: "generate_series",
    name_display: "generate_series (integer)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность целых чисел от start до stop с шагом 1.",
    syntax: "generate_series(integer, integer)",
    arguments: [
      { name: "start", description: "Начало.", example: "1" },
      { name: "stop", description: "Конец.", example: "5" }
    ],
    example: "SELECT generate_series(1, 5);"
  },
  {
    id: "pg_generate_series_int8",
    name: "generate_series",
    name_display: "generate_series (bigint)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность чисел bigint от start до stop с шагом 1.",
    syntax: "generate_series(bigint, bigint)",
    arguments: [
      { name: "start", description: "Начало.", example: "1" },
      { name: "stop", description: "Конец.", example: "5" }
    ],
    example: "SELECT generate_series(1::bigint, 5::bigint);"
  },
  {
    id: "pg_generate_series_int4_step",
    name: "generate_series",
    name_display: "generate_series (integer, шаг)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность целых чисел с заданным шагом.",
    syntax: "generate_series(integer, integer, integer)",
    arguments: [
      { name: "start", description: "Начало.", example: "1" },
      { name: "stop", description: "Конец.", example: "10" },
      { name: "step", description: "Шаг.", example: "3" }
    ],
    example: "SELECT generate_series(1, 10, 3);"
  },
  {
    id: "pg_generate_series_timestamp",
    name: "generate_series",
    name_display: "generate_series (timestamp)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность меток времени без часового пояса.",
    syntax: "generate_series(timestamp without time zone, timestamp without time zone, interval)",
    arguments: [
      { name: "start", description: "Начало.", example: "'2023-01-01'::timestamp" },
      { name: "stop", description: "Конец.", example: "'2023-01-02'::timestamp" },
      { name: "step", description: "Шаг.", example: "'12 hours'::interval" }
    ],
    example: "SELECT generate_series('2023-01-01'::timestamp, '2023-01-02'::timestamp, '12 hours'::interval);"
  },
  {
    id: "pg_generate_series_numeric_step",
    name: "generate_series",
    name_display: "generate_series (numeric, шаг)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность чисел numeric с заданным шагом.",
    syntax: "generate_series(numeric, numeric, numeric)",
    arguments: [
      { name: "start", description: "Начало.", example: "1.0" },
      { name: "stop", description: "Конец.", example: "2.0" },
      { name: "step", description: "Шаг.", example: "0.2" }
    ],
    example: "SELECT generate_series(1.0::numeric, 2.0::numeric, 0.2::numeric);"
  },
  {
    id: "pg_generate_series_numeric",
    name: "generate_series",
    name_display: "generate_series (numeric)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность чисел numeric от start до stop с шагом 1.",
    syntax: "generate_series(numeric, numeric)",
    arguments: [
      { name: "start", description: "Начало.", example: "1" },
      { name: "stop", description: "Конец.", example: "3" }
    ],
    example: "SELECT generate_series(1::numeric, 3::numeric);"
  },
  {
    id: "pg_generate_series_timestamptz_text",
    name: "generate_series",
    name_display: "generate_series (timestamptz, часовой пояс)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность меток времени с учетом конкретного часового пояса.",
    syntax: "generate_series(timestamp with time zone, timestamp with time zone, interval, text)",
    arguments: [
      { name: "start", description: "Начало.", example: "'2023-01-01'" },
      { name: "stop", description: "Конец.", example: "'2023-01-02'" },
      { name: "step", description: "Шаг.", example: "'1 day'" },
      { name: "timezone", description: "Название часового пояса.", example: "'Europe/Moscow'" }
    ],
    example: "SELECT generate_series('2023-01-01'::timestamptz, '2023-01-02'::timestamptz, '1 day'::interval, 'Europe/Moscow');"
  },
  {
    id: "pg_generate_series_int4_support",
    name: "generate_series_int4_support",
    category: "Пользовательские функции",
    description: "Функция поддержки планировщика для generate_series(int4).",
    syntax: "generate_series_int4_support(internal)",
    arguments: [],
    example: "-- Внутренняя системная функция"
  },
  {
    id: "pg_generate_series_int8_support",
    name: "generate_series_int8_support",
    category: "Пользовательские функции",
    description: "Функция поддержки планировщика для generate_series(int8).",
    syntax: "generate_series_int8_support(internal)",
    arguments: [],
    example: "-- Внутренняя системная функция"
  },
  {
    id: "pg_generate_series_numeric_support",
    name: "generate_series_numeric_support",
    category: "Пользовательские функции",
    description: "Функция поддержки планировщика для generate_series(numeric).",
    syntax: "generate_series_numeric_support(internal)",
    arguments: [],
    example: "-- Внутренняя системная функция"
  },
  {
    id: "pg_generate_series_timestamp_support",
    name: "generate_series_timestamp_support",
    category: "Пользовательские функции",
    description: "Функция поддержки планировщика для generate_series(timestamp).",
    syntax: "generate_series_timestamp_support(internal)",
    arguments: [],
    example: "-- Внутренняя системная функция"
  },
  {
    id: "pg_generate_subscripts",
    name: "generate_subscripts",
    name_display: "generate_subscripts (индексы массива)",
    category: "Пользовательские функции",
    description: "Генерирует набор индексов для указанной размерности массива.",
    syntax: "generate_subscripts(anyarray, integer)",
    arguments: [
      { name: "array", description: "Массив.", example: "ARRAY[10, 20, 30]" },
      { name: "dim", description: "Размерность (обычно 1).", example: "1" }
    ],
    example: "SELECT generate_subscripts(ARRAY[10, 20, 30], 1); -- Результат: 1, 2, 3"
  },
  {
    id: "pg_generate_subscripts_reverse",
    name: "generate_subscripts",
    name_display: "generate_subscripts (обратный порядок)",
    category: "Пользовательские функции",
    description: "Генерирует набор индексов для массива, возможно в обратном порядке.",
    syntax: "generate_subscripts(anyarray, integer, boolean)",
    arguments: [
      { name: "array", description: "Массив.", example: "ARRAY[10, 20, 30]" },
      { name: "dim", description: "Размерность.", example: "1" },
      { name: "reverse", description: "Флаг обратного порядка.", example: "true" }
    ],
    example: "SELECT generate_subscripts(ARRAY[10, 20, 30], 1, true); -- Результат: 3, 2, 1"
  },
  {
    id: "pg_enum_first",
    name: "enum_first",
    category: "Пользовательские функции",
    description: "Возвращает первое значение перечислимого типа (enum).",
    syntax: "enum_first(anyenum)",
    arguments: [{ name: "enum_val", description: "Значение перечислимого типа.", example: "NULL::my_enum" }],
    example: "SELECT enum_first(NULL::my_enum);"
  },
  {
    id: "pg_enum_last",
    name: "enum_last",
    category: "Пользовательские функции",
    description: "Возвращает последнее значение перечислимого типа (enum).",
    syntax: "enum_last(anyenum)",
    arguments: [{ name: "enum_val", description: "Значение перечислимого типа.", example: "NULL::my_enum" }],
    example: "SELECT enum_last(NULL::my_enum);"
  },
  {
    id: "pg_enum_range",
    name: "enum_range",
    category: "Пользовательские функции",
    description: "Возвращает все значения перечислимого типа в виде массива.",
    syntax: "enum_range(anyenum)",
    arguments: [{ name: "enum_val", description: "Значение перечислимого типа.", example: "NULL::my_enum" }],
    example: "SELECT enum_range(NULL::my_enum);"
  },
  {
    id: "pg_enum_range_bounds",
    name: "enum_range",
    name_display: "enum_range (с границами)",
    category: "Пользовательские функции",
    description: "Возвращает диапазон значений перечислимого типа между двумя заданными элементами.",
    syntax: "enum_range(anyenum, anyenum)",
    arguments: [
      { name: "start", description: "Начальное значение (может быть NULL).", example: "'low'::my_enum" },
      { name: "end", description: "Конечное значение (может быть NULL).", example: "'high'::my_enum" }
    ],
    example: "SELECT enum_range('low'::my_enum, 'high'::my_enum);"
  },
  {
    id: "pg_enum_recv",
    name: "enum_recv",
    category: "Пользовательские функции",
    description: "Функция приема двоичных данных для перечислимых типов (enum).",
    syntax: "enum_recv(internal, oid)",
    arguments: [
      { name: "buf", description: "Двоичный буфер.", example: "internal" },
      { name: "type_oid", description: "OID типа enum.", example: "12345" }
    ],
    example: "-- Внутреннее использование при передаче данных"
  },
  {
    id: "pg_enum_send",
    name: "enum_send",
    category: "Пользовательские функции",
    description: "Функция отправки двоичных данных для перечислимых типов (enum).",
    syntax: "enum_send(anyenum)",
    arguments: [{ name: "enum_val", description: "Значение enum.", example: "'val'::my_enum" }],
    example: "-- Внутреннее использование"
  },
  {
    id: "pg_equipment_id",
    name: "equipment_id",
    category: "Пользовательские функции",
    description: "Пример пользовательской функции для получения идентификатора оборудования (зависит от схемы).",
    syntax: "equipment_id(text)",
    arguments: [{ name: "name", description: "Наименование оборудования.", example: "'Sensor_01'" }],
    example: "SELECT equipment_id('Sensor_01');"
  },
  {
    id: "pg_domain_in",
    name: "domain_in",
    category: "Пользовательские функции",
    description: "Функция ввода для типов данных на базе доменов.",
    syntax: "domain_in(cstring, oid, integer)",
    arguments: [
      { name: "input", description: "Строковое представление значения.", example: "'value'::cstring" },
      { name: "type_oid", description: "OID базового типа.", example: "23" },
      { name: "typmod", description: "Модификатор типа.", example: "-1" }
    ],
    example: "-- Внутренняя функция для обработки доменов"
  },
  {
    id: "pg_domain_recv",
    name: "domain_recv",
    category: "Пользовательские функции",
    description: "Функция приема двоичных данных для типов на базе доменов.",
    syntax: "domain_recv(internal, oid, integer)",
    arguments: [
      { name: "buf", description: "Двоичный буфер.", example: "internal" },
      { name: "type_oid", description: "OID базового типа.", example: "23" },
      { name: "typmod", description: "Модификатор типа.", example: "-1" }
    ],
    example: "-- Используется при передаче данных в двоичном формате"
  },
  {
    id: "pg_dpow",
    name: "dpow",
    category: "Пользовательские функции",
    description: "Возводит число в степень (double precision).",
    syntax: "dpow(double precision, double precision)",
    arguments: [
      { name: "base", description: "Основание.", example: "2.0" },
      { name: "exp", description: "Показатель степени.", example: "3.0" }
    ],
    example: "SELECT dpow(2.0, 3.0); -- Результат: 8.0"
  },
  {
    id: "pg_dround",
    name: "dround",
    category: "Пользовательские функции",
    description: "Округляет число до ближайшего целого (double precision).",
    syntax: "dround(double precision)",
    arguments: [{ name: "x", description: "Число для округления.", example: "42.6" }],
    example: "SELECT dround(42.6); -- Результат: 43.0"
  },
  {
    id: "pg_dsimple_init",
    name: "dsimple_init",
    category: "Пользовательские функции",
    description: "Инициализация простого словаря (simple dictionary) для полнотекстового поиска.",
    syntax: "dsimple_init(internal)",
    arguments: [{ name: "internal", description: "Внутреннее состояние.", example: "..." }],
    example: "-- Используется в конфигурациях FTS"
  },
  {
    id: "pg_dsimple_lexize",
    name: "dsimple_lexize",
    category: "Пользовательские функции",
    description: "Лексический анализ для простого словаря (simple dictionary).",
    syntax: "dsimple_lexize(internal, internal, internal, internal)",
    arguments: [
      { name: "dict", description: "Указатель на словарь.", example: "internal" },
      { name: "token", description: "Токен.", example: "internal" }
    ],
    example: "-- Выполняет поиск стоп-слов в простом словаре"
  },
  {
    id: "pg_dsnowball_init",
    name: "dsnowball_init",
    category: "Пользовательские функции",
    description: "Инициализация словаря Snowball (стеммер) для полнотекстового поиска.",
    syntax: "dsnowball_init(internal)",
    arguments: [{ name: "internal", description: "Внутреннее состояние.", example: "..." }],
    example: "-- Поддержка многоязычного стемминга"
  },
  {
    id: "pg_dsnowball_lexize",
    name: "dsnowball_lexize",
    category: "Пользовательские функции",
    description: "Лексический анализ (стемминг) для словаря Snowball.",
    syntax: "dsnowball_lexize(internal, internal, internal, internal)",
    arguments: [
      { name: "dict", description: "Указатель на словарь.", example: "internal" },
      { name: "token", description: "Слово для обработки.", example: "internal" }
    ],
    example: "-- Извлекает корень слова (стем)"
  },
  {
    id: "pg_dsqrt",
    name: "dsqrt",
    category: "Пользовательские функции",
    description: "Вычисляет квадратный корень (double precision).",
    syntax: "dsqrt(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "16.0" }],
    example: "SELECT dsqrt(16.0); -- Результат: 4.0"
  },
  {
    id: "pg_dsynonym_init",
    name: "dsynonym_init",
    category: "Пользовательские функции",
    description: "Инициализация словаря синонимов для полнотекстового поиска.",
    syntax: "dsynonym_init(internal)",
    arguments: [{ name: "internal", description: "Внутреннее состояние.", example: "..." }],
    example: "-- Загрузка файла синонимов"
  },
  {
    id: "pg_dsynonym_lexize",
    name: "dsynonym_lexize",
    category: "Пользовательские функции",
    description: "Лексический анализ для словаря синонимов.",
    syntax: "dsynonym_lexize(internal, internal, internal, internal)",
    arguments: [
      { name: "dict", description: "Указатель на словарь.", example: "internal" },
      { name: "token", description: "Слово для поиска синонима.", example: "internal" }
    ],
    example: "-- Заменяет слово его синонимом"
  },
  { 
    id: "pg_brin_minmax_multi_summary_send", 
    name: "brin_minmax_multi_summary_send", 
    category: "Пользовательские функции", 
    description: "Отправка сводки BRIN multi-range в двоичном формате.", 
    syntax: "brin_minmax_multi_summary_send(pg_brin_minmax_multi_summary)",
    arguments: [{ name: "summary", description: "Объект сводки.", example: "summary_data" }],
    example: "SELECT brin_minmax_multi_summary_send(summary);" 
  },
  { 
    id: "pg_brin_minmax_multi_union", 
    name: "brin_minmax_multi_union", 
    category: "Пользовательские функции", 
    description: "Объединяет состояния BRIN multi-range.", 
    syntax: "brin_minmax_multi_union(internal, internal, internal)",
    arguments: [
      { name: "state1", description: "Первое состояние.", example: "s1" },
      { name: "state2", description: "Второе состояние.", example: "s2" }
    ],
    example: "-- Объединение диапазонов при обновлении индекса" 
  },
  { 
    id: "pg_brin_minmax_opcinfo", 
    name: "brin_minmax_opcinfo", 
    category: "Пользовательские функции", 
    description: "Информация о классе операторов для стандартного BRIN minmax.", 
    syntax: "brin_minmax_opcinfo(internal)",
    arguments: [{ name: "internal", description: "Тип.", example: "type_info" }],
    example: "-- Поддержка стандартных BRIN индексов" 
  },
  { 
    id: "pg_bpcharrecv", 
    name: "bpcharrecv", 
    category: "Пользовательские функции", 
    description: "Функция приема двоичных данных для типа bpchar.", 
    syntax: "bpcharrecv(internal, oid, integer)",
    arguments: [
      { name: "internal", description: "Внутренний буфер.", example: "buf" },
      { name: "oid", description: "OID типа.", example: "1042" },
      { name: "typmod", description: "Модификатор типа.", example: "7" }
    ],
    example: "-- Используется внутренне для бинарного протокола" 
  },
  { 
    id: "pg_bpcharregexeq", 
    name: "bpcharregexeq", 
    category: "Пользовательские функции", 
    description: "Сравнение bpchar с регулярным выражением (POSIX ~).", 
    syntax: "bpcharregexeq(character, text)",
    arguments: [
      { name: "source", description: "Строка character.", example: "'abc'" },
      { name: "regex", description: "Регулярное выражение.", example: "'^a'" }
    ],
    example: "SELECT bpcharregexeq('abc'::char(3), '^a');" 
  },
  { 
    id: "pg_bpcharregexne", 
    name: "bpcharregexne", 
    category: "Пользовательские функции", 
    description: "Сравнение bpchar с регулярным выражением (POSIX !~).", 
    syntax: "bpcharregexne(character, text)",
    arguments: [
      { name: "source", description: "Строка character.", example: "'abc'" },
      { name: "regex", description: "Регулярное выражение.", example: "'^x'" }
    ],
    example: "SELECT bpcharregexne('abc'::char(3), '^x');" 
  },
  { 
    id: "pg_bpcharsend", 
    name: "bpcharsend", 
    category: "Пользовательские функции", 
    description: "Функция отправки двоичных данных для типа bpchar.", 
    syntax: "bpcharsend(character)",
    arguments: [{ name: "character", description: "Строка.", example: "'abc'::char(3)" }],
    example: "SELECT bpcharsend('abc'::char(3));" 
  },
  { 
    id: "pg_bpchartypmodin", 
    name: "bpchartypmodin", 
    category: "Пользовательские функции", 
    description: "Обработка модификаторов типа для character/bpchar.", 
    syntax: "bpchartypmodin(cstring[])",
    arguments: [{ name: "cstring[]", description: "Массив параметров (длина).", example: "ARRAY['10']" }],
    example: "SELECT bpchartypmodin(ARRAY['10']::cstring[]);" 
  },
  { 
    id: "pg_bpchartypmodout", 
    name: "bpchartypmodout", 
    category: "Пользовательские функции", 
    description: "Вывод модификаторов типа для character/bpchar.", 
    syntax: "bpchartypmodout(integer)",
    arguments: [{ name: "integer", description: "Внутренний модификатор.", example: "14" }],
    example: "SELECT bpchartypmodout(14);" 
  },
  { 
    id: "pg_brin_bloom_add_value", 
    name: "brin_bloom_add_value", 
    category: "Пользовательские функции", 
    description: "Добавляет значение в фильтр Блума для индекса BRIN.", 
    syntax: "brin_bloom_add_value(internal, internal, internal, internal)",
    arguments: [
      { name: "state", description: "Внутреннее состояние.", example: "state" },
      { name: "value", description: "Добавляемое значение.", example: "val" }
    ],
    example: "-- Используется внутренне механизмом BRIN Bloom" 
  },
  { 
    id: "pg_brin_bloom_consistent", 
    name: "brin_bloom_consistent", 
    category: "Пользовательские функции", 
    description: "Проверяет соответствие значения фильтру Блума в индексе BRIN.", 
    syntax: "brin_bloom_consistent(internal, internal, internal, integer)",
    arguments: [{ name: "state", description: "Состояние фильтра.", example: "state" }],
    example: "-- Используется при сканировании индексов" 
  },
  { 
    id: "pg_brin_bloom_opcinfo", 
    name: "brin_bloom_opcinfo", 
    category: "Пользовательские функции", 
    description: "Возвращает информацию о классе операторов для BRIN Bloom.", 
    syntax: "brin_bloom_opcinfo(internal)",
    arguments: [{ name: "internal", description: "Внутренний параметр.", example: "type" }],
    example: "-- Системная функция для поддержки индексов" 
  },
  { 
    id: "pg_brin_bloom_options", 
    name: "brin_bloom_options", 
    category: "Пользовательские функции", 
    description: "Обрабатывает параметры (options) для индекса BRIN Bloom.", 
    syntax: "brin_bloom_options(internal)",
    arguments: [{ name: "internal", description: "Указатель на параметры.", example: "reloptions" }],
    example: "-- Вызывается при создании или изменении индекса" 
  },
  { 
    id: "pg_brin_bloom_summary_in", 
    name: "brin_bloom_summary_in", 
    category: "Пользовательские функции", 
    description: "Функция ввода для сводки (summary) BRIN Bloom.", 
    syntax: "brin_bloom_summary_in(cstring)",
    arguments: [{ name: "cstring", description: "Строковое представление.", example: "'summary_data'" }],
    example: "SELECT brin_bloom_summary_in('...');" 
  },
  { 
    id: "pg_brin_bloom_summary_out", 
    name: "brin_bloom_summary_out", 
    category: "Пользовательские функции", 
    description: "Функция вывода для сводки BRIN Bloom.", 
    syntax: "brin_bloom_summary_out(pg_brin_bloom_summary)",
    arguments: [{ name: "summary", description: "Данные сводки.", example: "summary_obj" }],
    example: "SELECT brin_bloom_summary_out(summary);" 
  },
  { 
    id: "pg_brin_bloom_summary_recv", 
    name: "brin_bloom_summary_recv", 
    category: "Пользовательские функции", 
    description: "Прием сводки BRIN Bloom в двоичном формате.", 
    syntax: "brin_bloom_summary_recv(internal)",
    arguments: [{ name: "internal", description: "Двоичный буфер.", example: "buf" }],
    example: "-- Внутреннее использование" 
  },
  { 
    id: "pg_brin_bloom_summary_send", 
    name: "brin_bloom_summary_send", 
    category: "Пользовательские функции", 
    description: "Отправка сводки BRIN Bloom в двоичном формате.", 
    syntax: "brin_bloom_summary_send(pg_brin_bloom_summary)",
    arguments: [{ name: "summary", description: "Сводка.", example: "summary_obj" }],
    example: "SELECT brin_bloom_summary_send(summary);" 
  },
  { 
    id: "pg_brin_bloom_union", 
    name: "brin_bloom_union", 
    category: "Пользовательские функции", 
    description: "Объединяет два фильтра Блума в индексах BRIN.", 
    syntax: "brin_bloom_union(internal, internal, internal)",
    arguments: [
      { name: "state 1", description: "Первый фильтр.", example: "s1" },
      { name: "state 2", description: "Второй фильтр.", example: "s2" }
    ],
    example: "-- Используется при обновлении индексов" 
  },
  { 
    id: "pg_brin_desummarize_range", 
    name: "brin_desummarize_range", 
    category: "Пользовательские функции", 
    description: "Удаляет сводную информацию для конкретного диапазона страниц в индексе BRIN.", 
    syntax: "brin_desummarize_range(regclass, bigint)",
    arguments: [
      { name: "index", description: "Имя или OID индекса.", example: "'my_brin_idx'::regclass" },
      { name: "blockNumber", description: "Номер блока.", example: "0" }
    ],
    example: "SELECT brin_desummarize_range('idx_name', 512);" 
  },
  { 
    id: "pg_bpchar_larger", 
    name: "bpchar_larger", 
    category: "Пользовательские функции", 
    description: "Возвращает большее из двух значений bpchar.", 
    syntax: "bpchar_larger(character, character)",
    arguments: [
      { name: "arg1", description: "Первая строка.", example: "'a'" },
      { name: "arg2", description: "Вторая строка.", example: "'b'" }
    ],
    example: "SELECT bpchar_larger('a'::char(1), 'b'::char(1));" 
  },
  { 
    id: "pg_bpchar_smaller", 
    name: "bpchar_smaller", 
    category: "Пользовательские функции", 
    description: "Возвращает меньшее из двух значений bpchar.", 
    syntax: "bpchar_smaller(character, character)",
    arguments: [
      { name: "arg1", description: "Первая строка.", example: "'a'" },
      { name: "arg2", description: "Вторая строка.", example: "'b'" }
    ],
    example: "SELECT bpchar_smaller('a'::char(1), 'b'::char(1));" 
  },
  { 
    id: "pg_char_max_length", 
    name: "_pg_char_max_length", 
    category: "Пользовательские функции", 
    description: "Возвращает максимальную длину для символьного типа данных.", 
    syntax: "_pg_char_max_length(typid oid, typmod integer)",
    arguments: [
      { name: "typid", description: "OID типа данных.", example: "typid => 1043" },
      { name: "typmod", description: "Модификатор типа.", example: "typmod => 10" }
    ],
    example: "SELECT _pg_char_max_length(1043, 10);" 
  },
  { 
    id: "pg_char_octet_length", 
    name: "_pg_char_octet_length", 
    category: "Пользовательские функции", 
    description: "Возвращает максимальную длину в октетах (байтах) для символьного типа данных.", 
    syntax: "_pg_char_octet_length(typid oid, typmod integer)",
    arguments: [
      { name: "typid", description: "OID типа данных.", example: "typid => 1043" },
      { name: "typmod", description: "Модификатор типа.", example: "typmod => 10" }
    ],
    example: "SELECT _pg_char_octet_length(1043, 10);" 
  },
  { 
    id: "pg_datetime_precision", 
    name: "_pg_datetime_precision", 
    category: "Пользовательские функции", 
    description: "Возвращает точность для типов даты и времени.", 
    syntax: "_pg_datetime_precision(typid oid, typmod integer)",
    arguments: [
      { name: "typid", description: "OID типа данных.", example: "typid => 1114" },
      { name: "typmod", description: "Модификатор типа.", example: "typmod => 6" }
    ],
    example: "SELECT _pg_datetime_precision(1114, 6);" 
  },
  { 
    id: "pg_expandarray", 
    name: "_pg_expandarray", 
    category: "Пользовательские функции", 
    description: "Разворачивает массив в набор строк с индексами.", 
    syntax: "_pg_expandarray(anyarray, OUT x anyelement, OUT n integer)",
    arguments: [
      { name: "anyarray", description: "Входной массив любого типа.", example: "ARRAY[1,2,3]" },
      { name: "x", description: "Выходной параметр: значение элемента.", example: "OUT x => 1" },
      { name: "n", description: "Выходной параметр: индекс элемента.", example: "OUT n => 1" }
    ],
    example: "SELECT * FROM _pg_expandarray(ARRAY['a', 'b']);" 
  },
  { 
    id: "pg_index_position", 
    name: "_pg_index_position", 
    category: "Пользовательские функции", 
    description: "Возвращает позицию колонки в индексе.", 
    syntax: "_pg_index_position(oid, smallint)",
    arguments: [
      { name: "oid", description: "OID индекса.", example: "oid => 16385" },
      { name: "smallint", description: "Номер атрибута.", example: "attnum => 1" }
    ],
    example: "SELECT _pg_index_position(16385, 1);" 
  },
  { 
    id: "pg_interval_type", 
    name: "_pg_interval_type", 
    category: "Пользовательские функции", 
    description: "Возвращает тип интервала на основе модификатора.", 
    syntax: "_pg_interval_type(typid oid, mod integer)",
    arguments: [
      { name: "typid", description: "OID типа интервала.", example: "typid => 1186" },
      { name: "mod", description: "Модификатор интервала.", example: "mod => 32767" }
    ],
    example: "SELECT _pg_interval_type(1186, 32767);" 
  },
  { 
    id: "pg_numeric_precision", 
    name: "_pg_numeric_precision", 
    category: "Пользовательские функции", 
    description: "Возвращает точность (precision) для числового типа данных.", 
    syntax: "_pg_numeric_precision(typid oid, typmod integer)",
    arguments: [
      { name: "typid", description: "OID типа данных.", example: "typid => 1700" },
      { name: "typmod", description: "Модификатор типа.", example: "typmod => 655364" }
    ],
    example: "SELECT _pg_numeric_precision(1700, 655364);" 
  },
  { 
    id: "pg_numeric_precision_radix", 
    name: "_pg_numeric_precision_radix", 
    category: "Пользовательские функции", 
    description: "Возвращает основание системы счисления точности для числового типа.", 
    syntax: "_pg_numeric_precision_radix(typid oid, typmod integer)",
    arguments: [
      { name: "typid", description: "OID типа данных.", example: "typid => 1700" },
      { name: "typmod", description: "Модификатор типа.", example: "typmod => 655364" }
    ],
    example: "SELECT _pg_numeric_precision_radix(1700, 655364);" 
  },
  { 
    id: "pg_numeric_scale", 
    name: "_pg_numeric_scale", 
    category: "Пользовательские функции", 
    description: "Возвращает масштаб (scale) для числового типа данных.", 
    syntax: "_pg_numeric_scale(typid oid, typmod integer)",
    arguments: [
      { name: "typid", description: "OID типа данных.", example: "typid => 1700" },
      { name: "typmod", description: "Модификатор типа.", example: "typmod => 655364" }
    ],
    example: "SELECT _pg_numeric_scale(1700, 655364);" 
  },
  { 
    id: "pg_truetypid", 
    name: "_pg_truetypid", 
    category: "Пользовательские функции", 
    description: "Возвращает истинный OID типа данных с учетом доменов.", 
    syntax: "_pg_truetypid(pg_attribute, pg_type)",
    arguments: [
      { name: "pg_attribute", description: "Запись из системного каталога pg_attribute.", example: "attr" },
      { name: "pg_type", description: "Запись из системного каталога pg_type.", example: "typ" }
    ],
    example: "SELECT _pg_truetypid(a, t) FROM pg_attribute a, pg_type t WHERE ...;" 
  },
  { 
    id: "pg_truetypmod", 
    name: "_pg_truetypmod", 
    category: "Пользовательские функции", 
    description: "Возвращает истинный модификатор типа с учетом доменов.", 
    syntax: "_pg_truetypmod(pg_attribute, pg_type)",
    arguments: [
      { name: "pg_attribute", description: "Запись из системного каталога pg_attribute.", example: "attr" },
      { name: "pg_type", description: "Запись из системного каталога pg_type.", example: "typ" }
    ],
    example: "SELECT _pg_truetypmod(a, t) FROM pg_attribute a, pg_type t WHERE ...;" 
  },
  { 
    id: "pg_abbrev_cidr", 
    name: "abbrev", 
    category: "Пользовательские функции", 
    description: "Возвращает сокращенное текстовое представление для типа cidr.", 
    syntax: "abbrev(cidr)",
    arguments: [{ name: "cidr", description: "Сеть в формате CIDR.", example: "'10.1.0.0/16'::cidr" }],
    example: "SELECT abbrev('10.1.0.0/16'::cidr);" 
  },
  { 
    id: "pg_abbrev_inet", 
    name: "abbrev", 
    category: "Пользовательские функции", 
    description: "Возвращает сокращенное текстовое представление для типа inet.", 
    syntax: "abbrev(inet)",
    arguments: [{ name: "inet", description: "IP-адрес или сеть.", example: "'192.168.1.1/24'::inet" }],
    example: "SELECT abbrev('192.168.1.1/24'::inet);" 
  },
  { 
    id: "pg_abs_int", 
    name: "abs", 
    category: "Пользовательские функции", 
    description: "Возвращает абсолютное значение целого числа.", 
    syntax: "abs(integer)",
    arguments: [{ name: "integer", description: "Целое число.", example: "-42" }],
    example: "SELECT abs(-42);" 
  },
  { 
    id: "pg_RI_FKey_cascade_del", 
    name: "RI_FKey_cascade_del", 
    category: "Пользовательские функции", 
    description: "Внутренняя функция триггера для каскадного удаления по внешнему ключу.", 
    syntax: "RI_FKey_cascade_del()",
    arguments: [],
    example: "-- Используется внутренне механизмом ссылочной целостности" 
  },
  { 
    id: "pg_RI_FKey_cascade_upd", 
    name: "RI_FKey_cascade_upd", 
    category: "Пользовательские функции", 
    description: "Внутренняя функция триггера для каскадного обновления по внешнему ключу.", 
    syntax: "RI_FKey_cascade_upd()",
    arguments: [],
    example: "-- Используется внутренне механизмом ссылочной целостности" 
  },
  { 
    id: "pg_RI_FKey_check", 
    name: "RI_FKey_check", 
    category: "Пользовательские функции", 
    description: "Внутренняя функция триггера для проверки ограничений внешнего ключа.", 
    syntax: "RI_FKey_check()",
    arguments: [],
    example: "-- Используется внутренне механизмом ссылочной целостности" 
  },
  { 
    id: "pg_RI_FKey_noaction_del", 
    name: "RI_FKey_noaction_del", 
    category: "Пользовательские функции", 
    description: "Внутренняя функция триггера для реализации NO ACTION при удалении.", 
    syntax: "RI_FKey_noaction_del()",
    arguments: [],
    example: "-- Используется внутренне механизмом ссылочной целостности" 
  },
  { 
    id: "pg_RI_FKey_noaction_upd", 
    name: "RI_FKey_noaction_upd", 
    category: "Пользовательские функции", 
    description: "Внутренняя функция триггера для реализации NO ACTION при обновлении.", 
    syntax: "RI_FKey_noaction_upd()",
    arguments: [],
    example: "-- Используется внутренне механизмом ссылочной целостности" 
  },
  { 
    id: "pg_RI_FKey_restrict_del", 
    name: "RI_FKey_restrict_del", 
    category: "Пользовательские функции", 
    description: "Внутренняя функция триггера для реализации RESTRICT при удалении.", 
    syntax: "RI_FKey_restrict_del()",
    arguments: [],
    example: "-- Используется внутренне механизмом ссылочной целостности" 
  },
  { 
    id: "pg_RI_FKey_restrict_upd", 
    name: "RI_FKey_restrict_upd", 
    category: "Пользовательские функции", 
    description: "Внутренняя функция триггера для реализации RESTRICT при обновлении.", 
    syntax: "RI_FKey_restrict_upd()",
    arguments: [],
    example: "-- Используется внутренне механизмом ссылочной целостности" 
  },
  { 
    id: "pg_RI_FKey_setdefault_del", 
    name: "RI_FKey_setdefault_del", 
    category: "Пользовательские функции", 
    description: "Внутренняя функция триггера для реализации SET DEFAULT при удалении.", 
    syntax: "RI_FKey_setdefault_del()",
    arguments: [],
    example: "-- Используется внутренне механизмом ссылочной целостности" 
  },
  { 
    id: "pg_RI_FKey_setdefault_upd", 
    name: "RI_FKey_setdefault_upd", 
    category: "Пользовательские функции", 
    description: "Внутренняя функция триггера для реализации SET DEFAULT при обновлении.", 
    syntax: "RI_FKey_setdefault_upd()",
    arguments: [],
    example: "-- Используется внутренне механизмом ссылочной целостности" 
  },
  { 
    id: "pg_RI_FKey_setnull_del", 
    name: "RI_FKey_setnull_del", 
    category: "Пользовательские функции", 
    description: "Внутренняя функция триггера для реализации SET NULL при удалении.", 
    syntax: "RI_FKey_setnull_del()",
    arguments: [],
    example: "-- Используется внутренне механизмом ссылочной целостности" 
  },
  { 
    id: "pg_RI_FKey_setnull_upd", 
    name: "RI_FKey_setnull_upd", 
    category: "Пользовательские функции", 
    description: "Внутренняя функция триггера для реализации SET NULL при обновлении.", 
    syntax: "RI_FKey_setnull_upd()",
    arguments: [],
    example: "-- Используется внутренне механизмом ссылочной целостности" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_timestamp", 
    name: "brin_minmax_multi_distance_timestamp", 
    category: "Пользовательские функции", 
    description: "Вычисляет расстояние между значениями timestamp для BRIN multi-range.", 
    syntax: "brin_minmax_multi_distance_timestamp(internal, internal)",
    arguments: [
      { name: "arg1", description: "Первое значение метки времени.", example: "ts1" },
      { name: "arg2", description: "Второе значение метки времени.", example: "ts2" }
    ],
    example: "-- Оптимизация временных диапазонов в BRIN" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_timetz", 
    name: "brin_minmax_multi_distance_timetz", 
    category: "Пользовательские функции", 
    description: "Вычисляет расстояние между значениями timetz для BRIN multi-range.", 
    syntax: "brin_minmax_multi_distance_timetz(internal, internal)",
    arguments: [
      { name: "arg1", description: "Первое значение времени с часовым поясом.", example: "ttz1" },
      { name: "arg2", description: "Второе значение времени с часовым поясом.", example: "ttz2" }
    ],
    example: "-- Используется для кластеризации данных timetz" 
  },
  { 
    id: "pg_brin_minmax_multi_distance_uuid", 
    name: "brin_minmax_multi_distance_uuid", 
    category: "Пользовательские функции", 
    description: "Вычисляет логическое расстояние между UUID для BRIN multi-range.", 
    syntax: "brin_minmax_multi_distance_uuid(internal, internal)",
    arguments: [
      { name: "arg1", description: "Первый UUID.", example: "u1" },
      { name: "arg2", description: "Второе UUID.", example: "u2" }
    ],
    example: "-- Группировка UUID в блоках индекса" 
  },
  { 
    id: "pg_brin_minmax_multi_opcinfo", 
    name: "brin_minmax_multi_opcinfo", 
    category: "Пользовательские функции", 
    description: "Возвращает информацию о классе операторов для BRIN multi-range.", 
    syntax: "brin_minmax_multi_opcinfo(internal)",
    arguments: [{ name: "internal", description: "Внутренний тип.", example: "type_info" }],
    example: "-- Системная функция поддержки индексов" 
  },
  { 
    id: "pg_brin_minmax_multi_options", 
    name: "brin_minmax_multi_options", 
    category: "Пользовательские функции", 
    description: "Обрабатывает параметры (options) для индекса BRIN multi-range.", 
    syntax: "brin_minmax_multi_options(internal)",
    arguments: [{ name: "internal", description: "Указатель на параметры.", example: "reloptions" }],
    example: "-- Вызывается при создании индекса с параметрами" 
  },
  { 
    id: "pg_brin_minmax_multi_summary_in", 
    name: "brin_minmax_multi_summary_in", 
    category: "Пользовательские функции", 
    description: "Функция ввода для сводки BRIN multi-range.", 
    syntax: "brin_minmax_multi_summary_in(cstring)",
    arguments: [{ name: "cstring", description: "Строковое представление сводки.", example: "'...'::cstring" }],
    example: "SELECT brin_minmax_multi_summary_in('...');" 
  },
  { 
    id: "pg_brin_minmax_multi_summary_out", 
    name: "brin_minmax_multi_summary_out", 
    category: "Пользовательские функции", 
    description: "Функция вывода для сводки BRIN multi-range.", 
    syntax: "brin_minmax_multi_summary_out(pg_brin_minmax_multi_summary)",
    arguments: [{ name: "summary", description: "Объект сводки.", example: "summary_data" }],
    example: "SELECT brin_minmax_multi_summary_out(summary);" 
  },
  { 
    id: "pg_brin_minmax_multi_summary_recv", 
    name: "brin_minmax_multi_summary_recv", 
    category: "Пользовательские функции", 
    description: "Прием сводки BRIN multi-range в двоичном формате.", 
    syntax: "brin_minmax_multi_summary_recv(internal)",
    arguments: [{ name: "internal", description: "Двоичный буфер.", example: "buf" }],
    example: "-- Внутреннее использование" 
  },
  {
    id: "pg_get_bit",
    name: "get_bit",
    category: "Пользовательские функции",
    description: "Извлекает бит из строки байтов (bytea) или битовой строки (bit).",
    syntax: "get_bit(bytea, bigint) | get_bit(bit, integer)",
    arguments: [
      { name: "string", description: "Исходная строка (bytea или bit).", example: "E'\\\\000'::bytea" },
      { name: "n", description: "Позиция бита (начиная с 0).", example: "1" }
    ],
    example: "SELECT get_bit(E'\\\\001'::bytea, 7);"
  },
  {
    id: "pg_get_byte",
    name: "get_byte",
    category: "Пользовательские функции",
    description: "Извлекает байт из строки байтов.",
    syntax: "get_byte(bytea, integer)",
    arguments: [
      { name: "string", description: "Строка байтов.", example: "E'\\\\001'::bytea" },
      { name: "offset", description: "Смещение байта.", example: "0" }
    ],
    example: "SELECT get_byte(E'\\\\001'::bytea, 0);"
  },
  {
    id: "pg_get_current_ts_config",
    name: "get_current_ts_config",
    category: "Пользовательские функции",
    description: "Возвращает OID текущей конфигурации полнотекстового поиска.",
    syntax: "get_current_ts_config()",
    arguments: [],
    example: "SELECT get_current_ts_config();"
  },
  {
    id: "pg_getdatabaseencoding",
    name: "getdatabaseencoding",
    category: "Пользовательские функции",
    description: "Возвращает название кодировки текущей базы данных.",
    syntax: "getdatabaseencoding()",
    arguments: [],
    example: "SELECT getdatabaseencoding();"
  },
  {
    id: "pg_getpgusername",
    name: "getpgusername",
    category: "Пользовательские функции",
    description: "Возвращает имя текущего пользователя базы данных.",
    syntax: "getpgusername()",
    arguments: [],
    example: "SELECT getpgusername();"
  },
  {
    id: "pg_gin_clean_pending_list",
    name: "gin_clean_pending_list",
    category: "Пользовательские функции",
    description: "Очищает список ожидающих записей GIN-индекса, перемещая их в основную структуру.",
    syntax: "gin_clean_pending_list(regclass)",
    arguments: [{ name: "index", description: "Имя или OID GIN-индекса.", example: "'my_gin_idx'::regclass" }],
    example: "SELECT gin_clean_pending_list('my_idx');"
  },
  {
    id: "pg_gin_cmp_prefix",
    name: "gin_cmp_prefix",
    category: "Пользовательские функции",
    description: "Функция сравнения префиксов для GIN-индексов.",
    syntax: "gin_cmp_prefix(text, text, smallint, internal)",
    arguments: [
      { name: "prefix", description: "Префикс для поиска.", example: "'pre'" },
      { name: "entry", description: "Запись в индексе.", example: "'prefix'" }
    ],
    example: "-- Используется механизмом GIN"
  },
  {
    id: "pg_gin_cmp_tslexeme",
    name: "gin_cmp_tslexeme",
    category: "Пользовательские функции",
    description: "Сравнение лексем в GIN-индексе для полнотекстового поиска.",
    syntax: "gin_cmp_tslexeme(text, text)",
    arguments: [
      { name: "lex1", description: "Первая лексема.", example: "'cat'" },
      { name: "lex2", description: "Вторая лексема.", example: "'dog'" }
    ],
    example: "SELECT gin_cmp_tslexeme('a', 'b');"
  },
  {
    id: "pg_gin_compare_jsonb",
    name: "gin_compare_jsonb",
    category: "Пользовательские функции",
    description: "Сравнение элементов jsonb для GIN-индекса.",
    syntax: "gin_compare_jsonb(text, text)",
    arguments: [{ name: "internal", description: "Внутренние ключи jsonb.", example: "..." }],
    example: "-- Системная функция для jsonb_ops"
  },
  {
    id: "pg_gin_consistent_jsonb",
    name: "gin_consistent_jsonb",
    category: "Пользовательские функции",
    description: "Проверка соответствия ключей jsonb условию запроса в GIN.",
    syntax: "gin_consistent_jsonb(internal, smallint, jsonb, integer, internal, internal, internal, internal)",
    arguments: [{ name: "check", description: "Массив состояний соответствия ключей.", example: "check_array" }],
    example: "-- Используется при выполнении запросов к jsonb"
  },
  {
    id: "pg_gin_consistent_jsonb_path",
    name: "gin_consistent_jsonb_path",
    category: "Пользовательские функции",
    description: "Проверка соответствия путей jsonb (jsonb_path_ops) в GIN.",
    syntax: "gin_consistent_jsonb_path(internal, smallint, jsonb, integer, internal, internal, internal, internal)",
    arguments: [{ name: "check", description: "Состояния ключей пути.", example: "check_array" }],
    example: "-- Оптимизация поиска по путям в jsonb"
  },
  {
    id: "pg_gin_extract_jsonb",
    name: "gin_extract_jsonb",
    category: "Пользовательские функции",
    description: "Извлекает ключи из jsonb для индексации в GIN.",
    syntax: "gin_extract_jsonb(jsonb, internal, internal)",
    arguments: [{ name: "item", description: "Объект jsonb.", example: "'{\"a\":1}'::jsonb" }],
    example: "-- Вызывается при построении индекса"
  },
  {
    id: "pg_gin_extract_jsonb_path",
    name: "gin_extract_jsonb_path",
    category: "Пользовательские функции",
    description: "Извлекает хэшированные пути из jsonb для jsonb_path_ops.",
    syntax: "gin_extract_jsonb_path(jsonb, internal, internal)",
    arguments: [{ name: "item", description: "Объект jsonb.", example: "'{\"a\":1}'::jsonb" }],
    example: "-- Оптимизировано для операторов @>"
  },
  {
    id: "pg_gin_extract_jsonb_query",
    name: "gin_extract_jsonb_query",
    category: "Пользовательские функции",
    description: "Извлекает ключи из поискового запроса к jsonb для GIN.",
    syntax: "gin_extract_jsonb_query(jsonb, internal, smallint, internal, internal, internal, internal)",
    arguments: [{ name: "query", description: "Запрос jsonb.", example: "'{\"a\":1}'::jsonb" }],
    example: "-- Используется при планировании поиска"
  },
  {
    id: "pg_gin_extract_jsonb_query_path",
    name: "gin_extract_jsonb_query_path",
    category: "Пользовательские функции",
    description: "Извлекает пути из поискового запроса к jsonb для jsonb_path_ops.",
    syntax: "gin_extract_jsonb_query_path(jsonb, internal, smallint, internal, internal, internal, internal)",
    arguments: [{ name: "query", description: "Запрос jsonb.", example: "'{\"a\":1}'::jsonb" }],
    example: "-- Поддержка эффективного поиска по путям"
  },
  {
    id: "pg_gin_extract_tsquery",
    name: "gin_extract_tsquery",
    category: "Пользовательские функции",
    description: "Извлекает лексемы из tsquery или tsvector для поиска в GIN.",
    syntax: "gin_extract_tsquery(query, ...)",
    arguments: [{ name: "query", description: "Поисковый запрос.", example: "to_tsquery('english', 'cat')" }],
    example: "-- Используется в полнотекстовом поиске"
  },
  {
    id: "pg_gin_extract_tsvector",
    name: "gin_extract_tsvector",
    category: "Пользовательские функции",
    description: "Извлекает лексемы из tsvector для индексации в GIN.",
    syntax: "gin_extract_tsvector(tsvector, ...)",
    arguments: [{ name: "vector", description: "Текстовый вектор.", example: "to_tsvector('hello world')" }],
    example: "-- Формирует список ключей индекса"
  },
  {
    id: "pg_gin_triconsistent_jsonb",
    name: "gin_triconsistent_jsonb",
    category: "Пользовательские функции",
    description: "Трехзначная логика проверки соответствия jsonb в GIN (MAYBE/YES/NO).",
    syntax: "gin_triconsistent_jsonb(internal, smallint, jsonb, integer, internal, internal, internal)",
    arguments: [{ name: "check", description: "Состояния ключей.", example: "check_array" }],
    example: "-- Оптимизация для больших наборов данных"
  },
  {
    id: "pg_gin_triconsistent_jsonb_path",
    name: "gin_triconsistent_jsonb_path",
    category: "Пользовательские функции",
    description: "Трехзначная логика для путей jsonb в GIN.",
    syntax: "gin_triconsistent_jsonb_path(internal, smallint, jsonb, integer, internal, internal, internal)",
    arguments: [{ name: "check", description: "Состояния путей.", example: "check_array" }],
    example: "-- Ускоряет фильтрацию по путям"
  },
  {
    id: "pg_gin_tsquery_consistent",
    name: "gin_tsquery_consistent",
    category: "Пользовательские функции",
    description: "Проверка соответствия текстового запроса вектору в GIN.",
    syntax: "gin_tsquery_consistent(internal, smallint, tsquery, integer, internal, internal, internal, internal)",
    arguments: [{ name: "check", description: "Результаты проверки лексем.", example: "check_array" }],
    example: "-- Ядро полнотекстового поиска GIN"
  },
  {
    id: "pg_gin_tsquery_triconsistent",
    name: "gin_tsquery_triconsistent",
    category: "Пользовательские функции",
    description: "Трехзначная логика для полнотекстового поиска в GIN.",
    syntax: "gin_tsquery_triconsistent(internal, smallint, tsvector, integer, internal, internal, internal)",
    arguments: [{ name: "check", description: "Состояния лексем.", example: "check_array" }],
    example: "-- Позволяет избежать полных сканирований"
  },
  {
    id: "pg_ginarrayconsistent",
    name: "ginarrayconsistent",
    category: "Пользовательские функции",
    description: "Проверяет соответствие элементов массива условию запроса в GIN.",
    syntax: "ginarrayconsistent(internal, smallint, anyarray, integer, internal, internal, internal, internal)",
    arguments: [{ name: "check", description: "Состояния элементов.", example: "check_array" }],
    example: "-- Поддержка операторов &&, @>, <@"
  },
  {
    id: "pg_ginarrayextract",
    name: "ginarrayextract",
    category: "Пользовательские функции",
    description: "Извлекает элементы из массива для индексации в GIN.",
    syntax: "ginarrayextract(anyarray, internal, internal)",
    arguments: [{ name: "array", description: "Исходный массив.", example: "ARRAY[1,2,3]" }],
    example: "-- Формирует ключи индекса для массивов"
  },
  {
    id: "pg_ginarraytriconsistent",
    name: "ginarraytriconsistent",
    category: "Пользовательские функции",
    description: "Трехзначная логика для массивов в GIN.",
    syntax: "ginarraytriconsistent(internal, smallint, anyarray, integer, internal, internal, internal)",
    arguments: [{ name: "check", description: "Состояния элементов.", example: "check_array" }],
    example: "-- Оптимизация поиска в больших массивах"
  },
  {
    id: "pg_ginhandler",
    name: "ginhandler",
    category: "Пользовательские функции",
    description: "Обработчик метода доступа GIN.",
    syntax: "ginhandler(internal)",
    arguments: [{ name: "internal", description: "Внутренние параметры.", example: "..." }],
    example: "-- Системная функция регистрации GIN"
  },
  {
    id: "pg_ginqueryarrayextract",
    name: "ginqueryarrayextract",
    category: "Пользовательские функции",
    description: "Извлекает элементы из поискового запроса к массиву для GIN.",
    syntax: "ginqueryarrayextract(anyarray, internal, smallint, internal, internal, internal, internal)",
    arguments: [{ name: "query", description: "Запрос (массив).", example: "ARRAY[1,2]" }],
    example: "-- Подготовка ключей для поиска в массивах"
  },
  {
    id: "pg_gist_box_consistent",
    name: "gist_box_consistent",
    category: "Пользовательские функции",
    description: "Проверяет соответствие прямоугольника (box) условию запроса в GiST.",
    syntax: "gist_box_consistent(internal, box, smallint, oid, internal)",
    arguments: [{ name: "box", description: "Прямоугольник.", example: "'(0,0),(1,1)'::box" }],
    example: "-- Геометрический поиск в GiST"
  },
  {
    id: "pg_gist_box_distance",
    name: "gist_box_distance",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между прямоугольниками для поиска ближайших соседей (KNN) в GiST.",
    syntax: "gist_box_distance(internal, box, smallint, oid, internal)",
    arguments: [{ name: "box", description: "Целевой прямоугольник.", example: "'(0,0),(1,1)'::box" }],
    example: "-- Используется в ORDER BY <-> "
  },
  {
    id: "pg_gist_box_penalty",
    name: "gist_box_penalty",
    category: "Пользовательские функции",
    description: "Вычисляет штраф за включение прямоугольника в узел GiST (увеличение площади).",
    syntax: "gist_box_penalty(internal, internal, internal)",
    arguments: [{ name: "entry", description: "Запись индекса.", example: "..." }],
    example: "-- Определяет оптимальное место для новой записи"
  },
  {
    id: "pg_gist_box_picksplit",
    name: "gist_box_picksplit",
    category: "Пользовательские функции",
    description: "Разделяет набор прямоугольников на две группы при переполнении страницы GiST.",
    syntax: "gist_box_picksplit(internal, internal)",
    arguments: [{ name: "entryvec", description: "Вектор записей.", example: "..." }],
    example: "-- Балансировка дерева GiST"
  },
  {
    id: "pg_gist_box_same",
    name: "gist_box_same",
    category: "Пользовательские функции",
    description: "Проверяет идентичность двух прямоугольников для GiST.",
    syntax: "gist_box_same(box, box, internal)",
    arguments: [
      { name: "b1", description: "Первый прямоугольник.", example: "'(0,0),(1,1)'" },
      { name: "b2", description: "Второй прямоугольник.", example: "'(0,0),(1,1)'" }
    ],
    example: "SELECT gist_box_same('(0,0),(1,1)'::box, '(0,0),(1,1)'::box, NULL);"
  },
  {
    id: "pg_gist_box_union",
    name: "gist_box_union",
    category: "Пользовательские функции",
    description: "Вычисляет объединяющий прямоугольник (bounding box) для набора записей GiST.",
    syntax: "gist_box_union(internal, internal)",
    arguments: [{ name: "entryvec", description: "Вектор записей.", example: "..." }],
    example: "-- Формирует охватывающую границу узла"
  },
  {
    id: "pg_gist_circle_compress",
    name: "gist_circle_compress",
    category: "Пользовательские функции",
    description: "Сжимает окружность (circle) в прямоугольник (box) для хранения в GiST.",
    syntax: "gist_circle_compress(internal)",
    arguments: [{ name: "entry", description: "Запись окружности.", example: "..." }],
    example: "-- Используется для индексации кругов через MBR"
  },
  {
    id: "pg_gist_circle_consistent",
    name: "gist_circle_consistent",
    category: "Пользовательские функции",
    description: "Проверяет соответствие окружности условию запроса в GiST.",
    syntax: "gist_circle_consistent(internal, circle, smallint, oid, internal)",
    arguments: [{ name: "circle", description: "Окружность.", example: "'<(0,0),5>'::circle" }],
    example: "-- Поиск пересекающихся или вложенных окружностей"
  },
  {
    id: "pg_gist_circle_distance",
    name: "gist_circle_distance",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между окружностями для KNN поиска в GiST.",
    syntax: "gist_circle_distance(internal, circle, smallint, oid, internal)",
    arguments: [{ name: "circle", description: "Окружность.", example: "'<(0,0),5>'::circle" }],
    example: "-- Поддержка ORDER BY <-> для окружностей"
  },
  {
    id: "pg_gist_point_compress",
    name: "gist_point_compress",
    category: "Пользовательские функции",
    description: "Подготавливает точку (point) для хранения в GiST.",
    syntax: "gist_point_compress(internal)",
    arguments: [{ name: "entry", description: "Запись точки.", example: "..." }],
    example: "-- Внутренняя обработка точек в GiST"
  },
  {
    id: "pg_gist_point_consistent",
    name: "gist_point_consistent",
    category: "Пользовательские функции",
    description: "Проверка соответствия точки условию запроса в GiST.",
    syntax: "gist_point_consistent(internal)",
    arguments: [{ name: "internal", description: "Внутреннее состояние.", example: "..." }],
    example: "-- Базовая функция поиска точек"
  },
  {
    id: "pg_diagonal",
    name: "diagonal",
    category: "Пользовательские функции",
    description: "Вычисляет длину диагонали прямоугольника (тип box).",
    syntax: "diagonal(box)",
    arguments: [{ name: "box", description: "Прямоугольник.", example: "'(10,10),(0,0)'::box" }],
    example: "SELECT diagonal('(10,10),(0,0)'::box);"
  },
  {
    id: "pg_diameter",
    name: "diameter",
    category: "Пользовательские функции",
    description: "Возвращает диаметр круга (тип circle).",
    syntax: "diameter(circle)",
    arguments: [{ name: "circle", description: "Круг.", example: "'<(5,5),2>'::circle" }],
    example: "SELECT diameter('<(5,5),2>'::circle);"
  },
  {
    id: "pg_dispell_init",
    name: "dispell_init",
    category: "Пользовательские функции",
    description: "Внутренняя функция инициализации для словаря ISpell.",
    syntax: "dispell_init(internal)",
    arguments: [{ name: "internal", description: "Внутреннее состояние.", example: "..." }],
    example: "-- Используется при настройке полнотекстового поиска"
  },
  {
    id: "pg_dispell_lexize",
    name: "dispell_lexize",
    category: "Пользовательские функции",
    description: "Функция лексического анализа для словаря ISpell.",
    syntax: "dispell_lexize(internal, internal, internal, internal)",
    arguments: [
      { name: "dict", description: "Указатель на словарь.", example: "internal" },
      { name: "token", description: "Токен для анализа.", example: "internal" }
    ],
    example: "-- Вызывается механизмом FTS"
  },
  {
    id: "pg_dist_bp",
    name: "dist_bp",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между прямоугольником и точкой.",
    syntax: "dist_bp(box, point)",
    arguments: [
      { name: "box", description: "Прямоугольник.", example: "'(2,2),(0,0)'::box" },
      { name: "point", description: "Точка.", example: "'(3,3)'::point" }
    ],
    example: "SELECT dist_bp('(2,2),(0,0)'::box, '(3,3)'::point);"
  },
  {
    id: "pg_dist_bs",
    name: "dist_bs",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между прямоугольником и отрезком.",
    syntax: "dist_bs(box, lseg)",
    arguments: [
      { name: "box", description: "Прямоугольник.", example: "'(2,2),(0,0)'::box" },
      { name: "lseg", description: "Отрезок.", example: "'[(3,3),(4,4)]'::lseg" }
    ],
    example: "SELECT dist_bs('(2,2),(0,0)'::box, '[(3,3),(4,4)]'::lseg);"
  },
  {
    id: "pg_dist_cpoint",
    name: "dist_cpoint",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между окружностью и точкой.",
    syntax: "dist_cpoint(circle, point)",
    arguments: [
      { name: "circle", description: "Окружность.", example: "'<(0,0),1>'::circle" },
      { name: "point", description: "Точка.", example: "'(2,2)'::point" }
    ],
    example: "SELECT dist_cpoint('<(0,0),1>'::circle, '(2,2)'::point);"
  },
  {
    id: "pg_dist_cpoly",
    name: "dist_cpoly",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между окружностью и многоугольником.",
    syntax: "dist_cpoly(circle, polygon)",
    arguments: [
      { name: "circle", description: "Окружность.", example: "'<(0,0),1>'::circle" },
      { name: "polygon", description: "Многоугольник.", example: "'((2,2),(3,2),(2,3))'::polygon" }
    ],
    example: "SELECT dist_cpoly('<(0,0),1>'::circle, '((2,2),(3,2),(2,3))'::polygon);"
  },
  {
    id: "pg_dist_lp",
    name: "dist_lp",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между бесконечной прямой и точкой.",
    syntax: "dist_lp(line, point)",
    arguments: [
      { name: "line", description: "Прямая.", example: "'{1,-1,0}'::line" },
      { name: "point", description: "Точка.", example: "'(1,2)'::point" }
    ],
    example: "SELECT dist_lp('{1,-1,0}'::line, '(1,2)'::point);"
  },
  {
    id: "pg_dist_ls",
    name: "dist_ls",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между бесконечной прямой и отрезком.",
    syntax: "dist_ls(line, lseg)",
    arguments: [
      { name: "line", description: "Прямая.", example: "'{1,-1,0}'::line" },
      { name: "lseg", description: "Отрезок.", example: "'[(1,2),(3,4)]'::lseg" }
    ],
    example: "SELECT dist_ls('{1,-1,0}'::line, '[(1,2),(3,4)]'::lseg);"
  },
  {
    id: "pg_dist_pathp",
    name: "dist_pathp",
    category: "Пользовательские функции",
    description: "Вычисляет кратчайшее расстояние между контуром (path) и точкой.",
    syntax: "dist_pathp(path, point)",
    arguments: [
      { name: "path", description: "Контур (замкнутый или разомкнутый).", example: "'((0,0),(1,1),(2,0))'::path" },
      { name: "point", description: "Точка.", example: "'(1,0)'::point" }
    ],
    example: "SELECT dist_pathp('((0,0),(1,1),(2,0))'::path, '(1,0)'::point);"
  },
  {
    id: "pg_dist_pb",
    name: "dist_pb",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между точкой и прямоугольником.",
    syntax: "dist_pb(point, box)",
    arguments: [
      { name: "point", description: "Точка.", example: "'(3,3)'::point" },
      { name: "box", description: "Прямоугольник.", example: "'(2,2),(0,0)'::box" }
    ],
    example: "SELECT dist_pb('(3,3)'::point, '(2,2),(0,0)'::box);"
  },
  {
    id: "pg_dist_pc",
    name: "dist_pc",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между точкой и окружностью.",
    syntax: "dist_pc(point, circle)",
    arguments: [
      { name: "point", description: "Точка.", example: "'(2,2)'::point" },
      { name: "circle", description: "Окружность.", example: "'<(0,0),1>'::circle" }
    ],
    example: "SELECT dist_pc('(2,2)'::point, '<(0,0),1>'::circle);"
  },
  {
    id: "pg_dist_pl",
    name: "dist_pl",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между точкой и бесконечной прямой.",
    syntax: "dist_pl(point, line)",
    arguments: [
      { name: "point", description: "Точка.", example: "'(1,2)'::point" },
      { name: "line", description: "Прямая.", example: "'{1,-1,0}'::line" }
    ],
    example: "SELECT dist_pl('(1,2)'::point, '{1,-1,0}'::line);"
  },
  {
    id: "pg_dist_polyc",
    name: "dist_polyc",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между многоугольником и окружностью.",
    syntax: "dist_polyc(polygon, circle)",
    arguments: [
      { name: "polygon", description: "Многоугольник.", example: "'((2,2),(3,2),(2,3))'::polygon" },
      { name: "circle", description: "Окружность.", example: "'<(0,0),1>'::circle" }
    ],
    example: "SELECT dist_polyc('((2,2),(3,2),(2,3))'::polygon, '<(0,0),1>'::circle);"
  },
  {
    id: "pg_dist_polyp",
    name: "dist_polyp",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между многоугольником и точкой.",
    syntax: "dist_polyp(polygon, point)",
    arguments: [
      { name: "polygon", description: "Многоугольник.", example: "'((0,0),(2,0),(1,1))'::polygon" },
      { name: "point", description: "Точка.", example: "'(3,3)'::point" }
    ],
    example: "SELECT dist_polyp('((0,0),(2,0),(1,1))'::polygon, '(3,3)'::point);"
  },
  {
    id: "pg_dist_ppath",
    name: "dist_ppath",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между точкой и контуром.",
    syntax: "dist_ppath(point, path)",
    arguments: [
      { name: "point", description: "Точка.", example: "'(1,0)'::point" },
      { name: "path", description: "Контур.", example: "'((0,0),(1,1),(2,0))'::path" }
    ],
    example: "SELECT dist_ppath('(1,0)'::point, '((0,0),(1,1),(2,0))'::path);"
  },
  {
    id: "pg_dist_ppoly",
    name: "dist_ppoly",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между точкой и многоугольником.",
    syntax: "dist_ppoly(point, polygon)",
    arguments: [
      { name: "point", description: "Точка.", example: "'(3,3)'::point" },
      { name: "polygon", description: "Многоугольник.", example: "'((0,0),(2,0),(1,1))'::polygon" }
    ],
    example: "SELECT dist_ppoly('(3,3)'::point, '((0,0),(2,0),(1,1))'::polygon);"
  },
  {
    id: "pg_dist_ps",
    name: "dist_ps",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между точкой и отрезком.",
    syntax: "dist_ps(point, lseg)",
    arguments: [
      { name: "point", description: "Точка.", example: "'(2,2)'::point" },
      { name: "lseg", description: "Отрезок.", example: "'[(0,0),(1,1)]'::lseg" }
    ],
    example: "SELECT dist_ps('(2,2)'::point, '[(0,0),(1,1)]'::lseg);"
  },
  {
    id: "pg_dist_sb",
    name: "dist_sb",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между отрезком и прямоугольником.",
    syntax: "dist_sb(lseg, box)",
    arguments: [
      { name: "lseg", description: "Отрезок.", example: "'[(3,3),(4,4)]'::lseg" },
      { name: "box", description: "Прямоугольник.", example: "'(2,2),(0,0)'::box" }
    ],
    example: "SELECT dist_sb('[(3,3),(4,4)]'::lseg, '(2,2),(0,0)'::box);"
  },
  {
    id: "pg_dist_sl",
    name: "dist_sl",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между отрезком и бесконечной прямой.",
    syntax: "dist_sl(lseg, line)",
    arguments: [
      { name: "lseg", description: "Отрезок.", example: "'[(1,2),(3,4)]'::lseg" },
      { name: "line", description: "Прямая.", example: "'{1,-1,0}'::line" }
    ],
    example: "SELECT dist_sl('[(1,2),(3,4)]'::lseg, '{1,-1,0}'::line);"
  },
  {
    id: "pg_dist_sp",
    name: "dist_sp",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между отрезком и точкой.",
    syntax: "dist_sp(lseg, point)",
    arguments: [
      { name: "lseg", description: "Отрезок.", example: "'[(0,0),(1,1)]'::lseg" },
      { name: "point", description: "Точка.", example: "'(2,2)'::point" }
    ],
    example: "SELECT dist_sp('[(0,0),(1,1)]'::lseg, '(2,2)'::point);"
  },
  {
    id: "pg_div",
    name: "div",
    category: "Пользовательские функции",
    description: "Возвращает целочисленный результат деления.",
    syntax: "div(numeric, numeric)",
    arguments: [
      { name: "y", description: "Делимое.", example: "25" },
      { name: "x", description: "Делитель.", example: "4" }
    ],
    example: "SELECT div(25, 4); -- Результат: 6"
  },
  {
    id: "pg_dlog1",
    name: "dlog1",
    category: "Пользовательские функции",
    description: "Внутренняя реализация натурального логарифма (ln) для double precision.",
    syntax: "dlog1(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "10.0" }],
    example: "SELECT dlog1(10.0);"
  },
  {
    id: "pg_dlog10",
    name: "dlog10",
    category: "Пользовательские функции",
    description: "Внутренняя реализация десятичного логарифма (log10) для double precision.",
    syntax: "dlog10(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "100.0" }],
    example: "SELECT dlog10(100.0);"
  },
  {
    id: "pg_domain_in",
    name: "domain_in",
    category: "Пользовательские функции",
    description: "Функция ввода для типов данных на базе доменов.",
    syntax: "domain_in(cstring, oid, integer)",
    arguments: [
      { name: "input", description: "Строковое представление значения.", example: "'value'::cstring" },
      { name: "type_oid", description: "OID базового типа.", example: "23" },
      { name: "typmod", description: "Модификатор типа.", example: "-1" }
    ],
    example: "-- Внутренняя функция для обработки доменов"
  },
  {
    id: "pg_domain_recv",
    name: "domain_recv",
    category: "Пользовательские функции",
    description: "Функция приема двоичных данных для типов на базе доменов.",
    syntax: "domain_recv(internal, oid, integer)",
    arguments: [
      { name: "buf", description: "Двоичный буфер.", example: "internal" },
      { name: "type_oid", description: "OID базового типа.", example: "23" },
      { name: "typmod", description: "Модификатор типа.", example: "-1" }
    ],
    example: "-- Используется при передаче данных в двоичном формате"
  },
  {
    id: "pg_dpow",
    name: "dpow",
    category: "Пользовательские функции",
    description: "Возводит число в степень (double precision).",
    syntax: "dpow(double precision, double precision)",
    arguments: [
      { name: "base", description: "Основание.", example: "2.0" },
      { name: "exp", description: "Показатель степени.", example: "3.0" }
    ],
    example: "SELECT dpow(2.0, 3.0); -- Результат: 8.0"
  },
  {
    id: "pg_dround",
    name: "dround",
    category: "Пользовательские функции",
    description: "Округляет число до ближайшего целого (double precision).",
    syntax: "dround(double precision)",
    arguments: [{ name: "x", description: "Число для округления.", example: "42.6" }],
    example: "SELECT dround(42.6); -- Результат: 43.0"
  },
  {
    id: "pg_dsimple_init",
    name: "dsimple_init",
    category: "Пользовательские функции",
    description: "Инициализация простого словаря (simple dictionary) для полнотекстового поиска.",
    syntax: "dsimple_init(internal)",
    arguments: [{ name: "internal", description: "Внутреннее состояние.", example: "..." }],
    example: "-- Используется в конфигурациях FTS"
  },
  {
    id: "pg_dsimple_lexize",
    name: "dsimple_lexize",
    category: "Пользовательские функции",
    description: "Лексический анализ для простого словаря (simple dictionary).",
    syntax: "dsimple_lexize(internal, internal, internal, internal)",
    arguments: [
      { name: "dict", description: "Указатель на словарь.", example: "internal" },
      { name: "token", description: "Токен.", example: "internal" }
    ],
    example: "-- Выполняет поиск стоп-слов в простом словаре"
  },
  {
    id: "pg_dsnowball_init",
    name: "dsnowball_init",
    category: "Пользовательские функции",
    description: "Инициализация словаря Snowball (стеммер) для полнотекстового поиска.",
    syntax: "dsnowball_init(internal)",
    arguments: [{ name: "internal", description: "Внутреннее состояние.", example: "..." }],
    example: "-- Поддержка многоязычного стемминга"
  },
  {
    id: "pg_dsnowball_lexize",
    name: "dsnowball_lexize",
    category: "Пользовательские функции",
    description: "Лексический анализ (стемминг) для словаря Snowball.",
    syntax: "dsnowball_lexize(internal, internal, internal, internal)",
    arguments: [
      { name: "dict", description: "Указатель на словарь.", example: "internal" },
      { name: "token", description: "Слово для обработки.", example: "internal" }
    ],
    example: "-- Извлекает корень слова (стем)"
  },
  {
    id: "pg_dsqrt",
    name: "dsqrt",
    category: "Пользовательские функции",
    description: "Вычисляет квадратный корень (double precision).",
    syntax: "dsqrt(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "16.0" }],
    example: "SELECT dsqrt(16.0); -- Результат: 4.0"
  },
  {
    id: "pg_dsynonym_init",
    name: "dsynonym_init",
    category: "Пользовательские функции",
    description: "Инициализация словаря синонимов для полнотекстового поиска.",
    syntax: "dsynonym_init(internal)",
    arguments: [{ name: "internal", description: "Внутреннее состояние.", example: "..." }],
    example: "-- Загрузка файла синонимов"
  },
  {
    id: "pg_dsynonym_lexize",
    name: "dsynonym_lexize",
    category: "Пользовательские функции",
    description: "Лексический анализ для словаря синонимов.",
    syntax: "dsynonym_lexize(internal, internal, internal, internal)",
    arguments: [
      { name: "dict", description: "Указатель на словарь.", example: "internal" },
      { name: "token", description: "Слово для поиска синонима.", example: "internal" }
    ],
    example: "-- Заменяет слово его синонимом"
  },
  {
    id: "pg_dtrunc",
    name: "dtrunc",
    category: "Пользовательские функции",
    description: "Усекает число, отбрасывая дробную часть (double precision).",
    syntax: "dtrunc(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "42.9" }],
    example: "SELECT dtrunc(42.9); -- Результат: 42.0"
  },
  {
    id: "pg_elem_contained_by_multirange",
    name: "elem_contained_by_multirange",
    category: "Пользовательские функции",
    description: "Проверяет, содержится ли элемент в мультидиапазоне.",
    syntax: "elem_contained_by_multirange(anyelement, anymultirange)",
    arguments: [
      { name: "element", description: "Элемент (например, число или дата).", example: "5" },
      { name: "multirange", description: "Мультидиапазон.", example: "'{[1,10]}'::int4multirange" }
    ],
    example: "SELECT elem_contained_by_multirange(5, '{[1,10]}'::int4multirange);"
  },
  {
    id: "pg_elem_contained_by_range",
    name: "elem_contained_by_range",
    category: "Пользовательские функции",
    description: "Проверяет, содержится ли элемент в заданном диапазоне.",
    syntax: "elem_contained_by_range(anyelement, anyrange)",
    arguments: [
      { name: "element", description: "Элемент.", example: "5" },
      { name: "range", description: "Диапазон.", example: "'[1,10]'::int4range" }
    ],
    example: "SELECT elem_contained_by_range(5, '[1,10]'::int4range);"
  },
  {
    id: "pg_elem_contained_by_range_support",
    name: "elem_contained_by_range_support",
    category: "Пользовательские функции",
    description: "Внутренняя функция поддержки для планировщика при проверке вхождения элемента в диапазон.",
    syntax: "elem_contained_by_range_support(internal)",
    arguments: [{ name: "internal", description: "Внутренний контекст планировщика.", example: "..." }],
    example: "-- Используется оптимизатором запросов"
  },
  {
    id: "pg_encode",
    name: "encode",
    category: "Пользовательские функции",
    description: "Кодирует двоичные данные (bytea) в текстовое представление (hex, escape, base64).",
    syntax: "encode(data bytea, format text)",
    arguments: [
      { name: "data", description: "Двоичные данные.", example: "E'\\\\000'::bytea" },
      { name: "format", description: "Формат кодирования (hex, escape, base64).", example: "'base64'" }
    ],
    example: "SELECT encode(E'abc'::bytea, 'base64');"
  },
  {
    id: "pg_enum_cmp",
    name: "enum_cmp",
    category: "Пользовательские функции",
    description: "Сравнивает два значения перечислимого типа (возвращает -1, 0 или 1).",
    syntax: "enum_cmp(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение enum.", example: "'val1'::my_enum" },
      { name: "arg2", description: "Второе значение enum.", example: "'val2'::my_enum" }
    ],
    example: "SELECT enum_cmp('a'::my_enum, 'b'::my_enum);"
  },
  {
    id: "pg_enum_eq",
    name: "enum_eq",
    category: "Пользовательские функции",
    description: "Проверяет равенство двух значений перечислимого типа.",
    syntax: "enum_eq(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'val1'::my_enum" },
      { name: "arg2", description: "Второе значение.", example: "'val1'::my_enum" }
    ],
    example: "SELECT enum_eq('val1'::my_enum, 'val1'::my_enum);"
  },
  {
    id: "pg_enum_ge",
    name: "enum_ge",
    category: "Пользовательские функции",
    description: "Оператор 'больше или равно' для перечислимых типов.",
    syntax: "enum_ge(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'b'::my_enum" },
      { name: "arg2", description: "Второе значение.", example: "'a'::my_enum" }
    ],
    example: "SELECT enum_ge('b'::my_enum, 'a'::my_enum);"
  },
  {
    id: "pg_enum_gt",
    name: "enum_gt",
    category: "Пользовательские функции",
    description: "Оператор 'больше' для перечислимых типов.",
    syntax: "enum_gt(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'b'::my_enum" },
      { name: "arg2", description: "Второе значение.", example: "'a'::my_enum" }
    ],
    example: "SELECT enum_gt('b'::my_enum, 'a'::my_enum);"
  },
  {
    id: "pg_enum_in",
    name: "enum_in",
    category: "Пользовательские функции",
    description: "Функция ввода для перечислимых типов (преобразует строку в значение enum).",
    syntax: "enum_in(cstring, oid)",
    arguments: [
      { name: "input", description: "Строковое имя значения.", example: "'my_val'::cstring" },
      { name: "type_oid", description: "OID типа enum.", example: "12345" }
    ],
    example: "-- Внутренняя функция преобразования"
  },
  {
    id: "pg_enum_larger",
    name: "enum_larger",
    category: "Пользовательские функции",
    description: "Возвращает большее из двух значений перечислимого типа.",
    syntax: "enum_larger(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'a'::my_enum" },
      { name: "arg2", description: "Второе значение.", example: "'b'::my_enum" }
    ],
    example: "SELECT enum_larger('a'::my_enum, 'b'::my_enum);"
  },
  {
    id: "pg_enum_le",
    name: "enum_le",
    category: "Пользовательские функции",
    description: "Оператор 'меньше или равно' для перечислимых типов.",
    syntax: "enum_le(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'a'::my_enum" },
      { name: "arg2", description: "Второе значение.", example: "'b'::my_enum" }
    ],
    example: "SELECT enum_le('a'::my_enum, 'b'::my_enum);"
  },
  {
    id: "pg_enum_lt",
    name: "enum_lt",
    category: "Пользовательские функции",
    description: "Оператор 'меньше' для перечислимых типов.",
    syntax: "enum_lt(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'a'::my_enum" },
      { name: "arg2", description: "Второе значение.", example: "'b'::my_enum" }
    ],
    example: "SELECT enum_lt('a'::my_enum, 'b'::my_enum);"
  },
  {
    id: "pg_enum_ne",
    name: "enum_ne",
    category: "Пользовательские функции",
    description: "Оператор 'не равно' для перечислимых типов.",
    syntax: "enum_ne(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'a'::my_enum" },
      { name: "arg2", description: "Второе значение.", example: "'b'::my_enum" }
    ],
    example: "SELECT enum_ne('a'::my_enum, 'b'::my_enum);"
  },
  {
    id: "pg_enum_out",
    name: "enum_out",
    category: "Пользовательские функции",
    description: "Функция вывода для перечислимых типов (преобразует значение enum в строку).",
    syntax: "enum_out(anyenum)",
    arguments: [{ name: "enum_val", description: "Значение enum.", example: "'val'::my_enum" }],
    example: "SELECT enum_out('val'::my_enum);"
  },
  {
    id: "pg_enum_smaller",
    name: "enum_smaller",
    category: "Пользовательские функции",
    description: "Возвращает меньшее из двух значений перечислимого типа.",
    syntax: "enum_smaller(anyenum, anyenum)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'a'::my_enum" },
      { name: "arg2", description: "Второе значение.", example: "'b'::my_enum" }
    ],
    example: "SELECT enum_smaller('a'::my_enum, 'b'::my_enum);"
  },
  {
    id: "pg_eqjoinsel",
    name: "eqjoinsel",
    category: "Пользовательские функции",
    description: "Оценивает селективность соединения по равенству (используется планировщиком).",
    syntax: "eqjoinsel(internal, oid, internal, smallint, internal)",
    arguments: [
      { name: "root", description: "Информация о планировщике.", example: "internal" },
      { name: "operator", description: "OID оператора равенства.", example: "96" }
    ],
    example: "-- Внутренняя функция планировщика для оценки стоимости JOIN"
  },
  {
    id: "pg_eqsel",
    name: "eqsel",
    category: "Пользовательские функции",
    description: "Оценивает селективность оператора равенства для условий WHERE.",
    syntax: "eqsel(internal, oid, internal, integer)",
    arguments: [
      { name: "root", description: "Данные планировщика.", example: "internal" },
      { name: "operator", description: "OID оператора.", example: "96" }
    ],
    example: "-- Используется планировщиком для оценки количества строк"
  },
  {
    id: "pg_erf",
    name: "erf",
    category: "Пользовательские функции",
    description: "Вычисляет функцию ошибок (error function).",
    syntax: "erf(double precision)",
    arguments: [{ name: "x", description: "Аргумент функции.", example: "1.0" }],
    example: "SELECT erf(1.0);"
  },
  {
    id: "pg_erfc",
    name: "erfc",
    category: "Пользовательские функции",
    description: "Вычисляет дополняющую функцию ошибок (complementary error function).",
    syntax: "erfc(double precision)",
    arguments: [{ name: "x", description: "Аргумент функции.", example: "1.0" }],
    example: "SELECT erfc(1.0);"
  },
  {
    id: "pg_euc_cn_to_mic",
    name: "euc_cn_to_mic",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_CN в MULE_INTERNAL (MIC).",
    syntax: "euc_cn_to_mic(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src_encoding", description: "Исходная кодировка.", example: "integer" }],
    example: "-- Внутренняя функция перекодирования"
  },
  {
    id: "pg_euc_cn_to_utf8",
    name: "euc_cn_to_utf8",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_CN в UTF8.",
    syntax: "euc_cn_to_utf8(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Исходные данные.", example: "internal" }],
    example: "-- Используется механизмом конвертации кодировок"
  },
  {
    id: "pg_euc_jis_2004_to_shift_jis_2004",
    name: "euc_jis_2004_to_shift_jis_2004",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_JIS_2004 в SHIFT_JIS_2004.",
    syntax: "euc_jis_2004_to_shift_jis_2004(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Внутренняя японская перекодировка"
  },
  {
    id: "pg_euc_jis_2004_to_utf8",
    name: "euc_jis_2004_to_utf8",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_JIS_2004 в UTF8.",
    syntax: "euc_jis_2004_to_utf8(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Конвертация в Unicode"
  },
  {
    id: "pg_euc_jp_to_mic",
    name: "euc_jp_to_mic",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_JP в MIC.",
    syntax: "euc_jp_to_mic(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Системная перекодировка"
  },
  {
    id: "pg_euc_jp_to_sjis",
    name: "euc_jp_to_sjis",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_JP в SJIS.",
    syntax: "euc_jp_to_sjis(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Системная перекодировка"
  },
  {
    id: "pg_euc_jp_to_utf8",
    name: "euc_jp_to_utf8",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_JP в UTF8.",
    syntax: "euc_jp_to_utf8(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Системная перекодировка"
  },
  {
    id: "pg_euc_kr_to_mic",
    name: "euc_kr_to_mic",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_KR в MIC.",
    syntax: "euc_kr_to_mic(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Системная перекодировка"
  },
  {
    id: "pg_euc_kr_to_utf8",
    name: "euc_kr_to_utf8",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_KR в UTF8.",
    syntax: "euc_kr_to_utf8(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Системная перекодировка"
  },
  {
    id: "pg_euc_tw_to_big5",
    name: "euc_tw_to_big5",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_TW в BIG5.",
    syntax: "euc_tw_to_big5(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Системная перекодировка"
  },
  {
    id: "pg_euc_tw_to_mic",
    name: "euc_tw_to_mic",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_TW в MIC.",
    syntax: "euc_tw_to_mic(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Системная перекодировка"
  },
  {
    id: "pg_euc_tw_to_utf8",
    name: "euc_tw_to_utf8",
    category: "Пользовательские функции",
    description: "Преобразование кодировки EUC_TW в UTF8.",
    syntax: "euc_tw_to_utf8(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "src", description: "Данные.", example: "internal" }],
    example: "-- Системная перекодировка"
  },
  {
    id: "pg_event_trigger_in",
    name: "event_trigger_in",
    category: "Пользовательские функции",
    description: "Функция ввода для типа данных event_trigger.",
    syntax: "event_trigger_in(cstring)",
    arguments: [{ name: "input", description: "Имя триггера события.", example: "'my_event_trigger'::cstring" }],
    example: "-- Внутренняя функция для обработки триггеров событий"
  },
  {
    id: "pg_event_trigger_out",
    name: "event_trigger_out",
    category: "Пользовательские функции",
    description: "Функция вывода для типа данных event_trigger.",
    syntax: "event_trigger_out(event_trigger)",
    arguments: [{ name: "trigger", description: "Объект триггера события.", example: "..." }],
    example: "-- Системная функция вывода"
  },
  {
    id: "pg_exp_dp",
    name: "exp",
    name_display: "exp (double precision)",
    category: "Пользовательские функции",
    description: "Вычисляет экспоненту (e в степени x) для double precision.",
    syntax: "exp(double precision)",
    arguments: [{ name: "x", description: "Показатель степени.", example: "1.0" }],
    example: "SELECT exp(1.0); -- Вернет значение числа Эйлера (~2.718)"
  },
  {
    id: "pg_exp_numeric",
    name: "exp",
    name_display: "exp (numeric)",
    category: "Пользовательские функции",
    description: "Вычисляет экспоненту (e в степени x) для типа numeric.",
    syntax: "exp(numeric)",
    arguments: [{ name: "x", description: "Показатель степени.", example: "1.0::numeric" }],
    example: "SELECT exp(1.0::numeric);"
  },
  {
    id: "pg_extract_date",
    name: "extract",
    name_display: "extract (date)",
    category: "Пользовательские функции",
    description: "Извлекает компоненты (год, месяц, день) из даты.",
    syntax: "extract(field text FROM source date)",
    arguments: [
      { name: "field", description: "Поле для извлечения (year, month, day).", example: "'year'" },
      { name: "source", description: "Исходная дата.", example: "CURRENT_DATE" }
    ],
    example: "SELECT extract(year FROM CURRENT_DATE);"
  },
  {
    id: "pg_extract_time",
    name: "extract",
    name_display: "extract (time)",
    category: "Пользовательские функции",
    description: "Извлекает компоненты (час, минута, секунда) из времени без часового пояса.",
    syntax: "extract(field text FROM source time)",
    arguments: [
      { name: "field", description: "Поле (hour, minute, second).", example: "'hour'" },
      { name: "source", description: "Значение времени.", example: "'12:30:00'::time" }
    ],
    example: "SELECT extract(hour FROM '12:30:00'::time);"
  },
  {
    id: "pg_extract_timetz",
    name: "extract",
    name_display: "extract (timetz)",
    category: "Пользовательские функции",
    description: "Извлекает компоненты из времени с часовым поясом.",
    syntax: "extract(field text FROM source timetz)",
    arguments: [
      { name: "field", description: "Поле (hour, minute, timezone).", example: "'timezone'" },
      { name: "source", description: "Время с часовым поясом.", example: "CURRENT_TIME" }
    ],
    example: "SELECT extract(timezone FROM CURRENT_TIME);"
  },
  {
    id: "pg_extract_timestamp",
    name: "extract",
    name_display: "extract (timestamp)",
    category: "Пользовательские функции",
    description: "Извлекает компоненты из метки времени без часового пояса.",
    syntax: "extract(field text FROM source timestamp)",
    arguments: [
      { name: "field", description: "Поле (year, month, day, hour, etc.).", example: "'month'" },
      { name: "source", description: "Метка времени.", example: "now()::timestamp" }
    ],
    example: "SELECT extract(month FROM now()::timestamp);"
  },
  {
    id: "pg_extract_interval",
    name: "extract",
    name_display: "extract (interval)",
    category: "Пользовательские функции",
    description: "Извлекает компоненты из временного интервала.",
    syntax: "extract(field text FROM source interval)",
    arguments: [
      { name: "field", description: "Поле (day, hour, minute).", example: "'day'" },
      { name: "source", description: "Интервал.", example: "'1 day 2 hours'::interval" }
    ],
    example: "SELECT extract(day FROM '1 day 2 hours'::interval);"
  },
  {
    id: "pg_extract_timestamptz",
    name: "extract",
    name_display: "extract (timestamptz)",
    category: "Пользовательские функции",
    description: "Извлекает компоненты из метки времени с часовым поясом.",
    syntax: "extract(field text FROM source timestamptz)",
    arguments: [
      { name: "field", description: "Поле (epoch, year, day, etc.).", example: "'epoch'" },
      { name: "source", description: "Метка времени с поясом.", example: "now()" }
    ],
    example: "SELECT extract(epoch FROM now());"
  },
  {
    id: "pg_factorial",
    name: "factorial",
    category: "Пользовательские функции",
    description: "Вычисляет факториал числа.",
    syntax: "factorial(bigint)",
    arguments: [{ name: "n", description: "Число (bigint).", example: "5" }],
    example: "SELECT factorial(5); -- Результат: 120"
  },
  {
    id: "pg_family",
    name: "family",
    category: "Пользовательские функции",
    description: "Возвращает семейство протокола для сетевого адреса (4 для IPv4, 6 для IPv6).",
    syntax: "family(inet)",
    arguments: [{ name: "address", description: "Сетевой адрес.", example: "'127.0.0.1'::inet" }],
    example: "SELECT family('127.0.0.1'::inet); -- Результат: 4"
  },
  {
    id: "pg_fdw_handler_in",
    name: "fdw_handler_in",
    category: "Пользовательские функции",
    description: "Функция ввода для обработчика сторонних данных (FDW).",
    syntax: "fdw_handler_in(cstring)",
    arguments: [{ name: "input", description: "Имя обработчика.", example: "'postgres_fdw_handler'::cstring" }],
    example: "-- Используется при регистрации FDW"
  },
  {
    id: "pg_fdw_handler_out",
    name: "fdw_handler_out",
    category: "Пользовательские функции",
    description: "Функция вывода для типа fdw_handler.",
    syntax: "fdw_handler_out(fdw_handler)",
    arguments: [{ name: "handler", description: "Объект обработчика.", example: "..." }],
    example: "-- Системная функция вывода"
  },
  {
    id: "pg_float4_int2",
    name: "float4",
    name_display: "float4 (из smallint)",
    category: "Пользовательские функции",
    description: "Преобразует малое целое число (smallint) в число с плавающей точкой.",
    syntax: "float4(smallint)",
    arguments: [{ name: "n", description: "Число smallint.", example: "42::smallint" }],
    example: "SELECT float4(42::smallint);"
  },
  {
    id: "pg_float4_numeric",
    name: "float4",
    name_display: "float4 (из numeric)",
    category: "Пользовательские функции",
    description: "Преобразует число типа numeric в float4.",
    syntax: "float4(numeric)",
    arguments: [{ name: "n", description: "Число numeric.", example: "10.5::numeric" }],
    example: "SELECT float4(10.5::numeric);"
  },
  {
    id: "pg_float4_int4",
    name: "float4",
    name_display: "float4 (из integer)",
    category: "Пользовательские функции",
    description: "Преобразует целое число (integer) в float4.",
    syntax: "float4(integer)",
    arguments: [{ name: "n", description: "Число integer.", example: "100" }],
    example: "SELECT float4(100);"
  },
  {
    id: "pg_float4_jsonb",
    name: "float4",
    name_display: "float4 (из jsonb)",
    category: "Пользовательские функции",
    description: "Извлекает числовое значение из jsonb и преобразует в float4.",
    syntax: "float4(jsonb)",
    arguments: [{ name: "j", description: "JSONB объект/значение.", example: "'1.23'::jsonb" }],
    example: "SELECT float4('1.23'::jsonb);"
  },
  {
    id: "pg_float4_int8",
    name: "float4",
    name_display: "float4 (из bigint)",
    category: "Пользовательские функции",
    description: "Преобразует большое целое число (bigint) в float4.",
    syntax: "float4(bigint)",
    arguments: [{ name: "n", description: "Число bigint.", example: "1000000000::bigint" }],
    example: "SELECT float4(1000000000::bigint);"
  },
  {
    id: "pg_float4_float8",
    name: "float4",
    name_display: "float4 (из double precision)",
    category: "Пользовательские функции",
    description: "Преобразует число двойной точности (float8) в float4.",
    syntax: "float4(double precision)",
    arguments: [{ name: "n", description: "Число double precision.", example: "1.23456789::float8" }],
    example: "SELECT float4(1.23456789::float8);"
  },
  {
    id: "pg_float48div",
    name: "float48div",
    category: "Пользовательские функции",
    description: "Деление числа real (float4) на double precision (float8).",
    syntax: "float48div(real, double precision)",
    arguments: [
      { name: "a", description: "Делимое (real).", example: "10.0::real" },
      { name: "b", description: "Делитель (float8).", example: "2.0::float8" }
    ],
    example: "SELECT float48div(10.0::real, 2.0::float8);"
  },
  {
    id: "pg_float48eq",
    name: "float48eq",
    category: "Пользовательские функции",
    description: "Проверка равенства real и double precision.",
    syntax: "float48eq(real, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "1.0::float8" }
    ],
    example: "SELECT float48eq(1.0::real, 1.0::float8);"
  },
  {
    id: "pg_float48ge",
    name: "float48ge",
    category: "Пользовательские функции",
    description: "Проверка 'больше или равно' для real и double precision.",
    syntax: "float48ge(real, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "2.0::real" },
      { name: "b", description: "Второе число.", example: "1.0::float8" }
    ],
    example: "SELECT float48ge(2.0::real, 1.0::float8);"
  },
  {
    id: "pg_float48gt",
    name: "float48gt",
    category: "Пользовательские функции",
    description: "Проверка 'больше' для real и double precision.",
    syntax: "float48gt(real, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "2.0::real" },
      { name: "b", description: "Второе число.", example: "1.0::float8" }
    ],
    example: "SELECT float48gt(2.0::real, 1.0::float8);"
  },
  {
    id: "pg_float48le",
    name: "float48le",
    category: "Пользовательские функции",
    description: "Проверка 'меньше или равно' для real и double precision.",
    syntax: "float48le(real, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "2.0::float8" }
    ],
    example: "SELECT float48le(1.0::real, 2.0::float8);"
  },
  {
    id: "pg_float48lt",
    name: "float48lt",
    category: "Пользовательские функции",
    description: "Проверка 'меньше' для real и double precision.",
    syntax: "float48lt(real, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "2.0::float8" }
    ],
    example: "SELECT float48lt(1.0::real, 2.0::float8);"
  },
  {
    id: "pg_float48mi",
    name: "float48mi",
    category: "Пользовательские функции",
    description: "Вычитание double precision из real.",
    syntax: "float48mi(real, double precision)",
    arguments: [
      { name: "a", description: "Уменьшаемое.", example: "5.0::real" },
      { name: "b", description: "Вычитаемое.", example: "2.0::float8" }
    ],
    example: "SELECT float48mi(5.0::real, 2.0::float8);"
  },
  {
    id: "pg_float48mul",
    name: "float48mul",
    category: "Пользовательские функции",
    description: "Умножение real на double precision.",
    syntax: "float48mul(real, double precision)",
    arguments: [
      { name: "a", description: "Множитель 1.", example: "2.5::real" },
      { name: "b", description: "Множитель 2.", example: "4.0::float8" }
    ],
    example: "SELECT float48mul(2.5::real, 4.0::float8);"
  },
  {
    id: "pg_float48ne",
    name: "float48ne",
    category: "Пользовательские функции",
    description: "Проверка 'не равно' для real и double precision.",
    syntax: "float48ne(real, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "2.0::float8" }
    ],
    example: "SELECT float48ne(1.0::real, 2.0::float8);"
  },
  {
    id: "pg_float48pl",
    name: "float48pl",
    category: "Пользовательские функции",
    description: "Сложение real и double precision.",
    syntax: "float48pl(real, double precision)",
    arguments: [
      { name: "a", description: "Слагаемое 1.", example: "1.5::real" },
      { name: "b", description: "Слагаемое 2.", example: "2.5::float8" }
    ],
    example: "SELECT float48pl(1.5::real, 2.5::float8);"
  },
  {
    id: "pg_float4_accum",
    name: "float4_accum",
    category: "Пользовательские функции",
    description: "Агрегатная функция накопления для вычисления статистики по числам типа real.",
    syntax: "float4_accum(double precision[], real)",
    arguments: [
      { name: "state", description: "Текущее состояние агрегации (массив).", example: "ARRAY[0,0,0]::double precision[]" },
      { name: "new_val", description: "Новое значение.", example: "1.5::real" }
    ],
    example: "-- Используется внутри агрегатов типа AVG или STDDEV для real"
  },
  {
    id: "pg_float4abs",
    name: "float4abs",
    category: "Пользовательские функции",
    description: "Возвращает абсолютное значение (модуль) числа типа real.",
    syntax: "float4abs(real)",
    arguments: [{ name: "x", description: "Число.", example: "-5.5::real" }],
    example: "SELECT float4abs(-5.5::real); -- Результат: 5.5"
  },
  {
    id: "pg_float4div",
    name: "float4div",
    category: "Пользовательские функции",
    description: "Деление двух чисел типа real.",
    syntax: "float4div(real, real)",
    arguments: [
      { name: "a", description: "Делимое.", example: "10.0::real" },
      { name: "b", description: "Делитель.", example: "2.0::real" }
    ],
    example: "SELECT float4div(10.0::real, 2.0::real);"
  },
  {
    id: "pg_float4eq",
    name: "float4eq",
    category: "Пользовательские функции",
    description: "Оператор равенства для типа real.",
    syntax: "float4eq(real, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "1.0::real" }
    ],
    example: "SELECT float4eq(1.0::real, 1.0::real);"
  },
  {
    id: "pg_float4ge",
    name: "float4ge",
    category: "Пользовательские функции",
    description: "Оператор 'больше или равно' для типа real.",
    syntax: "float4ge(real, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "2.0::real" },
      { name: "b", description: "Второе число.", example: "1.0::real" }
    ],
    example: "SELECT float4ge(2.0::real, 1.0::real);"
  },
  {
    id: "pg_float4gt",
    name: "float4gt",
    category: "Пользовательские функции",
    description: "Оператор 'больше' для типа real.",
    syntax: "float4gt(real, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "2.0::real" },
      { name: "b", description: "Второе число.", example: "1.0::real" }
    ],
    example: "SELECT float4gt(2.0::real, 1.0::real);"
  },
  {
    id: "pg_float4in",
    name: "float4in",
    category: "Пользовательские функции",
    description: "Функция ввода для типа real (преобразование строки в real).",
    syntax: "float4in(cstring)",
    arguments: [{ name: "input", description: "Строковое представление числа.", example: "'1.23'::cstring" }],
    example: "SELECT float4in('1.23');"
  },
  {
    id: "pg_float4larger",
    name: "float4larger",
    category: "Пользовательские функции",
    description: "Возвращает большее из двух чисел типа real.",
    syntax: "float4larger(real, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "2.0::real" }
    ],
    example: "SELECT float4larger(1.0::real, 2.0::real);"
  },
  {
    id: "pg_float4le",
    name: "float4le",
    category: "Пользовательские функции",
    description: "Оператор 'меньше или равно' для типа real.",
    syntax: "float4le(real, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "2.0::real" }
    ],
    example: "SELECT float4le(1.0::real, 2.0::real);"
  },
  {
    id: "pg_float4lt",
    name: "float4lt",
    category: "Пользовательские функции",
    description: "Оператор 'меньше' для типа real.",
    syntax: "float4lt(real, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "2.0::real" }
    ],
    example: "SELECT float4lt(1.0::real, 2.0::real);"
  },
  {
    id: "pg_float4mi",
    name: "float4mi",
    category: "Пользовательские функции",
    description: "Вычитание двух чисел типа real.",
    syntax: "float4mi(real, real)",
    arguments: [
      { name: "a", description: "Уменьшаемое.", example: "5.0::real" },
      { name: "b", description: "Вычитаемое.", example: "2.0::real" }
    ],
    example: "SELECT float4mi(5.0::real, 2.0::real);"
  },
  {
    id: "pg_float4mul",
    name: "float4mul",
    category: "Пользовательские функции",
    description: "Умножение двух чисел типа real.",
    syntax: "float4mul(real, real)",
    arguments: [
      { name: "a", description: "Множитель 1.", example: "2.0::real" },
      { name: "b", description: "Множитель 2.", example: "3.0::real" }
    ],
    example: "SELECT float4mul(2.0::real, 3.0::real);"
  },
  {
    id: "pg_float4ne",
    name: "float4ne",
    category: "Пользовательские функции",
    description: "Оператор 'не равно' для типа real.",
    syntax: "float4ne(real, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "2.0::real" }
    ],
    example: "SELECT float4ne(1.0::real, 2.0::real);"
  },
  {
    id: "pg_float4out",
    name: "float4out",
    category: "Пользовательские функции",
    description: "Функция вывода для типа real (преобразование real в строку).",
    syntax: "float4out(real)",
    arguments: [{ name: "val", description: "Число real.", example: "1.23::real" }],
    example: "SELECT float4out(1.23::real);"
  },
  {
    id: "pg_float4pl",
    name: "float4pl",
    category: "Пользовательские функции",
    description: "Сложение двух чисел типа real.",
    syntax: "float4pl(real, real)",
    arguments: [
      { name: "a", description: "Слагаемое 1.", example: "1.5::real" },
      { name: "b", description: "Слагаемое 2.", example: "2.5::real" }
    ],
    example: "SELECT float4pl(1.5::real, 2.5::real);"
  },
  {
    id: "pg_float4recv",
    name: "float4recv",
    category: "Пользовательские функции",
    description: "Функция приема двоичных данных для типа real.",
    syntax: "float4recv(internal)",
    arguments: [{ name: "buf", description: "Двоичный буфер.", example: "internal" }],
    example: "-- Внутреннее использование"
  },
  {
    id: "pg_float4send",
    name: "float4send",
    category: "Пользовательские функции",
    description: "Функция отправки двоичных данных для типа real.",
    syntax: "float4send(real)",
    arguments: [{ name: "val", description: "Число real.", example: "1.23::real" }],
    example: "-- Внутреннее использование"
  },
  {
    id: "pg_float4smaller",
    name: "float4smaller",
    category: "Пользовательские функции",
    description: "Возвращает меньшее из двух чисел типа real.",
    syntax: "float4smaller(real, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::real" },
      { name: "b", description: "Второе число.", example: "2.0::real" }
    ],
    example: "SELECT float4smaller(1.0::real, 2.0::real);"
  },
  {
    id: "pg_float4um",
    name: "float4um",
    category: "Пользовательские функции",
    description: "Унарный минус для типа real (смена знака).",
    syntax: "float4um(real)",
    arguments: [{ name: "x", description: "Число.", example: "5.0::real" }],
    example: "SELECT float4um(5.0::real); -- Результат: -5.0"
  },
  {
    id: "pg_float4up",
    name: "float4up",
    category: "Пользовательские функции",
    description: "Унарный плюс для типа real.",
    syntax: "float4up(real)",
    arguments: [{ name: "x", description: "Число.", example: "5.0::real" }],
    example: "SELECT float4up(5.0::real); -- Результат: 5.0"
  },
  {
    id: "pg_float8_numeric",
    name: "float8",
    name_display: "float8 (из numeric)",
    category: "Пользовательские функции",
    description: "Преобразует число типа numeric в double precision.",
    syntax: "float8(numeric)",
    arguments: [{ name: "n", description: "Число numeric.", example: "10.5::numeric" }],
    example: "SELECT float8(10.5::numeric);"
  },
  {
    id: "pg_float8_int2",
    name: "float8",
    name_display: "float8 (из smallint)",
    category: "Пользовательские функции",
    description: "Преобразует smallint в double precision.",
    syntax: "float8(smallint)",
    arguments: [{ name: "n", description: "Число smallint.", example: "42::smallint" }],
    example: "SELECT float8(42::smallint);"
  },
  {
    id: "pg_float8_float4",
    name: "float8",
    name_display: "float8 (из real)",
    category: "Пользовательские функции",
    description: "Преобразует real (float4) в double precision.",
    syntax: "float8(real)",
    arguments: [{ name: "n", description: "Число real.", example: "1.23::real" }],
    example: "SELECT float8(1.23::real);"
  },
  {
    id: "pg_float8_jsonb",
    name: "float8",
    name_display: "float8 (из jsonb)",
    category: "Пользовательские функции",
    description: "Извлекает число из jsonb и преобразует в double precision.",
    syntax: "float8(jsonb)",
    arguments: [{ name: "j", description: "JSONB значение.", example: "'1.23'::jsonb" }],
    example: "SELECT float8('1.23'::jsonb);"
  },
  {
    id: "pg_float8_int4",
    name: "float8",
    name_display: "float8 (из integer)",
    category: "Пользовательские функции",
    description: "Преобразует integer в double precision.",
    syntax: "float8(integer)",
    arguments: [{ name: "n", description: "Число integer.", example: "100" }],
    example: "SELECT float8(100);"
  },
  {
    id: "pg_float8_int8",
    name: "float8",
    name_display: "float8 (из bigint)",
    category: "Пользовательские функции",
    description: "Преобразует bigint в double precision.",
    syntax: "float8(bigint)",
    arguments: [{ name: "n", description: "Число bigint.", example: "1000000000::bigint" }],
    example: "SELECT float8(1000000000::bigint);"
  },
  {
    id: "pg_float84div",
    name: "float84div",
    category: "Пользовательские функции",
    description: "Деление double precision на real.",
    syntax: "float84div(double precision, real)",
    arguments: [
      { name: "a", description: "Делимое (float8).", example: "10.0::float8" },
      { name: "b", description: "Делитель (real).", example: "2.0::real" }
    ],
    example: "SELECT float84div(10.0::float8, 2.0::real);"
  },
  {
    id: "pg_float84eq",
    name: "float84eq",
    category: "Пользовательские функции",
    description: "Сравнение на равенство double precision и real.",
    syntax: "float84eq(double precision, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::float8" },
      { name: "b", description: "Второе число.", example: "1.0::real" }
    ],
    example: "SELECT float84eq(1.0::float8, 1.0::real);"
  },
  {
    id: "pg_float84ge",
    name: "float84ge",
    category: "Пользовательские функции",
    description: "Оператор 'больше или равно' для double precision и real.",
    syntax: "float84ge(double precision, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "2.0::float8" },
      { name: "b", description: "Второе число.", example: "1.0::real" }
    ],
    example: "SELECT float84ge(2.0::float8, 1.0::real);"
  },
  {
    id: "pg_float84gt",
    name: "float84gt",
    category: "Пользовательские функции",
    description: "Оператор 'больше' для double precision и real.",
    syntax: "float84gt(double precision, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "2.0::float8" },
      { name: "b", description: "Второе число.", example: "1.0::real" }
    ],
    example: "SELECT float84gt(2.0::float8, 1.0::real);"
  },
  {
    id: "pg_float84le",
    name: "float84le",
    category: "Пользовательские функции",
    description: "Оператор 'меньше или равно' для double precision и real.",
    syntax: "float84le(double precision, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::float8" },
      { name: "b", description: "Второе число.", example: "2.0::real" }
    ],
    example: "SELECT float84le(1.0::float8, 2.0::real);"
  },
  {
    id: "pg_float84lt",
    name: "float84lt",
    category: "Пользовательские функции",
    description: "Оператор 'меньше' для double precision и real.",
    syntax: "float84lt(double precision, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::float8" },
      { name: "b", description: "Второе число.", example: "2.0::real" }
    ],
    example: "SELECT float84lt(1.0::float8, 2.0::real);"
  },
  {
    id: "pg_float84mi",
    name: "float84mi",
    category: "Пользовательские функции",
    description: "Вычитание real из double precision.",
    syntax: "float84mi(double precision, real)",
    arguments: [
      { name: "a", description: "Уменьшаемое.", example: "5.0::float8" },
      { name: "b", description: "Вычитаемое.", example: "2.0::real" }
    ],
    example: "SELECT float84mi(5.0::float8, 2.0::real);"
  },
  {
    id: "pg_float84mul",
    name: "float84mul",
    category: "Пользовательские функции",
    description: "Умножение double precision на real.",
    syntax: "float84mul(double precision, real)",
    arguments: [
      { name: "a", description: "Множитель 1.", example: "2.0::float8" },
      { name: "b", description: "Множитель 2.", example: "3.0::real" }
    ],
    example: "SELECT float84mul(2.0::float8, 3.0::real);"
  },
  {
    id: "pg_float84ne",
    name: "float84ne",
    category: "Пользовательские функции",
    description: "Оператор 'не равно' для double precision и real.",
    syntax: "float84ne(double precision, real)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0::float8" },
      { name: "b", description: "Второе число.", example: "2.0::real" }
    ],
    example: "SELECT float84ne(1.0::float8, 2.0::real);"
  },
  {
    id: "pg_float84pl",
    name: "float84pl",
    category: "Пользовательские функции",
    description: "Сложение double precision и real.",
    syntax: "float84pl(double precision, real)",
    arguments: [
      { name: "a", description: "Слагаемое 1.", example: "1.5::float8" },
      { name: "b", description: "Слагаемое 2.", example: "2.5::real" }
    ],
    example: "SELECT float84pl(1.5::float8, 2.5::real);"
  },
  {
    id: "pg_float8_accum",
    name: "float8_accum",
    category: "Пользовательские функции",
    description: "Агрегатная функция накопления для вычисления статистики по числам типа double precision.",
    syntax: "float8_accum(double precision[], double precision)",
    arguments: [
      { name: "state", description: "Текущее состояние агрегации (массив).", example: "ARRAY[0,0,0]::double precision[]" },
      { name: "new_val", description: "Новое значение.", example: "1.5::float8" }
    ],
    example: "-- Используется внутри агрегатов типа AVG или STDDEV для float8"
  },
  {
    id: "pg_float8_avg",
    name: "float8_avg",
    category: "Пользовательские функции",
    description: "Вычисляет среднее значение на основе накопленного состояния (для double precision).",
    syntax: "float8_avg(double precision[])",
    arguments: [{ name: "state", description: "Состояние агрегации.", example: "ARRAY[10, 5, 50.0]" }],
    example: "-- Внутренняя функция для финального этапа агрегации AVG"
  },
  {
    id: "pg_float8_combine",
    name: "float8_combine",
    category: "Пользовательские функции",
    description: "Объединяет два состояния агрегации для параллельных вычислений (double precision).",
    syntax: "float8_combine(double precision[], double precision[])",
    arguments: [
      { name: "state1", description: "Первое состояние.", example: "ARRAY[...]" },
      { name: "state2", description: "Второе состояние.", example: "ARRAY[...]" }
    ],
    example: "-- Используется для параллельной агрегации"
  },
  {
    id: "pg_float8_corr",
    name: "float8_corr",
    category: "Пользовательские функции",
    description: "Вычисляет коэффициент корреляции на основе накопленного состояния.",
    syntax: "float8_corr(double precision[])",
    arguments: [{ name: "state", description: "Состояние агрегации.", example: "ARRAY[...]" }],
    example: "SELECT float8_corr(state_data);"
  },
  {
    id: "pg_float8_covar_pop",
    name: "float8_covar_pop",
    category: "Пользовательские функции",
    description: "Вычисляет популяционную ковариацию на основе состояния.",
    syntax: "float8_covar_pop(double precision[])",
    arguments: [{ name: "state", description: "Состояние агрегации.", example: "ARRAY[...]" }],
    example: "-- Внутренняя статистическая функция"
  },
  {
    id: "pg_float8_covar_samp",
    name: "float8_covar_samp",
    category: "Пользовательские функции",
    description: "Вычисляет выборочную ковариацию на основе состояния.",
    syntax: "float8_covar_samp(double precision[])",
    arguments: [{ name: "state", description: "Состояние агрегации.", example: "ARRAY[...]" }],
    example: "-- Внутренняя статистическая функция"
  },
  {
    id: "pg_float8_regr_accum",
    name: "float8_regr_accum",
    category: "Пользовательские функции",
    description: "Накапливает состояние для вычисления линейной регрессии.",
    syntax: "float8_regr_accum(double precision[], double precision, double precision)",
    arguments: [
      { name: "state", description: "Текущее состояние.", example: "ARRAY[...]" },
      { name: "new_y", description: "Зависимая переменная.", example: "10.5" },
      { name: "new_x", description: "Независимая переменная.", example: "2.1" }
    ],
    example: "-- Используется агрегатами REGR_*"
  },
  {
    id: "pg_float8_regr_avgx",
    name: "float8_regr_avgx",
    category: "Пользовательские функции",
    description: "Вычисляет среднее значение независимой переменной (x) в регрессии.",
    syntax: "float8_regr_avgx(double precision[])",
    arguments: [{ name: "state", description: "Состояние регрессии.", example: "ARRAY[...]" }],
    example: "-- Финальная функция для REGR_AVGX"
  },
  {
    id: "pg_float8_regr_avgy",
    name: "float8_regr_avgy",
    category: "Пользовательские функции",
    description: "Вычисляет среднее значение зависимой переменной (y) в регрессии.",
    syntax: "float8_regr_avgy(double precision[])",
    arguments: [{ name: "state", description: "Состояние регрессии.", example: "ARRAY[...]" }],
    example: "-- Финальная функция для REGR_AVGY"
  },
  {
    id: "pg_float8_regr_combine",
    name: "float8_regr_combine",
    category: "Пользовательские функции",
    description: "Объединяет два состояния регрессии для параллельных вычислений.",
    syntax: "float8_regr_combine(double precision[], double precision[])",
    arguments: [{ name: "state1", description: "Состояние 1.", example: "..." }],
    example: "-- Параллельная регрессия"
  },
  {
    id: "pg_float8_regr_intercept",
    name: "float8_regr_intercept",
    category: "Пользовательские функции",
    description: "Вычисляет Y-пересечение линии регрессии.",
    syntax: "float8_regr_intercept(double precision[])",
    arguments: [{ name: "state", description: "Состояние регрессии.", example: "..." }],
    example: "-- Финальная функция для REGR_INTERCEPT"
  },
  {
    id: "pg_float8_regr_r2",
    name: "float8_regr_r2",
    category: "Пользовательские функции",
    description: "Вычисляет коэффициент детерминации (R-квадрат).",
    syntax: "float8_regr_r2(double precision[])",
    arguments: [{ name: "state", description: "Состояние регрессии.", example: "..." }],
    example: "-- Финальная функция для REGR_R2"
  },
  {
    id: "pg_float8_regr_slope",
    name: "float8_regr_slope",
    category: "Пользовательские функции",
    description: "Вычисляет наклон линии регрессии.",
    syntax: "float8_regr_slope(double precision[])",
    arguments: [{ name: "state", description: "Состояние регрессии.", example: "..." }],
    example: "-- Финальная функция для REGR_SLOPE"
  },
  {
    id: "pg_float8_regr_sxx",
    name: "float8_regr_sxx",
    category: "Пользовательские функции",
    description: "Вычисляет 'сумму квадратов x'.",
    syntax: "float8_regr_sxx(double precision[])",
    arguments: [{ name: "state", description: "Состояние регрессии.", example: "..." }],
    example: "-- Статистический компонент регрессии"
  },
  {
    id: "pg_float8_regr_sxy",
    name: "float8_regr_sxy",
    category: "Пользовательские функции",
    description: "Вычисляет 'сумму произведений x*y'.",
    syntax: "float8_regr_sxy(double precision[])",
    arguments: [{ name: "state", description: "Состояние регрессии.", example: "..." }],
    example: "-- Статистический компонент регрессии"
  },
  {
    id: "pg_float8_regr_syy",
    name: "float8_regr_syy",
    category: "Пользовательские функции",
    description: "Вычисляет 'сумму квадратов y'.",
    syntax: "float8_regr_syy(double precision[])",
    arguments: [{ name: "state", description: "Состояние регрессии.", example: "..." }],
    example: "-- Статистический компонент регрессии"
  },
  {
    id: "pg_float8_stddev_pop",
    name: "float8_stddev_pop",
    category: "Пользовательские функции",
    description: "Вычисляет популяционное стандартное отклонение.",
    syntax: "float8_stddev_pop(double precision[])",
    arguments: [{ name: "state", description: "Состояние агрегации.", example: "..." }],
    example: "-- Статистика для генеральной совокупности"
  },
  {
    id: "pg_float8_stddev_samp",
    name: "float8_stddev_samp",
    category: "Пользовательские функции",
    description: "Вычисляет выборочное стандартное отклонение.",
    syntax: "float8_stddev_samp(double precision[])",
    arguments: [{ name: "state", description: "Состояние агрегации.", example: "..." }],
    example: "-- Статистика для выборки"
  },
  {
    id: "pg_float8_var_pop",
    name: "float8_var_pop",
    category: "Пользовательские функции",
    description: "Вычисляет популяционную дисперсию.",
    syntax: "float8_var_pop(double precision[])",
    arguments: [{ name: "state", description: "Состояние агрегации.", example: "..." }],
    example: "-- Статистика дисперсии"
  },
  {
    id: "pg_float8_var_samp",
    name: "float8_var_samp",
    category: "Пользовательские функции",
    description: "Вычисляет выборочную дисперсию.",
    syntax: "float8_var_samp(double precision[])",
    arguments: [{ name: "state", description: "Состояние агрегации.", example: "..." }],
    example: "-- Статистика дисперсии для выборки"
  },
  {
    id: "pg_float8abs",
    name: "float8abs",
    category: "Пользовательские функции",
    description: "Возвращает абсолютное значение (модуль) числа типа double precision.",
    syntax: "float8abs(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "-123.45::float8" }],
    example: "SELECT float8abs(-123.45::float8); -- Результат: 123.45"
  },
  {
    id: "pg_float8div",
    name: "float8div",
    category: "Пользовательские функции",
    description: "Деление двух чисел типа double precision.",
    syntax: "float8div(double precision, double precision)",
    arguments: [
      { name: "a", description: "Делимое.", example: "10.0" },
      { name: "b", description: "Делитель.", example: "2.0" }
    ],
    example: "SELECT float8div(10.0, 2.0);"
  },
  {
    id: "pg_float8eq",
    name: "float8eq",
    category: "Пользовательские функции",
    description: "Оператор равенства для типа double precision.",
    syntax: "float8eq(double precision, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0" },
      { name: "b", description: "Второе число.", example: "1.0" }
    ],
    example: "SELECT float8eq(1.0, 1.0);"
  },
  {
    id: "pg_float8ge",
    name: "float8ge",
    category: "Пользовательские функции",
    description: "Оператор 'больше или равно' для типа double precision.",
    syntax: "float8ge(double precision, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "2.0" },
      { name: "b", description: "Второе число.", example: "1.0" }
    ],
    example: "SELECT float8ge(2.0, 1.0);"
  },
  {
    id: "pg_float8gt",
    name: "float8gt",
    category: "Пользовательские функции",
    description: "Оператор 'больше' для типа double precision.",
    syntax: "float8gt(double precision, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "2.0" },
      { name: "b", description: "Второе число.", example: "1.0" }
    ],
    example: "SELECT float8gt(2.0, 1.0);"
  },
  {
    id: "pg_float8in",
    name: "float8in",
    category: "Пользовательские функции",
    description: "Функция ввода для типа double precision (преобразование строки в float8).",
    syntax: "float8in(cstring)",
    arguments: [{ name: "input", description: "Строковое представление числа.", example: "'3.14'::cstring" }],
    example: "SELECT float8in('3.14');"
  },
  {
    id: "pg_float8larger",
    name: "float8larger",
    category: "Пользовательские функции",
    description: "Возвращает большее из двух чисел типа double precision.",
    syntax: "float8larger(double precision, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0" },
      { name: "b", description: "Второе число.", example: "2.0" }
    ],
    example: "SELECT float8larger(1.0, 2.0);"
  },
  {
    id: "pg_float8le",
    name: "float8le",
    category: "Пользовательские функции",
    description: "Оператор 'меньше или равно' для типа double precision.",
    syntax: "float8le(double precision, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0" },
      { name: "b", description: "Второе число.", example: "2.0" }
    ],
    example: "SELECT float8le(1.0, 2.0);"
  },
  {
    id: "pg_float8lt",
    name: "float8lt",
    category: "Пользовательские функции",
    description: "Оператор 'меньше' для типа double precision.",
    syntax: "float8lt(double precision, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0" },
      { name: "b", description: "Второе число.", example: "2.0" }
    ],
    example: "SELECT float8lt(1.0, 2.0);"
  },
  {
    id: "pg_float8mi",
    name: "float8mi",
    category: "Пользовательские функции",
    description: "Вычитание двух чисел типа double precision.",
    syntax: "float8mi(double precision, double precision)",
    arguments: [
      { name: "a", description: "Уменьшаемое.", example: "10.0" },
      { name: "b", description: "Вычитаемое.", example: "3.0" }
    ],
    example: "SELECT float8mi(10.0, 3.0);"
  },
  {
    id: "pg_float8mul",
    name: "float8mul",
    category: "Пользовательские функции",
    description: "Умножение двух чисел типа double precision.",
    syntax: "float8mul(double precision, double precision)",
    arguments: [
      { name: "a", description: "Множитель 1.", example: "2.0" },
      { name: "b", description: "Множитель 2.", example: "4.0" }
    ],
    example: "SELECT float8mul(2.0, 4.0);"
  },
  {
    id: "pg_float8ne",
    name: "float8ne",
    category: "Пользовательские функции",
    description: "Оператор 'не равно' для типа double precision.",
    syntax: "float8ne(double precision, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0" },
      { name: "b", description: "Второе число.", example: "2.0" }
    ],
    example: "SELECT float8ne(1.0, 2.0);"
  },
  {
    id: "pg_float8out",
    name: "float8out",
    category: "Пользовательские функции",
    description: "Функция вывода для типа double precision (преобразование в строку).",
    syntax: "float8out(double precision)",
    arguments: [{ name: "val", description: "Число float8.", example: "1.23" }],
    example: "SELECT float8out(1.23);"
  },
  {
    id: "pg_float8pl",
    name: "float8pl",
    category: "Пользовательские функции",
    description: "Сложение двух чисел типа double precision.",
    syntax: "float8pl(double precision, double precision)",
    arguments: [
      { name: "a", description: "Слагаемое 1.", example: "1.5" },
      { name: "b", description: "Слагаемое 2.", example: "2.5" }
    ],
    example: "SELECT float8pl(1.5, 2.5);"
  },
  {
    id: "pg_float8recv",
    name: "float8recv",
    category: "Пользовательские функции",
    description: "Функция приема двоичных данных для типа double precision.",
    syntax: "float8recv(internal)",
    arguments: [{ name: "buf", description: "Двоичный буфер.", example: "internal" }],
    example: "-- Внутреннее использование"
  },
  {
    id: "pg_float8send",
    name: "float8send",
    category: "Пользовательские функции",
    description: "Функция отправки двоичных данных для типа double precision.",
    syntax: "float8send(double precision)",
    arguments: [{ name: "val", description: "Число float8.", example: "1.23" }],
    example: "-- Внутреннее использование"
  },
  {
    id: "pg_float8smaller",
    name: "float8smaller",
    category: "Пользовательские функции",
    description: "Возвращает меньшее из двух чисел типа double precision.",
    syntax: "float8smaller(double precision, double precision)",
    arguments: [
      { name: "a", description: "Первое число.", example: "1.0" },
      { name: "b", description: "Второе число.", example: "2.0" }
    ],
    example: "SELECT float8smaller(1.0, 2.0);"
  },
  {
    id: "pg_float8um",
    name: "float8um",
    category: "Пользовательские функции",
    description: "Унарный минус для типа double precision.",
    syntax: "float8um(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "5.0" }],
    example: "SELECT float8um(5.0); -- Результат: -5.0"
  },
  {
    id: "pg_float8up",
    name: "float8up",
    category: "Пользовательские функции",
    description: "Унарный плюс для типа double precision.",
    syntax: "float8up(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "5.0" }],
    example: "SELECT float8up(5.0); -- Результат: 5.0"
  },
  {
    id: "pg_floor_numeric",
    name: "floor",
    name_display: "floor (numeric)",
    category: "Пользовательские функции",
    description: "Возвращает ближайшее целое число, меньшее или равное аргументу (для numeric).",
    syntax: "floor(numeric)",
    arguments: [{ name: "n", description: "Число numeric.", example: "3.9" }],
    example: "SELECT floor(3.9); -- Результат: 3"
  },
  {
    id: "pg_floor_float8",
    name: "floor",
    name_display: "floor (double precision)",
    category: "Пользовательские функции",
    description: "Возвращает ближайшее целое число, меньшее или равное аргументу (для double precision).",
    syntax: "floor(double precision)",
    arguments: [{ name: "n", description: "Число с плавающей точкой.", example: "3.9" }],
    example: "SELECT floor(3.9::float8); -- Результат: 3"
  },
  {
    id: "pg_flt4_mul_cash",
    name: "flt4_mul_cash",
    category: "Пользовательские функции",
    description: "Умножение числа типа real на денежную сумму (money).",
    syntax: "flt4_mul_cash(real, money)",
    arguments: [
      { name: "multiplier", description: "Множитель (real).", example: "2.5::real" },
      { name: "amount", description: "Сумма денег.", example: "10.00::money" }
    ],
    example: "SELECT flt4_mul_cash(2.5::real, 10.00::money);"
  },
  {
    id: "pg_flt8_mul_cash",
    name: "flt8_mul_cash",
    category: "Пользовательские функции",
    description: "Умножение числа типа double precision на денежную сумму (money).",
    syntax: "flt8_mul_cash(double precision, money)",
    arguments: [
      { name: "multiplier", description: "Множитель (float8).", example: "2.5" },
      { name: "amount", description: "Сумма денег.", example: "10.00::money" }
    ],
    example: "SELECT flt8_mul_cash(2.5, 10.00::money);"
  },
  {
    id: "pg_fmgr_c_validator",
    name: "fmgr_c_validator",
    category: "Пользовательские функции",
    description: "Функция-валидатор для функций, написанных на языке C.",
    syntax: "fmgr_c_validator(oid)",
    arguments: [{ name: "foid", description: "OID функции.", example: "1234::oid" }],
    example: "-- Используется внутри системного каталога"
  },
  {
    id: "pg_fmgr_internal_validator",
    name: "fmgr_internal_validator",
    category: "Пользовательские функции",
    description: "Функция-валидатор для встроенных (internal) функций.",
    syntax: "fmgr_internal_validator(oid)",
    arguments: [{ name: "foid", description: "OID функции.", example: "1234::oid" }],
    example: "-- Используется внутри системного каталога"
  },
  {
    id: "pg_fmgr_sql_validator",
    name: "fmgr_sql_validator",
    category: "Пользовательские функции",
    description: "Функция-валидатор для функций, написанных на языке SQL.",
    syntax: "fmgr_sql_validator(oid)",
    arguments: [{ name: "foid", description: "OID функции.", example: "1234::oid" }],
    example: "-- Используется внутри системного каталога"
  },
  {
    id: "pg_format_simple",
    name: "format",
    name_display: "format (text)",
    category: "Пользовательские функции",
    description: "Форматирует строку в соответствии со спецификаторами.",
    syntax: "format(text)",
    arguments: [{ name: "format_str", description: "Строка формата.", example: "'Hello'" }],
    example: "SELECT format('Hello');"
  },
  {
    id: "pg_format_variadic",
    name: "format",
    name_display: "format (variadic)",
    category: "Пользовательские функции",
    description: "Форматирует строку, заменяя спецификаторы (%s, %I, %L) значениями аргументов.",
    syntax: "format(text, VARIADIC \"any\")",
    arguments: [
      { name: "format_str", description: "Строка формата с плейсхолдерами.", example: "'Hello, %s!'" },
      { name: "args", description: "Список аргументов.", example: "'World'" }
    ],
    example: "SELECT format('Hello, %s!', 'World'); -- Результат: Hello, World!"
  },
  {
    id: "pg_format_type",
    name: "format_type",
    category: "Пользовательские функции",
    description: "Возвращает SQL-имя типа данных по его OID и модификатору.",
    syntax: "format_type(oid, integer)",
    arguments: [
      { name: "type_oid", description: "OID типа.", example: "23" },
      { name: "typemod", description: "Модификатор типа (-1 если нет).", example: "-1" }
    ],
    example: "SELECT format_type(23, -1); -- Результат: integer"
  },
  {
    id: "pg_gamma",
    name: "gamma",
    category: "Пользовательские функции",
    description: "Вычисляет гамма-функцию (Γ) для заданного числа.",
    syntax: "gamma(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "5.0" }],
    example: "SELECT gamma(5.0); -- Результат: 24 (факториал 4)"
  },
  {
    id: "pg_gb18030_to_utf8",
    name: "gb18030_to_utf8",
    category: "Пользовательские функции",
    description: "Внутренняя функция преобразования кодировки GB18030 в UTF8.",
    syntax: "gb18030_to_utf8(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "args", description: "Системные параметры конвертации.", example: "..." }],
    example: "-- Используется механизмом CONVERSION"
  },
  {
    id: "pg_gbk_to_utf8",
    name: "gbk_to_utf8",
    category: "Пользовательские функции",
    description: "Внутренняя функция преобразования кодировки GBK в UTF8.",
    syntax: "gbk_to_utf8(integer, integer, cstring, internal, integer, boolean)",
    arguments: [{ name: "args", description: "Системные параметры конвертации.", example: "..." }],
    example: "-- Используется механизмом CONVERSION"
  },
  {
    id: "pg_gcd_numeric",
    name: "gcd",
    name_display: "gcd (numeric)",
    category: "Пользовательские функции",
    description: "Вычисляет наибольший общий делитель (НОД) двух чисел (numeric).",
    syntax: "gcd(numeric, numeric)",
    arguments: [
      { name: "a", description: "Первое число.", example: "12" },
      { name: "b", description: "Второе число.", example: "18" }
    ],
    example: "SELECT gcd(12::numeric, 18::numeric); -- Результат: 6"
  },
  {
    id: "pg_gcd_int8",
    name: "gcd",
    name_display: "gcd (bigint)",
    category: "Пользовательские функции",
    description: "Вычисляет наибольший общий делитель (НОД) двух чисел (bigint).",
    syntax: "gcd(bigint, bigint)",
    arguments: [
      { name: "a", description: "Первое число.", example: "12" },
      { name: "b", description: "Второе число.", example: "18" }
    ],
    example: "SELECT gcd(12::bigint, 18::bigint); -- Результат: 6"
  },
  {
    id: "pg_gcd_int4",
    name: "gcd",
    name_display: "gcd (integer)",
    category: "Пользовательские функции",
    description: "Вычисляет наибольший общий делитель (НОД) двух чисел (integer).",
    syntax: "gcd(integer, integer)",
    arguments: [
      { name: "a", description: "Первое число.", example: "12" },
      { name: "b", description: "Второе число.", example: "18" }
    ],
    example: "SELECT gcd(12, 18); -- Результат: 6"
  },
  {
    id: "pg_gen_random_uuid",
    name: "gen_random_uuid",
    category: "Пользовательские функции",
    description: "Генерирует случайный UUID (версии 4).",
    syntax: "gen_random_uuid()",
    arguments: [],
    example: "SELECT gen_random_uuid();"
  },
  {
    id: "pg_generate_series_timestamptz",
    name: "generate_series",
    name_display: "generate_series (timestamptz)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность меток времени с часовым поясом.",
    syntax: "generate_series(timestamp with time zone, timestamp with time zone, interval)",
    arguments: [
      { name: "start", description: "Начало.", example: "'2023-01-01'::timestamptz" },
      { name: "stop", description: "Конец.", example: "'2023-01-02'::timestamptz" },
      { name: "step", description: "Шаг (интервал).", example: "'6 hours'::interval" }
    ],
    example: "SELECT generate_series('2023-01-01'::timestamptz, '2023-01-02'::timestamptz, '6 hours'::interval);"
  },
  {
    id: "pg_generate_series_int8_step",
    name: "generate_series",
    name_display: "generate_series (bigint, шаг)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность чисел bigint с заданным шагом.",
    syntax: "generate_series(bigint, bigint, bigint)",
    arguments: [
      { name: "start", description: "Начало.", example: "1" },
      { name: "stop", description: "Конец.", example: "10" },
      { name: "step", description: "Шаг.", example: "2" }
    ],
    example: "SELECT generate_series(1::bigint, 10::bigint, 2::bigint);"
  },
  {
    id: "pg_generate_series_int4",
    name: "generate_series",
    name_display: "generate_series (integer)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность целых чисел от start до stop с шагом 1.",
    syntax: "generate_series(integer, integer)",
    arguments: [
      { name: "start", description: "Начало.", example: "1" },
      { name: "stop", description: "Конец.", example: "5" }
    ],
    example: "SELECT generate_series(1, 5);"
  },
  {
    id: "pg_generate_series_int8",
    name: "generate_series",
    name_display: "generate_series (bigint)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность чисел bigint от start до stop с шагом 1.",
    syntax: "generate_series(bigint, bigint)",
    arguments: [
      { name: "start", description: "Начало.", example: "1" },
      { name: "stop", description: "Конец.", example: "5" }
    ],
    example: "SELECT generate_series(1::bigint, 5::bigint);"
  },
  {
    id: "pg_generate_series_int4_step",
    name: "generate_series",
    name_display: "generate_series (integer, шаг)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность целых чисел с заданным шагом.",
    syntax: "generate_series(integer, integer, integer)",
    arguments: [
      { name: "start", description: "Начало.", example: "1" },
      { name: "stop", description: "Конец.", example: "10" },
      { name: "step", description: "Шаг.", example: "3" }
    ],
    example: "SELECT generate_series(1, 10, 3);"
  },
  {
    id: "pg_generate_series_timestamp",
    name: "generate_series",
    name_display: "generate_series (timestamp)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность меток времени без часового пояса.",
    syntax: "generate_series(timestamp without time zone, timestamp without time zone, interval)",
    arguments: [
      { name: "start", description: "Начало.", example: "'2023-01-01'::timestamp" },
      { name: "stop", description: "Конец.", example: "'2023-01-02'::timestamp" },
      { name: "step", description: "Шаг.", example: "'12 hours'::interval" }
    ],
    example: "SELECT generate_series('2023-01-01'::timestamp, '2023-01-02'::timestamp, '12 hours'::interval);"
  },
  {
    id: "pg_generate_series_numeric_step",
    name: "generate_series",
    name_display: "generate_series (numeric, шаг)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность чисел numeric с заданным шагом.",
    syntax: "generate_series(numeric, numeric, numeric)",
    arguments: [
      { name: "start", description: "Начало.", example: "1.0" },
      { name: "stop", description: "Конец.", example: "2.0" },
      { name: "step", description: "Шаг.", example: "0.2" }
    ],
    example: "SELECT generate_series(1.0::numeric, 2.0::numeric, 0.2::numeric);"
  },
  {
    id: "pg_generate_series_numeric",
    name: "generate_series",
    name_display: "generate_series (numeric)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность чисел numeric от start до stop с шагом 1.",
    syntax: "generate_series(numeric, numeric)",
    arguments: [
      { name: "start", description: "Начало.", example: "1" },
      { name: "stop", description: "Конец.", example: "3" }
    ],
    example: "SELECT generate_series(1::numeric, 3::numeric);"
  },
  {
    id: "pg_generate_series_timestamptz_text",
    name: "generate_series",
    name_display: "generate_series (timestamptz, часовой пояс)",
    category: "Пользовательские функции",
    description: "Генерирует последовательность меток времени с учетом конкретного часового пояса.",
    syntax: "generate_series(timestamp with time zone, timestamp with time zone, interval, text)",
    arguments: [
      { name: "start", description: "Начало.", example: "'2023-01-01'" },
      { name: "stop", description: "Конец.", example: "'2023-01-02'" },
      { name: "step", description: "Шаг.", example: "'1 day'" },
      { name: "timezone", description: "Название часового пояса.", example: "'Europe/Moscow'" }
    ],
    example: "SELECT generate_series('2023-01-01'::timestamptz, '2023-01-02'::timestamptz, '1 day'::interval, 'Europe/Moscow');"
  },
  {
    id: "pg_generate_series_int4_support",
    name: "generate_series_int4_support",
    category: "Пользовательские функции",
    description: "Функция поддержки планировщика для generate_series(int4).",
    syntax: "generate_series_int4_support(internal)",
    arguments: [],
    example: "-- Внутренняя системная функция"
  },
  {
    id: "pg_generate_series_int8_support",
    name: "generate_series_int8_support",
    category: "Пользовательские функции",
    description: "Функция поддержки планировщика для generate_series(int8).",
    syntax: "generate_series_int8_support(internal)",
    arguments: [],
    example: "-- Внутренняя системная функция"
  },
  {
    id: "pg_generate_series_numeric_support",
    name: "generate_series_numeric_support",
    category: "Пользовательские функции",
    description: "Функция поддержки планировщика для generate_series(numeric).",
    syntax: "generate_series_numeric_support(internal)",
    arguments: [],
    example: "-- Внутренняя системная функция"
  },
  {
    id: "pg_generate_series_timestamp_support",
    name: "generate_series_timestamp_support",
    category: "Пользовательские функции",
    description: "Функция поддержки планировщика для generate_series(timestamp).",
    syntax: "generate_series_timestamp_support(internal)",
    arguments: [],
    example: "-- Внутренняя системная функция"
  },
  {
    id: "pg_generate_subscripts",
    name: "generate_subscripts",
    name_display: "generate_subscripts (индексы массива)",
    category: "Пользовательские функции",
    description: "Генерирует набор индексов для указанной размерности массива.",
    syntax: "generate_subscripts(anyarray, integer)",
    arguments: [
      { name: "array", description: "Массив.", example: "ARRAY[10, 20, 30]" },
      { name: "dim", description: "Размерность (обычно 1).", example: "1" }
    ],
    example: "SELECT generate_subscripts(ARRAY[10, 20, 30], 1); -- Результат: 1, 2, 3"
  },
  {
    id: "pg_generate_subscripts_reverse",
    name: "generate_subscripts",
    name_display: "generate_subscripts (обратный порядок)",
    category: "Пользовательские функции",
    description: "Генерирует набор индексов для массива, возможно в обратном порядке.",
    syntax: "generate_subscripts(anyarray, integer, boolean)",
    arguments: [
      { name: "array", description: "Массив.", example: "ARRAY[10, 20, 30]" },
      { name: "dim", description: "Размерность.", example: "1" },
      { name: "reverse", description: "Флаг обратного порядка.", example: "true" }
    ],
    example: "SELECT generate_subscripts(ARRAY[10, 20, 30], 1, true); -- Результат: 3, 2, 1"
  },
  {
    id: "pg_enum_first",
    name: "enum_first",
    category: "Пользовательские функции",
    description: "Возвращает первое значение перечислимого типа (enum).",
    syntax: "enum_first(anyenum)",
    arguments: [{ name: "enum_val", description: "Значение перечислимого типа.", example: "NULL::my_enum" }],
    example: "SELECT enum_first(NULL::my_enum);"
  },
  {
    id: "pg_enum_last",
    name: "enum_last",
    category: "Пользовательские функции",
    description: "Возвращает последнее значение перечислимого типа (enum).",
    syntax: "enum_last(anyenum)",
    arguments: [{ name: "enum_val", description: "Значение перечислимого типа.", example: "NULL::my_enum" }],
    example: "SELECT enum_last(NULL::my_enum);"
  },
  {
    id: "pg_enum_range",
    name: "enum_range",
    category: "Пользовательские функции",
    description: "Возвращает все значения перечислимого типа в виде массива.",
    syntax: "enum_range(anyenum)",
    arguments: [{ name: "enum_val", description: "Значение перечислимого типа.", example: "NULL::my_enum" }],
    example: "SELECT enum_range(NULL::my_enum);"
  },
  {
    id: "pg_enum_range_bounds",
    name: "enum_range",
    name_display: "enum_range (с границами)",
    category: "Пользовательские функции",
    description: "Возвращает диапазон значений перечислимого типа между двумя заданными элементами.",
    syntax: "enum_range(anyenum, anyenum)",
    arguments: [
      { name: "start", description: "Начальное значение (может быть NULL).", example: "'low'::my_enum" },
      { name: "end", description: "Конечное значение (может быть NULL).", example: "'high'::my_enum" }
    ],
    example: "SELECT enum_range('low'::my_enum, 'high'::my_enum);"
  },
  {
    id: "pg_enum_recv",
    name: "enum_recv",
    category: "Пользовательские функции",
    description: "Функция приема двоичных данных для перечислимых типов (enum).",
    syntax: "enum_recv(internal, oid)",
    arguments: [
      { name: "buf", description: "Двоичный буфер.", example: "internal" },
      { name: "type_oid", description: "OID типа enum.", example: "12345" }
    ],
    example: "-- Внутреннее использование при передаче данных"
  },
  {
    id: "pg_enum_send",
    name: "enum_send",
    category: "Пользовательские функции",
    description: "Функция отправки двоичных данных для перечислимых типов (enum).",
    syntax: "enum_send(anyenum)",
    arguments: [{ name: "enum_val", description: "Значение enum.", example: "'val'::my_enum" }],
    example: "-- Внутреннее использование"
  },
  {
    id: "pg_equipment_id",
    name: "equipment_id",
    category: "Пользовательские функции",
    description: "Пример пользовательской функции для получения идентификатора оборудования (зависит от схемы).",
    syntax: "equipment_id(text)",
    arguments: [{ name: "name", description: "Наименование оборудования.", example: "'Sensor_01'" }],
    example: "SELECT equipment_id('Sensor_01');"
  },
  {
    id: "pg_domain_in",
    name: "domain_in",
    category: "Пользовательские функции",
    description: "Функция ввода для типов данных на базе доменов.",
    syntax: "domain_in(cstring, oid, integer)",
    arguments: [
      { name: "input", description: "Строковое представление значения.", example: "'value'::cstring" },
      { name: "type_oid", description: "OID базового типа.", example: "23" },
      { name: "typmod", description: "Модификатор типа.", example: "-1" }
    ],
    example: "-- Внутренняя функция для обработки доменов"
  },
  {
    id: "pg_domain_recv",
    name: "domain_recv",
    category: "Пользовательские функции",
    description: "Функция приема двоичных данных для типов на базе доменов.",
    syntax: "domain_recv(internal, oid, integer)",
    arguments: [
      { name: "buf", description: "Двоичный буфер.", example: "internal" },
      { name: "type_oid", description: "OID базового типа.", example: "23" },
      { name: "typmod", description: "Модификатор типа.", example: "-1" }
    ],
    example: "-- Используется при передаче данных в двоичном формате"
  },
  {
    id: "pg_dpow",
    name: "dpow",
    category: "Пользовательские функции",
    description: "Возводит число в степень (double precision).",
    syntax: "dpow(double precision, double precision)",
    arguments: [
      { name: "base", description: "Основание.", example: "2.0" },
      { name: "exp", description: "Показатель степени.", example: "3.0" }
    ],
    example: "SELECT dpow(2.0, 3.0); -- Результат: 8.0"
  },
  {
    id: "pg_dround",
    name: "dround",
    category: "Пользовательские функции",
    description: "Округляет число до ближайшего целого (double precision).",
    syntax: "dround(double precision)",
    arguments: [{ name: "x", description: "Число для округления.", example: "42.6" }],
    example: "SELECT dround(42.6); -- Результат: 43.0"
  },
  {
    id: "pg_dsimple_init",
    name: "dsimple_init",
    category: "Пользовательские функции",
    description: "Инициализация простого словаря (simple dictionary) для полнотекстового поиска.",
    syntax: "dsimple_init(internal)",
    arguments: [{ name: "internal", description: "Внутреннее состояние.", example: "..." }],
    example: "-- Используется в конфигурациях FTS"
  },
  {
    id: "pg_dsimple_lexize",
    name: "dsimple_lexize",
    category: "Пользовательские функции",
    description: "Лексический анализ для простого словаря (simple dictionary).",
    syntax: "dsimple_lexize(internal, internal, internal, internal)",
    arguments: [
      { name: "dict", description: "Указатель на словарь.", example: "internal" },
      { name: "token", description: "Токен.", example: "internal" }
    ],
    example: "-- Выполняет поиск стоп-слов в простом словаре"
  },
  {
    id: "pg_dsnowball_init",
    name: "dsnowball_init",
    category: "Пользовательские функции",
    description: "Инициализация словаря Snowball (стеммер) для полнотекстового поиска.",
    syntax: "dsnowball_init(internal)",
    arguments: [{ name: "internal", description: "Внутреннее состояние.", example: "..." }],
    example: "-- Поддержка многоязычного стемминга"
  },
  {
    id: "pg_dsnowball_lexize",
    name: "dsnowball_lexize",
    category: "Пользовательские функции",
    description: "Лексический анализ (стемминг) для словаря Snowball.",
    syntax: "dsnowball_lexize(internal, internal, internal, internal)",
    arguments: [
      { name: "dict", description: "Указатель на словарь.", example: "internal" },
      { name: "token", description: "Слово для обработки.", example: "internal" }
    ],
    example: "-- Извлекает корень слова (стем)"
  },
  {
    id: "pg_dsqrt",
    name: "dsqrt",
    category: "Пользовательские функции",
    description: "Вычисляет квадратный корень (double precision).",
    syntax: "dsqrt(double precision)",
    arguments: [{ name: "x", description: "Число.", example: "16.0" }],
    example: "SELECT dsqrt(16.0); -- Результат: 4.0"
  },
  {
    id: "pg_dsynonym_init",
    name: "dsynonym_init",
    category: "Пользовательские функции",
    description: "Инициализация словаря синонимов для полнотекстового поиска.",
    syntax: "dsynonym_init(internal)",
    arguments: [{ name: "internal", description: "Внутреннее состояние.", example: "..." }],
    example: "-- Загрузка файла синонимов"
  },
  {
    id: "pg_dsynonym_lexize",
    name: "dsynonym_lexize",
    category: "Пользовательские функции",
    description: "Лексический анализ для словаря синонимов.",
    syntax: "dsynonym_lexize(internal, internal, internal, internal)",
    arguments: [
      { name: "dict", description: "Указатель на словарь.", example: "internal" },
      { name: "token", description: "Слово для поиска синонима.", example: "internal" }
    ],
    example: "-- Заменяет слово его синонимом"
  },
  { 
    id: "pg_brin_minmax_multi_summary_send", 
    name: "brin_minmax_multi_summary_send", 
    category: "Пользовательские функции", 
    description: "Отправка сводки BRIN multi-range в двоичном формате.", 
    syntax: "brin_minmax_multi_summary_send(pg_brin_minmax_multi_summary)",
    arguments: [{ name: "summary", description: "Объект сводки.", example: "summary_data" }],
    example: "SELECT brin_minmax_multi_summary_send(summary);" 
  },
  { 
    id: "pg_brin_minmax_multi_union", 
    name: "brin_minmax_multi_union", 
    category: "Пользовательские функции", 
    description: "Объединяет состояния BRIN multi-range.", 
    syntax: "brin_minmax_multi_union(internal, internal, internal)",
    arguments: [
      { name: "state1", description: "Первое состояние.", example: "s1" },
      { name: "state2", description: "Второе состояние.", example: "s2" }
    ],
    example: "-- Объединение диапазонов при обновлении индекса" 
  },
  { 
    id: "pg_brin_minmax_opcinfo", 
    name: "brin_minmax_opcinfo", 
    category: "Пользовательские функции", 
    description: "Информация о классе операторов для стандартного BRIN minmax.", 
    syntax: "brin_minmax_opcinfo(internal)",
    arguments: [{ name: "internal", description: "Тип.", example: "type_info" }],
    example: "-- Поддержка стандартных BRIN индексов" 
  },
  {
    id: "pg_btfloat48cmp",
    name: "btfloat48cmp",
    category: "Пользовательские функции",
    description: "Сравнивает значения типов real (float4) и double precision (float8) для B-дерева.",
    syntax: "btfloat48cmp(real, double precision)",
    arguments: [
      { name: "arg1", description: "Значение типа real.", example: "1.0::real" },
      { name: "arg2", description: "Значение типа double precision.", example: "1.0::double precision" }
    ],
    example: "SELECT btfloat48cmp(1.0::real, 1.0::double precision);"
  },
  {
    id: "pg_btfloat4cmp",
    name: "btfloat4cmp",
    category: "Пользовательские функции",
    description: "Сравнивает два значения типа real (float4) для B-дерева.",
    syntax: "btfloat4cmp(real, real)",
    arguments: [
      { name: "arg1", description: "Первое значение real.", example: "1.1::real" },
      { name: "arg2", description: "Второе значение real.", example: "1.2::real" }
    ],
    example: "SELECT btfloat4cmp(1.1::real, 1.2::real);"
  },
  {
    id: "pg_btfloat4sortsupport",
    name: "btfloat4sortsupport",
    category: "Пользовательские функции",
    description: "Функция поддержки сортировки для типа float4 в B-дереве.",
    syntax: "btfloat4sortsupport(internal)",
    arguments: [
      { name: "internal", description: "Внутреннее состояние сортировки.", example: "..." }
    ],
    example: "-- Используется системой для оптимизации сортировки float4"
  },
  {
    id: "pg_btfloat84cmp",
    name: "btfloat84cmp",
    category: "Пользовательские функции",
    description: "Сравнивает значения типов double precision (float8) и real (float4) для B-дерева.",
    syntax: "btfloat84cmp(double precision, real)",
    arguments: [
      { name: "arg1", description: "Значение типа double precision.", example: "2.0::double precision" },
      { name: "arg2", description: "Значение типа real.", example: "2.0::real" }
    ],
    example: "SELECT btfloat84cmp(2.0::double precision, 2.0::real);"
  },
  {
    id: "pg_btfloat8cmp",
    name: "btfloat8cmp",
    category: "Пользовательские функции",
    description: "Сравнивает два значения типа double precision (float8) для B-дерева.",
    syntax: "btfloat8cmp(double precision, double precision)",
    arguments: [
      { name: "arg1", description: "Первое значение double precision.", example: "3.14::double precision" },
      { name: "arg2", description: "Второе значение double precision.", example: "3.15::double precision" }
    ],
    example: "SELECT btfloat8cmp(3.14::double precision, 3.15::double precision);"
  },
  {
    id: "pg_btfloat8sortsupport",
    name: "btfloat8sortsupport",
    category: "Пользовательские функции",
    description: "Функция поддержки сортировки для типа float8 в B-дереве.",
    syntax: "btfloat8sortsupport(internal)",
    arguments: [
      { name: "internal", description: "Внутреннее состояние сортировки.", example: "..." }
    ],
    example: "-- Используется системой для оптимизации сортировки float8"
  },
  {
    id: "pg_bthandler",
    name: "bthandler",
    category: "Пользовательские функции",
    description: "Обработчик метода доступа B-дерево (B-tree).",
    syntax: "bthandler(internal)",
    arguments: [
      { name: "internal", description: "Внутренние параметры метода доступа.", example: "..." }
    ],
    example: "-- Системная функция для инициализации B-tree индекса"
  },
  {
    id: "pg_btint24cmp",
    name: "btint24cmp",
    category: "Пользовательские функции",
    description: "Сравнивает значения типов smallint (int2) и integer (int4) для B-дерева.",
    syntax: "btint24cmp(smallint, integer)",
    arguments: [
      { name: "arg1", description: "Значение типа smallint.", example: "10::smallint" },
      { name: "arg2", description: "Значение типа integer.", example: "20" }
    ],
    example: "SELECT btint24cmp(10::smallint, 20);"
  },
  {
    id: "pg_btint28cmp",
    name: "btint28cmp",
    category: "Пользовательские функции",
    description: "Сравнивает значения типов smallint (int2) и bigint (int8) для B-дерева.",
    syntax: "btint28cmp(smallint, bigint)",
    arguments: [
      { name: "arg1", description: "Значение типа smallint.", example: "5::smallint" },
      { name: "arg2", description: "Значение типа bigint.", example: "10000000000::bigint" }
    ],
    example: "SELECT btint28cmp(5::smallint, 10000000000::bigint);"
  },
  {
    id: "pg_btint2cmp",
    name: "btint2cmp",
    category: "Пользовательские функции",
    description: "Сравнивает два значения типа smallint (int2) для B-дерева.",
    syntax: "btint2cmp(smallint, smallint)",
    arguments: [
      { name: "arg1", description: "Первое значение smallint.", example: "1::smallint" },
      { name: "arg2", description: "Второе значение smallint.", example: "2::smallint" }
    ],
    example: "SELECT btint2cmp(1::smallint, 2::smallint);"
  },
  {
    id: "pg_btint2skipsupport",
    name: "btint2skipsupport",
    category: "Пользовательские функции",
    description: "Поддержка пропуска значений (Index Skip Scan) для типа int2 в B-дереве.",
    syntax: "btint2skipsupport(internal)",
    arguments: [
      { name: "internal", description: "Внутренний контекст.", example: "..." }
    ],
    example: "-- Оптимизация для сканирования индексов по типу smallint"
  },
  {
    id: "pg_btint2sortsupport",
    name: "btint2sortsupport",
    category: "Пользовательские функции",
    description: "Поддержка быстрой сортировки для типа int2 в B-дереве.",
    syntax: "btint2sortsupport(internal)",
    arguments: [
      { name: "internal", description: "Внутреннее состояние сортировки.", example: "..." }
    ],
    example: "-- Ускоряет сортировку данных типа smallint"
  },
  {
    id: "pg_btint42cmp",
    name: "btint42cmp",
    category: "Пользовательские функции",
    description: "Сравнивает значения типов integer (int4) и smallint (int2) для B-дерева.",
    syntax: "btint42cmp(integer, smallint)",
    arguments: [
      { name: "arg1", description: "Значение типа integer.", example: "100" },
      { name: "arg2", description: "Значение типа smallint.", example: "50::smallint" }
    ],
    example: "SELECT btint42cmp(100, 50::smallint);"
  },
  {
    id: "pg_btint48cmp",
    name: "btint48cmp",
    category: "Пользовательские функции",
    description: "Сравнивает значения типов integer (int4) и bigint (int8) для B-дерева.",
    syntax: "btint48cmp(integer, bigint)",
    arguments: [
      { name: "arg1", description: "Значение типа integer.", example: "1000" },
      { name: "arg2", description: "Значение типа bigint.", example: "2000::bigint" }
    ],
    example: "SELECT btint48cmp(1000, 2000::bigint);"
  },
  {
    id: "pg_btint4cmp",
    name: "btint4cmp",
    category: "Пользовательские функции",
    description: "Сравнивает два значения типа integer (int4) для B-дерева.",
    syntax: "btint4cmp(integer, integer)",
    arguments: [
      { name: "arg1", description: "Первое целое число.", example: "10" },
      { name: "arg2", description: "Второе целое число.", example: "20" }
    ],
    example: "SELECT btint4cmp(10, 20);"
  },
  {
    id: "pg_btint4skipsupport",
    name: "btint4skipsupport",
    category: "Пользовательские функции",
    description: "Поддержка пропуска значений (Index Skip Scan) для типа int4 в B-дереве.",
    syntax: "btint4skipsupport(internal)",
    arguments: [
      { name: "internal", description: "Внутренний контекст.", example: "..." }
    ],
    example: "-- Оптимизация для сканирования индексов по типу integer"
  },
  {
    id: "pg_btint4sortsupport",
    name: "btint4sortsupport",
    category: "Пользовательские функции",
    description: "Поддержка быстрой сортировки для типа int4 в B-дереве.",
    syntax: "btint4sortsupport(internal)",
    arguments: [
      { name: "internal", description: "Внутреннее состояние сортировки.", example: "..." }
    ],
    example: "-- Ускоряет сортировку данных типа integer"
  },
  {
    id: "pg_btint82cmp",
    name: "btint82cmp",
    category: "Пользовательские функции",
    description: "Сравнивает значения типов bigint (int8) и smallint (int2) для B-дерева.",
    syntax: "btint82cmp(bigint, smallint)",
    arguments: [
      { name: "arg1", description: "Значение типа bigint.", example: "1000000000::bigint" },
      { name: "arg2", description: "Значение типа smallint.", example: "10::smallint" }
    ],
    example: "SELECT btint82cmp(1000000000::bigint, 10::smallint);"
  },
  {
    id: "pg_btint84cmp",
    name: "btint84cmp",
    category: "Пользовательские функции",
    description: "Сравнивает значения типов bigint (int8) и integer (int4) для B-дерева.",
    syntax: "btint84cmp(bigint, integer)",
    arguments: [
      { name: "arg1", description: "Значение типа bigint.", example: "5000000000::bigint" },
      { name: "arg2", description: "Значение типа integer.", example: "1000" }
    ],
    example: "SELECT btint84cmp(5000000000::bigint, 1000);"
  },
  {
    id: "pg_btint8cmp",
    name: "btint8cmp",
    category: "Пользовательские функции",
    description: "Сравнивает два значения типа bigint (int8) для B-дерева.",
    syntax: "btint8cmp(bigint, bigint)",
    arguments: [
      { name: "arg1", description: "Первое значение bigint.", example: "10000000000::bigint" },
      { name: "arg2", description: "Второе значение bigint.", example: "20000000000::bigint" }
    ],
    example: "SELECT btint8cmp(10000000000::bigint, 20000000000::bigint);"
  },
  {
    id: "pg_btint8skipsupport",
    name: "btint8skipsupport",
    category: "Пользовательские функции",
    description: "Поддержка пропуска значений (Index Skip Scan) для типа int8 в B-дереве.",
    syntax: "btint8skipsupport(internal)",
    arguments: [
      { name: "internal", description: "Внутренний контекст.", example: "..." }
    ],
    example: "-- Оптимизация для сканирования индексов по типу bigint"
  },
  {
    id: "pg_btint8sortsupport",
    name: "btint8sortsupport",
    category: "Пользовательские функции",
    description: "Поддержка быстрой сортировки для типа int8 в B-дереве.",
    syntax: "btint8sortsupport(internal)",
    arguments: [
      { name: "internal", description: "Внутреннее состояние сортировки.", example: "..." }
    ],
    example: "-- Ускоряет сортировку данных типа bigint"
  },
  {
    id: "pg_btnamecmp",
    name: "btnamecmp",
    category: "Пользовательские функции",
    description: "Сравнивает два значения типа name для B-дерева.",
    syntax: "btnamecmp(name, name)",
    arguments: [
      { name: "n1", description: "Первое имя.", example: "'table_name'::name" },
      { name: "n2", description: "Второе имя.", example: "'column_name'::name" }
    ],
    example: "SELECT btnamecmp('abc'::name, 'def'::name);"
  },
  {
    id: "pg_btnamesortsupport",
    name: "btnamesortsupport",
    category: "Пользовательские функции",
    description: "Поддержка сортировки для типа name в B-дереве.",
    syntax: "btnamesortsupport(internal)",
    arguments: [
      { name: "internal", description: "Внутреннее состояние.", example: "..." }
    ],
    example: "-- Оптимизация сортировки системных имен"
  },
  {
    id: "pg_btnametextcmp",
    name: "btnametextcmp",
    category: "Пользовательские функции",
    description: "Сравнивает тип name с типом text для B-дерева.",
    syntax: "btnametextcmp(name, text)",
    arguments: [
      { name: "name", description: "Значение типа name.", example: "'my_table'::name" },
      { name: "text", description: "Значение типа text.", example: "'my_table'" }
    ],
    example: "SELECT btnametextcmp('test'::name, 'test');"
  },
  {
    id: "pg_btoidcmp",
    name: "btoidcmp",
    category: "Пользовательские функции",
    description: "Сравнивает два OID для B-дерева.",
    syntax: "btoidcmp(oid, oid)",
    arguments: [
      { name: "oid1", description: "Первый OID.", example: "1234" },
      { name: "oid2", description: "Второй OID.", example: "5678" }
    ],
    example: "SELECT btoidcmp(1234, 5678);"
  },
  {
    id: "pg_btoidskipsupport",
    name: "btoidskipsupport",
    category: "Пользовательские функции",
    description: "Поддержка пропуска значений для типа oid в B-дереве.",
    syntax: "btoidskipsupport(internal)",
    arguments: [
      { name: "internal", description: "Внутренний контекст.", example: "..." }
    ],
    example: "-- Оптимизация Index Skip Scan для OID"
  },
  {
    id: "pg_btoidsortsupport",
    name: "btoidsortsupport",
    category: "Пользовательские функции",
    description: "Поддержка сортировки для типа oid в B-дереве.",
    syntax: "btoidsortsupport(internal)",
    arguments: [
      { name: "internal", description: "Внутреннее состояние.", example: "..." }
    ],
    example: "-- Ускоряет сортировку OID"
  },
  {
    id: "pg_btoidvectorcmp",
    name: "btoidvectorcmp",
    category: "Пользовательские функции",
    description: "Сравнивает два вектора OID (oidvector) для B-дерева.",
    syntax: "btoidvectorcmp(oidvector, oidvector)",
    arguments: [
      { name: "v1", description: "Первый вектор OID.", example: "'1 2 3'::oidvector" },
      { name: "v2", description: "Второй вектор OID.", example: "'1 2 4'::oidvector" }
    ],
    example: "SELECT btoidvectorcmp('1 2 3'::oidvector, '1 2 4'::oidvector);"
  },
  {
    id: "pg_btrecordcmp",
    name: "btrecordcmp",
    category: "Пользовательские функции",
    description: "Сравнивает две записи (record) для B-дерева.",
    syntax: "btrecordcmp(record, record)",
    arguments: [
      { name: "r1", description: "Первая запись.", example: "ROW(1, 'a')" },
      { name: "r2", description: "Вторая запись.", example: "ROW(1, 'b')" }
    ],
    example: "SELECT btrecordcmp(ROW(1, 'a'), ROW(1, 'b'));"
  },
  {
    id: "pg_btrecordimagecmp",
    name: "btrecordimagecmp",
    category: "Пользовательские функции",
    description: "Побайтовое сравнение образов записей для дедупликации в B-дереве.",
    syntax: "btrecordimagecmp(record, record)",
    arguments: [
      { name: "r1", description: "Первая запись.", example: "ROW(1)" },
      { name: "r2", description: "Вторая запись.", example: "ROW(1)" }
    ],
    example: "-- Используется для дедупликации в индексах"
  },
  {
    id: "pg_btrim_text_text",
    name: "btrim",
    category: "Пользовательские функции",
    description: "Удаляет указанные символы с обоих концов строки.",
    syntax: "btrim(text, text)",
    arguments: [
      { name: "string", description: "Исходная строка.", example: "'xyxtestx'" },
      { name: "characters", description: "Символы для удаления.", example: "'xy'" }
    ],
    example: "SELECT btrim('xyxtestx', 'xy'); -- Результат: 'test'"
  },
  {
    id: "pg_btrim_text",
    name: "btrim",
    category: "Пользовательские функции",
    description: "Удаляет пробелы с обоих концов строки.",
    syntax: "btrim(text)",
    arguments: [
      { name: "string", description: "Исходная строка.", example: "'  test  '" }
    ],
    example: "SELECT btrim('  test  '); -- Результат: 'test'"
  },
  {
    id: "pg_btrim_bytea",
    name: "btrim",
    category: "Пользовательские функции",
    description: "Удаляет указанные байты с обоих концов двоичных данных.",
    syntax: "btrim(bytea, bytea)",
    arguments: [
      { name: "data", description: "Двоичные данные.", example: "'\\x00010200'::bytea" },
      { name: "bytes", description: "Байты для удаления.", example: "'\\x00'::bytea" }
    ],
    example: "SELECT btrim('\\x00010200'::bytea, '\\x00'::bytea);"
  },
  {
    id: "pg_bttext_pattern_cmp",
    name: "bttext_pattern_cmp",
    category: "Пользовательские функции",
    description: "Сравнение текста по правилам C locale (побайтово) для B-дерева.",
    syntax: "bttext_pattern_cmp(text, text)",
    arguments: [
      { name: "t1", description: "Первая строка.", example: "'abc'" },
      { name: "t2", description: "Вторая строка.", example: "'abd'" }
    ],
    example: "SELECT bttext_pattern_cmp('abc', 'abd');"
  },
  {
    id: "pg_bttext_pattern_sortsupport",
    name: "bttext_pattern_sortsupport",
    category: "Пользовательские функции",
    description: "Поддержка быстрой сортировки текста в C locale для B-дерева.",
    syntax: "bttext_pattern_sortsupport(internal)",
    arguments: [
      { name: "internal", description: "Внутреннее состояние.", example: "..." }
    ],
    example: "-- Оптимизация сортировки текста (C locale)"
  },
  {
    id: "pg_bttextcmp",
    name: "bttextcmp",
    category: "Пользовательские функции",
    description: "Сравнивает две текстовые строки с учетом локали для B-дерева.",
    syntax: "bttextcmp(text, text)",
    arguments: [
      { name: "t1", description: "Первая строка.", example: "'apple'" },
      { name: "t2", description: "Вторая строка.", example: "'banana'" }
    ],
    example: "SELECT bttextcmp('apple', 'banana');"
  },
  {
    id: "pg_bttextnamecmp",
    name: "bttextnamecmp",
    category: "Пользовательские функции",
    description: "Сравнивает текст с типом name для B-дерева.",
    syntax: "bttextnamecmp(text, name)",
    arguments: [
      { name: "text", description: "Значение типа text.", example: "'table_name'" },
      { name: "name", description: "Значение типа name.", example: "'table_name'::name" }
    ],
    example: "SELECT bttextnamecmp('test', 'test'::name);"
  },
  {
    id: "pg_bttextsortsupport",
    name: "bttextsortsupport",
    category: "Пользовательские функции",
    description: "Поддержка быстрой сортировки текста для B-дерева.",
    syntax: "bttextsortsupport(internal)",
    arguments: [
      { name: "internal", description: "Внутреннее состояние.", example: "..." }
    ],
    example: "-- Ускоряет сортировку текстовых колонок"
  },
  {
    id: "pg_bttidcmp",
    name: "bttidcmp",
    category: "Пользовательские функции",
    description: "Сравнивает два идентификатора строк (TID) для B-дерева.",
    syntax: "bttidcmp(tid, tid)",
    arguments: [
      { name: "tid1", description: "Первый TID.", example: "'(0,1)'::tid" },
      { name: "tid2", description: "Второй TID.", example: "'(0,2)'::tid" }
    ],
    example: "SELECT bttidcmp('(0,1)'::tid, '(0,2)'::tid);"
  },
  {
    id: "pg_btvarstrequalimage",
    name: "btvarstrequalimage",
    category: "Пользовательские функции",
    description: "Проверяет возможность дедупликации для типов переменной длины (например, text).",
    syntax: "btvarstrequalimage(oid)",
    arguments: [
      { name: "type_oid", description: "OID типа данных.", example: "25" }
    ],
    example: "SELECT btvarstrequalimage(25);"
  },
  {
    id: "pg_bytea_bigint",
    name: "bytea",
    category: "Пользовательские функции",
    description: "Преобразует bigint в bytea.",
    syntax: "bytea(bigint)",
    arguments: [
      { name: "arg", description: "Число bigint.", example: "123456789::bigint" }
    ],
    example: "SELECT bytea(123456789::bigint);"
  },
  {
    id: "pg_bytea_integer",
    name: "bytea",
    category: "Пользовательские функции",
    description: "Преобразует integer в bytea.",
    syntax: "bytea(integer)",
    arguments: [
      { name: "arg", description: "Целое число.", example: "100" }
    ],
    example: "SELECT bytea(100);"
  },
  {
    id: "pg_bytea_smallint",
    name: "bytea",
    category: "Пользовательские функции",
    description: "Преобразует smallint в bytea.",
    syntax: "bytea(smallint)",
    arguments: [
      { name: "arg", description: "Число smallint.", example: "5::smallint" }
    ],
    example: "SELECT bytea(5::smallint);"
  },
  {
    id: "pg_bytea_larger",
    name: "bytea_larger",
    category: "Пользовательские функции",
    description: "Возвращает большее из двух значений bytea.",
    syntax: "bytea_larger(bytea, bytea)",
    arguments: [
      { name: "arg1", description: "Первое значение bytea.", example: "'\\x01'::bytea" },
      { name: "arg2", description: "Второе значение bytea.", example: "'\\x02'::bytea" }
    ],
    example: "SELECT bytea_larger('\\x01'::bytea, '\\x02'::bytea);"
  },
  {
    id: "pg_bytea_smaller",
    name: "bytea_smaller",
    category: "Пользовательские функции",
    description: "Возвращает меньшее из двух значений bytea.",
    syntax: "bytea_smaller(bytea, bytea)",
    arguments: [
      { name: "arg1", description: "Первое значение bytea.", example: "'\\x01'::bytea" },
      { name: "arg2", description: "Второе значение bytea.", example: "'\\x02'::bytea" }
    ],
    example: "SELECT bytea_smaller('\\x01'::bytea, '\\x02'::bytea);"
  },
  {
    id: "pg_bytea_sortsupport",
    name: "bytea_sortsupport",
    category: "Пользовательские функции",
    description: "Функция поддержки сортировки для типа bytea.",
    syntax: "bytea_sortsupport(internal)",
    arguments: [
      { name: "internal", description: "Внутреннее состояние сортировки.", example: "..." }
    ],
    example: "-- Используется системой для оптимизации сортировки bytea"
  },
  {
    id: "pg_bytea_string_agg_finalfn",
    name: "bytea_string_agg_finalfn",
    category: "Пользовательские функции",
    description: "Финальная функция для агрегата string_agg над типом bytea.",
    syntax: "bytea_string_agg_finalfn(internal)",
    arguments: [
      { name: "internal", description: "Внутреннее состояние агрегации.", example: "state" }
    ],
    example: "-- Внутренняя функция агрегации"
  },
  {
    id: "pg_bytea_string_agg_transfn",
    name: "bytea_string_agg_transfn",
    category: "Пользовательские функции",
    description: "Переходная функция для агрегата string_agg над типом bytea.",
    syntax: "bytea_string_agg_transfn(internal, bytea, bytea)",
    arguments: [
      { name: "state", description: "Текущее состояние.", example: "s" },
      { name: "value", description: "Добавляемое значение.", example: "'\\x01'::bytea" },
      { name: "delimiter", description: "Разделитель.", example: "'\\x00'::bytea" }
    ],
    example: "-- Внутренняя функция агрегации"
  },
  {
    id: "pg_byteacat",
    name: "byteacat",
    category: "Пользовательские функции",
    description: "Конкатенация двух значений bytea.",
    syntax: "byteacat(bytea, bytea)",
    arguments: [
      { name: "arg1", description: "Первый фрагмент.", example: "'\\x01'::bytea" },
      { name: "arg2", description: "Второй фрагмент.", example: "'\\x02'::bytea" }
    ],
    example: "SELECT byteacat('\\x01'::bytea, '\\x02'::bytea);"
  },
  {
    id: "pg_byteacmp",
    name: "byteacmp",
    category: "Пользовательские функции",
    description: "Сравнение двух значений bytea.",
    syntax: "byteacmp(bytea, bytea)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'\\x01'::bytea" },
      { name: "arg2", description: "Второе значение.", example: "'\\x02'::bytea" }
    ],
    example: "SELECT byteacmp('\\x01'::bytea, '\\x02'::bytea);"
  },
  {
    id: "pg_byteaeq",
    name: "byteaeq",
    category: "Пользовательские функции",
    description: "Проверка на равенство двух значений bytea.",
    syntax: "byteaeq(bytea, bytea)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'\\x01'::bytea" },
      { name: "arg2", description: "Второе значение.", example: "'\\x01'::bytea" }
    ],
    example: "SELECT byteaeq('\\x01'::bytea, '\\x01'::bytea);"
  },
  {
    id: "pg_byteage",
    name: "byteage",
    category: "Пользовательские функции",
    description: "Проверка 'больше или равно' для bytea.",
    syntax: "byteage(bytea, bytea)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'\\x02'::bytea" },
      { name: "arg2", description: "Второе значение.", example: "'\\x01'::bytea" }
    ],
    example: "SELECT byteage('\\x02'::bytea, '\\x01'::bytea);"
  },
  {
    id: "pg_byteagt",
    name: "byteagt",
    category: "Пользовательские функции",
    description: "Проверка 'больше' для bytea.",
    syntax: "byteagt(bytea, bytea)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'\\x02'::bytea" },
      { name: "arg2", description: "Второе значение.", example: "'\\x01'::bytea" }
    ],
    example: "SELECT byteagt('\\x02'::bytea, '\\x01'::bytea);"
  },
  {
    id: "pg_byteain",
    name: "byteain",
    category: "Пользовательские функции",
    description: "Функция ввода для типа bytea.",
    syntax: "byteain(cstring)",
    arguments: [
      { name: "arg", description: "Строковое представление bytea.", example: "'\\xDEADBEEF'::cstring" }
    ],
    example: "SELECT byteain('\\xDEADBEEF'::cstring);"
  },
  {
    id: "pg_byteale",
    name: "byteale",
    category: "Пользовательские функции",
    description: "Проверка 'меньше или равно' для bytea.",
    syntax: "byteale(bytea, bytea)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'\\x01'::bytea" },
      { name: "arg2", description: "Второе значение.", example: "'\\x02'::bytea" }
    ],
    example: "SELECT byteale('\\x01'::bytea, '\\x02'::bytea);"
  },
  {
    id: "pg_bytealike",
    name: "bytealike",
    category: "Пользовательские функции",
    description: "Проверка соответствия шаблону LIKE для bytea.",
    syntax: "bytealike(bytea, bytea)",
    arguments: [
      { name: "data", description: "Данные.", example: "'\\x010203'::bytea" },
      { name: "pattern", description: "Шаблон.", example: "'\\x01%'::bytea" }
    ],
    example: "SELECT bytealike('\\x010203'::bytea, '\\x01%'::bytea);"
  },
  {
    id: "pg_bytealt",
    name: "bytealt",
    category: "Пользовательские функции",
    description: "Проверка 'меньше' для bytea.",
    syntax: "bytealt(bytea, bytea)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'\\x01'::bytea" },
      { name: "arg2", description: "Второе значение.", example: "'\\x02'::bytea" }
    ],
    example: "SELECT bytealt('\\x01'::bytea, '\\x02'::bytea);"
  },
  {
    id: "pg_byteane",
    name: "byteane",
    category: "Пользовательские функции",
    description: "Проверка на неравенство двух значений bytea.",
    syntax: "byteane(bytea, bytea)",
    arguments: [
      { name: "arg1", description: "Первое значение.", example: "'\\x01'::bytea" },
      { name: "arg2", description: "Второе значение.", example: "'\\x02'::bytea" }
    ],
    example: "SELECT byteane('\\x01'::bytea, '\\x02'::bytea);"
  },
  {
    id: "pg_byteanlike",
    name: "byteanlike",
    category: "Пользовательские функции",
    description: "Проверка соответствия шаблону NOT LIKE для bytea.",
    syntax: "byteanlike(bytea, bytea)",
    arguments: [
      { name: "data", description: "Данные.", example: "'\\x010203'::bytea" },
      { name: "pattern", description: "Шаблон.", example: "'\\x04%'::bytea" }
    ],
    example: "SELECT byteanlike('\\x010203'::bytea, '\\x04%'::bytea);"
  },
  {
    id: "pg_byteaout",
    name: "byteaout",
    category: "Пользовательские функции",
    description: "Функция вывода для типа bytea.",
    syntax: "byteaout(bytea)",
    arguments: [
      { name: "arg", description: "Значение bytea.", example: "'\\x01'::bytea" }
    ],
    example: "SELECT byteaout('\\x01'::bytea);"
  },
  {
    id: "pg_bytearecv",
    name: "bytearecv",
    category: "Пользовательские функции",
    description: "Функция приема двоичных данных для типа bytea.",
    syntax: "bytearecv(internal)",
    arguments: [
      { name: "internal", description: "Двоичный буфер.", example: "buf" }
    ],
    example: "-- Внутренняя функция для протокола клиент-сервер"
  },
  {
    id: "pg_byteasend",
    name: "byteasend",
    category: "Пользовательские функции",
    description: "Функция отправки двоичных данных для типа bytea.",
    syntax: "byteasend(bytea)",
    arguments: [
      { name: "arg", description: "Значение bytea.", example: "'\\x01'::bytea" }
    ],
    example: "SELECT byteasend('\\x01'::bytea);"
  },
  {
    id: "pg_cardinality",
    name: "cardinality",
    category: "Пользовательские функции",
    description: "Возвращает общее количество элементов в массиве.",
    syntax: "cardinality(anyarray)",
    arguments: [
      { name: "array", description: "Массив любого типа.", example: "ARRAY[[1,2],[3,4]]" }
    ],
    example: "SELECT cardinality(ARRAY[[1,2],[3,4]]); -- Результат: 4"
  },
  {
    id: "pg_casefold",
    name: "casefold",
    category: "Пользовательские функции",
    description: "Приводит строку к виду, подходящему для сравнения без учета регистра (аналог lower, но более универсальный).",
    syntax: "casefold(text)",
    arguments: [
      { name: "string", description: "Исходная строка.", example: "'Hello WORLD'" }
    ],
    example: "SELECT casefold('Hello WORLD');"
  },
  {
    id: "pg_cash_cmp",
    name: "cash_cmp",
    category: "Пользовательские функции",
    description: "Сравнение двух денежных значений (money).",
    syntax: "cash_cmp(money, money)",
    arguments: [
      { name: "m1", description: "Первое значение.", example: "'10.50'::money" },
      { name: "m2", description: "Второе значение.", example: "'20.00'::money" }
    ],
    example: "SELECT cash_cmp('10.50'::money, '20.00'::money);"
  },
  {
    id: "pg_cash_div_cash",
    name: "cash_div_cash",
    category: "Пользовательские функции",
    description: "Деление одного денежного значения на другое (возвращает float8).",
    syntax: "cash_div_cash(money, money)",
    arguments: [
      { name: "m1", description: "Делимое.", example: "'100'::money" },
      { name: "m2", description: "Делитель.", example: "'20'::money" }
    ],
    example: "SELECT '100'::money / '20'::money;"
  },
  {
    id: "pg_cash_div_flt4",
    name: "cash_div_flt4",
    category: "Пользовательские функции",
    description: "Деление денежного значения на real.",
    syntax: "cash_div_flt4(money, real)",
    arguments: [
      { name: "money", description: "Денежное значение.", example: "'10.00'::money" },
      { name: "divisor", description: "Число типа real.", example: "2.5::real" }
    ],
    example: "SELECT '10.00'::money / 2.5::real;"
  },
  {
    id: "pg_cash_div_flt8",
    name: "cash_div_flt8",
    category: "Пользовательские функции",
    description: "Деление денежного значения на double precision.",
    syntax: "cash_div_flt8(money, double precision)",
    arguments: [
      { name: "money", description: "Денежное значение.", example: "'50.00'::money" },
      { name: "divisor", description: "Число типа double precision.", example: "5.0::double precision" }
    ],
    example: "SELECT '50.00'::money / 5.0::double precision;"
  },
  {
    id: "pg_cash_div_int2",
    name: "cash_div_int2",
    category: "Пользовательские функции",
    description: "Деление денежного значения на smallint.",
    syntax: "cash_div_int2(money, smallint)",
    arguments: [
      { name: "money", description: "Денежное значение.", example: "'20.00'::money" },
      { name: "divisor", description: "Число типа smallint.", example: "2::smallint" }
    ],
    example: "SELECT '20.00'::money / 2::smallint;"
  },
  {
    id: "pg_cash_div_int4",
    name: "cash_div_int4",
    category: "Пользовательские функции",
    description: "Деление денежного значения на integer.",
    syntax: "cash_div_int4(money, integer)",
    arguments: [
      { name: "money", description: "Денежное значение.", example: "'100.00'::money" },
      { name: "divisor", description: "Целое число.", example: "4" }
    ],
    example: "SELECT '100.00'::money / 4;"
  },
  {
    id: "pg_cash_div_int8",
    name: "cash_div_int8",
    category: "Пользовательские функции",
    description: "Деление денежного значения на bigint.",
    syntax: "cash_div_int8(money, bigint)",
    arguments: [
      { name: "money", description: "Денежное значение.", example: "'1000.00'::money" },
      { name: "divisor", description: "Число типа bigint.", example: "10::bigint" }
    ],
    example: "SELECT '1000.00'::money / 10::bigint;"
  },
  {
    id: "pg_cash_eq",
    name: "cash_eq",
    category: "Пользовательские функции",
    description: "Проверка на равенство денежных значений.",
    syntax: "cash_eq(money, money)",
    arguments: [
      { name: "m1", description: "Первое значение.", example: "'10.00'::money" },
      { name: "m2", description: "Второе значение.", example: "'10.00'::money" }
    ],
    example: "SELECT '10.00'::money = '10.00'::money;"
  },
  {
    id: "pg_cash_ge",
    name: "cash_ge",
    category: "Пользовательские функции",
    description: "Проверка 'больше или равно' для денежных значений.",
    syntax: "cash_ge(money, money)",
    arguments: [
      { name: "m1", description: "Первое значение.", example: "'20.00'::money" },
      { name: "m2", description: "Второе значение.", example: "'10.00'::money" }
    ],
    example: "SELECT '20.00'::money >= '10.00'::money;"
  },
  {
    id: "pg_cash_gt",
    name: "cash_gt",
    category: "Пользовательские функции",
    description: "Проверка 'больше' для денежных значений.",
    syntax: "cash_gt(money, money)",
    arguments: [
      { name: "m1", description: "Первое значение.", example: "'20.00'::money" },
      { name: "m2", description: "Второе значение.", example: "'10.00'::money" }
    ],
    example: "SELECT '20.00'::money > '10.00'::money;"
  },
  {
    id: "pg_cash_in",
    name: "cash_in",
    category: "Пользовательские функции",
    description: "Функция ввода для типа money.",
    syntax: "cash_in(cstring)",
    arguments: [
      { name: "arg", description: "Строковое представление денег.", example: "'$10.50'::cstring" }
    ],
    example: "SELECT cash_in('$10.50'::cstring);"
  },
  {
    id: "pg_cash_le",
    name: "cash_le",
    category: "Пользовательские функции",
    description: "Проверка 'меньше или равно' для денежных значений.",
    syntax: "cash_le(money, money)",
    arguments: [
      { name: "m1", description: "Первое значение.", example: "'10.00'::money" },
      { name: "m2", description: "Второе значение.", example: "'20.00'::money" }
    ],
    example: "SELECT '10.00'::money <= '20.00'::money;"
  },
  {
    id: "pg_cash_lt",
    name: "cash_lt",
    category: "Пользовательские функции",
    description: "Проверка 'меньше' для денежных значений.",
    syntax: "cash_lt(money, money)",
    arguments: [
      { name: "m1", description: "Первое значение.", example: "'10.00'::money" },
      { name: "m2", description: "Второе значение.", example: "'20.00'::money" }
    ],
    example: "SELECT '10.00'::money < '20.00'::money;"
  },
  {
    id: "pg_cash_mi",
    name: "cash_mi",
    category: "Пользовательские функции",
    description: "Вычитание денежных значений.",
    syntax: "cash_mi(money, money)",
    arguments: [
      { name: "m1", description: "Уменьшаемое.", example: "'50.00'::money" },
      { name: "m2", description: "Вычитаемое.", example: "'10.00'::money" }
    ],
    example: "SELECT '50.00'::money - '10.00'::money;"
  },
  {
    id: "pg_cash_mul_flt4",
    name: "cash_mul_flt4",
    category: "Пользовательские функции",
    description: "Умножение денежного значения на real.",
    syntax: "cash_mul_flt4(money, real)",
    arguments: [
      { name: "money", description: "Денежное значение.", example: "'10.00'::money" },
      { name: "factor", description: "Множитель типа real.", example: "1.5::real" }
    ],
    example: "SELECT '10.00'::money * 1.5::real;"
  },
  {
    id: "pg_cash_mul_flt8",
    name: "cash_mul_flt8",
    category: "Пользовательские функции",
    description: "Умножение денежного значения на double precision.",
    syntax: "cash_mul_flt8(money, double precision)",
    arguments: [
      { name: "money", description: "Денежное значение.", example: "'20.00'::money" },
      { name: "factor", description: "Множитель типа double precision.", example: "2.0::double precision" }
    ],
    example: "SELECT '20.00'::money * 2.0::double precision;"
  },
  {
    id: "pg_cash_mul_int2",
    name: "cash_mul_int2",
    category: "Пользовательские функции",
    description: "Умножение денежного значения на smallint.",
    syntax: "cash_mul_int2(money, smallint)",
    arguments: [
      { name: "money", description: "Денежное значение.", example: "'5.00'::money" },
      { name: "factor", description: "Множитель типа smallint.", example: "10::smallint" }
    ],
    example: "SELECT '5.00'::money * 10::smallint;"
  },
  {
    id: "pg_cash_mul_int4",
    name: "cash_mul_int4",
    category: "Пользовательские функции",
    description: "Умножение денежного значения на integer.",
    syntax: "cash_mul_int4(money, integer)",
    arguments: [
      { name: "money", description: "Денежное значение.", example: "'100.00'::money" },
      { name: "factor", description: "Целое число.", example: "2" }
    ],
    example: "SELECT '100.00'::money * 2;"
  },
  {
    id: "pg_cash_mul_int8",
    name: "cash_mul_int8",
    category: "Пользовательские функции",
    description: "Умножение денежного значения на bigint.",
    syntax: "cash_mul_int8(money, bigint)",
    arguments: [
      { name: "money", description: "Денежное значение.", example: "'1000.00'::money" },
      { name: "factor", description: "Число типа bigint.", example: "3::bigint" }
    ],
    example: "SELECT '1000.00'::money * 3::bigint;"
  },
  {
    id: "pg_cash_ne",
    name: "cash_ne",
    category: "Пользовательские функции",
    description: "Проверка на неравенство денежных значений.",
    syntax: "cash_ne(money, money)",
    arguments: [
      { name: "m1", description: "Первое значение.", example: "'10.00'::money" },
      { name: "m2", description: "Второе значение.", example: "'20.00'::money" }
    ],
    example: "SELECT '10.00'::money <> '20.00'::money;"
  },
  {
    id: "pg_cash_out",
    name: "cash_out",
    category: "Пользовательские функции",
    description: "Функция вывода для типа money.",
    syntax: "cash_out(money)",
    arguments: [
      { name: "money", description: "Денежное значение.", example: "'10.50'::money" }
    ],
    example: "SELECT cash_out('10.50'::money);"
  },
  {
    id: "pg_cash_pl",
    name: "cash_pl",
    category: "Пользовательские функции",
    description: "Сложение денежных значений.",
    syntax: "cash_pl(money, money)",
    arguments: [
      { name: "m1", description: "Первое слагаемое.", example: "'10.00'::money" },
      { name: "m2", description: "Второе слагаемое.", example: "'20.00'::money" }
    ],
    example: "SELECT '10.00'::money + '20.00'::money;"
  },
  {
    id: "pg_cash_recv",
    name: "cash_recv",
    category: "Пользовательские функции",
    description: "Функция приема денежного значения в двоичном формате.",
    syntax: "cash_recv(internal)",
    arguments: [
      { name: "internal", description: "Двоичный буфер данных.", example: "buf" }
    ],
    example: "-- Внутренняя функция для обработки типа money"
  },
  {
    id: "pg_cash_send",
    name: "cash_send",
    category: "Пользовательские функции",
    description: "Функция отправки денежного значения в двоичном формате.",
    syntax: "cash_send(money)",
    arguments: [
      { name: "money", description: "Денежное значение.", example: "'100.00'::money" }
    ],
    example: "SELECT cash_send('100.00'::money);"
  },
  {
    id: "pg_cash_words",
    name: "cash_words",
    category: "Пользовательские функции",
    description: "Преобразует денежное значение в текстовое описание словами.",
    syntax: "cash_words(money)",
    arguments: [
      { name: "money", description: "Денежное значение.", example: "'123.45'::money" }
    ],
    example: "SELECT cash_words('123.45'::money);"
  },
  {
    id: "pg_cashlarger",
    name: "cashlarger",
    category: "Пользовательские функции",
    description: "Возвращает большее из двух денежных значений.",
    syntax: "cashlarger(money, money)",
    arguments: [
      { name: "m1", description: "Первое значение.", example: "'10.00'::money" },
      { name: "m2", description: "Второе значение.", example: "'20.00'::money" }
    ],
    example: "SELECT cashlarger('10.00'::money, '20.00'::money);"
  },
  {
    id: "pg_cashsmaller",
    name: "cashsmaller",
    category: "Пользовательские функции",
    description: "Возвращает меньшее из двух денежных значений.",
    syntax: "cashsmaller(money, money)",
    arguments: [
      { name: "m1", description: "Первое значение.", example: "'10.00'::money" },
      { name: "m2", description: "Второе значение.", example: "'20.00'::money" }
    ],
    example: "SELECT cashsmaller('10.00'::money, '20.00'::money);"
  },
  {
    id: "pg_cbrt",
    name: "cbrt",
    category: "Пользовательские функции",
    description: "Вычисляет кубический корень числа.",
    syntax: "cbrt(double precision)",
    arguments: [
      { name: "num", description: "Число с плавающей точкой.", example: "27.0" }
    ],
    example: "SELECT cbrt(27.0); -- Результат: 3"
  },
  {
    id: "pg_ceil_float8",
    name: "ceil",
    category: "Пользовательские функции",
    description: "Округляет число до ближайшего большего целого (для double precision).",
    syntax: "ceil(double precision)",
    arguments: [
      { name: "num", description: "Число double precision.", example: "3.1" }
    ],
    example: "SELECT ceil(3.1); -- Результат: 4"
  },
  {
    id: "pg_ceil_numeric",
    name: "ceil",
    category: "Пользовательские функции",
    description: "Округляет число до ближайшего большего целого (для numeric).",
    syntax: "ceil(numeric)",
    arguments: [
      { name: "num", description: "Число numeric.", example: "3.1::numeric" }
    ],
    example: "SELECT ceil(3.1::numeric);"
  },
  {
    id: "pg_ceiling_float8",
    name: "ceiling",
    category: "Пользовательские функции",
    description: "Синоним функции ceil для double precision.",
    syntax: "ceiling(double precision)",
    arguments: [
      { name: "num", description: "Число double precision.", example: "4.2" }
    ],
    example: "SELECT ceiling(4.2);"
  },
  {
    id: "pg_ceiling_numeric",
    name: "ceiling",
    category: "Пользовательские функции",
    description: "Синоним функции ceil для numeric.",
    syntax: "ceiling(numeric)",
    arguments: [
      { name: "num", description: "Число numeric.", example: "4.2::numeric" }
    ],
    example: "SELECT ceiling(4.2::numeric);"
  },
  {
    id: "pg_center_circle",
    name: "center",
    category: "Пользовательские функции",
    description: "Возвращает центральную точку круга.",
    syntax: "center(circle)",
    arguments: [
      { name: "circle", description: "Круг.", example: "circle '<(0,0),2>'" }
    ],
    example: "SELECT center(circle '<(0,0),2>');"
  },
  {
    id: "pg_center_box",
    name: "center",
    category: "Пользовательские функции",
    description: "Возвращает центральную точку прямоугольника (box).",
    syntax: "center(box)",
    arguments: [
      { name: "box", description: "Прямоугольник.", example: "box '(0,0),(2,2)'" }
    ],
    example: "SELECT center(box '(0,0),(2,2)');"
  },
  {
    id: "pg_char_text",
    name: "char",
    category: "Пользовательские функции",
    description: "Преобразует текст в тип \"char\" (один байт).",
    syntax: "char(text)",
    arguments: [
      { name: "text", description: "Текст.", example: "'A'" }
    ],
    example: "SELECT char('ABC'); -- Вернет первый символ 'A'"
  },
  {
    id: "pg_char_int",
    name: "char",
    category: "Пользовательские функции",
    description: "Преобразует целое число в тип \"char\" (по коду символа).",
    syntax: "char(integer)",
    arguments: [
      { name: "code", description: "Код символа.", example: "65" }
    ],
    example: "SELECT char(65); -- Результат: 'A'"
  },
  {
    id: "pg_char_length_char",
    name: "char_length",
    category: "Пользовательские функции",
    description: "Возвращает количество символов в строке типа character.",
    syntax: "char_length(character)",
    arguments: [
      { name: "str", description: "Строка character.", example: "'test'::char(10)" }
    ],
    example: "SELECT char_length('test'::char(10));"
  },
  {
    id: "pg_char_length_text",
    name: "char_length",
    category: "Пользовательские функции",
    description: "Возвращает количество символов в текстовой строке.",
    syntax: "char_length(text)",
    arguments: [
      { name: "str", description: "Текстовая строка.", example: "'hello'" }
    ],
    example: "SELECT char_length('hello');"
  },
  {
    id: "pg_character_length_text",
    name: "character_length",
    category: "Пользовательские функции",
    description: "Синоним char_length для типа text.",
    syntax: "character_length(text)",
    arguments: [
      { name: "str", description: "Текстовая строка.", example: "'postgres'" }
    ],
    example: "SELECT character_length('postgres');"
  },
  {
    id: "pg_character_length_char",
    name: "character_length",
    category: "Пользовательские функции",
    description: "Синоним char_length для типа character.",
    syntax: "character_length(character)",
    arguments: [
      { name: "str", description: "Строка character.", example: "'abc'::char(5)" }
    ],
    example: "SELECT character_length('abc'::char(5));"
  },
  {
    id: "pg_chareq",
    name: "chareq",
    category: "Пользовательские функции",
    description: "Проверка на равенство значений типа \"char\".",
    syntax: "chareq(\"char\", \"char\")",
    arguments: [
      { name: "c1", description: "Первый символ.", example: "'a'::\"char\"" },
      { name: "c2", description: "Второй символ.", example: "'a'::\"char\"" }
    ],
    example: "SELECT chareq('a'::\"char\", 'a'::\"char\");"
  },
  {
    id: "pg_charge",
    name: "charge",
    category: "Пользовательские функции",
    description: "Проверка 'больше или равно' для типа \"char\".",
    syntax: "charge(\"char\", \"char\")",
    arguments: [
      { name: "c1", description: "Первый символ.", example: "'b'::\"char\"" },
      { name: "c2", description: "Второй символ.", example: "'a'::\"char\"" }
    ],
    example: "SELECT charge('b'::\"char\", 'a'::\"char\");"
  },
  {
    id: "pg_chargt",
    name: "chargt",
    category: "Пользовательские функции",
    description: "Проверка 'больше' для типа \"char\".",
    syntax: "chargt(\"char\", \"char\")",
    arguments: [
      { name: "c1", description: "Первый символ.", example: "'b'::\"char\"" },
      { name: "c2", description: "Второй символ.", example: "'a'::\"char\"" }
    ],
    example: "SELECT chargt('b'::\"char\", 'a'::\"char\");"
  },
  {
    id: "pg_charin",
    name: "charin",
    category: "Пользовательские функции",
    description: "Функция ввода для типа \"char\".",
    syntax: "charin(cstring)",
    arguments: [
      { name: "str", description: "Строка cstring.", example: "'a'::cstring" }
    ],
    example: "SELECT charin('a'::cstring);"
  },
  {
    id: "pg_charle",
    name: "charle",
    category: "Пользовательские функции",
    description: "Проверка 'меньше или равно' для типа \"char\".",
    syntax: "charle(\"char\", \"char\")",
    arguments: [
      { name: "c1", description: "Первый символ.", example: "'a'::\"char\"" },
      { name: "c2", description: "Второй символ.", example: "'b'::\"char\"" }
    ],
    example: "SELECT charle('a'::\"char\", 'b'::\"char\");"
  },
  {
    id: "pg_charlt",
    name: "charlt",
    category: "Пользовательские функции",
    description: "Проверка 'меньше' для типа \"char\".",
    syntax: "charlt(\"char\", \"char\")",
    arguments: [
      { name: "c1", description: "Первый символ.", example: "'a'::\"char\"" },
      { name: "c2", description: "Второй символ.", example: "'b'::\"char\"" }
    ],
    example: "SELECT charlt('a'::\"char\", 'b'::\"char\");"
  },
  {
    id: "pg_charne",
    name: "charne",
    category: "Пользовательские функции",
    description: "Проверка на неравенство значений типа \"char\".",
    syntax: "charne(\"char\", \"char\")",
    arguments: [
      { name: "c1", description: "Первый символ.", example: "'a'::\"char\"" },
      { name: "c2", description: "Второй символ.", example: "'b'::\"char\"" }
    ],
    example: "SELECT charne('a'::\"char\", 'b'::\"char\");"
  },
  {
    id: "pg_charout",
    name: "charout",
    category: "Пользовательские функции",
    description: "Функция вывода для типа \"char\".",
    syntax: "charout(\"char\")",
    arguments: [
      { name: "c", description: "Символ \"char\".", example: "'z'::\"char\"" }
    ],
    example: "SELECT charout('z'::\"char\");"
  },
  {
    id: "pg_charrecv",
    name: "charrecv",
    category: "Пользовательские функции",
    description: "Функция приема значения типа \"char\" в двоичном формате.",
    syntax: "charrecv(internal)",
    arguments: [
      { name: "internal", description: "Внутренний буфер.", example: "buf" }
    ],
    example: "-- Внутренняя системная функция"
  },
  {
    id: "pg_charsend",
    name: "charsend",
    category: "Пользовательские функции",
    description: "Функция отправки значения типа \"char\" в двоичном формате.",
    syntax: "charsend(\"char\")",
    arguments: [
      { name: "c", description: "Символ \"char\".", example: "'x'::\"char\"" }
    ],
    example: "SELECT charsend('x'::\"char\");"
  },
  {
    id: "pg_chr",
    name: "chr",
    category: "Пользовательские функции",
    description: "Возвращает символ с указанным кодом Unicode.",
    syntax: "chr(integer)",
    arguments: [
      { name: "code", description: "Код символа.", example: "65" }
    ],
    example: "SELECT chr(65); -- Результат: 'A'"
  },
  {
    id: "pg_cideq",
    name: "cideq",
    category: "Пользовательские функции",
    description: "Проверка на равенство значений CID (идентификатор команды).",
    syntax: "cideq(cid, cid)",
    arguments: [
      { name: "c1", description: "Первый CID.", example: "1" },
      { name: "c2", description: "Второй CID.", example: "1" }
    ],
    example: "SELECT cideq(1::cid, 1::cid);"
  },
  {
    id: "pg_cidin",
    name: "cidin",
    category: "Пользовательские функции",
    description: "Функция ввода для типа cid.",
    syntax: "cidin(cstring)",
    arguments: [
      { name: "str", description: "Строковое представление CID.", example: "'100'::cstring" }
    ],
    example: "SELECT cidin('100'::cstring);"
  },
  {
    id: "pg_cidout",
    name: "cidout",
    category: "Пользовательские функции",
    description: "Функция вывода для типа cid.",
    syntax: "cidout(cid)",
    arguments: [
      { name: "c", description: "Значение CID.", example: "50" }
    ],
    example: "SELECT cidout(50::cid);"
  },
  {
    id: "pg_cidr",
    name: "cidr",
    category: "Пользовательские функции",
    description: "Преобразует inet в cidr.",
    syntax: "cidr(inet)",
    arguments: [
      { name: "net", description: "Сетевой адрес.", example: "'192.168.1.5/24'::inet" }
    ],
    example: "SELECT cidr('192.168.1.5/24'::inet); -- Результат: '192.168.1.0/24'"
  },
  {
    id: "pg_cidr_in",
    name: "cidr_in",
    category: "Пользовательские функции",
    description: "Функция ввода для типа cidr.",
    syntax: "cidr_in(cstring)",
    arguments: [
      { name: "str", description: "Строковое представление CIDR.", example: "'10.0.0.0/8'::cstring" }
    ],
    example: "SELECT cidr_in('10.0.0.0/8'::cstring);"
  },
  {
    id: "pg_cidr_out",
    name: "cidr_out",
    category: "Пользовательские функции",
    description: "Функция вывода для типа cidr.",
    syntax: "cidr_out(cidr)",
    arguments: [
      { name: "net", description: "Сетевой адрес CIDR.", example: "'10.0.0.0/8'::cidr" }
    ],
    example: "SELECT cidr_out('10.0.0.0/8'::cidr);"
  },
  {
    id: "pg_cidr_recv",
    name: "cidr_recv",
    category: "Пользовательские функции",
    description: "Функция приема значения типа cidr в двоичном формате.",
    syntax: "cidr_recv(internal)",
    arguments: [
      { name: "internal", description: "Внутренний буфер.", example: "buf" }
    ],
    example: "-- Внутренняя системная функция"
  },
  {
    id: "pg_cidr_send",
    name: "cidr_send",
    category: "Пользовательские функции",
    description: "Функция отправки значения типа cidr в двоичном формате.",
    syntax: "cidr_send(cidr)",
    arguments: [
      { name: "net", description: "Сетевой адрес CIDR.", example: "'192.168.1.0/24'::cidr" }
    ],
    example: "SELECT cidr_send('192.168.1.0/24'::cidr);"
  },
  {
    id: "pg_cidrecv",
    name: "cidrecv",
    category: "Пользовательские функции",
    description: "Функция приема значения типа cid (Command ID) в двоичном формате.",
    syntax: "cidrecv(internal)",
    arguments: [
      { name: "internal", description: "Внутренний буфер.", example: "buf" }
    ],
    example: "-- Внутренняя системная функция"
  },
  {
    id: "pg_cidsend",
    name: "cidsend",
    category: "Пользовательские функции",
    description: "Функция отправки значения типа cid (Command ID) в двоичном формате.",
    syntax: "cidsend(cid)",
    arguments: [
      { name: "c", description: "Идентификатор команды.", example: "100::cid" }
    ],
    example: "SELECT cidsend(100::cid);"
  },
  {
    id: "pg_circle_point_float8",
    name: "circle",
    category: "Пользовательские функции",
    description: "Создает круг по центральной точке и радиусу.",
    syntax: "circle(point, double precision)",
    arguments: [
      { name: "center", description: "Центральная точка.", example: "point(0,0)" },
      { name: "radius", description: "Радиус.", example: "5.0" }
    ],
    example: "SELECT circle(point(0,0), 5.0);"
  },
  {
    id: "pg_circle_box",
    name: "circle",
    category: "Пользовательские функции",
    description: "Преобразует прямоугольник (box) в круг.",
    syntax: "circle(box)",
    arguments: [
      { name: "box", description: "Прямоугольник.", example: "box '(0,0),(2,2)'" }
    ],
    example: "SELECT circle(box '(0,0),(2,2)');"
  },
  {
    id: "pg_circle_polygon",
    name: "circle",
    category: "Пользовательские функции",
    description: "Преобразует многоугольник (polygon) в круг.",
    syntax: "circle(polygon)",
    arguments: [
      { name: "poly", description: "Многоугольник.", example: "polygon '((0,0),(1,1),(1,0))'" }
    ],
    example: "SELECT circle(polygon '((0,0),(1,1),(1,0))');"
  },
  {
    id: "pg_circle_above",
    name: "circle_above",
    category: "Пользовательские функции",
    description: "Проверяет, находится ли первый круг выше второго.",
    syntax: "circle_above(circle, circle)",
    arguments: [
      { name: "c1", description: "Первый круг.", example: "circle '<(0,10),1>'" },
      { name: "c2", description: "Второй круг.", example: "circle '<(0,0),1>'" }
    ],
    example: "SELECT circle '<(0,10),1>' >^ circle '<(0,0),1>';"
  },
  {
    id: "pg_circle_add_pt",
    name: "circle_add_pt",
    category: "Пользовательские функции",
    description: "Сдвигает круг на указанный вектор (точку).",
    syntax: "circle_add_pt(circle, point)",
    arguments: [
      { name: "circle", description: "Круг.", example: "circle '<(0,0),1>'" },
      { name: "point", description: "Вектор сдвига.", example: "point(1,2)" }
    ],
    example: "SELECT circle '<(0,0),1>' + point(1,2);"
  },
  {
    id: "pg_circle_below",
    name: "circle_below",
    category: "Пользовательские функции",
    description: "Проверяет, находится ли первый круг ниже второго.",
    syntax: "circle_below(circle, circle)",
    arguments: [
      { name: "c1", description: "Первый круг.", example: "circle '<(0,0),1>'" },
      { name: "c2", description: "Второй круг.", example: "circle '<(0,10),1>'" }
    ],
    example: "SELECT circle '<(0,0),1>' <^ circle '<(0,10),1>';"
  },
  {
    id: "pg_circle_center",
    name: "circle_center",
    category: "Пользовательские функции",
    description: "Возвращает центральную точку круга.",
    syntax: "circle_center(circle)",
    arguments: [
      { name: "circle", description: "Круг.", example: "circle '<(5,5),2>'" }
    ],
    example: "SELECT circle_center(circle '<(5,5),2>');"
  },
  {
    id: "pg_circle_contain",
    name: "circle_contain",
    category: "Пользовательские функции",
    description: "Проверяет, содержит ли первый круг второй круг.",
    syntax: "circle_contain(circle, circle)",
    arguments: [
      { name: "c1", description: "Внешний круг.", example: "circle '<(0,0),10>'" },
      { name: "c2", description: "Внутренний круг.", example: "circle '<(0,0),2>'" }
    ],
    example: "SELECT circle '<(0,0),10>' @> circle '<(0,0),2>';"
  },
  {
    id: "pg_circle_contain_pt",
    name: "circle_contain_pt",
    category: "Пользовательские функции",
    description: "Проверяет, содержит ли круг указанную точку.",
    syntax: "circle_contain_pt(circle, point)",
    arguments: [
      { name: "circle", description: "Круг.", example: "circle '<(0,0),5>'" },
      { name: "point", description: "Точка.", example: "point(1,1)" }
    ],
    example: "SELECT circle '<(0,0),5>' @> point(1,1);"
  },
  {
    id: "pg_circle_contained",
    name: "circle_contained",
    category: "Пользовательские функции",
    description: "Проверяет, содержится ли первый круг во втором круге.",
    syntax: "circle_contained(circle, circle)",
    arguments: [
      { name: "c1", description: "Внутренний круг.", example: "circle '<(0,0),2>'" },
      { name: "c2", description: "Внешний круг.", example: "circle '<(0,0),10>'" }
    ],
    example: "SELECT circle '<(0,0),2>' <@ circle '<(0,0),10>';"
  },
  {
    id: "pg_circle_distance",
    name: "circle_distance",
    category: "Пользовательские функции",
    description: "Вычисляет расстояние между границами двух кругов.",
    syntax: "circle_distance(circle, circle)",
    arguments: [
      { name: "c1", description: "Первый круг.", example: "circle '<(0,0),1>'" },
      { name: "c2", description: "Второй круг.", example: "circle '<(5,0),1>'" }
    ],
    example: "SELECT circle '<(0,0),1>' <-> circle '<(5,0),1>';"
  },
  {
    id: "pg_circle_div_pt",
    name: "circle_div_pt",
    category: "Пользовательские функции",
    description: "Делит координаты центра круга на координаты точки (масштабирование/сдвиг).",
    syntax: "circle_div_pt(circle, point)",
    arguments: [
      { name: "circle", description: "Круг.", example: "circle '<(10,10),2>'" },
      { name: "point", description: "Точка-делитель.", example: "point(2,2)" }
    ],
    example: "SELECT circle '<(10,10),2>' / point(2,2);"
  },
  {
    id: "pg_circle_eq",
    name: "circle_eq",
    category: "Пользовательские функции",
    description: "Проверка на равенство двух кругов (центр и радиус должны совпадать).",
    syntax: "circle_eq(circle, circle)",
    arguments: [
      { name: "c1", description: "Первый круг.", example: "circle '<(0,0),5>'" },
      { name: "c2", description: "Второй круг.", example: "circle '<(0,0),5>'" }
    ],
    example: "SELECT circle '<(0,0),5>' = circle '<(0,0),5>';"
  },
  {
    id: "pg_circle_ge",
    name: "circle_ge",
    category: "Пользовательские функции",
    description: "Сравнение площади кругов (больше или равно).",
    syntax: "circle_ge(circle, circle)",
    arguments: [
      { name: "c1", description: "Первый круг.", example: "circle '<(0,0),10>'" },
      { name: "c2", description: "Второй круг.", example: "circle '<(0,0),5>'" }
    ],
    example: "SELECT circle '<(0,0),10>' >= circle '<(0,0),5>';"
  },
  {
    id: "pg_circle_gt",
    name: "circle_gt",
    category: "Пользовательские функции",
    description: "Сравнение площади кругов (больше).",
    syntax: "circle_gt(circle, circle)",
    arguments: [
      { name: "c1", description: "Первый круг.", example: "circle '<(0,0),10>'" },
      { name: "c2", description: "Второй круг.", example: "circle '<(0,0),5>'" }
    ],
    example: "SELECT circle '<(0,0),10>' > circle '<(0,0),5>';"
  },
  {
    id: "pg_circle_in",
    name: "circle_in",
    category: "Пользовательские функции",
    description: "Функция ввода для типа circle.",
    syntax: "circle_in(cstring)",
    arguments: [
      { name: "str", description: "Строковое представление круга.", example: "'<(0,0),5>'::cstring" }
    ],
    example: "SELECT circle_in('<(0,0),5>'::cstring);"
  },
  {
    id: "pg_circle_le",
    name: "circle_le",
    category: "Пользовательские функции",
    description: "Сравнение площади кругов (меньше или равно).",
    syntax: "circle_le(circle, circle)",
    arguments: [
      { name: "c1", description: "Первый круг.", example: "circle '<(0,0),5>'" },
      { name: "c2", description: "Второй круг.", example: "circle '<(0,0),10>'" }
    ],
    example: "SELECT circle '<(0,0),5>' <= circle '<(0,0),10>';"
  },
  {
    id: "pg_circle_left",
    name: "circle_left",
    category: "Пользовательские функции",
    description: "Проверяет, находится ли первый круг строго слева от второго.",
    syntax: "circle_left(circle, circle)",
    arguments: [
      { name: "c1", description: "Первый круг.", example: "circle '<(0,0),1>'" },
      { name: "c2", description: "Второй круг.", example: "circle '<(10,0),1>'" }
    ],
    example: "SELECT circle '<(0,0),1>' << circle '<(10,0),1>';"
  },
  {
    id: "pg_circle_lt",
    name: "circle_lt",
    category: "Пользовательские функции",
    description: "Сравнение площади кругов (меньше).",
    syntax: "circle_lt(circle, circle)",
    arguments: [
      { name: "c1", description: "Первый круг.", example: "circle '<(0,0),5>'" },
      { name: "c2", description: "Второй круг.", example: "circle '<(0,0),10>'" }
    ],
    example: "SELECT circle '<(0,0),5>' < circle '<(0,0),10>';"
  },
  {
    id: "pg_circle_mul_pt",
    name: "circle_mul_pt",
    category: "Пользовательские функции",
    description: "Умножает координаты центра круга на координаты точки (масштабирование).",
    syntax: "circle_mul_pt(circle, point)",
    arguments: [
      { name: "circle", description: "Круг.", example: "circle '<(1,1),1>'" },
      { name: "point", description: "Множитель.", example: "point(2,2)" }
    ],
    example: "SELECT circle '<(1,1),1>' * point(2,2);"
  },
  {
    id: "pg_circle_ne",
    name: "circle_ne",
    category: "Пользовательские функции",
    description: "Проверка на неравенство двух кругов.",
    syntax: "circle_ne(circle, circle)",
    arguments: [
      { name: "c1", description: "Первый круг.", example: "circle '<(0,0),5>'" },
      { name: "c2", description: "Второй круг.", example: "circle '<(1,1),5>'" }
    ],
    example: "SELECT circle '<(0,0),5>' <> circle '<(1,1),5>';"
  },
  {
    id: "pg_circle_out",
    name: "circle_out",
    category: "Пользовательские функции",
    description: "Функция вывода для типа circle.",
    syntax: "circle_out(circle)",
    arguments: [
      { name: "circle", description: "Круг.", example: "circle '<(0,0),5>'" }
    ],
    example: "SELECT circle_out(circle '<(0,0),5>');"
  },
  {
    id: "pg_circle_overabove",
    name: "circle_overabove",
    category: "Пользовательские функции",
    description: "Проверяет, не находится ли первый круг ниже второго (может пересекаться).",
    syntax: "circle_overabove(circle, circle)",
    arguments: [
      { name: "c1", description: "Первый круг.", example: "circle '<(0,5),1>'" },
      { name: "c2", description: "Второй круг.", example: "circle '<(0,0),1>'" }
    ],
    example: "SELECT circle '<(0,5),1>' >| circle '<(0,0),1>';"
  },
  {
    id: "pg_circle_overbelow",
    name: "circle_overbelow",
    category: "Пользовательские функции",
    description: "Проверяет, не находится ли первый круг выше второго (может пересекаться).",
    syntax: "circle_overbelow(circle, circle)",
    arguments: [
      { name: "c1", description: "Первый круг.", example: "circle '<(0,0),1>'" },
      { name: "c2", description: "Второй круг.", example: "circle '<(0,5),1>'" }
    ],
    example: "SELECT circle '<(0,0),1>' <| circle '<(0,5),1>';"
  },
  {
    id: "pg_circle_overlap",
    name: "circle_overlap",
    category: "Пользовательские функции",
    description: "Проверяет, пересекаются ли два круга.",
    syntax: "circle_overlap(circle, circle)",
    arguments: [
      { name: "c1", description: "Первый круг.", example: "circle '<(0,0),2>'" },
      { name: "c2", description: "Второй круг.", example: "circle '<(1,1),2>'" }
    ],
    example: "SELECT circle '<(0,0),2>' && circle '<(1,1),2>';"
  },
  {
    id: "pg_circle_overleft",
    name: "circle_overleft",
    category: "Пользовательские функции",
    description: "Проверяет, не находится ли первый круг справа от второго (может пересекаться).",
    syntax: "circle_overleft(circle, circle)",
    arguments: [
      { name: "c1", description: "Первый круг.", example: "circle '<(0,0),1>'" },
      { name: "c2", description: "Второй круг.", example: "circle '<(5,0),1>'" }
    ],
    example: "SELECT circle '<(0,0),1>' &< circle '<(5,0),1>';"
  },
  {
    id: "pg_circle_overright",
    name: "circle_overright",
    category: "Пользовательские функции",
    description: "Проверяет, не находится ли первый круг слева от второго (может пересекаться).",
    syntax: "circle_overright(circle, circle)",
    arguments: [
      { name: "c1", description: "Первый круг.", example: "circle '<(5,0),1>'" },
      { name: "c2", description: "Второй круг.", example: "circle '<(0,0),1>'" }
    ],
    example: "SELECT circle '<(5,0),1>' &> circle '<(0,0),1>';"
  },
  {
    id: "pg_circle_recv",
    name: "circle_recv",
    category: "Пользовательские функции",
    description: "Функция приема значения типа circle в двоичном формате.",
    syntax: "circle_recv(internal)",
    arguments: [
      { name: "internal", description: "Внутренний буфер.", example: "buf" }
    ],
    example: "-- Внутренняя системная функция"
  },
  {
    id: "pg_circle_right",
    name: "circle_right",
    category: "Пользовательские функции",
    description: "Проверяет, находится ли первый круг строго справа от второго.",
    syntax: "circle_right(circle, circle)",
    arguments: [
      { name: "c1", description: "Первый круг.", example: "circle '<(10,0),1>'" },
      { name: "c2", description: "Второй круг.", example: "circle '<(0,0),1>'" }
    ],
    example: "SELECT circle '<(10,0),1>' >> circle '<(0,0),1>';"
  },
  {
    id: "pg_circle_same",
    name: "circle_same",
    category: "Пользовательские функции",
    description: "Проверяет, совпадают ли два круга (центр и радиус).",
    syntax: "circle_same(circle, circle)",
    arguments: [
      { name: "c1", description: "Первый круг.", example: "circle '<(0,0),5>'" },
      { name: "c2", description: "Второй круг.", example: "circle '<(0,0),5>'" }
    ],
    example: "SELECT circle '<(0,0),5>' ~= circle '<(0,0),5>';"
  },
  {
    id: "pg_circle_send",
    name: "circle_send",
    category: "Пользовательские функции",
    description: "Функция отправки значения типа circle в двоичном формате.",
    syntax: "circle_send(circle)",
    arguments: [
      { name: "circle", description: "Круг.", example: "circle '<(0,0),5>'" }
    ],
    example: "SELECT circle_send(circle '<(0,0),5>');"
  },
  {
    id: "pg_circle_sub_pt",
    name: "circle_sub_pt",
    category: "Пользовательские функции",
    description: "Сдвигает круг, вычитая координаты точки из центра.",
    syntax: "circle_sub_pt(circle, point)",
    arguments: [
      { name: "circle", description: "Круг.", example: "circle '<(1,1),1>'" },
      { name: "point", description: "Вектор сдвига.", example: "point(1,1)" }
    ],
    example: "SELECT circle '<(1,1),1>' - point(1,1);"
  },
  {
    id: "pg_clock_timestamp",
    name: "clock_timestamp",
    category: "Пользовательские функции",
    description: "Возвращает текущую метку времени, которая изменяется во время выполнения транзакции.",
    syntax: "clock_timestamp()",
    arguments: [],
    example: "SELECT clock_timestamp();"
  },
  {
    id: "pg_close_ls",
    name: "close_ls",
    category: "Пользовательские функции",
    description: "Находит ближайшую точку на линии к отрезку.",
    syntax: "close_ls(line, lseg)",
    arguments: [
      { name: "line", description: "Линия.", example: "line '{1,-1,0}'" },
      { name: "lseg", description: "Отрезок.", example: "lseg '((0,0),(1,1))'" }
    ],
    example: "SELECT close_ls(line '{1,-1,0}', lseg '((0,0),(1,1))');"
  },
  {
    id: "pg_close_lseg",
    name: "close_lseg",
    category: "Пользовательские функции",
    description: "Находит ближайшую точку на одном отрезке к другому отрезку.",
    syntax: "close_lseg(lseg, lseg)",
    arguments: [
      { name: "s1", description: "Первый отрезок.", example: "lseg '((0,0),(1,1))'" },
      { name: "s2", description: "Второй отрезок.", example: "lseg '((2,0),(2,2))'" }
    ],
    example: "SELECT close_lseg(lseg '((0,0),(1,1))', lseg '((2,0),(2,2))');"
  },
  {
    id: "pg_close_pb",
    name: "close_pb",
    category: "Пользовательские функции",
    description: "Находит ближайшую точку на прямоугольнике (box) к заданной точке.",
    syntax: "close_pb(point, box)",
    arguments: [
      { name: "pt", description: "Точка.", example: "point(5,5)" },
      { name: "box", description: "Прямоугольник.", example: "box '(0,0),(2,2)'" }
    ],
    example: "SELECT close_pb(point(5,5), box '(0,0),(2,2)');"
  },
  {
    id: "pg_close_pl",
    name: "close_pl",
    category: "Пользовательские функции",
    description: "Находит ближайшую точку на линии к заданной точке.",
    syntax: "close_pl(point, line)",
    arguments: [
      { name: "pt", description: "Точка.", example: "point(0,0)" },
      { name: "line", description: "Линия.", example: "line '{1,1,-2}'" }
    ],
    example: "SELECT close_pl(point(0,0), line '{1,1,-2}');"
  },
  {
    id: "pg_close_ps",
    name: "close_ps",
    category: "Пользовательские функции",
    description: "Находит ближайшую точку на отрезке к заданной точке.",
    syntax: "close_ps(point, lseg)",
    arguments: [
      { name: "pt", description: "Точка.", example: "point(5,5)" },
      { name: "lseg", description: "Отрезок.", example: "lseg '((0,0),(2,2))'" }
    ],
    example: "SELECT close_ps(point(5,5), lseg '((0,0),(2,2))');"
  },
  {
    id: "pg_close_sb",
    name: "close_sb",
    category: "Пользовательские функции",
    description: "Находит ближайшую точку на прямоугольнике (box) к отрезку.",
    syntax: "close_sb(lseg, box)",
    arguments: [
      { name: "lseg", description: "Отрезок.", example: "lseg '((5,5),(6,6))'" },
      { name: "box", description: "Прямоугольник.", example: "box '(0,0),(2,2)'" }
    ],
    example: "SELECT close_sb(lseg '((5,5),(6,6))', box '(0,0),(2,2)');"
  },
  {
    id: "pg_col_description",
    name: "col_description",
    category: "Пользовательские функции",
    description: "Возвращает комментарий к колонке таблицы.",
    syntax: "col_description(oid, integer)",
    arguments: [
      { name: "table_oid", description: "OID таблицы.", example: "16384" },
      { name: "column_number", description: "Номер колонки.", example: "1" }
    ],
    example: "SELECT col_description('my_table'::regclass, 1);"
  },
  {
    id: "pg_concat",
    name: "concat",
    category: "Пользовательские функции",
    description: "Объединяет строковые представления всех аргументов в одну строку.",
    syntax: "concat(VARIADIC \"any\")",
    arguments: [
      { name: "args", description: "Список аргументов любого типа.", example: "'ID: ', 123, ', Name: ', 'John'" }
    ],
    example: "SELECT concat('Hello ', 'World', 2024);"
  },
  {
    id: "pg_concat_ws",
    name: "concat_ws",
    category: "Пользовательские функции",
    description: "Объединяет строки с использованием указанного разделителя.",
    syntax: "concat_ws(text, VARIADIC \"any\")",
    arguments: [
      { name: "sep", description: "Разделитель.", example: "', '" },
      { name: "args", description: "Список аргументов.", example: "'A', 'B', 'C'" }
    ],
    example: "SELECT concat_ws(', ', 'First', 'Second', 'Third');"
  },
  {
    id: "pg_contjoinsel",
    name: "contjoinsel",
    category: "Пользовательские функции",
    description: "Функция оценки селективности для соединения по условию 'содержит' (внутренняя).",
    syntax: "contjoinsel(internal, oid, internal, smallint, internal)",
    arguments: [
      { name: "internal", description: "Внутренние параметры планировщика.", example: "..." }
    ],
    example: "-- Используется оптимизатором запросов"
  },
  {
    id: "pg_contsel",
    name: "contsel",
    category: "Пользовательские функции",
    description: "Функция оценки селективности для условия 'содержит' (внутренняя).",
    syntax: "contsel(internal, oid, internal, integer)",
    arguments: [
      { name: "internal", description: "Внутренние параметры планировщика.", example: "..." }
    ],
    example: "-- Используется оптимизатором запросов"
  },
  {
    id: "pg_convert",
    name: "convert",
    category: "Пользовательские функции",
    description: "Преобразует строку bytea между кодировками.",
    syntax: "convert(bytea, name, name)",
    arguments: [
      { name: "string", description: "Строка в формате bytea.", example: "'\\x...'::bytea" },
      { name: "src_encoding", description: "Исходная кодировка.", example: "'LATIN1'" },
      { name: "dest_encoding", description: "Целевая кодировка.", example: "'UTF8'" }
    ],
    example: "SELECT convert('\\x61'::bytea, 'LATIN1', 'UTF8');"
  },
  {
    id: "pg_convert_from",
    name: "convert_from",
    category: "Пользовательские функции",
    description: "Преобразует строку bytea в текст, используя указанную кодировку.",
    syntax: "convert_from(bytea, name)",
    arguments: [
      { name: "string", description: "Двоичные данные.", example: "'\\x616263'::bytea" },
      { name: "src_encoding", description: "Кодировка.", example: "'UTF8'" }
    ],
    example: "SELECT convert_from('\\x616263'::bytea, 'UTF8');"
  },
  {
    id: "pg_convert_to",
    name: "convert_to",
    category: "Пользовательские функции",
    description: "Преобразует текст в bytea в указанной кодировке.",
    syntax: "convert_to(text, name)",
    arguments: [
      { name: "string", description: "Исходный текст.", example: "'abc'" },
      { name: "dest_encoding", description: "Кодировка.", example: "'UTF8'" }
    ],
    example: "SELECT convert_to('abc', 'UTF8');"
  },
  {
    id: "pg_cos",
    name: "cos",
    category: "Пользовательские функции",
    description: "Вычисляет косинус угла (в радианах).",
    syntax: "cos(double precision)",
    arguments: [
      { name: "rad", description: "Угол в радианах.", example: "3.14159" }
    ],
    example: "SELECT cos(3.14159);"
  },
  {
    id: "pg_cosd",
    name: "cosd",
    category: "Пользовательские функции",
    description: "Вычисляет косинус угла (в градусах).",
    syntax: "cosd(double precision)",
    arguments: [
      { name: "deg", description: "Угол в градусах.", example: "90" }
    ],
    example: "SELECT cosd(90);"
  },
  {
    id: "pg_cosh",
    name: "cosh",
    category: "Пользовательские функции",
    description: "Вычисляет гиперболический косинус.",
    syntax: "cosh(double precision)",
    arguments: [
      { name: "val", description: "Значение.", example: "0" }
    ],
    example: "SELECT cosh(0);"
  },
  {
    id: "pg_cot",
    name: "cot",
    category: "Пользовательские функции",
    description: "Вычисляет котангенс угла (в радианах).",
    syntax: "cot(double precision)",
    arguments: [
      { name: "rad", description: "Угол в радианах.", example: "1.0" }
    ],
    example: "SELECT cot(1.0);"
  },
  {
    id: "pg_cotd",
    name: "cotd",
    category: "Пользовательские функции",
    description: "Вычисляет котангенс угла (в градусах).",
    syntax: "cotd(double precision)",
    arguments: [
      { name: "deg", description: "Угол в градусах.", example: "45" }
    ],
    example: "SELECT cotd(45);"
  },
  {
    id: "pg_crc32",
    name: "crc32",
    category: "Пользовательские функции",
    description: "Вычисляет 32-битный циклической избыточный код (CRC-32) данных.",
    syntax: "crc32(bytea)",
    arguments: [
      { name: "data", description: "Двоичные данные.", example: "'hello'::bytea" }
    ],
    example: "SELECT crc32('hello'::bytea);"
  },
  {
    id: "pg_crc32c",
    name: "crc32c",
    category: "Пользовательские функции",
    description: "Вычисляет CRC-32C (Castagnoli) контрольную сумму.",
    syntax: "crc32c(bytea)",
    arguments: [
      { name: "data", description: "Двоичные данные.", example: "'data'::bytea" }
    ],
    example: "SELECT crc32c('data'::bytea);"
  },
  {
    id: "pg_cstring_in",
    name: "cstring_in",
    category: "Пользовательские функции",
    description: "Функция ввода для типа cstring (строка в стиле C).",
    syntax: "cstring_in(cstring)",
    arguments: [
      { name: "str", description: "Строка cstring.", example: "'test'::cstring" }
    ],
    example: "SELECT cstring_in('test'::cstring);"
  },
  {
    id: "pg_cstring_out",
    name: "cstring_out",
    category: "Пользовательские функции",
    description: "Функция вывода для типа cstring.",
    syntax: "cstring_out(cstring)",
    arguments: [
      { name: "str", description: "Строка cstring.", example: "'abc'::cstring" }
    ],
    example: "SELECT cstring_out('abc'::cstring);"
  },
  {
    id: "pg_cstring_recv",
    name: "cstring_recv",
    category: "Пользовательские функции",
    description: "Функция приема cstring в двоичном формате.",
    syntax: "cstring_recv(internal)",
    arguments: [
      { name: "internal", description: "Внутренний буфер.", example: "buf" }
    ],
    example: "-- Внутренняя системная функция"
  },
  {
    id: "pg_cstring_send",
    name: "cstring_send",
    category: "Пользовательские функции",
    description: "Функция отправки cstring в двоичном формате.",
    syntax: "cstring_send(cstring)",
    arguments: [
      { name: "str", description: "Строка cstring.", example: "'msg'::cstring" }
    ],
    example: "SELECT cstring_send('msg'::cstring);"
  },
  {
    id: "pg_cume_dist_final",
    name: "cume_dist_final",
    category: "Пользовательские функции",
    description: "Финальная функция для оконной функции cume_dist().",
    syntax: "cume_dist_final(internal, VARIADIC \"any\")",
    arguments: [
      { name: "internal", description: "Внутреннее состояние агрегации.", example: "state" }
    ],
    example: "-- Используется механизмом оконных функций"
  },
  {
    id: "pg_current_database",
    name: "current_database",
    category: "Пользовательские функции",
    description: "Возвращает имя текущей базы данных.",
    syntax: "current_database()",
    arguments: [],
    example: "SELECT current_database();"
  },
  {
    id: "pg_current_query",
    name: "current_query",
    category: "Пользовательские функции",
    description: "Возвращает текст текущего выполняемого запроса.",
    syntax: "current_query()",
    arguments: [],
    example: "SELECT current_query();"
  },
  {
    id: "pg_current_schema",
    name: "current_schema",
    category: "Пользовательские функции",
    description: "Возвращает имя текущей схемы (первая в пути поиска).",
    syntax: "current_schema()",
    arguments: [],
    example: "SELECT current_schema();"
  },
  {
    id: "pg_current_schemas",
    name: "current_schemas",
    category: "Пользовательские функции",
    description: "Возвращает массив имен всех схем в текущем пути поиска.",
    syntax: "current_schemas(boolean)",
    arguments: [
      { name: "include_implicit", description: "Включать ли неявные схемы (например, pg_catalog).", example: "true" }
    ],
    example: "SELECT current_schemas(true);"
  },
  {
    id: "pg_current_setting_text",
    name: "current_setting",
    category: "Пользовательские функции",
    description: "Возвращает текущее значение указанного параметра конфигурации.",
    syntax: "current_setting(text)",
    arguments: [
      { name: "name", description: "Имя параметра.", example: "'datestyle'" }
    ],
    example: "SELECT current_setting('datestyle');"
  },
  {
    id: "pg_current_setting_text_bool",
    name: "current_setting",
    category: "Пользовательские функции",
    description: "Возвращает значение параметра конфигурации с возможностью игнорирования отсутствующих настроек.",
    syntax: "current_setting(text, boolean)",
    arguments: [
      { name: "name", description: "Имя параметра.", example: "'server_version'" },
      { name: "missing_ok", description: "Если true, возвращает NULL вместо ошибки, если параметр не найден.", example: "true" }
    ],
    example: "SELECT current_setting('non_existent', true);"
  },
  {
    id: "pg_current_user",
    name: "current_user",
    category: "Пользовательские функции",
    description: "Возвращает имя текущего пользователя.",
    syntax: "current_user",
    arguments: [],
    example: "SELECT current_user;"
  },
  {
    id: "pg_currtid2",
    name: "currtid2",
    category: "Пользовательские функции",
    description: "Получает текущий TID (идентификатор строки) для таблицы по её имени и старому TID (используется внутри системы).",
    syntax: "currtid2(text, tid)",
    arguments: [
      { name: "relname", description: "Имя таблицы.", example: "'my_table'" },
      { name: "old_tid", description: "Старый идентификатор строки.", example: "'(0,1)'::tid" }
    ],
    example: "SELECT currtid2('my_table', '(0,1)'::tid);"
  },
  {
    id: "pg_currval",
    name: "currval",
    category: "Пользовательские функции",
    description: "Возвращает значение, полученное при последнем вызове nextval для указанной последовательности в текущем сеансе.",
    syntax: "currval(regclass)",
    arguments: [
      { name: "sequence", description: "Имя или OID последовательности.", example: "'my_seq'::regclass" }
    ],
    example: "SELECT currval('my_sequence_name');"
  },
  {
    id: "pg_cursor_to_xml",
    name: "cursor_to_xml",
    category: "Пользовательские функции",
    description: "Экспортирует результат открытого курсора в XML.",
    syntax: "cursor_to_xml(cursor refcursor, count integer, nulls boolean, tableforest boolean, targetns text)",
    arguments: [
      { name: "cursor", description: "Имя курсора.", example: "my_cursor" },
      { name: "count", description: "Максимальное количество строк.", example: "10" },
      { name: "nulls", description: "Включать ли пустые значения.", example: "true" },
      { name: "tableforest", description: "Формат вывода (лес таблиц).", example: "false" },
      { name: "targetns", description: "Целевое пространство имен.", example: "''" }
    ],
    example: "-- Экспорт данных курсора в XML формат"
  },
  {
    id: "pg_cursor_to_xmlschema",
    name: "cursor_to_xmlschema",
    category: "Пользовательские функции",
    description: "Генерирует схему XML (XSD) для результата курсора.",
    syntax: "cursor_to_xmlschema(cursor refcursor, nulls boolean, tableforest boolean, targetns text)",
    arguments: [
      { name: "cursor", description: "Имя курсора.", example: "my_cursor" }
    ],
    example: "-- Получение XSD схемы для курсора"
  },
  {
    id: "pg_database_to_xml",
    name: "database_to_xml",
    category: "Пользовательские функции",
    description: "Экспортирует всю текущую базу данных в XML.",
    syntax: "database_to_xml(nulls boolean, tableforest boolean, targetns text)",
    arguments: [
      { name: "nulls", description: "Включать ли NULL.", example: "true" }
    ],
    example: "SELECT database_to_xml(true, false, '');"
  },
  {
    id: "pg_database_to_xml_and_xmlschema",
    name: "database_to_xml_and_xmlschema",
    category: "Пользовательские функции",
    description: "Экспортирует базу данных в XML вместе со схемой XSD.",
    syntax: "database_to_xml_and_xmlschema(nulls boolean, tableforest boolean, targetns text)",
    arguments: [],
    example: "SELECT database_to_xml_and_xmlschema(true, false, '');"
  },
  {
    id: "pg_database_to_xmlschema",
    name: "database_to_xmlschema",
    category: "Пользовательские функции",
    description: "Генерирует XSD схему для всей базы данных.",
    syntax: "database_to_xmlschema(nulls boolean, tableforest boolean, targetns text)",
    arguments: [],
    example: "SELECT database_to_xmlschema(true, false, '');"
  },
  {
    id: "pg_date_timestamp",
    name: "date",
    category: "Пользовательские функции",
    description: "Извлекает дату из метки времени (timestamp).",
    syntax: "date(timestamp)",
    arguments: [
      { name: "ts", description: "Метка времени.", example: "now()" }
    ],
    example: "SELECT date(now());"
  },
  {
    id: "pg_date_add",
    name: "date_add",
    category: "Пользовательские функции",
    description: "Добавляет интервал к метке времени.",
    syntax: "date_add(timestamp with time zone, interval)",
    arguments: [
      { name: "ts", description: "Метка времени.", example: "now()" },
      { name: "delta", description: "Интервал.", example: "interval '1 day'" }
    ],
    example: "SELECT date_add(now(), interval '1 day');"
  },
  {
    id: "pg_date_bin_tz",
    name: "date_bin",
    category: "Пользовательские функции",
    description: "Округляет метку времени до ближайшего интервала (бинирование).",
    syntax: "date_bin(interval, timestamp with time zone, timestamp with time zone)",
    arguments: [
      { name: "stride", description: "Шаг интервала.", example: "interval '15 minutes'" },
      { name: "source", description: "Исходная метка времени.", example: "now()" },
      { name: "origin", description: "Начало отсчета.", example: "'2000-01-01'::timestamptz" }
    ],
    example: "SELECT date_bin('15 minutes', now(), '2000-01-01');"
  },
  {
    id: "pg_date_cmp",
    name: "date_cmp",
    category: "Пользовательские функции",
    description: "Сравнивает две даты. Возвращает -1, 0 или 1.",
    syntax: "date_cmp(date, date)",
    arguments: [
      { name: "date1", description: "Первая дата.", example: "'2023-01-01'::date" },
      { name: "date2", description: "Вторая дата.", example: "'2023-01-02'::date" }
    ],
    example: "SELECT date_cmp('2023-01-01'::date, '2023-01-02'::date);"
  },
  {
    id: "pg_date_cmp_timestamp",
    name: "date_cmp_timestamp",
    category: "Пользовательские функции",
    description: "Сравнивает дату с меткой времени без часового пояса.",
    syntax: "date_cmp_timestamp(date, timestamp without time zone)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-01'::date" },
      { name: "ts", description: "Метка времени.", example: "'2023-01-01 12:00:00'::timestamp" }
    ],
    example: "SELECT date_cmp_timestamp('2023-01-01'::date, '2023-01-01 12:00:00'::timestamp);"
  },
  {
    id: "pg_date_cmp_timestamptz",
    name: "date_cmp_timestamptz",
    category: "Пользовательские функции",
    description: "Сравнивает дату с меткой времени с часовым поясом.",
    syntax: "date_cmp_timestamptz(date, timestamp with time zone)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-01'::date" },
      { name: "tstz", description: "Метка времени с часовым поясом.", example: "now()" }
    ],
    example: "SELECT date_cmp_timestamptz('2023-01-01'::date, now());"
  },
  {
    id: "pg_date_eq",
    name: "date_eq",
    category: "Пользовательские функции",
    description: "Проверяет равенство двух дат.",
    syntax: "date_eq(date, date)",
    arguments: [
      { name: "date1", description: "Первая дата.", example: "'2023-01-01'::date" },
      { name: "date2", description: "Вторая дата.", example: "'2023-01-01'::date" }
    ],
    example: "SELECT date_eq('2023-01-01'::date, '2023-01-01'::date);"
  },
  {
    id: "pg_date_eq_timestamp",
    name: "date_eq_timestamp",
    category: "Пользовательские функции",
    description: "Проверяет равенство даты и метки времени без часового пояса.",
    syntax: "date_eq_timestamp(date, timestamp without time zone)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-01'::date" },
      { name: "ts", description: "Метка времени.", example: "'2023-01-01 00:00:00'::timestamp" }
    ],
    example: "SELECT date_eq_timestamp('2023-01-01'::date, '2023-01-01 00:00:00'::timestamp);"
  },
  {
    id: "pg_date_eq_timestamptz",
    name: "date_eq_timestamptz",
    category: "Пользовательские функции",
    description: "Проверяет равенство даты и метки времени с часовым поясом.",
    syntax: "date_eq_timestamptz(date, timestamp with time zone)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-01'::date" },
      { name: "tstz", description: "Метка времени с часовым поясом.", example: "'2023-01-01 00:00:00Z'::timestamptz" }
    ],
    example: "SELECT date_eq_timestamptz('2023-01-01'::date, '2023-01-01 00:00:00Z'::timestamptz);"
  },
  {
    id: "pg_date_ge",
    name: "date_ge",
    category: "Пользовательские функции",
    description: "Проверяет, что первая дата больше или равна второй.",
    syntax: "date_ge(date, date)",
    arguments: [
      { name: "date1", description: "Первая дата.", example: "'2023-01-02'::date" },
      { name: "date2", description: "Вторая дата.", example: "'2023-01-01'::date" }
    ],
    example: "SELECT date_ge('2023-01-02'::date, '2023-01-01'::date);"
  },
  {
    id: "pg_date_ge_timestamp",
    name: "date_ge_timestamp",
    category: "Пользовательские функции",
    description: "Проверяет, что дата больше или равна метке времени без часового пояса.",
    syntax: "date_ge_timestamp(date, timestamp without time zone)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-02'::date" },
      { name: "ts", description: "Метка времени.", example: "'2023-01-01 12:00:00'::timestamp" }
    ],
    example: "SELECT date_ge_timestamp('2023-01-02'::date, '2023-01-01 12:00:00'::timestamp);"
  },
  {
    id: "pg_date_ge_timestamptz",
    name: "date_ge_timestamptz",
    category: "Пользовательские функции",
    description: "Проверяет, что дата больше или равна метке времени с часовым поясом.",
    syntax: "date_ge_timestamptz(date, timestamp with time zone)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-02'::date" },
      { name: "tstz", description: "Метка времени с часовым поясом.", example: "now()" }
    ],
    example: "SELECT date_ge_timestamptz('2023-01-02'::date, now());"
  },
  {
    id: "pg_date_gt",
    name: "date_gt",
    category: "Пользовательские функции",
    description: "Проверяет, что первая дата строго больше второй.",
    syntax: "date_gt(date, date)",
    arguments: [
      { name: "date1", description: "Первая дата.", example: "'2023-01-02'::date" },
      { name: "date2", description: "Вторая дата.", example: "'2023-01-01'::date" }
    ],
    example: "SELECT date_gt('2023-01-02'::date, '2023-01-01'::date);"
  },
  {
    id: "pg_date_gt_timestamp",
    name: "date_gt_timestamp",
    category: "Пользовательские функции",
    description: "Проверяет, что дата строго больше метки времени без часового пояса.",
    syntax: "date_gt_timestamp(date, timestamp without time zone)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-02'::date" },
      { name: "ts", description: "Метка времени.", example: "'2023-01-01 12:00:00'::timestamp" }
    ],
    example: "SELECT date_gt_timestamp('2023-01-02'::date, '2023-01-01 12:00:00'::timestamp);"
  },
  {
    id: "pg_date_gt_timestamptz",
    name: "date_gt_timestamptz",
    category: "Пользовательские функции",
    description: "Проверяет, что дата строго больше метки времени с часовым поясом.",
    syntax: "date_gt_timestamptz(date, timestamp with time zone)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-02'::date" },
      { name: "tstz", description: "Метка времени с часовым поясом.", example: "now()" }
    ],
    example: "SELECT date_gt_timestamptz('2023-01-02'::date, now());"
  },
  {
    id: "pg_date_in",
    name: "date_in",
    category: "Пользовательские функции",
    description: "Функция ввода для типа date.",
    syntax: "date_in(cstring)",
    arguments: [
      { name: "str", description: "Строковое представление даты.", example: "'2023-01-01'::cstring" }
    ],
    example: "SELECT date_in('2023-01-01'::cstring);"
  },
  {
    id: "pg_date_larger",
    name: "date_larger",
    category: "Пользовательские функции",
    description: "Возвращает позднюю из двух дат.",
    syntax: "date_larger(date, date)",
    arguments: [
      { name: "date1", description: "Первая дата.", example: "'2023-01-01'::date" },
      { name: "date2", description: "Вторая дата.", example: "'2023-01-02'::date" }
    ],
    example: "SELECT date_larger('2023-01-01'::date, '2023-01-02'::date);"
  },
  {
    id: "pg_date_le",
    name: "date_le",
    category: "Пользовательские функции",
    description: "Проверяет, что первая дата меньше или равна второй.",
    syntax: "date_le(date, date)",
    arguments: [
      { name: "date1", description: "Первая дата.", example: "'2023-01-01'::date" },
      { name: "date2", description: "Вторая дата.", example: "'2023-01-02'::date" }
    ],
    example: "SELECT date_le('2023-01-01'::date, '2023-01-02'::date);"
  },
  {
    id: "pg_date_le_timestamp",
    name: "date_le_timestamp",
    category: "Пользовательские функции",
    description: "Проверяет, что дата меньше или равна метке времени без часового пояса.",
    syntax: "date_le_timestamp(date, timestamp without time zone)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-01'::date" },
      { name: "ts", description: "Метка времени.", example: "'2023-01-01 12:00:00'::timestamp" }
    ],
    example: "SELECT date_le_timestamp('2023-01-01'::date, '2023-01-01 12:00:00'::timestamp);"
  },
  {
    id: "pg_date_le_timestamptz",
    name: "date_le_timestamptz",
    category: "Пользовательские функции",
    description: "Проверяет, что дата меньше или равна метке времени с часовым поясом.",
    syntax: "date_le_timestamptz(date, timestamp with time zone)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-01'::date" },
      { name: "tstz", description: "Метка времени с часовым поясом.", example: "now()" }
    ],
    example: "SELECT date_le_timestamptz('2023-01-01'::date, now());"
  },
  {
    id: "pg_date_lt",
    name: "date_lt",
    category: "Пользовательские функции",
    description: "Проверяет, что первая дата строго меньше второй.",
    syntax: "date_lt(date, date)",
    arguments: [
      { name: "date1", description: "Первая дата.", example: "'2023-01-01'::date" },
      { name: "date2", description: "Вторая дата.", example: "'2023-01-02'::date" }
    ],
    example: "SELECT date_lt('2023-01-01'::date, '2023-01-02'::date);"
  },
  {
    id: "pg_date_lt_timestamp",
    name: "date_lt_timestamp",
    category: "Пользовательские функции",
    description: "Проверяет, что дата строго меньше метки времени без часового пояса.",
    syntax: "date_lt_timestamp(date, timestamp without time zone)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-01'::date" },
      { name: "ts", description: "Метка времени.", example: "'2023-01-01 12:00:00'::timestamp" }
    ],
    example: "SELECT date_lt_timestamp('2023-01-01'::date, '2023-01-01 12:00:00'::timestamp);"
  },
  {
    id: "pg_date_lt_timestamptz",
    name: "date_lt_timestamptz",
    category: "Пользовательские функции",
    description: "Проверяет, что дата строго меньше метки времени с часовым поясом.",
    syntax: "date_lt_timestamptz(date, timestamp with time zone)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-01'::date" },
      { name: "tstz", description: "Метка времени с часовым поясом.", example: "now()" }
    ],
    example: "SELECT date_lt_timestamptz('2023-01-01'::date, now());"
  },
  {
    id: "pg_date_mi",
    name: "date_mi",
    category: "Пользовательские функции",
    description: "Вычисляет разницу в днях между двумя датами.",
    syntax: "date_mi(date, date)",
    arguments: [
      { name: "date1", description: "Уменьшаемая дата.", example: "'2023-01-10'::date" },
      { name: "date2", description: "Вычитаемая дата.", example: "'2023-01-01'::date" }
    ],
    example: "SELECT '2023-01-10'::date - '2023-01-01'::date;"
  },
  {
    id: "pg_date_mi_interval",
    name: "date_mi_interval",
    category: "Пользовательские функции",
    description: "Вычитает интервал из даты (возвращает timestamp).",
    syntax: "date_mi_interval(date, interval)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-01'::date" },
      { name: "delta", description: "Интервал.", example: "interval '1 hour'" }
    ],
    example: "SELECT '2023-01-01'::date - interval '1 hour';"
  },
  {
    id: "pg_date_mii",
    name: "date_mii",
    category: "Пользовательские функции",
    description: "Вычитает количество дней из даты.",
    syntax: "date_mii(date, integer)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-10'::date" },
      { name: "days", description: "Количество дней.", example: "5" }
    ],
    example: "SELECT '2023-01-10'::date - 5;"
  },
  {
    id: "pg_date_ne",
    name: "date_ne",
    category: "Пользовательские функции",
    description: "Проверяет на неравенство две даты.",
    syntax: "date_ne(date, date)",
    arguments: [
      { name: "date1", description: "Первая дата.", example: "'2023-01-01'::date" },
      { name: "date2", description: "Вторая дата.", example: "'2023-01-02'::date" }
    ],
    example: "SELECT '2023-01-01'::date <> '2023-01-02'::date;"
  },
  {
    id: "pg_date_ne_timestamp",
    name: "date_ne_timestamp",
    category: "Пользовательские функции",
    description: "Проверяет на неравенство дату и метку времени без часового пояса.",
    syntax: "date_ne_timestamp(date, timestamp without time zone)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-01'::date" },
      { name: "ts", description: "Метка времени.", example: "'2023-01-01 12:00:00'::timestamp" }
    ],
    example: "SELECT date_ne_timestamp('2023-01-01'::date, '2023-01-01 12:00:00'::timestamp);"
  },
  {
    id: "pg_date_ne_timestamptz",
    name: "date_ne_timestamptz",
    category: "Пользовательские функции",
    description: "Проверяет на неравенство дату и метку времени с часовым поясом.",
    syntax: "date_ne_timestamptz(date, timestamp with time zone)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-01'::date" },
      { name: "tstz", description: "Метка времени с часовым поясом.", example: "now()" }
    ],
    example: "SELECT date_ne_timestamptz('2023-01-01'::date, now());"
  },
  {
    id: "pg_date_out",
    name: "date_out",
    category: "Пользовательские функции",
    description: "Функция вывода для типа date.",
    syntax: "date_out(date)",
    arguments: [
      { name: "date", description: "Значение даты.", example: "'2023-01-01'::date" }
    ],
    example: "SELECT date_out('2023-01-01'::date);"
  },
  {
    id: "pg_date_part_date",
    name: "date_part",
    category: "Пользовательские функции",
    description: "Извлекает подполе (например, год или месяц) из даты.",
    syntax: "date_part(text, date)",
    arguments: [
      { name: "field", description: "Часть даты (year, month, day и т.д.).", example: "'year'" },
      { name: "source", description: "Источник данных.", example: "'2023-01-01'::date" }
    ],
    example: "SELECT date_part('year', '2023-01-01'::date);"
  },
  {
    id: "pg_date_part_timestamp",
    name: "date_part",
    category: "Пользовательские функции",
    description: "Извлекает подполе из метки времени без часового пояса.",
    syntax: "date_part(text, timestamp without time zone)",
    arguments: [
      { name: "field", description: "Часть (year, month, hour и т.д.).", example: "'hour'" },
      { name: "source", description: "Метка времени.", example: "'2023-01-01 12:30:00'::timestamp" }
    ],
    example: "SELECT date_part('hour', '2023-01-01 12:30:00'::timestamp);"
  },
  {
    id: "pg_date_part_interval",
    name: "date_part",
    category: "Пользовательские функции",
    description: "Извлекает подполе из интервала времени.",
    syntax: "date_part(text, interval)",
    arguments: [
      { name: "field", description: "Часть интервала (month, day, hour и т.д.).", example: "'day'" },
      { name: "source", description: "Интервал.", example: "interval '2 days 3 hours'" }
    ],
    example: "SELECT date_part('day', interval '2 days 3 hours');"
  },
  {
    id: "pg_date_part_timestamptz",
    name: "date_part",
    category: "Пользовательские функции",
    description: "Извлекает подполе из метки времени с часовым поясом.",
    syntax: "date_part(text, timestamp with time zone)",
    arguments: [
      { name: "field", description: "Часть (timezone, hour, year и т.д.).", example: "'timezone'" },
      { name: "source", description: "Метка времени с поясом.", example: "now()" }
    ],
    example: "SELECT date_part('timezone', now());"
  },
  {
    id: "pg_date_part_time",
    name: "date_part",
    category: "Пользовательские функции",
    description: "Извлекает подполе из времени без часового пояса.",
    syntax: "date_part(text, time without time zone)",
    arguments: [
      { name: "field", description: "Часть времени (hour, minute, second).", example: "'minute'" },
      { name: "source", description: "Время.", example: "'12:30:00'::time" }
    ],
    example: "SELECT date_part('minute', '12:30:00'::time);"
  },
  {
    id: "pg_date_part_timetz",
    name: "date_part",
    category: "Пользовательские функции",
    description: "Извлекает подполе из времени с часовым поясом.",
    syntax: "date_part(text, time with time zone)",
    arguments: [
      { name: "field", description: "Часть (hour, minute, timezone и т.д.).", example: "'timezone_hour'" },
      { name: "source", description: "Время с поясом.", example: "'12:30:00+03'::timetz" }
    ],
    example: "SELECT date_part('timezone_hour', '12:30:00+03'::timetz);"
  },
  {
    id: "pg_date_pl_interval",
    name: "date_pl_interval",
    category: "Пользовательские функции",
    description: "Прибавляет интервал к дате (возвращает timestamp).",
    syntax: "date_pl_interval(date, interval)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-01'::date" },
      { name: "delta", description: "Интервал.", example: "interval '24 hours'" }
    ],
    example: "SELECT '2023-01-01'::date + interval '24 hours';"
  },
  {
    id: "pg_date_pli",
    name: "date_pli",
    category: "Пользовательские функции",
    description: "Прибавляет количество дней к дате.",
    syntax: "date_pli(date, integer)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-01'::date" },
      { name: "days", description: "Количество дней.", example: "7" }
    ],
    example: "SELECT '2023-01-01'::date + 7;"
  },
  {
    id: "pg_date_recv",
    name: "date_recv",
    category: "Пользовательские функции",
    description: "Функция приема значения типа date в двоичном формате.",
    syntax: "date_recv(internal)",
    arguments: [
      { name: "internal", description: "Внутренний буфер.", example: "buf" }
    ],
    example: "-- Внутренняя системная функция"
  },
  {
    id: "pg_date_send",
    name: "date_send",
    category: "Пользовательские функции",
    description: "Функция отправки значения типа date в двоичном формате.",
    syntax: "date_send(date)",
    arguments: [
      { name: "date", description: "Значение даты.", example: "'2023-01-01'::date" }
    ],
    example: "SELECT date_send('2023-01-01'::date);"
  },
  {
    id: "pg_date_skipsupport",
    name: "date_skipsupport",
    category: "Пользовательские функции",
    description: "Поддержка пропуска значений (Index Skip Scan) для типа date.",
    syntax: "date_skipsupport(internal)",
    arguments: [
      { name: "internal", description: "Внутренний контекст.", example: "..." }
    ],
    example: "-- Оптимизация B-tree индекса"
  },
  {
    id: "pg_date_smaller",
    name: "date_smaller",
    category: "Пользовательские функции",
    description: "Возвращает меньшую из двух дат.",
    syntax: "date_smaller(date, date)",
    arguments: [
      { name: "date1", description: "Первая дата.", example: "'2023-01-01'::date" },
      { name: "date2", description: "Вторая дата.", example: "'2023-01-02'::date" }
    ],
    example: "SELECT date_smaller('2023-01-01'::date, '2023-01-02'::date);"
  },
  {
    id: "pg_date_sortsupport",
    name: "date_sortsupport",
    category: "Пользовательские функции",
    description: "Поддержка быстрой сортировки для типа date.",
    syntax: "date_sortsupport(internal)",
    arguments: [
      { name: "internal", description: "Внутреннее состояние.", example: "..." }
    ],
    example: "-- Ускоряет сортировку колонок типа date"
  },
  {
    id: "pg_date_subtract_tz_text",
    name: "date_subtract",
    category: "Пользовательские функции",
    description: "Вычитает интервал из метки времени с часовым поясом с учетом текстового аргумента (внутренняя).",
    syntax: "date_subtract(timestamp with time zone, interval, text)",
    arguments: [
      { name: "ts", description: "Метка времени.", example: "now()" },
      { name: "delta", description: "Интервал.", example: "interval '1 day'" }
    ],
    example: "-- Используется системными функциями даты"
  },
  {
    id: "pg_date_subtract_tz",
    name: "date_subtract",
    category: "Пользовательские функции",
    description: "Вычитает интервал из метки времени с часовым поясом.",
    syntax: "date_subtract(timestamp with time zone, interval)",
    arguments: [
      { name: "ts", description: "Метка времени.", example: "now()" },
      { name: "delta", description: "Интервал.", example: "interval '1 day'" }
    ],
    example: "SELECT date_subtract(now(), interval '1 day');"
  },
  {
    id: "pg_date_trunc_tz",
    name: "date_trunc",
    category: "Пользовательские функции",
    description: "Усекает метку времени с часовым поясом до указанной точности.",
    syntax: "date_trunc(text, timestamp with time zone)",
    arguments: [
      { name: "field", description: "Точность (year, month, day, hour и т.д.).", example: "'month'" },
      { name: "source", description: "Метка времени.", example: "now()" }
    ],
    example: "SELECT date_trunc('month', now());"
  },
  {
    id: "pg_date_trunc_timestamp",
    name: "date_trunc",
    category: "Пользовательские функции",
    description: "Усекает метку времени без часового пояса до указанной точности.",
    syntax: "date_trunc(text, timestamp without time zone)",
    arguments: [
      { name: "field", description: "Точность.", example: "'day'" },
      { name: "source", description: "Метка времени.", example: "'2023-01-15 12:30:00'::timestamp" }
    ],
    example: "SELECT date_trunc('day', '2023-01-15 12:30:00'::timestamp);"
  },
  {
    id: "pg_date_trunc_interval",
    name: "date_trunc",
    category: "Пользовательские функции",
    description: "Усекает интервал времени до указанной точности.",
    syntax: "date_trunc(text, interval)",
    arguments: [
      { name: "field", description: "Точность.", example: "'hour'" },
      { name: "source", description: "Интервал.", example: "interval '2 days 3 hours 40 minutes'" }
    ],
    example: "SELECT date_trunc('hour', interval '2 days 3 hours 40 minutes');"
  },
  {
    id: "pg_datemultirange_empty",
    name: "datemultirange",
    category: "Пользовательские функции",
    description: "Создает пустой мультидиапазон дат.",
    syntax: "datemultirange()",
    arguments: [],
    example: "SELECT datemultirange();"
  },
  {
    id: "pg_datemultirange_range",
    name: "datemultirange",
    category: "Пользовательские функции",
    description: "Создает мультидиапазон дат из одного диапазона.",
    syntax: "datemultirange(daterange)",
    arguments: [
      { name: "range", description: "Диапазон дат.", example: "daterange('2023-01-01', '2023-01-10')" }
    ],
    example: "SELECT datemultirange(daterange('2023-01-01', '2023-01-10'));"
  },
  {
    id: "pg_datemultirange_variadic",
    name: "datemultirange",
    category: "Пользовательские функции",
    description: "Создает мультидиапазон из нескольких диапазонов дат.",
    syntax: "datemultirange(VARIADIC daterange[])",
    arguments: [
      { name: "ranges", description: "Массив диапазонов дат.", example: "daterange('2023-01-01', '2023-01-05'), daterange('2023-01-10', '2023-01-15')" }
    ],
    example: "SELECT datemultirange(daterange('2023-01-01', '2023-01-05'), daterange('2023-01-10', '2023-01-15'));"
  },
  {
    id: "pg_daterange_bounds",
    name: "daterange",
    category: "Пользовательские функции",
    description: "Создает диапазон дат с указанием границ.",
    syntax: "daterange(date, date, text)",
    arguments: [
      { name: "lower", description: "Нижняя граница.", example: "'2023-01-01'::date" },
      { name: "upper", description: "Верхняя граница.", example: "'2023-01-10'::date" },
      { name: "bounds", description: "Тип границ ('[]', '[)', '(]', '()').", example: "'[]'" }
    ],
    example: "SELECT daterange('2023-01-01'::date, '2023-01-10'::date, '[]');"
  },
  {
    id: "pg_daterange_canonical",
    name: "daterange_canonical",
    category: "Пользовательские функции",
    description: "Приводит диапазон дат к каноническому виду (внутренняя).",
    syntax: "daterange_canonical(daterange)",
    arguments: [
      { name: "range", description: "Диапазон дат.", example: "daterange('2023-01-01', '2023-01-10')" }
    ],
    example: "SELECT daterange_canonical(daterange('2023-01-01', '2023-01-10'));"
  },
  {
    id: "pg_daterange_subdiff",
    name: "daterange_subdiff",
    category: "Пользовательские функции",
    description: "Вычисляет разницу между двумя датами для типа daterange (внутренняя).",
    syntax: "daterange_subdiff(date, date)",
    arguments: [
      { name: "d1", description: "Первая дата.", example: "'2023-01-10'::date" },
      { name: "d2", description: "Вторая дата.", example: "'2023-01-01'::date" }
    ],
    example: "SELECT daterange_subdiff('2023-01-10'::date, '2023-01-01'::date);"
  },
  {
    id: "pg_datetime_pl",
    name: "datetime_pl",
    category: "Пользовательские функции",
    description: "Складывает дату и время (возвращает timestamp).",
    syntax: "datetime_pl(date, time without time zone)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-01'::date" },
      { name: "time", description: "Время.", example: "'12:00:00'::time" }
    ],
    example: "SELECT '2023-01-01'::date + '12:00:00'::time;"
  },
  {
    id: "pg_datetimetz_pl",
    name: "datetimetz_pl",
    category: "Пользовательские функции",
    description: "Складывает дату и время с часовым поясом (возвращает timestamptz).",
    syntax: "datetimetz_pl(date, time with time zone)",
    arguments: [
      { name: "date", description: "Дата.", example: "'2023-01-01'::date" },
      { name: "timetz", description: "Время с поясом.", example: "'12:00:00+03'::timetz" }
    ],
    example: "SELECT '2023-01-01'::date + '12:00:00+03'::timetz;"
  },
  {
    id: "pg_dcbrt",
    name: "dcbrt",
    category: "Пользовательские функции",
    description: "Вычисляет кубический корень (псевдоним cbrt).",
    syntax: "dcbrt(double precision)",
    arguments: [
      { name: "num", description: "Число.", example: "64.0" }
    ],
    example: "SELECT dcbrt(64.0);"
  },
  {
    id: "pg_decode",
    name: "decode",
    category: "Пользовательские функции",
    description: "Декодирует строку в двоичные данные (bytea) из указанного формата.",
    syntax: "decode(text, text)",
    arguments: [
      { name: "string", description: "Кодированная строка.", example: "'MTIz'" },
      { name: "format", description: "Формат ('base64', 'hex', 'escape').", example: "'base64'" }
    ],
    example: "SELECT decode('MTIz', 'base64');"
  },
  {
    id: "pg_degrees",
    name: "degrees",
    category: "Пользовательские функции",
    description: "Преобразует радианы в градусы.",
    syntax: "degrees(double precision)",
    arguments: [
      { name: "rad", description: "Угол в радианах.", example: "3.14159" }
    ],
    example: "SELECT degrees(3.14159);"
  },
  {
    id: "pg_dense_rank_final",
    name: "dense_rank_final",
    category: "Пользовательские функции",
    description: "Финальная функция для оконной функции dense_rank().",
    syntax: "dense_rank_final(internal, VARIADIC \"any\")",
    arguments: [
      { name: "internal", description: "Внутреннее состояние.", example: "state" }
    ],
    example: "-- Используется механизмом оконных функций"
  },
  {
    id: "pg_dexp",
    name: "dexp",
    category: "Пользовательские функции",
    description: "Вычисляет экспоненту (псевдоним exp).",
    syntax: "dexp(double precision)",
    arguments: [
      { name: "val", description: "Степень.", example: "1.0" }
    ],
    example: "SELECT dexp(1.0);"
  }
];
