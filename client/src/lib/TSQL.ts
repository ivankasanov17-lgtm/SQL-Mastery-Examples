import { SQLGraph } from "./SQLGraph";

export const TSQL_BASE =[
    {
      id: "frame_specification",
      name: "Frame Specification",
      category: "Оконные функции",
      description: "Определяет набор строк (окно) внутри раздела (partition), к которому применяется оконная функция. Позволяет вычислять скользящие средние, кумулятивные суммы и другие агрегаты в динамическом диапазоне.",
      syntax: "[ROWS | RANGE] BETWEEN \n  {UNBOUNDED PRECEDING | offset PRECEDING | CURRENT ROW | offset FOLLOWING | UNBOUNDED FOLLOWING}\n  AND \n  {UNBOUNDED PRECEDING | offset PRECEDING | CURRENT ROW | offset FOLLOWING | UNBOUNDED FOLLOWING}",
      example: "SELECT Month, Sales,\nSUM(Sales) OVER (ORDER BY Month ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as RunningTotal\nFROM MonthlySales;",
      arguments: [
        { 
          name: "ROWS", 
          description: "Определяет окно на основе физического смещения строк. offset PRECEDING — N строк до, offset FOLLOWING — N строк после.", 
          example: "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW" 
        },
        { 
          name: "RANGE", 
          description: "Определяет окно на основе логических значений. Все строки с одинаковым значением ORDER BY считаются одной группой.", 
          example: "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW" 
        },
        { 
          name: "UNBOUNDED", 
          description: "Указывает на самую первую строку раздела (PRECEDING) или самую последнюю (FOLLOWING).", 
          example: "BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING" 
        }
      ]
    },
    {
      id: "tsql_row_number",
      name: "ROW_NUMBER()",
      category: "Ранжирующие функции",
      description: "Присваивает последовательный номер каждой строке внутри раздела (partition), начиная с 1, согласно порядку, указанному в ORDER BY.",
      syntax: "ROW_NUMBER() OVER ([PARTITION BY partition_expr] ORDER BY order_expr [ASC | DESC])",
      example: "SELECT name, department, ROW_NUMBER() OVER(PARTITION BY department ORDER BY salary DESC) as RankInDept FROM employees;",
      arguments: [
        { name: "PARTITION BY", description: "Делит результирующий набор на группы, в которых функция вычисляется независимо.", example: "PARTITION BY category" },
        { name: "ORDER BY", description: "Определяет порядок, в котором назначаются номера строк.", example: "ORDER BY created_at ASC" },
        { name: "Unique", description: "Гарантирует уникальность номеров даже для строк с одинаковыми значениями сортировки.", example: "ROW_NUMBER() OVER(ORDER BY id)" }
      ]
    },
    {
      id: "tsql_rank",
      name: "RANK()",
      category: "Ранжирующие функции",
      description: "Присваивает ранг каждой строке. Для строк с одинаковыми значениями сортировки ранг будет одинаковым, а следующий ранг будет пропущен.",
      syntax: "RANK() OVER ([PARTITION BY partition_expr] ORDER BY order_expr [ASC | DESC])",
      example: "SELECT name, score, RANK() OVER(ORDER BY score DESC) as Rank FROM players;",
      arguments: [
        { name: "Duplicates", description: "Строки с одинаковыми значениями получают один и тот же ранг.", example: "Если двое на 1-м месте, оба получат ранг 1" },
        { name: "Gaps", description: "После дублей в ранжировании возникают пропуски.", example: "1, 1, 3 (ранг 2 пропущен)" },
        { name: "Usage", description: "Идеально для определения 'призовых мест' в спорте.", example: "RANK() OVER(ORDER BY time ASC)" }
      ]
    },
    {
      id: "tsql_dense_rank",
      name: "DENSE_RANK()",
      category: "Ранжирующие функции",
      description: "Аналогична RANK(), но не оставляет пропусков в ранжировании после строк с одинаковыми значениями.",
      syntax: "DENSE_RANK() OVER ([PARTITION BY partition_expr] ORDER BY order_expr [ASC | DESC])",
      example: "SELECT name, score, DENSE_RANK() OVER(ORDER BY score DESC) as DenseRank FROM players;",
      arguments: [
        { name: "No Gaps", description: "Следующее значение ранга идет сразу за предыдущим, даже если были дубликаты.", example: "1, 1, 2 (вместо 1, 1, 3)" },
        { name: "Ranking", description: "Позволяет получить плотный список уровней.", example: "DENSE_RANK() OVER(ORDER BY category)" },
        { name: "Comparison", description: "В отличие от RANK, номера всегда идут по порядку.", example: "1, 2, 2, 3, 4" }
      ]
    },
    {
      id: "tsql_ntile",
      name: "NTILE()",
      category: "Ранжирующие функции",
      description: "Распределяет строки по заданному количеству групп (баккетов), присваивая каждой строке номер ее группы.",
      syntax: "NTILE(num_buckets) OVER ([PARTITION BY partition_expr] ORDER BY order_expr [ASC | DESC])",
      example: "SELECT name, salary, NTILE(4) OVER(ORDER BY salary DESC) as Quartile FROM employees;",
      arguments: [
        { name: "num_buckets", description: "Целое число, указывающее на количество групп.", example: "NTILE(10) для децилей" },
        { name: "Distribution", description: "Если строки не делятся поровну, первые группы получат на одну строку больше.", example: "NTILE(3) для 10 строк: 4, 3, 3" },
        { name: "Analytics", description: "Используется для сегментации данных (например, VIP-клиенты).", example: "NTILE(100) OVER(ORDER BY spending DESC)" }
      ]
    },
    {
      id: "tsql_percent_rank",
      name: "PERCENT_RANK()",
      category: "Ранжирующие функции",
      description: "Вычисляет относительный ранг строки в процентах (от 0 до 1).",
      syntax: "PERCENT_RANK() OVER ([PARTITION BY partition_expr] ORDER BY order_expr [ASC | DESC])",
      example: "SELECT name, score, PERCENT_RANK() OVER(ORDER BY score ASC) as PctRank FROM students;",
      arguments: [
        { name: "Calculation", description: "Формула: (rank - 1) / (total_rows - 1).", example: "Возвращает 0 для первой строки" },
        { name: "Range", description: "Результат всегда в диапазоне [0, 1].", example: "0.5 означает, что строка находится в середине набора" },
        { name: "Stats", description: "Полезно для оценки того, какой процент данных находится ниже текущего значения.", example: "PERCENT_RANK() OVER(ORDER BY salary)" }
      ]
    },
    {
      id: "tsql_cume_dist",
      name: "CUME_DIST()",
      category: "Ранжирующие функции",
      description: "Вычисляет кумулятивное распределение значения (долю строк, значения которых меньше или равны текущему).",
      syntax: "CUME_DIST() OVER ([PARTITION BY partition_expr] ORDER BY order_expr [ASC | DESC])",
      example: "SELECT score, CUME_DIST() OVER(ORDER BY score ASC) as CumDist FROM exams;",
      arguments: [
        { name: "Formula", description: "Кол-во строк со значением <= текущего / Общее кол-во строк.", example: "Всегда возвращает > 0" },
        { name: "Maximum", description: "Последняя строка (или группа с макс. значением) всегда имеет 1.0.", example: "CUME_DIST() OVER(ORDER BY price)" },
        { name: "Insight", description: "Показывает позицию значения относительно всей выборки.", example: "0.8 означает, что 80% данных <= текущему" }
      ]
    },
    {
      id: "tsql_lag",
      name: "LAG()",
      category: "Аналитические функции",
      description: "Предоставляет доступ к данным из предыдущей строки в том же результирующем наборе без использования самообъединения.",
      syntax: "LAG(expression [, offset [, default_value]]) OVER ([PARTITION BY partition_expr] ORDER BY order_expr [ASC | DESC])",
      example: "SELECT Year, Sales, LAG(Sales) OVER (ORDER BY Year) as PreviousYearSales FROM SalesData;",
      arguments: [
        { name: "offset", description: "Количество строк назад, к которым нужно обратиться (по умолчанию 1).", example: "LAG(Sales, 2) -- данные за позапрошлый год" },
        { name: "default_value", description: "Значение, возвращаемое если смещение выходит за пределы раздела (по умолчанию NULL).", example: "LAG(Sales, 1, 0) -- вернет 0 вместо NULL для первой строки" },
        { name: "Trend Analysis", description: "Используется для вычисления разницы между текущим и предыдущим периодом.", example: "SELECT Sales - LAG(Sales) OVER(ORDER BY Date)" }
      ]
    },
    {
      id: "tsql_lead",
      name: "LEAD()",
      category: "Аналитические функции",
      description: "Предоставляет доступ к данным из следующей строки в том же результирующем наборе.",
      syntax: "LEAD(expression [, offset [, default_value]]) OVER ([PARTITION BY partition_expr] ORDER BY order_expr [ASC | DESC])",
      example: "SELECT Year, Sales, LEAD(Sales) OVER (ORDER BY Year) as NextYearSales FROM SalesData;",
      arguments: [
        { name: "offset", description: "Количество строк вперед (по умолчанию 1).", example: "LEAD(amount, 1)" },
        { name: "default_value", description: "Значение для последней строки раздела.", example: "LEAD(price, 1, price)" },
        { name: "Forecasting", description: "Позволяет сравнивать текущие показатели с будущими значениями.", example: "LEAD(status, 1) OVER(PARTITION BY user_id ORDER BY time)" }
      ]
    },
    {
      id: "tsql_first_value",
      name: "FIRST_VALUE()",
      category: "Аналитические функции",
      description: "Возвращает первое значение в упорядоченном наборе данных.",
      syntax: "FIRST_VALUE(expression) OVER ([PARTITION BY partition_expr] ORDER BY order_expr [ASC | DESC] [frame_spec])",
      example: "SELECT Name, Salary, FIRST_VALUE(Name) OVER (PARTITION BY Dept ORDER BY Salary DESC) as HighestPaidInDept FROM Employees;",
      arguments: [
        { name: "expression", description: "Столбец или выражение, значение которого нужно извлечь.", example: "FIRST_VALUE(login_time)" },
        { name: "PARTITION BY", description: "Позволяет найти 'первого' внутри каждой группы.", example: "FIRST_VALUE(id) OVER(PARTITION BY category ...)" },
        { name: "Comparison", description: "Часто используется для сравнения каждого элемента с лидером группы.", example: "SELECT price - FIRST_VALUE(price) OVER(ORDER BY price)" }
      ]
    },
    {
      id: "tsql_last_value",
      name: "LAST_VALUE()",
      category: "Аналитические функции",
      description: "Возвращает последнее значение в упорядоченном наборе данных внутри окна.",
      syntax: "LAST_VALUE(expression) OVER ([PARTITION BY partition_expr] ORDER BY order_expr [ASC | DESC] [frame_spec])",
      example: "SELECT Name, Salary, LAST_VALUE(Name) OVER (PARTITION BY Dept ORDER BY Salary ASC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) as LowestPaidInDept FROM Employees;",
      arguments: [
        { name: "frame_spec", description: "Критически важен для LAST_VALUE. По умолчанию окно заканчивается на CURRENT ROW.", example: "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING" },
        { name: "expression", description: "Целевое выражение для извлечения значения.", example: "LAST_VALUE(order_date)" },
        { name: "Usage", description: "Позволяет получить самое актуальное или конечное значение в группе.", example: "LAST_VALUE(status) OVER(PARTITION BY ticket_id ORDER BY update_time)" }
      ]
    },
    {
      id: "tsql_upper",
      name: "UPPER()",
      category: "Строковые функции",
      description: "Преобразует все символы строки в верхний регистр.",
      syntax: "UPPER(character_expression)",
      example: "SELECT UPPER('sql server'); -- 'SQL SERVER'",
      arguments: [
        { name: "expression", description: "Строковое выражение для преобразования.", example: "UPPER(name)" },
        { name: "Formatting", description: "Часто используется для нормализации данных перед сравнением.", example: "WHERE UPPER(email) = 'ADMIN@EXAMPLE.COM'" },
        { name: "Mixed", description: "Влияет только на буквы, цифры и знаки остаются без изменений.", example: "UPPER('Route 66') -- 'ROUTE 66'" }
      ]
    },
    {
      id: "tsql_lower",
      name: "LOWER()",
      category: "Строковые функции",
      description: "Преобразует все символы строки в нижний регистр.",
      syntax: "LOWER(character_expression)",
      example: "SELECT LOWER('SQL Server'); -- 'sql server'",
      arguments: [
        { name: "expression", description: "Строковое выражение.", example: "LOWER(UserName)" },
        { name: "Email", description: "Идеально для приведения почтовых адресов к единому виду.", example: "SELECT LOWER(email) FROM users" },
        { name: "Search", description: "Облегчает поиск без учета регистра.", example: "WHERE LOWER(city) = 'london'" }
      ]
    },
    {
      id: "tsql_ltrim",
      name: "LTRIM()",
      category: "Строковые функции",
      description: "Удаляет пробелы или другие символы (в новых версиях) слева.",
      syntax: "LTRIM(character_expression [, characters])",
      example: "SELECT LTRIM('   Hello'); -- 'Hello'",
      arguments: [
        { name: "expression", description: "Строка, которую нужно очистить.", example: "LTRIM(address)" },
        { name: "Characters", description: "Список символов для удаления (SQL Server 2022+).", example: "LTRIM('xxxHello', 'x') -- 'Hello'" },
        { name: "Data Cleaning", description: "Помогает убрать лишние отступы при импорте данных.", example: "SELECT LTRIM(raw_text)" }
      ]
    },
    {
      id: "tsql_rtrim",
      name: "RTRIM()",
      category: "Строковые функции",
      description: "Удаляет пробелы или указанные символы справа.",
      syntax: "RTRIM(character_expression [, characters])",
      example: "SELECT RTRIM('Hello   '); -- 'Hello'",
      arguments: [
        { name: "expression", description: "Исходная строка.", example: "RTRIM(note)" },
        { name: "Characters", description: "Символы для удаления (2022+).", example: "RTRIM('Hello...', '.')" },
        { name: "Fixed Length", description: "Полезно для удаления пробелов из полей CHAR.", example: "SELECT RTRIM(char_field)" }
      ]
    },
    {
      id: "tsql_trim",
      name: "TRIM()",
      category: "Строковые функции",
      description: "Удаляет пробелы или указанные символы с обоих концов строки.",
      syntax: "TRIM([characters FROM] character_expression)",
      example: "SELECT TRIM('  Hello  '); -- 'Hello'",
      arguments: [
        { name: "characters", description: "Набор символов для удаления.", example: "TRIM('.,' FROM '...Hello,,,') -- 'Hello'" },
        { name: "Simplicity", description: "Заменяет связку LTRIM(RTRIM(...)).", example: "SELECT TRIM(comment)" },
        { name: "Specific", description: "Можно удалять целые наборы знаков.", example: "TRIM('# ' FROM '# Title #')" }
      ]
    },
    {
      id: "tsql_substring",
      name: "SUBSTRING()",
      category: "Строковые функции",
      description: "Извлекает часть строки заданной длины, начиная с указанной позиции.",
      syntax: "SUBSTRING(expression, start, length)",
      example: "SELECT SUBSTRING('Microsoft', 1, 5); -- 'Micro'",
      arguments: [
        { name: "start", description: "Начальная позиция (отсчет с 1).", example: "SUBSTRING(phone, 2, 3)" },
        { name: "length", description: "Количество извлекаемых символов.", example: "SUBSTRING(code, 5, 10)" },
        { name: "Over-length", description: "Если длина больше остатка строки, извлекается всё до конца.", example: "SUBSTRING('ABC', 2, 100) -- 'BC'" }
      ]
    },
    {
      id: "tsql_charindex",
      name: "CHARINDEX()",
      category: "Строковые функции",
      description: "Возвращает позицию подстроки внутри строки.",
      syntax: "CHARINDEX(substring, expression [, start_position])",
      example: "SELECT CHARINDEX('@', 'user@email.com'); -- 5",
      arguments: [
        { name: "substring", description: "Что ищем.", example: "CHARINDEX(' ', 'First Last')" },
        { name: "start_position", description: "С какой позиции начать поиск.", example: "CHARINDEX('o', 'Hello World', 6) -- 8" },
        { name: "Not Found", description: "Если совпадений нет, возвращает 0.", example: "CHARINDEX('z', 'apple')" }
      ]
    },
    {
      id: "tsql_patindex",
      name: "PATINDEX()",
      category: "Строковые функции",
      description: "Возвращает позицию первого вхождения шаблона в строке.",
      syntax: "PATINDEX('%pattern%', expression)",
      example: "SELECT PATINDEX('%[0-9]%', 'Order 123'); -- 7",
      arguments: [
        { name: "pattern", description: "Шаблон с использованием масок (% , _ , []).", example: "PATINDEX('%[^a-z]%', 'abc1')" },
        { name: "Wildcards", description: "Обязательно использование % в начале и конце для поиска внутри.", example: "PATINDEX('%admin%', username)" },
        { name: "Discovery", description: "Помогает найти первый нецифровой символ или спецсимвол.", example: "PATINDEX('%[^0-9]%', price_text)" }
      ]
    },
    {
      id: "tsql_len",
      name: "LEN()",
      category: "Строковые функции",
      description: "Возвращает количество символов в строке, исключая завершающие пробелы.",
      syntax: "LEN(character_expression)",
      example: "SELECT LEN('SQL   '); -- 3",
      arguments: [
        { name: "Trailing spaces", description: "Пробелы в конце не считаются.", example: "LEN('A ') -- 1" },
        { name: "Leading spaces", description: "Пробелы в начале учитываются.", example: "LEN(' A') -- 2" },
        { name: "Validation", description: "Часто используется для проверки длины пароля или кода.", example: "WHERE LEN(zip_code) = 5" }
      ]
    },
    {
      id: "tsql_datalength",
      name: "DATALENGTH()",
      category: "Строковые функции",
      description: "Возвращает фактическое количество байт, используемых для представления выражения.",
      syntax: "DATALENGTH(expression)",
      example: "SELECT DATALENGTH(N'SQL'); -- 6 (по 2 байта на символ в Unicode)",
      arguments: [
        { name: "Bites", description: "Учитывает все символы, включая пробелы в конце.", example: "DATALENGTH('A ') -- 2" },
        { name: "Unicode", description: "Для nvarchar значения вдвое больше, чем для varchar.", example: "DATALENGTH(N'test') -- 8" },
        { name: "NULL", description: "Для NULL значений возвращает NULL.", example: "DATALENGTH(NULL)" }
      ]
    },
    {
      id: "tsql_sin",
      name: "SIN()",
      category: "Тригонометрические функции",
      description: "Возвращает тригонометрический синус указанного угла в радианах.",
      syntax: "SIN(numeric_expression)",
      example: "SELECT SIN(PI()/2); -- 1.0",
      arguments: [
        { name: "numeric_expression", description: "Выражение типа float или типов, неявно преобразуемых в float, представляющее угол в радианах.", example: "SIN(0.5)" },
        { name: "Example 1", description: "Синус нуля.", example: "SELECT SIN(0); -- 0.0" },
        { name: "Example 2", description: "Синус угла 30 градусов (преобразованного в радианы).", example: "SELECT SIN(30 * PI() / 180); -- 0.5" }
      ]
    },
    {
      id: "tsql_cos",
      name: "COS()",
      category: "Тригонометрические функции",
      description: "Возвращает тригонометрический косинус указанного угла в радианах.",
      syntax: "COS(numeric_expression)",
      example: "SELECT COS(PI()); -- -1.0",
      arguments: [
        { name: "numeric_expression", description: "Угол в радианах.", example: "COS(0)" },
        { name: "Example 1", description: "Косинус 0 радианов.", example: "SELECT COS(0); -- 1.0" },
        { name: "Example 2", description: "Косинус 60 градусов.", example: "SELECT COS(60 * PI() / 180); -- 0.5" }
      ]
    },
    {
      id: "tsql_tan",
      name: "TAN()",
      category: "Тригонометрические функции",
      description: "Возвращает тангенс входного выражения.",
      syntax: "TAN(numeric_expression)",
      example: "SELECT TAN(PI()/4); -- 1.0",
      arguments: [
        { name: "numeric_expression", description: "Угол в радианах.", example: "TAN(1.0)" },
        { name: "Example 1", description: "Тангенс 0.", example: "SELECT TAN(0); -- 0.0" },
        { name: "Example 2", description: "Тангенс 45 градусов.", example: "SELECT TAN(45 * PI() / 180); -- 1.0" }
      ]
    },
    // ТИПЫ ДАННЫХ
    {
      id: "tsql_nchar",
      name: "NCHAR",
      category: "Типы данных",
      description: "Строковые данные фиксированной длины в кодировке Юникод (UTF-16).",
      syntax: "NCHAR(n)",
      example: "CREATE TABLE t (code NCHAR(5));",
      arguments: [
        { name: "n", description: "Количество символов (от 1 до 4000). Занимает 2 байта на символ.", example: "NCHAR(10)" }
      ]
    },
    {
      id: "tsql_nvarchar",
      name: "NVARCHAR",
      category: "Типы данных",
      description: "Строковые данные переменной длины в кодировке Юникод.",
      syntax: "NVARCHAR(n | max)",
      example: "CREATE TABLE t (name NVARCHAR(100));",
      arguments: [
        { name: "n", description: "Максимальное количество символов.", example: "NVARCHAR(50)" },
        { name: "max", description: "Максимальный объем хранения (2 ГБ).", example: "NVARCHAR(MAX)" }
      ]
    },
    {
      id: "tsql_ntext",
      name: "NTEXT",
      category: "Типы данных",
      description: "Устаревший тип данных для больших строк Юникод. Рекомендуется использовать NVARCHAR(MAX).",
      syntax: "NTEXT",
      example: "CREATE TABLE t (old_content NTEXT);"
    },
    {
      id: "tsql_varchar_max",
      name: "VARCHAR(MAX)",
      category: "Типы данных",
      description: "Строковые данные переменной длины (не Юникод) с неограниченным размером до 2 ГБ.",
      syntax: "VARCHAR(MAX)",
      example: "CREATE TABLE t (content VARCHAR(MAX));"
    },
    {
      id: "tsql_nvarchar_max",
      name: "NVARCHAR(MAX)",
      category: "Типы данных",
      description: "Строковые данные переменной длины в кодировке Юникод с неограниченным размером до 2 ГБ.",
      syntax: "NVARCHAR(MAX)",
      example: "CREATE TABLE t (content NVARCHAR(MAX));"
    },
    {
      id: "tsql_varbinary_max",
      name: "VARBINARY(MAX)",
      category: "Типы данных",
      description: "Двоичные данные переменной длины с максимальным размером до 2 ГБ.",
      syntax: "VARBINARY(MAX)",
      example: "CREATE TABLE t (file_data VARBINARY(MAX));"
    },
    {
      id: "tsql_image",
      name: "IMAGE",
      category: "Типы данных",
      description: "Устаревший тип для хранения двоичных данных. Рекомендуется VARBINARY(MAX).",
      syntax: "IMAGE",
      example: "CREATE TABLE t (legacy_image IMAGE);"
    },
    {
      id: "tsql_tinyint",
      name: "TINYINT",
      category: "Типы данных",
      description: "Целое число от 0 до 255 (1 байт).",
      syntax: "TINYINT",
      example: "CREATE TABLE t (age TINYINT);"
    },
    {
      id: "tsql_smallmoney",
      name: "SMALLMONEY",
      category: "Типы данных",
      description: "Денежные данные от -214,748.3648 до 214,748.3647 (4 байта).",
      syntax: "SMALLMONEY",
      example: "CREATE TABLE t (price SMALLMONEY);"
    },
    {
      id: "tsql_datetime2",
      name: "DATETIME2",
      category: "Типы данных",
      description: "Расширенный тип даты и времени с более высокой точностью и диапазоном.",
      syntax: "DATETIME2(n)",
      example: "CREATE TABLE t (event_time DATETIME2(7));",
      arguments: [
        { name: "n", description: "Точность дробных секунд (0-7).", example: "DATETIME2(3)" }
      ]
    },
    {
      id: "tsql_smalldatetime",
      name: "SMALLDATETIME",
      category: "Типы данных",
      description: "Дата и время с точностью до минуты (диапазон 1900-2079).",
      syntax: "SMALLDATETIME",
      example: "CREATE TABLE t (log_date SMALLDATETIME);"
    },
    {
      id: "tsql_datetimeoffset",
      name: "DATETIMEOFFSET",
      category: "Типы данных",
      description: "Дата и время с учетом часового пояса.",
      syntax: "DATETIMEOFFSET(n)",
      example: "CREATE TABLE t (local_time DATETIMEOFFSET);",
      arguments: [
        { name: "n", description: "Точность дробных секунд.", example: "DATETIMEOFFSET(7)" }
      ]
    },
    {
      id: "tsql_cursor",
      name: "CURSOR",
      category: "Типы данных",
      description: "Специальный тип данных для работы с курсорами в процедурах и скриптах.",
      syntax: "CURSOR",
      example: "DECLARE my_cursor CURSOR FOR SELECT id FROM t;"
    },
    {
      id: "tsql_rowversion",
      name: "ROWVERSION",
      category: "Типы данных",
      description: "Автоматически обновляемое уникальное двоичное число внутри базы (ранее TIMESTAMP).",
      syntax: "ROWVERSION",
      example: "CREATE TABLE t (id int, rv ROWVERSION);"
    },
    {
      id: "tsql_hierarchyid",
      name: "HIERARCHYID",
      category: "Типы данных",
      description: "Тип данных для представления положения в иерархической структуре.",
      syntax: "HIERARCHYID",
      example: "CREATE TABLE org (node HIERARCHYID, name nvarchar(50));"
    },
    {
      id: "tsql_uniqueidentifier",
      name: "UNIQUEIDENTIFIER",
      category: "Типы данных",
      description: "Глобально уникальный идентификатор (GUID).",
      syntax: "UNIQUEIDENTIFIER",
      example: "CREATE TABLE t (guid UNIQUEIDENTIFIER DEFAULT NEWID());"
    },
    {
      id: "tsql_sql_variant",
      name: "SQL_VARIANT",
      category: "Типы данных",
      description: "Тип данных, который может хранить значения различных типов данных SQL Server.",
      syntax: "SQL_VARIANT",
      example: "CREATE TABLE t (val SQL_VARIANT);"
    },
    {
      id: "tsql_table",
      name: "TABLE",
      category: "Типы данных",
      description: "Тип данных для хранения результирующего набора строк (табличная переменная).",
      syntax: "DECLARE @my_table TABLE (id int, name nvarchar(50));",
      example: "DECLARE @tmp TABLE (id int); INSERT INTO @tmp VALUES (1);"
    },
    {
      id: "tsql_geometry",
      name: "GEOMETRY",
      category: "Типы данных",
      description: "Тип данных для работы с плоскими (евклидовыми) пространственными данными.",
      syntax: "GEOMETRY",
      example: "DECLARE @g GEOMETRY = GEOMETRY::STGeomFromText('POINT (1 2)', 0);"
    },
    {
      id: "tsql_geography",
      name: "GEOGRAPHY",
      category: "Типы данных",
      description: "Тип данных для работы с географическими (эллипсоидными) пространственными данными.",
      syntax: "GEOGRAPHY",
      example: "DECLARE @g GEOGRAPHY = GEOGRAPHY::STGeomFromText('LINESTRING(-122 47, -122 48)', 4326);"
    },
    {
      id: "tsql_vector",
      name: "VECTOR (SQL Server 2025+)",
      category: "Типы данных",
      description: "Новый тип данных для хранения векторных эмбеддингов, используемых в ИИ и семантическом поиске.",
      syntax: "VECTOR(n)",
      example: "CREATE TABLE ai_data (embedding VECTOR(1536));",
      arguments: [
        { name: "n", description: "Размерность вектора.", example: "VECTOR(768)" }
      ]
    },
    {
      id: "tsql_asin",
      name: "ASIN()",
      category: "Тригонометрические функции",
      description: "Возвращает угол в радианах, синус которого равен указанному выражению float (арксинус).",
      syntax: "ASIN(numeric_expression)",
      example: "SELECT ASIN(1); -- 1.5707... (PI/2)",
      arguments: [
        { name: "numeric_expression", description: "Выражение от -1 до 1.", example: "ASIN(0.5)" },
        { name: "Example 1", description: "Арксинус 0.", example: "SELECT ASIN(0); -- 0.0" },
        { name: "Example 2", description: "Арксинус -1.", example: "SELECT ASIN(-1); -- -1.5707..." }
      ]
    },
    {
      id: "tsql_acos",
      name: "ACOS()",
      category: "Тригонометрические функции",
      description: "Возвращает угол в радианах, косинус которого равен указанному выражению float (арккосинус).",
      syntax: "ACOS(numeric_expression)",
      example: "SELECT ACOS(0); -- 1.5707... (PI/2)",
      arguments: [
        { name: "numeric_expression", description: "Выражение от -1 до 1.", example: "ACOS(1)" },
        { name: "Example 1", description: "Арккосинус 1.", example: "SELECT ACOS(1); -- 0.0" },
        { name: "Example 2", description: "Арккосинус -1.", example: "SELECT ACOS(-1); -- 3.1415... (PI)" }
      ]
    },
    {
      id: "tsql_atan",
      name: "ATAN()",
      category: "Тригонометрические функции",
      description: "Возвращает угол в радианах, тангенс которого равен указанному выражению float (арктангенс).",
      syntax: "ATAN(numeric_expression)",
      example: "SELECT ATAN(1); -- 0.7853... (PI/4)",
      arguments: [
        { name: "numeric_expression", description: "Любое числовое выражение.", example: "ATAN(100)" },
        { name: "Example 1", description: "Арктангенс 0.", example: "SELECT ATAN(0); -- 0.0" },
        { name: "Example 2", description: "Арктангенс очень большого числа.", example: "SELECT ATAN(9999999); -- ~1.5707" }
      ]
    },
    {
      id: "tsql_atan2",
      name: "ATAN2()",
      category: "Тригонометрические функции",
      description: "Возвращает угол в радианах между положительной осью x и точкой (x, y).",
      syntax: "ATAN2(y_expression, x_expression)",
      example: "SELECT ATAN2(1, 1); -- 0.7853... (PI/4)",
      arguments: [
        { name: "y_expression", description: "Координата Y.", example: "1.0" },
        { name: "x_expression", description: "Координата X.", example: "0.0" },
        { name: "Example 1", description: "Точка на оси Y (90 градусов).", example: "SELECT ATAN2(1, 0); -- 1.5707..." }
      ]
    },
    {
      id: "tsql_cot",
      name: "COT()",
      category: "Тригонометрические функции",
      description: "Возвращает тригонометрический котангенс указанного угла в радианах.",
      syntax: "COT(numeric_expression)",
      example: "SELECT COT(PI()/4); -- 1.0",
      arguments: [
        { name: "numeric_expression", description: "Угол в радианах.", example: "COT(0.5)" },
        { name: "Example 1", description: "Котангенс PI/2.", example: "SELECT COT(PI()/2); -- 0.0" },
        { name: "Example 2", description: "Котангенс 1 радиана.", example: "SELECT COT(1); -- 0.642..." }
      ]
    },
    {
      id: "tsql_exp",
      name: "EXP()",
      category: "Логарифмические и экспоненциальные функции",
      description: "Возвращает экспоненциальное значение (e^x) указанного выражения float.",
      syntax: "EXP(numeric_expression)",
      example: "SELECT EXP(1); -- 2.71828182845905",
      arguments: [
        { name: "numeric_expression", description: "Показатель степени для основания e.", example: "EXP(2)" },
        { name: "Example 1", description: "Экспонента нуля.", example: "SELECT EXP(0); -- 1.0" },
        { name: "Example 2", description: "Экспонента натурального логарифма 10.", example: "SELECT EXP(LOG(10)); -- 10.0" }
      ]
    },
    {
      id: "tsql_log",
      name: "LOG()",
      category: "Логарифмические и экспоненциальные функции",
      description: "Возвращает натуральный логарифм или логарифм по указанному основанию.",
      syntax: "LOG(numeric_expression [, base])",
      example: "SELECT LOG(10); -- 2.3025... (натуральный логарифм)",
      arguments: [
        { name: "numeric_expression", description: "Число, логарифм которого нужно найти (должно быть > 0).", example: "LOG(100)" },
        { name: "base", description: "Основание логарифма (необязательно).", example: "LOG(8, 2) -- 3.0" },
        { name: "Example 1", description: "Логарифм 100 по основанию 10.", example: "SELECT LOG(100, 10); -- 2.0" }
      ]
    },
    {
      id: "tsql_log10",
      name: "LOG10()",
      category: "Логарифмические и экспоненциальные функции",
      description: "Возвращает десятичный логарифм указанного выражения float.",
      syntax: "LOG10(numeric_expression)",
      example: "SELECT LOG10(100); -- 2.0",
      arguments: [
        { name: "numeric_expression", description: "Число > 0.", example: "LOG10(1000)" },
        { name: "Example 1", description: "Десятичный логарифм 10.", example: "SELECT LOG10(10); -- 1.0" },
        { name: "Example 2", description: "Десятичный логарифм 1.", example: "SELECT LOG10(1); -- 0.0" }
      ]
    },
    {
      id: "tsql_degrees",
      name: "DEGREES()",
      category: "Преобразование углов",
      description: "Преобразует радианы в градусы.",
      syntax: "DEGREES(numeric_expression)",
      example: "SELECT DEGREES(PI()); -- 180.0",
      arguments: [
        { name: "numeric_expression", description: "Угол в радианах.", example: "DEGREES(0.5)" },
        { name: "Example 1", description: "Преобразование PI/2 радианов.", example: "SELECT DEGREES(PI()/2); -- 90.0" },
        { name: "Example 2", description: "Преобразование 1 радиана.", example: "SELECT DEGREES(1); -- 57.29..." }
      ]
    },
    {
      id: "tsql_radians",
      name: "RADIANS()",
      category: "Преобразование углов",
      description: "Преобразует градусы в радианы.",
      syntax: "RADIANS(numeric_expression)",
      example: "SELECT RADIANS(180.0); -- 3.1415... (PI)",
      arguments: [
        { name: "numeric_expression", description: "Угол в градусах.", example: "RADIANS(90)" },
        { name: "Example 1", description: "Преобразование 90 градусов.", example: "SELECT RADIANS(90.0); -- 1.5707..." },
        { name: "Example 2", description: "Преобразование 45 градусов.", example: "SELECT RADIANS(45.0); -- 0.7853..." }
      ]
    },
    {
      id: "tsql_pi",
      name: "PI()",
      category: "Математические константы",
      description: "Возвращает константу ПИ (3.14159265358979).",
      syntax: "PI()",
      example: "SELECT PI(); -- 3.14159265358979",
      arguments: [
        { name: "Usage", description: "Используется в геометрических расчетах.", example: "SELECT PI() * POWER(radius, 2) AS Area" },
        { name: "Example 1", description: "Длина окружности.", example: "SELECT 2 * PI() * 10; -- 62.83..." },
        { name: "Example 2", description: "Половина ПИ.", example: "SELECT PI()/2; -- 1.5707..." }
      ]
    },
    {
      id: "tsql_modulo",
      name: "% (Modulo)",
      category: "Арифметические операторы",
      description: "Возвращает остаток от деления одного числа на другое.",
      syntax: "expression % numeric_expression",
      example: "SELECT 10 % 3; -- 1",
      arguments: [
        { name: "expression", description: "Делимое.", example: "11 % 4" },
        { name: "numeric_expression", description: "Делитель.", example: "100 % 10" },
        { name: "Example 1", description: "Проверка на четность.", example: "SELECT CASE WHEN id % 2 = 0 THEN 'Even' ELSE 'Odd' END" }
      ]
    },
    {
      id: "tsql_division",
      name: "/ (Division)",
      category: "Арифметические операторы",
      description: "Делит одно число на другое. При делении целых чисел результат будет целым числом.",
      syntax: "expression / numeric_expression",
      example: "SELECT 10 / 3; -- 3",
      arguments: [
        { name: "Integer division", description: "10 / 3 вернет 3.", example: "SELECT 10 / 3" },
        { name: "Decimal division", description: "Чтобы получить десятичный результат, используйте точку.", example: "SELECT 10.0 / 3; -- 3.333..." },
        { name: "Example 1", description: "Деление с плавающей точкой.", example: "SELECT CAST(sales AS FLOAT) / 2" }
      ]
    },
    {
      id: "tsql_bitwise_and",
      name: "& (Bitwise AND)",
      category: "Побитовые операторы",
      description: "Выполняет побитовую логическую операцию И между двумя целыми значениями.",
      syntax: "expression & expression",
      example: "SELECT 170 & 75; -- 10 (10101010 & 01001011 = 00001010)",
      arguments: [
        { name: "Logic", description: "Результат 1 только если оба бита равны 1.", example: "1 & 1 = 1" },
        { name: "Example 1", description: "Проверка флага.", example: "WHERE (flags & 4) > 0" },
        { name: "Example 2", description: "Маскирование битов.", example: "SELECT value & 255" }
      ]
    },
    {
      id: "tsql_bitwise_or",
      name: "| (Bitwise OR)",
      category: "Побитовые операторы",
      description: "Выполняет побитовую логическую операцию ИЛИ между двумя целыми значениями.",
      syntax: "expression | expression",
      example: "SELECT 170 | 75; -- 235 (10101010 | 01001011 = 11101011)",
      arguments: [
        { name: "Logic", description: "Результат 1 если хотя бы один бит равен 1.", example: "1 | 0 = 1" },
        { name: "Example 1", description: "Установка флага.", example: "UPDATE t SET flags = flags | 1" },
        { name: "Example 2", description: "Комбинирование значений.", example: "SELECT 8 | 4 | 2 | 1 -- 15" }
      ]
    },
    {
      id: "tsql_bitwise_xor",
      name: "^ (Bitwise XOR)",
      category: "Побитовые операторы",
      description: "Выполняет побитовую операцию 'исключающее ИЛИ' между двумя целыми значениями.",
      syntax: "expression ^ expression",
      example: "SELECT 170 ^ 75; -- 225 (10101010 ^ 01001011 = 11100001)",
      arguments: [
        { name: "Logic", description: "Результат 1 только если биты различаются.", example: "1 ^ 0 = 1, 1 ^ 1 = 0" },
        { name: "Example 1", description: "Переключение бита.", example: "SELECT value ^ 1" },
        { name: "Example 2", description: "Обмен значений без буфера.", example: "SELECT a ^ b" }
      ]
    },
    {
      id: "tsql_bitwise_not",
      name: "~ (Bitwise NOT)",
      category: "Побитовые операторы",
      description: "Выполняет побитовую операцию НЕ (инверсию битов).",
      syntax: "~expression",
      example: "SELECT ~170; -- -171 (в зависимости от типа данных)",
      arguments: [
        { name: "Logic", description: "Заменяет каждый 0 на 1 и каждую 1 на 0.", example: "~1 = 0" },
        { name: "Example 1", description: "Инверсия маски.", example: "SELECT ~mask" },
        { name: "Example 2", description: "Побитовое отрицание.", example: "SELECT ~5 -- -6" }
      ]
    },
    {
      id: "tsql_bitwise_left_shift",
      name: "<< (Left Shift)",
      category: "Побитовые операторы",
      description: "Сдвигает биты первого выражения влево на количество позиций, указанное во втором выражении.",
      syntax: "expression << expression",
      example: "SELECT 1 << 3; -- 8 (0001 сдвигается на 3 позиции влево -> 1000)",
      arguments: [
        { name: "Math", description: "Сдвиг влево на N эквивалентен умножению на 2^N.", example: "5 << 1 = 10" },
        { name: "Example 1", description: "Быстрое умножение на 2.", example: "SELECT val << 1" },
        { name: "Example 2", description: "Создание битовых масок.", example: "SELECT 1 << flag_index" }
      ]
    },
    {
      id: "tsql_bitwise_right_shift",
      name: ">> (Right Shift)",
      category: "Побитовые операторы",
      description: "Сдвигает биты первого выражения вправо на количество позиций, указанное во втором выражении.",
      syntax: "expression >> expression",
      example: "SELECT 8 >> 3; -- 1 (1000 сдвигается на 3 позиции вправо -> 0001)",
      arguments: [
        { name: "Math", description: "Сдвиг вправо на N эквивалентен делению на 2^N.", example: "20 >> 1 = 10" },
        { name: "Example 1", description: "Быстрое деление на 2.", example: "SELECT val >> 1" },
        { name: "Example 2", description: "Извлечение битовых значений.", example: "SELECT (flags >> 2) & 1" }
      ]
    },
    {
      id: "tsql_greatest",
      name: "GREATEST()",
      category: "Числовые функции",
      description: "Возвращает максимальное значение из списка выражений.",
      syntax: "GREATEST(expression1, expression2 [, expression3 ...])",
      example: "SELECT GREATEST(10, 20, 30); -- 30",
      arguments: [
        { name: "Expressions", description: "Список числовых или строковых выражений.", example: "GREATEST(col1, col2)" },
        { name: "Example 1", description: "Сравнение дат.", example: "SELECT GREATEST('2023-01-01', '2024-01-01')" },
        { name: "Example 2", description: "Выбор наибольшей цены.", example: "SELECT GREATEST(base_price, promo_price)" }
      ]
    },
    {
      id: "tsql_least",
      name: "LEAST()",
      category: "Числовые функции",
      description: "Возвращает минимальное значение из списка выражений.",
      syntax: "LEAST(expression1, expression2 [, expression3 ...])",
      example: "SELECT LEAST(10, 20, 30); -- 10",
      arguments: [
        { name: "Expressions", description: "Список выражений для сравнения.", example: "LEAST(1, 5, -2)" },
        { name: "Example 1", description: "Ограничение максимального значения.", example: "SELECT LEAST(user_score, 100)" },
        { name: "Example 2", description: "Поиск самой ранней даты.", example: "SELECT LEAST(start_date, end_date)" }
      ]
    },
    {
      id: "tsql_abs",
      name: "ABS()",
      category: "Числовые функции",
      description: "Возвращает абсолютное значение (модуль) числа.",
      syntax: "ABS(numeric_expression)",
      example: "SELECT ABS(-15); -- 15",
      arguments: [
        { name: "numeric_expression", description: "Числовое выражение.", example: "ABS(balance)" },
        { name: "Example 1", description: "Разница между значениями.", example: "SELECT ABS(score1 - score2)" },
        { name: "Example 2", description: "Модуль нуля.", example: "SELECT ABS(0); -- 0" }
      ]
    },
    {
      id: "tsql_getdate",
      name: "GETDATE()",
      category: "Функции даты и времени",
      description: "Возвращает текущую системную дату и время в формате datetime.",
      syntax: "GETDATE()",
      example: "SELECT GETDATE(); -- 2024-03-20 14:30:05.123",
      arguments: [
        { name: "Usage", description: "Используется для фиксации времени создания записи.", example: "DEFAULT GETDATE()" },
        { name: "Example 1", description: "Текущая дата.", example: "SELECT GETDATE()" },
        { name: "Example 2", description: "Добавление дней к текущей дате.", example: "SELECT DATEADD(day, 7, GETDATE())" }
      ]
    },
    {
      id: "tsql_getutcdate",
      name: "GETUTCDATE()",
      category: "Функции даты и времени",
      description: "Возвращает текущую системную дату и время по Гринвичу (UTC).",
      syntax: "GETUTCDATE()",
      example: "SELECT GETUTCDATE();",
      arguments: [
        { name: "Standardization", description: "Используется для хранения времени в едином стандарте.", example: "INSERT INTO logs (utc_time) VALUES (GETUTCDATE())" },
        { name: "Example 1", description: "Сравнение локального и UTC времени.", example: "SELECT GETDATE(), GETUTCDATE()" },
        { name: "Example 2", description: "Использование в веб-приложениях.", example: "SELECT GETUTCDATE() AS ServerTimeUTC" }
      ]
    },
    {
      id: "tsql_sysdatetime",
      name: "SYSDATETIME()",
      category: "Функции даты и времени",
      description: "Возвращает текущую дату и время с более высокой точностью, чем GETDATE().",
      syntax: "SYSDATETIME()",
      example: "SELECT SYSDATETIME(); -- 2024-03-20 14:30:05.1234567",
      arguments: [
        { name: "Precision", description: "Возвращает тип datetime2(7).", example: "SYSDATETIME()" },
        { name: "Example 1", description: "Высокоточное время.", example: "SELECT SYSDATETIME()" },
        { name: "Example 2", description: "Замер времени выполнения (начало).", example: "DECLARE @start datetime2 = SYSDATETIME()" }
      ]
    },
    {
      id: "tsql_sysutcdatetime",
      name: "SYSUTCDATETIME()",
      category: "Функции даты и времени",
      description: "Возвращает текущую дату и время по UTC с высокой точностью.",
      syntax: "SYSUTCDATETIME()",
      example: "SELECT SYSUTCDATETIME();",
      arguments: [
        { name: "Precision", description: "Более точный аналог GETUTCDATE().", example: "SYSUTCDATETIME()" },
        { name: "Example 1", description: "Точное UTC время.", example: "SELECT SYSUTCDATETIME()" },
        { name: "Example 2", description: "Аудит событий в микросекундах.", example: "SELECT SYSUTCDATETIME() AS PreciseUTC" }
      ]
    },
    {
      id: "tsql_sysdatetimeoffset",
      name: "SYSDATETIMEOFFSET()",
      category: "Функции даты и времени",
      description: "Возвращает текущую дату и время сервера вместе со смещением относительно UTC.",
      syntax: "SYSDATETIMEOFFSET()",
      example: "SELECT SYSDATETIMEOFFSET(); -- 2024-03-20 14:30:05 +03:00",
      arguments: [
        { name: "Timezone", description: "Включает информацию о часовом поясе.", example: "SYSDATETIMEOFFSET()" },
        { name: "Example 1", description: "Получение смещения.", example: "SELECT SYSDATETIMEOFFSET()" },
        { name: "Example 2", description: "Конвертация в другой часовой пояс.", example: "SELECT SYSDATETIMEOFFSET() AT TIME ZONE 'UTC'" }
      ]
    },
    {
      id: "tsql_current_timestamp",
      name: "CURRENT_TIMESTAMP",
      category: "Функции даты и времени",
      description: "ANSI SQL эквивалент функции GETDATE().",
      syntax: "CURRENT_TIMESTAMP",
      example: "SELECT CURRENT_TIMESTAMP;",
      arguments: [
        { name: "Standard", description: "Предпочтительно для кросс-платформенного кода.", example: "CURRENT_TIMESTAMP" },
        { name: "Example 1", description: "Вставка текущего времени.", example: "INSERT INTO stats (checked_at) VALUES (CURRENT_TIMESTAMP)" },
        { name: "Example 2", description: "Вывод времени.", example: "SELECT CURRENT_TIMESTAMP AS Now" }
      ]
    },
    {
      id: "tsql_datepart",
      name: "DATEPART()",
      category: "Функции даты и времени",
      description: "Возвращает целое число, представляющее указанную часть (год, месяц, день и т.д.) указанной даты.",
      syntax: "DATEPART(datepart, date_expression)",
      example: "SELECT DATEPART(year, '2024-03-20'); -- 2024",
      arguments: [
        { name: "datepart", description: "Часть даты (year, month, day, hour, minute и т.д.).", example: "month" },
        { name: "date_expression", description: "Выражение, которое можно разрешить в значение типа date, datetime или time.", example: "GETDATE()" },
        { name: "Example 1", description: "Получение номера месяца.", example: "SELECT DATEPART(mm, GETDATE());" },
        { name: "Example 2", description: "Получение часа из времени.", example: "SELECT DATEPART(hh, '14:30:05'); -- 14" }
      ]
    },
    {
      id: "tsql_datename",
      name: "DATENAME()",
      category: "Функции даты и времени",
      description: "Возвращает символьную строку, представляющую указанную часть указанной даты (например, название месяца или дня недели).",
      syntax: "DATENAME(datepart, date_expression)",
      example: "SELECT DATENAME(month, '2024-03-20'); -- 'March' (зависит от настроек языка)",
      arguments: [
        { name: "datepart", description: "Часть даты для извлечения.", example: "weekday" },
        { name: "Example 1", description: "Название дня недели.", example: "SELECT DATENAME(dw, GETDATE()); -- 'Wednesday'" },
        { name: "Example 2", description: "Название месяца.", example: "SELECT DATENAME(mm, '2024-12-01'); -- 'December'" },
        { name: "Example 3", description: "Номер недели в году.", example: "SELECT DATENAME(wk, GETDATE());" }
      ]
    },
    {
      id: "tsql_dateadd",
      name: "DATEADD()",
      category: "Функции даты и времени",
      description: "Возвращает новую дату на основе добавления интервала к указанной дате.",
      syntax: "DATEADD(datepart, number, date_expr)",
      example: "SELECT DATEADD(day, 10, '2024-01-01'); -- '2024-01-11'",
      arguments: [
        { name: "datepart", description: "Тип интервала (year, month, day и др.).", example: "month" },
        { name: "number", description: "Величина добавляемого интервала (может быть отрицательной).", example: "5" },
        { name: "Example 1", description: "Добавление 3 месяцев.", example: "SELECT DATEADD(mm, 3, GETDATE());" },
        { name: "Example 2", description: "Вычитание 1 года.", example: "SELECT DATEADD(yy, -1, GETDATE());" },
        { name: "Example 3", description: "Добавление 30 минут.", example: "SELECT DATEADD(mi, 30, GETDATE());" }
      ]
    },
    {
      id: "tsql_datediff",
      name: "DATEDIFF()",
      category: "Функции даты и времени",
      description: "Возвращает количество границ между двумя датами в указанных единицах (datepart).",
      syntax: "DATEDIFF(datepart, startdate, enddate)",
      example: "SELECT DATEDIFF(day, '2024-01-01', '2024-01-10'); -- 9",
      arguments: [
        { name: "startdate / enddate", description: "Даты для сравнения.", example: "'2023-01-01', '2024-01-01'" },
        { name: "Example 1", description: "Разница в годах.", example: "SELECT DATEDIFF(yy, '2000-01-01', GETDATE());" },
        { name: "Example 2", description: "Разница в месяцах.", example: "SELECT DATEDIFF(mm, '2023-01-01', '2023-05-01'); -- 4" },
        { name: "Example 3", description: "Разница в минутах между двумя событиями.", example: "SELECT DATEDIFF(mi, start_time, end_time);" }
      ]
    },
    {
      id: "tsql_datediff_big",
      name: "DATEDIFF_BIG()",
      category: "Функции даты и времени",
      description: "Аналогична DATEDIFF, но возвращает результат типа bigint для больших интервалов (например, наносекунд).",
      syntax: "DATEDIFF_BIG(datepart, startdate, enddate)",
      example: "SELECT DATEDIFF_BIG(ns, '2024-01-01', '2024-01-02');",
      arguments: [
        { name: "Result Type", description: "Возвращает bigint, что предотвращает переполнение при расчете мелких интервалов.", example: "DATEDIFF_BIG(ms, ...)" },
        { name: "Example 1", description: "Разница в миллисекундах за долгий период.", example: "SELECT DATEDIFF_BIG(ms, '1900-01-01', GETDATE());" },
        { name: "Example 2", description: "Разница в микросекундах.", example: "SELECT DATEDIFF_BIG(mcs, start_time, end_time);" },
        { name: "Example 3", description: "Разница в секундах для исторических данных.", example: "SELECT DATEDIFF_BIG(ss, '1753-01-01', GETDATE());" }
      ]
    },
    {
      id: "tsql_eomonth",
      name: "EOMONTH()",
      category: "Функции даты и времени",
      description: "Возвращает последний день месяца, содержащего указанную дату, с возможностью смещения на несколько месяцев.",
      syntax: "EOMONTH(date_expression [, month_to_add])",
      example: "SELECT EOMONTH('2024-02-01'); -- '2024-02-29' (високосный год)",
      arguments: [
        { name: "month_to_add", description: "Количество месяцев, добавляемых к исходной дате перед вычислением конца месяца.", example: "1" },
        { name: "Example 1", description: "Конец текущего месяца.", example: "SELECT EOMONTH(GETDATE());" },
        { name: "Example 2", description: "Конец следующего месяца.", example: "SELECT EOMONTH(GETDATE(), 1);" },
        { name: "Example 3", description: "Конец последнего месяца прошлого года.", example: "SELECT EOMONTH('2024-01-15', -1); -- '2023-12-31'" }
      ]
    },
    {
      id: "tsql_datefromparts",
      name: "DATEFROMPARTS()",
      category: "Функции конструирования даты",
      description: "Возвращает значение типа date на основе указанных года, месяца и дня.",
      syntax: "DATEFROMPARTS(year, month, day)",
      example: "SELECT DATEFROMPARTS(2024, 12, 31); -- '2024-12-31'",
      arguments: [
        { name: "parts", description: "Целые числа, представляющие компоненты даты.", example: "2024, 1, 1" },
        { name: "Example 1", description: "Создание даты из переменных.", example: "SELECT DATEFROMPARTS(@y, @m, @d);" },
        { name: "Example 2", description: "Первый день текущего года.", example: "SELECT DATEFROMPARTS(YEAR(GETDATE()), 1, 1);" },
        { name: "Example 3", description: "Конструирование даты из данных таблицы.", example: "SELECT DATEFROMPARTS(birth_year, birth_month, birth_day) FROM users;" }
      ]
    },
    {
      id: "tsql_datetimefromparts",
      name: "DATETIMEFROMPARTS()",
      category: "Функции конструирования даты",
      description: "Возвращает значение типа datetime на основе указанных компонентов.",
      syntax: "DATETIMEFROMPARTS(year, month, day, hour, minute, second, millisecond)",
      example: "SELECT DATETIMEFROMPARTS(2024, 3, 20, 14, 30, 0, 0);",
      arguments: [
        { name: "Precision", description: "Миллисекунды должны быть кратны 3 (особенность типа datetime).", example: "..., 0, 500" },
        { name: "Example 1", description: "Создание метки времени.", example: "SELECT DATETIMEFROMPARTS(2024, 1, 1, 0, 0, 0, 0);" },
        { name: "Example 2", description: "Полдень конкретной даты.", example: "SELECT DATETIMEFROMPARTS(2024, 5, 1, 12, 0, 0, 0);" },
        { name: "Example 3", description: "Время с миллисекундами.", example: "SELECT DATETIMEFROMPARTS(2024, 1, 1, 23, 59, 59, 997);" }
      ]
    },
    {
      id: "tsql_datetime2fromparts",
      name: "DATETIME2FROMPARTS()",
      category: "Функции конструирования даты",
      description: "Возвращает значение типа datetime2 с указанной точностью.",
      syntax: "DATETIME2FROMPARTS(year, month, day, hour, minute, second, fractions, precision)",
      example: "SELECT DATETIME2FROMPARTS(2024, 3, 20, 14, 30, 0, 500, 3);",
      arguments: [
        { name: "fractions / precision", description: "Доли секунды и их точность (количество знаков).", example: "500, 3" },
        { name: "Example 1", description: "Высокоточное время (7 знаков).", example: "SELECT DATETIME2FROMPARTS(2024, 1, 1, 12, 0, 0, 1234567, 7);" },
        { name: "Example 2", description: "Время без долей секунды.", example: "SELECT DATETIME2FROMPARTS(2024, 1, 1, 10, 0, 0, 0, 0);" },
        { name: "Example 3", description: "Конструирование из системных частей.", example: "SELECT DATETIME2FROMPARTS(2024, 6, 15, 8, 30, 0, 0, 7);" }
      ]
    },
    {
      id: "tsql_datetimeoffsetfromparts",
      name: "DATETIMEOFFSETFROMPARTS()",
      category: "Функции конструирования даты",
      description: "Возвращает значение datetimeoffset с указанным смещением часового пояса.",
      syntax: "DATETIMEOFFSETFROMPARTS(year, month, day, hour, minute, second, fractions, hour_offset, minute_offset, precision)",
      example: "SELECT DATETIMEOFFSETFROMPARTS(2024, 3, 20, 14, 30, 0, 0, 3, 0, 0); -- +03:00",
      arguments: [
        { name: "offsets", description: "Смещение в часах и минутах относительно UTC.", example: "3, 0 (для Москвы)" },
        { name: "Example 1", description: "Время со смещением +5 часов.", example: "SELECT DATETIMEOFFSETFROMPARTS(2024, 1, 1, 10, 0, 0, 0, 5, 0, 0);" },
        { name: "Example 2", description: "Отрицательное смещение (-8 часов).", example: "SELECT DATETIMEOFFSETFROMPARTS(2024, 1, 1, 10, 0, 0, 0, -8, 0, 0);" },
        { name: "Example 3", description: "Смещение с минутами (+3:30).", example: "SELECT DATETIMEOFFSETFROMPARTS(2024, 1, 1, 10, 0, 0, 0, 3, 30, 0);" }
      ]
    },
    {
      id: "tsql_smalldatetimefromparts",
      name: "SMALLDATETIMEOFFSETFROMPARTS()",
      category: "Функции конструирования даты",
      description: "Возвращает значение типа smalldatetime.",
      syntax: "SMALLDATETIMEFROMPARTS(year, month, day, hour, minute)",
      example: "SELECT SMALLDATETIMEFROMPARTS(2024, 3, 20, 14, 30);",
      arguments: [
        { name: "Type", description: "Тип smalldatetime не содержит секунд и миллисекунд.", example: "SMALLDATETIMEFROMPARTS(2024, 1, 1, 12, 0)" },
        { name: "Example 1", description: "Простое создание даты-времени.", example: "SELECT SMALLDATETIMEFROMPARTS(2024, 1, 1, 23, 59);" },
        { name: "Example 2", description: "Минимально возможное значение.", example: "SELECT SMALLDATETIMEFROMPARTS(1900, 1, 1, 0, 0);" },
        { name: "Example 3", description: "Максимально возможное значение.", example: "SELECT SMALLDATETIMEFROMPARTS(2079, 6, 6, 23, 59);" }
      ]
    },
    {
      id: "tsql_timefromparts",
      name: "TIMEFROMPARTS()",
      category: "Функции конструирования даты",
      description: "Возвращает значение типа time с указанной точностью.",
      syntax: "TIMEFROMPARTS(hour, minute, second, fractions, precision)",
      example: "SELECT TIMEFROMPARTS(14, 30, 0, 0, 0); -- '14:30:00'",
      arguments: [
        { name: "Parts", description: "Компоненты только времени без даты.", example: "14, 30, 0, 500, 3" },
        { name: "Example 1", description: "Создание времени с точностью до секунд.", example: "SELECT TIMEFROMPARTS(10, 15, 30, 0, 0);" },
        { name: "Example 2", description: "Время с миллисекундами.", example: "SELECT TIMEFROMPARTS(23, 59, 59, 999, 3);" },
        { name: "Example 3", description: "Время с высокой точностью (7 знаков).", example: "SELECT TIMEFROMPARTS(12, 0, 0, 1234567, 7);" }
      ]
    },
    {
      id: "tsql_cast_date",
      name: "CAST()",
      category: "Преобразование типов даты и времени",
      description: "Преобразует выражение из одного типа данных в другой (DATE, TIME, DATETIME и др.).",
      syntax: "CAST(expression AS data_type)",
      example: "SELECT CAST('2024-03-20' AS DATETIME);",
      arguments: [
        { name: "expression", description: "Любое допустимое выражение для преобразования.", example: "GETDATE()" },
        { name: "data_type", description: "Целевой тип данных (DATE, TIME, DATETIME2 и т.д.).", example: "DATE" },
        { name: "Example 1", description: "Извлечение только даты из datetime.", example: "SELECT CAST(GETDATE() AS DATE);" },
        { name: "Example 2", description: "Преобразование строки в время.", example: "SELECT CAST('14:30:05' AS TIME);" },
        { name: "Example 3", description: "Преобразование в формат с часовым поясом.", example: "SELECT CAST(GETDATE() AS DATETIMEOFFSET);" }
      ]
    },
    {
      id: "tsql_convert_date",
      name: "CONVERT()",
      category: "Преобразование типов даты и времени",
      description: "Аналогична CAST, но позволяет указывать стиль форматирования (особенно полезно для дат).",
      syntax: "CONVERT(data_type, expression [, style])",
      example: "SELECT CONVERT(VARCHAR, GETDATE(), 104); -- '20.03.2024'",
      arguments: [
        { name: "style", description: "Целое число, представляющее формат даты (например, 104 - немецкий, 101 - США).", example: "104" },
        { name: "Example 1", description: "Преобразование в дату (стиль ISO).", example: "SELECT CONVERT(DATE, '20240320', 112);" },
        { name: "Example 2", description: "Форматирование времени.", example: "SELECT CONVERT(VARCHAR, GETDATE(), 108); -- '14:30:05'" },
        { name: "Example 3", description: "Преобразование в datetime2.", example: "SELECT CONVERT(DATETIME2, '2024-03-20 14:30:05', 121);" }
      ]
    },
    {
      id: "tsql_try_convert_date",
      name: "TRY_CONVERT()",
      category: "Преобразование типов даты и времени",
      description: "Безопасно преобразует значение в указанный тип. Если преобразование невозможно, возвращает NULL вместо ошибки.",
      syntax: "TRY_CONVERT(data_type, expression [, style])",
      example: "SELECT TRY_CONVERT(DATE, 'invalid-date'); -- NULL",
      arguments: [
        { name: "Safety", description: "Предотвращает сбой запроса при некорректных входных данных.", example: "TRY_CONVERT(INT, 'abc')" },
        { name: "Example 1", description: "Проверка корректности даты.", example: "SELECT TRY_CONVERT(DATETIME, '2024-02-30'); -- NULL" },
        { name: "Example 2", description: "Безопасное приведение к времени.", example: "SELECT TRY_CONVERT(TIME, '25:00:00'); -- NULL" },
        { name: "Example 3", description: "Использование в фильтрации.", example: "WHERE TRY_CONVERT(DATE, date_string_col) IS NOT NULL" }
      ]
    },
    {
      id: "tsql_cast",
      name: "CAST",
      category: "Преобразование типов",
      description: "Преобразует выражение из одного типа данных в другой.",
      syntax: "CAST(expression AS data_type [(length | precision, scale)])\nTRY_CAST(expression AS data_type)",
      example: "SELECT CAST(123.45 AS INT); -- 123",
      arguments: [
        { name: "expression", description: "Любое допустимое выражение.", example: "price" },
        { name: "data_type", description: "Целевой системный тип данных.", example: "VARCHAR(50)" },
        { name: "TRY_CAST", description: "Возвращает NULL при неудачном преобразовании вместо ошибки.", example: "TRY_CAST('abc' AS INT)" },
        { name: "Example 1", description: "Преобразование в строку с ограничением длины.", example: "SELECT CAST(100.5 AS VARCHAR(10));" },
        { name: "Example 2", description: "Округление при приведении к целому числу.", example: "SELECT CAST(9.99 AS INT); -- 9" },
        { name: "Example 3", description: "Безопасное приведение строки к числу.", example: "SELECT TRY_CAST('12.3' AS FLOAT);" }
      ]
    },
    {
      id: "tsql_convert",
      name: "CONVERT",
      category: "Преобразование типов",
      description: "Преобразует выражение одного типа данных в другой с возможностью форматирования.",
      syntax: "CONVERT(data_type [(length)], expression [, style])\nTRY_CONVERT(data_type, expression [, style])",
      example: "SELECT CONVERT(VARCHAR, GETDATE(), 101); -- '03/20/2024'",
      arguments: [
        { name: "style", description: "Целочисленный стиль для форматирования даты или денег.", example: "120 (ODBC canonical)" },
        { name: "VARCHAR(MAX)", description: "Преобразование в строку неограниченной длины.", example: "CONVERT(VARCHAR(MAX), large_text_col)" },
        { name: "Example 1", description: "Форматирование денежных значений.", example: "SELECT CONVERT(VARCHAR, CAST(1234.5 AS MONEY), 1);" },
        { name: "Example 2", description: "Безопасное преобразование даты.", example: "SELECT TRY_CONVERT(DATETIME, '2024-01-01', 121);" },
        { name: "Example 3", description: "Конвертация бинарных данных в строку.", example: "SELECT CONVERT(VARCHAR, 0x53514C, 0); -- 'SQL'" }
      ]
    },
    {
      id: "tsql_str",
      name: "STR()",
      category: "Преобразование типов",
      description: "Возвращает символьные данные, преобразованные из числовых данных.",
      syntax: "STR(float_expression [, length [, decimal]])",
      example: "SELECT STR(123.45, 6, 1); -- ' 123.5'",
      arguments: [
        { name: "length", description: "Общая длина возвращаемой строки (включая точку и знак).", example: "10" },
        { name: "decimal", description: "Количество знаков после запятой.", example: "2" },
        { name: "Example 1", description: "Простое преобразование числа.", example: "SELECT STR(10);" },
        { name: "Example 2", description: "Преобразование с указанием длины.", example: "SELECT STR(123.456, 10, 2); -- '    123.46'" },
        { name: "Example 3", description: "Обработка больших чисел.", example: "SELECT STR(999.9, 3); -- '**' (ошибка длины)" }
      ]
    },
    {
      id: "tsql_format",
      name: "FORMAT()",
      category: "Преобразование типов",
      description: "Возвращает значение, отформатированное в соответствии с указанным форматом и необязательными сведениями о языке и региональных параметрах.",
      syntax: "FORMAT(value, format_string [, culture])",
      example: "SELECT FORMAT(GETDATE(), 'dd/MM/yyyy'); -- '20/03/2024'",
      arguments: [
        { name: "format_string", description: "Шаблон форматирования .NET.", example: "'C' (Currency), 'D' (Date)" },
        { name: "culture", description: "Региональные параметры (например, 'ru-RU', 'en-US').", example: "'de-DE'" },
        { name: "Example 1", description: "Форматирование валюты для РФ.", example: "SELECT FORMAT(1250.5, 'C', 'ru-RU');" },
        { name: "Example 2", description: "Пользовательский формат даты.", example: "SELECT FORMAT(GETDATE(), 'MMMM dd, yyyy');" },
        { name: "Example 3", description: "Форматирование чисел с разделителями.", example: "SELECT FORMAT(1000000, '#,0'); -- '1,000,000'" }
      ]
    },
    {
      id: "tsql_parse",
      name: "PARSE()",
      category: "Преобразование типов",
      description: "Возвращает результат выражения, преобразованный в запрошенный тип данных на основе региональных параметров.",
      syntax: "PARSE(string_value AS data_type [USING culture])\nTRY_PARSE(string_value AS data_type [USING culture])",
      example: "SELECT PARSE('Monday, 20 March 2024' AS DATETIME USING 'en-US');",
      arguments: [
        { name: "string_value", description: "Строковое значение для разбора.", example: "'€ 12,50'" },
        { name: "USING culture", description: "Язык входной строки.", example: "'fr-FR'" },
        { name: "Example 1", description: "Разбор денежного значения.", example: "SELECT PARSE('$100.00' AS MONEY USING 'en-US');" },
        { name: "Example 2", description: "Безопасный разбор даты.", example: "SELECT TRY_PARSE('30/02/2024' AS DATE USING 'ru-RU'); -- NULL" },
        { name: "Example 3", description: "Разбор числа с региональной спецификой.", example: "SELECT PARSE('1.234,56' AS DECIMAL(10,2) USING 'de-DE');" }
      ]
    },
    {
      id: "tsql_json_object",
      name: "JSON_OBJECT()",
      category: "JSON функции",
      description: "Создает JSON-объект из списка пар ключ-значение.",
      syntax: "JSON_OBJECT([key : value [, ...]])",
      example: "SELECT JSON_OBJECT('id': 1, 'name': 'John'); -- '{\"id\":1,\"name\":\"John\"}'",
      arguments: [
        { name: "key : value", description: "Пара ключ и значение для включения в объект.", example: "'status': 'active'" },
        { name: "Example 1", description: "Создание объекта из колонок таблицы.", example: "SELECT JSON_OBJECT('name': Name, 'price': Price) FROM Products;" },
        { name: "Example 2", description: "Вложенные объекты.", example: "SELECT JSON_OBJECT('user': JSON_OBJECT('id': 1));" },
        { name: "Example 3", description: "Пустой объект.", example: "SELECT JSON_OBJECT();" }
      ]
    },
    {
      id: "tsql_json_array",
      name: "JSON_ARRAY()",
      category: "JSON функции",
      description: "Создает JSON-массив из списка значений.",
      syntax: "JSON_ARRAY([value [, ...]])",
      example: "SELECT JSON_ARRAY(1, 'apple', 3.14); -- '[1,\"apple\",3.14]'",
      arguments: [
        { name: "value", description: "Любое значение или выражение для включения в массив.", example: "JSON_ARRAY(1, 2, 3)" },
        { name: "Example 1", description: "Массив из разных типов данных.", example: "SELECT JSON_ARRAY('A', 10, NULL);" },
        { name: "Example 2", description: "Создание массива из колонок.", example: "SELECT JSON_ARRAY(ID, Name) FROM Users;" },
        { name: "Example 3", description: "Вложенные массивы.", example: "SELECT JSON_ARRAY(1, JSON_ARRAY(2, 3));" }
      ]
    },
    {
      id: "tsql_json_value",
      name: "JSON_VALUE()",
      category: "JSON функции",
      description: "Извлекает скалярное значение (строку, число, булево) из строки JSON.",
      syntax: "JSON_VALUE(json_text, path)",
      example: "SELECT JSON_VALUE('{\"id\":1}', '$.id'); -- '1'",
      arguments: [
        { name: "path", description: "Путь JSON (начинается с $).", example: "'$.user.name'" },
        { name: "Example 1", description: "Извлечение из вложенного объекта.", example: "SELECT JSON_VALUE(json_col, '$.info.address.city');" },
        { name: "Example 2", description: "Извлечение из массива.", example: "SELECT JSON_VALUE(json_col, '$.tags[0]');" },
        { name: "Example 3", description: "Обработка отсутствующих ключей.", example: "SELECT JSON_VALUE('{}', '$.key'); -- NULL" }
      ]
    },
    {
      id: "tsql_json_query",
      name: "JSON_QUERY()",
      category: "JSON функции",
      description: "Извлекает объект или массив из строки JSON.",
      syntax: "JSON_QUERY(json_text, path)",
      example: "SELECT JSON_QUERY('{\"items\":[1,2]}', '$.items'); -- '[1,2]'",
      arguments: [
        { name: "Scalar vs Object", description: "В отличие от JSON_VALUE, возвращает JSON-фрагмент, а не скаляр.", example: "JSON_QUERY(json, '$')" },
        { name: "Example 1", description: "Извлечение вложенного объекта.", example: "SELECT JSON_QUERY(json_col, '$.metadata');" },
        { name: "Example 2", description: "Извлечение всего массива.", example: "SELECT JSON_QUERY(json_col, '$.history');" },
        { name: "Example 3", description: "Использование для вставки JSON.", example: "SELECT JSON_OBJECT('data': JSON_QUERY('{\"id\":1}'));" }
      ]
    },
    {
      id: "tsql_json_modify",
      name: "JSON_MODIFY()",
      category: "JSON функции",
      description: "Обновляет значение свойства в строке JSON и возвращает обновленную строку.",
      syntax: "JSON_MODIFY(json_text, path, new_value)",
      example: "SELECT JSON_MODIFY('{\"a\":1}', '$.a', 2); -- '{\"a\":2}'",
      arguments: [
        { name: "append", description: "Добавление в массив с помощью ключевого слова append.", example: "JSON_MODIFY(json, 'append $.tags', 'new')" },
        { name: "Example 1", description: "Изменение значения ключа.", example: "SELECT JSON_MODIFY(json_col, '$.status', 'closed');" },
        { name: "Example 2", description: "Удаление ключа (установка в NULL).", example: "SELECT JSON_MODIFY(json_col, '$.temp', NULL);" },
        { name: "Example 3", description: "Добавление нового ключа.", example: "SELECT JSON_MODIFY(json_col, '$.new_key', 'value');" }
      ]
    },
    {
      id: "tsql_json_arrayagg",
      name: "JSON_ARRAYAGG()",
      category: "JSON функции",
      description: "Агрегатная функция, объединяющая значения строк в JSON-массив.",
      syntax: "JSON_ARRAYAGG(expression [ORDER BY order_clause])",
      example: "SELECT JSON_ARRAYAGG(Name) FROM Users;",
      arguments: [
        { name: "Aggregation", description: "Группирует данные в один JSON-массив.", example: "GROUP BY Category" },
        { name: "Example 1", description: "Массив имен сотрудников.", example: "SELECT Dept, JSON_ARRAYAGG(Name) FROM Employees GROUP BY Dept;" },
        { name: "Example 2", description: "Массив с сортировкой.", example: "SELECT JSON_ARRAYAGG(Price ORDER BY Price DESC) FROM Products;" },
        { name: "Example 3", description: "Массив объектов.", example: "SELECT JSON_ARRAYAGG(JSON_OBJECT('id': ID, 'name': Name)) FROM Users;" }
      ]
    },
    {
      id: "tsql_logical_and",
      name: "AND",
      category: "Логические операторы",
      description: "Возвращает TRUE, если оба выражения истинны.",
      syntax: "expression1 AND expression2",
      example: "SELECT * FROM Users WHERE Age > 18 AND Status = 'Active';",
      arguments: [
        { name: "Example 1", description: "Фильтрация по диапазону и статусу.", example: "WHERE Price > 100 AND Category = 'Tech'" },
        { name: "Example 2", description: "Множественные условия.", example: "WHERE A = 1 AND B = 2 AND C = 3" },
        { name: "Example 3", description: "Использование в CASE.", example: "CASE WHEN Age > 18 AND Age < 65 THEN 'Adult' END" }
      ]
    },
    {
      id: "tsql_logical_or",
      name: "OR",
      category: "Логические операторы",
      description: "Возвращает TRUE, если хотя бы одно из выражений истинно.",
      syntax: "expression1 OR expression2",
      example: "SELECT * FROM Users WHERE Role = 'Admin' OR Role = 'Editor';",
      arguments: [
        { name: "Example 1", description: "Выбор из нескольких вариантов.", example: "WHERE City = 'Moscow' OR City = 'London'" },
        { name: "Example 2", description: "Комбинирование с AND (используйте скобки).", example: "WHERE (A = 1 OR B = 1) AND C = 1" },
        { name: "Example 3", description: "Проверка нескольких флагов.", example: "WHERE IsAdmin = 1 OR IsSuperUser = 1" }
      ]
    },
    {
      id: "tsql_logical_not",
      name: "NOT",
      category: "Логические операторы",
      description: "Инвертирует логическое значение выражения.",
      syntax: "NOT expression",
      example: "SELECT * FROM Users WHERE NOT Status = 'Banned';",
      arguments: [
        { name: "Example 1", description: "Отрицание равенства.", example: "WHERE NOT Age < 18" },
        { name: "Example 2", description: "Использование с LIKE.", example: "WHERE Name NOT LIKE 'A%'" },
        { name: "Example 3", description: "Использование с IN.", example: "WHERE ID NOT IN (1, 2, 3)" }
      ]
    },
    {
      id: "tsql_comparison_eq",
      name: "=",
      category: "Операторы сравнения",
      description: "Проверяет равенство двух выражений.",
      syntax: "expression1 = expression2",
      example: "WHERE ID = 101;",
      arguments: [
        { name: "Example 1", description: "Сравнение строк.", example: "WHERE Email = 'user@test.com'" },
        { name: "Example 2", description: "Сравнение колонок.", example: "WHERE Salary = TargetSalary" },
        { name: "Example 3", description: "Использование в JOIN.", example: "ON t1.ID = t2.RefID" }
      ]
    },
    {
      id: "tsql_comparison_neq",
      name: "!= | <>",
      category: "Операторы сравнения",
      description: "Проверяет неравенство двух выражений.",
      syntax: "expression1 != expression2 | expression1 <> expression2",
      example: "WHERE Status != 'Deleted';",
      arguments: [
        { name: "Example 1", description: "Исключение значения.", example: "WHERE Category <> 'Draft'" },
        { name: "Example 2", description: "Сравнение чисел.", example: "WHERE Count != 0" },
        { name: "Example 3", description: "Стандарт ANSI (<>).", example: "WHERE Role <> 'Guest'" }
      ]
    },
    {
      id: "tsql_comparison_lt",
      name: "<",
      category: "Операторы сравнения",
      description: "Меньше чем.",
      syntax: "expression1 < expression2",
      example: "WHERE Price < 50.0;",
      arguments: [
        { name: "Example 1", description: "Фильтр по дате.", example: "WHERE CreatedAt < '2024-01-01'" },
        { name: "Example 2", description: "Сравнение версий.", example: "WHERE Version < 2.0" },
        { name: "Example 3", description: "Сравнение с результатом подзапроса.", example: "WHERE Val < (SELECT AVG(Val) FROM T)" }
      ]
    },
    {
      id: "tsql_comparison_lte",
      name: "<=",
      category: "Операторы сравнения",
      description: "Меньше или равно.",
      syntax: "expression1 <= expression2",
      example: "WHERE Age <= 18;",
      arguments: [
        { name: "Example 1", description: "Верхняя граница включительно.", example: "WHERE Score <= 100" },
        { name: "Example 2", description: "Срок годности.", example: "WHERE ExpiryDate <= GETDATE()" },
        { name: "Example 3", description: "Лимит запасов.", example: "WHERE Stock <= MinThreshold" }
      ]
    },
    {
      id: "tsql_comparison_gt",
      name: ">",
      category: "Операторы сравнения",
      description: "Больше чем.",
      syntax: "expression1 > expression2",
      example: "WHERE Salary > 100000;",
      arguments: [
        { name: "Example 1", description: "Актуальные записи.", example: "WHERE UpdateCount > 0" },
        { name: "Example 2", description: "Поиск по рейтингу.", example: "WHERE Rating > 4.5" },
        { name: "Example 3", description: "Фильтр по размеру.", example: "WHERE SizeBytes > 1024" }
      ]
    },
    {
      id: "tsql_comparison_gte",
      name: ">=",
      category: "Операторы сравнения",
      description: "Больше или равно.",
      syntax: "expression1 >= expression2",
      example: "WHERE Experience >= 5;",
      arguments: [
        { name: "Example 1", description: "Минимальный порог.", example: "WHERE Amount >= 10.0" },
        { name: "Example 2", description: "Начиная с даты.", example: "WHERE StartDate >= '2023-06-01'" },
        { name: "Example 3", description: "Проверка совершеннолетия.", example: "WHERE Age >= 18" }
      ]
    },
    {
      id: "tsql_is_null",
      name: "IS NULL",
      category: "Операторы сравнения",
      description: "Проверяет значение на равенство NULL.",
      syntax: "expression IS NULL",
      example: "WHERE DeletedAt IS NULL;",
      arguments: [
        { name: "Example 1", description: "Поиск записей без телефона.", example: "WHERE Phone IS NULL" },
        { name: "Example 2", description: "Проверка внешней связи.", example: "WHERE ParentID IS NULL" },
        { name: "Example 3", description: "Незавершенные задачи.", example: "WHERE FinishedAt IS NULL" }
      ]
    },
    {
      id: "tsql_is_not_null",
      name: "IS NOT NULL",
      category: "Операторы сравнения",
      description: "Проверяет, что значение НЕ является NULL.",
      syntax: "expression IS NOT NULL",
      example: "WHERE Email IS NOT NULL;",
      arguments: [
        { name: "Example 1", description: "Обязательные поля.", example: "WHERE Username IS NOT NULL" },
        { name: "Example 2", description: "Наличие комментария.", example: "WHERE Comment IS NOT NULL" },
        { name: "Example 3", description: "Заполненные профили.", example: "WHERE AvatarURL IS NOT NULL" }
      ]
    },
    {
      id: "tsql_in",
      name: "IN",
      category: "Логические операторы",
      description: "Проверяет соответствие значения любому значению из списка или подзапроса.",
      syntax: "expression IN (value1, value2 [, ...])",
      example: "WHERE Category IN ('Food', 'Drinks');",
      arguments: [
        { name: "Example 1", description: "Список ID.", example: "WHERE ID IN (10, 20, 30)" },
        { name: "Example 2", description: "Результат подзапроса.", example: "WHERE DeptID IN (SELECT ID FROM Departments)" },
        { name: "Example 3", description: "Краткая запись множественного OR.", example: "WHERE Color IN ('Red', 'Blue', 'Green')" }
      ]
    },
    {
      id: "tsql_between",
      name: "BETWEEN",
      category: "Логические операторы",
      description: "Проверяет, попадает ли значение в диапазон (включая границы).",
      syntax: "expression BETWEEN value1 AND value2",
      example: "WHERE Age BETWEEN 18 AND 30;",
      arguments: [
        { name: "Example 1", description: "Диапазон дат.", example: "WHERE OrderDate BETWEEN '2023-01-01' AND '2023-12-31'" },
        { name: "Example 2", description: "Ценовой диапазон.", example: "WHERE Price BETWEEN 10.5 AND 100.0" },
        { name: "Example 3", description: "Алфавитный диапазон.", example: "WHERE Name BETWEEN 'A' AND 'M'" }
      ]
    },
    {
      id: "tsql_like",
      name: "LIKE",
      category: "Логические операторы",
      description: "Поиск по шаблону с использованием подстановочных знаков (% и _).",
      syntax: "expression LIKE pattern [ESCAPE escape_character]",
      example: "WHERE Name LIKE 'A%'; -- начинается на А",
      arguments: [
        { name: "Example 1", description: "Поиск вхождения.", example: "WHERE Email LIKE '%@gmail.com'" },
        { name: "Example 2", description: "Один символ (_).", example: "WHERE Code LIKE 'ID_99'" },
        { name: "Example 3", description: "Использование ESCAPE.", example: "WHERE Discount LIKE '10!%' ESCAPE '!'" }
      ]
    },
    {
      id: "tsql_databasepropertyex",
      name: "DATABASEPROPERTYEX()",
      category: "Метаданные",
      description: "Возвращает текущее значение указанного свойства базы данных.",
      syntax: "DATABASEPROPERTYEX(database_name, property)",
      example: "SELECT DATABASEPROPERTYEX('master', 'Status');",
      arguments: [
        { name: "Collation", description: "Проверка сортировки базы данных.", example: "SELECT DATABASEPROPERTYEX('DB1', 'Collation');" },
        { name: "Example 1", description: "Проверка статуса базы данных.", example: "SELECT DATABASEPROPERTYEX('Sales', 'Status');" },
        { name: "Example 2", description: "Режим восстановления.", example: "SELECT DATABASEPROPERTYEX('HR', 'Recovery');" },
        { name: "Example 3", description: "Проверка версии SQL Server.", example: "SELECT DATABASEPROPERTYEX('model', 'Version');" }
      ]
    },
    {
      id: "tsql_objectproperty",
      name: "OBJECTPROPERTY()",
      category: "Метаданные",
      description: "Возвращает информацию об объектах в текущей базе данных по их ID.",
      syntax: "OBJECTPROPERTY(object_id, property)",
      example: "SELECT OBJECTPROPERTY(OBJECT_ID('Users'), 'IsTable');",
      arguments: [
        { name: "IsView", description: "Проверка, является ли объект представлением.", example: "OBJECTPROPERTY(id, 'IsView')" },
        { name: "Example 1", description: "Проверка, является ли объект таблицей.", example: "SELECT OBJECTPROPERTY(id, 'IsUserTable') FROM sys.objects;" },
        { name: "Example 2", description: "Проверка наличия первичного ключа.", example: "SELECT OBJECTPROPERTY(OBJECT_ID('Orders'), 'TableHasPrimaryKey');" },
        { name: "Example 3", description: "Проверка, является ли объект хранимой процедурой.", example: "SELECT OBJECTPROPERTY(id, 'IsProcedure');" }
      ]
    },
    {
      id: "tsql_columnproperty",
      name: "COLUMNPROPERTY()",
      category: "Метаданные",
      description: "Возвращает информацию о столбце или параметре процедуры.",
      syntax: "COLUMNPROPERTY(object_id, column_name, property)",
      example: "SELECT COLUMNPROPERTY(OBJECT_ID('Users'), 'ID', 'IsIdentity');",
      arguments: [
        { name: "AllowsNull", description: "Проверка, допускает ли столбец NULL.", example: "COLUMNPROPERTY(id, 'Email', 'AllowsNull')" },
        { name: "Example 1", description: "Проверка типа данных столбца.", example: "SELECT COLUMNPROPERTY(id, 'Name', 'Precision');" },
        { name: "Example 2", description: "Проверка, является ли столбец вычисляемым.", example: "SELECT COLUMNPROPERTY(id, 'Total', 'IsComputed');" },
        { name: "Example 3", description: "Максимальная длина столбца.", example: "SELECT COLUMNPROPERTY(id, 'Bio', 'Precision');" }
      ]
    },
    {
      id: "tsql_sql_variant_property",
      name: "SQL_VARIANT_PROPERTY()",
      category: "Метаданные",
      description: "Возвращает информацию о типе данных и другие метаданные значения типа sql_variant.",
      syntax: "SQL_VARIANT_PROPERTY(expression, property)",
      example: "SELECT SQL_VARIANT_PROPERTY(val, 'BaseType');",
      arguments: [
        { name: "BaseType", description: "Возвращает базовый тип данных значения.", example: "SQL_VARIANT_PROPERTY(@v, 'BaseType')" },
        { name: "Example 1", description: "Проверка точности числа.", example: "SELECT SQL_VARIANT_PROPERTY(123.45, 'Precision');" },
        { name: "Example 2", description: "Проверка длины строки.", example: "SELECT SQL_VARIANT_PROPERTY('text', 'MaxLength');" },
        { name: "Example 3", description: "Проверка сортировки (collation).", example: "SELECT SQL_VARIANT_PROPERTY(name, 'Collation');" }
      ]
    },
    {
      id: "tsql_serverproperty",
      name: "SERVERPROPERTY()",
      category: "Метаданные",
      description: "Возвращает информацию о свойствах текущего экземпляра SQL Server.",
      syntax: "SERVERPROPERTY(property_name)",
      example: "SELECT SERVERPROPERTY('MachineName');",
      arguments: [
        { name: "Edition", description: "Версия издания SQL Server (Express, Standard, etc).", example: "SERVERPROPERTY('Edition')" },
        { name: "Example 1", description: "Проверка версии продукта.", example: "SELECT SERVERPROPERTY('ProductVersion');" },
        { name: "Example 2", description: "Уровень обновления (Service Pack).", example: "SELECT SERVERPROPERTY('ProductLevel');" },
        { name: "Example 3", description: "Проверка работы в кластере.", example: "SELECT SERVERPROPERTY('IsClustered');" }
      ]
    },
    {
      id: "tsql_connectionproperty",
      name: "CONNECTIONPROPERTY()",
      category: "Метаданные",
      description: "Возвращает сведения о текущем соединении.",
      syntax: "CONNECTIONPROPERTY(property_name)",
      example: "SELECT CONNECTIONPROPERTY('net_transport');",
      arguments: [
        { name: "Protocol", description: "Используемый сетевой протокол.", example: "CONNECTIONPROPERTY('net_transport')" },
        { name: "Example 1", description: "IP-адрес клиента.", example: "SELECT CONNECTIONPROPERTY('client_net_address');" },
        { name: "Example 2", description: "Локальный порт сервера.", example: "SELECT CONNECTIONPROPERTY('local_net_address');" },
        { name: "Example 3", description: "Тип аутентификации.", example: "SELECT CONNECTIONPROPERTY('auth_scheme');" }
      ]
    },
    {
      id: "tsql_sessionproperty",
      name: "SESSIONPROPERTY()",
      category: "Метаданные",
      description: "Возвращает значения параметров SET сеанса.",
      syntax: "SESSIONPROPERTY(property_name)",
      example: "SELECT SESSIONPROPERTY('ANSI_NULLS');",
      arguments: [
        { name: "ANSI_PADDING", description: "Проверка настройки дополнения пробелами.", example: "SESSIONPROPERTY('ANSI_PADDING')" },
        { name: "Example 1", description: "Проверка QUOTED_IDENTIFIER.", example: "SELECT SESSIONPROPERTY('QUOTED_IDENTIFIER');" },
        { name: "Example 2", description: "Проверка ARITHABORT.", example: "SELECT SESSIONPROPERTY('ARITHABORT');" },
        { name: "Example 3", description: "Проверка CONCAT_NULL_YIELDS_NULL.", example: "SELECT SESSIONPROPERTY('CONCAT_NULL_YIELDS_NULL');" }
      ]
    },
    {
      id: "tsql_sys_dbts",
      name: "@@DBTS",
      category: "Системные функции",
      description: "Возвращает значение текущего типа данных timestamp для текущей базы данных.",
      syntax: "@@DBTS",
      example: "SELECT @@DBTS;",
      arguments: [
        { name: "Example 1", description: "Получение текущего значения версии БД.", example: "SELECT @@DBTS;" },
        { name: "Example 2", description: "Использование в сравнении.", example: "IF @@DBTS > @last_ts PRINT 'Changed';" },
        { name: "Example 3", description: "Сохранение метки времени.", example: "SELECT @ts = @@DBTS;" }
      ]
    },
    {
      id: "tsql_sys_error",
      name: "@@ERROR",
      category: "Системные функции",
      description: "Возвращает номер ошибки для последнего выполненного оператора Transact-SQL.",
      syntax: "@@ERROR",
      example: "IF @@ERROR <> 0 PRINT 'Error occurred';",
      arguments: [
        { name: "Example 1", description: "Простая проверка после INSERT.", example: "INSERT INTO T1 VALUES (1); IF @@ERROR != 0 ROLLBACK;" },
        { name: "Example 2", description: "Сохранение кода ошибки.", example: "SELECT @err = @@ERROR;" },
        { name: "Example 3", description: "Проверка на конкретный код (например, 547 - FK violation).", example: "IF @@ERROR = 547 PRINT 'FK Error';" }
      ]
    },
    {
      id: "tsql_sys_identity",
      name: "@@IDENTITY",
      category: "Системные функции",
      description: "Возвращает последнее вставленное значение идентификатора в любом сеансе и любой области.",
      syntax: "@@IDENTITY",
      example: "SELECT @@IDENTITY;",
      arguments: [
        { name: "Example 1", description: "Получение ID после вставки.", example: "INSERT INTO Users (Name) VALUES ('Bob'); SELECT @@IDENTITY;" },
        { name: "Example 2", description: "Сравнение с SCOPE_IDENTITY.", example: "SELECT @@IDENTITY AS Global, SCOPE_IDENTITY() AS Local;" },
        { name: "Example 3", description: "Использование в триггере.", example: "INSERT INTO Logs (Msg) VALUES ('Inserted ID: ' + CAST(@@IDENTITY AS VARCHAR));" }
      ]
    },
    {
      id: "tsql_sys_rowcount",
      name: "@@ROWCOUNT",
      category: "Системные функции",
      description: "Возвращает число строк, затронутых последним оператором.",
      syntax: "@@ROWCOUNT",
      example: "UPDATE Users SET Active = 1; SELECT @@ROWCOUNT;",
      arguments: [
        { name: "Example 1", description: "Проверка, было ли что-то удалено.", example: "DELETE FROM Logs; IF @@ROWCOUNT = 0 PRINT 'No logs deleted';" },
        { name: "Example 2", description: "Сохранение значения для отчета.", example: "SELECT @count = @@ROWCOUNT;" },
        { name: "Example 3", description: "Использование после SELECT.", example: "SELECT * FROM Products; PRINT 'Found ' + CAST(@@ROWCOUNT AS VARCHAR) + ' items';" }
      ]
    },
    {
      id: "tsql_sys_trancount",
      name: "@@TRANCOUNT",
      category: "Системные функции",
      description: "Возвращает число активных транзакций в текущем соединении.",
      syntax: "@@TRANCOUNT",
      example: "IF @@TRANCOUNT > 0 COMMIT;",
      arguments: [
        { name: "Example 1", description: "Проверка перед началом новой транзакции.", example: "IF @@TRANCOUNT = 0 BEGIN TRANSACTION;" },
        { name: "Example 2", description: "Откат всех вложенных транзакций.", example: "WHILE @@TRANCOUNT > 0 ROLLBACK TRANSACTION;" },
        { name: "Example 3", description: "Информационный запрос.", example: "SELECT @@TRANCOUNT AS ActiveTransactions;" }
      ]
    },
    {
      id: "tsql_sys_version",
      name: "@@VERSION",
      category: "Системные функции",
      description: "Возвращает информацию о версии, архитектуре процессора, дате сборки и операционной системе для текущего экземпляра SQL Server.",
      syntax: "@@VERSION",
      example: "SELECT @@VERSION;",
      arguments: [
        { name: "Example 1", description: "Получение полной строки версии.", example: "SELECT @@VERSION;" },
        { name: "Example 2", description: "Проверка на наличие 'Azure'.", example: "IF @@VERSION LIKE '%Azure%' PRINT 'Cloud';" },
        { name: "Example 3", description: "Логирование версии системы.", example: "INSERT INTO SysInfo (Ver) VALUES (@@VERSION);" }
      ]
    },
    {
      id: "tsql_getdate",
      name: "GETDATE()",
      category: "Системные функции",
      description: "Возвращает текущую системную дату и время в формате datetime.",
      syntax: "GETDATE()",
      example: "SELECT GETDATE();",
      arguments: [
        { name: "Example 1", description: "Установка значения по умолчанию.", example: "CREATE TABLE T (Created DATETIME DEFAULT GETDATE());" },
        { name: "Example 2", description: "Вычисление разницы во времени.", example: "SELECT DATEDIFF(hour, LastLogin, GETDATE()) FROM Users;" },
        { name: "Example 3", description: "Фильтрация за сегодня.", example: "WHERE CAST(OrderDate AS DATE) = CAST(GETDATE() AS DATE)" }
      ]
    },
    {
      id: "tsql_scope_identity",
      name: "SCOPE_IDENTITY()",
      category: "Системные функции",
      description: "Возвращает последнее значение идентификатора, вставленное в столбец идентификаторов в той же области (scope).",
      syntax: "SCOPE_IDENTITY()",
      example: "SELECT SCOPE_IDENTITY();",
      arguments: [
        { name: "Example 1", description: "Безопасное получение ID после INSERT.", example: "INSERT INTO Orders DEFAULT VALUES; SELECT SCOPE_IDENTITY();" },
        { name: "Example 2", description: "Использование в хранимой процедуре.", example: "SET @NewID = SCOPE_IDENTITY();" },
        { name: "Example 3", description: "Защита от триггеров (в отличие от @@IDENTITY).", example: "SELECT 'This ID is from my insert only: ' + CAST(SCOPE_IDENTITY() AS VARCHAR);" }
      ]
    },
    {
      id: "tsql_app_name",
      name: "APP_NAME()",
      category: "Системные функции",
      description: "Возвращает имя приложения для текущего сеанса.",
      syntax: "APP_NAME()",
      example: "SELECT APP_NAME();",
      arguments: [
        { name: "Example 1", description: "Определение источника запроса.", example: "IF APP_NAME() = 'Management Studio' PRINT 'Manual query';" },
        { name: "Example 2", description: "Логирование приложения.", example: "INSERT INTO Logs (App) VALUES (APP_NAME());" },
        { name: "Example 3", description: "Проверка в триггере.", example: "IF APP_NAME() NOT LIKE 'MyApp%' THROW 50000, 'Access Denied', 1;" }
      ]
    },
    {
      id: "tsql_db_name",
      name: "DB_NAME()",
      category: "Системные функции",
      description: "Возвращает имя базы данных по ID или текущее имя БД.",
      syntax: "DB_NAME([database_id])",
      example: "SELECT DB_NAME();",
      arguments: [
        { name: "Example 1", description: "Имя текущей базы.", example: "SELECT DB_NAME() AS CurrentDB;" },
        { name: "Example 2", description: "Имя базы по ID.", example: "SELECT DB_NAME(1) AS MasterDBName;" },
        { name: "Example 3", description: "Использование в динамическом SQL.", example: "SET @sql = 'BACKUP DATABASE ' + QUOTENAME(DB_NAME()) + '...';" }
      ]
    },
    {
      id: "tsql_crypto_hashbytes",
      name: "HASHBYTES()",
      category: "Криптографические функции",
      description: "Возвращает хэш входных данных (MD2, MD4, MD5, SHA, SHA1, SHA2_256, SHA2_512).",
      syntax: "HASHBYTES('algorithm', expression)",
      example: "SELECT HASHBYTES('SHA2_256', 'password123');",
      arguments: [
        { name: "Algorithm", description: "SHA2_256 и SHA2_512 рекомендуются для безопасности.", example: "HASHBYTES('SHA2_512', col)" },
        { name: "Example 1", description: "Хэширование строки пароля.", example: "SELECT HASHBYTES('SHA2_256', 'SecretValue');" },
        { name: "Example 2", description: "Сравнение хэшей для проверки изменений.", example: "IF HASHBYTES('MD5', @old) = HASHBYTES('MD5', @new) PRINT 'Same';" },
        { name: "Example 3", description: "Хэширование бинарных данных.", example: "SELECT HASHBYTES('SHA1', 0x123456);" }
      ]
    },
    {
      id: "tsql_crypto_checksum",
      name: "CHECKSUM()",
      category: "Криптографические функции",
      description: "Возвращает контрольную сумму, вычисленную по строке таблицы или по списку выражений.",
      syntax: "CHECKSUM(*) | CHECKSUM(expression [, ...])",
      example: "SELECT CHECKSUM(*);",
      arguments: [
        { name: "Example 1", description: "Контрольная сумма для всей строки.", example: "SELECT CHECURESUM(*) FROM Products;" },
        { name: "Example 2", description: "Контрольная сумма для конкретных колонок.", example: "SELECT CHECKSUM(Name, Price) FROM Products;" },
        { name: "Example 3", description: "Использование для индексации вычисляемых колонок.", example: "CREATE INDEX ix_cs ON T(cs_col);" }
      ]
    },
    {
      id: "tsql_crypto_checksum_agg",
      name: "CHECKSUM_AGG()",
      category: "Криптографические функции",
      description: "Агрегатная функция для вычисления контрольной суммы группы значений.",
      syntax: "CHECKSUM_AGG([ALL | DISTINCT] expression)",
      example: "SELECT CHECKSUM_AGG(BINARY_CHECKSUM(*)) FROM Products;",
      arguments: [
        { name: "Example 1", description: "Обнаружение изменений в таблице.", example: "SELECT CHECKSUM_AGG(CAST(ID AS INT)) FROM Users;" },
        { name: "Example 2", description: "Проверка целостности набора данных.", example: "SELECT CHECKSUM_AGG(Price) FROM Orders;" },
        { name: "Example 3", description: "Сравнение двух таблиц на идентичность.", example: "IF (SELECT CHECKSUM_AGG(Val) FROM T1) = (SELECT CHECKSUM_AGG(Val) FROM T2) PRINT 'Match';" }
      ]
    },
    {
      id: "tsql_seq_next_value",
      name: "NEXT VALUE FOR",
      category: "Последовательности",
      description: "Генерирует номер последовательности из указанного объекта последовательности.",
      syntax: "NEXT VALUE FOR [schema_name].sequence_name",
      example: "SELECT NEXT VALUE FOR MySequence;",
      arguments: [
        { name: "Example 1", description: "Использование при вставке.", example: "INSERT INTO T(ID) VALUES (NEXT VALUE FOR OrderSeq);" },
        { name: "Example 2", description: "Получение значения в переменную.", example: "DECLARE @id INT = NEXT VALUE FOR CustomerSeq;" },
        { name: "Example 3", description: "Генерация диапазона значений.", example: "SELECT NEXT VALUE FOR Seq, Name FROM Users;" }
      ]
    },
    {
      id: "tsql_search_contains",
      name: "CONTAINS()",
      category: "Полнотекстовый поиск",
      description: "Ищет точные или нечеткие совпадения слов и фраз.",
      syntax: "CONTAINS(column, 'search_condition')",
      example: "WHERE CONTAINS(Bio, 'SQL AND Database');",
      arguments: [
        { name: "Example 1", description: "Поиск фразы.", example: "WHERE CONTAINS(Comments, '\"excellent service\"');" },
        { name: "Example 2", description: "Использование логических операторов.", example: "WHERE CONTAINS(Description, 'Computer OR Laptop');" },
        { name: "Example 3", description: "Поиск по префиксу.", example: "WHERE CONTAINS(Name, '\"prog*\"'); -- matches program, programmer" }
      ]
    },
    {
      id: "tsql_search_containstable",
      name: "CONTAINSTABLE()",
      category: "Полнотекстовый поиск",
      description: "Возвращает таблицу из нуля, одной или нескольких строк для столбцов, содержащих точные или нечеткие совпадения с отдельными словами и фразами. Включает столбец ранжирования (RANK).",
      syntax: "CONTAINSTABLE(table, column, 'search_condition' [, top_n_by_rank])",
      example: "SELECT * FROM CONTAINSTABLE(Products, Name, '\"Smart*\"');",
      arguments: [
        { name: "RANK", description: "Возвращает релевантность каждой строки.", example: "SELECT KEY, RANK FROM CONTAINSTABLE(...)" },
        { name: "Example 1", description: "Поиск с ранжированием результатов.", example: "SELECT p.Name, ct.RANK FROM Products p JOIN CONTAINSTABLE(Products, Description, 'SQL') ct ON p.ID = ct.[KEY] ORDER BY ct.RANK DESC;" },
        { name: "Example 2", description: "Ограничение количества результатов (Top N).", example: "SELECT * FROM CONTAINSTABLE(Articles, Body, 'Database', 10);" },
        { name: "Example 3", description: "Сложные условия поиска.", example: "SELECT * FROM CONTAINSTABLE(Docs, *, '\"Web\" NEAR \"Design\"');" }
      ]
    },
    {
      id: "tsql_search_freetext",
      name: "FREETEXT()",
      category: "Полнотекстовый поиск",
      description: "Ищет значения, соответствующие смыслу, а не только точному совпадению слов.",
      syntax: "FREETEXT(column, 'freetext_string')",
      example: "WHERE FREETEXT(Articles, 'how to learn SQL');",
      arguments: [
        { name: "Example 1", description: "Естественный язык в запросе.", example: "WHERE FREETEXT(Bio, 'looking for experienced developers');" },
        { name: "Example 2", description: "Поиск по описанию товара.", example: "WHERE FREETEXT(ProductDesc, 'red running shoes');" },
        { name: "Example 3", description: "Использование с несколькими колонками.", example: "WHERE FREETEXT((Title, Body), 'technical support');" }
      ]
    },
    {
      id: "tsql_search_freetexttable",
      name: "FREETEXTTABLE()",
      category: "Полнотекстовый поиск",
      description: "Возвращает таблицу из нуля, одной или нескольких строк для столбцов, содержащих значения, которые соответствуют смыслу, а не только точному совпадению слов. Включает столбец ранжирования (RANK).",
      syntax: "FREETEXTTABLE(table, column, 'freetext_string' [, language_term] [, top_n_by_rank])",
      example: "SELECT * FROM FREETEXTTABLE(Products, Description, 'comfortable shoes');",
      arguments: [
        { name: "KEY", description: "Возвращает первичный ключ найденной строки.", example: "SELECT [KEY] FROM FREETEXTTABLE(...)" },
        { name: "Example 1", description: "Смысловой поиск с сортировкой по весу.", example: "SELECT a.Title, ft.RANK FROM Articles a JOIN FREETEXTTABLE(Articles, Content, 'optimizing database performance') ft ON a.ID = ft.[KEY] ORDER BY ft.RANK DESC;" },
        { name: "Example 2", description: "Поиск с указанием языка.", example: "SELECT * FROM FREETEXTTABLE(News, Body, 'погода в Москве', LANGUAGE 1049);" },
        { name: "Example 3", description: "Топ-5 наиболее релевантных статей.", example: "SELECT * FROM FREETEXTTABLE(Blog, Text, 'AI future', 5);" }
      ]
    },
    {
      id: "tsql_error_line",
      name: "ERROR_LINE()",
      category: "Обработка ошибок",
      description: "Возвращает номер строки, на которой возникла ошибка.",
      syntax: "ERROR_LINE()",
      example: "SELECT ERROR_LINE();",
      arguments: [
        { name: "Example 1", description: "Использование в блоке CATCH.", example: "BEGIN CATCH SELECT ERROR_LINE() AS ErrorLine; END CATCH" },
        { name: "Example 2", description: "Логирование места ошибки.", example: "INSERT INTO ErrorLog (Line) VALUES (ERROR_LINE());" },
        { name: "Example 3", description: "Формирование отчета об ошибке.", example: "PRINT 'Error on line: ' + CAST(ERROR_LINE() AS VARCHAR);" }
      ]
    },
    {
      id: "tsql_error_message",
      name: "ERROR_MESSAGE()",
      category: "Обработка ошибок",
      description: "Возвращает текст сообщения об ошибке.",
      syntax: "ERROR_MESSAGE()",
      example: "SELECT ERROR_MESSAGE();",
      arguments: [
        { name: "Example 1", description: "Вывод текста ошибки пользователю.", example: "BEGIN CATCH SELECT ERROR_MESSAGE() AS Msg; END CATCH" },
        { name: "Example 2", description: "Сохранение сообщения в таблицу логов.", example: "INSERT INTO Logs (Message) VALUES (ERROR_MESSAGE());" },
        { name: "Example 3", description: "Комбинирование с другими данными.", example: "PRINT 'Error: ' + ERROR_MESSAGE();" }
      ]
    },
    {
      id: "tsql_error_number",
      name: "ERROR_NUMBER()",
      category: "Обработка ошибок",
      description: "Возвращает номер ошибки.",
      syntax: "ERROR_NUMBER()",
      example: "SELECT ERROR_NUMBER();",
      arguments: [
        { name: "Example 1", description: "Проверка конкретного кода ошибки.", example: "IF ERROR_NUMBER() = 2627 PRINT 'PK Violation';" },
        { name: "Example 2", description: "Условная логика в CATCH.", example: "CASE WHEN ERROR_NUMBER() = 547 THEN 'FK Error' END" },
        { name: "Example 3", description: "Идентификация типа сбоя.", example: "SELECT ERROR_NUMBER() AS Code;" }
      ]
    },
    {
      id: "tsql_error_procedure",
      name: "ERROR_PROCEDURE()",
      category: "Обработка ошибок",
      description: "Возвращает имя хранимой процедуры или триггера, в котором произошла ошибка.",
      syntax: "ERROR_PROCEDURE()",
      example: "SELECT ERROR_PROCEDURE();",
      arguments: [
        { name: "Example 1", description: "Определение проблемной процедуры.", example: "SELECT ISNULL(ERROR_PROCEDURE(), 'Ad-hoc batch');" },
        { name: "Example 2", description: "Логирование источника сбоя.", example: "INSERT INTO ErrorLog (ProcName) VALUES (ERROR_PROCEDURE());" },
        { name: "Example 3", description: "Использование в уведомлениях.", example: "PRINT 'Error in: ' + ERROR_PROCEDURE();" }
      ]
    },
    {
      id: "tsql_error_severity",
      name: "ERROR_SEVERITY()",
      category: "Обработка ошибок",
      description: "Возвращает степень серьезности ошибки.",
      syntax: "ERROR_SEVERITY()",
      example: "SELECT ERROR_SEVERITY();",
      arguments: [
        { name: "Example 1", description: "Проверка критичности ошибки.", example: "IF ERROR_SEVERITY() > 16 PRINT 'Critical Error';" },
        { name: "Example 2", description: "Фильтрация логов по степени важности.", example: "WHERE ERROR_SEVERITY() BETWEEN 11 AND 16" },
        { name: "Example 3", description: "Отправка уведомлений при высоком уровне.", example: "IF ERROR_SEVERITY() >= 20 EXEC sp_send_dbmail..." }
      ]
    },
    {
      id: "tsql_error_state",
      name: "ERROR_STATE()",
      category: "Обработка ошибок",
      description: "Возвращает номер состояния ошибки.",
      syntax: "ERROR_STATE()",
      example: "SELECT ERROR_STATE();",
      arguments: [
        { name: "Example 1", description: "Получение кода состояния.", example: "SELECT ERROR_STATE() AS StateCode;" },
        { name: "Example 2", description: "Различение однотипных ошибок.", example: "PRINT 'State: ' + CAST(ERROR_STATE() AS VARCHAR);" },
        { name: "Example 3", description: "Логирование для службы поддержки.", example: "INSERT INTO DebugInfo (State) VALUES (ERROR_STATE());" }
      ]
    },
    {
      id: "tsql_formatmessage",
      name: "FORMATMESSAGE()",
      category: "Обработка ошибок",
      description: "Формирует сообщение из существующего сообщения в sys.messages или из предоставленной строки.",
      syntax: "FORMATMESSAGE(message_string [, argument [, ...]])",
      example: "SELECT FORMATMESSAGE('Error %d in %s', 10, 'App');",
      arguments: [
        { name: "Example 1", description: "Форматирование текста с параметрами.", example: "SELECT FORMATMESSAGE('User %s not found', @name);" },
        { name: "Example 2", description: "Использование системного сообщения.", example: "SELECT FORMATMESSAGE(50001, 'Param1');" },
        { name: "Example 3", description: "Генерация текста для RAISEERROR.", example: "SET @msg = FORMATMESSAGE('ID %d is invalid', @id);" }
      ]
    },
    {
      id: "tsql_case",
      name: "CASE",
      category: "Условные выражения",
      description: "Вычисляет список условий и возвращает одно из нескольких возможных выражений результата.",
      syntax: "CASE [expression]\n  WHEN value1 THEN result1\n  WHEN value2 THEN result2\n  [ELSE default_result]\nEND",
      example: "SELECT name, \nCASE \n  WHEN salary > 5000 THEN 'High' \n  ELSE 'Normal' \nEND as SalaryLevel \nFROM employees;",
      arguments: [
        { name: "Simple CASE", description: "Сравнивает выражение с набором простых выражений для определения результата.", example: "CASE dept_id WHEN 1 THEN 'IT' WHEN 2 THEN 'HR' END" },
        { name: "Searched CASE", description: "Вычисляет набор логических выражений для определения результата.", example: "CASE WHEN score >= 90 THEN 'A' WHEN score >= 80 THEN 'B' END" },
        { name: "ELSE", description: "Значение, возвращаемое если ни одно условие не выполнено. Если ELSE опущен, вернется NULL.", example: "ELSE 'Unknown'" }
      ]
    },
    {
      id: "tsql_iif",
      name: "IIF()",
      category: "Условные выражения",
      description: "Возвращает одно из двух значений в зависимости от того, является ли логическое выражение истинным или ложным в SQL Server.",
      syntax: "IIF(boolean_expression, true_value, false_value)",
      example: "SELECT IIF(stock > 0, 'In Stock', 'Out of Stock');",
      arguments: [
        { name: "boolean_expression", description: "Любое допустимое логическое выражение.", example: "age >= 18" },
        { name: "Shorthand", description: "Является сокращенным способом написания выражения CASE.", example: "IIF(a > b, a, b)" },
        { name: "Nesting", description: "Функции IIF можно вкладывать друг в друга.", example: "IIF(val > 10, 'Big', IIF(val > 5, 'Mid', 'Small'))" }
      ]
    },
    {
      id: "tsql_isnull",
      name: "ISNULL()",
      category: "Обработка NULL",
      description: "Заменяет NULL указанным значением замещения.",
      syntax: "ISNULL(expression, replacement_value)",
      example: "SELECT ISNULL(phone, 'No Phone');",
      arguments: [
        { name: "expression", description: "Выражение, проверяемое на наличие NULL.", example: "middle_name" },
        { name: "replacement_value", description: "Значение, возвращаемое если выражение равно NULL.", example: "''" },
        { name: "Data Consistency", description: "Позволяет избежать пустых значений в отчетах.", example: "SELECT ISNULL(SUM(total), 0)" }
      ]
    },
    {
      id: "tsql_coalesce",
      name: "COALESCE()",
      category: "Обработка NULL",
      description: "Возвращает первое выражение из списка, не равное NULL.",
      syntax: "COALESCE(expression1, expression2 [, expression3 ...])",
      example: "SELECT COALESCE(work_phone, home_phone, mobile_phone, 'N/A');",
      arguments: [
        { name: "Multiple arguments", description: "Принимает неограниченное количество аргументов.", example: "COALESCE(a, b, c, d, e)" },
        { name: "Standard", description: "Является стандартной функцией ANSI SQL (в отличие от ISNULL).", example: "COALESCE(bonus, 0)" },
        { name: "Logic", description: "Проверяет аргументы по порядку слева направо.", example: "COALESCE(NULL, NULL, 5, 10) -- вернет 5" }
      ]
    },
    {
      id: "tsql_nullif",
      name: "NULLIF()",
      category: "Обработка NULL",
      description: "Возвращает NULL, если два указанных выражения эквивалентны.",
      syntax: "NULLIF(expression1, expression2)",
      example: "SELECT NULLIF(current_val, old_val);",
      arguments: [
        { name: "Division by zero", description: "Часто используется для предотвращения деления на ноль.", example: "SELECT total / NULLIF(count, 0)" },
        { name: "Logic", description: "Если выражения не равны, возвращается первое выражение.", example: "NULLIF(10, 20) -- вернет 10" },
        { name: "Cleanup", description: "Позволяет заменить пустые строки или 'магические числа' на NULL.", example: "NULLIF(status, '')" }
      ]
    },
    {
      id: "tsql_choose",
      name: "CHOOSE()",
      category: "Условные выражения",
      description: "Возвращает элемент по указанному индексу из списка значений.",
      syntax: "CHOOSE(index, value1, value2 [, ...])",
      example: "SELECT CHOOSE(2, 'Silver', 'Gold', 'Platinum'); -- 'Gold'",
      arguments: [
        { name: "index", description: "Целое число, представляющее индекс (начинается с 1).", example: "MONTH(GETDATE())" },
        { name: "Example 1", description: "Преобразование номера квартала в название.", example: "SELECT CHOOSE(q_num, 'Q1', 'Q2', 'Q3', 'Q4')" },
        { name: "Example 2", description: "Динамический выбор значения.", example: "SELECT CHOOSE(priority_id, 'Low', 'Medium', 'High')" },
        { name: "Out of range", description: "Если индекс вне диапазона или NULL, возвращается NULL.", example: "CHOOSE(5, 'A', 'B')" }
      ]
    },
    {
      id: "tsql_replace",
      name: "REPLACE()",
      category: "Строковые функции",
      description: "Заменяет все вхождения указанной подстроки на новую подстроку.",
      syntax: "REPLACE(string, old_pattern, new_pattern)",
      example: "SELECT REPLACE('Apple Pie', 'Apple', 'Cherry'); -- 'Cherry Pie'",
      arguments: [
        { name: "Global", description: "Заменяет все вхождения, а не только первое.", example: "REPLACE('1-2-3', '-', '.') -- '1.2.3'" },
        { name: "Cleanup", description: "Используется для удаления символов (замена на пустую строку).", example: "REPLACE(phone, '(', '')" },
        { name: "Type", description: "Чувствительность к регистру зависит от параметров сортировки БД.", example: "REPLACE(text, 'SQL', 'sql')" }
      ]
    },
    {
      id: "tsql_translate",
      name: "TRANSLATE()",
      category: "Строковые функции",
      description: "Заменяет набор символов в строке на другой набор (посимвольно).",
      syntax: "TRANSLATE(string, from_chars, to_chars)",
      example: "SELECT TRANSLATE('2*[3+4]', '[]', '()'); -- '2*(3+4)'",
      arguments: [
        { name: "Mapping", description: "Первый символ из from_chars заменяется на первый из to_chars и т.д.", example: "TRANSLATE('abc', 'abc', '123') -- '123'" },
        { name: "Efficiency", description: "Заменяет несколько вложенных REPLACE.", example: "TRANSLATE(phone, '()-', '   ')" },
        { name: "Mismatch", description: "from_chars и to_chars должны быть одинаковой длины.", example: "ОШИБКА если длины разные" }
      ]
    },
    {
      id: "tsql_reverse",
      name: "REVERSE()",
      category: "Строковые функции",
      description: "Разворачивает строку задом наперед.",
      syntax: "REVERSE(character_expression)",
      example: "SELECT REVERSE('SQL'); -- 'LQS'",
      arguments: [
        { name: "Logic", description: "Полезно для поиска расширений файлов или работы с путями.", example: "REVERSE(file_path)" },
        { name: "Palindrome", description: "Проверка, является ли слово палиндромом.", example: "WHERE word = REVERSE(word)" },
        { name: "Strings", description: "Работает с любыми строковыми типами.", example: "REVERSE(N'Привет')" }
      ]
    },
    {
      id: "tsql_concat",
      name: "CONCAT()",
      category: "Строковые функции",
      description: "Объединяет несколько строк в одну. Автоматически обрабатывает NULL (как пустые строки).",
      syntax: "CONCAT(string1, string2 [, ...])",
      example: "SELECT CONCAT('Hello', ' ', 'World'); -- 'Hello World'",
      arguments: [
        { name: "NULL Handling", description: "В отличие от +, не превращает результат в NULL, если один операнд NULL.", example: "CONCAT('User: ', NULL) -- 'User: '" },
        { name: "Variable Args", description: "Принимает от 2 до 254 аргументов.", example: "CONCAT(a, b, c, d)" },
        { name: "Implicit Cast", description: "Приводит числа к строкам автоматически.", example: "CONCAT('ID: ', 101)" }
      ]
    },
    {
      id: "tsql_concat_ws",
      name: "CONCAT_WS()",
      category: "Строковые функции",
      description: "Объединяет строки с указанным разделителем. Пропускает NULL значения.",
      syntax: "CONCAT_WS(separator, string1, string2 [, ...])",
      example: "SELECT CONCAT_WS(', ', 'Apples', 'Oranges', 'Bananas'); -- 'Apples, Oranges, Bananas'",
      arguments: [
        { name: "separator", description: "Первый аргумент — разделитель.", example: "CONCAT_WS('-', '2024', '01', '01')" },
        { name: "NULL values", description: "NULL просто игнорируются, разделитель для них не ставится.", example: "CONCAT_WS('/', 'a', NULL, 'b') -- 'a/b'" },
        { name: "CSV", description: "Идеально для формирования CSV-строк или адресов.", example: "CONCAT_WS(' ', city, street, house)" }
      ]
    },
    {
      id: "tsql_left",
      name: "LEFT()",
      category: "Строковые функции",
      description: "Возвращает указанное количество символов с начала строки.",
      syntax: "LEFT(character_expression, count)",
      example: "SELECT LEFT('SQL Server', 3); -- 'SQL'",
      arguments: [
        { name: "count", description: "Число символов слева.", example: "LEFT(product_code, 2)" },
        { name: "Dynamic", description: "Может использоваться с результатами функций поиска.", example: "LEFT(email, CHARINDEX('@', email)-1)" },
        { name: "Safety", description: "Если count больше длины строки, возвращается вся строка.", example: "LEFT('abc', 10) -- 'abc'" }
      ]
    },
    {
      id: "tsql_right",
      name: "RIGHT()",
      category: "Строковые функции",
      description: "Возвращает указанное количество символов с конца строки.",
      syntax: "RIGHT(character_expression, count)",
      example: "SELECT RIGHT('SQL Server', 6); -- 'Server'",
      arguments: [
        { name: "count", description: "Число символов справа.", example: "RIGHT(file_path, 3) -- расширение" },
        { name: "Validation", description: "Проверка последних цифр номера или карты.", example: "RIGHT(card_number, 4)" },
        { name: "Index", description: "Часто применяется для извлечения суффиксов.", example: "RIGHT(full_name, 5)" }
      ]
    },
    {
      id: "tsql_space",
      name: "SPACE()",
      category: "Строковые функции",
      description: "Возвращает строку, состоящую из указанного количества пробелов.",
      syntax: "SPACE(count)",
      example: "SELECT 'Hello' + SPACE(5) + 'World';",
      arguments: [
        { name: "count", description: "Количество пробелов.", example: "SPACE(10)" },
        { name: "Padding", description: "Используется для ручного выравнивания в отчетах.", example: "SELECT name + SPACE(20 - LEN(name))" },
        { name: "Limit", description: "Максимальный размер ограничен типами varchar/nvarchar.", example: "SPACE(8000)" }
      ]
    },
    {
      id: "tsql_stuff",
      name: "STUFF()",
      category: "Строковые функции",
      description: "Удаляет часть строки и вставляет на ее место новую подстроку.",
      syntax: "STUFF(expression, start, length, new_string)",
      example: "SELECT STUFF('ABCDEFG', 2, 3, '123'); -- 'A123EFG'",
      arguments: [
        { name: "start", description: "Позиция начала изменений.", example: "STUFF(phone, 1, 0, '+')" },
        { name: "length", description: "Сколько символов удалить (0 - только вставка).", example: "STUFF(code, 4, 1, '-')" },
        { name: "XML", description: "Часто используется для удаления первого разделителя при агрегации в XML.", example: "STUFF((SELECT ...), 1, 1, '')" }
      ]
    },
    {
      id: "tsql_char",
      name: "CHAR()",
      category: "Строковые функции",
      description: "Преобразует код ASCII (0-255) в символ.",
      syntax: "CHAR(integer_expression)",
      example: "SELECT CHAR(65); -- 'A'",
      arguments: [
        { name: "Line Break", description: "Вставка переноса строки.", example: "CHAR(13) + CHAR(10) -- CRLF" },
        { name: "Tab", description: "Вставка символа табуляции.", example: "CHAR(9)" },
        { name: "Non-printable", description: "Позволяет использовать непечатные символы.", example: "CHAR(7) -- звуковой сигнал" }
      ]
    },
    {
      id: "tsql_ascii",
      name: "ASCII()",
      category: "Строковые функции",
      description: "Возвращает ASCII-код первого символа строки.",
      syntax: "ASCII(character_expression)",
      example: "SELECT ASCII('A'); -- 65",
      arguments: [
        { name: "First only", description: "Если в строке несколько символов, берется только первый.", example: "ASCII('ABC') -- 65" },
        { name: "Range", description: "Возвращает значения от 0 до 255.", example: "ASCII('z')" },
        { name: "Check", description: "Полезно для проверки типа символа (цифра, буква).", example: "WHERE ASCII(char) BETWEEN 48 AND 57" }
      ]
    },
    {
      id: "tsql_unicode",
      name: "UNICODE()",
      category: "Строковые функции",
      description: "Возвращает целочисленное значение Unicode для первого символа строки.",
      syntax: "UNICODE(character_expression)",
      example: "SELECT UNICODE(N'П'); -- 1055",
      arguments: [
        { name: "Multi-byte", description: "В отличие от ASCII, поддерживает национальные символы.", example: "UNICODE(N'Ω')" },
        { name: "N prefix", description: "Рекомендуется использовать с префиксом N для строк.", example: "UNICODE(N'string')" },
        { name: "Standard", description: "Возвращает значение по стандарту UCS-2.", example: "UNICODE(char)" }
      ]
    },
    {
      id: "tsql_nchar",
      name: "NCHAR()",
      category: "Строковые функции",
      description: "Возвращает Unicode-символ по его коду.",
      syntax: "NCHAR(integer_expression)",
      example: "SELECT NCHAR(1055); -- 'П'",
      arguments: [
        { name: "National", description: "Позволяет вставлять любые символы Unicode.", example: "NCHAR(8482) -- ™" },
        { name: "Range", description: "Поддерживает значения от 0 до 65535.", example: "NCHAR(9731) -- снеговик" },
        { name: "Reports", description: "Удобно для добавления спецсимволов в отчеты.", example: "NCHAR(10003) -- галочка" }
      ]
    },
    {
      id: "tsql_format",
      name: "FORMAT()",
      category: "Строковые функции",
      description: "Форматирует значение (дату или число) с использованием указанного шаблона и региональных настроек.",
      syntax: "FORMAT(value, format_string [, culture])",
      example: "SELECT FORMAT(GETDATE(), 'dd/MM/yyyy'); -- '03/01/2026'",
      arguments: [
        { name: "Currency", description: "Форматирование денежных сумм.", example: "FORMAT(123.45, 'C', 'ru-RU')" },
        { name: "Percent", description: "Вывод процентов.", example: "FORMAT(0.75, 'P')" },
        { name: "Performance", description: "Работает медленнее чем CONVERT, использовать осторожно в больших запросах.", example: "FORMAT(val, 'N2')" }
      ]
    },
    {
      id: "tsql_soundex",
      name: "SOUNDEX()",
      category: "Строковые функции",
      description: "Возвращает четырехсимвольный код, основанный на звучании строки (на английском языке).",
      syntax: "SOUNDEX(character_expression)",
      example: "SELECT SOUNDEX('Smith'), SOUNDEX('Smyth'); -- 'S530', 'S530'",
      arguments: [
        { name: "Phonetic", description: "Позволяет искать похожие по звучанию фамилии.", example: "WHERE SOUNDEX(name) = SOUNDEX('Johnson')" },
        { name: "Limits", description: "Работает эффективно в основном для английской фонетики.", example: "SOUNDEX('Example')" },
        { name: "Fixed", description: "Всегда возвращает 4 символа (буква + 3 цифры).", example: "SOUNDEX('A')" }
      ]
    },
    {
      id: "tsql_difference",
      name: "DIFFERENCE()",
      category: "Строковые функции",
      description: "Сравнивает коды SOUNDEX двух строк и возвращает степень их сходства (от 0 до 4).",
      syntax: "DIFFERENCE(expr1, expr2)",
      example: "SELECT DIFFERENCE('Smith', 'Smyth'); -- 4 (полное совпадение)",
      arguments: [
        { name: "Scale", description: "4 — очень похожи, 0 — совсем разные.", example: "DIFFERENCE('Apple', 'Orange') -- 1" },
        { name: "Search", description: "Используется для нечеткого поиска людей.", example: "WHERE DIFFERENCE(name, @input) >= 3" },
        { name: "Fuzzy", description: "Хорошо работает для имен с опечатками.", example: "DIFFERENCE('Petrov', 'Pietrov')" }
      ]
    },
    {
      id: "tsql_upper",
      name: "UPPER()",
      category: "Строковые функции",
      description: "Преобразует все символы строки в верхний регистр.",
      syntax: "UPPER(character_expression)",
      example: "SELECT UPPER('sql server'); -- 'SQL SERVER'",
      arguments: [
        { name: "expression", description: "Строковое выражение для преобразования.", example: "UPPER(name)" },
        { name: "Formatting", description: "Часто используется для нормализации данных перед сравнением.", example: "WHERE UPPER(email) = 'ADMIN@EXAMPLE.COM'" },
        { name: "Mixed", description: "Влияет только на буквы, цифры и знаки остаются без изменений.", example: "UPPER('Route 66') -- 'ROUTE 66'" }
      ]
    },
    {
      id: "tsql_lower",
      name: "LOWER()",
      category: "Строковые функции",
      description: "Преобразует все символы строки в нижний регистр.",
      syntax: "LOWER(character_expression)",
      example: "SELECT LOWER('SQL Server'); -- 'sql server'",
      arguments: [
        { name: "expression", description: "Строковое выражение.", example: "LOWER(UserName)" },
        { name: "Email", description: "Идеально для приведения почтовых адресов к единому виду.", example: "SELECT LOWER(email) FROM users" },
        { name: "Search", description: "Облегчает поиск без учета регистра.", example: "WHERE LOWER(city) = 'london'" }
      ]
    },
    {
      id: "tsql_ltrim",
      name: "LTRIM()",
      category: "Строковые функции",
      description: "Удаляет пробелы или другие символы (в новых версиях) слева.",
      syntax: "LTRIM(character_expression [, characters])",
      example: "SELECT LTRIM('   Hello'); -- 'Hello'",
      arguments: [
        { name: "expression", description: "Строка, которую нужно очистить.", example: "LTRIM(address)" },
        { name: "Characters", description: "Список символов для удаления (SQL Server 2022+).", example: "LTRIM('xxxHello', 'x') -- 'Hello'" },
        { name: "Data Cleaning", description: "Помогает убрать лишние отступы при импорте данных.", example: "SELECT LTRIM(raw_text)" }
      ]
    },
    {
      id: "tsql_rtrim",
      name: "RTRIM()",
      category: "Строковые функции",
      description: "Удаляет пробелы или указанные символы справа.",
      syntax: "RTRIM(character_expression [, characters])",
      example: "SELECT RTRIM('Hello   '); -- 'Hello'",
      arguments: [
        { name: "expression", description: "Исходная строка.", example: "RTRIM(note)" },
        { name: "Characters", description: "Символы для удаления (2022+).", example: "RTRIM('Hello...', '.')" },
        { name: "Fixed Length", description: "Полезно для удаления пробелов из полей CHAR.", example: "SELECT RTRIM(char_field)" }
      ]
    },
    {
      id: "tsql_trim",
      name: "TRIM()",
      category: "Строковые функции",
      description: "Удаляет пробелы или указанные символы с обоих концов строки.",
      syntax: "TRIM([characters FROM] character_expression)",
      example: "SELECT TRIM('  Hello  '); -- 'Hello'",
      arguments: [
        { name: "characters", description: "Набор символов для удаления.", example: "TRIM('.,' FROM '...Hello,,,') -- 'Hello'" },
        { name: "Simplicity", description: "Заменяет связку LTRIM(RTRIM(...)).", example: "SELECT TRIM(comment)" },
        { name: "Specific", description: "Можно удалять целые наборы знаков.", example: "TRIM('# ' FROM '# Title #')" }
      ]
    },
    {
      id: "tsql_substring",
      name: "SUBSTRING()",
      category: "Строковые функции",
      description: "Извлекает часть строки заданной длины, начиная с указанной позиции.",
      syntax: "SUBSTRING(expression, start, length)",
      example: "SELECT SUBSTRING('Microsoft', 1, 5); -- 'Micro'",
      arguments: [
        { name: "start", description: "Начальная позиция (отсчет с 1).", example: "SUBSTRING(phone, 2, 3)" },
        { name: "length", description: "Количество извлекаемых символов.", example: "SUBSTRING(code, 5, 10)" },
        { name: "Over-length", description: "Если длина больше остатка строки, извлекается всё до конца.", example: "SUBSTRING('ABC', 2, 100) -- 'BC'" }
      ]
    },
    {
      id: "tsql_charindex",
      name: "CHARINDEX()",
      category: "Строковые функции",
      description: "Возвращает позицию подстроки внутри строки.",
      syntax: "CHARINDEX(substring, expression [, start_position])",
      example: "SELECT CHARINDEX('@', 'user@email.com'); -- 5",
      arguments: [
        { name: "substring", description: "Что ищем.", example: "CHARINDEX(' ', 'First Last')" },
        { name: "start_position", description: "С какой позиции начать поиск.", example: "CHARINDEX('o', 'Hello World', 6) -- 8" },
        { name: "Not Found", description: "Если совпадений нет, возвращает 0.", example: "CHARINDEX('z', 'apple')" }
      ]
    },
    {
      id: "tsql_patindex",
      name: "PATINDEX()",
      category: "Строковые функции",
      description: "Возвращает позицию первого вхождения шаблона в строке.",
      syntax: "PATINDEX('%pattern%', expression)",
      example: "SELECT PATINDEX('%[0-9]%', 'Order 123'); -- 7",
      arguments: [
        { name: "pattern", description: "Шаблон с использованием масок (% , _ , []).", example: "PATINDEX('%[^a-z]%', 'abc1')" },
        { name: "Wildcards", description: "Обязательно использование % в начале и конце для поиска внутри.", example: "PATINDEX('%admin%', username)" },
        { name: "Discovery", description: "Помогает найти первый нецифровой символ или спецсимвол.", example: "PATINDEX('%[^0-9]%', price_text)" }
      ]
    },
    {
      id: "tsql_len",
      name: "LEN()",
      category: "Строковые функции",
      description: "Возвращает количество символов в строке, исключая завершающие пробелы.",
      syntax: "LEN(character_expression)",
      example: "SELECT LEN('SQL   '); -- 3",
      arguments: [
        { name: "Trailing spaces", description: "Пробелы в конце не считаются.", example: "LEN('A ') -- 1" },
        { name: "Leading spaces", description: "Пробелы в начале учитываются.", example: "LEN(' A') -- 2" },
        { name: "Validation", description: "Часто используется для проверки длины пароля или кода.", example: "WHERE LEN(zip_code) = 5" }
      ]
    },
    {
      id: "tsql_datalength",
      name: "DATALENGTH()",
      category: "Строковые функции",
      description: "Возвращает фактическое количество байт, используемых для представления выражения.",
      syntax: "DATALENGTH(expression)",
      example: "SELECT DATALENGTH(N'SQL'); -- 6 (по 2 байта на символ в Unicode)",
      arguments: [
        { name: "Bites", description: "Учитывает все символы, включая пробелы в конце.", example: "DATALENGTH('A ') -- 2" },
        { name: "Unicode", description: "Для nvarchar значения вдвое больше, чем для varchar.", example: "DATALENGTH(N'test') -- 8" },
        { name: "NULL", description: "Для NULL значений возвращает NULL.", example: "DATALENGTH(NULL)" }
      ]
    },
    {
      id: "tsql_sin",
      name: "SIN()",
      category: "Тригонометрические функции",
      description: "Возвращает тригонометрический синус указанного угла в радианах.",
      syntax: "SIN(numeric_expression)",
      example: "SELECT SIN(PI()/2); -- 1.0",
      arguments: [
        { name: "numeric_expression", description: "Выражение типа float или типов, неявно преобразуемых в float, представляющее угол в радианах.", example: "SIN(0.5)" },
        { name: "Example 1", description: "Синус нуля.", example: "SELECT SIN(0); -- 0.0" },
        { name: "Example 2", description: "Синус угла 30 градусов (преобразованного в радианы).", example: "SELECT SIN(30 * PI() / 180); -- 0.5" }
      ]
    },
    {
      id: "tsql_cos",
      name: "COS()",
      category: "Тригонометрические функции",
      description: "Возвращает тригонометрический косинус указанного угла в радианах.",
      syntax: "COS(numeric_expression)",
      example: "SELECT COS(PI()); -- -1.0",
      arguments: [
        { name: "numeric_expression", description: "Угол в радианах.", example: "COS(0)" },
        { name: "Example 1", description: "Косинус 0 радианов.", example: "SELECT COS(0); -- 1.0" },
        { name: "Example 2", description: "Косинус 60 градусов.", example: "SELECT COS(60 * PI() / 180); -- 0.5" }
      ]
    },
    {
      id: "tsql_tan",
      name: "TAN()",
      category: "Тригонометрические функции",
      description: "Возвращает тангенс входного выражения.",
      syntax: "TAN(numeric_expression)",
      example: "SELECT TAN(PI()/4); -- 1.0",
      arguments: [
        { name: "numeric_expression", description: "Угол в радианах.", example: "TAN(1.0)" },
        { name: "Example 1", description: "Тангенс 0.", example: "SELECT TAN(0); -- 0.0" },
        { name: "Example 2", description: "Тангенс 45 градусов.", example: "SELECT TAN(45 * PI() / 180); -- 1.0" }
      ]
    },
    // ТИПЫ ДАННЫХ
    {
      id: "tsql_nchar",
      name: "NCHAR",
      category: "Типы данных",
      description: "Строковые данные фиксированной длины в кодировке Юникод (UTF-16).",
      syntax: "NCHAR(n)",
      example: "CREATE TABLE t (code NCHAR(5));",
      arguments: [
        { name: "n", description: "Количество символов (от 1 до 4000). Занимает 2 байта на символ.", example: "NCHAR(10)" }
      ]
    },
    {
      id: "tsql_nvarchar",
      name: "NVARCHAR",
      category: "Типы данных",
      description: "Строковые данные переменной длины в кодировке Юникод.",
      syntax: "NVARCHAR(n | max)",
      example: "CREATE TABLE t (name NVARCHAR(100));",
      arguments: [
        { name: "n", description: "Максимальное количество символов.", example: "NVARCHAR(50)" },
        { name: "max", description: "Максимальный объем хранения (2 ГБ).", example: "NVARCHAR(MAX)" }
      ]
    },
    {
      id: "tsql_ntext",
      name: "NTEXT",
      category: "Типы данных",
      description: "Устаревший тип данных для больших строк Юникод. Рекомендуется использовать NVARCHAR(MAX).",
      syntax: "NTEXT",
      example: "CREATE TABLE t (old_content NTEXT);"
    },
    {
      id: "tsql_varchar_max",
      name: "VARCHAR(MAX)",
      category: "Типы данных",
      description: "Строковые данные переменной длины (не Юникод) с неограниченным размером до 2 ГБ.",
      syntax: "VARCHAR(MAX)",
      example: "CREATE TABLE t (content VARCHAR(MAX));"
    },
    {
      id: "tsql_nvarchar_max",
      name: "NVARCHAR(MAX)",
      category: "Типы данных",
      description: "Строковые данные переменной длины в кодировке Юникод с неограниченным размером до 2 ГБ.",
      syntax: "NVARCHAR(MAX)",
      example: "CREATE TABLE t (content NVARCHAR(MAX));"
    },
    {
      id: "tsql_varbinary_max",
      name: "VARBINARY(MAX)",
      category: "Типы данных",
      description: "Двоичные данные переменной длины с максимальным размером до 2 ГБ.",
      syntax: "VARBINARY(MAX)",
      example: "CREATE TABLE t (file_data VARBINARY(MAX));"
    },
    {
      id: "tsql_image",
      name: "IMAGE",
      category: "Типы данных",
      description: "Устаревший тип для хранения двоичных данных. Рекомендуется VARBINARY(MAX).",
      syntax: "IMAGE",
      example: "CREATE TABLE t (legacy_image IMAGE);"
    },
    {
      id: "tsql_tinyint",
      name: "TINYINT",
      category: "Типы данных",
      description: "Целое число от 0 до 255 (1 байт).",
      syntax: "TINYINT",
      example: "CREATE TABLE t (age TINYINT);"
    },
    {
      id: "tsql_smallmoney",
      name: "SMALLMONEY",
      category: "Типы данных",
      description: "Денежные данные от -214,748.3648 до 214,748.3647 (4 байта).",
      syntax: "SMALLMONEY",
      example: "CREATE TABLE t (price SMALLMONEY);"
    },
    {
      id: "tsql_datetime2",
      name: "DATETIME2",
      category: "Типы данных",
      description: "Расширенный тип даты и времени с более высокой точностью и диапазоном.",
      syntax: "DATETIME2(n)",
      example: "CREATE TABLE t (event_time DATETIME2(7));",
      arguments: [
        { name: "n", description: "Точность дробных секунд (0-7).", example: "DATETIME2(3)" }
      ]
    },
    {
      id: "tsql_smalldatetime",
      name: "SMALLDATETIME",
      category: "Типы данных",
      description: "Дата и время с точностью до минуты (диапазон 1900-2079).",
      syntax: "SMALLDATETIME",
      example: "CREATE TABLE t (log_date SMALLDATETIME);"
    },
    {
      id: "tsql_datetimeoffset",
      name: "DATETIMEOFFSET",
      category: "Типы данных",
      description: "Дата и время с учетом часового пояса.",
      syntax: "DATETIMEOFFSET(n)",
      example: "CREATE TABLE t (local_time DATETIMEOFFSET);",
      arguments: [
        { name: "n", description: "Точность дробных секунд.", example: "DATETIMEOFFSET(7)" }
      ]
    },
    {
      id: "tsql_cursor",
      name: "CURSOR",
      category: "Типы данных",
      description: "Специальный тип данных для работы с курсорами в процедурах и скриптах.",
      syntax: "CURSOR",
      example: "DECLARE my_cursor CURSOR FOR SELECT id FROM t;"
    },
    {
      id: "tsql_rowversion",
      name: "ROWVERSION",
      category: "Типы данных",
      description: "Автоматически обновляемое уникальное двоичное число внутри базы (ранее TIMESTAMP).",
      syntax: "ROWVERSION",
      example: "CREATE TABLE t (id int, rv ROWVERSION);"
    },
    {
      id: "tsql_hierarchyid",
      name: "HIERARCHYID",
      category: "Типы данных",
      description: "Тип данных для представления положения в иерархической структуре.",
      syntax: "HIERARCHYID",
      example: "CREATE TABLE org (node HIERARCHYID, name nvarchar(50));"
    },
    {
      id: "tsql_uniqueidentifier",
      name: "UNIQUEIDENTIFIER",
      category: "Типы данных",
      description: "Глобально уникальный идентификатор (GUID).",
      syntax: "UNIQUEIDENTIFIER",
      example: "CREATE TABLE t (guid UNIQUEIDENTIFIER DEFAULT NEWID());"
    },
    {
      id: "tsql_sql_variant",
      name: "SQL_VARIANT",
      category: "Типы данных",
      description: "Тип данных, который может хранить значения различных типов данных SQL Server.",
      syntax: "SQL_VARIANT",
      example: "CREATE TABLE t (val SQL_VARIANT);"
    },
    {
      id: "tsql_table",
      name: "TABLE",
      category: "Типы данных",
      description: "Тип данных для хранения результирующего набора строк (табличная переменная).",
      syntax: "DECLARE @my_table TABLE (id int, name nvarchar(50));",
      example: "DECLARE @tmp TABLE (id int); INSERT INTO @tmp VALUES (1);"
    },
    {
      id: "tsql_geometry",
      name: "GEOMETRY",
      category: "Типы данных",
      description: "Тип данных для работы с плоскими (евклидовыми) пространственными данными.",
      syntax: "GEOMETRY",
      example: "DECLARE @g GEOMETRY = GEOMETRY::STGeomFromText('POINT (1 2)', 0);"
    },
    {
      id: "tsql_geography",
      name: "GEOGRAPHY",
      category: "Типы данных",
      description: "Тип данных для работы с географическими (эллипсоидными) пространственными данными.",
      syntax: "GEOGRAPHY",
      example: "DECLARE @g GEOGRAPHY = GEOGRAPHY::STGeomFromText('LINESTRING(-122 47, -122 48)', 4326);"
    },
    {
      id: "tsql_vector",
      name: "VECTOR (SQL Server 2025+)",
      category: "Типы данных",
      description: "Новый тип данных для хранения векторных эмбеддингов, используемых в ИИ и семантическом поиске.",
      syntax: "VECTOR(n)",
      example: "CREATE TABLE ai_data (embedding VECTOR(1536));",
      arguments: [
        { name: "n", description: "Размерность вектора.", example: "VECTOR(768)" }
      ]
    },
    {
      id: "tsql_asin",
      name: "ASIN()",
      category: "Тригонометрические функции",
      description: "Возвращает угол в радианах, синус которого равен указанному выражению float (арксинус).",
      syntax: "ASIN(numeric_expression)",
      example: "SELECT ASIN(1); -- 1.5707... (PI/2)",
      arguments: [
        { name: "numeric_expression", description: "Выражение от -1 до 1.", example: "ASIN(0.5)" },
        { name: "Example 1", description: "Арксинус 0.", example: "SELECT ASIN(0); -- 0.0" },
        { name: "Example 2", description: "Арксинус -1.", example: "SELECT ASIN(-1); -- -1.5707..." }
      ]
    },
    {
      id: "tsql_acos",
      name: "ACOS()",
      category: "Тригонометрические функции",
      description: "Возвращает угол в радианах, косинус которого равен указанному выражению float (арккосинус).",
      syntax: "ACOS(numeric_expression)",
      example: "SELECT ACOS(0); -- 1.5707... (PI/2)",
      arguments: [
        { name: "numeric_expression", description: "Выражение от -1 до 1.", example: "ACOS(1)" },
        { name: "Example 1", description: "Арккосинус 1.", example: "SELECT ACOS(1); -- 0.0" },
        { name: "Example 2", description: "Арккосинус -1.", example: "SELECT ACOS(-1); -- 3.1415... (PI)" }
      ]
    },
    {
      id: "tsql_atan",
      name: "ATAN()",
      category: "Тригонометрические функции",
      description: "Возвращает угол в радианах, тангенс которого равен указанному выражению float (арктангенс).",
      syntax: "ATAN(numeric_expression)",
      example: "SELECT ATAN(1); -- 0.7853... (PI/4)",
      arguments: [
        { name: "numeric_expression", description: "Любое числовое выражение.", example: "ATAN(100)" },
        { name: "Example 1", description: "Арктангенс 0.", example: "SELECT ATAN(0); -- 0.0" },
        { name: "Example 2", description: "Арктангенс очень большого числа.", example: "SELECT ATAN(9999999); -- ~1.5707" }
      ]
    },
    {
      id: "tsql_atan2",
      name: "ATAN2()",
      category: "Тригонометрические функции",
      description: "Возвращает угол в радианах между положительной осью x и точкой (x, y).",
      syntax: "ATAN2(y_expression, x_expression)",
      example: "SELECT ATAN2(1, 1); -- 0.7853... (PI/4)",
      arguments: [
        { name: "y_expression", description: "Координата Y.", example: "1.0" },
        { name: "x_expression", description: "Координата X.", example: "0.0" },
        { name: "Example 1", description: "Точка на оси Y (90 градусов).", example: "SELECT ATAN2(1, 0); -- 1.5707..." }
      ]
    },
    {
      id: "tsql_cot",
      name: "COT()",
      category: "Тригонометрические функции",
      description: "Возвращает тригонометрический котангенс указанного угла в радианах.",
      syntax: "COT(numeric_expression)",
      example: "SELECT COT(PI()/4); -- 1.0",
      arguments: [
        { name: "numeric_expression", description: "Угол в радианах.", example: "COT(0.5)" },
        { name: "Example 1", description: "Котангенс PI/2.", example: "SELECT COT(PI()/2); -- 0.0" },
        { name: "Example 2", description: "Котангенс 1 радиана.", example: "SELECT COT(1); -- 0.642..." }
      ]
    },
    {
      id: "tsql_exp",
      name: "EXP()",
      category: "Логарифмические и экспоненциальные функции",
      description: "Возвращает экспоненциальное значение (e^x) указанного выражения float.",
      syntax: "EXP(numeric_expression)",
      example: "SELECT EXP(1); -- 2.71828182845905",
      arguments: [
        { name: "numeric_expression", description: "Показатель степени для основания e.", example: "EXP(2)" },
        { name: "Example 1", description: "Экспонента нуля.", example: "SELECT EXP(0); -- 1.0" },
        { name: "Example 2", description: "Экспонента натурального логарифма 10.", example: "SELECT EXP(LOG(10)); -- 10.0" }
      ]
    },
    {
      id: "tsql_log",
      name: "LOG()",
      category: "Логарифмические и экспоненциальные функции",
      description: "Возвращает натуральный логарифм или логарифм по указанному основанию.",
      syntax: "LOG(numeric_expression [, base])",
      example: "SELECT LOG(10); -- 2.3025... (натуральный логарифм)",
      arguments: [
        { name: "numeric_expression", description: "Число, логарифм которого нужно найти (должно быть > 0).", example: "LOG(100)" },
        { name: "base", description: "Основание логарифма (необязательно).", example: "LOG(8, 2) -- 3.0" },
        { name: "Example 1", description: "Логарифм 100 по основанию 10.", example: "SELECT LOG(100, 10); -- 2.0" }
      ]
    },
    {
      id: "tsql_log10",
      name: "LOG10()",
      category: "Логарифмические и экспоненциальные функции",
      description: "Возвращает десятичный логарифм указанного выражения float.",
      syntax: "LOG10(numeric_expression)",
      example: "SELECT LOG10(100); -- 2.0",
      arguments: [
        { name: "numeric_expression", description: "Число > 0.", example: "LOG10(1000)" },
        { name: "Example 1", description: "Десятичный логарифм 10.", example: "SELECT LOG10(10); -- 1.0" },
        { name: "Example 2", description: "Десятичный логарифм 1.", example: "SELECT LOG10(1); -- 0.0" }
      ]
    },
    {
      id: "tsql_degrees",
      name: "DEGREES()",
      category: "Преобразование углов",
      description: "Преобразует радианы в градусы.",
      syntax: "DEGREES(numeric_expression)",
      example: "SELECT DEGREES(PI()); -- 180.0",
      arguments: [
        { name: "numeric_expression", description: "Угол в радианах.", example: "DEGREES(0.5)" },
        { name: "Example 1", description: "Преобразование PI/2 радианов.", example: "SELECT DEGREES(PI()/2); -- 90.0" },
        { name: "Example 2", description: "Преобразование 1 радиана.", example: "SELECT DEGREES(1); -- 57.29..." }
      ]
    },
    {
      id: "tsql_radians",
      name: "RADIANS()",
      category: "Преобразование углов",
      description: "Преобразует градусы в радианы.",
      syntax: "RADIANS(numeric_expression)",
      example: "SELECT RADIANS(180.0); -- 3.1415... (PI)",
      arguments: [
        { name: "numeric_expression", description: "Угол в градусах.", example: "RADIANS(90)" },
        { name: "Example 1", description: "Преобразование 90 градусов.", example: "SELECT RADIANS(90.0); -- 1.5707..." },
        { name: "Example 2", description: "Преобразование 45 градусов.", example: "SELECT RADIANS(45.0); -- 0.7853..." }
      ]
    },
    {
      id: "tsql_pi",
      name: "PI()",
      category: "Математические константы",
      description: "Возвращает константу ПИ (3.14159265358979).",
      syntax: "PI()",
      example: "SELECT PI(); -- 3.14159265358979",
      arguments: [
        { name: "Usage", description: "Используется в геометрических расчетах.", example: "SELECT PI() * POWER(radius, 2) AS Area" },
        { name: "Example 1", description: "Длина окружности.", example: "SELECT 2 * PI() * 10; -- 62.83..." },
        { name: "Example 2", description: "Половина ПИ.", example: "SELECT PI()/2; -- 1.5707..." }
      ]
    },
    {
      id: "tsql_modulo",
      name: "% (Modulo)",
      category: "Арифметические операторы",
      description: "Возвращает остаток от деления одного числа на другое.",
      syntax: "expression % numeric_expression",
      example: "SELECT 10 % 3; -- 1",
      arguments: [
        { name: "expression", description: "Делимое.", example: "11 % 4" },
        { name: "numeric_expression", description: "Делитель.", example: "100 % 10" },
        { name: "Example 1", description: "Проверка на четность.", example: "SELECT CASE WHEN id % 2 = 0 THEN 'Even' ELSE 'Odd' END" }
      ]
    },
    {
      id: "tsql_division",
      name: "/ (Division)",
      category: "Арифметические операторы",
      description: "Делит одно число на другое. При делении целых чисел результат будет целым числом.",
      syntax: "expression / numeric_expression",
      example: "SELECT 10 / 3; -- 3",
      arguments: [
        { name: "Integer division", description: "10 / 3 вернет 3.", example: "SELECT 10 / 3" },
        { name: "Decimal division", description: "Чтобы получить десятичный результат, используйте точку.", example: "SELECT 10.0 / 3; -- 3.333..." },
        { name: "Example 1", description: "Деление с плавающей точкой.", example: "SELECT CAST(sales AS FLOAT) / 2" }
      ]
    },
    {
      id: "tsql_bitwise_and",
      name: "& (Bitwise AND)",
      category: "Побитовые операторы",
      description: "Выполняет побитовую логическую операцию И между двумя целыми значениями.",
      syntax: "expression & expression",
      example: "SELECT 170 & 75; -- 10 (10101010 & 01001011 = 00001010)",
      arguments: [
        { name: "Logic", description: "Результат 1 только если оба бита равны 1.", example: "1 & 1 = 1" },
        { name: "Example 1", description: "Проверка флага.", example: "WHERE (flags & 4) > 0" },
        { name: "Example 2", description: "Маскирование битов.", example: "SELECT value & 255" }
      ]
    },
    {
      id: "tsql_bitwise_or",
      name: "| (Bitwise OR)",
      category: "Побитовые операторы",
      description: "Выполняет побитовую логическую операцию ИЛИ между двумя целыми значениями.",
      syntax: "expression | expression",
      example: "SELECT 170 | 75; -- 235 (10101010 | 01001011 = 11101011)",
      arguments: [
        { name: "Logic", description: "Результат 1 если хотя бы один бит равен 1.", example: "1 | 0 = 1" },
        { name: "Example 1", description: "Установка флага.", example: "UPDATE t SET flags = flags | 1" },
        { name: "Example 2", description: "Комбинирование значений.", example: "SELECT 8 | 4 | 2 | 1 -- 15" }
      ]
    },
    {
      id: "tsql_bitwise_xor",
      name: "^ (Bitwise XOR)",
      category: "Побитовые операторы",
      description: "Выполняет побитовую операцию 'исключающее ИЛИ' между двумя целыми значениями.",
      syntax: "expression ^ expression",
      example: "SELECT 170 ^ 75; -- 225 (10101010 ^ 01001011 = 11100001)",
      arguments: [
        { name: "Logic", description: "Результат 1 только если биты различаются.", example: "1 ^ 0 = 1, 1 ^ 1 = 0" },
        { name: "Example 1", description: "Переключение бита.", example: "SELECT value ^ 1" },
        { name: "Example 2", description: "Обмен значений без буфера.", example: "SELECT a ^ b" }
      ]
    },
    {
      id: "tsql_bitwise_not",
      name: "~ (Bitwise NOT)",
      category: "Побитовые операторы",
      description: "Выполняет побитовую операцию НЕ (инверсию битов).",
      syntax: "~expression",
      example: "SELECT ~170; -- -171 (в зависимости от типа данных)",
      arguments: [
        { name: "Logic", description: "Заменяет каждый 0 на 1 и каждую 1 на 0.", example: "~1 = 0" },
        { name: "Example 1", description: "Инверсия маски.", example: "SELECT ~mask" },
        { name: "Example 2", description: "Побитовое отрицание.", example: "SELECT ~5 -- -6" }
      ]
    },
    {
      id: "tsql_bitwise_left_shift",
      name: "<< (Left Shift)",
      category: "Побитовые операторы",
      description: "Сдвигает биты первого выражения влево на количество позиций, указанное во втором выражении.",
      syntax: "expression << expression",
      example: "SELECT 1 << 3; -- 8 (0001 сдвигается на 3 позиции влево -> 1000)",
      arguments: [
        { name: "Math", description: "Сдвиг влево на N эквивалентен умножению на 2^N.", example: "5 << 1 = 10" },
        { name: "Example 1", description: "Быстрое умножение на 2.", example: "SELECT val << 1" },
        { name: "Example 2", description: "Создание битовых масок.", example: "SELECT 1 << flag_index" }
      ]
    },
    {
      id: "tsql_bitwise_right_shift",
      name: ">> (Right Shift)",
      category: "Побитовые операторы",
      description: "Сдвигает биты первого выражения вправо на количество позиций, указанное во втором выражении.",
      syntax: "expression >> expression",
      example: "SELECT 8 >> 3; -- 1 (1000 сдвигается на 3 позиции вправо -> 0001)",
      arguments: [
        { name: "Math", description: "Сдвиг вправо на N эквивалентен делению на 2^N.", example: "20 >> 1 = 10" },
        { name: "Example 1", description: "Быстрое деление на 2.", example: "SELECT val >> 1" },
        { name: "Example 2", description: "Извлечение битовых значений.", example: "SELECT (flags >> 2) & 1" }
      ]
    },
    {
      id: "tsql_greatest",
      name: "GREATEST()",
      category: "Числовые функции",
      description: "Возвращает максимальное значение из списка выражений.",
      syntax: "GREATEST(expression1, expression2 [, expression3 ...])",
      example: "SELECT GREATEST(10, 20, 30); -- 30",
      arguments: [
        { name: "Expressions", description: "Список числовых или строковых выражений.", example: "GREATEST(col1, col2)" },
        { name: "Example 1", description: "Сравнение дат.", example: "SELECT GREATEST('2023-01-01', '2024-01-01')" },
        { name: "Example 2", description: "Выбор наибольшей цены.", example: "SELECT GREATEST(base_price, promo_price)" }
      ]
    },
    {
      id: "tsql_least",
      name: "LEAST()",
      category: "Числовые функции",
      description: "Возвращает минимальное значение из списка выражений.",
      syntax: "LEAST(expression1, expression2 [, expression3 ...])",
      example: "SELECT LEAST(10, 20, 30); -- 10",
      arguments: [
        { name: "Expressions", description: "Список выражений для сравнения.", example: "LEAST(1, 5, -2)" },
        { name: "Example 1", description: "Ограничение максимального значения.", example: "SELECT LEAST(user_score, 100)" },
        { name: "Example 2", description: "Поиск самой ранней даты.", example: "SELECT LEAST(start_date, end_date)" }
      ]
    },
    {
      id: "tsql_abs",
      name: "ABS()",
      category: "Числовые функции",
      description: "Возвращает абсолютное значение (модуль) числа.",
      syntax: "ABS(numeric_expression)",
      example: "SELECT ABS(-15); -- 15",
      arguments: [
        { name: "numeric_expression", description: "Числовое выражение.", example: "ABS(balance)" },
        { name: "Example 1", description: "Разница между значениями.", example: "SELECT ABS(score1 - score2)" },
        { name: "Example 2", description: "Модуль нуля.", example: "SELECT ABS(0); -- 0" }
      ]
    },
    {
      id: "tsql_getdate",
      name: "GETDATE()",
      category: "Функции даты и времени",
      description: "Возвращает текущую системную дату и время в формате datetime.",
      syntax: "GETDATE()",
      example: "SELECT GETDATE(); -- 2024-03-20 14:30:05.123",
      arguments: [
        { name: "Usage", description: "Используется для фиксации времени создания записи.", example: "DEFAULT GETDATE()" },
        { name: "Example 1", description: "Текущая дата.", example: "SELECT GETDATE()" },
        { name: "Example 2", description: "Добавление дней к текущей дате.", example: "SELECT DATEADD(day, 7, GETDATE())" }
      ]
    },
    {
      id: "tsql_getutcdate",
      name: "GETUTCDATE()",
      category: "Функции даты и времени",
      description: "Возвращает текущую системную дату и время по Гринвичу (UTC).",
      syntax: "GETUTCDATE()",
      example: "SELECT GETUTCDATE();",
      arguments: [
        { name: "Standardization", description: "Используется для хранения времени в едином стандарте.", example: "INSERT INTO logs (utc_time) VALUES (GETUTCDATE())" },
        { name: "Example 1", description: "Сравнение локального и UTC времени.", example: "SELECT GETDATE(), GETUTCDATE()" },
        { name: "Example 2", description: "Использование в веб-приложениях.", example: "SELECT GETUTCDATE() AS ServerTimeUTC" }
      ]
    },
    {
      id: "tsql_sysdatetime",
      name: "SYSDATETIME()",
      category: "Функции даты и времени",
      description: "Возвращает текущую дату и время с более высокой точностью, чем GETDATE().",
      syntax: "SYSDATETIME()",
      example: "SELECT SYSDATETIME(); -- 2024-03-20 14:30:05.1234567",
      arguments: [
        { name: "Precision", description: "Возвращает тип datetime2(7).", example: "SYSDATETIME()" },
        { name: "Example 1", description: "Высокоточное время.", example: "SELECT SYSDATETIME()" },
        { name: "Example 2", description: "Замер времени выполнения (начало).", example: "DECLARE @start datetime2 = SYSDATETIME()" }
      ]
    },
    {
      id: "tsql_sysutcdatetime",
      name: "SYSUTCDATETIME()",
      category: "Функции даты и времени",
      description: "Возвращает текущую дату и время по UTC с высокой точностью.",
      syntax: "SYSUTCDATETIME()",
      example: "SELECT SYSUTCDATETIME();",
      arguments: [
        { name: "Precision", description: "Более точный аналог GETUTCDATE().", example: "SYSUTCDATETIME()" },
        { name: "Example 1", description: "Точное UTC время.", example: "SELECT SYSUTCDATETIME()" },
        { name: "Example 2", description: "Аудит событий в микросекундах.", example: "SELECT SYSUTCDATETIME() AS PreciseUTC" }
      ]
    },
    {
      id: "tsql_sysdatetimeoffset",
      name: "SYSDATETIMEOFFSET()",
      category: "Функции даты и времени",
      description: "Возвращает текущую дату и время сервера вместе со смещением относительно UTC.",
      syntax: "SYSDATETIMEOFFSET()",
      example: "SELECT SYSDATETIMEOFFSET(); -- 2024-03-20 14:30:05 +03:00",
      arguments: [
        { name: "Timezone", description: "Включает информацию о часовом поясе.", example: "SYSDATETIMEOFFSET()" },
        { name: "Example 1", description: "Получение смещения.", example: "SELECT SYSDATETIMEOFFSET()" },
        { name: "Example 2", description: "Конвертация в другой часовой пояс.", example: "SELECT SYSDATETIMEOFFSET() AT TIME ZONE 'UTC'" }
      ]
    },
    {
      id: "tsql_current_timestamp",
      name: "CURRENT_TIMESTAMP",
      category: "Функции даты и времени",
      description: "ANSI SQL эквивалент функции GETDATE().",
      syntax: "CURRENT_TIMESTAMP",
      example: "SELECT CURRENT_TIMESTAMP;",
      arguments: [
        { name: "Standard", description: "Предпочтительно для кросс-платформенного кода.", example: "CURRENT_TIMESTAMP" },
        { name: "Example 1", description: "Вставка текущего времени.", example: "INSERT INTO stats (checked_at) VALUES (CURRENT_TIMESTAMP)" },
        { name: "Example 2", description: "Вывод времени.", example: "SELECT CURRENT_TIMESTAMP AS Now" }
      ]
    },
    {
      id: "tsql_datepart",
      name: "DATEPART()",
      category: "Функции даты и времени",
      description: "Возвращает целое число, представляющее указанную часть (год, месяц, день и т.д.) указанной даты.",
      syntax: "DATEPART(datepart, date_expression)",
      example: "SELECT DATEPART(year, '2024-03-20'); -- 2024",
      arguments: [
        { name: "datepart", description: "Часть даты (year, month, day, hour, minute и т.д.).", example: "month" },
        { name: "date_expression", description: "Выражение, которое можно разрешить в значение типа date, datetime или time.", example: "GETDATE()" },
        { name: "Example 1", description: "Получение номера месяца.", example: "SELECT DATEPART(mm, GETDATE());" },
        { name: "Example 2", description: "Получение часа из времени.", example: "SELECT DATEPART(hh, '14:30:05'); -- 14" }
      ]
    },
    {
      id: "tsql_datename",
      name: "DATENAME()",
      category: "Функции даты и времени",
      description: "Возвращает символьную строку, представляющую указанную часть указанной даты (например, название месяца или дня недели).",
      syntax: "DATENAME(datepart, date_expression)",
      example: "SELECT DATENAME(month, '2024-03-20'); -- 'March' (зависит от настроек языка)",
      arguments: [
        { name: "datepart", description: "Часть даты для извлечения.", example: "weekday" },
        { name: "Example 1", description: "Название дня недели.", example: "SELECT DATENAME(dw, GETDATE()); -- 'Wednesday'" },
        { name: "Example 2", description: "Название месяца.", example: "SELECT DATENAME(mm, '2024-12-01'); -- 'December'" },
        { name: "Example 3", description: "Номер недели в году.", example: "SELECT DATENAME(wk, GETDATE());" }
      ]
    },
    {
      id: "tsql_dateadd",
      name: "DATEADD()",
      category: "Функции даты и времени",
      description: "Возвращает новую дату на основе добавления интервала к указанной дате.",
      syntax: "DATEADD(datepart, number, date_expr)",
      example: "SELECT DATEADD(day, 10, '2024-01-01'); -- '2024-01-11'",
      arguments: [
        { name: "datepart", description: "Тип интервала (year, month, day и др.).", example: "month" },
        { name: "number", description: "Величина добавляемого интервала (может быть отрицательной).", example: "5" },
        { name: "Example 1", description: "Добавление 3 месяцев.", example: "SELECT DATEADD(mm, 3, GETDATE());" },
        { name: "Example 2", description: "Вычитание 1 года.", example: "SELECT DATEADD(yy, -1, GETDATE());" },
        { name: "Example 3", description: "Добавление 30 минут.", example: "SELECT DATEADD(mi, 30, GETDATE());" }
      ]
    },
    {
      id: "tsql_datediff",
      name: "DATEDIFF()",
      category: "Функции даты и времени",
      description: "Возвращает количество границ между двумя датами в указанных единицах (datepart).",
      syntax: "DATEDIFF(datepart, startdate, enddate)",
      example: "SELECT DATEDIFF(day, '2024-01-01', '2024-01-10'); -- 9",
      arguments: [
        { name: "startdate / enddate", description: "Даты для сравнения.", example: "'2023-01-01', '2024-01-01'" },
        { name: "Example 1", description: "Разница в годах.", example: "SELECT DATEDIFF(yy, '2000-01-01', GETDATE());" },
        { name: "Example 2", description: "Разница в месяцах.", example: "SELECT DATEDIFF(mm, '2023-01-01', '2023-05-01'); -- 4" },
        { name: "Example 3", description: "Разница в минутах между двумя событиями.", example: "SELECT DATEDIFF(mi, start_time, end_time);" }
      ]
    },
    {
      id: "tsql_datediff_big",
      name: "DATEDIFF_BIG()",
      category: "Функции даты и времени",
      description: "Аналогична DATEDIFF, но возвращает результат типа bigint для больших интервалов (например, наносекунд).",
      syntax: "DATEDIFF_BIG(datepart, startdate, enddate)",
      example: "SELECT DATEDIFF_BIG(ns, '2024-01-01', '2024-01-02');",
      arguments: [
        { name: "Result Type", description: "Возвращает bigint, что предотвращает переполнение при расчете мелких интервалов.", example: "DATEDIFF_BIG(ms, ...)" },
        { name: "Example 1", description: "Разница в миллисекундах за долгий период.", example: "SELECT DATEDIFF_BIG(ms, '1900-01-01', GETDATE());" },
        { name: "Example 2", description: "Разница в микросекундах.", example: "SELECT DATEDIFF_BIG(mcs, start_time, end_time);" },
        { name: "Example 3", description: "Разница в секундах для исторических данных.", example: "SELECT DATEDIFF_BIG(ss, '1753-01-01', GETDATE());" }
      ]
    },
    {
      id: "tsql_eomonth",
      name: "EOMONTH()",
      category: "Функции даты и времени",
      description: "Возвращает последний день месяца, содержащего указанную дату, с возможностью смещения на несколько месяцев.",
      syntax: "EOMONTH(date_expression [, month_to_add])",
      example: "SELECT EOMONTH('2024-02-01'); -- '2024-02-29' (високосный год)",
      arguments: [
        { name: "month_to_add", description: "Количество месяцев, добавляемых к исходной дате перед вычислением конца месяца.", example: "1" },
        { name: "Example 1", description: "Конец текущего месяца.", example: "SELECT EOMONTH(GETDATE());" },
        { name: "Example 2", description: "Конец следующего месяца.", example: "SELECT EOMONTH(GETDATE(), 1);" },
        { name: "Example 3", description: "Конец последнего месяца прошлого года.", example: "SELECT EOMONTH('2024-01-15', -1); -- '2023-12-31'" }
      ]
    },
    {
      id: "tsql_datefromparts",
      name: "DATEFROMPARTS()",
      category: "Функции конструирования даты",
      description: "Возвращает значение типа date на основе указанных года, месяца и дня.",
      syntax: "DATEFROMPARTS(year, month, day)",
      example: "SELECT DATEFROMPARTS(2024, 12, 31); -- '2024-12-31'",
      arguments: [
        { name: "parts", description: "Целые числа, представляющие компоненты даты.", example: "2024, 1, 1" },
        { name: "Example 1", description: "Создание даты из переменных.", example: "SELECT DATEFROMPARTS(@y, @m, @d);" },
        { name: "Example 2", description: "Первый день текущего года.", example: "SELECT DATEFROMPARTS(YEAR(GETDATE()), 1, 1);" },
        { name: "Example 3", description: "Конструирование даты из данных таблицы.", example: "SELECT DATEFROMPARTS(birth_year, birth_month, birth_day) FROM users;" }
      ]
    },
    {
      id: "tsql_datetimefromparts",
      name: "DATETIMEFROMPARTS()",
      category: "Функции конструирования даты",
      description: "Возвращает значение типа datetime на основе указанных компонентов.",
      syntax: "DATETIMEFROMPARTS(year, month, day, hour, minute, second, millisecond)",
      example: "SELECT DATETIMEFROMPARTS(2024, 3, 20, 14, 30, 0, 0);",
      arguments: [
        { name: "Precision", description: "Миллисекунды должны быть кратны 3 (особенность типа datetime).", example: "..., 0, 500" },
        { name: "Example 1", description: "Создание метки времени.", example: "SELECT DATETIMEFROMPARTS(2024, 1, 1, 0, 0, 0, 0);" },
        { name: "Example 2", description: "Полдень конкретной даты.", example: "SELECT DATETIMEFROMPARTS(2024, 5, 1, 12, 0, 0, 0);" },
        { name: "Example 3", description: "Время с миллисекундами.", example: "SELECT DATETIMEFROMPARTS(2024, 1, 1, 23, 59, 59, 997);" }
      ]
    },
    {
      id: "tsql_datetime2fromparts",
      name: "DATETIME2FROMPARTS()",
      category: "Функции конструирования даты",
      description: "Возвращает значение типа datetime2 с указанной точностью.",
      syntax: "DATETIME2FROMPARTS(year, month, day, hour, minute, second, fractions, precision)",
      example: "SELECT DATETIME2FROMPARTS(2024, 3, 20, 14, 30, 0, 500, 3);",
      arguments: [
        { name: "fractions / precision", description: "Доли секунды и их точность (количество знаков).", example: "500, 3" },
        { name: "Example 1", description: "Высокоточное время (7 знаков).", example: "SELECT DATETIME2FROMPARTS(2024, 1, 1, 12, 0, 0, 1234567, 7);" },
        { name: "Example 2", description: "Время без долей секунды.", example: "SELECT DATETIME2FROMPARTS(2024, 1, 1, 10, 0, 0, 0, 0);" },
        { name: "Example 3", description: "Конструирование из системных частей.", example: "SELECT DATETIME2FROMPARTS(2024, 6, 15, 8, 30, 0, 0, 7);" }
      ]
    },
    {
      id: "tsql_datetimeoffsetfromparts",
      name: "DATETIMEOFFSETFROMPARTS()",
      category: "Функции конструирования даты",
      description: "Возвращает значение datetimeoffset с указанным смещением часового пояса.",
      syntax: "DATETIMEOFFSETFROMPARTS(year, month, day, hour, minute, second, fractions, hour_offset, minute_offset, precision)",
      example: "SELECT DATETIMEOFFSETFROMPARTS(2024, 3, 20, 14, 30, 0, 0, 3, 0, 0); -- +03:00",
      arguments: [
        { name: "offsets", description: "Смещение в часах и минутах относительно UTC.", example: "3, 0 (для Москвы)" },
        { name: "Example 1", description: "Время со смещением +5 часов.", example: "SELECT DATETIMEOFFSETFROMPARTS(2024, 1, 1, 10, 0, 0, 0, 5, 0, 0);" },
        { name: "Example 2", description: "Отрицательное смещение (-8 часов).", example: "SELECT DATETIMEOFFSETFROMPARTS(2024, 1, 1, 10, 0, 0, 0, -8, 0, 0);" },
        { name: "Example 3", description: "Смещение с минутами (+3:30).", example: "SELECT DATETIMEOFFSETFROMPARTS(2024, 1, 1, 10, 0, 0, 0, 3, 30, 0);" }
      ]
    },
    {
      id: "tsql_smalldatetimefromparts",
      name: "SMALLDATETIMEOFFSETFROMPARTS()",
      category: "Функции конструирования даты",
      description: "Возвращает значение типа smalldatetime.",
      syntax: "SMALLDATETIMEFROMPARTS(year, month, day, hour, minute)",
      example: "SELECT SMALLDATETIMEFROMPARTS(2024, 3, 20, 14, 30);",
      arguments: [
        { name: "Type", description: "Тип smalldatetime не содержит секунд и миллисекунд.", example: "SMALLDATETIMEFROMPARTS(2024, 1, 1, 12, 0)" },
        { name: "Example 1", description: "Простое создание даты-времени.", example: "SELECT SMALLDATETIMEFROMPARTS(2024, 1, 1, 23, 59);" },
        { name: "Example 2", description: "Минимально возможное значение.", example: "SELECT SMALLDATETIMEFROMPARTS(1900, 1, 1, 0, 0);" },
        { name: "Example 3", description: "Максимально возможное значение.", example: "SELECT SMALLDATETIMEFROMPARTS(2079, 6, 6, 23, 59);" }
      ]
    },
    {
      id: "tsql_timefromparts",
      name: "TIMEFROMPARTS()",
      category: "Функции конструирования даты",
      description: "Возвращает значение типа time с указанной точностью.",
      syntax: "TIMEFROMPARTS(hour, minute, second, fractions, precision)",
      example: "SELECT TIMEFROMPARTS(14, 30, 0, 0, 0); -- '14:30:00'",
      arguments: [
        { name: "Parts", description: "Компоненты только времени без даты.", example: "14, 30, 0, 500, 3" },
        { name: "Example 1", description: "Создание времени с точностью до секунд.", example: "SELECT TIMEFROMPARTS(10, 15, 30, 0, 0);" },
        { name: "Example 2", description: "Время с миллисекундами.", example: "SELECT TIMEFROMPARTS(23, 59, 59, 999, 3);" },
        { name: "Example 3", description: "Время с высокой точностью (7 знаков).", example: "SELECT TIMEFROMPARTS(12, 0, 0, 1234567, 7);" }
      ]
    },
    {
      id: "tsql_cast_date",
      name: "CAST()",
      category: "Преобразование типов даты и времени",
      description: "Преобразует выражение из одного типа данных в другой (DATE, TIME, DATETIME и др.).",
      syntax: "CAST(expression AS data_type)",
      example: "SELECT CAST('2024-03-20' AS DATETIME);",
      arguments: [
        { name: "expression", description: "Любое допустимое выражение для преобразования.", example: "GETDATE()" },
        { name: "data_type", description: "Целевой тип данных (DATE, TIME, DATETIME2 и т.д.).", example: "DATE" },
        { name: "Example 1", description: "Извлечение только даты из datetime.", example: "SELECT CAST(GETDATE() AS DATE);" },
        { name: "Example 2", description: "Преобразование строки в время.", example: "SELECT CAST('14:30:05' AS TIME);" },
        { name: "Example 3", description: "Преобразование в формат с часовым поясом.", example: "SELECT CAST(GETDATE() AS DATETIMEOFFSET);" }
      ]
    },
    {
      id: "tsql_convert_date",
      name: "CONVERT()",
      category: "Преобразование типов даты и времени",
      description: "Аналогична CAST, но позволяет указывать стиль форматирования (особенно полезно для дат).",
      syntax: "CONVERT(data_type, expression [, style])",
      example: "SELECT CONVERT(VARCHAR, GETDATE(), 104); -- '20.03.2024'",
      arguments: [
        { name: "style", description: "Целое число, представляющее формат даты (например, 104 - немецкий, 101 - США).", example: "104" },
        { name: "Example 1", description: "Преобразование в дату (стиль ISO).", example: "SELECT CONVERT(DATE, '20240320', 112);" },
        { name: "Example 2", description: "Форматирование времени.", example: "SELECT CONVERT(VARCHAR, GETDATE(), 108); -- '14:30:05'" },
        { name: "Example 3", description: "Преобразование в datetime2.", example: "SELECT CONVERT(DATETIME2, '2024-03-20 14:30:05', 121);" }
      ]
    },
    {
      id: "tsql_try_convert_date",
      name: "TRY_CONVERT()",
      category: "Преобразование типов даты и времени",
      description: "Безопасно преобразует значение в указанный тип. Если преобразование невозможно, возвращает NULL вместо ошибки.",
      syntax: "TRY_CONVERT(data_type, expression [, style])",
      example: "SELECT TRY_CONVERT(DATE, 'invalid-date'); -- NULL",
      arguments: [
        { name: "Safety", description: "Предотвращает сбой запроса при некорректных входных данных.", example: "TRY_CONVERT(INT, 'abc')" },
        { name: "Example 1", description: "Проверка корректности даты.", example: "SELECT TRY_CONVERT(DATETIME, '2024-02-30'); -- NULL" },
        { name: "Example 2", description: "Безопасное приведение к времени.", example: "SELECT TRY_CONVERT(TIME, '25:00:00'); -- NULL" },
        { name: "Example 3", description: "Использование в фильтрации.", example: "WHERE TRY_CONVERT(DATE, date_string_col) IS NOT NULL" }
      ]
    },
    {
      id: "tsql_cast",
      name: "CAST",
      category: "Преобразование типов",
      description: "Преобразует выражение из одного типа данных в другой.",
      syntax: "CAST(expression AS data_type [(length | precision, scale)])\nTRY_CAST(expression AS data_type)",
      example: "SELECT CAST(123.45 AS INT); -- 123",
      arguments: [
        { name: "expression", description: "Любое допустимое выражение.", example: "price" },
        { name: "data_type", description: "Целевой системный тип данных.", example: "VARCHAR(50)" },
        { name: "TRY_CAST", description: "Возвращает NULL при неудачном преобразовании вместо ошибки.", example: "TRY_CAST('abc' AS INT)" },
        { name: "Example 1", description: "Преобразование в строку с ограничением длины.", example: "SELECT CAST(100.5 AS VARCHAR(10));" },
        { name: "Example 2", description: "Округление при приведении к целому числу.", example: "SELECT CAST(9.99 AS INT); -- 9" },
        { name: "Example 3", description: "Безопасное приведение строки к числу.", example: "SELECT TRY_CAST('12.3' AS FLOAT);" }
      ]
    },
    {
      id: "tsql_convert",
      name: "CONVERT",
      category: "Преобразование типов",
      description: "Преобразует выражение одного типа данных в другой с возможностью форматирования.",
      syntax: "CONVERT(data_type [(length)], expression [, style])\nTRY_CONVERT(data_type, expression [, style])",
      example: "SELECT CONVERT(VARCHAR, GETDATE(), 101); -- '03/20/2024'",
      arguments: [
        { name: "style", description: "Целочисленный стиль для форматирования даты или денег.", example: "120 (ODBC canonical)" },
        { name: "VARCHAR(MAX)", description: "Преобразование в строку неограниченной длины.", example: "CONVERT(VARCHAR(MAX), large_text_col)" },
        { name: "Example 1", description: "Форматирование денежных значений.", example: "SELECT CONVERT(VARCHAR, CAST(1234.5 AS MONEY), 1);" },
        { name: "Example 2", description: "Безопасное преобразование даты.", example: "SELECT TRY_CONVERT(DATETIME, '2024-01-01', 121);" },
        { name: "Example 3", description: "Конвертация бинарных данных в строку.", example: "SELECT CONVERT(VARCHAR, 0x53514C, 0); -- 'SQL'" }
      ]
    },
    {
      id: "tsql_str",
      name: "STR()",
      category: "Преобразование типов",
      description: "Возвращает символьные данные, преобразованные из числовых данных.",
      syntax: "STR(float_expression [, length [, decimal]])",
      example: "SELECT STR(123.45, 6, 1); -- ' 123.5'",
      arguments: [
        { name: "length", description: "Общая длина возвращаемой строки (включая точку и знак).", example: "10" },
        { name: "decimal", description: "Количество знаков после запятой.", example: "2" },
        { name: "Example 1", description: "Простое преобразование числа.", example: "SELECT STR(10);" },
        { name: "Example 2", description: "Преобразование с указанием длины.", example: "SELECT STR(123.456, 10, 2); -- '    123.46'" },
        { name: "Example 3", description: "Обработка больших чисел.", example: "SELECT STR(999.9, 3); -- '**' (ошибка длины)" }
      ]
    },
    {
      id: "tsql_format",
      name: "FORMAT()",
      category: "Преобразование типов",
      description: "Возвращает значение, отформатированное в соответствии с указанным форматом и необязательными сведениями о языке и региональных параметрах.",
      syntax: "FORMAT(value, format_string [, culture])",
      example: "SELECT FORMAT(GETDATE(), 'dd/MM/yyyy'); -- '20/03/2024'",
      arguments: [
        { name: "format_string", description: "Шаблон форматирования .NET.", example: "'C' (Currency), 'D' (Date)" },
        { name: "culture", description: "Региональные параметры (например, 'ru-RU', 'en-US').", example: "'de-DE'" },
        { name: "Example 1", description: "Форматирование валюты для РФ.", example: "SELECT FORMAT(1250.5, 'C', 'ru-RU');" },
        { name: "Example 2", description: "Пользовательский формат даты.", example: "SELECT FORMAT(GETDATE(), 'MMMM dd, yyyy');" },
        { name: "Example 3", description: "Форматирование чисел с разделителями.", example: "SELECT FORMAT(1000000, '#,0'); -- '1,000,000'" }
      ]
    },
    {
      id: "tsql_parse",
      name: "PARSE()",
      category: "Преобразование типов",
      description: "Возвращает результат выражения, преобразованный в запрошенный тип данных на основе региональных параметров.",
      syntax: "PARSE(string_value AS data_type [USING culture])\nTRY_PARSE(string_value AS data_type [USING culture])",
      example: "SELECT PARSE('Monday, 20 March 2024' AS DATETIME USING 'en-US');",
      arguments: [
        { name: "string_value", description: "Строковое значение для разбора.", example: "'€ 12,50'" },
        { name: "USING culture", description: "Язык входной строки.", example: "'fr-FR'" },
        { name: "Example 1", description: "Разбор денежного значения.", example: "SELECT PARSE('$100.00' AS MONEY USING 'en-US');" },
        { name: "Example 2", description: "Безопасный разбор даты.", example: "SELECT TRY_PARSE('30/02/2024' AS DATE USING 'ru-RU'); -- NULL" },
        { name: "Example 3", description: "Разбор числа с региональной спецификой.", example: "SELECT PARSE('1.234,56' AS DECIMAL(10,2) USING 'de-DE');" }
      ]
    },
    {
      id: "tsql_json_object",
      name: "JSON_OBJECT()",
      category: "JSON функции",
      description: "Создает JSON-объект из списка пар ключ-значение.",
      syntax: "JSON_OBJECT([key : value [, ...]])",
      example: "SELECT JSON_OBJECT('id': 1, 'name': 'John'); -- '{\"id\":1,\"name\":\"John\"}'",
      arguments: [
        { name: "key : value", description: "Пара ключ и значение для включения в объект.", example: "'status': 'active'" },
        { name: "Example 1", description: "Создание объекта из колонок таблицы.", example: "SELECT JSON_OBJECT('name': Name, 'price': Price) FROM Products;" },
        { name: "Example 2", description: "Вложенные объекты.", example: "SELECT JSON_OBJECT('user': JSON_OBJECT('id': 1));" },
        { name: "Example 3", description: "Пустой объект.", example: "SELECT JSON_OBJECT();" }
      ]
    },
    {
      id: "tsql_json_array",
      name: "JSON_ARRAY()",
      category: "JSON функции",
      description: "Создает JSON-массив из списка значений.",
      syntax: "JSON_ARRAY([value [, ...]])",
      example: "SELECT JSON_ARRAY(1, 'apple', 3.14); -- '[1,\"apple\",3.14]'",
      arguments: [
        { name: "value", description: "Любое значение или выражение для включения в массив.", example: "JSON_ARRAY(1, 2, 3)" },
        { name: "Example 1", description: "Массив из разных типов данных.", example: "SELECT JSON_ARRAY('A', 10, NULL);" },
        { name: "Example 2", description: "Создание массива из колонок.", example: "SELECT JSON_ARRAY(ID, Name) FROM Users;" },
        { name: "Example 3", description: "Вложенные массивы.", example: "SELECT JSON_ARRAY(1, JSON_ARRAY(2, 3));" }
      ]
    },
    {
      id: "tsql_json_value",
      name: "JSON_VALUE()",
      category: "JSON функции",
      description: "Извлекает скалярное значение (строку, число, булево) из строки JSON.",
      syntax: "JSON_VALUE(json_text, path)",
      example: "SELECT JSON_VALUE('{\"id\":1}', '$.id'); -- '1'",
      arguments: [
        { name: "path", description: "Путь JSON (начинается с $).", example: "'$.user.name'" },
        { name: "Example 1", description: "Извлечение из вложенного объекта.", example: "SELECT JSON_VALUE(json_col, '$.info.address.city');" },
        { name: "Example 2", description: "Извлечение из массива.", example: "SELECT JSON_VALUE(json_col, '$.tags[0]');" },
        { name: "Example 3", description: "Обработка отсутствующих ключей.", example: "SELECT JSON_VALUE('{}', '$.key'); -- NULL" }
      ]
    },
    {
      id: "tsql_json_query",
      name: "JSON_QUERY()",
      category: "JSON функции",
      description: "Извлекает объект или массив из строки JSON.",
      syntax: "JSON_QUERY(json_text, path)",
      example: "SELECT JSON_QUERY('{\"items\":[1,2]}', '$.items'); -- '[1,2]'",
      arguments: [
        { name: "Scalar vs Object", description: "В отличие от JSON_VALUE, возвращает JSON-фрагмент, а не скаляр.", example: "JSON_QUERY(json, '$')" },
        { name: "Example 1", description: "Извлечение вложенного объекта.", example: "SELECT JSON_QUERY(json_col, '$.metadata');" },
        { name: "Example 2", description: "Извлечение всего массива.", example: "SELECT JSON_QUERY(json_col, '$.history');" },
        { name: "Example 3", description: "Использование для вставки JSON.", example: "SELECT JSON_OBJECT('data': JSON_QUERY('{\"id\":1}'));" }
      ]
    },
    {
      id: "tsql_json_modify",
      name: "JSON_MODIFY()",
      category: "JSON функции",
      description: "Обновляет значение свойства в строке JSON и возвращает обновленную строку.",
      syntax: "JSON_MODIFY(json_text, path, new_value)",
      example: "SELECT JSON_MODIFY('{\"a\":1}', '$.a', 2); -- '{\"a\":2}'",
      arguments: [
        { name: "append", description: "Добавление в массив с помощью ключевого слова append.", example: "JSON_MODIFY(json, 'append $.tags', 'new')" },
        { name: "Example 1", description: "Изменение значения ключа.", example: "SELECT JSON_MODIFY(json_col, '$.status', 'closed');" },
        { name: "Example 2", description: "Удаление ключа (установка в NULL).", example: "SELECT JSON_MODIFY(json_col, '$.temp', NULL);" },
        { name: "Example 3", description: "Добавление нового ключа.", example: "SELECT JSON_MODIFY(json_col, '$.new_key', 'value');" }
      ]
    },
    {
      id: "tsql_json_arrayagg",
      name: "JSON_ARRAYAGG()",
      category: "JSON функции",
      description: "Агрегатная функция, объединяющая значения строк в JSON-массив.",
      syntax: "JSON_ARRAYAGG(expression [ORDER BY order_clause])",
      example: "SELECT JSON_ARRAYAGG(Name) FROM Users;",
      arguments: [
        { name: "Aggregation", description: "Группирует данные в один JSON-массив.", example: "GROUP BY Category" },
        { name: "Example 1", description: "Массив имен сотрудников.", example: "SELECT Dept, JSON_ARRAYAGG(Name) FROM Employees GROUP BY Dept;" },
        { name: "Example 2", description: "Массив с сортировкой.", example: "SELECT JSON_ARRAYAGG(Price ORDER BY Price DESC) FROM Products;" },
        { name: "Example 3", description: "Массив объектов.", example: "SELECT JSON_ARRAYAGG(JSON_OBJECT('id': ID, 'name': Name)) FROM Users;" }
      ]
    },
    {
      id: "tsql_logical_and",
      name: "AND",
      category: "Логические операторы",
      description: "Возвращает TRUE, если оба выражения истинны.",
      syntax: "expression1 AND expression2",
      example: "SELECT * FROM Users WHERE Age > 18 AND Status = 'Active';",
      arguments: [
        { name: "Example 1", description: "Фильтрация по диапазону и статусу.", example: "WHERE Price > 100 AND Category = 'Tech'" },
        { name: "Example 2", description: "Множественные условия.", example: "WHERE A = 1 AND B = 2 AND C = 3" },
        { name: "Example 3", description: "Использование в CASE.", example: "CASE WHEN Age > 18 AND Age < 65 THEN 'Adult' END" }
      ]
    },
    {
      id: "tsql_logical_or",
      name: "OR",
      category: "Логические операторы",
      description: "Возвращает TRUE, если хотя бы одно из выражений истинно.",
      syntax: "expression1 OR expression2",
      example: "SELECT * FROM Users WHERE Role = 'Admin' OR Role = 'Editor';",
      arguments: [
        { name: "Example 1", description: "Выбор из нескольких вариантов.", example: "WHERE City = 'Moscow' OR City = 'London'" },
        { name: "Example 2", description: "Комбинирование с AND (используйте скобки).", example: "WHERE (A = 1 OR B = 1) AND C = 1" },
        { name: "Example 3", description: "Проверка нескольких флагов.", example: "WHERE IsAdmin = 1 OR IsSuperUser = 1" }
      ]
    },
    {
      id: "tsql_logical_not",
      name: "NOT",
      category: "Логические операторы",
      description: "Инвертирует логическое значение выражения.",
      syntax: "NOT expression",
      example: "SELECT * FROM Users WHERE NOT Status = 'Banned';",
      arguments: [
        { name: "Example 1", description: "Отрицание равенства.", example: "WHERE NOT Age < 18" },
        { name: "Example 2", description: "Использование с LIKE.", example: "WHERE Name NOT LIKE 'A%'" },
        { name: "Example 3", description: "Использование с IN.", example: "WHERE ID NOT IN (1, 2, 3)" }
      ]
    },
    {
      id: "tsql_comparison_eq",
      name: "=",
      category: "Операторы сравнения",
      description: "Проверяет равенство двух выражений.",
      syntax: "expression1 = expression2",
      example: "WHERE ID = 101;",
      arguments: [
        { name: "Example 1", description: "Сравнение строк.", example: "WHERE Email = 'user@test.com'" },
        { name: "Example 2", description: "Сравнение колонок.", example: "WHERE Salary = TargetSalary" },
        { name: "Example 3", description: "Использование в JOIN.", example: "ON t1.ID = t2.RefID" }
      ]
    },
    {
      id: "tsql_comparison_neq",
      name: "!= | <>",
      category: "Операторы сравнения",
      description: "Проверяет неравенство двух выражений.",
      syntax: "expression1 != expression2 | expression1 <> expression2",
      example: "WHERE Status != 'Deleted';",
      arguments: [
        { name: "Example 1", description: "Исключение значения.", example: "WHERE Category <> 'Draft'" },
        { name: "Example 2", description: "Сравнение чисел.", example: "WHERE Count != 0" },
        { name: "Example 3", description: "Стандарт ANSI (<>).", example: "WHERE Role <> 'Guest'" }
      ]
    },
    {
      id: "tsql_comparison_lt",
      name: "<",
      category: "Операторы сравнения",
      description: "Меньше чем.",
      syntax: "expression1 < expression2",
      example: "WHERE Price < 50.0;",
      arguments: [
        { name: "Example 1", description: "Фильтр по дате.", example: "WHERE CreatedAt < '2024-01-01'" },
        { name: "Example 2", description: "Сравнение версий.", example: "WHERE Version < 2.0" },
        { name: "Example 3", description: "Сравнение с результатом подзапроса.", example: "WHERE Val < (SELECT AVG(Val) FROM T)" }
      ]
    },
    {
      id: "tsql_comparison_lte",
      name: "<=",
      category: "Операторы сравнения",
      description: "Меньше или равно.",
      syntax: "expression1 <= expression2",
      example: "WHERE Age <= 18;",
      arguments: [
        { name: "Example 1", description: "Верхняя граница включительно.", example: "WHERE Score <= 100" },
        { name: "Example 2", description: "Срок годности.", example: "WHERE ExpiryDate <= GETDATE()" },
        { name: "Example 3", description: "Лимит запасов.", example: "WHERE Stock <= MinThreshold" }
      ]
    },
    {
      id: "tsql_comparison_gt",
      name: ">",
      category: "Операторы сравнения",
      description: "Больше чем.",
      syntax: "expression1 > expression2",
      example: "WHERE Salary > 100000;",
      arguments: [
        { name: "Example 1", description: "Актуальные записи.", example: "WHERE UpdateCount > 0" },
        { name: "Example 2", description: "Поиск по рейтингу.", example: "WHERE Rating > 4.5" },
        { name: "Example 3", description: "Фильтр по размеру.", example: "WHERE SizeBytes > 1024" }
      ]
    },
    {
      id: "tsql_comparison_gte",
      name: ">=",
      category: "Операторы сравнения",
      description: "Больше или равно.",
      syntax: "expression1 >= expression2",
      example: "WHERE Experience >= 5;",
      arguments: [
        { name: "Example 1", description: "Минимальный порог.", example: "WHERE Amount >= 10.0" },
        { name: "Example 2", description: "Начиная с даты.", example: "WHERE StartDate >= '2023-06-01'" },
        { name: "Example 3", description: "Проверка совершеннолетия.", example: "WHERE Age >= 18" }
      ]
    },
    {
      id: "tsql_is_null",
      name: "IS NULL",
      category: "Операторы сравнения",
      description: "Проверяет значение на равенство NULL.",
      syntax: "expression IS NULL",
      example: "WHERE DeletedAt IS NULL;",
      arguments: [
        { name: "Example 1", description: "Поиск записей без телефона.", example: "WHERE Phone IS NULL" },
        { name: "Example 2", description: "Проверка внешней связи.", example: "WHERE ParentID IS NULL" },
        { name: "Example 3", description: "Незавершенные задачи.", example: "WHERE FinishedAt IS NULL" }
      ]
    },
    {
      id: "tsql_is_not_null",
      name: "IS NOT NULL",
      category: "Операторы сравнения",
      description: "Проверяет, что значение НЕ является NULL.",
      syntax: "expression IS NOT NULL",
      example: "WHERE Email IS NOT NULL;",
      arguments: [
        { name: "Example 1", description: "Обязательные поля.", example: "WHERE Username IS NOT NULL" },
        { name: "Example 2", description: "Наличие комментария.", example: "WHERE Comment IS NOT NULL" },
        { name: "Example 3", description: "Заполненные профили.", example: "WHERE AvatarURL IS NOT NULL" }
      ]
    },
    {
      id: "tsql_in",
      name: "IN",
      category: "Логические операторы",
      description: "Проверяет соответствие значения любому значению из списка или подзапроса.",
      syntax: "expression IN (value1, value2 [, ...])",
      example: "WHERE Category IN ('Food', 'Drinks');",
      arguments: [
        { name: "Example 1", description: "Список ID.", example: "WHERE ID IN (10, 20, 30)" },
        { name: "Example 2", description: "Результат подзапроса.", example: "WHERE DeptID IN (SELECT ID FROM Departments)" },
        { name: "Example 3", description: "Краткая запись множественного OR.", example: "WHERE Color IN ('Red', 'Blue', 'Green')" }
      ]
    },
    {
      id: "tsql_between",
      name: "BETWEEN",
      category: "Логические операторы",
      description: "Проверяет, попадает ли значение в диапазон (включая границы).",
      syntax: "expression BETWEEN value1 AND value2",
      example: "WHERE Age BETWEEN 18 AND 30;",
      arguments: [
        { name: "Example 1", description: "Диапазон дат.", example: "WHERE OrderDate BETWEEN '2023-01-01' AND '2023-12-31'" },
        { name: "Example 2", description: "Ценовой диапазон.", example: "WHERE Price BETWEEN 10.5 AND 100.0" },
        { name: "Example 3", description: "Алфавитный диапазон.", example: "WHERE Name BETWEEN 'A' AND 'M'" }
      ]
    },
    {
      id: "tsql_like",
      name: "LIKE",
      category: "Логические операторы",
      description: "Поиск по шаблону с использованием подстановочных знаков (% и _).",
      syntax: "expression LIKE pattern [ESCAPE escape_character]",
      example: "WHERE Name LIKE 'A%'; -- начинается на А",
      arguments: [
        { name: "Example 1", description: "Поиск вхождения.", example: "WHERE Email LIKE '%@gmail.com'" },
        { name: "Example 2", description: "Один символ (_).", example: "WHERE Code LIKE 'ID_99'" },
        { name: "Example 3", description: "Использование ESCAPE.", example: "WHERE Discount LIKE '10!%' ESCAPE '!'" }
      ]
    },
    {
      id: "tsql_databasepropertyex",
      name: "DATABASEPROPERTYEX()",
      category: "Метаданные",
      description: "Возвращает текущее значение указанного свойства базы данных.",
      syntax: "DATABASEPROPERTYEX(database_name, property)",
      example: "SELECT DATABASEPROPERTYEX('master', 'Status');",
      arguments: [
        { name: "Collation", description: "Проверка сортировки базы данных.", example: "SELECT DATABASEPROPERTYEX('DB1', 'Collation');" },
        { name: "Example 1", description: "Проверка статуса базы данных.", example: "SELECT DATABASEPROPERTYEX('Sales', 'Status');" },
        { name: "Example 2", description: "Режим восстановления.", example: "SELECT DATABASEPROPERTYEX('HR', 'Recovery');" },
        { name: "Example 3", description: "Проверка версии SQL Server.", example: "SELECT DATABASEPROPERTYEX('model', 'Version');" }
      ]
    },
    {
      id: "tsql_objectproperty",
      name: "OBJECTPROPERTY()",
      category: "Метаданные",
      description: "Возвращает информацию об объектах в текущей базе данных по их ID.",
      syntax: "OBJECTPROPERTY(object_id, property)",
      example: "SELECT OBJECTPROPERTY(OBJECT_ID('Users'), 'IsTable');",
      arguments: [
        { name: "IsView", description: "Проверка, является ли объект представлением.", example: "OBJECTPROPERTY(id, 'IsView')" },
        { name: "Example 1", description: "Проверка, является ли объект таблицей.", example: "SELECT OBJECTPROPERTY(id, 'IsUserTable') FROM sys.objects;" },
        { name: "Example 2", description: "Проверка наличия первичного ключа.", example: "SELECT OBJECTPROPERTY(OBJECT_ID('Orders'), 'TableHasPrimaryKey');" },
        { name: "Example 3", description: "Проверка, является ли объект хранимой процедурой.", example: "SELECT OBJECTPROPERTY(id, 'IsProcedure');" }
      ]
    },
    {
      id: "tsql_columnproperty",
      name: "COLUMNPROPERTY()",
      category: "Метаданные",
      description: "Возвращает информацию о столбце или параметре процедуры.",
      syntax: "COLUMNPROPERTY(object_id, column_name, property)",
      example: "SELECT COLUMNPROPERTY(OBJECT_ID('Users'), 'ID', 'IsIdentity');",
      arguments: [
        { name: "AllowsNull", description: "Проверка, допускает ли столбец NULL.", example: "COLUMNPROPERTY(id, 'Email', 'AllowsNull')" },
        { name: "Example 1", description: "Проверка типа данных столбца.", example: "SELECT COLUMNPROPERTY(id, 'Name', 'Precision');" },
        { name: "Example 2", description: "Проверка, является ли столбец вычисляемым.", example: "SELECT COLUMNPROPERTY(id, 'Total', 'IsComputed');" },
        { name: "Example 3", description: "Максимальная длина столбца.", example: "SELECT COLUMNPROPERTY(id, 'Bio', 'Precision');" }
      ]
    },
    {
      id: "tsql_sql_variant_property",
      name: "SQL_VARIANT_PROPERTY()",
      category: "Метаданные",
      description: "Возвращает информацию о типе данных и другие метаданные значения типа sql_variant.",
      syntax: "SQL_VARIANT_PROPERTY(expression, property)",
      example: "SELECT SQL_VARIANT_PROPERTY(val, 'BaseType');",
      arguments: [
        { name: "BaseType", description: "Возвращает базовый тип данных значения.", example: "SQL_VARIANT_PROPERTY(@v, 'BaseType')" },
        { name: "Example 1", description: "Проверка точности числа.", example: "SELECT SQL_VARIANT_PROPERTY(123.45, 'Precision');" },
        { name: "Example 2", description: "Проверка длины строки.", example: "SELECT SQL_VARIANT_PROPERTY('text', 'MaxLength');" },
        { name: "Example 3", description: "Проверка сортировки (collation).", example: "SELECT SQL_VARIANT_PROPERTY(name, 'Collation');" }
      ]
    },
    {
      id: "tsql_serverproperty",
      name: "SERVERPROPERTY()",
      category: "Метаданные",
      description: "Возвращает информацию о свойствах текущего экземпляра SQL Server.",
      syntax: "SERVERPROPERTY(property_name)",
      example: "SELECT SERVERPROPERTY('MachineName');",
      arguments: [
        { name: "Edition", description: "Версия издания SQL Server (Express, Standard, etc).", example: "SERVERPROPERTY('Edition')" },
        { name: "Example 1", description: "Проверка версии продукта.", example: "SELECT SERVERPROPERTY('ProductVersion');" },
        { name: "Example 2", description: "Уровень обновления (Service Pack).", example: "SELECT SERVERPROPERTY('ProductLevel');" },
        { name: "Example 3", description: "Проверка работы в кластере.", example: "SELECT SERVERPROPERTY('IsClustered');" }
      ]
    },
    {
      id: "tsql_connectionproperty",
      name: "CONNECTIONPROPERTY()",
      category: "Метаданные",
      description: "Возвращает сведения о текущем соединении.",
      syntax: "CONNECTIONPROPERTY(property_name)",
      example: "SELECT CONNECTIONPROPERTY('net_transport');",
      arguments: [
        { name: "Protocol", description: "Используемый сетевой протокол.", example: "CONNECTIONPROPERTY('net_transport')" },
        { name: "Example 1", description: "IP-адрес клиента.", example: "SELECT CONNECTIONPROPERTY('client_net_address');" },
        { name: "Example 2", description: "Локальный порт сервера.", example: "SELECT CONNECTIONPROPERTY('local_net_address');" },
        { name: "Example 3", description: "Тип аутентификации.", example: "SELECT CONNECTIONPROPERTY('auth_scheme');" }
      ]
    },
    {
      id: "tsql_sessionproperty",
      name: "SESSIONPROPERTY()",
      category: "Метаданные",
      description: "Возвращает значения параметров SET сеанса.",
      syntax: "SESSIONPROPERTY(property_name)",
      example: "SELECT SESSIONPROPERTY('ANSI_NULLS');",
      arguments: [
        { name: "ANSI_PADDING", description: "Проверка настройки дополнения пробелами.", example: "SESSIONPROPERTY('ANSI_PADDING')" },
        { name: "Example 1", description: "Проверка QUOTED_IDENTIFIER.", example: "SELECT SESSIONPROPERTY('QUOTED_IDENTIFIER');" },
        { name: "Example 2", description: "Проверка ARITHABORT.", example: "SELECT SESSIONPROPERTY('ARITHABORT');" },
        { name: "Example 3", description: "Проверка CONCAT_NULL_YIELDS_NULL.", example: "SELECT SESSIONPROPERTY('CONCAT_NULL_YIELDS_NULL');" }
      ]
    },
    {
      id: "tsql_sys_dbts",
      name: "@@DBTS",
      category: "Системные функции",
      description: "Возвращает значение текущего типа данных timestamp для текущей базы данных.",
      syntax: "@@DBTS",
      example: "SELECT @@DBTS;",
      arguments: [
        { name: "Example 1", description: "Получение текущего значения версии БД.", example: "SELECT @@DBTS;" },
        { name: "Example 2", description: "Использование в сравнении.", example: "IF @@DBTS > @last_ts PRINT 'Changed';" },
        { name: "Example 3", description: "Сохранение метки времени.", example: "SELECT @ts = @@DBTS;" }
      ]
    },
    {
      id: "tsql_sys_error",
      name: "@@ERROR",
      category: "Системные функции",
      description: "Возвращает номер ошибки для последнего выполненного оператора Transact-SQL.",
      syntax: "@@ERROR",
      example: "IF @@ERROR <> 0 PRINT 'Error occurred';",
      arguments: [
        { name: "Example 1", description: "Простая проверка после INSERT.", example: "INSERT INTO T1 VALUES (1); IF @@ERROR != 0 ROLLBACK;" },
        { name: "Example 2", description: "Сохранение кода ошибки.", example: "SELECT @err = @@ERROR;" },
        { name: "Example 3", description: "Проверка на конкретный код (например, 547 - FK violation).", example: "IF @@ERROR = 547 PRINT 'FK Error';" }
      ]
    },
    {
      id: "tsql_sys_identity",
      name: "@@IDENTITY",
      category: "Системные функции",
      description: "Возвращает последнее вставленное значение идентификатора в любом сеансе и любой области.",
      syntax: "@@IDENTITY",
      example: "SELECT @@IDENTITY;",
      arguments: [
        { name: "Example 1", description: "Получение ID после вставки.", example: "INSERT INTO Users (Name) VALUES ('Bob'); SELECT @@IDENTITY;" },
        { name: "Example 2", description: "Сравнение с SCOPE_IDENTITY.", example: "SELECT @@IDENTITY AS Global, SCOPE_IDENTITY() AS Local;" },
        { name: "Example 3", description: "Использование в триггере.", example: "INSERT INTO Logs (Msg) VALUES ('Inserted ID: ' + CAST(@@IDENTITY AS VARCHAR));" }
      ]
    },
    {
      id: "tsql_sys_rowcount",
      name: "@@ROWCOUNT",
      category: "Системные функции",
      description: "Возвращает число строк, затронутых последним оператором.",
      syntax: "@@ROWCOUNT",
      example: "UPDATE Users SET Active = 1; SELECT @@ROWCOUNT;",
      arguments: [
        { name: "Example 1", description: "Проверка, было ли что-то удалено.", example: "DELETE FROM Logs; IF @@ROWCOUNT = 0 PRINT 'No logs deleted';" },
        { name: "Example 2", description: "Сохранение значения для отчета.", example: "SELECT @count = @@ROWCOUNT;" },
        { name: "Example 3", description: "Использование после SELECT.", example: "SELECT * FROM Products; PRINT 'Found ' + CAST(@@ROWCOUNT AS VARCHAR) + ' items';" }
      ]
    },
    {
      id: "tsql_sys_trancount",
      name: "@@TRANCOUNT",
      category: "Системные функции",
      description: "Возвращает число активных транзакций в текущем соединении.",
      syntax: "@@TRANCOUNT",
      example: "IF @@TRANCOUNT > 0 COMMIT;",
      arguments: [
        { name: "Example 1", description: "Проверка перед началом новой транзакции.", example: "IF @@TRANCOUNT = 0 BEGIN TRANSACTION;" },
        { name: "Example 2", description: "Откат всех вложенных транзакций.", example: "WHILE @@TRANCOUNT > 0 ROLLBACK TRANSACTION;" },
        { name: "Example 3", description: "Информационный запрос.", example: "SELECT @@TRANCOUNT AS ActiveTransactions;" }
      ]
    },
    {
      id: "tsql_sys_version",
      name: "@@VERSION",
      category: "Системные функции",
      description: "Возвращает информацию о версии, архитектуре процессора, дате сборки и операционной системе для текущего экземпляра SQL Server.",
      syntax: "@@VERSION",
      example: "SELECT @@VERSION;",
      arguments: [
        { name: "Example 1", description: "Получение полной строки версии.", example: "SELECT @@VERSION;" },
        { name: "Example 2", description: "Проверка на наличие 'Azure'.", example: "IF @@VERSION LIKE '%Azure%' PRINT 'Cloud';" },
        { name: "Example 3", description: "Логирование версии системы.", example: "INSERT INTO SysInfo (Ver) VALUES (@@VERSION);" }
      ]
    },
    {
      id: "tsql_getdate",
      name: "GETDATE()",
      category: "Системные функции",
      description: "Возвращает текущую системную дату и время в формате datetime.",
      syntax: "GETDATE()",
      example: "SELECT GETDATE();",
      arguments: [
        { name: "Example 1", description: "Установка значения по умолчанию.", example: "CREATE TABLE T (Created DATETIME DEFAULT GETDATE());" },
        { name: "Example 2", description: "Вычисление разницы во времени.", example: "SELECT DATEDIFF(hour, LastLogin, GETDATE()) FROM Users;" },
        { name: "Example 3", description: "Фильтрация за сегодня.", example: "WHERE CAST(OrderDate AS DATE) = CAST(GETDATE() AS DATE)" }
      ]
    },
    {
      id: "tsql_scope_identity",
      name: "SCOPE_IDENTITY()",
      category: "Системные функции",
      description: "Возвращает последнее значение идентификатора, вставленное в столбец идентификаторов в той же области (scope).",
      syntax: "SCOPE_IDENTITY()",
      example: "SELECT SCOPE_IDENTITY();",
      arguments: [
        { name: "Example 1", description: "Безопасное получение ID после INSERT.", example: "INSERT INTO Orders DEFAULT VALUES; SELECT SCOPE_IDENTITY();" },
        { name: "Example 2", description: "Использование в хранимой процедуре.", example: "SET @NewID = SCOPE_IDENTITY();" },
        { name: "Example 3", description: "Защита от триггеров (в отличие от @@IDENTITY).", example: "SELECT 'This ID is from my insert only: ' + CAST(SCOPE_IDENTITY() AS VARCHAR);" }
      ]
    },
    {
      id: "tsql_app_name",
      name: "APP_NAME()",
      category: "Системные функции",
      description: "Возвращает имя приложения для текущего сеанса.",
      syntax: "APP_NAME()",
      example: "SELECT APP_NAME();",
      arguments: [
        { name: "Example 1", description: "Определение источника запроса.", example: "IF APP_NAME() = 'Management Studio' PRINT 'Manual query';" },
        { name: "Example 2", description: "Логирование приложения.", example: "INSERT INTO Logs (App) VALUES (APP_NAME());" },
        { name: "Example 3", description: "Проверка в триггере.", example: "IF APP_NAME() NOT LIKE 'MyApp%' THROW 50000, 'Access Denied', 1;" }
      ]
    },
    {
      id: "tsql_db_name",
      name: "DB_NAME()",
      category: "Системные функции",
      description: "Возвращает имя базы данных по ID или текущее имя БД.",
      syntax: "DB_NAME([database_id])",
      example: "SELECT DB_NAME();",
      arguments: [
        { name: "Example 1", description: "Имя текущей базы.", example: "SELECT DB_NAME() AS CurrentDB;" },
        { name: "Example 2", description: "Имя базы по ID.", example: "SELECT DB_NAME(1) AS MasterDBName;" },
        { name: "Example 3", description: "Использование в динамическом SQL.", example: "SET @sql = 'BACKUP DATABASE ' + QUOTENAME(DB_NAME()) + '...';" }
      ]
    },
    {
      id: "tsql_crypto_hashbytes",
      name: "HASHBYTES()",
      category: "Криптографические функции",
      description: "Возвращает хэш входных данных (MD2, MD4, MD5, SHA, SHA1, SHA2_256, SHA2_512).",
      syntax: "HASHBYTES('algorithm', expression)",
      example: "SELECT HASHBYTES('SHA2_256', 'password123');",
      arguments: [
        { name: "Algorithm", description: "SHA2_256 и SHA2_512 рекомендуются для безопасности.", example: "HASHBYTES('SHA2_512', col)" },
        { name: "Example 1", description: "Хэширование строки пароля.", example: "SELECT HASHBYTES('SHA2_256', 'SecretValue');" },
        { name: "Example 2", description: "Сравнение хэшей для проверки изменений.", example: "IF HASHBYTES('MD5', @old) = HASHBYTES('MD5', @new) PRINT 'Same';" },
        { name: "Example 3", description: "Хэширование бинарных данных.", example: "SELECT HASHBYTES('SHA1', 0x123456);" }
      ]
    },
    {
      id: "tsql_crypto_checksum",
      name: "CHECKSUM()",
      category: "Криптографические функции",
      description: "Возвращает контрольную сумму, вычисленную по строке таблицы или по списку выражений.",
      syntax: "CHECKSUM(*) | CHECKSUM(expression [, ...])",
      example: "SELECT CHECKSUM(*);",
      arguments: [
        { name: "Example 1", description: "Контрольная сумма для всей строки.", example: "SELECT CHECURESUM(*) FROM Products;" },
        { name: "Example 2", description: "Контрольная сумма для конкретных колонок.", example: "SELECT CHECKSUM(Name, Price) FROM Products;" },
        { name: "Example 3", description: "Использование для индексации вычисляемых колонок.", example: "CREATE INDEX ix_cs ON T(cs_col);" }
      ]
    },
    {
      id: "tsql_crypto_checksum_agg",
      name: "CHECKSUM_AGG()",
      category: "Криптографические функции",
      description: "Агрегатная функция для вычисления контрольной суммы группы значений.",
      syntax: "CHECKSUM_AGG([ALL | DISTINCT] expression)",
      example: "SELECT CHECKSUM_AGG(BINARY_CHECKSUM(*)) FROM Products;",
      arguments: [
        { name: "Example 1", description: "Обнаружение изменений в таблице.", example: "SELECT CHECKSUM_AGG(CAST(ID AS INT)) FROM Users;" },
        { name: "Example 2", description: "Проверка целостности набора данных.", example: "SELECT CHECKSUM_AGG(Price) FROM Orders;" },
        { name: "Example 3", description: "Сравнение двух таблиц на идентичность.", example: "IF (SELECT CHECKSUM_AGG(Val) FROM T1) = (SELECT CHECKSUM_AGG(Val) FROM T2) PRINT 'Match';" }
      ]
    },
    {
      id: "tsql_seq_next_value",
      name: "NEXT VALUE FOR",
      category: "Последовательности",
      description: "Генерирует номер последовательности из указанного объекта последовательности.",
      syntax: "NEXT VALUE FOR [schema_name].sequence_name",
      example: "SELECT NEXT VALUE FOR MySequence;",
      arguments: [
        { name: "Example 1", description: "Использование при вставке.", example: "INSERT INTO T(ID) VALUES (NEXT VALUE FOR OrderSeq);" },
        { name: "Example 2", description: "Получение значения в переменную.", example: "DECLARE @id INT = NEXT VALUE FOR CustomerSeq;" },
        { name: "Example 3", description: "Генерация диапазона значений.", example: "SELECT NEXT VALUE FOR Seq, Name FROM Users;" }
      ]
    },
    {
      id: "tsql_search_contains",
      name: "CONTAINS()",
      category: "Полнотекстовый поиск",
      description: "Ищет точные или нечеткие совпадения слов и фраз.",
      syntax: "CONTAINS(column, 'search_condition')",
      example: "WHERE CONTAINS(Bio, 'SQL AND Database');",
      arguments: [
        { name: "Example 1", description: "Поиск фразы.", example: "WHERE CONTAINS(Comments, '\"excellent service\"');" },
        { name: "Example 2", description: "Использование логических операторов.", example: "WHERE CONTAINS(Description, 'Computer OR Laptop');" },
        { name: "Example 3", description: "Поиск по префиксу.", example: "WHERE CONTAINS(Name, '\"prog*\"'); -- matches program, programmer" }
      ]
    },
    {
      id: "tsql_search_containstable",
      name: "CONTAINSTABLE()",
      category: "Полнотекстовый поиск",
      description: "Возвращает таблицу из нуля, одной или нескольких строк для столбцов, содержащих точные или нечеткие совпадения с отдельными словами и фразами. Включает столбец ранжирования (RANK).",
      syntax: "CONTAINSTABLE(table, column, 'search_condition' [, top_n_by_rank])",
      example: "SELECT * FROM CONTAINSTABLE(Products, Name, '\"Smart*\"');",
      arguments: [
        { name: "RANK", description: "Возвращает релевантность каждой строки.", example: "SELECT KEY, RANK FROM CONTAINSTABLE(...)" },
        { name: "Example 1", description: "Поиск с ранжированием результатов.", example: "SELECT p.Name, ct.RANK FROM Products p JOIN CONTAINSTABLE(Products, Description, 'SQL') ct ON p.ID = ct.[KEY] ORDER BY ct.RANK DESC;" },
        { name: "Example 2", description: "Ограничение количества результатов (Top N).", example: "SELECT * FROM CONTAINSTABLE(Articles, Body, 'Database', 10);" },
        { name: "Example 3", description: "Сложные условия поиска.", example: "SELECT * FROM CONTAINSTABLE(Docs, *, '\"Web\" NEAR \"Design\"');" }
      ]
    },
    {
      id: "tsql_search_freetext",
      name: "FREETEXT()",
      category: "Полнотекстовый поиск",
      description: "Ищет значения, соответствующие смыслу, а не только точному совпадению слов.",
      syntax: "FREETEXT(column, 'freetext_string')",
      example: "WHERE FREETEXT(Articles, 'how to learn SQL');",
      arguments: [
        { name: "Example 1", description: "Естественный язык в запросе.", example: "WHERE FREETEXT(Bio, 'looking for experienced developers');" },
        { name: "Example 2", description: "Поиск по описанию товара.", example: "WHERE FREETEXT(ProductDesc, 'red running shoes');" },
        { name: "Example 3", description: "Использование с несколькими колонками.", example: "WHERE FREETEXT((Title, Body), 'technical support');" }
      ]
    },
    {
      id: "tsql_search_freetexttable",
      name: "FREETEXTTABLE()",
      category: "Полнотекстовый поиск",
      description: "Возвращает таблицу из нуля, одной или нескольких строк для столбцов, содержащих значения, которые соответствуют смыслу, а не только точному совпадению слов. Включает столбец ранжирования (RANK).",
      syntax: "FREETEXTTABLE(table, column, 'freetext_string' [, language_term] [, top_n_by_rank])",
      example: "SELECT * FROM FREETEXTTABLE(Products, Description, 'comfortable shoes');",
      arguments: [
        { name: "KEY", description: "Возвращает первичный ключ найденной строки.", example: "SELECT [KEY] FROM FREETEXTTABLE(...)" },
        { name: "Example 1", description: "Смысловой поиск с сортировкой по весу.", example: "SELECT a.Title, ft.RANK FROM Articles a JOIN FREETEXTTABLE(Articles, Content, 'optimizing database performance') ft ON a.ID = ft.[KEY] ORDER BY ft.RANK DESC;" },
        { name: "Example 2", description: "Поиск с указанием языка.", example: "SELECT * FROM FREETEXTTABLE(News, Body, 'погода в Москве', LANGUAGE 1049);" },
        { name: "Example 3", description: "Топ-5 наиболее релевантных статей.", example: "SELECT * FROM FREETEXTTABLE(Blog, Text, 'AI future', 5);" }
      ]
    },
    {
      id: "tsql_error_line",
      name: "ERROR_LINE()",
      category: "Обработка ошибок",
      description: "Возвращает номер строки, на которой возникла ошибка.",
      syntax: "ERROR_LINE()",
      example: "SELECT ERROR_LINE();",
      arguments: [
        { name: "Example 1", description: "Использование в блоке CATCH.", example: "BEGIN CATCH SELECT ERROR_LINE() AS ErrorLine; END CATCH" },
        { name: "Example 2", description: "Логирование места ошибки.", example: "INSERT INTO ErrorLog (Line) VALUES (ERROR_LINE());" },
        { name: "Example 3", description: "Формирование отчета об ошибке.", example: "PRINT 'Error on line: ' + CAST(ERROR_LINE() AS VARCHAR);" }
      ]
    },
    {
      id: "tsql_error_message",
      name: "ERROR_MESSAGE()",
      category: "Обработка ошибок",
      description: "Возвращает текст сообщения об ошибке.",
      syntax: "ERROR_MESSAGE()",
      example: "SELECT ERROR_MESSAGE();",
      arguments: [
        { name: "Example 1", description: "Вывод текста ошибки пользователю.", example: "BEGIN CATCH SELECT ERROR_MESSAGE() AS Msg; END CATCH" },
        { name: "Example 2", description: "Сохранение сообщения в таблицу логов.", example: "INSERT INTO Logs (Message) VALUES (ERROR_MESSAGE());" },
        { name: "Example 3", description: "Комбинирование с другими данными.", example: "PRINT 'Error: ' + ERROR_MESSAGE();" }
      ]
    },
    {
      id: "tsql_error_number",
      name: "ERROR_NUMBER()",
      category: "Обработка ошибок",
      description: "Возвращает номер ошибки.",
      syntax: "ERROR_NUMBER()",
      example: "SELECT ERROR_NUMBER();",
      arguments: [
        { name: "Example 1", description: "Проверка конкретного кода ошибки.", example: "IF ERROR_NUMBER() = 2627 PRINT 'PK Violation';" },
        { name: "Example 2", description: "Условная логика в CATCH.", example: "CASE WHEN ERROR_NUMBER() = 547 THEN 'FK Error' END" },
        { name: "Example 3", description: "Идентификация типа сбоя.", example: "SELECT ERROR_NUMBER() AS Code;" }
      ]
    },
    {
      id: "tsql_error_procedure",
      name: "ERROR_PROCEDURE()",
      category: "Обработка ошибок",
      description: "Возвращает имя хранимой процедуры или триггера, в котором произошла ошибка.",
      syntax: "ERROR_PROCEDURE()",
      example: "SELECT ERROR_PROCEDURE();",
      arguments: [
        { name: "Example 1", description: "Определение проблемной процедуры.", example: "SELECT ISNULL(ERROR_PROCEDURE(), 'Ad-hoc batch');" },
        { name: "Example 2", description: "Логирование источника сбоя.", example: "INSERT INTO ErrorLog (ProcName) VALUES (ERROR_PROCEDURE());" },
        { name: "Example 3", description: "Использование в уведомлениях.", example: "PRINT 'Error in: ' + ERROR_PROCEDURE();" }
      ]
    },
    {
      id: "tsql_error_severity",
      name: "ERROR_SEVERITY()",
      category: "Обработка ошибок",
      description: "Возвращает степень серьезности ошибки.",
      syntax: "ERROR_SEVERITY()",
      example: "SELECT ERROR_SEVERITY();",
      arguments: [
        { name: "Example 1", description: "Проверка критичности ошибки.", example: "IF ERROR_SEVERITY() > 16 PRINT 'Critical Error';" },
        { name: "Example 2", description: "Фильтрация логов по степени важности.", example: "WHERE ERROR_SEVERITY() BETWEEN 11 AND 16" },
        { name: "Example 3", description: "Отправка уведомлений при высоком уровне.", example: "IF ERROR_SEVERITY() >= 20 EXEC sp_send_dbmail..." }
      ]
    },
    {
      id: "tsql_error_state",
      name: "ERROR_STATE()",
      category: "Обработка ошибок",
      description: "Возвращает номер состояния ошибки.",
      syntax: "ERROR_STATE()",
      example: "SELECT ERROR_STATE();",
      arguments: [
        { name: "Example 1", description: "Получение кода состояния.", example: "SELECT ERROR_STATE() AS StateCode;" },
        { name: "Example 2", description: "Различение однотипных ошибок.", example: "PRINT 'State: ' + CAST(ERROR_STATE() AS VARCHAR);" },
        { name: "Example 3", description: "Логирование для службы поддержки.", example: "INSERT INTO DebugInfo (State) VALUES (ERROR_STATE());" }
      ]
    },
    {
      id: "tsql_formatmessage",
      name: "FORMATMESSAGE()",
      category: "Обработка ошибок",
      description: "Формирует сообщение из существующего сообщения в sys.messages или из предоставленной строки.",
      syntax: "FORMATMESSAGE(message_string [, argument [, ...]])",
      example: "SELECT FORMATMESSAGE('Error %d in %s', 10, 'App');",
      arguments: [
        { name: "Example 1", description: "Форматирование текста с параметрами.", example: "SELECT FORMATMESSAGE('User %s not found', @name);" },
        { name: "Example 2", description: "Использование системного сообщения.", example: "SELECT FORMATMESSAGE(50001, 'Param1');" },
        { name: "Example 3", description: "Генерация текста для RAISEERROR.", example: "SET @msg = FORMATMESSAGE('ID %d is invalid', @id);" }
      ]
    },
    {
      id: "tsql_case",
      name: "CASE",
      category: "Условные выражения",
      description: "Вычисляет список условий и возвращает одно из нескольких возможных выражений результата.",
      syntax: "CASE [expression]\n  WHEN value1 THEN result1\n  WHEN value2 THEN result2\n  [ELSE default_result]\nEND",
      example: "SELECT name, \nCASE \n  WHEN salary > 5000 THEN 'High' \n  ELSE 'Normal' \nEND as SalaryLevel \nFROM employees;",
      arguments: [
        { name: "Simple CASE", description: "Сравнивает выражение с набором простых выражений для определения результата.", example: "CASE dept_id WHEN 1 THEN 'IT' WHEN 2 THEN 'HR' END" },
        { name: "Searched CASE", description: "Вычисляет набор логических выражений для определения результата.", example: "CASE WHEN score >= 90 THEN 'A' WHEN score >= 80 THEN 'B' END" },
        { name: "ELSE", description: "Значение, возвращаемое если ни одно условие не выполнено. Если ELSE опущен, вернется NULL.", example: "ELSE 'Unknown'" }
      ]
    },
    {
      id: "tsql_iif",
      name: "IIF()",
      category: "Условные выражения",
      description: "Возвращает одно из двух значений в зависимости от того, является ли логическое выражение истинным или ложным в SQL Server.",
      syntax: "IIF(boolean_expression, true_value, false_value)",
      example: "SELECT IIF(stock > 0, 'In Stock', 'Out of Stock');",
      arguments: [
        { name: "boolean_expression", description: "Любое допустимое логическое выражение.", example: "age >= 18" },
        { name: "Shorthand", description: "Является сокращенным способом написания выражения CASE.", example: "IIF(a > b, a, b)" },
        { name: "Nesting", description: "Функции IIF можно вкладывать друг в друга.", example: "IIF(val > 10, 'Big', IIF(val > 5, 'Mid', 'Small'))" }
      ]
    },
    {
      id: "tsql_isnull",
      name: "ISNULL()",
      category: "Обработка NULL",
      description: "Заменяет NULL указанным значением замещения.",
      syntax: "ISNULL(expression, replacement_value)",
      example: "SELECT ISNULL(phone, 'No Phone');",
      arguments: [
        { name: "expression", description: "Выражение, проверяемое на наличие NULL.", example: "middle_name" },
        { name: "replacement_value", description: "Значение, возвращаемое если выражение равно NULL.", example: "''" },
        { name: "Data Consistency", description: "Позволяет избежать пустых значений в отчетах.", example: "SELECT ISNULL(SUM(total), 0)" }
      ]
    },
    {
      id: "tsql_coalesce",
      name: "COALESCE()",
      category: "Обработка NULL",
      description: "Возвращает первое выражение из списка, не равное NULL.",
      syntax: "COALESCE(expression1, expression2 [, expression3 ...])",
      example: "SELECT COALESCE(work_phone, home_phone, mobile_phone, 'N/A');",
      arguments: [
        { name: "Multiple arguments", description: "Принимает неограниченное количество аргументов.", example: "COALESCE(a, b, c, d, e)" },
        { name: "Standard", description: "Является стандартной функцией ANSI SQL (в отличие от ISNULL).", example: "COALESCE(bonus, 0)" },
        { name: "Logic", description: "Проверяет аргументы по порядку слева направо.", example: "COALESCE(NULL, NULL, 5, 10) -- вернет 5" }
      ]
    },
    {
      id: "tsql_nullif",
      name: "NULLIF()",
      category: "Обработка NULL",
      description: "Возвращает NULL, если два указанных выражения эквивалентны.",
      syntax: "NULLIF(expression1, expression2)",
      example: "SELECT NULLIF(current_val, old_val);",
      arguments: [
        { name: "Division by zero", description: "Часто используется для предотвращения деления на ноль.", example: "SELECT total / NULLIF(count, 0)" },
        { name: "Logic", description: "Если выражения не равны, возвращается первое выражение.", example: "NULLIF(10, 20) -- вернет 10" },
        { name: "Cleanup", description: "Позволяет заменить пустые строки или 'магические числа' на NULL.", example: "NULLIF(status, '')" }
      ]
    },
    {
      id: "tsql_choose",
      name: "CHOOSE()",
      category: "Условные выражения",
      description: "Возвращает элемент по указанному индексу из списка значений.",
      syntax: "CHOOSE(index, value1, value2 [, ...])",
      example: "SELECT CHOOSE(2, 'Silver', 'Gold', 'Platinum'); -- 'Gold'",
      arguments: [
        { name: "index", description: "Целое число, представляющее индекс (начинается с 1).", example: "MONTH(GETDATE())" },
        { name: "Example 1", description: "Преобразование номера квартала в название.", example: "SELECT CHOOSE(q_num, 'Q1', 'Q2', 'Q3', 'Q4')" },
        { name: "Example 2", description: "Динамический выбор значения.", example: "SELECT CHOOSE(priority_id, 'Low', 'Medium', 'High')" },
        { name: "Out of range", description: "Если индекс вне диапазона или NULL, возвращается NULL.", example: "CHOOSE(5, 'A', 'B')" }
      ]
    },
    {
      id: "tsql_replace",
      name: "REPLACE()",
      category: "Строковые функции",
      description: "Заменяет все вхождения указанной подстроки на новую подстроку.",
      syntax: "REPLACE(string, old_pattern, new_pattern)",
      example: "SELECT REPLACE('Apple Pie', 'Apple', 'Cherry'); -- 'Cherry Pie'",
      arguments: [
        { name: "Global", description: "Заменяет все вхождения, а не только первое.", example: "REPLACE('1-2-3', '-', '.') -- '1.2.3'" },
        { name: "Cleanup", description: "Используется для удаления символов (замена на пустую строку).", example: "REPLACE(phone, '(', '')" },
        { name: "Type", description: "Чувствительность к регистру зависит от параметров сортировки БД.", example: "REPLACE(text, 'SQL', 'sql')" }
      ]
    },
    {
      id: "tsql_translate",
      name: "TRANSLATE()",
      category: "Строковые функции",
      description: "Заменяет набор символов в строке на другой набор (посимвольно).",
      syntax: "TRANSLATE(string, from_chars, to_chars)",
      example: "SELECT TRANSLATE('2*[3+4]', '[]', '()'); -- '2*(3+4)'",
      arguments: [
        { name: "Mapping", description: "Первый символ из from_chars заменяется на первый из to_chars и т.д.", example: "TRANSLATE('abc', 'abc', '123') -- '123'" },
        { name: "Efficiency", description: "Заменяет несколько вложенных REPLACE.", example: "TRANSLATE(phone, '()-', '   ')" },
        { name: "Mismatch", description: "from_chars и to_chars должны быть одинаковой длины.", example: "ОШИБКА если длины разные" }
      ]
    },
    {
      id: "tsql_reverse",
      name: "REVERSE()",
      category: "Строковые функции",
      description: "Разворачивает строку задом наперед.",
      syntax: "REVERSE(character_expression)",
      example: "SELECT REVERSE('SQL'); -- 'LQS'",
      arguments: [
        { name: "Logic", description: "Полезно для поиска расширений файлов или работы с путями.", example: "REVERSE(file_path)" },
        { name: "Palindrome", description: "Проверка, является ли слово палиндромом.", example: "WHERE word = REVERSE(word)" },
        { name: "Strings", description: "Работает с любыми строковыми типами.", example: "REVERSE(N'Привет')" }
      ]
    },
    {
      id: "tsql_concat",
      name: "CONCAT()",
      category: "Строковые функции",
      description: "Объединяет несколько строк в одну. Автоматически обрабатывает NULL (как пустые строки).",
      syntax: "CONCAT(string1, string2 [, ...])",
      example: "SELECT CONCAT('Hello', ' ', 'World'); -- 'Hello World'",
      arguments: [
        { name: "NULL Handling", description: "В отличие от +, не превращает результат в NULL, если один операнд NULL.", example: "CONCAT('User: ', NULL) -- 'User: '" },
        { name: "Variable Args", description: "Принимает от 2 до 254 аргументов.", example: "CONCAT(a, b, c, d)" },
        { name: "Implicit Cast", description: "Приводит числа к строкам автоматически.", example: "CONCAT('ID: ', 101)" }
      ]
    },
    {
      id: "tsql_concat_ws",
      name: "CONCAT_WS()",
      category: "Строковые функции",
      description: "Объединяет строки с указанным разделителем. Пропускает NULL значения.",
      syntax: "CONCAT_WS(separator, string1, string2 [, ...])",
      example: "SELECT CONCAT_WS(', ', 'Apples', 'Oranges', 'Bananas'); -- 'Apples, Oranges, Bananas'",
      arguments: [
        { name: "separator", description: "Первый аргумент — разделитель.", example: "CONCAT_WS('-', '2024', '01', '01')" },
        { name: "NULL values", description: "NULL просто игнорируются, разделитель для них не ставится.", example: "CONCAT_WS('/', 'a', NULL, 'b') -- 'a/b'" },
        { name: "CSV", description: "Идеально для формирования CSV-строк или адресов.", example: "CONCAT_WS(' ', city, street, house)" }
      ]
    },
    {
      id: "tsql_left",
      name: "LEFT()",
      category: "Строковые функции",
      description: "Возвращает указанное количество символов с начала строки.",
      syntax: "LEFT(character_expression, count)",
      example: "SELECT LEFT('SQL Server', 3); -- 'SQL'",
      arguments: [
        { name: "count", description: "Число символов слева.", example: "LEFT(product_code, 2)" },
        { name: "Dynamic", description: "Может использоваться с результатами функций поиска.", example: "LEFT(email, CHARINDEX('@', email)-1)" },
        { name: "Safety", description: "Если count больше длины строки, возвращается вся строка.", example: "LEFT('abc', 10) -- 'abc'" }
      ]
    },
    {
      id: "tsql_right",
      name: "RIGHT()",
      category: "Строковые функции",
      description: "Возвращает указанное количество символов с конца строки.",
      syntax: "RIGHT(character_expression, count)",
      example: "SELECT RIGHT('SQL Server', 6); -- 'Server'",
      arguments: [
        { name: "count", description: "Число символов справа.", example: "RIGHT(file_path, 3) -- расширение" },
        { name: "Validation", description: "Проверка последних цифр номера или карты.", example: "RIGHT(card_number, 4)" },
        { name: "Index", description: "Часто применяется для извлечения суффиксов.", example: "RIGHT(full_name, 5)" }
      ]
    },
    {
      id: "tsql_space",
      name: "SPACE()",
      category: "Строковые функции",
      description: "Возвращает строку, состоящую из указанного количества пробелов.",
      syntax: "SPACE(count)",
      example: "SELECT 'Hello' + SPACE(5) + 'World';",
      arguments: [
        { name: "count", description: "Количество пробелов.", example: "SPACE(10)" },
        { name: "Padding", description: "Используется для ручного выравнивания в отчетах.", example: "SELECT name + SPACE(20 - LEN(name))" },
        { name: "Limit", description: "Максимальный размер ограничен типами varchar/nvarchar.", example: "SPACE(8000)" }
      ]
    },
    {
      id: "tsql_stuff",
      name: "STUFF()",
      category: "Строковые функции",
      description: "Удаляет часть строки и вставляет на ее место новую подстроку.",
      syntax: "STUFF(expression, start, length, new_string)",
      example: "SELECT STUFF('ABCDEFG', 2, 3, '123'); -- 'A123EFG'",
      arguments: [
        { name: "start", description: "Позиция начала изменений.", example: "STUFF(phone, 1, 0, '+')" },
        { name: "length", description: "Сколько символов удалить (0 - только вставка).", example: "STUFF(code, 4, 1, '-')" },
        { name: "XML", description: "Часто используется для удаления первого разделителя при агрегации в XML.", example: "STUFF((SELECT ...), 1, 1, '')" }
      ]
    },
    {
      id: "tsql_char",
      name: "CHAR()",
      category: "Строковые функции",
      description: "Преобразует код ASCII (0-255) в символ.",
      syntax: "CHAR(integer_expression)",
      example: "SELECT CHAR(65); -- 'A'",
      arguments: [
        { name: "Line Break", description: "Вставка переноса строки.", example: "CHAR(13) + CHAR(10) -- CRLF" },
        { name: "Tab", description: "Вставка символа табуляции.", example: "CHAR(9)" },
        { name: "Non-printable", description: "Позволяет использовать непечатные символы.", example: "CHAR(7) -- звуковой сигнал" }
      ]
    },
    {
      id: "tsql_ascii",
      name: "ASCII()",
      category: "Строковые функции",
      description: "Возвращает ASCII-код первого символа строки.",
      syntax: "ASCII(character_expression)",
      example: "SELECT ASCII('A'); -- 65",
      arguments: [
        { name: "First only", description: "Если в строке несколько символов, берется только первый.", example: "ASCII('ABC') -- 65" },
        { name: "Range", description: "Возвращает значения от 0 до 255.", example: "ASCII('z')" },
        { name: "Check", description: "Полезно для проверки типа символа (цифра, буква).", example: "WHERE ASCII(char) BETWEEN 48 AND 57" }
      ]
    },
    {
      id: "tsql_unicode",
      name: "UNICODE()",
      category: "Строковые функции",
      description: "Возвращает целочисленное значение Unicode для первого символа строки.",
      syntax: "UNICODE(character_expression)",
      example: "SELECT UNICODE(N'П'); -- 1055",
      arguments: [
        { name: "Multi-byte", description: "В отличие от ASCII, поддерживает национальные символы.", example: "UNICODE(N'Ω')" },
        { name: "N prefix", description: "Рекомендуется использовать с префиксом N для строк.", example: "UNICODE(N'string')" },
        { name: "Standard", description: "Возвращает значение по стандарту UCS-2.", example: "UNICODE(char)" }
      ]
    },
    {
      id: "tsql_nchar",
      name: "NCHAR()",
      category: "Строковые функции",
      description: "Возвращает Unicode-символ по его коду.",
      syntax: "NCHAR(integer_expression)",
      example: "SELECT NCHAR(1055); -- 'П'",
      arguments: [
        { name: "National", description: "Позволяет вставлять любые символы Unicode.", example: "NCHAR(8482) -- ™" },
        { name: "Range", description: "Поддерживает значения от 0 до 65535.", example: "NCHAR(9731) -- снеговик" },
        { name: "Reports", description: "Удобно для добавления спецсимволов в отчеты.", example: "NCHAR(10003) -- галочка" }
      ]
    },
    {
      id: "tsql_format",
      name: "FORMAT()",
      category: "Строковые функции",
      description: "Форматирует значение (дату или число) с использованием указанного шаблона и региональных настроек.",
      syntax: "FORMAT(value, format_string [, culture])",
      example: "SELECT FORMAT(GETDATE(), 'dd/MM/yyyy'); -- '03/01/2026'",
      arguments: [
        { name: "Currency", description: "Форматирование денежных сумм.", example: "FORMAT(123.45, 'C', 'ru-RU')" },
        { name: "Percent", description: "Вывод процентов.", example: "FORMAT(0.75, 'P')" },
        { name: "Performance", description: "Работает медленнее чем CONVERT, использовать осторожно в больших запросах.", example: "FORMAT(val, 'N2')" }
      ]
    },
    {
      id: "tsql_soundex",
      name: "SOUNDEX()",
      category: "Строковые функции",
      description: "Возвращает четырехсимвольный код, основанный на звучании строки (на английском языке).",
      syntax: "SOUNDEX(character_expression)",
      example: "SELECT SOUNDEX('Smith'), SOUNDEX('Smyth'); -- 'S530', 'S530'",
      arguments: [
        { name: "Phonetic", description: "Позволяет искать похожие по звучанию фамилии.", example: "WHERE SOUNDEX(name) = SOUNDEX('Johnson')" },
        { name: "Limits", description: "Работает эффективно в основном для английской фонетики.", example: "SOUNDEX('Example')" },
        { name: "Fixed", description: "Всегда возвращает 4 символа (буква + 3 цифры).", example: "SOUNDEX('A')" }
      ]
    },
    {
      id: "tsql_difference",
      name: "DIFFERENCE()",
      category: "Строковые функции",
      description: "Сравнивает коды SOUNDEX двух строк и возвращает степень их сходства (от 0 до 4).",
      syntax: "DIFFERENCE(expr1, expr2)",
      example: "SELECT DIFFERENCE('Smith', 'Smyth'); -- 4 (полное совпадение)",
      arguments: [
        { name: "Scale", description: "4 — очень похожи, 0 — совсем разные.", example: "DIFFERENCE('Apple', 'Orange') -- 1" },
        { name: "Search", description: "Используется для нечеткого поиска людей.", example: "WHERE DIFFERENCE(name, @input) >= 3" },
        { name: "Fuzzy", description: "Хорошо работает для имен с опечатками.", example: "DIFFERENCE('Petrov', 'Pietrov')" }
      ]
    },
    {
      id: "tsql_concat_ws",
      name: "CONCAT_WS()",
      category: "Строковые функции",
      description: "Объединяет строки с указанным разделителем. Пропускает NULL значения.",
      syntax: "CONCAT_WS(separator, string1, string2 [, ...])",
      example: "SELECT CONCAT_WS(', ', 'Apples', 'Oranges', 'Bananas'); -- 'Apples, Oranges, Bananas'",
      arguments: [
        { name: "separator", description: "Первый аргумент — разделитель.", example: "CONCAT_WS('-', '2024', '01', '01')" },
        { name: "NULL values", description: "NULL просто игнорируются, разделитель для них не ставится.", example: "CONCAT_WS('/', 'a', NULL, 'b') -- 'a/b'" },
        { name: "CSV", description: "Идеально для формирования CSV-строк или адресов.", example: "CONCAT_WS(' ', city, street, house)" }
      ]
    },
    {
      id: "tsql_left",
      name: "LEFT()",
      category: "Строковые функции",
      description: "Возвращает указанное количество символов с начала строки.",
      syntax: "LEFT(character_expression, count)",
      example: "SELECT LEFT('SQL Server', 3); -- 'SQL'",
      arguments: [
        { name: "count", description: "Число символов слева.", example: "LEFT(product_code, 2)" },
        { name: "Dynamic", description: "Может использоваться с результатами функций поиска.", example: "LEFT(email, CHARINDEX('@', email)-1)" },
        { name: "Safety", description: "Если count больше длины строки, возвращается вся строка.", example: "LEFT('abc', 10) -- 'abc'" }
      ]
    },
    {
      id: "tsql_right",
      name: "RIGHT()",
      category: "Строковые функции",
      description: "Возвращает указанное количество символов с конца строки.",
      syntax: "RIGHT(character_expression, count)",
      example: "SELECT RIGHT('SQL Server', 6); -- 'Server'",
      arguments: [
        { name: "count", description: "Число символов справа.", example: "RIGHT(file_path, 3) -- расширение" },
        { name: "Validation", description: "Проверка последних цифр номера или карты.", example: "RIGHT(card_number, 4)" },
        { name: "Index", description: "Часто применяется для извлечения суффиксов.", example: "RIGHT(full_name, 5)" }
      ]
    },
    {
      id: "tsql_space",
      name: "SPACE()",
      category: "Строковые функции",
      description: "Возвращает строку, состоящую из указанного количества пробелов.",
      syntax: "SPACE(count)",
      example: "SELECT 'Hello' + SPACE(5) + 'World';",
      arguments: [
        { name: "count", description: "Количество пробелов.", example: "SPACE(10)" },
        { name: "Padding", description: "Используется для ручного выравнивания в отчетах.", example: "SELECT name + SPACE(20 - LEN(name))" },
        { name: "Limit", description: "Максимальный размер ограничен типами varchar/nvarchar.", example: "SPACE(8000)" }
      ]
    },
    {
      id: "tsql_stuff",
      name: "STUFF()",
      category: "Строковые функции",
      description: "Удаляет часть строки и вставляет на ее место новую подстроку.",
      syntax: "STUFF(expression, start, length, new_string)",
      example: "SELECT STUFF('ABCDEFG', 2, 3, '123'); -- 'A123EFG'",
      arguments: [
        { name: "start", description: "Позиция начала изменений.", example: "STUFF(phone, 1, 0, '+')" },
        { name: "length", description: "Сколько символов удалить (0 - только вставка).", example: "STUFF(code, 4, 1, '-')" },
        { name: "XML", description: "Часто используется для удаления первого разделителя при агрегации в XML.", example: "STUFF((SELECT ...), 1, 1, '')" }
      ]
    },
    {
      id: "tsql_char",
      name: "CHAR()",
      category: "Строковые функции",
      description: "Преобразует код ASCII (0-255) в символ.",
      syntax: "CHAR(integer_expression)",
      example: "SELECT CHAR(65); -- 'A'",
      arguments: [
        { name: "Line Break", description: "Вставка переноса строки.", example: "CHAR(13) + CHAR(10) -- CRLF" },
        { name: "Tab", description: "Вставка символа табуляции.", example: "CHAR(9)" },
        { name: "Non-printable", description: "Позволяет использовать непечатные символы.", example: "CHAR(7) -- звуковой сигнал" }
      ]
    },
    {
      id: "tsql_ascii",
      name: "ASCII()",
      category: "Строковые функции",
      description: "Возвращает ASCII-код первого символа строки.",
      syntax: "ASCII(character_expression)",
      example: "SELECT ASCII('A'); -- 65",
      arguments: [
        { name: "First only", description: "Если в строке несколько символов, берется только первый.", example: "ASCII('ABC') -- 65" },
        { name: "Range", description: "Возвращает значения от 0 до 255.", example: "ASCII('z')" },
        { name: "Check", description: "Полезно для проверки типа символа (цифра, буква).", example: "WHERE ASCII(char) BETWEEN 48 AND 57" }
      ]
    },
    {
      id: "tsql_unicode",
      name: "UNICODE()",
      category: "Строковые функции",
      description: "Возвращает целочисленное значение Unicode для первого символа строки.",
      syntax: "UNICODE(character_expression)",
      example: "SELECT UNICODE(N'П'); -- 1055",
      arguments: [
        { name: "Multi-byte", description: "В отличие от ASCII, поддерживает национальные символы.", example: "UNICODE(N'Ω')" },
        { name: "N prefix", description: "Рекомендуется использовать с префиксом N для строк.", example: "UNICODE(N'string')" },
        { name: "Standard", description: "Возвращает значение по стандарту UCS-2.", example: "UNICODE(char)" }
      ]
    },
    {
      id: "tsql_nchar",
      name: "NCHAR()",
      category: "Строковые функции",
      description: "Возвращает Unicode-символ по его коду.",
      syntax: "NCHAR(integer_expression)",
      example: "SELECT NCHAR(1055); -- 'П'",
      arguments: [
        { name: "National", description: "Позволяет вставлять любые символы Unicode.", example: "NCHAR(8482) -- ™" },
        { name: "Range", description: "Поддерживает значения от 0 до 65535.", example: "NCHAR(9731) -- снеговик" },
        { name: "Reports", description: "Удобно для добавления спецсимволов в отчеты.", example: "NCHAR(10003) -- галочка" }
      ]
    },
    {
      id: "tsql_format",
      name: "FORMAT()",
      category: "Строковые функции",
      description: "Форматирует значение (дату или число) с использованием указанного шаблона и региональных настроек.",
      syntax: "FORMAT(value, format_string [, culture])",
      example: "SELECT FORMAT(GETDATE(), 'dd/MM/yyyy'); -- '03/01/2026'",
      arguments: [
        { name: "Currency", description: "Форматирование денежных сумм.", example: "FORMAT(123.45, 'C', 'ru-RU')" },
        { name: "Percent", description: "Вывод процентов.", example: "FORMAT(0.75, 'P')" },
        { name: "Performance", description: "Работает медленнее чем CONVERT, использовать осторожно в больших запросах.", example: "FORMAT(val, 'N2')" }
      ]
    },
    {
      id: "tsql_soundex",
      name: "SOUNDEX()",
      category: "Строковые функции",
      description: "Возвращает четырехсимвольный код, основанный на звучании строки (на английском языке).",
      syntax: "SOUNDEX(character_expression)",
      example: "SELECT SOUNDEX('Smith'), SOUNDEX('Smyth'); -- 'S530', 'S530'",
      arguments: [
        { name: "Phonetic", description: "Позволяет искать похожие по звучанию фамилии.", example: "WHERE SOUNDEX(name) = SOUNDEX('Johnson')" },
        { name: "Limits", description: "Работает эффективно в основном для английской фонетики.", example: "SOUNDEX('Example')" },
        { name: "Fixed", description: "Всегда возвращает 4 символа (буква + 3 цифры).", example: "SOUNDEX('A')" }
      ]
    },
    {
      id: "tsql_difference",
      name: "DIFFERENCE()",
      category: "Строковые функции",
      description: "Сравнивает коды SOUNDEX двух строк и возвращает степень их сходства (от 0 до 4).",
      syntax: "DIFFERENCE(expr1, expr2)",
      example: "SELECT DIFFERENCE('Smith', 'Smyth'); -- 4 (полное совпадение)",
      arguments: [
        { name: "Scale", description: "4 — очень похожи, 0 — совсем разные.", example: "DIFFERENCE('Apple', 'Orange') -- 1" },
        { name: "Search", description: "Используется для нечеткого поиска людей.", example: "WHERE DIFFERENCE(name, @input) >= 3" },
        { name: "Fuzzy", description: "Хорошо работает для имен с опечатками.", example: "DIFFERENCE('Petrov', 'Pietrov')" }
      ]
    },
    {
      id: "tsql_like",
      name: "LIKE",
      category: "Сопоставление с шаблоном",
      description: "Определяет, соответствует ли указанная строка символов заданному шаблону.",
      syntax: "character_expression [NOT] LIKE pattern [ESCAPE escape_character]",
      example: "SELECT name FROM users WHERE name LIKE 'A%'; -- Имена на букву A",
      arguments: [
        { name: "% (процент)", description: "Заменяет любую строку из нуля или более символов.", example: "LIKE '%phone%'" },
        { name: "_ (подчеркивание)", description: "Заменяет любой одиночный символ.", example: "LIKE 'sh_p' -- ship, shop" },
        { name: "[] (набор)", description: "Любой одиночный символ из указанного диапазона или набора.", example: "LIKE '[m-p]%' -- начинается с m, n, o, p" },
        { name: "[^] (исключение)", description: "Любой одиночный символ, не входящий в указанный диапазон или набор.", example: "LIKE '[^a-c]%' -- не начинается с a, b, c" },
        { name: "ESCAPE", description: "Позволяет искать символы, которые обычно являются подстановочными.", example: "LIKE '%50!%%' ESCAPE '!'" }
      ]
    },
    {
      id: "tsql_abs",
      name: "ABS()",
      category: "Числовые функции",
      description: "Возвращает абсолютное значение (модуль) заданного числового выражения.",
      syntax: "ABS(numeric_expression)",
      example: "SELECT ABS(-15.5); -- 15.5",
      arguments: [
        { name: "expression", description: "Числовое выражение любого типа, кроме bit.", example: "ABS(balance)" },
        { name: "Calculation", description: "Используется для нахождения разницы без учета знака.", example: "SELECT ABS(val1 - val2)" },
        { name: "Types", description: "Тип возвращаемого значения совпадает с типом входного.", example: "ABS(-10) -- int" }
      ]
    },
    {
      id: "tsql_ceiling",
      name: "CEILING() | CEIL()",
      category: "Числовые функции",
      description: "Возвращает наименьшее целое число, которое больше или равно заданному числовому выражению.",
      syntax: "CEILING(numeric_expression)",
      example: "SELECT CEILING(12.1); -- 13",
      arguments: [
        { name: "CEIL", description: "В T-SQL (современных версиях) является синонимом CEILING.", example: "CEIL(12.1)" },
        { name: "Negative", description: "Для отрицательных чисел округляет 'в сторону нуля'.", example: "CEILING(-12.9) -- -12" },
        { name: "Usage", description: "Полезно при расчете количества страниц или целых единиц товара.", example: "CEILING(total_items / items_per_page)" }
      ]
    },
    {
      id: "tsql_floor",
      name: "FLOOR()",
      category: "Числовые функции",
      description: "Возвращает наибольшее целое число, которое меньше или равно заданному числовому выражению.",
      syntax: "FLOOR(numeric_expression)",
      example: "SELECT FLOOR(12.9); -- 12",
      arguments: [
        { name: "expression", description: "Числовое выражение.", example: "FLOOR(price)" },
        { name: "Negative", description: "Для отрицательных чисел округляет 'от нуля'.", example: "FLOOR(-12.1) -- -13" },
        { name: "Rounding", description: "Всегда округляет вниз до ближайшего целого.", example: "FLOOR(5.7)" }
      ]
    },
    {
      id: "tsql_round",
      name: "ROUND()",
      category: "Числовые функции",
      description: "Возвращает числовое значение, округленное до указанной длины или точности.",
      syntax: "ROUND(numeric_expression, length [, function])",
      example: "SELECT ROUND(123.456, 2); -- 123.460",
      arguments: [
        { name: "length", description: "Точность округления. Если положительное — число знаков после запятой, если отрицательное — до запятой.", example: "ROUND(123.45, -1) -- 120.00" },
        { name: "function", description: "Если 0 (по умолчанию) — округление. Если не 0 — усечение.", example: "ROUND(123.45, 1, 1) -- 123.40 (усечение)" },
        { name: "Precision", description: "Тип результата зависит от входного выражения.", example: "ROUND(cast(10.555 as float), 1)" }
      ]
    },
    {
      id: "tsql_truncate",
      name: "TRUNCATE()",
      category: "Числовые функции",
      description: "Усекает число до указанного количества десятичных знаков. В T-SQL обычно реализуется через ROUND с третьим параметром.",
      syntax: "TRUNCATE(numeric_expression, digits) -- Или ROUND(expr, digits, 1)",
      example: "SELECT ROUND(150.75, 0, 1); -- 150.00",
      arguments: [
        { name: "digits", description: "Количество знаков, которые нужно оставить.", example: "ROUND(10.99, 0, 1) -- 10" },
        { name: "Alternative", description: "В отличие от ROUND(..., 0), не округляет к ближайшему, а просто отбрасывает.", example: "TRUNCATE(9.9) -- 9" },
        { name: "Type Cast", description: "Иногда реализуется через приведение к целому типу.", example: "CAST(10.9 AS INT)" }
      ]
    },
    {
      id: "tsql_sign",
      name: "SIGN()",
      category: "Числовые функции",
      description: "Возвращает положительный (+1), нулевой (0) или отрицательный (-1) знак заданного выражения.",
      syntax: "SIGN(numeric_expression)",
      example: "SELECT SIGN(-50); -- -1",
      arguments: [
        { name: "Zero", description: "Возвращает 0, если входное значение равно 0.", example: "SIGN(0) -- 0" },
        { name: "Positive", description: "Возвращает 1 для любого положительного числа.", example: "SIGN(123.45) -- 1" },
        { name: "Logic", description: "Удобно для группировки данных по направлению движения (доход/расход).", example: "GROUP BY SIGN(transaction_amount)" }
      ]
    },
    {
      id: "tsql_power",
      name: "POWER()",
      category: "Числовые функции",
      description: "Возводит указанное выражение в указанную степень.",
      syntax: "POWER(numeric_expression, power)",
      example: "SELECT POWER(2, 3); -- 8",
      arguments: [
        { name: "base", description: "Число, которое нужно возвести в степень.", example: "POWER(10, 2)" },
        { name: "exponent", description: "Показатель степени.", example: "POWER(val, 0.5) -- корень квадратный" },
        { name: "Types", description: "Возвращает тот же тип, что и base (если не float).", example: "POWER(2.0, 3)" }
      ]
    },
    {
      id: "tsql_sqrt",
      name: "SQRT()",
      category: "Числовые функции",
      description: "Возвращает квадратный корень из заданного числа с плавающей запятой.",
      syntax: "SQRT(float_expression)",
      example: "SELECT SQRT(64); -- 8",
      arguments: [
        { name: "expression", description: "Число, из которого извлекается корень (должно быть >= 0).", example: "SQRT(area)" },
        { name: "Error", description: "Вызывает ошибку при попытке извлечь корень из отрицательного числа.", example: "SQRT(-1) -- Error" },
        { name: "Type", description: "Всегда возвращает тип float.", example: "SELECT SQRT(cast(25 as int))" }
      ]
    },
    {
      id: "tsql_square",
      name: "SQUARE()",
      category: "Числовые функции",
      description: "Возвращает квадрат заданного числа с плавающей запятой.",
      syntax: "SQUARE(float_expression)",
      example: "SELECT SQUARE(5); -- 25",
      arguments: [
        { name: "expression", description: "Число для возведения в квадрат.", example: "SQUARE(radius)" },
        { name: "Math", description: "Эквивалентно POWER(expr, 2).", example: "SQUARE(10)" },
        { name: "Result", description: "Возвращает тип float.", example: "SQUARE(cast(4 as float))" }
      ]
    },
    {
      id: "tsql_rand",
      name: "RAND()",
      category: "Числовые функции",
      description: "Возвращает случайное число типа float от 0 до 1 (исключая границы).",
      syntax: "RAND([seed])",
      example: "SELECT RAND(); -- Например, 0.713...",
      arguments: [
        { name: "seed", description: "Целочисленное выражение (зерно), обеспечивающее повторяемость.", example: "RAND(123) -- всегда один и тот же результат" },
        { name: "Range", description: "Для получения числа в диапазоне [min, max] используется формула.", example: "SELECT FLOOR(RAND()*(max-min+1)+min)" },
        { name: "Per Query", description: "Внутри одного запроса RAND() без seed возвращает одно и то же число для всех строк.", example: "SELECT RAND() FROM table -- одно число везде" }
      ]
    },
    { 
      id: "tsql_avg", 
      name: "AVG()", 
      category: "Агрегатные функции", 
      description: "Вычисляет среднее значение числового столбца.", 
      syntax: "AVG([ALL | DISTINCT] expression)",
      arguments: [
        { name: "ALL", description: "Применяет агрегатную функцию ко всем значениям. По умолчанию.", example: "SELECT AVG(ALL price) FROM products;" },
        { name: "DISTINCT", description: "Вычисляет среднее только для уникальных значений.", example: "SELECT AVG(DISTINCT price) FROM products;" },
        { name: "expression", description: "Столбец или выражение, для которого вычисляется среднее.", example: "SELECT AVG(price * 0.9) FROM products;" }
      ],
      example: "SELECT AVG(price) FROM products;" 
    },
    { 
      id: "tsql_count_all", 
      name: "COUNT(*)", 
      category: "Агрегатные функции", 
      description: "Возвращает общее количество строк в таблице, включая строки с NULL значениями.", 
      syntax: "COUNT(*)",
      example: "SELECT COUNT(*) FROM orders;" 
    },
    { 
      id: "tsql_count", 
      name: "COUNT()", 
      category: "Агрегатные функции", 
      description: "Возвращает количество строк, соответствующих заданному критерию.", 
      syntax: "COUNT([ALL | DISTINCT] expression)",
      arguments: [
        { name: "expression", description: "Выражение для подсчета (имя столбца).", example: "SELECT COUNT(id) FROM products;" }
      ],
      example: "SELECT COUNT(id) FROM users;" 
    },
    { 
      id: "tsql_count_big", 
      name: "COUNT_BIG()", 
      category: "Агрегатные функции", 
      description: "Аналог COUNT, возвращающий значение типа bigint.", 
      syntax: "COUNT_BIG([ALL | DISTINCT] expression | *)",
      example: "SELECT COUNT_BIG(*) FROM huge_table;" 
    },
    { 
      id: "tsql_max", 
      name: "MAX()", 
      category: "Агрегатные функции", 
      description: "Возвращает максимальное значение.", 
      syntax: "MAX([ALL | DISTINCT] expression)",
      example: "SELECT MAX(price) FROM products;" 
    },
    { 
      id: "tsql_min", 
      name: "MIN()", 
      category: "Агрегатные функции", 
      description: "Возвращает минимальное значение.", 
      syntax: "MIN([ALL | DISTINCT] expression)",
      example: "SELECT MIN(price) FROM products;" 
    },
    { 
      id: "tsql_sum", 
      name: "SUM()", 
      category: "Агрегатные функции", 
      description: "Вычисляет сумму значений.", 
      syntax: "SUM([ALL | DISTINCT] expression)",
      example: "SELECT SUM(total) FROM sales;" 
    },
    { 
      id: "tsql_checksum_agg", 
      name: "CHECKSUM_AGG()", 
      category: "Агрегатные функции", 
      description: "Вычисляет контрольную сумму значений в группе.", 
      syntax: "CHECKSUM_AGG([ALL | DISTINCT] expression)",
      example: "SELECT CHECKSUM_AGG(price) FROM inventory;" 
    },
    { 
      id: "tsql_grouping", 
      name: "GROUPING()", 
      category: "Функции группировки", 
      description: "Указывает, является ли столбец агрегированным в ROLLUP/CUBE.", 
      syntax: "GROUPING(column_reference)",
      example: "SELECT category, GROUPING(category) FROM products GROUP BY ROLLUP(category);" 
    },
    { 
      id: "tsql_grouping_id", 
      name: "GROUPING_ID()", 
      category: "Функции группировки", 
      description: "Вычисляет уровень группировки (битовая маска).", 
      syntax: "GROUPING_ID(column_reference [, ...])",
      example: "SELECT GROUPING_ID(cat, subcat) FROM products GROUP BY ROLLUP(cat, subcat);" 
    },
    { 
      id: "tsql_string_agg", 
      name: "STRING_AGG()", 
      category: "Агрегатные функции", 
      description: "Объединяет строки с разделителем.", 
      syntax: "STRING_AGG(expression, separator) [WITHIN GROUP (ORDER BY order_clause)]",
      arguments: [
        { name: "separator", description: "Строка-разделитель.", example: "STRING_AGG(name, ', ')" }
      ],
      example: "SELECT STRING_AGG(name, ', ') WITHIN GROUP (ORDER BY name) FROM tags;" 
    },
    { 
      id: "tsql_approx_count", 
      name: "APPROX_COUNT_DISTINCT()", 
      category: "Агрегатные функции", 
      description: "Приблизительный подсчет уникальных значений (для больших данных).", 
      syntax: "APPROX_COUNT_DISTINCT(expression)",
      example: "SELECT APPROX_COUNT_DISTINCT(user_id) FROM logs;" 
    },
    { 
      id: "tsql_stdev", 
      name: "STDEV()", 
      category: "Агрегатные функции", 
      description: "Стандартное отклонение для выборки.", 
      syntax: "STDEV(expression)",
      example: "SELECT STDEV(score) FROM results;" 
    },
    { 
      id: "tsql_stdevp", 
      name: "STDEVP()", 
      category: "Агрегатные функции", 
      description: "Стандартное отклонение для совокупности.", 
      syntax: "STDEVP(expression)",
      example: "SELECT STDEVP(score) FROM results;" 
    },
    { 
      id: "tsql_var", 
      name: "VAR()", 
      category: "Агрегатные функции", 
      description: "Дисперсия для выборки.", 
      syntax: "VAR(expression)",
      example: "SELECT VAR(amount) FROM sales;" 
    },
    { 
      id: "tsql_varp", 
      name: "VARP()", 
      category: "Агрегатные функции", 
      description: "Дисперсия для совокупности.", 
      syntax: "VARP(expression)",
      example: "SELECT VARP(amount) FROM sales;" 
    },
    { 
      id: "tsql_json_arrayagg", 
      name: "JSON_ARRAYAGG()", 
      category: "JSON функции", 
      description: "Создает JSON-массив из агрегированных данных (SQL Server 2022+).", 
      syntax: "JSON_ARRAYAGG(expression [ORDER BY order_clause])",
      example: "SELECT JSON_ARRAYAGG(name) FROM employees;" 
    }
  ];

export const TSQL = [...SQLGraph, ...TSQL_BASE];
