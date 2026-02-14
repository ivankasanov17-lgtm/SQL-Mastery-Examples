/*
Сценарий: Обработка сложных прав доступа (Hierarchy Flattening)
Описание:
Раскрытие иерархии групп пользователей для проверки доступа к ресурсу.
Позволяет быстро определить, имеет ли пользователь доступ через любую из родительских групп.
Продвинутые концепции: Рекурсивные запросы, нормализация иерархических связей.
*/

WITH RECURSIVE UserGroups AS (
    -- Прямое членство пользователя в группах
    SELECT group_id, user_id
    FROM group_members
    WHERE user_id = :target_user

    UNION

    -- Наследование прав через родительские группы
    SELECT h.parent_group_id, ug.user_id
    FROM group_hierarchy h
    JOIN UserGroups ug ON h.child_group_id = ug.group_id
)
SELECT DISTINCT p.permission_name
FROM permissions p
JOIN UserGroups ug ON p.group_id = ug.group_id;
