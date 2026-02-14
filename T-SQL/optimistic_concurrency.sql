/*
Сценарий: Оптимистичная блокировка с использованием ROWVERSION
Описание:
Обновляет баланс счета только в том случае, если запись не была изменена другим процессом с момента последнего чтения.
Продвинутые концепции: Тип данных rowversion/timestamp, транзакции, проверка версии.
*/

DECLARE @CurrentVersion BINARY(8);
SELECT @CurrentVersion = RowVersion FROM Accounts WHERE AccountID = @AccountID;

-- Процесс обработки...

UPDATE Accounts
SET Balance = Balance - @Amount
WHERE AccountID = @AccountID AND RowVersion = @CurrentVersion;

IF @@ROWCOUNT = 0
    THROW 50001, 'Ошибка параллелизма: запись была изменена другим пользователем.', 1;
