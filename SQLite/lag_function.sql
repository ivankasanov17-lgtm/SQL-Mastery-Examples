/*
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
ORDER BY transaction_date;
