/*
Сценарий: Сложные коррелированные подзапросы (Построчная аналитика)
Описание:
Для каждого пользователя находит 3 последних заказа. 
LATERAL позволяет подзапросу ссылаться на колонки из предшествующей таблицы 'users', фактически выполняя цикл.
Это часто эффективнее, чем оконные функции, для задачи "Top N на группу", когда N невелико.
Продвинутые концепции: LATERAL JOIN, коррелированные подзапросы, оптимизация Limit.
*/

SELECT 
    u.user_id,
    u.email,
    recent_orders.order_id,
    recent_orders.total_amount,
    recent_orders.created_at
FROM users u
CROSS JOIN LATERAL (
    SELECT 
        id as order_id, 
        total_amount, 
        created_at
    FROM orders o
    WHERE o.user_id = u.id -- Ссылка на 'u' из внешнего запроса
    ORDER BY created_at DESC
    LIMIT 3
) recent_orders
WHERE u.status = 'active';
