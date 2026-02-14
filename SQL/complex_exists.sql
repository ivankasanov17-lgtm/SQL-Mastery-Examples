/*
Сценарий: Сложная фильтрация с использованием EXISTS и коррелированных подзапросов
Описание:
Выбирает клиентов, которые совершили заказы на сумму более 1000 во всех категориях, где они активны.
Использование EXISTS часто эффективнее, чем JOIN, когда нужно просто проверить наличие записей.
Продвинутые концепции: EXISTS, коррелированные подзапросы, двойное отрицание для логики "для всех".
*/

SELECT c.name, c.email
FROM customers c
WHERE EXISTS (
    SELECT 1 
    FROM orders o 
    WHERE o.customer_id = c.id 
    AND o.total_amount > 1000
)
AND NOT EXISTS (
    SELECT 1 
    FROM categories cat
    WHERE NOT EXISTS (
        SELECT 1 
        FROM products p
        JOIN order_items oi ON oi.product_id = p.id
        JOIN orders o2 ON o2.id = oi.order_id
        WHERE o2.customer_id = c.id 
        AND p.category_id = cat.id
    )
);
