/*
Сценарий: Динамический PIVOT (Разворот данных)
Описание:
Превращает строки (например, продажи по месяцам) в столбцы. 
В T-SQL это делается с помощью оператора PIVOT.
Продвинутые концепции: PIVOT, агрегация данных для отчетности.
*/

SELECT VendorID, [2023] AS Sales2023, [2024] AS Sales2024, [2025] AS Sales2025
FROM (
    SELECT VendorID, Year, Amount
    FROM VendorSales
) AS SourceTable
PIVOT (
    SUM(Amount)
    FOR Year IN ([2023], [2024], [2025])
) AS PivotTable;
