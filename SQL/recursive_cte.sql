/*
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
FROM Hierarchy;
