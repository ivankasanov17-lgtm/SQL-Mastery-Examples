/*
Сценарий: Работа с JSON - извлечение и фильтрация вложенных массивов
Описание:
SQLite позволяет эффективно работать с JSON-данными. Этот запрос находит товары с определенными тегами внутри JSON-объекта.
Продвинутые концепции: json_each, работа с динамическими структурами в SQLite.
*/

SELECT 
    p.id,
    p.name,
    json_extract(p.attributes, '$.color') as color
FROM products p, json_each(p.attributes, '$.tags') as tag
WHERE tag.value = 'premium'
  AND json_extract(p.attributes, '$.stock') > 0;
