/*
Сценарий: Партиционирование данных (Table Partitioning)
Описание:
Работа с очень большими таблицами. Postgres автоматически перенаправляет запросы в нужную партицию.
Продвинутые концепции: PARTITION BY RANGE, декларативное партиционирование.
*/

-- Создание мастер-таблицы
-- CREATE TABLE measurements (
--     city_id         int not null,
--     logdate         date not null,
--     peaktemp        int,
--     unitsales       int
-- ) PARTITION BY RANGE (logdate);

-- Пример запроса, который будет использовать 'partition pruning'
SELECT city_id, AVG(peaktemp)
FROM measurements
WHERE logdate >= '2025-01-01' AND logdate < '2025-02-01'
GROUP BY city_id;
