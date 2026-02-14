/*
Сценарий: Высокопроизводительная аналитика JSONB
Описание:
Запрос к логу событий для поиска пользователей, совершивших определенные действия, с использованием оператора включения (@>), который может быть индексирован GIN.
Это стандартный паттерн для гибридных реляционных/NoSQL нагрузок в Postgres.
Продвинутые концепции: тип данных JSONB, оператор включения (@>), использование GIN индексов.
*/

-- Предполагаемый индекс: CREATE INDEX idx_events_payload ON events USING GIN (payload);

SELECT 
    payload ->> 'user_id' as user_id,
    COUNT(*) as conversion_count,
    MAX((payload ->> 'timestamp')::timestamp) as last_event
FROM app_events
WHERE 
    -- Быстрая проверка включения (использует GIN индекс)
    payload @> '{"type": "checkout", "status": "completed"}'
    AND 
    -- Проверка существования вложенного ключа
    payload ? 'meta_data'
GROUP BY 1
HAVING COUNT(*) > 5;
