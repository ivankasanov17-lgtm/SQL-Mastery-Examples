/*
Сценарий: Продвинутый парсинг JSON и кросс-ссылки
Описание:
Парсит JSON-колонку с позициями заказа и сопоставляет их с таблицей товаров.
CROSS APPLY уникален для T-SQL (аналог LATERAL JOIN в Postgres) и позволяет вызывать табличную функцию для каждой строки.
Продвинутые концепции: CROSS APPLY, OPENJSON со схемой, соединение реляционных и нереляционных данных.
*/

SELECT 
    o.OrderID,
    o.CustomerName,
    j.ProductID,
    j.Quantity,
    p.ProductName,
    (j.Quantity * p.UnitPrice) as LineTotal
FROM Orders o
-- "Применяем" функцию OPENJSON к каждой строке таблицы Orders
CROSS APPLY OPENJSON(o.OrderDetailsJSON) 
WITH (
    ProductID INT '$.id',
    Quantity INT '$.qty'
) AS j
INNER JOIN Products p ON j.ProductID = p.ProductID
WHERE p.IsDiscontinued = 0;
