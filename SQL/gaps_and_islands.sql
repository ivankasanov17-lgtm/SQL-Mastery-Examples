/*
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
ORDER BY streak_length DESC;
