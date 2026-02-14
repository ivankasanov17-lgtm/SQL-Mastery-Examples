/*
Сценарий: Синхронизация данных (ETL / Хранилища данных)
Описание:
Синхронизирует целевую таблицу 'Inventory' с исходной таблицей 'Shipments'.
- Новые товары добавляются.
- У существующих обновляется количество.
- Товары, отсутствующие в поставке, помечаются как неактивные (soft delete).
Продвинутые концепции: оператор MERGE, WHEN MATCHED/NOT MATCHED, использование алиасов Source/Target.
*/

MERGE INTO Inventory AS Target
USING Shipments AS Source
ON (Target.ProductID = Source.ProductID)

-- 1. Обновление существующих записей
WHEN MATCHED AND Target.LastUpdate < Source.ShipmentDate THEN
    UPDATE SET 
        Target.Quantity = Target.Quantity + Source.Quantity,
        Target.LastUpdate = Source.ShipmentDate

-- 2. Вставка новых записей
WHEN NOT MATCHED BY TARGET THEN
    INSERT (ProductID, Quantity, LastUpdate, Status)
    VALUES (Source.ProductID, Source.Quantity, Source.ShipmentDate, 'Active')

-- 3. Логика для элементов, присутствующих в Target, но отсутствующих в Source
WHEN NOT MATCHED BY SOURCE AND Target.Status = 'Active' THEN
    UPDATE SET Target.Status = 'Inactive';
