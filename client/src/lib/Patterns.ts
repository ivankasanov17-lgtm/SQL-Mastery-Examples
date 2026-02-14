export interface Pattern {
  id: number;
  dialect: string;
  title: string;
  description: string;
  code: string;
}

export const Patterns: Pattern[] = [
  {
    id: 1,
    dialect: "SQL",
    title: "anomaly_detection",
    description: "Статистический анализ транзакций для поиска подозрительных операций. Вычисляет отклонение суммы транзакции от среднего значения по пользователю.",
    code: `/*
Сценарий: Выявление аномалий в данных (Z-Score)
Описание:
Статистический анализ транзакций для поиска подозрительных операций.
Вычисляет отклонение суммы транзакции от среднего значения по пользователю.
Продвинутые концепции: Статистические агрегаты (STDDEV), аналитические окна.
*/

SELECT 
    transaction_id,
    user_id,
    amount,
    avg_amount,
    stddev_amount,
    (amount - avg_amount) / NULLIF(stddev_amount, 0) as z_score
FROM (
    SELECT 
        id as transaction_id,
        user_id,
        amount,
        AVG(amount) OVER(PARTITION BY user_id) as avg_amount,
        STDDEV(amount) OVER(PARTITION BY user_id) as stddev_amount
    FROM transactions
) stats
WHERE ABS((amount - avg_amount) / NULLIF(stddev_amount, 0)) > 3;`
  },
  {
    id: 2,
    dialect: "SQL",
    title: "complex_exists",
    description: "Сложная фильтрация с использованием EXISTS и коррелированных подзапросов.",
    code: `/*
Сценарий: Сложная фильтрация с использованием EXISTS и коррелированных подзапросов
Описание:
Выбирает клиентов, которые совершили заказы на сумму более 1000 во всех категориях, где они активны.
Использование EXISTS часто эффективнее, чем JOIN, когда нужно просто проверить наличие записей.
Продвинутые концепции: EXISTS, коррелированные подзапросы, двойное отрицание для логики "для всех".
*/

SELECT c.name, c.email
FROM customers c
WHERE EXISTS (
    SELECT 1 
    FROM orders o 
    WHERE o.customer_id = c.id 
    AND o.total_amount > 1000
)
AND NOT EXISTS (
    SELECT 1 
    FROM categories cat
    WHERE NOT EXISTS (
        SELECT 1 
        FROM products p
        JOIN order_items oi ON oi.product_id = p.id
        JOIN orders o2 ON o2.id = oi.order_id
        WHERE o2.customer_id = c.id 
        AND p.category_id = cat.id
    )
);`
  },
  {
    id: 3,
    dialect: "SQL",
    title: "gaps_and_islands",
    description: "Анализ временных интервалов и пересечений (Gaps and Islands). Поиск непрерывных интервалов активности.",
    code: `/*
Сценарий: Анализ временных интервалов и пересечений (Gaps and Islands)
Описание:
Классическая задача на поиск непрерывных интервалов активности пользователя.
Используется разность между двумя последовательностями рангов для группировки смежных дат.
Продвинутые концепции: Оконные функции (ROW_NUMBER), математическая группировка последовательностей.
*/

WITH GrpDates AS (
    SELECT 
        user_id,
        activity_date,
        -- Разность между датой и порядковым номером дает константу для смежных дат
        activity_date - CAST(ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY activity_date) AS INT) as grp
    FROM user_activity
)
SELECT 
    user_id,
    MIN(activity_date) as start_date,
    MAX(activity_date) as end_date,
    COUNT(*) as streak_length
FROM GrpDates
GROUP BY user_id, grp
ORDER BY streak_length DESC;`
  },
  {
    id: 4,
    dialect: "SQL",
    title: "permission_hierarchy",
    description: "Обработка сложных прав доступа (Hierarchy Flattening). Раскрытие иерархии групп.",
    code: `/*
Сценарий: Обработка сложных прав доступа (Hierarchy Flattening)
Описание:
Раскрытие иерархии групп пользователей для проверки доступа к ресурсу.
Позволяет быстро определить, имеет ли пользователь доступ через любую из родительских групп.
Продвинутые концепции: Рекурсивные запросы, нормализация иерархических связей.
*/

WITH RECURSIVE UserGroups AS (
    -- Прямое членство пользователя в группах
    SELECT group_id, user_id
    FROM group_members
    WHERE user_id = :target_user

    UNION

    -- Наследование прав через родительские группы
    SELECT h.parent_group_id, ug.user_id
    FROM group_hierarchy h
    JOIN UserGroups ug ON h.child_group_id = ug.group_id
)
SELECT DISTINCT p.permission_name
FROM permissions p
JOIN UserGroups ug ON p.group_id = ug.group_id;`
  },
  {
    id: 5,
    dialect: "SQL",
    title: "recursive_cte",
    description: "Рекурсивный обход иерархии (Организационная структура). Расчет бюджета по иерархии.",
    code: `/*
Сценарий: Рекурсивный обход иерархии (Организационная структура)
Описание:
Вычисляет общий зарплатный бюджет для менеджера, включая всех его прямых и косвенных подчиненных.
Использует рекурсивное обобщенное табличное выражение (CTE), стандарт SQL (ANSI SQL:1999).
Продвинутые концепции: Рекурсивные CTE, иерархическое моделирование данных, агрегация.
*/

WITH RECURSIVE Hierarchy AS (
    -- Базовая часть: выбираем начального менеджера
    SELECT 
        id, 
        name, 
        salary, 
        manager_id, 
        1 as level
    FROM employees
    WHERE id = @TargetManagerID

    UNION ALL

    -- Рекурсивная часть: выбираем подчиненных
    SELECT 
        e.id, 
        e.name, 
        e.salary, 
        e.manager_id, 
        h.level + 1
    FROM employees e
    INNER JOIN Hierarchy h ON e.manager_id = h.id
)
SELECT 
    SUM(salary) as TotalSalaryBudget,
    COUNT(*) as TotalHeadcount,
    MAX(level) as Depth
FROM Hierarchy;`
  },
  {
    id: 6,
    dialect: "SQL",
    title: "window_functions",
    description: "Скользящие средние и нарастающий итог (Аналитика продаж). Демонстрация оконных функций.",
    code: `/*
Сценарий: Скользящие средние и нарастающий итог (Аналитика продаж)
Описание:
Вычисляет 3-дневное скользящее среднее продаж и нарастающий итог для каждой категории товаров.
Демонстрирует мощь оконных функций для аналитики без использования самосоединений (self-joins).
Продвинутые концепции: предложение OVER, PARTITION BY, ORDER BY, ROWS BETWEEN (определение фрейма).
*/

SELECT 
    sale_date,
    category,
    amount,
    -- Нарастающий итог по категории
    SUM(amount) OVER (
        PARTITION BY category 
        ORDER BY sale_date
    ) as running_total,
    -- 3-дневное скользящее среднее (текущая строка + 2 предыдущих)
    AVG(amount) OVER (
        PARTITION BY category 
        ORDER BY sale_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) as moving_avg_3day,
    -- Ранг продаж внутри категории
    DENSE_RANK() OVER (
        PARTITION BY category 
        ORDER BY amount DESC
    ) as sales_rank
FROM daily_sales
ORDER BY category, sale_date;`
  },
  {
    id: 7,
    dialect: "SQLite",
    title: "date_series",
    description: "Генерация временных рядов без таблиц в SQLite.",
    code: `/*
Сценарий: Генерация временных рядов без таблиц
Описание:
Генерирует список всех дат в текущем месяце. Это часто необходимо для отчетов, где нужно показать нулевые продажи в дни без активности.
Продвинутые концепции: Рекурсивные CTE в SQLite, функции даты и времени.
*/

WITH RECURSIVE dates(date) AS (
  VALUES(date('now', 'start of month'))
  UNION ALL
  SELECT date(date, '+1 day')
  FROM dates
  WHERE date < date('now', 'start of month', '+1 month', '-1 day')
)
SELECT date FROM dates;`
  },
  {
    id: 8,
    dialect: "SQLite",
    title: "json_array_processing",
    description: "Работа с JSON - извлечение и фильтрация вложенных массивов в SQLite.",
    code: `/*
Сценарий: Работа с JSON - извлечение и фильтрация вложенных массивов
Описание:
SQLite позволяет эффективно работать с JSON-данными. Этот запрос находит товары с определенными тегами внутри JSON-объекта.
Продвинутые концепции: json_each, работа с динамическими структурами в SQLite.
*/

SELECT 
    p.id,
    p.name,
    json_extract(p.attributes, '$.color') as color
FROM products p, json_each(p.attributes, '$.tags') as tag
WHERE tag.value = 'premium'
  AND json_extract(p.attributes, '$.stock') > 0;`
  },
  {
    id: 9,
    dialect: "SQLite",
    title: "lag_function",
    description: "Вычисление разницы между текущей и предыдущей строкой (анализ динамики).",
    code: `/*
Сценарий: Вычисление разницы между текущей и предыдущей строкой
Описание:
Анализ динамики изменения баланса. Используется для построения графиков изменений.
Продвинутые концепции: LAG() в SQLite (доступно с версии 3.25.0).
*/

SELECT 
    transaction_date,
    amount,
    amount - LAG(amount, 1, 0) OVER (ORDER BY transaction_date) as delta
FROM account_history
WHERE account_id = ?
ORDER BY transaction_date;`
  },
  {
    id: 10,
    dialect: "SQLite",
    title: "missing_sequences",
    description: "Поиск пропущенных значений в последовательности (Missing IDs) в SQLite.",
    code: `/*
Сценарий: Поиск пропущенных значений в последовательности (Missing IDs)
Описание:
Находит "дыры" в нумерации заказов. Полезно для аудита целостности данных.
Продвинутые концепции: Самосоединение, фильтрация по отсутствию связи.
*/

SELECT 
    (t1.id + 1) as missing_id_start,
    (MIN(t2.id) - 1) as missing_id_end
FROM orders t1
JOIN orders t2 ON t1.id < t2.id
GROUP BY t1.id
HAVING missing_id_start < MIN(t2.id);`
  },
  {
    id: 11,
    dialect: "SQLite",
    title: "upsert",
    description: "Upsert (Вставка или Обновление) с обработкой конфликтов в SQLite.",
    code: `/*
Сценарий: Upsert (Вставка или Обновление) с обработкой конфликтов
Описание:
Вставляет новую сессию пользователя или обновляет временную метку 'last_active', если у пользователя уже есть открытая сессия.
SQLite поддерживает стандартный синтаксис ON CONFLICT, что удобно для синхронизации данных.
Продвинутые концепции: предложение ON CONFLICT, DO UPDATE SET, псевдо-таблица EXCLUDED.
*/

INSERT INTO user_sessions (user_id, session_token, last_active, ip_address)
VALUES (12345, 'abc-xyz-789', CURRENT_TIMESTAMP, '192.168.1.1')
ON CONFLICT(user_id) 
DO UPDATE SET
    last_active = excluded.last_active,
    ip_address = excluded.ip_address,
    -- Увеличиваем счетчик логинов, если запись существовала
    login_count = user_sessions.login_count + 1
WHERE 
    -- Необязательно: обновлять только если IP изменился
    user_sessions.ip_address != excluded.ip_address;`
  },
  {
    id: 12,
    dialect: "T-SQL",
    title: "cross_apply",
    description: "Продвинутый парсинг JSON и кросс-ссылки в T-SQL.",
    code: `/*
Сценарий: Продвинутый парсинг JSON и кросс-ссылки
Описание:
Парсит JSON-колонку с позициями заказа и сопоставляет их с таблицей товаров.
CROSS APPLY уникален для T-SQL (аналог LATERAL JOIN в Postgres) и позволяет вызывать табличную функцию для каждой строки.
Продвинутые концепции: CROSS APPLY, OPENJSON со схемой, соединение реляционных и нереляционных данных.
*/

SELECT 
    o.OrderID,
    o.CustomerName,
    j.ProductID,
    j.Quantity,
    p.ProductName,
    (j.Quantity * p.UnitPrice) as LineTotal
FROM Orders o
-- "Применяем" функцию OPENJSON к каждой строке таблицы Orders
CROSS APPLY OPENJSON(o.OrderDetailsJSON) 
WITH (
    ProductID INT '$.id',
    Quantity INT '$.qty'
) AS j
INNER JOIN Products p ON j.ProductID = p.ProductID
WHERE p.IsDiscontinued = 0;`
  },
  {
    id: 13,
    dialect: "T-SQL",
    title: "merge_statement",
    description: "Синхронизация данных (ETL / Хранилища данных) с использованием MERGE в T-SQL.",
    code: `/*
Сценарий: Синхронизация данных (ETL / Хранилища данных)
Описание:
Синхронизирует целевую таблицу 'Inventory' с исходной таблицей 'Shipments'.
- Новые товары добавляются.
- У существующих обновляется количество.
- Товары, отсутствующие в поставке, помечаются как неактивные (soft delete).
Продвинутые концепции: оператор MERGE, WHEN MATCHED/NOT MATCHED, использование алиасов Source/Target.
*/

MERGE INTO Inventory AS Target
USING Shipments AS Source
ON (Target.ProductID = Source.ProductID)

-- 1. Обновление существующих записей
WHEN MATCHED AND Target.LastUpdate < Source.ShipmentDate THEN
    UPDATE SET 
        Target.Quantity = Target.Quantity + Source.Quantity,
        Target.LastUpdate = Source.ShipmentDate

-- 2. Вставка новых записей
WHEN NOT MATCHED BY TARGET THEN
    INSERT (ProductID, Quantity, LastUpdate, Status)
    VALUES (Source.ProductID, Source.Quantity, Source.ShipmentDate, 'Active')

-- 3. Логика для элементов, присутствующих в Target, но отсутствующих в Source
WHEN NOT MATCHED BY SOURCE AND Target.Status = 'Active' THEN
    UPDATE SET Target.Status = 'Inactive';`
  },
  {
    id: 14,
    dialect: "T-SQL",
    title: "optimistic_concurrency",
    description: "Оптимистичная блокировка с использованием ROWVERSION в T-SQL.",
    code: `/*
Сценарий: Оптимистичная блокировка с использованием ROWVERSION
Описание:
Предотвращает проблему 'последнего обновления' (lost update) без использования тяжелых блокировок БД.
ROWVERSION автоматически изменяется при любом обновлении строки.
Продвинутые концепции: тип данных ROWVERSION, конкурентный доступ, оптимистичные транзакции.
*/

-- 1. Получаем данные и текущую версию строки
-- SELECT ProductID, Price, VersionCol FROM Products WHERE ProductID = @ID;

-- 2. Обновляем только если версия не изменилась
UPDATE Products
SET Price = @NewPrice,
    LastModifiedBy = @UserID
WHERE ProductID = @ID 
  AND VersionCol = @OldVersion; -- Проверка версии

IF @@ROWCOUNT = 0
BEGIN
    RAISERROR('Ошибка: Запись была изменена другим пользователем.', 16, 1);
END;`
  },
  {
    id: 15,
    dialect: "T-SQL",
    title: "pivot_unpivot",
    description: "Транспонирование данных (Pivot/Unpivot) для отчетности в T-SQL.",
    code: `/*
Сценарий: Транспонирование данных (Pivot/Unpivot) для отчетности
Описание:
Преобразует строки с продажами за месяцы в столбцы для удобного ежеквартального отчета.
Продвинутые концепции: оператор PIVOT, агрегация данных при развороте, динамические колонки.
*/

SELECT VendorID, [250] AS Emp1, [251] AS Emp2, [252] AS Emp3
FROM (
    SELECT PurchaseOrderID, EmployeeID, VendorID
    FROM Purchasing.PurchaseOrderHeader
) AS SourceTable
PIVOT (
    COUNT(PurchaseOrderID)
    FOR EmployeeID IN ([250], [251], [252])
) AS PivotTable;`
  },
  {
    id: 16,
    dialect: "T-SQL",
    title: "string_split_with_ordinal",
    description: "Парсинг CSV-строк с сохранением порядка (T-SQL 2022+).",
    code: `/*
Сценарий: Парсинг CSV-строк с сохранением порядка (T-SQL 2022+)
Описание:
Разбивает строку с тегами на отдельные записи. Новый параметр '1' позволяет получить порядковый номер элемента.
Продвинутые концепции: STRING_SPLIT, работа с коллекциями в строках, позиционный парсинг.
*/

DECLARE @Tags NVARCHAR(MAX) = 'sql,server,database,optimization,graph';

SELECT 
    value AS TagName,
    ordinal AS Position
FROM STRING_SPLIT(@Tags, ',', 1) -- '1' включает колонку ordinal
WHERE ordinal <= 3; -- Берем только первые три тега`
  }
];
