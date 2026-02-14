/*
Сценарий: Использование OUTPUT для логирования изменений
Описание:
Захват измененных данных в реальном времени при выполнении UPDATE. Позволяет реализовать аудит без триггеров.
Продвинутые концепции: предложение OUTPUT, таблицы INSERTED и DELETED.
*/

UPDATE Products
SET UnitPrice = UnitPrice * 1.1
OUTPUT 
    INSERTED.ProductID,
    DELETED.UnitPrice AS OldPrice,
    INSERTED.UnitPrice AS NewPrice,
    GETDATE() AS ChangeDate
INTO ProductPriceHistory (ProductID, OldPrice, NewPrice, ChangeDate)
WHERE CategoryID = @TargetCategory;
