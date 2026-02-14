/*
Сценарий: Использование материализованных представлений (Materialized Views)
Описание:
Ускорение тяжелых аналитических запросов за счет кэширования результатов на диске.
Продвинутые концепции: REFRESH MATERIALIZED VIEW CONCURRENTLY, индексы на представлениях.
*/

-- Предположим, у нас есть:
-- REFRESH MATERIALIZED VIEW CONCURRENTLY sales_summary_mv;

SELECT 
    category_name, 
    total_revenue,
    RANK() OVER(ORDER BY total_revenue DESC) as performance_rank
FROM sales_summary_mv
WHERE last_refresh > NOW() - INTERVAL '1 day';
