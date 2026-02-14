export const aggregateFunctions = [
  {
    id: "pg_any_value",
    name: "ANY_VALUE()",
    category: "Агрегатные функции",
    description: "Возвращает произвольное значение из группы. Полезно, когда нужно выбрать любое значение, не применяя группировку к этому полю.",
    syntax: "ANY_VALUE(expression)",
    arguments: [
      { name: "expression", description: "Выражение любого типа.", example: "SELECT ANY_VALUE(name) FROM users GROUP BY city;" }
    ],
    example: "SELECT city, ANY_VALUE(name) FROM users GROUP BY city;"
  },
  {
    id: "pg_array_agg",
    name: "ARRAY_AGG()",
    category: "Агрегатные функции",
    description: "Объединяет все входные значения, включая NULL, в массив.",
    syntax: "ARRAY_AGG(expression)",
    arguments: [
      { name: "expression", description: "Входное значение любого типа, которое станет элементом массива.", example: "SELECT ARRAY_AGG(id) FROM products;" }
    ],
    example: "SELECT category, ARRAY_AGG(name) FROM products GROUP BY category;"
  },
  {
    id: "pg_avg",
    name: "AVG()",
    category: "Агрегатные функции",
    description: "Вычисляет среднее арифметическое всех входных значений.",
    syntax: "AVG(expression)",
    arguments: [
      { name: "expression", description: "Числовое выражение или интервал.", example: "SELECT AVG(price) FROM orders;" }
    ],
    example: "SELECT AVG(score) FROM students;"
  },
  {
    id: "pg_bit_and",
    name: "BIT_AND()",
    category: "Агрегатные функции",
    description: "Вычисляет побитовое И (AND) для всех входных значений.",
    syntax: "BIT_AND(expression)",
    arguments: [
      { name: "expression", description: "Целочисленное значение или битовая строка.", example: "SELECT BIT_AND(flags) FROM access_logs;" }
    ],
    example: "SELECT BIT_AND(mask) FROM settings;"
  },
  {
    id: "pg_bit_or",
    name: "BIT_OR()",
    category: "Агрегатные функции",
    description: "Вычисляет побитовое ИЛИ (OR) для всех входных значений.",
    syntax: "BIT_OR(expression)",
    arguments: [
      { name: "expression", description: "Целочисленное значение или битовая строка.", example: "SELECT BIT_OR(flags) FROM access_logs;" }
    ],
    example: "SELECT BIT_OR(mask) FROM settings;"
  },
  {
    id: "pg_bit_xor",
    name: "BIT_XOR()",
    category: "Агрегатные функции",
    description: "Вычисляет побитовое исключающее ИЛИ (XOR) для всех входных значений.",
    syntax: "BIT_XOR(expression)",
    arguments: [
      { name: "expression", description: "Целочисленное значение или битовая строка.", example: "SELECT BIT_XOR(flags) FROM access_logs;" }
    ],
    example: "SELECT BIT_XOR(mask) FROM settings;"
  },
  {
    id: "pg_bool_and",
    name: "BOOL_AND()",
    category: "Агрегатные функции",
    description: "Возвращает true, если все входные значения истинны, иначе false.",
    syntax: "BOOL_AND(expression)",
    arguments: [
      { name: "expression", description: "Логическое выражение.", example: "SELECT BOOL_AND(is_active) FROM users;" }
    ],
    example: "SELECT BOOL_AND(available) FROM inventory;"
  },
  {
    id: "pg_bool_or",
    name: "BOOL_OR()",
    category: "Агрегатные функции",
    description: "Возвращает true, если хотя бы одно входное значение истинно, иначе false.",
    syntax: "BOOL_OR(expression)",
    arguments: [
      { name: "expression", description: "Логическое выражение.", example: "SELECT BOOL_OR(is_active) FROM users;" }
    ],
    example: "SELECT BOOL_OR(available) FROM inventory;"
  },
  {
    id: "pg_corr",
    name: "CORR()",
    category: "Агрегатные функции",
    description: "Вычисляет коэффициент корреляции Пирсона.",
    syntax: "CORR(Y, X)",
    arguments: [
      { name: "Y", description: "Зависимая переменная (числовое выражение).", example: "SELECT CORR(height, weight) FROM people;" },
      { name: "X", description: "Независимая переменная (числовое выражение).", example: "SELECT CORR(height, weight) FROM people;" }
    ],
    example: "SELECT CORR(sales, advertising_spend) FROM marketing_data;"
  },
  {
    id: "pg_count",
    name: "COUNT()",
    category: "Агрегатные функции",
    description: "Вычисляет количество входных строк.",
    syntax: "COUNT(expression)",
    arguments: [
      { name: "expression", description: "Любое выражение. COUNT(*) считает все строки, COUNT(expr) только не-NULL значения.", example: "SELECT COUNT(*) FROM users;" }
    ],
    example: "SELECT COUNT(email) FROM users;"
  },
  {
    id: "pg_covar_pop",
    name: "COVAR_POP()",
    category: "Агрегатные функции",
    description: "Вычисляет ковариацию генеральной совокупности.",
    syntax: "COVAR_POP(Y, X)",
    arguments: [
      { name: "Y", description: "Зависимая переменная.", example: "SELECT COVAR_POP(y, x) FROM stats;" },
      { name: "X", description: "Независимая переменная.", example: "SELECT COVAR_POP(y, x) FROM stats;" }
    ],
    example: "SELECT COVAR_POP(income, education_years) FROM census_data;"
  },
  {
    id: "pg_covar_samp",
    name: "COVAR_SAMP()",
    category: "Агрегатные функции",
    description: "Вычисляет выборочную ковариацию.",
    syntax: "COVAR_SAMP(Y, X)",
    arguments: [
      { name: "Y", description: "Зависимая переменная.", example: "SELECT COVAR_SAMP(y, x) FROM stats;" },
      { name: "X", description: "Независимая переменная.", example: "SELECT COVAR_SAMP(y, x) FROM stats;" }
    ],
    example: "SELECT COVAR_SAMP(income, education_years) FROM census_data;"
  },
  {
    id: "pg_cume_dist",
    name: "CUME_DIST()",
    category: "Агрегатные функции",
    description: "Вычисляет кумулятивное распределение (относительный ранг значения).",
    syntax: "CUME_DIST() OVER (ORDER BY expression)",
    arguments: [
      { name: "expression", description: "Выражение для сортировки в окне.", example: "SELECT CUME_DIST() OVER (ORDER BY salary) FROM employees;" }
    ],
    example: "SELECT name, salary, CUME_DIST() OVER (ORDER BY salary) FROM employees;"
  },
  {
    id: "pg_dense_rank",
    name: "DENSE_RANK()",
    category: "Агрегатные функции",
    description: "Вычисляет ранг текущей строки без пропусков в последовательности рангов.",
    syntax: "DENSE_RANK() OVER (ORDER BY expression)",
    arguments: [
      { name: "expression", description: "Выражение для сортировки.", example: "SELECT DENSE_RANK() OVER (ORDER BY score DESC) FROM students;" }
    ],
    example: "SELECT student_name, score, DENSE_RANK() OVER (ORDER BY score DESC) FROM exams;"
  },
  {
    id: "pg_every",
    name: "EVERY()",
    category: "Агрегатные функции",
    description: "Синоним для BOOL_AND(). Возвращает true, если все значения истинны.",
    syntax: "EVERY(expression)",
    arguments: [
      { name: "expression", description: "Логическое выражение.", example: "SELECT EVERY(is_valid) FROM data;" }
    ],
    example: "SELECT EVERY(confirmed) FROM registrations;"
  },
  {
    id: "pg_json_agg",
    name: "JSON_AGG()",
    category: "Агрегатные функции",
    description: "Собирает значения в JSON-массив.",
    syntax: "JSON_AGG(expression)",
    arguments: [
      { name: "expression", description: "Любое выражение, преобразуемое в JSON.", example: "SELECT JSON_AGG(user_data) FROM users;" }
    ],
    example: "SELECT category, JSON_AGG(name) FROM items GROUP BY category;"
  },
  {
    id: "pg_json_agg_strict",
    name: "JSON_AGG_STRICT()",
    category: "Агрегатные функции",
    description: "Собирает значения в JSON-массив, пропуская NULL-значения.",
    syntax: "JSON_AGG_STRICT(expression)",
    arguments: [
      { name: "expression", description: "Любое выражение, преобразуемое в JSON.", example: "SELECT JSON_AGG_STRICT(email) FROM users;" }
    ],
    example: "SELECT JSON_AGG_STRICT(comments) FROM posts;"
  },
  {
    id: "pg_json_object_agg",
    name: "JSON_OBJECT_AGG()",
    category: "Агрегатные функции",
    description: "Собирает пары ключ/значение в JSON-объект.",
    syntax: "JSON_OBJECT_AGG(key, value)",
    arguments: [
      { name: "key", description: "Ключ объекта (любой тип, приводится к тексту).", example: "SELECT JSON_OBJECT_AGG(id, name) FROM users;" },
      { name: "value", description: "Значение объекта.", example: "SELECT JSON_OBJECT_AGG(id, name) FROM users;" }
    ],
    example: "SELECT city, JSON_OBJECT_AGG(name, salary) FROM employees GROUP BY city;"
  },
  {
    id: "pg_json_object_agg_strict",
    name: "JSON_OBJECT_AGG_STRICT()",
    category: "Агрегатные функции",
    description: "Собирает пары ключ/значение в JSON-объект, пропуская строки с NULL-значениями.",
    syntax: "JSON_OBJECT_AGG_STRICT(key, value)",
    arguments: [
      { name: "key", description: "Ключ объекта.", example: "SELECT JSON_OBJECT_AGG_STRICT(k, v) FROM table;" },
      { name: "value", description: "Значение объекта.", example: "SELECT JSON_OBJECT_AGG_STRICT(k, v) FROM table;" }
    ],
    example: "SELECT JSON_OBJECT_AGG_STRICT(item_id, meta) FROM orders;"
  },
  {
    id: "pg_json_object_agg_unique",
    name: "JSON_OBJECT_AGG_UNIQUE()",
    category: "Агрегатные функции",
    description: "Собирает пары ключ/значение в JSON-объект, гарантируя уникальность ключей.",
    syntax: "JSON_OBJECT_AGG_UNIQUE(key, value)",
    arguments: [
      { name: "key", description: "Уникальный ключ объекта.", example: "SELECT JSON_OBJECT_AGG_UNIQUE(code, val) FROM constants;" },
      { name: "value", description: "Значение объекта.", example: "SELECT JSON_OBJECT_AGG_UNIQUE(code, val) FROM constants;" }
    ],
    example: "SELECT JSON_OBJECT_AGG_UNIQUE(key_name, val) FROM settings;"
  },
  {
    id: "pg_json_object_agg_unique_strict",
    name: "JSON_OBJECT_AGG_UNIQUE_STRICT()",
    category: "Агрегатные функции",
    description: "Собирает уникальные пары ключ/значение в JSON-объект, пропуская NULL-значения.",
    syntax: "JSON_OBJECT_AGG_UNIQUE_STRICT(key, value)",
    arguments: [
      { name: "key", description: "Уникальный ключ объекта.", example: "SELECT JSON_OBJECT_AGG_UNIQUE_STRICT(k, v) FROM t;" },
      { name: "value", description: "Значение объекта.", example: "SELECT JSON_OBJECT_AGG_UNIQUE_STRICT(k, v) FROM t;" }
    ],
    example: "SELECT JSON_OBJECT_AGG_UNIQUE_STRICT(id, data) FROM source;"
  },
  {
    id: "pg_jsonb_agg",
    name: "JSONB_AGG()",
    category: "Агрегатные функции",
    description: "Собирает значения в JSONB-массив.",
    syntax: "JSONB_AGG(expression)",
    arguments: [
      { name: "expression", description: "Любое выражение, преобразуемое в JSONB.", example: "SELECT JSONB_AGG(tags) FROM articles;" }
    ],
    example: "SELECT JSONB_AGG(to_jsonb(users)) FROM users;"
  },
  {
    id: "pg_jsonb_agg_strict",
    name: "JSONB_AGG_STRICT()",
    category: "Агрегатные функции",
    description: "Собирает значения в JSONB-массив, пропуская NULL-значения.",
    syntax: "JSONB_AGG_STRICT(expression)",
    arguments: [
      { name: "expression", description: "Любое выражение, преобразуемое в JSONB.", example: "SELECT JSONB_AGG_STRICT(data) FROM logs;" }
    ],
    example: "SELECT JSONB_AGG_STRICT(meta) FROM events;"
  },
  {
    id: "pg_jsonb_object_agg",
    name: "JSONB_OBJECT_AGG()",
    category: "Агрегатные функции",
    description: "Собирает пары ключ/значение в JSONB-объект.",
    syntax: "JSONB_OBJECT_AGG(key, value)",
    arguments: [
      { name: "key", description: "Ключ объекта.", example: "SELECT JSONB_OBJECT_AGG(k, v) FROM table;" },
      { name: "value", description: "Значение объекта.", example: "SELECT JSONB_OBJECT_AGG(k, v) FROM table;" }
    ],
    example: "SELECT JSONB_OBJECT_AGG(name, score) FROM rankings;"
  },
  {
    id: "pg_jsonb_object_agg_strict",
    name: "JSONB_OBJECT_AGG_STRICT()",
    category: "Агрегатные функции",
    description: "Собирает пары ключ/значение в JSONB-объект, пропуская строки с NULL-значениями.",
    syntax: "JSONB_OBJECT_AGG_STRICT(key, value)",
    arguments: [
      { name: "key", description: "Ключ объекта.", example: "SELECT JSONB_OBJECT_AGG_STRICT(k, v) FROM table;" },
      { name: "value", description: "Значение объекта.", example: "SELECT JSONB_OBJECT_AGG_STRICT(k, v) FROM table;" }
    ],
    example: "SELECT JSONB_OBJECT_AGG_STRICT(attr_name, attr_val) FROM metadata;"
  },
  {
    id: "pg_jsonb_object_agg_unique",
    name: "JSONB_OBJECT_AGG_UNIQUE()",
    category: "Агрегатные функции",
    description: "Собирает пары ключ/значение в JSONB-объект, гарантируя уникальность ключей.",
    syntax: "JSONB_OBJECT_AGG_UNIQUE(key, value)",
    arguments: [
      { name: "key", description: "Уникальный ключ объекта.", example: "SELECT JSONB_OBJECT_AGG_UNIQUE(k, v) FROM table;" },
      { name: "value", description: "Значение объекта.", example: "SELECT JSONB_OBJECT_AGG_UNIQUE(k, v) FROM table;" }
    ],
    example: "SELECT JSONB_OBJECT_AGG_UNIQUE(user_id, profile) FROM profiles;"
  },
  {
    id: "pg_jsonb_object_agg_unique_strict",
    name: "JSONB_OBJECT_AGG_UNIQUE_STRICT()",
    category: "Агрегатные функции",
    description: "Собирает уникальные пары ключ/значение в JSONB-объект, пропуская NULL-значения.",
    syntax: "JSONB_OBJECT_AGG_UNIQUE_STRICT(key, value)",
    arguments: [
      { name: "key", description: "Уникальный ключ объекта.", example: "SELECT JSONB_OBJECT_AGG_UNIQUE_STRICT(k, v) FROM t;" },
      { name: "value", description: "Значение объекта.", example: "SELECT JSONB_OBJECT_AGG_UNIQUE_STRICT(k, v) FROM t;" }
    ],
    example: "SELECT JSONB_OBJECT_AGG_UNIQUE_STRICT(id, data) FROM source;"
  },
  {
    id: "pg_max",
    name: "MAX()",
    category: "Агрегатные функции",
    description: "Возвращает максимальное значение из набора входных значений.",
    syntax: "MAX(expression)",
    arguments: [
      { name: "expression", description: "Выражение любого типа, поддерживающего сравнение (числа, текст, даты и др.).", example: "SELECT MAX(price) FROM products;" }
    ],
    example: "SELECT MAX(salary) FROM employees;"
  },
  {
    id: "pg_min",
    name: "MIN()",
    category: "Агрегатные функции",
    description: "Возвращает минимальное значение из набора входных значений.",
    syntax: "MIN(expression)",
    arguments: [
      { name: "expression", description: "Выражение любого типа, поддерживающего сравнение.", example: "SELECT MIN(price) FROM products;" }
    ],
    example: "SELECT MIN(score) FROM results;"
  },
  {
    id: "pg_mode",
    name: "MODE()",
    category: "Агрегатные функции",
    description: "Возвращает наиболее часто встречающееся значение (моду) в группе.",
    syntax: "MODE() WITHIN GROUP (ORDER BY sort_expression)",
    arguments: [
      { name: "sort_expression", description: "Выражение, для которого вычисляется частота значений.", example: "SELECT MODE() WITHIN GROUP (ORDER BY category) FROM items;" }
    ],
    example: "SELECT category, MODE() WITHIN GROUP (ORDER BY color) FROM products GROUP BY category;"
  },
  {
    id: "pg_percent_rank",
    name: "PERCENT_RANK()",
    category: "Агрегатные функции",
    description: "Вычисляет относительный ранг строки (процентное положение) в группе.",
    syntax: "PERCENT_RANK() OVER (ORDER BY expression)",
    arguments: [
      { name: "expression", description: "Выражение для сортировки.", example: "SELECT PERCENT_RANK() OVER (ORDER BY salary) FROM employees;" }
    ],
    example: "SELECT name, salary, PERCENT_RANK() OVER (ORDER BY salary) FROM employees;"
  },
  {
    id: "pg_percentile_cont",
    name: "PERCENTILE_CONT()",
    category: "Агрегатные функции",
    description: "Вычисляет непрерывный процентиль (интерполированное значение) для заданной доли.",
    syntax: "PERCENTILE_CONT(fraction) WITHIN GROUP (ORDER BY sort_expression)",
    arguments: [
      { name: "fraction", description: "Доля (от 0 до 1) или массив долей.", example: "SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY price) FROM sales;" },
      { name: "sort_expression", description: "Выражение для сортировки (обычно числовое или интервал).", example: "SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY price) FROM sales;" }
    ],
    example: "SELECT PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY response_time) FROM logs;"
  },
  {
    id: "pg_percentile_disc",
    name: "PERCENTILE_DISC()",
    category: "Агрегатные функции",
    description: "Вычисляет дискретный процентиль (первое значение, чье кумулятивное распределение >= доли).",
    syntax: "PERCENTILE_DISC(fraction) WITHIN GROUP (ORDER BY sort_expression)",
    arguments: [
      { name: "fraction", description: "Доля (от 0 до 1) или массив долей.", example: "SELECT PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY rating) FROM reviews;" },
      { name: "sort_expression", description: "Выражение для сортировки.", example: "SELECT PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY rating) FROM reviews;" }
    ],
    example: "SELECT PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY quality_rank) FROM production;"
  },
  {
    id: "pg_range_agg",
    name: "RANGE_AGG()",
    category: "Агрегатные функции",
    description: "Объединяет диапазоны или мультидиапазоны в один мультидиапазон (вычисляет объединение).",
    syntax: "RANGE_AGG(expression)",
    arguments: [
      { name: "expression", description: "Выражение типа range (диапазон) или multirange.", example: "SELECT RANGE_AGG(valid_period) FROM reservations;" }
    ],
    example: "SELECT room_id, RANGE_AGG(booking_range) FROM bookings GROUP BY room_id;"
  },
  {
    id: "pg_range_intersect_agg",
    name: "RANGE_INTERSECT_AGG()",
    category: "Агрегатные функции",
    description: "Вычисляет пересечение всех входных диапазонов или мультидиапазонов.",
    syntax: "RANGE_INTERSECT_AGG(expression)",
    arguments: [
      { name: "expression", description: "Выражение типа range или multirange.", example: "SELECT RANGE_INTERSECT_AGG(available_times) FROM schedules;" }
    ],
    example: "SELECT RANGE_INTERSECT_AGG(work_hours) FROM employees_availability;"
  },
  {
    id: "pg_rank",
    name: "RANK()",
    category: "Агрегатные функции",
    description: "Вычисляет ранг текущей строки с пропусками в последовательности рангов (при наличии дублей).",
    syntax: "RANK() OVER (ORDER BY expression)",
    arguments: [
      { name: "expression", description: "Выражение для сортировки.", example: "SELECT RANK() OVER (ORDER BY score DESC) FROM participants;" }
    ],
    example: "SELECT name, score, RANK() OVER (ORDER BY score DESC) FROM tournament;"
  },
  {
    id: "pg_regr_avgx",
    name: "REGR_AVGX()",
    category: "Агрегатные функции",
    description: "Вычисляет среднее значение независимой переменной (X) в линейной регрессии.",
    syntax: "REGR_AVGX(Y, X)",
    arguments: [
      { name: "Y", description: "Зависимая переменная.", example: "SELECT REGR_AVGX(y, x) FROM stats;" },
      { name: "X", description: "Независимая переменная.", example: "SELECT REGR_AVGX(y, x) FROM stats;" }
    ],
    example: "SELECT REGR_AVGX(sales, ads) FROM business_data;"
  },
  {
    id: "pg_regr_avgy",
    name: "REGR_AVGY()",
    category: "Агрегатные функции",
    description: "Вычисляет среднее значение зависимой переменной (Y) в линейной регрессии.",
    syntax: "REGR_AVGY(Y, X)",
    arguments: [
      { name: "Y", description: "Зависимая переменная.", example: "SELECT REGR_AVGY(y, x) FROM stats;" },
      { name: "X", description: "Независимая переменная.", example: "SELECT REGR_AVGY(y, x) FROM stats;" }
    ],
    example: "SELECT REGR_AVGY(sales, ads) FROM business_data;"
  },
  {
    id: "pg_regr_count",
    name: "REGR_COUNT()",
    category: "Агрегатные функции",
    description: "Вычисляет количество строк, где обе переменные не равны NULL.",
    syntax: "REGR_COUNT(Y, X)",
    arguments: [
      { name: "Y", description: "Зависимая переменная.", example: "SELECT REGR_COUNT(y, x) FROM stats;" },
      { name: "X", description: "Независимая переменная.", example: "SELECT REGR_COUNT(y, x) FROM stats;" }
    ],
    example: "SELECT REGR_COUNT(revenue, costs) FROM finances;"
  },
  {
    id: "pg_regr_intercept",
    name: "REGR_INTERCEPT()",
    category: "Агрегатные функции",
    description: "Вычисляет Y-пересечение линии линейной регрессии методом наименьших квадратов.",
    syntax: "REGR_INTERCEPT(Y, X)",
    arguments: [
      { name: "Y", description: "Зависимая переменная.", example: "SELECT REGR_INTERCEPT(y, x) FROM stats;" },
      { name: "X", description: "Независимая переменная.", example: "SELECT REGR_INTERCEPT(y, x) FROM stats;" }
    ],
    example: "SELECT REGR_INTERCEPT(production, temperature) FROM factory_logs;"
  },
  {
    id: "pg_regr_r2",
    name: "REGR_R2()",
    category: "Агрегатные функции",
    description: "Вычисляет коэффициент детерминации (квадрат корреляции).",
    syntax: "REGR_R2(Y, X)",
    arguments: [
      { name: "Y", description: "Зависимая переменная.", example: "SELECT REGR_R2(y, x) FROM stats;" },
      { name: "X", description: "Независимая переменная.", example: "SELECT REGR_R2(y, x) FROM stats;" }
    ],
    example: "SELECT REGR_R2(weight, height) FROM health_data;"
  },
  {
    id: "pg_regr_slope",
    name: "REGR_SLOPE()",
    category: "Агрегатные функции",
    description: "Вычисляет наклон линии линейной регрессии.",
    syntax: "REGR_SLOPE(Y, X)",
    arguments: [
      { name: "Y", description: "Зависимая переменная.", example: "SELECT REGR_SLOPE(y, x) FROM stats;" },
      { name: "X", description: "Независимая переменная.", example: "SELECT REGR_SLOPE(y, x) FROM stats;" }
    ],
    example: "SELECT REGR_SLOPE(growth, nutrition) FROM bio_study;"
  },
  {
    id: "pg_regr_sxx",
    name: "REGR_SXX()",
    category: "Агрегатные функции",
    description: "Вычисляет сумму квадратов независимой переменной ('sum of squares').",
    syntax: "REGR_SXX(Y, X)",
    arguments: [
      { name: "Y", description: "Зависимая переменная.", example: "SELECT REGR_SXX(y, x) FROM stats;" },
      { name: "X", description: "Независимая переменная.", example: "SELECT REGR_SXX(y, x) FROM stats;" }
    ],
    example: "SELECT REGR_SXX(y, x) FROM research;"
  },
  {
    id: "pg_regr_sxy",
    name: "REGR_SXY()",
    category: "Агрегатные функции",
    description: "Вычисляет сумму произведений разностей зависимой и независимой переменных.",
    syntax: "REGR_SXY(Y, X)",
    arguments: [
      { name: "Y", description: "Зависимая переменная.", example: "SELECT REGR_SXY(y, x) FROM stats;" },
      { name: "X", description: "Независимая переменная.", example: "SELECT REGR_SXY(y, x) FROM stats;" }
    ],
    example: "SELECT REGR_SXY(y, x) FROM data;"
  },
  {
    id: "pg_regr_syy",
    name: "REGR_SYY()",
    category: "Агрегатные функции",
    description: "Вычисляет сумму квадратов зависимой переменной.",
    syntax: "REGR_SYY(Y, X)",
    arguments: [
      { name: "Y", description: "Зависимая переменная.", example: "SELECT REGR_SYY(y, x) FROM stats;" },
      { name: "X", description: "Независимая переменная.", example: "SELECT REGR_SYY(y, x) FROM stats;" }
    ],
    example: "SELECT REGR_SYY(y, x) FROM data;"
  },
  {
    id: "pg_stddev",
    name: "STDDEV()",
    category: "Агрегатные функции",
    description: "Вычисляет среднеквадратичное отклонение выборки (синоним для STDDEV_SAMP).",
    syntax: "STDDEV(expression)",
    arguments: [
      { name: "expression", description: "Числовое выражение.", example: "SELECT STDDEV(price) FROM products;" }
    ],
    example: "SELECT STDDEV(score) FROM results;"
  },
  {
    id: "pg_stddev_pop",
    name: "STDDEV_POP()",
    category: "Агрегатные функции",
    description: "Вычисляет среднеквадратичное отклонение генеральной совокупности.",
    syntax: "STDDEV_POP(expression)",
    arguments: [
      { name: "expression", description: "Числовое выражение.", example: "SELECT STDDEV_POP(temp) FROM climate_data;" }
    ],
    example: "SELECT STDDEV_POP(measurement) FROM laboratory_logs;"
  },
  {
    id: "pg_stddev_samp",
    name: "STDDEV_SAMP()",
    category: "Агрегатные функции",
    description: "Вычисляет выборочное среднеквадратичное отклонение.",
    syntax: "STDDEV_SAMP(expression)",
    arguments: [
      { name: "expression", description: "Числовое выражение.", example: "SELECT STDDEV_SAMP(price) FROM orders;" }
    ],
    example: "SELECT STDDEV_SAMP(yield) FROM harvest;"
  },
  {
    id: "pg_string_agg",
    name: "STRING_AGG()",
    category: "Агрегатные функции",
    description: "Объединяет входные значения в строку, разделенную указанным разделителем.",
    syntax: "STRING_AGG(expression, delimiter)",
    arguments: [
      { name: "expression", description: "Текстовое выражение или bytea.", example: "SELECT STRING_AGG(name, ', ') FROM users;" },
      { name: "delimiter", description: "Строка-разделитель.", example: "SELECT STRING_AGG(name, ', ') FROM users;" }
    ],
    example: "SELECT category, STRING_AGG(product_name, '; ') FROM inventory GROUP BY category;"
  },
  {
    id: "pg_sum",
    name: "SUM()",
    category: "Агрегатные функции",
    description: "Вычисляет сумму всех входных значений.",
    syntax: "SUM(expression)",
    arguments: [
      { name: "expression", description: "Числовое выражение или интервал.", example: "SELECT SUM(amount) FROM transactions;" }
    ],
    example: "SELECT SUM(stock) FROM warehouse;"
  },
  {
    id: "pg_var_pop",
    name: "VAR_POP()",
    category: "Агрегатные функции",
    description: "Вычисляет дисперсию генеральной совокупности (квадрат среднеквадратичного отклонения).",
    syntax: "VAR_POP(expression)",
    arguments: [
      { name: "expression", description: "Числовое выражение.", example: "SELECT VAR_POP(value) FROM dataset;" }
    ],
    example: "SELECT VAR_POP(revenue) FROM annual_reports;"
  },
  {
    id: "pg_var_samp",
    name: "VAR_SAMP()",
    category: "Агрегатные функции",
    description: "Вычисляет выборочную дисперсию.",
    syntax: "VAR_SAMP(expression)",
    arguments: [
      { name: "expression", description: "Числовое выражение.", example: "SELECT VAR_SAMP(price) FROM products;" }
    ],
    example: "SELECT VAR_SAMP(score) FROM exams;"
  },
  {
    id: "pg_variance",
    name: "VARIANCE()",
    category: "Агрегатные функции",
    description: "Вычисляет выборочную дисперсию (синоним для VAR_SAMP).",
    syntax: "VARIANCE(expression)",
    arguments: [
      { name: "expression", description: "Числовое выражение.", example: "SELECT VARIANCE(amount) FROM sales;" }
    ],
    example: "SELECT VARIANCE(rating) FROM reviews;"
  },
  {
    id: "pg_xmlagg",
    name: "XMLAGG()",
    category: "Агрегатные функции",
    description: "Объединяет XML-значения в один XML-документ или фрагмент.",
    syntax: "XMLAGG(xml_expression)",
    arguments: [
      { name: "xml_expression", description: "Выражение типа XML.", example: "SELECT XMLAGG(xmlelement(name item, name)) FROM products;" }
    ],
    example: "SELECT xmlelement(name root, XMLAGG(xml_data)) FROM content_table;"
  }
];
