/*
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
SELECT date FROM dates;
