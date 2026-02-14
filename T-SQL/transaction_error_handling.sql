/*
Сценарий: Обработка ошибок в транзакциях
Описание:
Надежный паттерн выполнения финансовых операций с использованием TRY...CATCH.
Продвинутые концепции: XACT_STATE, обработка исключений, управление транзакциями.
*/

BEGIN TRY
    BEGIN TRANSACTION;
        -- Выполнение операций
        UPDATE Accounts SET Balance -= 100 WHERE ID = 1;
        UPDATE Accounts SET Balance += 100 WHERE ID = 2;
    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
    -- Логирование ошибки
    INSERT INTO ErrorLog (Message, Severity, State)
    VALUES (ERROR_MESSAGE(), ERROR_SEVERITY(), ERROR_STATE());
    THROW;
END CATCH;
