/*
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
HAVING missing_id_start < MIN(t2.id);
