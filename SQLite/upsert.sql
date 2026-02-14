/*
Сценарий: Upsert (Вставка или Обновление) с обработкой конфликтов
Описание:
Вставляет новую сессию пользователя или обновляет временную метку 'last_active', если у пользователя уже есть открытая сессия.
SQLite поддерживает стандартный синтаксис ON CONFLICT, что удобно для синхронизации данных.
Продвинутые концепции: предложение ON CONFLICT, DO UPDATE SET, псевдо-таблица EXCLUDED.
*/

INSERT INTO user_sessions (user_id, session_token, last_active, ip_address)
VALUES (12345, 'abc-xyz-789', CURRENT_TIMESTAMP, '192.168.1.1')
ON CONFLICT(user_id) 
DO UPDATE SET
    last_active = excluded.last_active,
    ip_address = excluded.ip_address,
    -- Увеличиваем счетчик логинов, если запись существовала
    login_count = user_sessions.login_count + 1
WHERE 
    -- Необязательно: обновлять только если IP изменился
    user_sessions.ip_address != excluded.ip_address;
