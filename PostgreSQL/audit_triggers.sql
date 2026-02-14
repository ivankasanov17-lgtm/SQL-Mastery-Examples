/*
Сценарий: Продвинутые триггеры и функция ROW_TO_JSON
Описание:
Автоматическое логирование изменений всей строки в формате JSON в таблицу аудита.
Продвинутые концепции: TG_OP, TG_TABLE_NAME, преобразование записей в JSON.
*/

-- Логика внутри триггерной функции:
-- INSERT INTO audit_log (table_name, operation, old_data, new_data, changed_by)
-- VALUES (
--     TG_TABLE_NAME, 
--     TG_OP, 
--     CASE WHEN TG_OP = 'INSERT' THEN NULL ELSE row_to_json(OLD) END,
--     CASE WHEN TG_OP = 'DELETE' THEN NULL ELSE row_to_json(NEW) END,
--     current_user
-- );

SELECT * FROM audit_log 
WHERE table_name = 'orders' 
  AND operation = 'UPDATE'
  AND (new_data->>'total_amount')::numeric > 10000;
