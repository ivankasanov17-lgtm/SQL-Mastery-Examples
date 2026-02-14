/*
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
ORDER BY category, sale_date;
