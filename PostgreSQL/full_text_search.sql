/*
Сценарий: Полнотекстовый поиск с ранжированием
Описание:
Выполняет поиск по статьям, учитывая вес заголовка выше, чем вес тела статьи, и возвращает результаты с рангом релевантности.
Продвинутые концепции: tsvector, tsquery, setweight, ts_rank.
*/

SELECT title, ts_rank(combined_weights, query) AS rank
FROM (
  SELECT title,
         setweight(to_tsvector('russian', title), 'A') || 
         setweight(to_tsvector('russian', body), 'B') AS combined_weights,
         to_tsquery('russian', 'база & данные') AS query
  FROM articles
) AS search
WHERE combined_weights @@ query
ORDER BY rank DESC;
