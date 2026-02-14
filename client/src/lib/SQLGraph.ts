export const SQLGraph = [
  {
    id: "sql_graph_node",
    name: "CREATE TABLE ... AS NODE",
    category: "SQL Graph",
    description: "Создает таблицу узлов в графовой базе данных SQL Server. Узлы представляют сущности в графе (например, Люди, Продукты).",
    syntax: "CREATE TABLE table_name ( \n  column1 data_type, \n  ... \n) AS NODE;",
    example: "CREATE TABLE Person (ID INT PRIMARY KEY, Name NVARCHAR(100)) AS NODE;",
    arguments: [
      { name: "AS NODE", description: "Указывает, что таблица является таблицей узлов.", example: "AS NODE" },
      { name: "$node_id", description: "Скрытый столбец, автоматически создаваемый для уникальной идентификации узла.", example: "SELECT $node_id FROM Person;" }
    ]
  },
  {
    id: "sql_graph_edge",
    name: "CREATE TABLE ... AS EDGE",
    category: "SQL Graph",
    description: "Создает таблицу ребер в графовой базе данных. Ребра представляют связи между узлами (например, 'дружат', 'купил'). Могут иметь собственные свойства.",
    syntax: "CREATE TABLE table_name ( \n  column1 data_type, \n  ... \n) AS EDGE;",
    example: "CREATE TABLE Like (Rating INT) AS EDGE;",
    arguments: [
      { name: "AS EDGE", description: "Указывает, что таблица является таблицей ребер.", example: "AS EDGE" },
      { name: "$from_id", description: "Скрытый столбец, хранящий ID начального узла.", example: "INSERT INTO Like ($from_id, $to_id) VALUES (...)" },
      { name: "$to_id", description: "Скрытый столбец, хранящий ID конечного узла.", example: "$to_id" }
    ]
  },
  {
    id: "sql_graph_edge_constraint",
    name: "CREATE TABLE ... AS EDGE CONSTRAINT",
    category: "SQL Graph",
    description: "Создает таблицу ребер с ограничением связей. Позволяет строго определить, какие типы узлов могут быть соединены этим ребром.",
    syntax: "CREATE TABLE table_name ( \n  column1 data_type, \n  ... \n) AS EDGE \nCONSTRAINT constraint_name \nCONNECTION (from_table TO to_table) \n[ON DELETE NO ACTION | CASCADE];",
    example: "CREATE TABLE FriendOf (\n  Since DATE\n) AS EDGE \nCONSTRAINT EC_FriendOf \nCONNECTION (Person TO Person) \nON DELETE CASCADE;",
    arguments: [
      { name: "CONNECTION", description: "Определяет допустимое направление связи между таблицами узлов.", example: "CONNECTION (Person TO Person)" },
      { name: "ON DELETE", description: "Указывает действие при удалении связанного узла (например, CASCADE удалит ребро).", example: "ON DELETE CASCADE" }
    ]
  },
  {
    id: "sql_graph_insert_node",
    name: "INSERT INTO (NODE)",
    category: "DML Statements",
    description: "Добавляет новый узел в таблицу узлов. Синтаксис идентичен обычной вставке в таблицу.",
    syntax: "INSERT INTO node_table (column_list) \nVALUES (values_list);",
    example: "INSERT INTO Person (ID, Name) \nVALUES (1, 'Alice');",
    arguments: [
      { name: "node_table", description: "Имя таблицы, созданной с параметром AS NODE.", example: "Person" }
    ]
  },
  {
    id: "sql_graph_insert_edge",
    name: "INSERT INTO (EDGE)",
    category: "DML Statements",
    description: "Добавляет новое ребро между двумя существующими узлами. Требует указания системных столбцов $from_id и $to_id.",
    syntax: "INSERT INTO edge_table ($from_id, $to_id, [column_list]) \nVALUES (node_id_1, node_id_2, [values]);",
    example: "INSERT INTO Like ($from_id, $to_id, Rating) \nVALUES (\n  (SELECT $node_id FROM Person WHERE Name = 'Alice'), \n  (SELECT $node_id FROM Person WHERE Name = 'Bob'), \n  5\n);",
    arguments: [
      { name: "$from_id", description: "ID исходного узла (node_id).", example: "(SELECT $node_id FROM Person WHERE ID = 1)" },
      { name: "$to_id", description: "ID целевого узла (node_id).", example: "(SELECT $node_id FROM Person WHERE ID = 2)" }
    ]
  },
  {
    id: "sql_graph_update",
    name: "UPDATE (Graph)",
    category: "DML Statements",
    description: "Обновляет данные в таблицах узлов или ребер. Поддерживает использование MATCH в предложении FROM для обновления на основе связей.",
    syntax: "UPDATE table_name \nSET column_name = value \n[FROM clause] \n[WHERE condition];",
    example: "UPDATE Like \nSET Rating = 10 \nFROM Person P1, Person P2 \nWHERE MATCH(P1-(Like)->P2) \nAND P1.Name = 'Alice';",
    arguments: [
      { name: "FROM", description: "Позволяет указать дополнительные таблицы или условия MATCH для фильтрации обновляемых строк.", example: "FROM Person P1, Like, Person P2" }
    ]
  },
  {
    id: "sql_graph_delete",
    name: "DELETE (Graph)",
    category: "DML Statements",
    description: "Удаляет узлы или ребра. При удалении узла соответствующие ему ребра в SQL Server удаляются автоматически, чтобы избежать висячих ссылок.",
    syntax: "DELETE FROM table_name \n[WHERE condition];",
    example: "DELETE FROM Person WHERE ID = 1; \n-- Или удаление конкретного ребра: \nDELETE FROM Like WHERE $from_id = (SELECT $node_id FROM Person WHERE ID = 1);",
    arguments: [
      { name: "table_name", description: "Имя таблицы узлов или ребер.", example: "Like" }
    ]
  },
  {
    id: "sql_graph_merge",
    name: "MERGE (Graph)",
    category: "DML Statements",
    description: "Выполняет операции вставки, обновления или удаления на основе результатов сопоставления. Удобно для синхронизации графовых данных.",
    syntax: "MERGE INTO target_table \nUSING source_table ON merge_search_condition \nWHEN MATCHED [AND clause_search_condition] \n  THEN UPDATE SET ... | DELETE \nWHEN NOT MATCHED [BY TARGET] [AND clause_search_condition] \n  THEN INSERT (column_list) VALUES (values_list) \nWHEN NOT MATCHED BY SOURCE [AND clause_search_condition] \n  THEN UPDATE SET ... | DELETE;",
    example: "MERGE FriendOf AS Target \nUSING (SELECT $node_id FROM Person WHERE ID = 1) AS Source ($id) \nON Target.$from_id = Source.$id \nWHEN NOT MATCHED \n  THEN INSERT ($from_id, $to_id, Since) \n       VALUES (Source.$id, (SELECT $node_id FROM Person WHERE ID = 2), GETDATE());",
    arguments: [
      { name: "WHEN MATCHED", description: "Действие, если условие сопоставления истинно.", example: "THEN UPDATE SET Rating = Source.Rating" },
      { name: "WHEN NOT MATCHED", description: "Действие, если строка из источника не найдена в целевой таблице.", example: "THEN INSERT ..." }
    ]
  },
  {
    id: "sql_graph_match",
    name: "MATCH",
    category: "Query Operators and Functions",
    description: "Используется в предложении WHERE для поиска шаблонов в графе. Определяет связи между узлами через ребра.",
    syntax: "MATCH(graph_search_pattern)",
    example: "SELECT P2.Name \nFROM Person P1, Like, Person P2 \nWHERE MATCH(P1-(Like)->P2) \nAND P1.Name = 'Alice';",
    arguments: [
      { name: "graph_search_pattern", description: "Шаблон графа, определяющий узлы и ребра для поиска.", example: "MATCH(P1-(FriendOf)->P2)" }
    ]
  },
  {
    id: "sql_graph_shortest_path",
    name: "SHORTEST_PATH",
    category: "Query Operators and Functions",
    description: "Находит кратчайший путь между двумя узлами на основе заданного шаблона. Позволяет искать пути произвольной длины.",
    syntax: "MATCH(SHORTEST_PATH(arbitrary_length_pattern))",
    example: "SELECT P1.Name, STRING_AGG(P2.Name, '->') \nFROM Person P1, FriendOf FOR PATH, Person P2 FOR PATH \nWHERE MATCH(SHORTEST_PATH(P1(-(FriendOf)->P2)+)) \nAND P1.Name = 'Alice';",
    arguments: [
      { name: "arbitrary_length_pattern", description: "Шаблон рекурсивного поиска пути с использованием квантификаторов (+, *).", example: "(P1(-(FriendOf)->P2)+)" }
    ]
  },
  {
    id: "sql_graph_last_node",
    name: "LAST_NODE",
    category: "Query Operators and Functions",
    description: "Возвращает последний узел в найденном пути. Часто используется в сочетании с SHORTEST_PATH.",
    syntax: "LAST_NODE(node_alias)",
    example: "SELECT P1.Name, LAST_NODE(P2).Name AS Destination \nFROM Person P1, FriendOf FOR PATH, Person P2 FOR PATH \nWHERE MATCH(SHORTEST_PATH(P1(-(FriendOf)->P2)+)) \nAND P1.Name = 'Alice';",
    arguments: [
      { name: "node_alias", description: "Псевдоним узла, участвующего в поиске пути.", example: "LAST_NODE(P2)" }
    ]
  },
  {
    id: "sql_graph_for_path",
    name: "FOR PATH",
    category: "Query Operators and Functions",
    description: "Указывает, что таблица узлов или ребер используется в контексте поиска пути (например, в SHORTEST_PATH). Позволяет агрегировать данные вдоль пути.",
    syntax: "table_name FOR PATH",
    example: "SELECT P1.Name, STRING_AGG(P2.Name, '->') WITHIN GROUP (GRAPH PATH) \nFROM Person P1, FriendOf FOR PATH, Person P2 FOR PATH \nWHERE MATCH(SHORTEST_PATH(P1(-(FriendOf)->P2)+));",
    arguments: [
      { name: "FOR PATH", description: "Ключевое слово, разрешающее использование таблицы в функциях поиска путей.", example: "Person FOR PATH" }
    ]
  },
  {
    id: "sql_graph_syntax_forward",
    name: "-(edge)->",
    category: "Pattern Syntax",
    description: "Определяет направление связи слева направо в шаблоне MATCH.",
    syntax: "node_alias1 -( edge_alias )-> node_alias2",
    example: "MATCH(P1-(Like)->P2)",
    arguments: [
      { name: "node_alias1", description: "Псевдоним начального узла.", example: "P1" },
      { name: "edge_alias", description: "Псевдоним ребра.", example: "Like" },
      { name: "node_alias2", description: "Псевдоним конечного узла.", example: "P2" }
    ]
  },
  {
    id: "sql_graph_syntax_backward",
    name: "<-(edge)-",
    category: "Pattern Syntax",
    description: "Определяет направление связи справа налево в шаблоне MATCH.",
    syntax: "node_alias1 <-( edge_alias )- node_alias2",
    example: "MATCH(P1<-(Like)-P2)",
    arguments: [
      { name: "node_alias1", description: "Псевдоним целевого узла.", example: "P1" },
      { name: "edge_alias", description: "Псевдоним ребра.", example: "Like" },
      { name: "node_alias2", description: "Псевдоним исходного узла.", example: "P2" }
    ]
  },
  {
    id: "sql_graph_syntax_last_node_filter",
    name: "LAST_NODE Comparison",
    category: "Pattern Syntax",
    description: "Сравнивает конечные узлы различных путей. Полезно для фильтрации результатов MATCH.",
    syntax: "LAST_NODE(node_alias1) = LAST_NODE(node_alias2)",
    example: "WHERE LAST_NODE(P2) = LAST_NODE(P3)",
    arguments: [
      { name: "LAST_NODE", description: "Функция получения последнего узла в пути.", example: "LAST_NODE(P2)" }
    ]
  },
  {
    id: "sql_graph_syntax_plus",
    name: "Pattern +",
    category: "Pattern Syntax",
    description: "Квантификатор, указывающий на повторение шаблона 1 или более раз (для SHORTEST_PATH).",
    syntax: "(pattern)+",
    example: "MATCH(SHORTEST_PATH(P1(-(FriendOf)->P2)+))",
    arguments: [
      { name: "+", description: "1 или более повторений.", example: "+"}
    ]
  },
  {
    id: "sql_graph_syntax_range",
    name: "Pattern {1,n}",
    category: "Pattern Syntax",
    description: "Квантификатор, указывающий на повторение шаблона от 1 до n раз.",
    syntax: "(pattern){1,n}",
    example: "MATCH(SHORTEST_PATH(P1(-(FriendOf)->P2){1,3}))",
    arguments: [
      { name: "{1,n}", description: "Диапазон повторений.", example: "{1,5}" }
    ]
  },
  {
    id: "sql_graph_syntax_star",
    name: "Pattern *",
    category: "Pattern Syntax",
    description: "Квантификатор, указывающий на повторение шаблона 0 или более раз.",
    syntax: "(pattern)*",
    example: "MATCH(SHORTEST_PATH(P1(-(FriendOf)->P2)*))",
    arguments: [
      { name: "*", description: "0 или более повторений.", example: "*" }
    ]
  },
  {
    id: "sql_graph_agg_string_agg",
    name: "STRING_AGG (Graph)",
    category: "Graph Path Aggregate Functions",
    description: "Агрегирует строковые значения вдоль пути графа.",
    syntax: "STRING_AGG(expression, separator) WITHIN GROUP (GRAPH PATH)",
    example: "SELECT STRING_AGG(P2.Name, '->') WITHIN GROUP (GRAPH PATH) FROM Person P1, FriendOf FOR PATH, Person P2 FOR PATH WHERE MATCH(SHORTEST_PATH(P1(-(FriendOf)->P2)+));",
    arguments: [
      { name: "separator", description: "Разделитель между значениями.", example: "',' or '->'" }
    ]
  },
  {
    id: "sql_graph_agg_last_value",
    name: "LAST_VALUE (Graph)",
    category: "Graph Path Aggregate Functions",
    description: "Возвращает последнее значение из набора данных вдоль пути графа.",
    syntax: "LAST_VALUE(expression) WITHIN GROUP (GRAPH PATH)",
    example: "SELECT LAST_VALUE(P2.Name) WITHIN GROUP (GRAPH PATH) FROM Person P1, FriendOf FOR PATH, Person P2 FOR PATH WHERE MATCH(SHORTEST_PATH(P1(-(FriendOf)->P2)+));",
    arguments: [
      { name: "expression", description: "Выражение, значение которого нужно получить.", example: "P2.Name" }
    ]
  },
  {
    id: "sql_graph_agg_count",
    name: "COUNT (Graph)",
    category: "Graph Path Aggregate Functions",
    description: "Подсчитывает количество элементов в пути графа.",
    syntax: "COUNT(expression) WITHIN GROUP (GRAPH PATH)",
    example: "SELECT COUNT(P2.Name) WITHIN GROUP (GRAPH PATH) FROM Person P1, FriendOf FOR PATH, Person P2 FOR PATH WHERE MATCH(SHORTEST_PATH(P1(-(FriendOf)->P2)+));",
    arguments: [
      { name: "expression", description: "Выражение для подсчета.", example: "P2.Name" }
    ]
  },
  {
    id: "sql_graph_agg_sum",
    name: "SUM (Graph)",
    category: "Graph Path Aggregate Functions",
    description: "Вычисляет сумму значений числового выражения вдоль пути графа.",
    syntax: "SUM(expression) WITHIN GROUP (GRAPH PATH)",
    example: "SELECT SUM(E.Weight) WITHIN GROUP (GRAPH PATH) FROM Node N1, Edge E FOR PATH, Node N2 FOR PATH WHERE MATCH(SHORTEST_PATH(N1(-(E)->N2)+));",
    arguments: [
      { name: "expression", description: "Числовое выражение.", example: "E.Weight" }
    ]
  },
  {
    id: "sql_graph_agg_avg",
    name: "AVG (Graph)",
    category: "Graph Path Aggregate Functions",
    description: "Вычисляет среднее значение числового выражения вдоль пути графа.",
    syntax: "AVG(expression) WITHIN GROUP (GRAPH PATH)",
    example: "SELECT AVG(E.Weight) WITHIN GROUP (GRAPH PATH) FROM Node N1, Edge E FOR PATH, Node N2 FOR PATH WHERE MATCH(SHORTEST_PATH(N1(-(E)->N2)+));",
    arguments: [
      { name: "expression", description: "Числовое выражение.", example: "E.Weight" }
    ]
  },
  {
    id: "sql_graph_agg_min",
    name: "MIN (Graph)",
    category: "Graph Path Aggregate Functions",
    description: "Находит минимальное значение выражения вдоль пути графа.",
    syntax: "MIN(expression) WITHIN GROUP (GRAPH PATH)",
    example: "SELECT MIN(E.Weight) WITHIN GROUP (GRAPH PATH) FROM Node N1, Edge E FOR PATH, Node N2 FOR PATH WHERE MATCH(SHORTEST_PATH(N1(-(E)->N2)+));",
    arguments: [
      { name: "expression", description: "Выражение для поиска минимума.", example: "E.Weight" }
    ]
  },
  {
    id: "sql_graph_agg_max",
    name: "MAX (Graph)",
    category: "Graph Path Aggregate Functions",
    description: "Находит максимальное значение выражения вдоль пути графа.",
    syntax: "MAX(expression) WITHIN GROUP (GRAPH PATH)",
    example: "SELECT MAX(E.Weight) WITHIN GROUP (GRAPH PATH) FROM Node N1, Edge E FOR PATH, Node N2 FOR PATH WHERE MATCH(SHORTEST_PATH(N1(-(E)->N2)+));",
    arguments: [
      { name: "expression", description: "Выражение для поиска максимума.", example: "E.Weight" }
    ]
  },
  {
    id: "sql_graph_sys_node_id_from_parts",
    name: "NODE_ID_FROM_PARTS",
    category: "System Graph Functions",
    description: "Создает внутренний символьный идентификатор узла из предоставленных идентификатора объекта (object_id) и графового идентификатора (graph_id).",
    syntax: "NODE_ID_FROM_PARTS(object_id, graph_id)",
    example: "SELECT NODE_ID_FROM_PARTS(OBJECT_ID('Person'), 1);",
    arguments: [
      { name: "object_id", description: "Идентификатор объекта таблицы узлов.", example: "OBJECT_ID('Person')" },
      { name: "graph_id", description: "Внутренний целочисленный идентификатор узла в графе.", example: "1" }
    ]
  },
  {
    id: "sql_graph_sys_object_id_from_node_id",
    name: "OBJECT_ID_FROM_NODE_ID",
    category: "System Graph Functions",
    description: "Извлекает идентификатор объекта таблицы узлов из предоставленного внутреннего идентификатора узла ($node_id).",
    syntax: "OBJECT_ID_FROM_NODE_ID(node_id)",
    example: "SELECT OBJECT_ID_FROM_NODE_ID($node_id) FROM Person;",
    arguments: [
      { name: "node_id", description: "Внутренний идентификатор узла.", example: "$node_id" }
    ]
  },
  {
    id: "sql_graph_sys_graph_id_from_node_id",
    name: "GRAPH_ID_FROM_NODE_ID",
    category: "System Graph Functions",
    description: "Извлекает внутренний графовый идентификатор узла из предоставленного $node_id.",
    syntax: "GRAPH_ID_FROM_NODE_ID(node_id)",
    example: "SELECT GRAPH_ID_FROM_NODE_ID($node_id) FROM Person;",
    arguments: [
      { name: "node_id", description: "Внутренний идентификатор узла.", example: "$node_id" }
    ]
  },
  {
    id: "sql_graph_sys_edge_id_from_parts",
    name: "EDGE_ID_FROM_PARTS",
    category: "System Graph Functions",
    description: "Создает внутренний символьный идентификатор ребра из предоставленных идентификатора объекта и графового идентификатора.",
    syntax: "EDGE_ID_FROM_PARTS(object_id, graph_id)",
    example: "SELECT EDGE_ID_FROM_PARTS(OBJECT_ID('Like'), 1);",
    arguments: [
      { name: "object_id", description: "Идентификатор объекта таблицы ребер.", example: "OBJECT_ID('Like')" },
      { name: "graph_id", description: "Внутренний целочисленный идентификатор ребра в графе.", example: "1" }
    ]
  },
  {
    id: "sql_graph_sys_object_id_from_edge_id",
    name: "OBJECT_ID_FROM_EDGE_ID",
    category: "System Graph Functions",
    description: "Извлекает идентификатор объекта таблицы ребер из предоставленного внутреннего идентификатора ребра ($edge_id).",
    syntax: "OBJECT_ID_FROM_EDGE_ID(edge_id)",
    example: "SELECT OBJECT_ID_FROM_EDGE_ID($edge_id) FROM Like;",
    arguments: [
      { name: "edge_id", description: "Внутренний идентификатор ребра.", example: "$edge_id" }
    ]
  },
  {
    id: "sql_graph_sys_graph_id_from_edge_id",
    name: "GRAPH_ID_FROM_EDGE_ID",
    category: "System Graph Functions",
    description: "Извлекает внутренний графовый идентификатор ребра из предоставленного $edge_id.",
    syntax: "GRAPH_ID_FROM_EDGE_ID(edge_id)",
    example: "SELECT GRAPH_ID_FROM_EDGE_ID($edge_id) FROM Like;",
    arguments: [
      { name: "edge_id", description: "Внутренний идентификатор ребра.", example: "$edge_id" }
    ]
  },
  {
    id: "sql_graph_pseudo_node_id",
    name: "$node_id",
    category: "Pseudo-Columns",
    description: "Системный столбец в таблице узлов, содержащий уникальный JSON-идентификатор узла.",
    syntax: "$node_id",
    example: "SELECT $node_id, Name FROM Person;",
    arguments: [
      { name: "$node_id", description: "Уникальный идентификатор узла.", example: "$node_id" }
    ]
  },
  {
    id: "sql_graph_pseudo_edge_id",
    name: "$edge_id",
    category: "Pseudo-Columns",
    description: "Системный столбец в таблице ребер, содержащий уникальный JSON-идентификатор ребра.",
    syntax: "$edge_id",
    example: "SELECT $edge_id FROM FriendOf;",
    arguments: [
      { name: "$edge_id", description: "Уникальный идентификатор ребра.", example: "$edge_id" }
    ]
  },
  {
    id: "sql_graph_pseudo_from_id",
    name: "$from_id",
    category: "Pseudo-Columns",
    description: "Системный столбец в таблице ребер, указывающий на идентификатор ($node_id) начального узла.",
    syntax: "$from_id",
    example: "SELECT $from_id FROM FriendOf;",
    arguments: [
      { name: "$from_id", description: "Идентификатор исходного узла.", example: "$from_id" }
    ]
  },
  {
    id: "sql_graph_pseudo_to_id",
    name: "$to_id",
    category: "Pseudo-Columns",
    description: "Системный столбец в таблице ребер, указывающий на идентификатор ($node_id) конечного узла.",
    syntax: "$to_id",
    example: "SELECT $to_id FROM FriendOf;",
    arguments: [
      { name: "$to_id", description: "Идентификатор целевого узла.", example: "$to_id" }
    ]
  },
  {
    id: "sql_graph_select_extensions",
    name: "SELECT Extensions",
    category: "SELECT Statement Extensions",
    description: "Расширения оператора SELECT для работы с графовыми данными, включая выборку псевдостолбцов.",
    syntax: "SELECT [ALL | DISTINCT] [TOP (expression) [PERCENT]] column_list | $node_id | $edge_id | $from_id | $to_id",
    example: "SELECT TOP 10 $node_id, Name FROM Person;",
    arguments: [
      { name: "TOP", description: "Ограничивает количество возвращаемых строк.", example: "TOP 5" },
      { name: "$node_id", description: "Выборка идентификатора узла.", example: "$node_id" }
    ]
  },
  {
    id: "sql_graph_from_extensions_simple",
    name: "FROM Clause (Basic)",
    category: "FROM Clause Extensions",
    description: "Использование таблиц узлов и ребер в предложении FROM.",
    syntax: "FROM node_table | edge_table [FOR PATH] [AS table_alias]",
    example: "FROM Person FOR PATH AS P",
    arguments: [
      { name: "FOR PATH", description: "Указывает на использование в контексте пути.", example: "FOR PATH" }
    ]
  },
  {
    id: "sql_graph_from_extensions_multi",
    name: "FROM Clause (Multi-table)",
    category: "FROM Clause Extensions",
    description: "Определение нескольких графовых таблиц для сложных запросов MATCH.",
    syntax: "FROM node_table [FOR PATH] AS node_alias, edge_table [FOR PATH] AS edge_alias, node_table [FOR PATH] AS node_alias2",
    example: "FROM Person AS P1, FriendOf AS F, Person AS P2",
    arguments: [
      { name: "node_alias", description: "Псевдоним таблицы узлов.", example: "P1" },
      { name: "edge_alias", description: "Псевдоним таблицы ребер.", example: "F" }
    ]
  },
  {
    id: "sql_graph_where_match_basic",
    name: "WHERE MATCH (Basic)",
    category: "WHERE Clause with MATCH",
    description: "Использование MATCH в предложении WHERE для фильтрации по графовому шаблону.",
    syntax: "WHERE MATCH(graph_search_pattern)",
    example: "WHERE MATCH(P1-(Like)->P2)",
    arguments: [
      { name: "graph_search_pattern", description: "Шаблон поиска в графе.", example: "P1-(Like)->P2" }
    ]
  },
  {
    id: "sql_graph_where_match_condition",
    name: "WHERE MATCH with Condition",
    category: "WHERE Clause with MATCH",
    description: "Комбинирование графового шаблона с обычными условиями фильтрации.",
    syntax: "WHERE MATCH(graph_search_pattern) AND search_condition",
    example: "WHERE MATCH(P1-(Like)->P2) AND P1.Name = 'Alice'",
    arguments: [
      { name: "search_condition", description: "Стандартное логическое выражение SQL.", example: "P1.Age > 21" }
    ]
  },
  {
    id: "sql_graph_where_multi_match",
    name: "WHERE with Multiple MATCH",
    category: "WHERE Clause with MATCH",
    description: "Использование нескольких графовых шаблонов в одном запросе.",
    syntax: "WHERE MATCH(pattern1 AND pattern2) [AND condition]",
    example: "WHERE MATCH(P1-(FriendOf)->P2 AND P2-(FriendOf)->P3)",
    arguments: [
      { name: "pattern1 AND pattern2", description: "Несколько шаблонов, объединенных логическим И.", example: "P1-(Like)->P2 AND P2-(Like)->P3" }
    ]
  },
  {
    id: "sql_graph_edge_constraint_basic",
    name: "EDGE CONSTRAINT (Basic)",
    category: "Edge Constraint Extensions",
    description: "Базовое определение ограничения для таблицы ребер.",
    syntax: "CONSTRAINT constraint_name CONNECTION (from_table TO to_table)",
    example: "CONSTRAINT EC_Likes CONNECTION (Person TO Person)",
    arguments: [
      { name: "CONNECTION", description: "Указывает допустимую связь между таблицами узлов.", example: "CONNECTION (Person TO Product)" }
    ]
  },
  {
    id: "sql_graph_edge_constraint_no_action",
    name: "EDGE CONSTRAINT (NO ACTION)",
    category: "Edge Constraint Extensions",
    description: "Ограничение ребра с запретом удаления узла, если на него ссылается ребро.",
    syntax: "CONSTRAINT constraint_name CONNECTION (from TO to) ON DELETE NO ACTION",
    example: "CONSTRAINT EC_Likes CONNECTION (Person TO Product) ON DELETE NO ACTION",
    arguments: [
      { name: "NO ACTION", description: "Значение по умолчанию. Выдает ошибку при попытке удаления связанного узла.", example: "ON DELETE NO ACTION" }
    ]
  },
  {
    id: "sql_graph_edge_constraint_cascade",
    name: "EDGE CONSTRAINT (CASCADE)",
    category: "Edge Constraint Extensions",
    description: "Ограничение ребра с автоматическим удалением ребра при удалении связанного узла.",
    syntax: "CONSTRAINT constraint_name CONNECTION (from TO to) ON DELETE CASCADE",
    example: "CONSTRAINT EC_Likes CONNECTION (Person TO Product) ON DELETE CASCADE",
    arguments: [
      { name: "CASCADE", description: "Автоматически удаляет ребра, связанные с удаляемым узлом.", example: "ON DELETE CASCADE" }
    ]
  },
  {
    id: "sql_graph_edge_constraint_multi",
    name: "EDGE CONSTRAINT (Multi-connection)",
    category: "Edge Constraint Extensions",
    description: "Определение нескольких допустимых типов соединений для одного ребра.",
    syntax: "CONSTRAINT constraint_name CONNECTION (f1 TO t1, f2 TO t2)",
    example: "CONSTRAINT EC_FriendOf CONNECTION (Person TO Person, Employee TO Employee)",
    arguments: [
      { name: "Multi-connection", description: "Список пар таблиц узлов через запятую.", example: "(Person TO Person, Person TO Group)" }
    ]
  },
  {
    id: "sql_graph_meta_is_node",
    name: "is_node",
    category: "Metadata Query Functions",
    description: "Флаг в системном представлении sys.tables, указывающий, является ли таблица таблицей узлов.",
    syntax: "is_node (column in sys.tables)",
    example: "SELECT name FROM sys.tables WHERE is_node = 1;",
    arguments: [
      { name: "is_node", description: "Битовый столбец (1 = узел).", example: "is_node = 1" }
    ]
  },
  {
    id: "sql_graph_meta_is_edge",
    name: "is_edge",
    category: "Metadata Query Functions",
    description: "Флаг в системном представлении sys.tables, указывающий, является ли таблица таблицей ребер.",
    syntax: "is_edge (column in sys.tables)",
    example: "SELECT name FROM sys.tables WHERE is_edge = 1;",
    arguments: [
      { name: "is_edge", description: "Битовый столбец (1 = ребро).", example: "is_edge = 1" }
    ]
  },
  {
    id: "sql_graph_meta_graph_type",
    name: "graph_type",
    category: "Metadata Query Functions",
    description: "Код типа графового столбца в представлении sys.columns.",
    syntax: "graph_type (column in sys.columns)",
    example: "SELECT name, graph_type FROM sys.columns WHERE object_id = OBJECT_ID('Person');",
    arguments: [
      { name: "graph_type", description: "Числовой код типа графа.", example: "graph_type" }
    ]
  },
  {
    id: "sql_graph_meta_graph_type_desc",
    name: "graph_type_desc",
    category: "Metadata Query Functions",
    description: "Текстовое описание типа графового столбца (например, GRAPH_NODE_ID, GRAPH_EDGE_ID).",
    syntax: "graph_type_desc (column in sys.columns)",
    example: "SELECT name, graph_type_desc FROM sys.columns WHERE graph_type_desc IS NOT NULL;",
    arguments: [
      { name: "graph_type_desc", description: "Описание типа графа.", example: "GRAPH_NODE_ID" }
    ]
  },
  {
    id: "sql_graph_pattern_and",
    name: "AND (Pattern Combination)",
    category: "Pattern Operators",
    description: "Используется для объединения нескольких шаблонов графа в одном предложении MATCH.",
    syntax: "MATCH(pattern1 AND pattern2)",
    example: "WHERE MATCH(N1-(E1)->N2 AND N2-(E2)->N3)",
    arguments: [
      { name: "AND", description: "Логический оператор объединения шаблонов.", example: "AND" }
    ]
  },
  {
    id: "sql_graph_pattern_forward",
    name: "-> (Forward)",
    category: "Pattern Operators",
    description: "Обозначает направленное ребро от одного узла к другому.",
    syntax: "node1 -(edge)-> node2",
    example: "MATCH(P1-(Like)->P2)",
    arguments: [
      { name: "->", description: "Стрелка вправо указывает на направление связи.", example: "->" }
    ]
  },
  {
    id: "sql_graph_pattern_backward",
    name: "<- (Backward)",
    category: "Pattern Operators",
    description: "Обозначает направленное ребро от целевого узла к исходному (справа налево).",
    syntax: "node1 <-(edge)- node2",
    example: "MATCH(P1<-(Like)-P2)",
    arguments: [
      { name: "<-", description: "Стрелка влево указывает на обратное направление связи.", example: "<-" }
    ]
  },
  {
    id: "sql_graph_pattern_undirected",
    name: "-( edge )- (Undirected)",
    category: "Pattern Operators",
    description: "Обозначает связь без учета направления (ненаправленное отношение).",
    syntax: "node1 -(edge)- node2",
    example: "MATCH(P1-(FriendOf)-P2)",
    arguments: [
      { name: "-( edge )-", description: "Ребро без стрелок указывает на двустороннюю или ненаправленную связь.", example: "-(Like)-" }
    ]
  }
];
