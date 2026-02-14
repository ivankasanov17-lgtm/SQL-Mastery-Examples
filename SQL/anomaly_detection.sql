/*
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
WHERE ABS((amount - avg_amount) / NULLIF(stddev_amount, 0)) > 3;
