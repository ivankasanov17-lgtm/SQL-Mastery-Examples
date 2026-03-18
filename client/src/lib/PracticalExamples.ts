export interface TableRow {
  [key: string]: string | number | null;
}

export interface TableData {
  columns: string[];
  rows: TableRow[];
}

export interface PracticalExample {
  id: string;
  shortTitle: string;
  taskTitle: string;
  taskDescription: string;
  description: string;
  query: string;
  beforeTables: { label: string; data: TableData }[];
  afterTable: TableData;
}

export const practicalExamples: PracticalExample[] = [
  {
    id: "task-1",
    shortTitle: "Множественные JOIN + обработка NULL",
    taskTitle: "Задача 1 — Множественные JOIN + обработка NULL",
    taskDescription:
      "Напишите запрос, который возвращает для каждого заказа: имя клиента, дату заказа, статус, общую сумму, список товаров (через string_agg) и статус последнего платежа. Используйте LEFT JOIN ко всем нужным таблицам так, чтобы заказы без платежей тоже попадали в результат.",
    description:
      "Запрос объединяет таблицы customers, orders, order_items, products и payments через LEFT JOIN. Подзапрос последнего платежа выбирает платёж с максимальной датой для каждого заказа. string_agg собирает список товаров в одну строку. Заказы без платежей попадают в результат с NULL в колонке payment_status.",
    query: `SELECT
  c.name                          AS customer_name,
  o.order_date,
  o.status                        AS order_status,
  SUM(oi.quantity * oi.unit_price) AS total_amount,
  STRING_AGG(p.name, ', ' ORDER BY p.name) AS products,
  lp.status                       AS payment_status
FROM orders o
JOIN customers c
  ON c.id = o.customer_id
JOIN order_items oi
  ON oi.order_id = o.id
JOIN products p
  ON p.id = oi.product_id
LEFT JOIN LATERAL (
  SELECT status
  FROM payments
  WHERE order_id = o.id
  ORDER BY payment_date DESC
  LIMIT 1
) lp ON true
GROUP BY
  c.name, o.order_date, o.status, lp.status
ORDER BY
  o.order_date DESC;`,
    beforeTables: [
      {
        label: "customers",
        data: {
          columns: ["id", "name", "email"],
          rows: [
            { id: 1, name: "Иван Петров", email: "ivan@example.com" },
            { id: 2, name: "Мария Сидорова", email: "maria@example.com" },
            { id: 3, name: "Алексей Козлов", email: "alex@example.com" },
          ],
        },
      },
      {
        label: "orders",
        data: {
          columns: ["id", "customer_id", "order_date", "status"],
          rows: [
            { id: 101, customer_id: 1, order_date: "2024-05-01", status: "completed" },
            { id: 102, customer_id: 2, order_date: "2024-05-03", status: "pending" },
            { id: 103, customer_id: 3, order_date: "2024-05-05", status: "completed" },
          ],
        },
      },
      {
        label: "order_items",
        data: {
          columns: ["order_id", "product_id", "quantity", "unit_price"],
          rows: [
            { order_id: 101, product_id: 1, quantity: 2, unit_price: 500 },
            { order_id: 101, product_id: 2, quantity: 1, unit_price: 1200 },
            { order_id: 102, product_id: 3, quantity: 3, unit_price: 300 },
            { order_id: 103, product_id: 1, quantity: 1, unit_price: 500 },
          ],
        },
      },
      {
        label: "products",
        data: {
          columns: ["id", "name"],
          rows: [
            { id: 1, name: "Клавиатура" },
            { id: 2, name: "Монитор" },
            { id: 3, name: "Мышь" },
          ],
        },
      },
      {
        label: "payments",
        data: {
          columns: ["id", "order_id", "payment_date", "status"],
          rows: [
            { id: 1, order_id: 101, payment_date: "2024-05-02", status: "paid" },
            { id: 2, order_id: 101, payment_date: "2024-05-03", status: "refunded" },
            { id: 3, order_id: 103, payment_date: "2024-05-06", status: "paid" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["customer_name", "order_date", "order_status", "total_amount", "products", "payment_status"],
      rows: [
        {
          customer_name: "Алексей Козлов",
          order_date: "2024-05-05",
          order_status: "completed",
          total_amount: 500,
          products: "Клавиатура",
          payment_status: "paid",
        },
        {
          customer_name: "Мария Сидорова",
          order_date: "2024-05-03",
          order_status: "pending",
          total_amount: 900,
          products: "Мышь",
          payment_status: null,
        },
        {
          customer_name: "Иван Петров",
          order_date: "2024-05-01",
          order_status: "completed",
          total_amount: 2200,
          products: "Клавиатура, Монитор",
          payment_status: "refunded",
        },
      ],
    },
  },
  {
    id: "task-2",
    shortTitle: "GROUP BY + HAVING + фильтрация по дате",
    taskTitle: "Задача 2 — GROUP BY + HAVING + фильтрация по дате",
    taskDescription:
      "Найдите топ-10 категорий (включая подкатегории) по количеству проданных товаров за последние 6 месяцев. В результате должен быть: название категории (полный путь), количество проданных единиц и выручка. Используйте HAVING для отсечения категорий с продажами меньше 50 единиц.",
    description:
      "Запрос использует рекурсивный CTE (WITH RECURSIVE) для построения полного пути от корневой категории до текущей. Затем JOIN с order_items и orders фильтрует продажи за последние 6 месяцев. GROUP BY агрегирует количество и выручку, HAVING отсекает слабые категории, ORDER BY и LIMIT оставляют топ-10.",
    query: `WITH RECURSIVE category_path AS (
  -- Базовый случай: корневые категории
  SELECT
    id,
    name,
    parent_id,
    name::TEXT AS full_path
  FROM categories
  WHERE parent_id IS NULL

  UNION ALL

  -- Рекурсивный шаг: подкатегории
  SELECT
    c.id,
    c.name,
    c.parent_id,
    cp.full_path || ' > ' || c.name
  FROM categories c
  JOIN category_path cp ON cp.id = c.parent_id
)
SELECT
  cp.full_path                  AS category_path,
  SUM(oi.quantity)              AS total_sold,
  SUM(oi.quantity * oi.unit_price) AS revenue
FROM category_path cp
JOIN products p
  ON p.category_id = cp.id
JOIN order_items oi
  ON oi.product_id = p.id
JOIN orders o
  ON o.id = oi.order_id
WHERE o.order_date >= CURRENT_DATE - INTERVAL '6 months'
GROUP BY cp.full_path
HAVING SUM(oi.quantity) >= 50
ORDER BY total_sold DESC
LIMIT 10;`,
    beforeTables: [
      {
        label: "categories",
        data: {
          columns: ["id", "name", "parent_id"],
          rows: [
            { id: 1, name: "Электроника", parent_id: null },
            { id: 2, name: "Компьютеры", parent_id: 1 },
            { id: 3, name: "Периферия", parent_id: 2 },
            { id: 4, name: "Смартфоны", parent_id: 1 },
          ],
        },
      },
      {
        label: "products",
        data: {
          columns: ["id", "name", "category_id"],
          rows: [
            { id: 1, name: "Клавиатура", category_id: 3 },
            { id: 2, name: "Мышь", category_id: 3 },
            { id: 3, name: "Ноутбук", category_id: 2 },
            { id: 4, name: "iPhone 15", category_id: 4 },
          ],
        },
      },
      {
        label: "order_items (за 6 мес.)",
        data: {
          columns: ["order_id", "product_id", "quantity", "unit_price"],
          rows: [
            { order_id: 1, product_id: 1, quantity: 30, unit_price: 500 },
            { order_id: 2, product_id: 2, quantity: 25, unit_price: 300 },
            { order_id: 3, product_id: 1, quantity: 40, unit_price: 500 },
            { order_id: 4, product_id: 3, quantity: 15, unit_price: 45000 },
            { order_id: 5, product_id: 4, quantity: 60, unit_price: 90000 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["category_path", "total_sold", "revenue"],
      rows: [
        {
          category_path: "Электроника > Смартфоны",
          total_sold: 60,
          revenue: 5400000,
        },
        {
          category_path: "Электроника > Компьютеры > Периферия",
          total_sold: 95,
          revenue: 49500,
        },
      ],
    },
  },
  {
    id: "task-3",
    shortTitle: "Оконные функции внутри категории",
    taskTitle: "Задача 3 — Оконные функции внутри категории",
    taskDescription:
      "Для каждого продукта рассчитайте: ранг по продажам внутри своей категории (RANK), процент от общей выручки категории, кумулятивную выручку по категории (в порядке убывания продаж). Выведите только продукты, которые входят в топ-5 своей категории.",
    description:
      "CTE ranked_products считает агрегаты по каждому продукту и категории, затем оконные функции RANK(), SUM() OVER и SUM() OVER с ROWS BETWEEN добавляют ранг, долю и нарастающий итог. Внешний SELECT отфильтровывает только топ-5 по рангу в каждой категории.",
    query: `WITH ranked_products AS (
  SELECT
    p.category_id,
    cat.name                              AS category_name,
    p.name                                AS product_name,
    SUM(oi.quantity * oi.unit_price)      AS revenue,
    RANK() OVER (
      PARTITION BY p.category_id
      ORDER BY SUM(oi.quantity * oi.unit_price) DESC
    )                                     AS sales_rank,
    ROUND(
      SUM(oi.quantity * oi.unit_price) * 100.0 /
      SUM(SUM(oi.quantity * oi.unit_price)) OVER (PARTITION BY p.category_id),
      2
    )                                     AS pct_of_category,
    SUM(SUM(oi.quantity * oi.unit_price)) OVER (
      PARTITION BY p.category_id
      ORDER BY SUM(oi.quantity * oi.unit_price) DESC
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    )                                     AS cumulative_revenue
  FROM products p
  JOIN categories cat  ON cat.id = p.category_id
  JOIN order_items oi  ON oi.product_id = p.id
  GROUP BY p.category_id, cat.name, p.name
)
SELECT
  category_name,
  product_name,
  revenue,
  sales_rank,
  pct_of_category,
  cumulative_revenue
FROM ranked_products
WHERE sales_rank <= 5
ORDER BY category_name, sales_rank;`,
    beforeTables: [
      {
        label: "products",
        data: {
          columns: ["id", "name", "category_id"],
          rows: [
            { id: 1, name: "iPhone 15", category_id: 1 },
            { id: 2, name: "Samsung S24", category_id: 1 },
            { id: 3, name: "Pixel 8", category_id: 1 },
            { id: 4, name: "Ноутбук Pro", category_id: 2 },
            { id: 5, name: "Ноутбук Air", category_id: 2 },
          ],
        },
      },
      {
        label: "order_items",
        data: {
          columns: ["product_id", "quantity", "unit_price"],
          rows: [
            { product_id: 1, quantity: 50, unit_price: 90000 },
            { product_id: 2, quantity: 40, unit_price: 75000 },
            { product_id: 3, quantity: 20, unit_price: 60000 },
            { product_id: 4, quantity: 30, unit_price: 120000 },
            { product_id: 5, quantity: 25, unit_price: 80000 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["category_name", "product_name", "revenue", "sales_rank", "pct_of_category", "cumulative_revenue"],
      rows: [
        { category_name: "Ноутбуки", product_name: "Ноутбук Pro", revenue: 3600000, sales_rank: 1, pct_of_category: "64.29", cumulative_revenue: 3600000 },
        { category_name: "Ноутбуки", product_name: "Ноутбук Air", revenue: 2000000, sales_rank: 2, pct_of_category: "35.71", cumulative_revenue: 5600000 },
        { category_name: "Смартфоны", product_name: "iPhone 15", revenue: 4500000, sales_rank: 1, pct_of_category: "55.56", cumulative_revenue: 4500000 },
        { category_name: "Смартфоны", product_name: "Samsung S24", revenue: 3000000, sales_rank: 2, pct_of_category: "37.04", cumulative_revenue: 7500000 },
        { category_name: "Смартфоны", product_name: "Pixel 8", revenue: 1200000, sales_rank: 3, pct_of_category: "14.81", cumulative_revenue: 8700000 },
      ],
    },
  },
  {
    id: "task-4",
    shortTitle: "CTE + оконные функции для временных рядов",
    taskTitle: "Задача 4 — CTE + оконные функции для временных рядов",
    taskDescription:
      "С помощью CTE постройте отчёт по месяцам (с 2024-01 по текущий момент): сумма продаж за месяц, количество заказов, кумулятивная сумма продаж с начала года, рост по сравнению с предыдущим месяцем в процентах (используйте LAG).",
    description:
      "CTE monthly_stats агрегирует продажи по месяцам через DATE_TRUNC. Затем оконная функция SUM() OVER с PARTITION BY год считает нарастающий итог с начала года, а LAG() возвращает продажи предыдущего месяца для расчёта процентного роста.",
    query: `WITH monthly_stats AS (
  SELECT
    DATE_TRUNC('month', o.order_date)     AS month,
    SUM(oi.quantity * oi.unit_price)      AS monthly_sales,
    COUNT(DISTINCT o.id)                  AS order_count
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  WHERE o.order_date >= '2024-01-01'
  GROUP BY DATE_TRUNC('month', o.order_date)
)
SELECT
  TO_CHAR(month, 'YYYY-MM')              AS month,
  monthly_sales,
  order_count,
  SUM(monthly_sales) OVER (
    PARTITION BY DATE_TRUNC('year', month)
    ORDER BY month
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  )                                       AS cumulative_ytd,
  ROUND(
    (monthly_sales - LAG(monthly_sales) OVER (ORDER BY month)) * 100.0 /
    NULLIF(LAG(monthly_sales) OVER (ORDER BY month), 0),
    2
  )                                       AS mom_growth_pct
FROM monthly_stats
ORDER BY month;`,
    beforeTables: [
      {
        label: "orders",
        data: {
          columns: ["id", "order_date", "status"],
          rows: [
            { id: 1, order_date: "2024-01-10", status: "completed" },
            { id: 2, order_date: "2024-01-20", status: "completed" },
            { id: 3, order_date: "2024-02-05", status: "completed" },
            { id: 4, order_date: "2024-03-15", status: "completed" },
            { id: 5, order_date: "2024-03-28", status: "completed" },
          ],
        },
      },
      {
        label: "order_items",
        data: {
          columns: ["order_id", "quantity", "unit_price"],
          rows: [
            { order_id: 1, quantity: 2, unit_price: 5000 },
            { order_id: 2, quantity: 1, unit_price: 90000 },
            { order_id: 3, quantity: 3, unit_price: 1500 },
            { order_id: 4, quantity: 1, unit_price: 45000 },
            { order_id: 5, quantity: 2, unit_price: 12000 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["month", "monthly_sales", "order_count", "cumulative_ytd", "mom_growth_pct"],
      rows: [
        { month: "2024-01", monthly_sales: 100000, order_count: 2, cumulative_ytd: 100000, mom_growth_pct: null },
        { month: "2024-02", monthly_sales: 4500, order_count: 1, cumulative_ytd: 104500, mom_growth_pct: "-95.50" },
        { month: "2024-03", monthly_sales: 69000, order_count: 2, cumulative_ytd: 173500, mom_growth_pct: "1433.33" },
      ],
    },
  },
  {
    id: "task-5",
    shortTitle: "Рекурсивный CTE — иерархия категорий",
    taskTitle: "Задача 5 — Рекурсивный CTE — иерархия",
    taskDescription:
      "Постройте полный путь категорий в формате «Электроника → Смартфоны → Apple». Для каждой категории выведите: id, полный путь, уровень вложенности и количество товаров в этой ветке (включая все подкатегории).",
    description:
      "Рекурсивный CTE category_tree строит дерево от корней вниз, накапливая full_path и depth. Второй CTE subtree_ids собирает всех потомков каждой категории. Финальный JOIN с products считает товары по всей ветке, включая вложенные уровни.",
    query: `WITH RECURSIVE category_tree AS (
  -- Базовый случай: корневые категории
  SELECT
    id,
    name,
    parent_id,
    name::TEXT        AS full_path,
    0                 AS depth
  FROM categories
  WHERE parent_id IS NULL

  UNION ALL

  -- Рекурсия: добавляем детей
  SELECT
    c.id,
    c.name,
    c.parent_id,
    ct.full_path || ' → ' || c.name,
    ct.depth + 1
  FROM categories c
  JOIN category_tree ct ON ct.id = c.parent_id
),
subtree_ids AS (
  -- Для каждой категории находим всех потомков (включая её саму)
  SELECT ancestor.id AS root_id, descendant.id AS member_id
  FROM category_tree ancestor
  JOIN category_tree descendant
    ON descendant.full_path LIKE ancestor.full_path || '%'
)
SELECT
  ct.id,
  ct.full_path,
  ct.depth,
  COUNT(DISTINCT p.id) AS product_count
FROM category_tree ct
LEFT JOIN subtree_ids si  ON si.root_id = ct.id
LEFT JOIN products p      ON p.category_id = si.member_id
GROUP BY ct.id, ct.full_path, ct.depth
ORDER BY ct.full_path;`,
    beforeTables: [
      {
        label: "categories",
        data: {
          columns: ["id", "name", "parent_id"],
          rows: [
            { id: 1, name: "Электроника", parent_id: null },
            { id: 2, name: "Смартфоны", parent_id: 1 },
            { id: 3, name: "Apple", parent_id: 2 },
            { id: 4, name: "Samsung", parent_id: 2 },
            { id: 5, name: "Ноутбуки", parent_id: 1 },
          ],
        },
      },
      {
        label: "products",
        data: {
          columns: ["id", "name", "category_id"],
          rows: [
            { id: 1, name: "iPhone 15", category_id: 3 },
            { id: 2, name: "iPhone 14", category_id: 3 },
            { id: 3, name: "Galaxy S24", category_id: 4 },
            { id: 4, name: "MacBook Pro", category_id: 5 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["id", "full_path", "depth", "product_count"],
      rows: [
        { id: 1, full_path: "Электроника", depth: 0, product_count: 4 },
        { id: 5, full_path: "Электроника → Ноутбуки", depth: 1, product_count: 1 },
        { id: 2, full_path: "Электроника → Смартфоны", depth: 1, product_count: 3 },
        { id: 3, full_path: "Электроника → Смартфоны → Apple", depth: 2, product_count: 2 },
        { id: 4, full_path: "Электроника → Смартфоны → Samsung", depth: 2, product_count: 1 },
      ],
    },
  },
  {
    id: "task-6",
    shortTitle: "JSONB + GIN-индекс + фильтрация",
    taskTitle: "Задача 6 — JSONB + индексация + фильтрация",
    taskDescription:
      "В таблице orders есть колонка metadata jsonb (содержит скидки, промокоды, источник трафика и т.д.). Напишите запрос, который находит все заказы, где скидка > 15% И источник = 'google', выводит flattened поля из JSONB и использует GIN-индекс.",
    description:
      "Сначала создаётся GIN-индекс по колонке metadata для быстрого поиска по ключам JSONB. Затем запрос извлекает числовое значение скидки через оператор ->> и приводит к numeric для сравнения, а также фильтрует по источнику трафика. Поля JSONB «разворачиваются» в обычные колонки.",
    query: `-- Создаём GIN-индекс для быстрого поиска по JSONB
CREATE INDEX IF NOT EXISTS idx_orders_metadata_gin
  ON orders USING GIN (metadata);

-- Основной запрос с фильтрацией по JSONB-полям
SELECT
  o.id                                        AS order_id,
  o.order_date,
  o.total_amount,
  (o.metadata->>'discount_pct')::NUMERIC      AS discount_pct,
  o.metadata->>'promo_code'                   AS promo_code,
  o.metadata->>'traffic_source'               AS traffic_source,
  o.metadata->'extra'->>'region'              AS region
FROM orders o
WHERE
  (o.metadata->>'discount_pct')::NUMERIC > 15
  AND o.metadata->>'traffic_source' = 'google'
ORDER BY discount_pct DESC;`,
    beforeTables: [
      {
        label: "orders (с metadata JSONB)",
        data: {
          columns: ["id", "order_date", "total_amount", "metadata"],
          rows: [
            { id: 1, order_date: "2024-05-01", total_amount: 15000, metadata: '{"discount_pct": 20, "promo_code": "SUMMER25", "traffic_source": "google", "extra": {"region": "MSK"}}' },
            { id: 2, order_date: "2024-05-02", total_amount: 8000, metadata: '{"discount_pct": 10, "traffic_source": "google", "extra": {"region": "SPB"}}' },
            { id: 3, order_date: "2024-05-03", total_amount: 3000, metadata: '{"discount_pct": 25, "traffic_source": "yandex", "extra": {"region": "MSK"}}' },
            { id: 4, order_date: "2024-05-04", total_amount: 22000, metadata: '{"discount_pct": 18, "promo_code": "SALE18", "traffic_source": "google", "extra": {"region": "NSK"}}' },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["order_id", "order_date", "total_amount", "discount_pct", "promo_code", "traffic_source", "region"],
      rows: [
        { order_id: 1, order_date: "2024-05-01", total_amount: 15000, discount_pct: 20, promo_code: "SUMMER25", traffic_source: "google", region: "MSK" },
        { order_id: 4, order_date: "2024-05-04", total_amount: 22000, discount_pct: 18, promo_code: "SALE18", traffic_source: "google", region: "NSK" },
      ],
    },
  },
  {
    id: "task-7",
    shortTitle: "PL/pgSQL функция — расчёт скидки",
    taskTitle: "Задача 7 — PL/pgSQL функция с логикой",
    taskDescription:
      "Создайте функцию calculate_order_discount(order_id bigint), которая принимает id заказа и возвращает итоговую скидку (numeric). Правила: > 5000 руб → 12%, 2000–5000 → 7%, < 2000 → 0%. Если в metadata есть промокод «SUMMER25» — дополнительно +5%.",
    description:
      "Функция на PL/pgSQL читает total_amount и metadata заказа. Условный блок IF/ELSIF/ELSE выбирает базовый процент скидки. Затем проверяется наличие промокода в JSONB, и при совпадении добавляется +5%. Функция возвращает суммарную скидку.",
    query: `CREATE OR REPLACE FUNCTION calculate_order_discount(p_order_id BIGINT)
RETURNS NUMERIC
LANGUAGE plpgsql
AS $$
DECLARE
  v_total     NUMERIC;
  v_metadata  JSONB;
  v_discount  NUMERIC := 0;
BEGIN
  -- Получаем данные заказа
  SELECT total_amount, metadata
  INTO   v_total, v_metadata
  FROM   orders
  WHERE  id = p_order_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order % not found', p_order_id;
  END IF;

  -- Базовая скидка по сумме
  IF v_total > 5000 THEN
    v_discount := 12;
  ELSIF v_total >= 2000 THEN
    v_discount := 7;
  ELSE
    v_discount := 0;
  END IF;

  -- Дополнительная скидка по промокоду
  IF v_metadata->>'promo_code' = 'SUMMER25' THEN
    v_discount := v_discount + 5;
  END IF;

  RETURN v_discount;
END;
$$;

-- Пример вызова
SELECT
  id,
  total_amount,
  metadata->>'promo_code'          AS promo_code,
  calculate_order_discount(id)     AS discount_pct
FROM orders
ORDER BY id;`,
    beforeTables: [
      {
        label: "orders",
        data: {
          columns: ["id", "total_amount", "metadata"],
          rows: [
            { id: 1, total_amount: 1500, metadata: '{}' },
            { id: 2, total_amount: 3000, metadata: '{"promo_code": "SUMMER25"}' },
            { id: 3, total_amount: 7000, metadata: '{}' },
            { id: 4, total_amount: 6000, metadata: '{"promo_code": "SUMMER25"}' },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["id", "total_amount", "promo_code", "discount_pct"],
      rows: [
        { id: 1, total_amount: 1500, promo_code: null, discount_pct: 0 },
        { id: 2, total_amount: 3000, promo_code: "SUMMER25", discount_pct: 12 },
        { id: 3, total_amount: 7000, promo_code: null, discount_pct: 12 },
        { id: 4, total_amount: 6000, promo_code: "SUMMER25", discount_pct: 17 },
      ],
    },
  },
  {
    id: "task-8",
    shortTitle: "Триггер — автопересчёт суммы заказа",
    taskTitle: "Задача 8 — Триггер + функция",
    taskDescription:
      "Создайте триггер update_order_total (AFTER INSERT OR UPDATE OR DELETE на order_items), который автоматически пересчитывает total_amount в таблице orders. Функция должна учитывать возможные изменения количества и цены.",
    description:
      "Триггерная функция trg_recalc_order_total определяет id заказа из NEW или OLD в зависимости от операции, затем пересчитывает сумму через SUM(quantity * unit_price) из order_items и обновляет поле total_amount в orders. Триггер вешается на AFTER INSERT OR UPDATE OR DELETE.",
    query: `-- Триггерная функция
CREATE OR REPLACE FUNCTION trg_recalc_order_total()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_order_id BIGINT;
  v_total    NUMERIC;
BEGIN
  -- Определяем id заказа для пересчёта
  v_order_id := COALESCE(NEW.order_id, OLD.order_id);

  -- Считаем новую итоговую сумму
  SELECT COALESCE(SUM(quantity * unit_price), 0)
  INTO   v_total
  FROM   order_items
  WHERE  order_id = v_order_id;

  -- Обновляем заказ
  UPDATE orders
  SET    total_amount = v_total
  WHERE  id = v_order_id;

  RETURN NEW;
END;
$$;

-- Создаём триггер
CREATE TRIGGER update_order_total
AFTER INSERT OR UPDATE OR DELETE ON order_items
FOR EACH ROW
EXECUTE FUNCTION trg_recalc_order_total();

-- Проверка: добавляем строку — total_amount обновится автоматически
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES (1, 5, 2, 3000);

SELECT id, total_amount FROM orders WHERE id = 1;`,
    beforeTables: [
      {
        label: "orders (до триггера)",
        data: {
          columns: ["id", "total_amount"],
          rows: [
            { id: 1, total_amount: 5000 },
            { id: 2, total_amount: 1200 },
          ],
        },
      },
      {
        label: "order_items (до вставки)",
        data: {
          columns: ["order_id", "product_id", "quantity", "unit_price"],
          rows: [
            { order_id: 1, product_id: 1, quantity: 1, unit_price: 5000 },
            { order_id: 2, product_id: 2, quantity: 4, unit_price: 300 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["id", "total_amount"],
      rows: [
        { id: 1, total_amount: 11000 },
        { id: 2, total_amount: 1200 },
      ],
    },
  },
  {
    id: "task-9",
    shortTitle: "Транзакция + SAVEPOINT + обработка ошибок",
    taskTitle: "Задача 9 — Транзакция + SAVEPOINT + обработка ошибок",
    taskDescription:
      "Напишите блок DO $ … $ (или функцию), который начинает транзакцию, пытается подтвердить платёж, при ошибке в платеже делает SAVEPOINT и откатывает только платёж, но оставляет заказ в статусе 'pending', логирует ошибку в отдельную таблицу payment_errors.",
    description:
      "Блок DO использует SAVEPOINT для частичного отката: заказ переводится в 'pending' до SAVEPOINT, а попытка подтверждения платежа — после. При EXCEPTION происходит ROLLBACK TO SAVEPOINT, сохраняющий статус заказа, и ошибка записывается в payment_errors.",
    query: `-- Таблица для логирования ошибок
CREATE TABLE IF NOT EXISTS payment_errors (
  id          BIGSERIAL PRIMARY KEY,
  order_id    BIGINT,
  error_msg   TEXT,
  logged_at   TIMESTAMPTZ DEFAULT NOW()
);

DO $$
DECLARE
  v_order_id  BIGINT := 42;
  v_amount    NUMERIC := 15000;
BEGIN
  -- Шаг 1: переводим заказ в pending
  UPDATE orders
  SET    status = 'pending'
  WHERE  id = v_order_id;

  -- SAVEPOINT перед попыткой платежа
  SAVEPOINT before_payment;

  BEGIN
    -- Шаг 2: пытаемся создать платёж
    INSERT INTO payments (order_id, amount, status, payment_date)
    VALUES (v_order_id, v_amount, 'confirmed', NOW());

    -- Имитируем ошибку (например, дублированный платёж)
    RAISE EXCEPTION 'Duplicate payment for order %', v_order_id;

  EXCEPTION WHEN OTHERS THEN
    -- Откатываем только платёж
    ROLLBACK TO SAVEPOINT before_payment;

    -- Логируем ошибку
    INSERT INTO payment_errors (order_id, error_msg)
    VALUES (v_order_id, SQLERRM);

    RAISE NOTICE 'Payment failed, order stays pending. Error: %', SQLERRM;
  END;
END;
$$;

-- Проверяем результат
SELECT id, status FROM orders     WHERE id = 42;
SELECT * FROM payment_errors      ORDER BY logged_at DESC LIMIT 1;`,
    beforeTables: [
      {
        label: "orders",
        data: {
          columns: ["id", "status"],
          rows: [
            { id: 42, status: "new" },
          ],
        },
      },
      {
        label: "payment_errors (пусто до)",
        data: {
          columns: ["id", "order_id", "error_msg", "logged_at"],
          rows: [],
        },
      },
    ],
    afterTable: {
      columns: ["table", "id / order_id", "status / error_msg"],
      rows: [
        { "table": "orders", "id / order_id": 42, "status / error_msg": "pending" },
        { "table": "payment_errors", "id / order_id": 42, "status / error_msg": "Duplicate payment for order 42" },
      ],
    },
  },
  {
    id: "task-10",
    shortTitle: "Оптимизация + EXPLAIN ANALYZE",
    taskTitle: "Задача 10 — Оптимизация + EXPLAIN",
    taskDescription:
      "Дан медленный запрос: сложный JOIN + GROUP BY + WHERE order_date > now() - interval '1 year'. Проанализируйте с помощью EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT) и создайте необходимые индексы (composite и partial), чтобы время выполнения упало минимум в 5–10 раз.",
    description:
      "EXPLAIN ANALYZE показывает планировщику дорогие Seq Scan. Partial-индекс по order_date убирает сканирование старых строк. Composite-индекс (customer_id, order_date) ускоряет JOIN + фильтрацию. Индекс по order_items(order_id) устраняет Hash Join на большой таблице.",
    query: `-- 1. Анализируем медленный запрос
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT
  c.name,
  COUNT(DISTINCT o.id)             AS order_count,
  SUM(oi.quantity * oi.unit_price) AS revenue
FROM customers c
JOIN orders o      ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id = o.id
WHERE o.order_date > NOW() - INTERVAL '1 year'
GROUP BY c.name
ORDER BY revenue DESC;

-- 2. Создаём partial-индекс: только строки за последний год
CREATE INDEX CONCURRENTLY idx_orders_recent
  ON orders (customer_id, order_date)
  WHERE order_date > NOW() - INTERVAL '1 year';

-- 3. Composite-индекс для JOIN по order_items
CREATE INDEX CONCURRENTLY idx_order_items_order_id
  ON order_items (order_id)
  INCLUDE (quantity, unit_price);

-- 4. Повторный EXPLAIN — планировщик должен использовать Index Scan
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT
  c.name,
  COUNT(DISTINCT o.id)             AS order_count,
  SUM(oi.quantity * oi.unit_price) AS revenue
FROM customers c
JOIN orders o       ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id = o.id
WHERE o.order_date > NOW() - INTERVAL '1 year'
GROUP BY c.name
ORDER BY revenue DESC;`,
    beforeTables: [
      {
        label: "EXPLAIN (до индексов) — фрагмент",
        data: {
          columns: ["Node", "Rows", "Cost", "Actual Time"],
          rows: [
            { Node: "Sort", Rows: 5000, Cost: "9823.40", "Actual Time": "210 ms" },
            { Node: "HashAggregate", Rows: 5000, Cost: "9210.00", "Actual Time": "190 ms" },
            { Node: "Hash Join", Rows: 100000, Cost: "8100.00", "Actual Time": "150 ms" },
            { Node: "Seq Scan orders", Rows: 80000, Cost: "3400.00", "Actual Time": "80 ms" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["Node", "Rows", "Cost", "Actual Time"],
      rows: [
        { Node: "Sort", Rows: 5000, Cost: "1240.10", "Actual Time": "18 ms" },
        { Node: "HashAggregate", Rows: 5000, Cost: "1100.00", "Actual Time": "14 ms" },
        { Node: "Nested Loop", Rows: 100000, Cost: "950.00", "Actual Time": "10 ms" },
        { Node: "Index Scan idx_orders_recent", Rows: 18000, Cost: "320.00", "Actual Time": "4 ms" },
      ],
    },
  },
  {
    id: "task-11",
    shortTitle: "Materialized View + refresh policy",
    taskTitle: "Задача 11 — Materialized View + refresh policy",
    taskDescription:
      "Создайте materialized view daily_sales_report, которая каждый день в 00:00 автоматически обновляется и содержит: дату, категорию (полный путь), выручку, количество заказов, средний чек. Используйте REFRESH MATERIALIZED VIEW CONCURRENTLY.",
    description:
      "Materialized view создаётся на основе JOIN orders + order_items + рекурсивного CTE для полного пути категорий. UNIQUE-индекс по (report_date, category_path) необходим для CONCURRENTLY-обновления. Задание pg_cron запускает refresh каждый день в полночь без блокировки чтения.",
    query: `-- 1. Создаём materialized view
CREATE MATERIALIZED VIEW daily_sales_report AS
WITH RECURSIVE cat_path AS (
  SELECT id, name, parent_id, name::TEXT AS full_path
  FROM   categories WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, c.name, c.parent_id, cp.full_path || ' → ' || c.name
  FROM   categories c
  JOIN   cat_path cp ON cp.id = c.parent_id
)
SELECT
  o.order_date::DATE                        AS report_date,
  cp.full_path                              AS category_path,
  SUM(oi.quantity * oi.unit_price)          AS revenue,
  COUNT(DISTINCT o.id)                      AS order_count,
  ROUND(AVG(o.total_amount), 2)             AS avg_check
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
JOIN products p     ON p.id = oi.product_id
JOIN cat_path cp    ON cp.id = p.category_id
GROUP BY o.order_date::DATE, cp.full_path
WITH NO DATA;

-- 2. Уникальный индекс (обязателен для CONCURRENTLY)
CREATE UNIQUE INDEX idx_daily_sales_report_pk
  ON daily_sales_report (report_date, category_path);

-- 3. Первичное заполнение
REFRESH MATERIALIZED VIEW daily_sales_report;

-- 4. Автообновление через pg_cron (каждый день в 00:00)
SELECT cron.schedule(
  'refresh_daily_sales',
  '0 0 * * *',
  $$REFRESH MATERIALIZED VIEW CONCURRENTLY daily_sales_report$$
);

-- 5. Запрос к view
SELECT * FROM daily_sales_report
WHERE  report_date = CURRENT_DATE - 1
ORDER  BY revenue DESC;`,
    beforeTables: [
      {
        label: "orders + order_items (срез)",
        data: {
          columns: ["order_date", "category_path", "quantity", "unit_price", "total_amount"],
          rows: [
            { order_date: "2024-05-14", category_path: "Электроника → Смартфоны", quantity: 3, unit_price: 90000, total_amount: 270000 },
            { order_date: "2024-05-14", category_path: "Электроника → Смартфоны", quantity: 1, unit_price: 75000, total_amount: 75000 },
            { order_date: "2024-05-14", category_path: "Электроника → Ноутбуки", quantity: 2, unit_price: 120000, total_amount: 240000 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["report_date", "category_path", "revenue", "order_count", "avg_check"],
      rows: [
        { report_date: "2024-05-14", category_path: "Электроника → Смартфоны", revenue: 345000, order_count: 2, avg_check: "172500.00" },
        { report_date: "2024-05-14", category_path: "Электроника → Ноутбуки", revenue: 240000, order_count: 1, avg_check: "240000.00" },
      ],
    },
  },
  {
    id: "task-12",
    shortTitle: "Full-text search + ранжирование",
    taskTitle: "Задача 12 — Full-text search + ranking",
    taskDescription:
      "Добавьте колонку tsv tsvector в products и orders.description. Напишите запрос поиска товаров по описанию и названию с поддержкой русского языка, синонимов и ранжированием по релевантности (ts_rank_cd). Верните топ-20 результатов с подсветкой совпадений.",
    description:
      "Колонка tsv заполняется через to_tsvector('russian', ...) и обновляется триггером. GIN-индекс ускоряет поиск по tsvector. Запрос использует @@ для фильтрации, ts_rank_cd для ранжирования и ts_headline для подсветки фрагментов с найденными словами.",
    query: `-- 1. Добавляем колонку tsvector
ALTER TABLE products ADD COLUMN IF NOT EXISTS tsv TSVECTOR;

-- 2. Заполняем вектор (название × 2 + описание)
UPDATE products
SET tsv = setweight(to_tsvector('russian', COALESCE(name, '')), 'A')
       || setweight(to_tsvector('russian', COALESCE(description, '')), 'B');

-- 3. GIN-индекс для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_products_tsv
  ON products USING GIN (tsv);

-- 4. Триггер для автообновления tsv при изменении строки
CREATE OR REPLACE FUNCTION trg_products_tsv()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.tsv := setweight(to_tsvector('russian', COALESCE(NEW.name, '')), 'A')
          || setweight(to_tsvector('russian', COALESCE(NEW.description, '')), 'B');
  RETURN NEW;
END;
$$;

CREATE TRIGGER products_tsv_update
BEFORE INSERT OR UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION trg_products_tsv();

-- 5. Полнотекстовый поиск с ранжированием
SELECT
  p.id,
  p.name,
  ts_rank_cd(p.tsv, query)             AS rank,
  ts_headline(
    'russian', p.description, query,
    'StartSel=<b>, StopSel=</b>, MaxWords=20'
  )                                    AS headline
FROM products p,
     to_tsquery('russian', 'беспроводной & наушники') AS query
WHERE p.tsv @@ query
ORDER BY rank DESC
LIMIT 20;`,
    beforeTables: [
      {
        label: "products",
        data: {
          columns: ["id", "name", "description"],
          rows: [
            { id: 1, name: "Беспроводные наушники Sony", description: "Наушники с шумоподавлением и Bluetooth 5.0" },
            { id: 2, name: "Проводная гарнитура JBL", description: "Качественный звук для игр и звонков" },
            { id: 3, name: "Наушники Apple AirPods", description: "Беспроводные наушники с чехлом-зарядкой" },
            { id: 4, name: "Клавиатура Logitech", description: "Беспроводная механическая клавиатура" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["id", "name", "rank", "headline"],
      rows: [
        { id: 1, name: "Беспроводные наушники Sony", rank: "0.750", headline: "<b>Наушники</b> с шумоподавлением и Bluetooth 5.0" },
        { id: 3, name: "Наушники Apple AirPods", rank: "0.600", headline: "<b>Беспроводные</b> <b>наушники</b> с чехлом-зарядкой" },
      ],
    },
  },
  {
    id: "task-13",
    shortTitle: "Массивы — поиск по тегам",
    taskTitle: "Задача 13 — Массивы + операторы",
    taskDescription:
      "В products.tags хранится массив тегов. Напишите запрос, который находит все продукты, у которых есть ВСЕ теги из списка ['wireless', 'noise_canceling', 'bluetooth'] и хотя бы ОДИН из ['premium', 'limited'], отсортируйте по цене и выведите количество совпадений тегов.",
    description:
      "Оператор @> проверяет, что массив tags содержит ВСЕ указанные теги (подмножество). Оператор && проверяет наличие хотя бы одного пересечения с массивом. Подзапрос через unnest подсчитывает суммарное количество совпадающих тегов из обоих списков.",
    query: `SELECT
  p.id,
  p.name,
  p.price,
  p.tags,
  -- Считаем общее число совпадений из обоих списков
  (
    SELECT COUNT(*)
    FROM unnest(p.tags) AS t
    WHERE t = ANY(ARRAY['wireless','noise_canceling','bluetooth','premium','limited'])
  )                              AS matched_tag_count
FROM products p
WHERE
  -- Все три тега обязательно присутствуют
  p.tags @> ARRAY['wireless', 'noise_canceling', 'bluetooth']
  -- И хотя бы один из премиум-тегов
  AND p.tags && ARRAY['premium', 'limited']
ORDER BY p.price ASC;`,
    beforeTables: [
      {
        label: "products",
        data: {
          columns: ["id", "name", "price", "tags"],
          rows: [
            { id: 1, name: "Sony WH-1000XM5", price: 29990, tags: '{"wireless","noise_canceling","bluetooth","premium"}' },
            { id: 2, name: "Bose QC45", price: 24990, tags: '{"wireless","noise_canceling","bluetooth","limited"}' },
            { id: 3, name: "JBL Tune 510BT", price: 5990, tags: '{"wireless","bluetooth"}' },
            { id: 4, name: "AirPods Max Limited", price: 54990, tags: '{"wireless","noise_canceling","bluetooth","premium","limited"}' },
            { id: 5, name: "Sennheiser HD 450BT", price: 12990, tags: '{"wireless","noise_canceling","bluetooth"}' },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["id", "name", "price", "tags", "matched_tag_count"],
      rows: [
        { id: 2, name: "Bose QC45", price: 24990, tags: '{"wireless","noise_canceling","bluetooth","limited"}', matched_tag_count: 4 },
        { id: 1, name: "Sony WH-1000XM5", price: 29990, tags: '{"wireless","noise_canceling","bluetooth","premium"}', matched_tag_count: 4 },
        { id: 4, name: "AirPods Max Limited", price: 54990, tags: '{"wireless","noise_canceling","bluetooth","premium","limited"}', matched_tag_count: 5 },
      ],
    },
  },
  {
    id: "task-14",
    shortTitle: "LATERAL join — топ-2 товара в заказе",
    taskTitle: "Задача 14 — LATERAL join + подзапросы",
    taskDescription:
      "Для каждого заказа выведите: общую сумму, самый дорогой товар в заказе (название + цена) и второй самый дорогой товар. Используйте LATERAL подзапросы (без оконных функций).",
    description:
      "JOIN LATERAL позволяет подзапросу ссылаться на строки внешнего запроса. Два LATERAL-подзапроса top1 и top2 независимо выбирают первый и второй товар по убыванию цены с помощью ORDER BY + LIMIT + OFFSET. Это аналог ROW_NUMBER() без оконных функций.",
    query: `SELECT
  o.id                          AS order_id,
  o.order_date,
  SUM(oi.quantity * oi.unit_price) AS total_amount,
  top1.name                     AS most_expensive,
  top1.unit_price               AS top1_price,
  top2.name                     AS second_expensive,
  top2.unit_price               AS top2_price
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
JOIN products p     ON p.id = oi.product_id

-- Самый дорогой товар
JOIN LATERAL (
  SELECT p2.name, oi2.unit_price
  FROM   order_items oi2
  JOIN   products p2 ON p2.id = oi2.product_id
  WHERE  oi2.order_id = o.id
  ORDER  BY oi2.unit_price DESC
  LIMIT  1
) top1 ON true

-- Второй по цене товар
LEFT JOIN LATERAL (
  SELECT p3.name, oi3.unit_price
  FROM   order_items oi3
  JOIN   products p3 ON p3.id = oi3.product_id
  WHERE  oi3.order_id = o.id
  ORDER  BY oi3.unit_price DESC
  LIMIT  1 OFFSET 1
) top2 ON true

GROUP BY o.id, o.order_date, top1.name, top1.unit_price, top2.name, top2.unit_price
ORDER BY o.id;`,
    beforeTables: [
      {
        label: "orders",
        data: {
          columns: ["id", "order_date"],
          rows: [
            { id: 1, order_date: "2024-05-01" },
            { id: 2, order_date: "2024-05-03" },
          ],
        },
      },
      {
        label: "order_items",
        data: {
          columns: ["order_id", "product_id", "quantity", "unit_price"],
          rows: [
            { order_id: 1, product_id: 1, quantity: 1, unit_price: 90000 },
            { order_id: 1, product_id: 2, quantity: 2, unit_price: 1500 },
            { order_id: 1, product_id: 3, quantity: 1, unit_price: 45000 },
            { order_id: 2, product_id: 4, quantity: 1, unit_price: 5000 },
          ],
        },
      },
      {
        label: "products",
        data: {
          columns: ["id", "name"],
          rows: [
            { id: 1, name: "iPhone 15" },
            { id: 2, name: "Чехол" },
            { id: 3, name: "AirPods" },
            { id: 4, name: "Кабель USB-C" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["order_id", "order_date", "total_amount", "most_expensive", "top1_price", "second_expensive", "top2_price"],
      rows: [
        { order_id: 1, order_date: "2024-05-01", total_amount: 138000, most_expensive: "iPhone 15", top1_price: 90000, second_expensive: "AirPods", top2_price: 45000 },
        { order_id: 2, order_date: "2024-05-03", total_amount: 5000, most_expensive: "Кабель USB-C", top1_price: 5000, second_expensive: null, top2_price: null },
      ],
    },
  },
  {
    id: "task-15",
    shortTitle: "Range partitioning + partition pruning",
    taskTitle: "Задача 15 — Range partitioning + partition pruning",
    taskDescription:
      "Пересоздайте таблицу orders как партиционированную по order_date (RANGE по месяцам). Напишите запрос, который выбирает заказы за март 2025 года, покажите в EXPLAIN partition pruning и добавьте local index на партицию для теста производительности.",
    description:
      "Таблица создаётся с PARTITION BY RANGE (order_date), каждая партиция — отдельный месяц. При запросе с фильтром по дате PostgreSQL автоматически пропускает ненужные партиции (partition pruning), что видно в EXPLAIN. Локальный индекс создаётся только для нужной партиции.",
    query: `-- 1. Создаём партиционированную таблицу
CREATE TABLE orders_partitioned (
  id           BIGSERIAL,
  customer_id  BIGINT       NOT NULL,
  order_date   DATE         NOT NULL,
  status       TEXT,
  total_amount NUMERIC(12,2),
  PRIMARY KEY (id, order_date)
) PARTITION BY RANGE (order_date);

-- 2. Партиции по месяцам
CREATE TABLE orders_2025_02
  PARTITION OF orders_partitioned
  FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');

CREATE TABLE orders_2025_03
  PARTITION OF orders_partitioned
  FOR VALUES FROM ('2025-03-01') TO ('2025-04-01');

CREATE TABLE orders_2025_04
  PARTITION OF orders_partitioned
  FOR VALUES FROM ('2025-04-01') TO ('2025-05-01');

-- 3. Локальный индекс только на мартовскую партицию
CREATE INDEX idx_orders_2025_03_customer
  ON orders_2025_03 (customer_id, order_date);

-- 4. Запрос: PostgreSQL читает только orders_2025_03
SELECT id, customer_id, order_date, total_amount
FROM   orders_partitioned
WHERE  order_date BETWEEN '2025-03-01' AND '2025-03-31'
ORDER  BY order_date;

-- 5. EXPLAIN покажет Partition Pruning
EXPLAIN (ANALYZE, FORMAT TEXT)
SELECT id, customer_id, order_date, total_amount
FROM   orders_partitioned
WHERE  order_date BETWEEN '2025-03-01' AND '2025-03-31';`,
    beforeTables: [
      {
        label: "Партиции таблицы orders_partitioned",
        data: {
          columns: ["partition_name", "range_from", "range_to"],
          rows: [
            { partition_name: "orders_2025_02", range_from: "2025-02-01", range_to: "2025-03-01" },
            { partition_name: "orders_2025_03", range_from: "2025-03-01", range_to: "2025-04-01" },
            { partition_name: "orders_2025_04", range_from: "2025-04-01", range_to: "2025-05-01" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["EXPLAIN node", "partitions_scanned", "rows_removed", "actual_time"],
      rows: [
        { "EXPLAIN node": "Seq Scan on orders_2025_03", partitions_scanned: 1, rows_removed: 0, actual_time: "0.8 ms" },
        { "EXPLAIN node": "Partition Pruning removed", partitions_scanned: "orders_2025_02, orders_2025_04", rows_removed: 2, actual_time: "—" },
      ],
    },
  },
  {
    id: "task-16",
    shortTitle: "Row-level security + роли и политики",
    taskTitle: "Задача 16 — Row-level security + политики",
    taskDescription:
      "Реализуйте RLS так, чтобы: обычный пользователь видел только свои заказы; менеджер поддержки (роль support) видел все заказы со статусом 'problem' или 'returned'; администратор видел абсолютно всё. Создайте роли, политики и протестируйте поведение.",
    description:
      "RLS включается командой ALTER TABLE ... ENABLE ROW LEVEL SECURITY. Отдельные политики (CREATE POLICY) проверяют текущую роль через current_user или pg_has_role. Политика USING определяет условие видимости строк; BYPASS RLS для суперпользователя. Каждый SELECT автоматически фильтруется нужной политикой.",
    query: `-- 1. Создаём роли
CREATE ROLE app_user;
CREATE ROLE support;
CREATE ROLE admin;
GRANT admin TO CURRENT_USER;

-- 2. Включаем RLS на таблице orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders FORCE ROW LEVEL SECURITY;

-- 3. Политика: обычный пользователь видит только свои заказы
CREATE POLICY orders_own
  ON orders
  FOR ALL
  TO app_user
  USING (customer_id = (
    SELECT id FROM customers WHERE username = current_user
  ));

-- 4. Политика: support видит проблемные заказы
CREATE POLICY orders_support
  ON orders
  FOR SELECT
  TO support
  USING (status IN ('problem', 'returned'));

-- 5. Политика: admin видит всё
CREATE POLICY orders_admin
  ON orders
  FOR ALL
  TO admin
  USING (true);

-- 6. Тест: переключаемся в роль app_user
SET ROLE app_user;
SELECT id, customer_id, status FROM orders; -- видны только свои

-- Переключаемся в support
SET ROLE support;
SELECT id, customer_id, status FROM orders; -- только problem/returned

-- Сбрасываем роль
RESET ROLE;`,
    beforeTables: [
      {
        label: "orders (все строки в БД)",
        data: {
          columns: ["id", "customer_id", "status"],
          rows: [
            { id: 1, customer_id: 1, status: "completed" },
            { id: 2, customer_id: 2, status: "problem" },
            { id: 3, customer_id: 1, status: "returned" },
            { id: 4, customer_id: 3, status: "pending" },
            { id: 5, customer_id: 2, status: "completed" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["role", "id", "customer_id", "status", "visible"],
      rows: [
        { role: "app_user (customer_id=1)", id: 1, customer_id: 1, status: "completed", visible: "да" },
        { role: "app_user (customer_id=1)", id: 3, customer_id: 1, status: "returned", visible: "да" },
        { role: "support", id: 2, customer_id: 2, status: "problem", visible: "да" },
        { role: "support", id: 3, customer_id: 1, status: "returned", visible: "да" },
        { role: "admin", id: "1–5", customer_id: "все", status: "все", visible: "да" },
      ],
    },
  },
  {
    id: "task-17",
    shortTitle: "LATERAL + JSONB-агрегация последних заказов",
    taskTitle: "Задача 17 — LATERAL + генерация рядов",
    taskDescription:
      "Для каждого пользователя, который сделал ≥ 3 заказа, сгенерируйте отчёт «последние 5 заказов» в одной строке: колонка last_orders — массив JSONB с объектами {order_id, date, total, status}. Используйте LATERAL + array_agg.",
    description:
      "Подзапрос LATERAL ранжирует заказы пользователя по дате DESC и берёт первые 5. Функция jsonb_build_object формирует объект для каждого заказа, array_agg собирает их в массив, to_jsonb преобразует в JSONB. HAVING фильтрует пользователей с ≥ 3 заказами.",
    query: `SELECT
  c.id                        AS customer_id,
  c.name                      AS customer_name,
  COUNT(o_all.id)             AS total_orders,
  last5.last_orders
FROM customers c
JOIN orders o_all ON o_all.customer_id = c.id

-- LATERAL: последние 5 заказов одним массивом JSONB
JOIN LATERAL (
  SELECT
    array_agg(
      jsonb_build_object(
        'order_id', o.id,
        'date',     o.order_date,
        'total',    o.total_amount,
        'status',   o.status
      )
      ORDER BY o.order_date DESC
    )                         AS last_orders
  FROM (
    SELECT id, order_date, total_amount, status
    FROM   orders
    WHERE  customer_id = c.id
    ORDER  BY order_date DESC
    LIMIT  5
  ) o
) last5 ON true

GROUP BY c.id, c.name, last5.last_orders
HAVING COUNT(o_all.id) >= 3
ORDER BY total_orders DESC;`,
    beforeTables: [
      {
        label: "customers",
        data: {
          columns: ["id", "name"],
          rows: [
            { id: 1, name: "Иван Петров" },
            { id: 2, name: "Мария Сидорова" },
            { id: 3, name: "Алексей Козлов" },
          ],
        },
      },
      {
        label: "orders",
        data: {
          columns: ["id", "customer_id", "order_date", "total_amount", "status"],
          rows: [
            { id: 1, customer_id: 1, order_date: "2024-01-10", total_amount: 5000, status: "completed" },
            { id: 2, customer_id: 1, order_date: "2024-02-15", total_amount: 12000, status: "completed" },
            { id: 3, customer_id: 1, order_date: "2024-03-20", total_amount: 8000, status: "pending" },
            { id: 4, customer_id: 1, order_date: "2024-04-05", total_amount: 3000, status: "completed" },
            { id: 5, customer_id: 2, order_date: "2024-01-05", total_amount: 1500, status: "completed" },
            { id: 6, customer_id: 2, order_date: "2024-02-10", total_amount: 900, status: "completed" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["customer_id", "customer_name", "total_orders", "last_orders (JSONB array)"],
      rows: [
        { customer_id: 1, customer_name: "Иван Петров", total_orders: 4, "last_orders (JSONB array)": '[{"order_id":4,"date":"2024-04-05","total":3000,"status":"completed"},{"order_id":3,...},...]' },
      ],
    },
  },
  {
    id: "task-18",
    shortTitle: "Gaps and Islands — периоды активных заказов",
    taskTitle: "Задача 18 — Гап-анализ заказов (gaps and islands)",
    taskDescription:
      "Найдите все периоды (островки), когда пользователь совершал заказы чаще, чем раз в 30 дней. Выведите: user_id, начало_периода, конец_периода, количество_заказов_в_периоде. Используйте оконные функции (LAG + условная сумма).",
    description:
      "LAG вычисляет разницу в днях между текущим и предыдущим заказом. Если разрыв > 30 дней — начинается новый «остров», флаг is_new_island = 1. Накопительная сумма этих флагов (SUM OVER ORDER BY) формирует номер острова. Финальная GROUP BY группирует заказы по островам.",
    query: `WITH order_gaps AS (
  SELECT
    customer_id,
    order_date,
    order_date - LAG(order_date) OVER (
      PARTITION BY customer_id
      ORDER BY order_date
    )                                          AS days_since_prev,
    CASE
      WHEN order_date - LAG(order_date) OVER (
             PARTITION BY customer_id
             ORDER BY order_date
           ) > 30
        OR LAG(order_date) OVER (
             PARTITION BY customer_id
             ORDER BY order_date
           ) IS NULL
      THEN 1
      ELSE 0
    END                                        AS is_new_island
  FROM orders
),
islands_numbered AS (
  SELECT
    customer_id,
    order_date,
    days_since_prev,
    SUM(is_new_island) OVER (
      PARTITION BY customer_id
      ORDER BY order_date
      ROWS UNBOUNDED PRECEDING
    )                                          AS island_id
  FROM order_gaps
)
SELECT
  customer_id,
  island_id,
  MIN(order_date)                              AS period_start,
  MAX(order_date)                              AS period_end,
  COUNT(*)                                     AS orders_in_period,
  MAX(order_date) - MIN(order_date)            AS period_days
FROM islands_numbered
GROUP BY customer_id, island_id
HAVING COUNT(*) > 1
ORDER BY customer_id, period_start;`,
    beforeTables: [
      {
        label: "orders (customer_id=1, по дате)",
        data: {
          columns: ["id", "customer_id", "order_date"],
          rows: [
            { id: 1, customer_id: 1, order_date: "2024-01-05" },
            { id: 2, customer_id: 1, order_date: "2024-01-20" },
            { id: 3, customer_id: 1, order_date: "2024-02-10" },
            { id: 4, customer_id: 1, order_date: "2024-04-01" },
            { id: 5, customer_id: 1, order_date: "2024-04-15" },
            { id: 6, customer_id: 1, order_date: "2024-04-28" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["customer_id", "island_id", "period_start", "period_end", "orders_in_period", "period_days"],
      rows: [
        { customer_id: 1, island_id: 1, period_start: "2024-01-05", period_end: "2024-02-10", orders_in_period: 3, period_days: 36 },
        { customer_id: 1, island_id: 2, period_start: "2024-04-01", period_end: "2024-04-28", orders_in_period: 3, period_days: 27 },
      ],
    },
  },
  {
    id: "task-19",
    shortTitle: "Upsert + ON CONFLICT + RETURNING",
    taskTitle: "Задача 19 — Upsert + ON CONFLICT + RETURNING",
    taskDescription:
      "Напишите вставку/обновление товара по внешнему ключу supplier_sku. Если товар существует — обновить price, stock и updated_at; если нет — вставить. Вернуть в результате id, был_insert (boolean), old_price (если был апдейт).",
    description:
      "INSERT ... ON CONFLICT (supplier_sku) DO UPDATE позволяет атомарно выполнить upsert. Выражение EXCLUDED ссылается на отвергнутую строку. Чтобы вернуть old_price и флаг вставки, используется CTE: сначала upsert с RETURNING, затем LEFT JOIN с оригинальной таблицей для получения старых значений.",
    query: `-- Добавляем поле supplier_sku в products
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS supplier_sku TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS stock        INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS updated_at   TIMESTAMPTZ DEFAULT NOW();

-- Upsert с возвратом результата
WITH upsert AS (
  INSERT INTO products (name, price, stock, supplier_sku, updated_at)
  VALUES
    ('iPhone 15 Pro', 99990, 50, 'APPL-IP15PRO', NOW()),
    ('Samsung Galaxy S25', 89990, 30, 'SAMS-GS25', NOW())
  ON CONFLICT (supplier_sku) DO UPDATE
    SET price      = EXCLUDED.price,
        stock      = EXCLUDED.stock,
        updated_at = NOW()
  RETURNING
    id,
    supplier_sku,
    price                        AS new_price,
    (xmax = 0)                   AS was_insert
    -- xmax = 0 означает новую вставку, xmax != 0 — обновление
),
old_prices AS (
  SELECT supplier_sku, price AS old_price
  FROM   products
  WHERE  supplier_sku IN ('APPL-IP15PRO', 'SAMS-GS25')
)
SELECT
  u.id,
  u.supplier_sku,
  u.was_insert,
  u.new_price,
  op.old_price
FROM upsert u
LEFT JOIN old_prices op USING (supplier_sku)
ORDER BY u.id;`,
    beforeTables: [
      {
        label: "products (до upsert)",
        data: {
          columns: ["id", "name", "price", "stock", "supplier_sku"],
          rows: [
            { id: 1, name: "iPhone 15 Pro", price: 94990, stock: 10, supplier_sku: "APPL-IP15PRO" },
            { id: 2, name: "Клавиатура", price: 3500, stock: 100, supplier_sku: "LOG-KB100" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["id", "supplier_sku", "was_insert", "new_price", "old_price"],
      rows: [
        { id: 1, supplier_sku: "APPL-IP15PRO", was_insert: false, new_price: 99990, old_price: 94990 },
        { id: 3, supplier_sku: "SAMS-GS25", was_insert: true, new_price: 89990, old_price: null },
      ],
    },
  },
  {
    id: "task-20",
    shortTitle: "Recursive CTE + closure-таблица категорий",
    taskTitle: "Задача 20 — Recursive CTE + материализованный путь",
    taskDescription:
      "В categories уже есть parent_id. Создайте materialized view category_closure (ancestor_id, descendant_id, depth), которая содержит все пары предок-потомок. Обновляйте её триггером после изменения categories (или через pg_cron раз в сутки).",
    description:
      "Рекурсивный CTE строит транзитивное замыкание графа: каждая категория связана сама с собой (depth=0) и со всеми своими потомками (depth=N). Materialized view сохраняет это замыкание. Триггер на таблице categories вызывает REFRESH после INSERT/UPDATE/DELETE.",
    query: `-- 1. Materialized view с транзитивным замыканием
CREATE MATERIALIZED VIEW category_closure AS
WITH RECURSIVE closure AS (
  -- Каждая категория — предок самой себя (глубина 0)
  SELECT id AS ancestor_id, id AS descendant_id, 0 AS depth
  FROM   categories

  UNION ALL

  -- Добавляем детей на каждой итерации
  SELECT cl.ancestor_id, c.id, cl.depth + 1
  FROM   closure cl
  JOIN   categories c ON c.parent_id = cl.descendant_id
)
SELECT ancestor_id, descendant_id, depth
FROM   closure;

CREATE UNIQUE INDEX idx_category_closure_pk
  ON category_closure (ancestor_id, descendant_id);

-- 2. Триггерная функция для обновления closure
CREATE OR REPLACE FUNCTION trg_refresh_category_closure()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY category_closure;
  RETURN NULL;
END;
$$;

CREATE TRIGGER refresh_closure_after_change
AFTER INSERT OR UPDATE OR DELETE ON categories
FOR EACH STATEMENT
EXECUTE FUNCTION trg_refresh_category_closure();

-- 3. Пример: все потомки категории "Электроника" (id=1)
SELECT descendant_id, depth
FROM   category_closure
WHERE  ancestor_id = 1 AND depth > 0
ORDER  BY depth, descendant_id;`,
    beforeTables: [
      {
        label: "categories",
        data: {
          columns: ["id", "name", "parent_id"],
          rows: [
            { id: 1, name: "Электроника", parent_id: null },
            { id: 2, name: "Смартфоны", parent_id: 1 },
            { id: 3, name: "Apple", parent_id: 2 },
            { id: 4, name: "Samsung", parent_id: 2 },
            { id: 5, name: "Ноутбуки", parent_id: 1 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["ancestor_id", "descendant_id", "depth"],
      rows: [
        { ancestor_id: 1, descendant_id: 2, depth: 1 },
        { ancestor_id: 1, descendant_id: 5, depth: 1 },
        { ancestor_id: 1, descendant_id: 3, depth: 2 },
        { ancestor_id: 1, descendant_id: 4, depth: 2 },
        { ancestor_id: 2, descendant_id: 3, depth: 1 },
        { ancestor_id: 2, descendant_id: 4, depth: 1 },
      ],
    },
  },
  {
    id: "task-21",
    shortTitle: "Unnest — агрегация по тегам",
    taskTitle: "Задача 21 — Агрегация по массиву тегов",
    taskDescription:
      "Посчитайте, сколько раз каждый тег встретился в проданных товарах (по order_items за последний год). Выведите топ-15 тегов по количеству проданных единиц + отдельно топ-5 по выручке. Используйте unnest() + группировку.",
    description:
      "unnest(p.tags) разворачивает массив тегов в строки, позволяя группировать по каждому тегу. SUM(oi.quantity) считает проданные единицы, SUM(oi.quantity * oi.unit_price) — выручку. UNION ALL объединяет два рейтинга: по quantity (топ-15) и по revenue (топ-5).",
    query: `WITH tag_stats AS (
  SELECT
    tag,
    SUM(oi.quantity)                  AS total_sold,
    SUM(oi.quantity * oi.unit_price)  AS total_revenue
  FROM order_items oi
  JOIN products p  ON p.id = oi.product_id
  JOIN orders o    ON o.id = oi.order_id,
  LATERAL unnest(p.tags) AS tag
  WHERE o.order_date >= CURRENT_DATE - INTERVAL '1 year'
  GROUP BY tag
)
-- Топ-15 по количеству проданных единиц
SELECT
  'top_by_qty'  AS report,
  tag,
  total_sold,
  total_revenue,
  RANK() OVER (ORDER BY total_sold DESC) AS rank
FROM tag_stats
ORDER BY total_sold DESC
LIMIT 15

UNION ALL

-- Топ-5 по выручке
SELECT
  'top_by_revenue',
  tag,
  total_sold,
  total_revenue,
  RANK() OVER (ORDER BY total_revenue DESC)
FROM tag_stats
ORDER BY total_revenue DESC
LIMIT 5;`,
    beforeTables: [
      {
        label: "products (с тегами)",
        data: {
          columns: ["id", "name", "price", "tags"],
          rows: [
            { id: 1, name: "iPhone 15", price: 90000, tags: '{"apple","5g","wireless","premium"}' },
            { id: 2, name: "Samsung S24", price: 75000, tags: '{"android","5g","wireless"}' },
            { id: 3, name: "AirPods Pro", price: 24990, tags: '{"apple","wireless","noise_canceling","premium"}' },
            { id: 4, name: "Galaxy Buds", price: 9990, tags: '{"android","wireless","noise_canceling"}' },
          ],
        },
      },
      {
        label: "order_items (за год)",
        data: {
          columns: ["product_id", "quantity", "unit_price"],
          rows: [
            { product_id: 1, quantity: 120, unit_price: 90000 },
            { product_id: 2, quantity: 80, unit_price: 75000 },
            { product_id: 3, quantity: 200, unit_price: 24990 },
            { product_id: 4, quantity: 150, unit_price: 9990 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["report", "tag", "total_sold", "total_revenue", "rank"],
      rows: [
        { report: "top_by_qty", tag: "wireless", total_sold: 550, total_revenue: 22992000, rank: 1 },
        { report: "top_by_qty", tag: "noise_canceling", total_sold: 350, total_revenue: 6496500, rank: 2 },
        { report: "top_by_qty", tag: "android", total_sold: 230, total_revenue: 7498500, rank: 3 },
        { report: "top_by_revenue", tag: "wireless", total_sold: 550, total_revenue: 22992000, rank: 1 },
        { report: "top_by_revenue", tag: "apple", total_sold: 320, total_revenue: 15798000, rank: 2 },
      ],
    },
  },
  {
    id: "task-22",
    shortTitle: "Пивот — выручка по месяцам (crosstab / FILTER)",
    taskTitle: "Задача 22 — Пивот — динамические колонки",
    taskDescription:
      "Сделайте отчёт по выручке за последние 12 месяцев: user_id | jan_2025 | feb_2025 | … | dec_2025 | total. Используйте crosstab из tablefunc или FILTER + CASE.",
    description:
      "FILTER (WHERE ...) — стандартный способ статического пивота в PostgreSQL: для каждого месяца отдельный SUM с фильтром по месяцу. Расширение tablefunc позволяет делать динамический crosstab. Оба подхода показаны: FILTER + CASE — для читаемости, crosstab — для гибкости.",
    query: `-- Способ 1: статический пивот через FILTER + CASE
SELECT
  customer_id,
  SUM(total_amount) FILTER (
    WHERE DATE_TRUNC('month', order_date) = '2025-01-01'
  )                                                   AS jan_2025,
  SUM(total_amount) FILTER (
    WHERE DATE_TRUNC('month', order_date) = '2025-02-01'
  )                                                   AS feb_2025,
  SUM(total_amount) FILTER (
    WHERE DATE_TRUNC('month', order_date) = '2025-03-01'
  )                                                   AS mar_2025,
  SUM(total_amount) FILTER (
    WHERE DATE_TRUNC('month', order_date) = '2025-04-01'
  )                                                   AS apr_2025,
  SUM(total_amount) FILTER (
    WHERE order_date >= '2025-01-01'
      AND order_date <  '2026-01-01'
  )                                                   AS total
FROM orders
WHERE order_date >= '2025-01-01'
  AND order_date <  '2026-01-01'
GROUP BY customer_id
ORDER BY total DESC;

-- Способ 2: crosstab (требует расширение tablefunc)
CREATE EXTENSION IF NOT EXISTS tablefunc;

SELECT *
FROM crosstab(
  $$
    SELECT
      customer_id,
      TO_CHAR(order_date, 'YYYY-MM') AS month,
      SUM(total_amount)
    FROM orders
    WHERE order_date BETWEEN '2025-01-01' AND '2025-12-31'
    GROUP BY customer_id, TO_CHAR(order_date, 'YYYY-MM')
    ORDER BY 1, 2
  $$,
  $$SELECT m FROM generate_series(
       '2025-01-01'::DATE,
       '2025-12-01'::DATE,
       '1 month'
     ) AS m(month)
     CROSS JOIN (SELECT TO_CHAR(m, 'YYYY-MM')) t$$
) AS ct (
  customer_id BIGINT,
  "2025-01" NUMERIC, "2025-02" NUMERIC, "2025-03" NUMERIC,
  "2025-04" NUMERIC, "2025-05" NUMERIC, "2025-06" NUMERIC,
  "2025-07" NUMERIC, "2025-08" NUMERIC, "2025-09" NUMERIC,
  "2025-10" NUMERIC, "2025-11" NUMERIC, "2025-12" NUMERIC
);`,
    beforeTables: [
      {
        label: "orders",
        data: {
          columns: ["customer_id", "order_date", "total_amount"],
          rows: [
            { customer_id: 1, order_date: "2025-01-10", total_amount: 15000 },
            { customer_id: 1, order_date: "2025-01-25", total_amount: 8000 },
            { customer_id: 1, order_date: "2025-02-14", total_amount: 22000 },
            { customer_id: 2, order_date: "2025-01-05", total_amount: 4500 },
            { customer_id: 2, order_date: "2025-03-20", total_amount: 9000 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["customer_id", "jan_2025", "feb_2025", "mar_2025", "total"],
      rows: [
        { customer_id: 1, jan_2025: 23000, feb_2025: 22000, mar_2025: null, total: 45000 },
        { customer_id: 2, jan_2025: 4500, feb_2025: null, mar_2025: 9000, total: 13500 },
      ],
    },
  },
  {
    id: "task-23",
    shortTitle: "Триггер — авто-статус + уведомление",
    taskTitle: "Задача 23 — Триггер на отложенную проверку",
    taskDescription:
      "Создайте триггер AFTER INSERT/UPDATE на orders, который: если total_amount > 100000 и пользователь не в чёрном списке — ставит статус 'review_needed'; если статус стал 'review_needed' — вставляет уведомление в таблицу notifications.",
    description:
      "Триггерная функция проверяет NEW.total_amount и LEFT JOIN с blacklist. Если условие выполнено, UPDATE меняет статус (без рекурсии благодаря pg_trigger_depth()). Второй блок проверяет, изменился ли статус на review_needed, и вставляет запись в notifications.",
    query: `-- Таблицы для демонстрации
CREATE TABLE IF NOT EXISTS blacklist (customer_id BIGINT PRIMARY KEY);
CREATE TABLE IF NOT EXISTS notifications (
  id          BIGSERIAL PRIMARY KEY,
  order_id    BIGINT,
  message     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Триггерная функция
CREATE OR REPLACE FUNCTION trg_order_review_check()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  v_in_blacklist BOOLEAN;
BEGIN
  -- Проверяем, в чёрном ли списке клиент
  SELECT EXISTS (
    SELECT 1 FROM blacklist WHERE customer_id = NEW.customer_id
  ) INTO v_in_blacklist;

  -- Ставим статус review_needed если нужно
  IF NEW.total_amount > 100000
     AND NOT v_in_blacklist
     AND NEW.status <> 'review_needed'
     AND pg_trigger_depth() = 1            -- защита от рекурсии
  THEN
    UPDATE orders SET status = 'review_needed' WHERE id = NEW.id;
    NEW.status := 'review_needed';
  END IF;

  -- Создаём уведомление если статус стал review_needed
  IF NEW.status = 'review_needed'
     AND (TG_OP = 'INSERT' OR OLD.status <> 'review_needed')
  THEN
    INSERT INTO notifications (order_id, message)
    VALUES (NEW.id, FORMAT('Order #%s requires review (amount: %s)', NEW.id, NEW.total_amount));
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER order_review_check
AFTER INSERT OR UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION trg_order_review_check();

-- Тест: вставка крупного заказа
INSERT INTO orders (customer_id, order_date, total_amount, status)
VALUES (1, NOW(), 150000, 'pending');

SELECT id, status FROM orders ORDER BY id DESC LIMIT 1;
SELECT * FROM notifications ORDER BY created_at DESC LIMIT 1;`,
    beforeTables: [
      {
        label: "blacklist",
        data: {
          columns: ["customer_id"],
          rows: [{ customer_id: 5 }, { customer_id: 12 }],
        },
      },
      {
        label: "orders (до вставки)",
        data: {
          columns: ["id", "customer_id", "total_amount", "status"],
          rows: [
            { id: 1, customer_id: 1, total_amount: 50000, status: "completed" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["table", "id / order_id", "status / message"],
      rows: [
        { "table": "orders", "id / order_id": 2, "status / message": "review_needed" },
        { "table": "notifications", "id / order_id": 2, "status / message": "Order #2 requires review (amount: 150000)" },
      ],
    },
  },
  {
    id: "task-24",
    shortTitle: "Hash partitioning + zero-downtime миграция",
    taskTitle: "Задача 24 — Partition по hash + миграция",
    taskDescription:
      "Перепартиционируйте таблицу order_items по hash(customer_id) на 16 партиций. Напишите скрипт миграции с минимальным downtime: создайте новую таблицу, скопируйте данные, переключите имена, удалите старую.",
    description:
      "PARTITION BY HASH (customer_id) равномерно распределяет строки по 16 партициям. Миграция без downtime: новая таблица создаётся параллельно, данные копируются батчами, затем в короткой транзакции таблицы переименовываются. Старая таблица удаляется после проверки.",
    query: `-- 1. Создаём новую партиционированную таблицу
CREATE TABLE order_items_partitioned (
  id          BIGSERIAL,
  order_id    BIGINT      NOT NULL,
  product_id  BIGINT      NOT NULL,
  customer_id BIGINT      NOT NULL,  -- добавляем для ключа партиции
  quantity    INT         NOT NULL,
  unit_price  NUMERIC(12,2) NOT NULL,
  PRIMARY KEY (id, customer_id)
) PARTITION BY HASH (customer_id);

-- 2. Создаём 16 партиций
DO $$
BEGIN
  FOR i IN 0..15 LOOP
    EXECUTE FORMAT(
      'CREATE TABLE order_items_p%s
       PARTITION OF order_items_partitioned
       FOR VALUES WITH (MODULUS 16, REMAINDER %s)',
      i, i
    );
  END LOOP;
END;
$$;

-- 3. Копируем данные батчами (не блокируя production)
INSERT INTO order_items_partitioned
  (id, order_id, product_id, customer_id, quantity, unit_price)
SELECT
  oi.id, oi.order_id, oi.product_id, o.customer_id, oi.quantity, oi.unit_price
FROM order_items oi
JOIN orders o ON o.id = oi.order_id;

-- 4. Проверка: количество строк должно совпадать
SELECT
  (SELECT COUNT(*) FROM order_items)             AS old_count,
  (SELECT COUNT(*) FROM order_items_partitioned) AS new_count;

-- 5. Атомарное переключение (минимальный downtime — миллисекунды)
BEGIN;
  ALTER TABLE order_items            RENAME TO order_items_old;
  ALTER TABLE order_items_partitioned RENAME TO order_items;
COMMIT;

-- 6. Удаляем старую таблицу после проверки
DROP TABLE order_items_old;

-- 7. Проверяем распределение по партициям
SELECT
  inhrelid::REGCLASS AS partition_name,
  (SELECT COUNT(*) FROM pg_class WHERE oid = inhrelid) AS approx_rows
FROM pg_inherits
WHERE inhparent = 'order_items'::REGCLASS
ORDER BY partition_name;`,
    beforeTables: [
      {
        label: "order_items (старая, без партиций)",
        data: {
          columns: ["id", "order_id", "product_id", "quantity", "unit_price"],
          rows: [
            { id: 1, order_id: 101, product_id: 1, quantity: 2, unit_price: 90000 },
            { id: 2, order_id: 102, product_id: 2, quantity: 1, unit_price: 24990 },
            { id: 3, order_id: 103, product_id: 3, quantity: 3, unit_price: 5000 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["partition_name", "modulus", "remainder", "example_customer_ids"],
      rows: [
        { partition_name: "order_items_p0", modulus: 16, remainder: 0, example_customer_ids: "16, 32, 48, ..." },
        { partition_name: "order_items_p1", modulus: 16, remainder: 1, example_customer_ids: "1, 17, 33, ..." },
        { partition_name: "order_items_p2", modulus: 16, remainder: 2, example_customer_ids: "2, 18, 34, ..." },
        { partition_name: "...", modulus: 16, remainder: "...", example_customer_ids: "..." },
        { partition_name: "order_items_p15", modulus: 16, remainder: 15, example_customer_ids: "15, 31, 47, ..." },
      ],
    },
  },
  {
    id: "task-25",
    shortTitle: "JSONB агрегация — комбинации атрибутов",
    taskTitle: "Задача 25 — JSONB агрегация + группировка по ключам",
    taskDescription:
      "В products.metadata есть поле \"attributes\" — объект {color: \"...\", size: \"...\", material: \"...\"}. Найдите все возможные комбинации (color, size) внутри категории «Одежда» и посчитайте количество товаров по каждой паре.",
    description:
      "Оператор ->> извлекает строковые значения из вложенного JSONB-объекта. Объединяем JOIN с categories, фильтруем по нужной категории, GROUP BY двумя извлечёнными полями. HAVING убирает пары без товаров, ORDER BY сортирует по популярности.",
    query: `SELECT
  cat.name                                        AS category,
  p.metadata->'attributes'->>'color'             AS color,
  p.metadata->'attributes'->>'size'              AS size,
  COUNT(*)                                        AS product_count,
  ROUND(AVG((p.metadata->>'price')::NUMERIC), 2) AS avg_price
FROM products p
JOIN categories cat ON cat.id = p.category_id
WHERE cat.name = 'Одежда'
  AND p.metadata->'attributes'->>'color' IS NOT NULL
  AND p.metadata->'attributes'->>'size'  IS NOT NULL
GROUP BY cat.name,
         p.metadata->'attributes'->>'color',
         p.metadata->'attributes'->>'size'
HAVING COUNT(*) > 0
ORDER BY product_count DESC, color, size;`,
    beforeTables: [
      {
        label: "products (с metadata JSONB)",
        data: {
          columns: ["id", "name", "category_id", "metadata"],
          rows: [
            { id: 1, name: "Футболка белая S", category_id: 10, metadata: '{"attributes":{"color":"white","size":"S","material":"cotton"},"price":1500}' },
            { id: 2, name: "Футболка белая M", category_id: 10, metadata: '{"attributes":{"color":"white","size":"M","material":"cotton"},"price":1600}' },
            { id: 3, name: "Футболка чёрная S", category_id: 10, metadata: '{"attributes":{"color":"black","size":"S","material":"cotton"},"price":1500}' },
            { id: 4, name: "Джинсы синие M", category_id: 10, metadata: '{"attributes":{"color":"blue","size":"M","material":"denim"},"price":4500}' },
            { id: 5, name: "Футболка белая S (v2)", category_id: 10, metadata: '{"attributes":{"color":"white","size":"S","material":"polyester"},"price":1200}' },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["category", "color", "size", "product_count", "avg_price"],
      rows: [
        { category: "Одежда", color: "white", size: "S", product_count: 2, avg_price: "1350.00" },
        { category: "Одежда", color: "black", size: "S", product_count: 1, avg_price: "1500.00" },
        { category: "Одежда", color: "blue", size: "M", product_count: 1, avg_price: "4500.00" },
        { category: "Одежда", color: "white", size: "M", product_count: 1, avg_price: "1600.00" },
      ],
    },
  },
  {
    id: "task-26",
    shortTitle: "Дедупликация заказов — оконные + DELETE",
    taskTitle: "Задача 26 — Deduplication заказов",
    taskDescription:
      "Найдите дубликаты заказов (один пользователь, одинаковая сумма, те же товары ±5 минут). Оставьте только самый поздний заказ из каждой группы дубликатов — удалите остальные через DELETE USING + оконная функция.",
    description:
      "CTE duplicates использует ROW_NUMBER() OVER с PARTITION BY customer_id, total_amount, items_hash и окном в 5 минут (через LAG). Строки с row_num > 1 — дубликаты. DELETE USING удаляет их, ссылаясь на CTE. md5(string_agg) создаёт хэш набора товаров заказа.",
    query: `-- 1. Находим дубликаты: один клиент, та же сумма, ±5 минут
WITH order_signatures AS (
  SELECT
    o.id,
    o.customer_id,
    o.total_amount,
    o.created_at,
    -- Хэш состава заказа
    MD5(STRING_AGG(
      oi.product_id::TEXT || ':' || oi.quantity::TEXT,
      ',' ORDER BY oi.product_id
    ))                        AS items_hash
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  GROUP BY o.id, o.customer_id, o.total_amount, o.created_at
),
ranked AS (
  SELECT
    id,
    customer_id,
    total_amount,
    created_at,
    items_hash,
    ROW_NUMBER() OVER (
      PARTITION BY
        customer_id,
        total_amount,
        items_hash,
        -- группируем заказы в 5-минутные окна
        DATE_TRUNC('hour', created_at) +
        INTERVAL '5 min' * (EXTRACT(MINUTE FROM created_at)::INT / 5)
      ORDER BY created_at DESC   -- оставляем самый поздний
    )                           AS row_num
  FROM order_signatures
)
-- 2. Просматриваем дубликаты (row_num > 1)
SELECT id, customer_id, total_amount, created_at, row_num
FROM   ranked
WHERE  row_num > 1
ORDER  BY customer_id, created_at;

-- 3. Удаляем дубликаты
DELETE FROM orders
USING (
  SELECT id FROM ranked WHERE row_num > 1
) AS dups
WHERE orders.id = dups.id
RETURNING orders.id AS deleted_id;`,
    beforeTables: [
      {
        label: "orders (с дублями)",
        data: {
          columns: ["id", "customer_id", "total_amount", "created_at"],
          rows: [
            { id: 1, customer_id: 1, total_amount: 5000, created_at: "2024-05-01 10:00:00" },
            { id: 2, customer_id: 1, total_amount: 5000, created_at: "2024-05-01 10:02:00" },
            { id: 3, customer_id: 1, total_amount: 5000, created_at: "2024-05-01 10:04:00" },
            { id: 4, customer_id: 2, total_amount: 12000, created_at: "2024-05-02 15:00:00" },
            { id: 5, customer_id: 2, total_amount: 12000, created_at: "2024-05-02 15:03:00" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["deleted_id", "kept_id", "customer_id", "total_amount", "note"],
      rows: [
        { deleted_id: 1, kept_id: 3, customer_id: 1, total_amount: 5000, note: "оставлен самый поздний" },
        { deleted_id: 2, kept_id: 3, customer_id: 1, total_amount: 5000, note: "оставлен самый поздний" },
        { deleted_id: 4, kept_id: 5, customer_id: 2, total_amount: 12000, note: "оставлен самый поздний" },
      ],
    },
  },
  {
    id: "task-27",
    shortTitle: "BRIN + Bloom индексы — сравнение",
    taskTitle: "Задача 27 — BRIN + Bloom индексы — эксперимент",
    taskDescription:
      "Создайте таблицу logs (~1–2 млн строк). Сравните производительность с btree, BRIN (на event_time) и Bloom (на user_id + event_type). Напишите выводы и рекомендации.",
    description:
      "BRIN (Block Range INdex) — ультракомпактный индекс для монотонно растущих данных (даты, id): хранит только мин/макс по блокам страниц. Bloom — вероятностный индекс для equality-фильтрации по нескольким полям: маленький, но с ложными срабатываниями. Btree — универсальный, но большой.",
    query: `-- 1. Создаём таблицу и заполняем ~1 млн строк
CREATE TABLE logs (
  id         BIGSERIAL PRIMARY KEY,
  event_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id    BIGINT      NOT NULL,
  event_type TEXT        NOT NULL,
  payload    JSONB
);

INSERT INTO logs (event_time, user_id, event_type, payload)
SELECT
  NOW() - (random() * INTERVAL '365 days'),
  (random() * 100000)::BIGINT,
  (ARRAY['click','view','purchase','login','logout'])[ceil(random()*5)],
  jsonb_build_object('ip', '10.0.' || (random()*255)::INT || '.1')
FROM generate_series(1, 1000000);

-- 2. Btree-индекс (стандартный)
CREATE INDEX idx_logs_btree_time
  ON logs USING BTREE (event_time);

-- 3. BRIN-индекс (для монотонных данных, в 100× меньше btree)
CREATE INDEX idx_logs_brin_time
  ON logs USING BRIN (event_time) WITH (pages_per_range = 128);

-- 4. Bloom-индекс (для equality по нескольким полям)
CREATE EXTENSION IF NOT EXISTS bloom;
CREATE INDEX idx_logs_bloom
  ON logs USING BLOOM (user_id, event_type)
  WITH (length = 80, col1 = 2, col2 = 1);

-- 5. Сравнение производительности
EXPLAIN (ANALYZE, BUFFERS)
  SELECT COUNT(*) FROM logs
  WHERE event_time > NOW() - INTERVAL '7 days';  -- BRIN выигрывает

EXPLAIN (ANALYZE, BUFFERS)
  SELECT * FROM logs
  WHERE user_id = 42 AND event_type = 'purchase'; -- Bloom выигрывает

-- 6. Размер индексов
SELECT indexname,
       pg_size_pretty(pg_relation_size(indexname::REGCLASS)) AS size
FROM   pg_indexes
WHERE  tablename = 'logs';`,
    beforeTables: [
      {
        label: "Сгенерированная таблица logs (пример строк)",
        data: {
          columns: ["id", "event_time", "user_id", "event_type"],
          rows: [
            { id: 1, event_time: "2024-05-01 10:23:11", user_id: 42, event_type: "purchase" },
            { id: 2, event_time: "2024-07-14 08:00:45", user_id: 1337, event_type: "login" },
            { id: 3, event_time: "2024-11-30 22:15:00", user_id: 42, event_type: "logout" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["indexname", "type", "size", "best_for", "scan_time"],
      rows: [
        { indexname: "idx_logs_btree_time", type: "btree", size: "21 MB", best_for: "range scan, sort", scan_time: "12 ms" },
        { indexname: "idx_logs_brin_time", type: "BRIN", size: "48 kB", best_for: "монотонные диапазоны", scan_time: "18 ms" },
        { indexname: "idx_logs_bloom", type: "Bloom", size: "1.2 MB", best_for: "equality по N полям", scan_time: "9 ms" },
      ],
    },
  },
  {
    id: "task-28",
    shortTitle: "SECURITY DEFINER функция + проверка прав",
    taskTitle: "Задача 28 — Функция с SECURITY DEFINER + права",
    taskDescription:
      "Напишите функцию get_user_stats(user_id bigint) SECURITY DEFINER, которая возвращает количество заказов, общую сумму, средний чек и дату последнего заказа. Обычный пользователь может вызвать функцию только для своего id.",
    description:
      "SECURITY DEFINER означает, что функция выполняется с правами её создателя (а не вызывающего). Проверка current_user через таблицу users ограничивает доступ к чужим данным. RETURNS TABLE позволяет вернуть несколько колонок. SET search_path = '' защищает от подмены схемы.",
    query: `CREATE OR REPLACE FUNCTION get_user_stats(p_user_id BIGINT)
RETURNS TABLE (
  order_count   BIGINT,
  total_spent   NUMERIC,
  avg_check     NUMERIC,
  last_order_at DATE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp   -- защита от search_path injection
AS $$
DECLARE
  v_calling_customer_id BIGINT;
BEGIN
  -- Находим customer_id текущего пользователя по его DB-логину
  SELECT id INTO v_calling_customer_id
  FROM   customers
  WHERE  username = current_user;

  -- Разрешаем только свои данные (или администратору — любые)
  IF v_calling_customer_id IS DISTINCT FROM p_user_id
     AND NOT pg_has_role(current_user, 'admin', 'MEMBER')
  THEN
    RAISE EXCEPTION 'Access denied: cannot view stats for user %', p_user_id;
  END IF;

  RETURN QUERY
  SELECT
    COUNT(o.id)                    AS order_count,
    COALESCE(SUM(o.total_amount), 0) AS total_spent,
    ROUND(AVG(o.total_amount), 2)  AS avg_check,
    MAX(o.order_date)              AS last_order_at
  FROM orders o
  WHERE o.customer_id = p_user_id;
END;
$$;

-- Выдаём право на вызов обычным пользователям
GRANT EXECUTE ON FUNCTION get_user_stats(BIGINT) TO app_user;

-- Тест: вызов от имени своего пользователя
SET ROLE app_user;
SELECT * FROM get_user_stats(1);   -- OK

SELECT * FROM get_user_stats(999); -- ERROR: Access denied`,
    beforeTables: [
      {
        label: "customers",
        data: {
          columns: ["id", "name", "username"],
          rows: [
            { id: 1, name: "Иван Петров", username: "ivan" },
            { id: 2, name: "Мария Сидорова", username: "maria" },
          ],
        },
      },
      {
        label: "orders",
        data: {
          columns: ["id", "customer_id", "order_date", "total_amount"],
          rows: [
            { id: 1, customer_id: 1, order_date: "2024-01-10", total_amount: 5000 },
            { id: 2, customer_id: 1, order_date: "2024-03-15", total_amount: 12000 },
            { id: 3, customer_id: 1, order_date: "2024-06-20", total_amount: 8000 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["order_count", "total_spent", "avg_check", "last_order_at"],
      rows: [
        { order_count: 3, total_spent: 25000, avg_check: "8333.33", last_order_at: "2024-06-20" },
      ],
    },
  },
  {
    id: "task-29",
    shortTitle: "Архивация старых заказов + union view",
    taskTitle: "Задача 29 — TimescaleDB-подобный компрессионный подход",
    taskDescription:
      "Создайте политику архивации: перенесите заказы старше 18 месяцев в таблицу orders_archive (та же структура + compressed boolean). Сожмите данные через jsonb_strip_nulls. Создайте view, объединяющий актуальные + архивные данные.",
    description:
      "orders_archive наследует структуру orders плюс поле compressed. INSERT INTO ... SELECT переносит старые строки, jsonb_strip_nulls убирает NULL-ключи из metadata. DELETE удаляет перенесённые строки из основной таблицы. Финальный VIEW обеспечивает прозрачный доступ ко всем данным.",
    query: `-- 1. Создаём таблицу архива
CREATE TABLE IF NOT EXISTS orders_archive (
  LIKE orders INCLUDING ALL,
  compressed   BOOLEAN DEFAULT FALSE,
  archived_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Переносим заказы старше 18 месяцев
WITH archived AS (
  INSERT INTO orders_archive (
    id, customer_id, order_date, status, total_amount, metadata, compressed, archived_at
  )
  SELECT
    id,
    customer_id,
    order_date,
    status,
    total_amount,
    jsonb_strip_nulls(metadata),  -- убираем null-поля из JSONB
    TRUE,
    NOW()
  FROM orders
  WHERE order_date < CURRENT_DATE - INTERVAL '18 months'
  RETURNING id
)
DELETE FROM orders
WHERE id IN (SELECT id FROM archived)
RETURNING id AS deleted_id;

-- 3. Проверка: количество перенесённых строк
SELECT COUNT(*) AS archived_rows FROM orders_archive WHERE compressed;

-- 4. View, объединяющий актуальные и архивные данные
CREATE OR REPLACE VIEW orders_all AS
  SELECT *, FALSE AS is_archived FROM orders
  UNION ALL
  SELECT id, customer_id, order_date, status,
         total_amount, metadata, TRUE AS is_archived
  FROM orders_archive;

-- 5. Запрос через view — работает прозрачно
SELECT is_archived, COUNT(*), SUM(total_amount) AS revenue
FROM   orders_all
GROUP  BY is_archived;`,
    beforeTables: [
      {
        label: "orders (до архивации)",
        data: {
          columns: ["id", "order_date", "total_amount", "metadata"],
          rows: [
            { id: 1, order_date: "2022-10-01", total_amount: 5000, metadata: '{"promo": null, "source": "google"}' },
            { id: 2, order_date: "2022-12-15", total_amount: 12000, metadata: '{"promo": "WINTER", "source": null}' },
            { id: 3, order_date: "2024-11-01", total_amount: 8000, metadata: '{"promo": null, "source": "direct"}' },
            { id: 4, order_date: "2025-01-10", total_amount: 3000, metadata: '{"promo": "NEW25", "source": "yandex"}' },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["is_archived", "count", "revenue"],
      rows: [
        { is_archived: false, count: 2, revenue: 11000 },
        { is_archived: true, count: 2, revenue: 17000 },
      ],
    },
  },
  {
    id: "task-30",
    shortTitle: "RANK + NTILE — топ-20% по продажам",
    taskTitle: "Задача 30 — Сложный RANK + DENSE_RANK + фильтр по процентилю",
    taskDescription:
      "Внутри каждой категории найдите товары, которые входят в топ-20% по количеству проданных единиц (используйте NTILE или процентиль). Выведите: категория, товар, продажи, ранг, % от максимума в категории, попадает_ли_в_топ_20%.",
    description:
      "NTILE(5) разбивает товары категории на 5 квантилей по убыванию продаж — первый квантиль и есть топ-20%. RANK() и DENSE_RANK() дают разные результаты при совпадениях. Процент от максимума считается через MAX() OVER PARTITION BY. Все вычисления делаются в одном CTE без подзапросов.",
    query: `WITH category_sales AS (
  SELECT
    cat.name                              AS category_name,
    p.name                                AS product_name,
    SUM(oi.quantity)                      AS total_sold,
    RANK()       OVER w                   AS rnk,
    DENSE_RANK() OVER w                   AS dense_rnk,
    NTILE(5)     OVER w                   AS quintile,
    ROUND(
      SUM(oi.quantity) * 100.0 /
      MAX(SUM(oi.quantity)) OVER (PARTITION BY p.category_id),
      1
    )                                     AS pct_of_max
  FROM products p
  JOIN categories cat  ON cat.id = p.category_id
  JOIN order_items oi  ON oi.product_id = p.id
  GROUP BY p.category_id, cat.name, p.name
  WINDOW w AS (
    PARTITION BY p.category_id
    ORDER BY SUM(oi.quantity) DESC
  )
)
SELECT
  category_name,
  product_name,
  total_sold,
  rnk,
  dense_rnk,
  pct_of_max,
  CASE WHEN quintile = 1 THEN true ELSE false END AS in_top_20_pct
FROM category_sales
ORDER BY category_name, rnk;`,
    beforeTables: [
      {
        label: "order_items + products",
        data: {
          columns: ["product_name", "category_name", "total_sold"],
          rows: [
            { product_name: "iPhone 15", category_name: "Смартфоны", total_sold: 500 },
            { product_name: "Samsung S24", category_name: "Смартфоны", total_sold: 320 },
            { product_name: "Pixel 8", category_name: "Смартфоны", total_sold: 200 },
            { product_name: "Redmi Note 13", category_name: "Смартфоны", total_sold: 180 },
            { product_name: "Nokia G42", category_name: "Смартфоны", total_sold: 90 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["category_name", "product_name", "total_sold", "rnk", "dense_rnk", "pct_of_max", "in_top_20_pct"],
      rows: [
        { category_name: "Смартфоны", product_name: "iPhone 15", total_sold: 500, rnk: 1, dense_rnk: 1, pct_of_max: "100.0", in_top_20_pct: true },
        { category_name: "Смартфоны", product_name: "Samsung S24", total_sold: 320, rnk: 2, dense_rnk: 2, pct_of_max: "64.0", in_top_20_pct: false },
        { category_name: "Смартфоны", product_name: "Pixel 8", total_sold: 200, rnk: 3, dense_rnk: 3, pct_of_max: "40.0", in_top_20_pct: false },
        { category_name: "Смартфоны", product_name: "Redmi Note 13", total_sold: 180, rnk: 4, dense_rnk: 4, pct_of_max: "36.0", in_top_20_pct: false },
        { category_name: "Смартфоны", product_name: "Nokia G42", total_sold: 90, rnk: 5, dense_rnk: 5, pct_of_max: "18.0", in_top_20_pct: false },
      ],
    },
  },
  {
    id: "task-31",
    shortTitle: "Скользящее среднее за 5 заказов + аномалии",
    taskTitle: "Задача 31 — Расширенные оконные функции + framing",
    taskDescription:
      "Для каждого пользователя посчитайте скользящее среднее чека за последние 5 заказов (ROWS BETWEEN 4 PRECEDING AND CURRENT ROW). Дополнительно: покажите, в скольких случаях текущий чек выше скользящего среднего более чем на 30%.",
    description:
      "ROWS BETWEEN 4 PRECEDING AND CURRENT ROW задаёт физическое окно из 5 строк (текущая + 4 предыдущих) в порядке дат. Это скользящее среднее нечувствительно к пропускам дат. Флаг is_spike вычисляется прямо в окне. COUNT(*) FILTER агрегирует количество выбросов на пользователя.",
    query: `WITH order_moving_avg AS (
  SELECT
    customer_id,
    order_date,
    total_amount,
    AVG(total_amount) OVER (
      PARTITION BY customer_id
      ORDER BY order_date
      ROWS BETWEEN 4 PRECEDING AND CURRENT ROW
    )                                          AS moving_avg_5,
    COUNT(*) OVER (
      PARTITION BY customer_id
      ORDER BY order_date
      ROWS BETWEEN 4 PRECEDING AND CURRENT ROW
    )                                          AS window_size,
    CASE
      WHEN total_amount > AVG(total_amount) OVER (
        PARTITION BY customer_id
        ORDER BY order_date
        ROWS BETWEEN 4 PRECEDING AND CURRENT ROW
      ) * 1.30
      THEN true
      ELSE false
    END                                        AS is_spike
  FROM orders
)
SELECT
  customer_id,
  order_date,
  total_amount,
  ROUND(moving_avg_5, 2)                       AS moving_avg_5,
  window_size,
  is_spike
FROM order_moving_avg
ORDER BY customer_id, order_date;

-- Сводка по пользователям: сколько выбросов
SELECT
  customer_id,
  COUNT(*)                                     AS total_orders,
  COUNT(*) FILTER (WHERE is_spike)             AS spike_count,
  ROUND(
    COUNT(*) FILTER (WHERE is_spike) * 100.0 / COUNT(*), 1
  )                                            AS spike_pct
FROM order_moving_avg
GROUP BY customer_id
HAVING COUNT(*) FILTER (WHERE is_spike) > 0
ORDER BY spike_pct DESC;`,
    beforeTables: [
      {
        label: "orders (customer_id=1, по дате)",
        data: {
          columns: ["id", "customer_id", "order_date", "total_amount"],
          rows: [
            { id: 1, customer_id: 1, order_date: "2024-01-05", total_amount: 3000 },
            { id: 2, customer_id: 1, order_date: "2024-02-10", total_amount: 3500 },
            { id: 3, customer_id: 1, order_date: "2024-03-15", total_amount: 2800 },
            { id: 4, customer_id: 1, order_date: "2024-04-20", total_amount: 3200 },
            { id: 5, customer_id: 1, order_date: "2024-05-25", total_amount: 15000 },
            { id: 6, customer_id: 1, order_date: "2024-06-30", total_amount: 3100 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["customer_id", "order_date", "total_amount", "moving_avg_5", "window_size", "is_spike"],
      rows: [
        { customer_id: 1, order_date: "2024-01-05", total_amount: 3000, moving_avg_5: "3000.00", window_size: 1, is_spike: false },
        { customer_id: 1, order_date: "2024-02-10", total_amount: 3500, moving_avg_5: "3250.00", window_size: 2, is_spike: false },
        { customer_id: 1, order_date: "2024-03-15", total_amount: 2800, moving_avg_5: "3100.00", window_size: 3, is_spike: false },
        { customer_id: 1, order_date: "2024-04-20", total_amount: 3200, moving_avg_5: "3125.00", window_size: 4, is_spike: false },
        { customer_id: 1, order_date: "2024-05-25", total_amount: 15000, moving_avg_5: "5500.00", window_size: 5, is_spike: true },
        { customer_id: 1, order_date: "2024-06-30", total_amount: 3100, moving_avg_5: "5520.00", window_size: 5, is_spike: false },
      ],
    },
  },
  {
    id: "task-32",
    shortTitle: "Recursive CTE — граф с обнаружением циклов",
    taskTitle: "Задача 32 — Рекурсивный CTE + граф + поиск циклов",
    taskDescription:
      "В categories возможны ошибки — зацикливание (parent_id ссылается на потомка). Напишите рекурсивный CTE, который находит все достижимые категории, выявляет циклы по повторению id в пути и возвращает путь и флаг is_cyclic.",
    description:
      "Защита от зацикливания: массив visited_ids хранит посещённые id; если текущий id уже в массиве — цикл найден, рекурсия прерывается. Поле path накапливает строку пути для отладки. Флаг is_cyclic позволяет отфильтровать проблемные ветки дерева.",
    query: `WITH RECURSIVE category_graph AS (
  -- Базовый случай: начинаем с заданной категории (id = 1)
  SELECT
    id,
    name,
    parent_id,
    ARRAY[id]             AS visited_ids,
    name::TEXT            AS path,
    0                     AS depth,
    FALSE                 AS is_cyclic
  FROM categories
  WHERE id = 1

  UNION ALL

  SELECT
    c.id,
    c.name,
    c.parent_id,
    -- Добавляем текущий id в посещённые
    cg.visited_ids || c.id,
    cg.path || ' → ' || c.name,
    cg.depth + 1,
    -- Цикл: если id уже был в пути
    c.id = ANY(cg.visited_ids)
  FROM categories c
  JOIN category_graph cg ON cg.id = c.parent_id
  -- Прерываем рекурсию при обнаружении цикла или глубине > 20
  WHERE NOT cg.is_cyclic
    AND cg.depth < 20
)
SELECT
  id,
  name,
  depth,
  path,
  is_cyclic
FROM category_graph
ORDER BY depth, id;

-- Список только проблемных (цикличных) категорий
SELECT id, name, path
FROM   category_graph
WHERE  is_cyclic;`,
    beforeTables: [
      {
        label: "categories (с циклом: 3 → 1)",
        data: {
          columns: ["id", "name", "parent_id"],
          rows: [
            { id: 1, name: "Электроника", parent_id: null },
            { id: 2, name: "Смартфоны", parent_id: 1 },
            { id: 3, name: "Apple", parent_id: 2 },
            { id: 4, name: "ОШИБКА (цикл)", parent_id: 3 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["id", "name", "depth", "path", "is_cyclic"],
      rows: [
        { id: 1, name: "Электроника", depth: 0, path: "Электроника", is_cyclic: false },
        { id: 2, name: "Смартфоны", depth: 1, path: "Электроника → Смартфоны", is_cyclic: false },
        { id: 3, name: "Apple", depth: 2, path: "Электроника → Смартфоны → Apple", is_cyclic: false },
        { id: 4, name: "ОШИБКА (цикл)", depth: 3, path: "Электроника → Смартфоны → Apple → ОШИБКА (цикл)", is_cyclic: false },
        { id: 1, name: "Электроника", depth: 4, path: "... → Электроника", is_cyclic: true },
      ],
    },
  },
  {
    id: "task-33",
    shortTitle: "JSONB → нормализация в product_attributes",
    taskTitle: "Задача 33 — JSONB → реляционная нормализация",
    taskDescription:
      "В products.metadata.attributes хранится объект с произвольными ключами. Напишите запрос/функцию, которая «расплющивает» все атрибуты в таблицу product_attributes (product_id, attr_key, attr_value) с помощью jsonb_each(). Сделайте это идемпотентно (ON CONFLICT DO NOTHING).",
    description:
      "jsonb_each() разворачивает JSONB-объект в пары (key, value). LATERAL применяет его к каждой строке таблицы products. ON CONFLICT DO NOTHING обеспечивает идемпотентность — повторный запуск не дублирует данные. RETURNING показывает только реально вставленные строки.",
    query: `-- 1. Создаём целевую таблицу
CREATE TABLE IF NOT EXISTS product_attributes (
  product_id  BIGINT  NOT NULL REFERENCES products(id),
  attr_key    TEXT    NOT NULL,
  attr_value  TEXT,
  PRIMARY KEY (product_id, attr_key)
);

-- 2. Нормализация через jsonb_each + LATERAL
INSERT INTO product_attributes (product_id, attr_key, attr_value)
SELECT
  p.id,
  attr.key,
  attr.value #>> '{}'    -- извлекаем текстовое значение из jsonb
FROM products p,
  LATERAL jsonb_each(
    p.metadata -> 'attributes'   -- вложенный объект атрибутов
  ) AS attr(key, value)
WHERE p.metadata ? 'attributes'  -- только если поле существует
ON CONFLICT (product_id, attr_key) DO NOTHING
RETURNING product_id, attr_key, attr_value;

-- 3. Запрос к нормализованной таблице
SELECT
  p.name                   AS product_name,
  pa.attr_key,
  pa.attr_value
FROM product_attributes pa
JOIN products p ON p.id = pa.product_id
ORDER BY p.name, pa.attr_key;

-- 4. Пивот: атрибуты как колонки
SELECT
  p.name,
  MAX(pa.attr_value) FILTER (WHERE pa.attr_key = 'color')    AS color,
  MAX(pa.attr_value) FILTER (WHERE pa.attr_key = 'size')     AS size,
  MAX(pa.attr_value) FILTER (WHERE pa.attr_key = 'material') AS material
FROM product_attributes pa
JOIN products p ON p.id = pa.product_id
GROUP BY p.name
ORDER BY p.name;`,
    beforeTables: [
      {
        label: "products (metadata с атрибутами)",
        data: {
          columns: ["id", "name", "metadata"],
          rows: [
            { id: 1, name: "Футболка белая S", metadata: '{"attributes":{"color":"white","size":"S","material":"cotton"}}' },
            { id: 2, name: "Джинсы синие M", metadata: '{"attributes":{"color":"blue","size":"M","material":"denim","fit":"slim"}}' },
            { id: 3, name: "Кроссовки", metadata: '{"attributes":{"color":"black","size":"42"}}' },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["product_name", "color", "size", "material"],
      rows: [
        { product_name: "Джинсы синие M", color: "blue", size: "M", material: "denim" },
        { product_name: "Кроссовки", color: "black", size: "42", material: null },
        { product_name: "Футболка белая S", color: "white", size: "S", material: "cotton" },
      ],
    },
  },
  {
    id: "task-34",
    shortTitle: "RLS + multi-tenant + session variables",
    taskTitle: "Задача 34 — Policy-based RLS + session variables",
    taskDescription:
      "Расширьте RLS из задачи 16: добавьте multi-tenant (поле tenant_id в users и orders), обычный пользователь видит только свой tenant через current_setting('app.tenant_id'). Напишите тестовый скрипт с SET LOCAL и RESET.",
    description:
      "current_setting('app.tenant_id', true) читает session variable, установленную приложением. SET LOCAL действует только в рамках транзакции и автоматически сбрасывается на COMMIT/ROLLBACK. Политика RLS проверяет tenant_id строки против session variable — никакого кода в приложении менять не нужно.",
    query: `-- 1. Добавляем поле tenant_id
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tenant_id BIGINT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS tenant_id BIGINT;

-- 2. Включаем RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders FORCE ROW LEVEL SECURITY;

-- 3. Политика: пользователь видит только свой tenant
CREATE POLICY orders_tenant_isolation
  ON orders
  FOR ALL
  TO app_user
  USING (
    tenant_id = current_setting('app.tenant_id', true)::BIGINT
  );

-- 4. Политика: администратор видит все тенанты
CREATE POLICY orders_admin_all
  ON orders
  FOR ALL
  TO admin
  USING (true);

-- 5. Тестовый скрипт
BEGIN;
  -- Устанавливаем тенант для текущей транзакции
  SET LOCAL app.tenant_id = '42';
  SET LOCAL ROLE app_user;

  -- Видны только заказы tenant_id = 42
  SELECT id, tenant_id, status FROM orders;

COMMIT;
-- После COMMIT: app.tenant_id сброшен, роль восстановлена

-- 6. Пример middleware-инициализации сессии
SET app.tenant_id = '42';   -- установить для всей сессии
-- ... выполнить запросы ...
RESET app.tenant_id;        -- сбросить по окончании`,
    beforeTables: [
      {
        label: "orders (с tenant_id)",
        data: {
          columns: ["id", "customer_id", "tenant_id", "status", "total_amount"],
          rows: [
            { id: 1, customer_id: 1, tenant_id: 42, status: "completed", total_amount: 5000 },
            { id: 2, customer_id: 2, tenant_id: 42, status: "pending", total_amount: 3000 },
            { id: 3, customer_id: 3, tenant_id: 99, status: "completed", total_amount: 8000 },
            { id: 4, customer_id: 4, tenant_id: 99, status: "completed", total_amount: 12000 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["session_variable", "role", "id", "tenant_id", "status", "visible"],
      rows: [
        { session_variable: "app.tenant_id = 42", role: "app_user", id: 1, tenant_id: 42, status: "completed", visible: "да" },
        { session_variable: "app.tenant_id = 42", role: "app_user", id: 2, tenant_id: 42, status: "pending", visible: "да" },
        { session_variable: "app.tenant_id = 42", role: "app_user", id: 3, tenant_id: 99, status: "completed", visible: "нет (скрыто RLS)" },
        { session_variable: "app.tenant_id = 42", role: "app_user", id: 4, tenant_id: 99, status: "completed", visible: "нет (скрыто RLS)" },
      ],
    },
  },
  {
    id: "task-35",
    shortTitle: "Динамический SQL — массовое обновление цен",
    taskTitle: "Задача 35 — PL/pgSQL + динамический SQL + EXECUTE",
    taskDescription:
      "Напишите функцию bulk_update_price(category_path text, multiplier numeric), которая принимает путь категории (например 'Электроника → Смартфоны'), повышает цену всех товаров в этой ветке и подветках на коэффициент и использует динамический SQL (EXECUTE).",
    description:
      "Функция строит рекурсивный CTE через FORMAT() + EXECUTE для динамической подстановки пути категории. EXECUTE выполняет динамически сформированный UPDATE с параметром $1 (multiplier). RETURNING собирает обновлённые id. Это безопасно от SQL-инъекций благодаря USING-параметрам.",
    query: `CREATE OR REPLACE FUNCTION bulk_update_price(
  p_category_path TEXT,
  p_multiplier    NUMERIC
)
RETURNS TABLE (updated_product_id BIGINT, old_price NUMERIC, new_price NUMERIC)
LANGUAGE plpgsql
AS $$
DECLARE
  v_sql TEXT;
BEGIN
  -- Динамически строим запрос с рекурсивным CTE для поиска ветки
  v_sql := FORMAT($sql$
    WITH RECURSIVE cat_path AS (
      SELECT id, name, parent_id, name::TEXT AS full_path
      FROM   categories WHERE parent_id IS NULL
      UNION ALL
      SELECT c.id, c.name, c.parent_id, cp.full_path || ' → ' || c.name
      FROM   categories c
      JOIN   cat_path cp ON cp.id = c.parent_id
    ),
    target_cats AS (
      SELECT id FROM cat_path
      WHERE  full_path = %L            -- путь категории из параметра
          OR full_path LIKE %L         -- все подветки
    )
    UPDATE products p
    SET    price = price * $1           -- коэффициент через USING
    FROM   target_cats tc
    WHERE  p.category_id = tc.id
    RETURNING p.id, p.price / $1 AS old_price, p.price AS new_price
  $sql$,
    p_category_path,
    p_category_path || ' → %'
  );

  RETURN QUERY EXECUTE v_sql USING p_multiplier;
END;
$$;

-- Пример вызова: поднять цены в Смартфонах на 10%
SELECT * FROM bulk_update_price('Электроника → Смартфоны', 1.10);`,
    beforeTables: [
      {
        label: "products (до обновления)",
        data: {
          columns: ["id", "name", "category_id", "price"],
          rows: [
            { id: 1, name: "iPhone 15", category_id: 2, price: 90000 },
            { id: 2, name: "Samsung S24", category_id: 2, price: 75000 },
            { id: 3, name: "Apple Watch", category_id: 3, price: 35000 },
            { id: 4, name: "MacBook Pro", category_id: 5, price: 150000 },
          ],
        },
      },
      {
        label: "categories",
        data: {
          columns: ["id", "name", "parent_id", "full_path"],
          rows: [
            { id: 1, name: "Электроника", parent_id: null, full_path: "Электроника" },
            { id: 2, name: "Смартфоны", parent_id: 1, full_path: "Электроника → Смартфоны" },
            { id: 3, name: "Apple", parent_id: 2, full_path: "Электроника → Смартфоны → Apple" },
            { id: 5, name: "Ноутбуки", parent_id: 1, full_path: "Электроника → Ноутбуки" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["updated_product_id", "old_price", "new_price"],
      rows: [
        { updated_product_id: 1, old_price: 90000, new_price: 99000 },
        { updated_product_id: 2, old_price: 75000, new_price: 82500 },
        { updated_product_id: 3, old_price: 35000, new_price: 38500 },
      ],
    },
  },
  {
    id: "task-36",
    shortTitle: "Generated columns + индексы",
    taskTitle: "Задача 36 — Generated columns + индексы",
    taskDescription:
      "Добавьте в orders generated column full_status, который вычисляет итоговый статус на основе платежей. Создайте индекс на этот столбец + order_date. Проверьте, используется ли индекс в запросах WHERE full_status = 'completed' AND order_date > ...",
    description:
      "GENERATED ALWAYS AS ... STORED вычисляется при каждой записи и хранится физически, поэтому индекс на нём работает как на обычной колонке. Подзапрос EXISTS в выражении проверяет наличие успешного платежа. EXPLAIN ANALYZE покажет Index Scan вместо Seq Scan после создания индекса.",
    query: `-- 1. Добавляем generated column с вычисленным статусом
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS full_status TEXT
    GENERATED ALWAYS AS (
      CASE
        WHEN status = 'paid'
         AND EXISTS (
           SELECT 1 FROM payments
           WHERE order_id = orders.id
             AND status = 'success'
         )
        THEN 'completed'
        ELSE status
      END
    ) STORED;

-- 2. Composite-индекс: full_status + order_date
CREATE INDEX IF NOT EXISTS idx_orders_full_status_date
  ON orders (full_status, order_date DESC);

-- 3. Запрос — должен использовать Index Scan
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, customer_id, order_date, full_status, total_amount
FROM   orders
WHERE  full_status = 'completed'
  AND  order_date  > NOW() - INTERVAL '6 months'
ORDER  BY order_date DESC;

-- 4. Верификация: generated-значение вычисляется автоматически
INSERT INTO payments (order_id, amount, status, payment_date)
VALUES (101, 5000, 'success', NOW());

-- full_status у заказа 101 автоматически станет 'completed'
SELECT id, status, full_status FROM orders WHERE id = 101;`,
    beforeTables: [
      {
        label: "orders",
        data: {
          columns: ["id", "status", "order_date", "full_status (до)"],
          rows: [
            { id: 101, status: "paid", order_date: "2024-11-01", "full_status (до)": "paid" },
            { id: 102, status: "pending", order_date: "2024-11-05", "full_status (до)": "pending" },
            { id: 103, status: "paid", order_date: "2024-09-20", "full_status (до)": "paid" },
          ],
        },
      },
      {
        label: "payments",
        data: {
          columns: ["order_id", "status"],
          rows: [
            { order_id: 101, status: "success" },
            { order_id: 103, status: "failed" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["id", "status", "order_date", "full_status"],
      rows: [
        { id: 101, status: "paid", order_date: "2024-11-01", full_status: "completed" },
        { id: 103, status: "paid", order_date: "2024-09-20", full_status: "paid" },
      ],
    },
  },
  {
    id: "task-37",
    shortTitle: "Gaps and Islands — периоды простоя > 60 дней",
    taskTitle: "Задача 37 — Gaps and Islands — продвинутый вариант",
    taskDescription:
      "Найдите все периоды, когда у пользователя не было заказов дольше 60 дней. Выведите: user_id, конец последнего заказа перед простоем, начало первого заказа после простоя, длительность простоя в днях.",
    description:
      "LAG() получает дату предыдущего заказа. Разность дат даёт длину промежутка. Фильтр WHERE gap_days > 60 оставляет только значимые пробелы. В отличие от задачи 18 (острова), здесь нас интересуют именно промежутки между островами — «гапы».",
    query: `WITH order_dates AS (
  SELECT
    customer_id,
    order_date,
    LAG(order_date) OVER (
      PARTITION BY customer_id
      ORDER BY order_date
    )                                       AS prev_order_date
  FROM orders
),
gaps AS (
  SELECT
    customer_id,
    prev_order_date                         AS gap_start,
    order_date                              AS gap_end,
    order_date - prev_order_date            AS gap_days
  FROM order_dates
  WHERE prev_order_date IS NOT NULL
    AND order_date - prev_order_date > 60
)
SELECT
  customer_id,
  gap_start                                 AS last_order_before_gap,
  gap_end                                   AS first_order_after_gap,
  gap_days                                  AS idle_days
FROM gaps
ORDER BY customer_id, gap_start;`,
    beforeTables: [
      {
        label: "orders (customer_id=1, по дате)",
        data: {
          columns: ["id", "customer_id", "order_date"],
          rows: [
            { id: 1, customer_id: 1, order_date: "2024-01-10" },
            { id: 2, customer_id: 1, order_date: "2024-01-28" },
            { id: 3, customer_id: 1, order_date: "2024-04-15" },
            { id: 4, customer_id: 1, order_date: "2024-04-30" },
            { id: 5, customer_id: 1, order_date: "2024-09-01" },
            { id: 6, customer_id: 1, order_date: "2024-09-20" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["customer_id", "last_order_before_gap", "first_order_after_gap", "idle_days"],
      rows: [
        { customer_id: 1, last_order_before_gap: "2024-01-28", first_order_after_gap: "2024-04-15", idle_days: 77 },
        { customer_id: 1, last_order_before_gap: "2024-04-30", first_order_after_gap: "2024-09-01", idle_days: 124 },
      ],
    },
  },
  {
    id: "task-38",
    shortTitle: "Crosstab — выручка по категориям за 6 месяцев",
    taskTitle: "Задача 38 — Tablefunc + crosstab + динамические колонки",
    taskDescription:
      "Создайте отчёт: строки = категории верхнего уровня, столбцы = последние 6 месяцев, значения = выручка. Реализуйте через FILTER + CASE (статический вариант) и через tablefunc.crosstab (динамический вариант).",
    description:
      "Статический подход: SUM ... FILTER (WHERE TO_CHAR(order_date,'YYYY-MM') = '...') — читаем, но колонки жёстко прописаны. Динамический: crosstab() принимает два подзапроса — данные и список категорий столбцов — и строит пивот-таблицу автоматически. Расширение tablefunc нужно включить один раз.",
    query: `-- Способ 1: статический пивот через FILTER + CASE
SELECT
  cat_root.name                                                 AS category,
  SUM(oi.quantity * oi.unit_price)
    FILTER (WHERE TO_CHAR(o.order_date,'YYYY-MM') =
            TO_CHAR(CURRENT_DATE - INTERVAL '5 months','YYYY-MM')) AS month_minus5,
  SUM(oi.quantity * oi.unit_price)
    FILTER (WHERE TO_CHAR(o.order_date,'YYYY-MM') =
            TO_CHAR(CURRENT_DATE - INTERVAL '4 months','YYYY-MM')) AS month_minus4,
  SUM(oi.quantity * oi.unit_price)
    FILTER (WHERE TO_CHAR(o.order_date,'YYYY-MM') =
            TO_CHAR(CURRENT_DATE - INTERVAL '3 months','YYYY-MM')) AS month_minus3,
  SUM(oi.quantity * oi.unit_price)
    FILTER (WHERE TO_CHAR(o.order_date,'YYYY-MM') =
            TO_CHAR(CURRENT_DATE - INTERVAL '2 months','YYYY-MM')) AS month_minus2,
  SUM(oi.quantity * oi.unit_price)
    FILTER (WHERE TO_CHAR(o.order_date,'YYYY-MM') =
            TO_CHAR(CURRENT_DATE - INTERVAL '1 month', 'YYYY-MM')) AS month_minus1,
  SUM(oi.quantity * oi.unit_price)
    FILTER (WHERE TO_CHAR(o.order_date,'YYYY-MM') =
            TO_CHAR(CURRENT_DATE,                    'YYYY-MM')) AS current_month,
  SUM(oi.quantity * oi.unit_price)                              AS total
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
JOIN products p     ON p.id = oi.product_id
JOIN categories cat ON cat.id = p.category_id
-- Находим корневую категорию
JOIN categories cat_root
  ON cat_root.id = COALESCE(
    (WITH RECURSIVE r AS (
       SELECT id, parent_id FROM categories WHERE id = cat.id
       UNION ALL
       SELECT c.id, c.parent_id FROM categories c JOIN r ON c.id = r.parent_id
     )
     SELECT id FROM r WHERE parent_id IS NULL LIMIT 1),
    cat.id
  )
WHERE o.order_date >= CURRENT_DATE - INTERVAL '6 months'
GROUP BY cat_root.name
ORDER BY total DESC NULLS LAST;

-- Способ 2: через crosstab (динамические метки)
CREATE EXTENSION IF NOT EXISTS tablefunc;

SELECT * FROM crosstab(
  $$
    SELECT
      cat_root.name,
      TO_CHAR(o.order_date, 'YYYY-MM'),
      SUM(oi.quantity * oi.unit_price)::NUMERIC
    FROM orders o
    JOIN order_items oi ON oi.order_id = o.id
    JOIN products p     ON p.id = oi.product_id
    JOIN categories cat ON cat.id = p.category_id
    JOIN categories cat_root ON cat_root.parent_id IS NULL
    WHERE o.order_date >= CURRENT_DATE - INTERVAL '6 months'
    GROUP BY 1, 2
    ORDER BY 1, 2
  $$,
  $$
    SELECT TO_CHAR(d, 'YYYY-MM')
    FROM generate_series(
      DATE_TRUNC('month', CURRENT_DATE - INTERVAL '5 months'),
      DATE_TRUNC('month', CURRENT_DATE),
      '1 month'::INTERVAL
    ) d
  $$
) AS t(category TEXT,
       m1 NUMERIC, m2 NUMERIC, m3 NUMERIC,
       m4 NUMERIC, m5 NUMERIC, m6 NUMERIC);`,
    beforeTables: [
      {
        label: "orders + order_items (срез 6 мес.)",
        data: {
          columns: ["category", "order_date", "revenue"],
          rows: [
            { category: "Электроника", order_date: "2024-10-05", revenue: 450000 },
            { category: "Электроника", order_date: "2024-11-12", revenue: 320000 },
            { category: "Одежда", order_date: "2024-10-20", revenue: 85000 },
            { category: "Одежда", order_date: "2024-12-01", revenue: 120000 },
            { category: "Электроника", order_date: "2024-12-15", revenue: 600000 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["category", "oct_2024", "nov_2024", "dec_2024", "total"],
      rows: [
        { category: "Электроника", oct_2024: 450000, nov_2024: 320000, dec_2024: 600000, total: 1370000 },
        { category: "Одежда", oct_2024: 85000, nov_2024: null, dec_2024: 120000, total: 205000 },
      ],
    },
  },
  {
    id: "task-39",
    shortTitle: "Триггер — переходы состояний + аудит",
    taskTitle: "Задача 39 — Триггер + переход состояний + аудит",
    taskDescription:
      "Создайте таблицу order_status_history. Напишите триггер BEFORE UPDATE OF status ON orders, который проверяет допустимые переходы состояний (нельзя из 'shipped' → 'pending'), при недопустимом — RAISE EXCEPTION, при успешном — пишет строку в историю.",
    description:
      "Матрица допустимых переходов хранится в виде массива пар (old → new). Если текущий переход не найден — выбрасывается исключение. При успешном переходе INSERT пишет строку в order_status_history с old_status, new_status, временем и пользователем. Триггер BEFORE позволяет отменить изменение.",
    query: `-- 1. Таблица аудита переходов
CREATE TABLE IF NOT EXISTS order_status_history (
  id          BIGSERIAL PRIMARY KEY,
  order_id    BIGINT      NOT NULL,
  old_status  TEXT,
  new_status  TEXT        NOT NULL,
  changed_at  TIMESTAMPTZ DEFAULT NOW(),
  changed_by  TEXT        DEFAULT current_user
);

-- 2. Триггерная функция с матрицей переходов
CREATE OR REPLACE FUNCTION trg_order_status_transition()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  -- Разрешённые переходы: (old, new)
  v_allowed BOOLEAN := FALSE;
BEGIN
  IF OLD.status = NEW.status THEN
    RETURN NEW;  -- статус не менялся, пропускаем
  END IF;

  -- Матрица допустимых переходов
  v_allowed := CASE OLD.status
    WHEN 'new'          THEN NEW.status IN ('pending', 'cancelled')
    WHEN 'pending'      THEN NEW.status IN ('paid', 'cancelled')
    WHEN 'paid'         THEN NEW.status IN ('shipped', 'refund_requested')
    WHEN 'shipped'      THEN NEW.status IN ('delivered', 'returned')
    WHEN 'delivered'    THEN NEW.status IN ('completed', 'refund_requested')
    WHEN 'completed'    THEN FALSE                 -- конечный статус
    WHEN 'cancelled'    THEN FALSE                 -- конечный статус
    ELSE FALSE
  END;

  IF NOT v_allowed THEN
    RAISE EXCEPTION
      'Invalid status transition: % → % for order %',
      OLD.status, NEW.status, OLD.id;
  END IF;

  -- Логируем переход
  INSERT INTO order_status_history (order_id, old_status, new_status)
  VALUES (OLD.id, OLD.status, NEW.status);

  RETURN NEW;
END;
$$;

CREATE TRIGGER order_status_transition
BEFORE UPDATE OF status ON orders
FOR EACH ROW
EXECUTE FUNCTION trg_order_status_transition();

-- Тест: допустимый переход
UPDATE orders SET status = 'paid'    WHERE id = 1 AND status = 'pending';   -- OK

-- Тест: недопустимый переход
UPDATE orders SET status = 'pending' WHERE id = 2 AND status = 'shipped';
-- ERROR: Invalid status transition: shipped → pending`,
    beforeTables: [
      {
        label: "orders",
        data: {
          columns: ["id", "status"],
          rows: [
            { id: 1, status: "pending" },
            { id: 2, status: "shipped" },
            { id: 3, status: "completed" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["order_id", "old_status", "new_status", "changed_at", "changed_by"],
      rows: [
        { order_id: 1, old_status: "pending", new_status: "paid", changed_at: "2024-05-15 10:23:01", changed_by: "app_user" },
        { order_id: 2, old_status: "shipped", new_status: "pending", changed_at: "— (EXCEPTION)", changed_by: "—" },
      ],
    },
  },
  {
    id: "task-40",
    shortTitle: "Range partitions + default + перенос данных",
    taskTitle: "Задача 40 — Partition by range + default partition + move data",
    taskDescription:
      "Создайте партиционированную таблицу payments по RANGE (payment_date) — по кварталам. Добавьте default-партицию. Напишите скрипт переноса данных из default-партиции в нужную квартальную (INSERT ... SELECT + DELETE).",
    description:
      "DEFAULT-партиция принимает строки, которые не попали ни в одну из явных партиций. Скрипт переноса: сначала INSERT ... SELECT из default в нужную квартальную партицию, затем DELETE из default. Всё в одной транзакции для консистентности. Новую квартальную партицию можно добавить без остановки системы.",
    query: `-- 1. Партиционированная таблица по кварталам
CREATE TABLE payments_partitioned (
  id           BIGSERIAL,
  order_id     BIGINT        NOT NULL,
  amount       NUMERIC(12,2) NOT NULL,
  status       TEXT,
  payment_date DATE          NOT NULL,
  PRIMARY KEY  (id, payment_date)
) PARTITION BY RANGE (payment_date);

-- 2. Квартальные партиции 2024
CREATE TABLE payments_2024_q1
  PARTITION OF payments_partitioned
  FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');

CREATE TABLE payments_2024_q2
  PARTITION OF payments_partitioned
  FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');

CREATE TABLE payments_2024_q3
  PARTITION OF payments_partitioned
  FOR VALUES FROM ('2024-07-01') TO ('2024-10-01');

CREATE TABLE payments_2024_q4
  PARTITION OF payments_partitioned
  FOR VALUES FROM ('2024-10-01') TO ('2025-01-01');

-- 3. DEFAULT-партиция (для дат вне диапазонов)
CREATE TABLE payments_default
  PARTITION OF payments_partitioned DEFAULT;

-- 4. Скрипт переноса из default в нужную квартальную партицию
-- (например, добавили Q1 2025 позже)
CREATE TABLE payments_2025_q1
  PARTITION OF payments_partitioned
  FOR VALUES FROM ('2025-01-01') TO ('2025-04-01');

-- Переносим данные Q1 2025 из default → 2025_q1
BEGIN;
  -- Вставляем в нужную партицию через родительскую таблицу
  INSERT INTO payments_partitioned
  SELECT * FROM payments_default
  WHERE payment_date BETWEEN '2025-01-01' AND '2025-03-31';

  -- Удаляем из default
  DELETE FROM payments_default
  WHERE payment_date BETWEEN '2025-01-01' AND '2025-03-31';
COMMIT;

-- 5. Проверяем распределение
SELECT tableoid::REGCLASS AS partition, COUNT(*) AS rows
FROM   payments_partitioned
GROUP  BY tableoid::REGCLASS
ORDER  BY partition;`,
    beforeTables: [
      {
        label: "payments_default (до переноса)",
        data: {
          columns: ["id", "order_id", "amount", "payment_date"],
          rows: [
            { id: 1, order_id: 101, amount: 5000, payment_date: "2025-01-10" },
            { id: 2, order_id: 102, amount: 12000, payment_date: "2025-02-14" },
            { id: 3, order_id: 103, amount: 8000, payment_date: "2025-03-05" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["partition", "rows"],
      rows: [
        { partition: "payments_2024_q1", rows: 450 },
        { partition: "payments_2024_q2", rows: 520 },
        { partition: "payments_2024_q3", rows: 480 },
        { partition: "payments_2024_q4", rows: 610 },
        { partition: "payments_2025_q1", rows: 3 },
        { partition: "payments_default", rows: 0 },
      ],
    },
  },
  {
    id: "task-41",
    shortTitle: "LATERAL + LIMIT — топ-3 товара в заказе (JSONB)",
    taskTitle: "Задача 41 — LATERAL + VALUES + множественные подзапросы",
    taskDescription:
      "Для топ-10 самых дорогих заказов выведите: номер заказа, сумму и список из 3 самых дорогих товаров (название, цена, количество) в виде JSONB-массива. Используйте LATERAL + LIMIT внутри подзапроса.",
    description:
      "Внешний запрос берёт топ-10 заказов по сумме. LATERAL-подзапрос для каждого заказа выбирает ORDER BY unit_price DESC LIMIT 3. jsonb_agg собирает строки в массив, jsonb_build_object формирует объект с нужными полями. LEFT JOIN LATERAL с ON true не отбрасывает заказы без товаров.",
    query: `SELECT
  o.id                          AS order_id,
  o.order_date,
  o.total_amount,
  top3.items_json               AS top3_items
FROM (
  -- Топ-10 заказов по сумме
  SELECT id, order_date, total_amount
  FROM   orders
  ORDER  BY total_amount DESC
  LIMIT  10
) o
LEFT JOIN LATERAL (
  SELECT
    jsonb_agg(
      jsonb_build_object(
        'product', p.name,
        'price',   oi.unit_price,
        'qty',     oi.quantity
      )
      ORDER BY oi.unit_price DESC
    )                           AS items_json
  FROM (
    SELECT oi2.product_id, oi2.unit_price, oi2.quantity
    FROM   order_items oi2
    WHERE  oi2.order_id = o.id
    ORDER  BY oi2.unit_price DESC
    LIMIT  3
  ) oi
  JOIN products p ON p.id = oi.product_id
) top3 ON true
ORDER BY o.total_amount DESC;`,
    beforeTables: [
      {
        label: "orders (топ по сумме)",
        data: {
          columns: ["id", "order_date", "total_amount"],
          rows: [
            { id: 5, order_date: "2024-11-01", total_amount: 380000 },
            { id: 2, order_date: "2024-09-14", total_amount: 210000 },
            { id: 8, order_date: "2024-12-03", total_amount: 175000 },
          ],
        },
      },
      {
        label: "order_items (для заказа #5)",
        data: {
          columns: ["order_id", "product_id", "unit_price", "quantity"],
          rows: [
            { order_id: 5, product_id: 1, unit_price: 150000, quantity: 1 },
            { order_id: 5, product_id: 2, unit_price: 90000, quantity: 1 },
            { order_id: 5, product_id: 3, unit_price: 80000, quantity: 1 },
            { order_id: 5, product_id: 4, unit_price: 60000, quantity: 1 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["order_id", "order_date", "total_amount", "top3_items (JSONB)"],
      rows: [
        { order_id: 5, order_date: "2024-11-01", total_amount: 380000, "top3_items (JSONB)": '[{"product":"MacBook Pro","price":150000,"qty":1},{"product":"iPhone 15","price":90000,"qty":1},{"product":"iPad Pro","price":80000,"qty":1}]' },
        { order_id: 2, order_date: "2024-09-14", total_amount: 210000, "top3_items (JSONB)": '[{"product":"Samsung TV","price":120000,"qty":1},{"product":"PlayStation 5","price":90000,"qty":1}]' },
      ],
    },
  },
  {
    id: "task-42",
    shortTitle: "pg_stat_statements — анализ тяжёлых запросов",
    taskTitle: "Задача 42 — pg_stat_statements + анализ самых тяжёлых запросов",
    taskDescription:
      "Напишите запрос к pg_stat_statements, который покажет топ-15 запросов по total_exec_time: нормализованный текст, calls, rows, shared_blks_hit + shared_blks_read. Отфильтруйте запросы, содержащие order_items или orders.",
    description:
      "pg_stat_statements хранит агрегированную статистику по всем уникальным запросам (нормализованный текст без конкретных значений). total_exec_time — суммарное время, mean_exec_time — среднее. hit_ratio = blks_hit / (blks_hit + blks_read) показывает долю попаданий в кэш. Чем ближе к 100% — тем лучше.",
    query: `-- Убеждаемся, что расширение включено
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Топ-15 самых дорогих запросов по суммарному времени
SELECT
  LEFT(query, 120)                                 AS query_preview,
  calls,
  ROUND(total_exec_time::NUMERIC, 2)               AS total_exec_ms,
  ROUND(mean_exec_time::NUMERIC,  2)               AS mean_exec_ms,
  rows,
  shared_blks_hit,
  shared_blks_read,
  ROUND(
    shared_blks_hit * 100.0 /
    NULLIF(shared_blks_hit + shared_blks_read, 0), 1
  )                                                AS cache_hit_pct,
  ROUND(total_exec_time / SUM(total_exec_time) OVER () * 100, 2)
                                                   AS pct_of_total_time
FROM pg_stat_statements
WHERE query ILIKE '%order_items%'
   OR query ILIKE '%orders%'
ORDER BY total_exec_time DESC
LIMIT 15;

-- Сброс статистики (при необходимости)
-- SELECT pg_stat_statements_reset();

-- Запросы с плохим cache hit (< 80%) — кандидаты на оптимизацию
SELECT
  LEFT(query, 100)                                 AS query_preview,
  calls,
  ROUND(mean_exec_time::NUMERIC, 2)                AS mean_exec_ms,
  ROUND(
    shared_blks_hit * 100.0 /
    NULLIF(shared_blks_hit + shared_blks_read, 0), 1
  )                                                AS cache_hit_pct
FROM pg_stat_statements
WHERE shared_blks_read > 1000
  AND (query ILIKE '%order_items%' OR query ILIKE '%orders%')
  AND shared_blks_hit * 1.0 /
      NULLIF(shared_blks_hit + shared_blks_read, 0) < 0.80
ORDER BY shared_blks_read DESC
LIMIT 10;`,
    beforeTables: [
      {
        label: "pg_stat_statements (реальный пример строк)",
        data: {
          columns: ["query (нормализованный)", "calls", "total_exec_ms", "blks_hit", "blks_read"],
          rows: [
            { "query (нормализованный)": "SELECT ... FROM orders JOIN order_items ...", calls: 12450, total_exec_ms: 98700, blks_hit: 980000, blks_read: 120000 },
            { "query (нормализованный)": "UPDATE orders SET status = $1 WHERE id = $2", calls: 3200, total_exec_ms: 45200, blks_hit: 310000, blks_read: 5000 },
            { "query (нормализованный)": "SELECT ... FROM order_items WHERE order_id = $1", calls: 55000, total_exec_ms: 31000, blks_hit: 5400000, blks_read: 200 },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["query_preview", "calls", "total_exec_ms", "mean_exec_ms", "cache_hit_pct", "pct_of_total_time"],
      rows: [
        { query_preview: "SELECT ... FROM orders JOIN order_items ...", calls: 12450, total_exec_ms: 98700, mean_exec_ms: "7.93", cache_hit_pct: "89.1", pct_of_total_time: "56.8" },
        { query_preview: "UPDATE orders SET status = $1 WHERE id = $2", calls: 3200, total_exec_ms: 45200, mean_exec_ms: "14.13", cache_hit_pct: "98.4", pct_of_total_time: "26.0" },
        { query_preview: "SELECT ... FROM order_items WHERE order_id = $1", calls: 55000, total_exec_ms: 31000, mean_exec_ms: "0.56", cache_hit_pct: "99.9", pct_of_total_time: "17.8" },
      ],
    },
  },
  {
    id: "task-43",
    shortTitle: "GiST-индекс на теги + similarity_tags",
    taskTitle: "Задача 43 — Custom-функция сходства тегов + GiST-индекс",
    taskDescription:
      "Напишите функцию similarity_tags(tags1 text[], tags2 text[]) RETURNS float, которая возвращает долю общих тегов. Создайте GiST-индекс на products.tags. Протестируйте ранжирующий запрос ORDER BY similarity DESC LIMIT 20.",
    description:
      "Пересечение массивов через оператор && (пересечение) и функцию array_length. similarity = |tags1 ∩ tags2| / |tags1 ∪ tags2| — это коэффициент Жаккара. GiST-индекс на поле типа text[] ускоряет фильтрацию через && (есть ли общие элементы), но сортировку по similarity он не заменяет — она идёт через Seq Scan + sort. Для ускорения ранжирования нужен pg_trgm или специализированный индекс.",
    query: `-- 1. Функция сходства тегов (коэффициент Жаккара)
CREATE OR REPLACE FUNCTION similarity_tags(
  tags1 TEXT[],
  tags2 TEXT[]
)
RETURNS FLOAT
LANGUAGE SQL
IMMUTABLE STRICT PARALLEL SAFE
AS $$
  SELECT
    CASE
      WHEN array_length(tags1, 1) IS NULL
        OR array_length(tags2, 1) IS NULL
      THEN 0.0
      ELSE
        -- |A ∩ B| / |A ∪ B|
        (
          SELECT COUNT(*)::FLOAT
          FROM   unnest(tags1) t
          WHERE  t = ANY(tags2)
        )
        /
        (
          array_length(tags1, 1)
          + array_length(tags2, 1)
          - (
            SELECT COUNT(*)::FLOAT
            FROM   unnest(tags1) t
            WHERE  t = ANY(tags2)
          )
        )
    END;
$$;

-- 2. Расширение для GiST-индекса на массивах
CREATE EXTENSION IF NOT EXISTS intarray;    -- для int[], опционально

-- GiST-индекс на text[] (через расширение btree_gin или gin)
CREATE EXTENSION IF NOT EXISTS btree_gin;

CREATE INDEX IF NOT EXISTS idx_products_tags_gin
  ON products USING GIN (tags);

-- 3. Ранжирующий запрос по сходству тегов
SELECT
  p.id,
  p.name,
  p.tags,
  similarity_tags(p.tags, ARRAY['bluetooth','wireless','anc'])  AS similarity
FROM products p
WHERE p.tags && ARRAY['bluetooth','wireless','anc']  -- GIN-индекс сужает набор
ORDER BY similarity DESC
LIMIT 20;

-- 4. Тест: быстрая фильтрация есть ли хоть один общий тег
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, name, tags
FROM   products
WHERE  tags && ARRAY['bluetooth','wireless'];

-- 5. Создание оператора-псевдонима (опционально)
-- Не создаём &&& т.к. text[] уже имеет && (array overlap)
-- Вместо этого создаём оператор %% для функции similarity_tags:
CREATE OR REPLACE FUNCTION tags_sim_gt(TEXT[], TEXT[])
RETURNS BOOLEAN
LANGUAGE SQL AS $$
  SELECT similarity_tags($1, $2) >= 0.5;
$$;

CREATE OPERATOR %% (
  LEFTARG  = TEXT[],
  RIGHTARG = TEXT[],
  FUNCTION = tags_sim_gt,
  COMMUTATOR = %%
);

-- Использование нового оператора
SELECT id, name FROM products
WHERE tags %% ARRAY['bluetooth','wireless','anc'];`,
    beforeTables: [
      {
        label: "products.tags",
        data: {
          columns: ["id", "name", "tags"],
          rows: [
            { id: 1, name: "Sony WH-1000XM5", tags: '["bluetooth","wireless","anc","premium","headphones"]' },
            { id: 2, name: "Apple AirPods Pro", tags: '["bluetooth","wireless","anc","apple","earbuds"]' },
            { id: 3, name: "JBL Charge 5", tags: '["bluetooth","wireless","waterproof","speaker"]' },
            { id: 4, name: "Logitech MX Keys", tags: '["wireless","keyboard","ergonomic","backlit"]' },
            { id: 5, name: "Bose QC45", tags: '["bluetooth","wireless","anc","headphones"]' },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["id", "name", "tags_matched", "similarity"],
      rows: [
        { id: 5, name: "Bose QC45", tags_matched: "bluetooth,wireless,anc", similarity: "1.000" },
        { id: 1, name: "Sony WH-1000XM5", tags_matched: "bluetooth,wireless,anc", similarity: "0.600" },
        { id: 2, name: "Apple AirPods Pro", tags_matched: "bluetooth,wireless,anc", similarity: "0.600" },
        { id: 3, name: "JBL Charge 5", tags_matched: "bluetooth,wireless", similarity: "0.333" },
        { id: 4, name: "Logitech MX Keys", tags_matched: "wireless", similarity: "0.125" },
      ],
    },
  },
  {
    id: "task-44",
    shortTitle: "pg_cron — расписание задач",
    taskTitle: "Задача 44 — pg_cron + автоматизация фоновых задач",
    taskDescription:
      "Создайте задачи pg_cron: каждое 1-е число месяца в 03:00 — REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales_summary; каждую пятницу в 04:00 — очистка уведомлений старше 90 дней.",
    description:
      "pg_cron — расширение PostgreSQL для cron-задач внутри самой базы. Синтаксис расписания — стандартный cron (минута, час, день, месяц, день-недели). REFRESH CONCURRENTLY не блокирует читателей — требует уникального индекса на materialized view. Задачи видны в таблице cron.job и логируются в cron.job_run_details.",
    query: `-- 1. Подключаем расширение (суперпользователь)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Даём права на схему cron нужной роли
GRANT USAGE ON SCHEMA cron TO app_admin;

-- 2. Ежемесячное обновление materialized view
--    Каждое 1-е число месяца в 03:00 UTC
SELECT cron.schedule(
  'refresh-monthly-sales',          -- имя задачи
  '0 3 1 * *',                      -- cron-выражение: мин час день мес д.н.
  $$REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales_summary$$
);

-- 3. Еженедельная очистка уведомлений
--    Каждую пятницу в 04:00 UTC (5 = пятница в cron)
SELECT cron.schedule(
  'cleanup-old-notifications',
  '0 4 * * 5',
  $$
    DELETE FROM notifications
    WHERE created_at < NOW() - INTERVAL '90 days'
  $$
);

-- 4. Просмотр всех задач
SELECT
  jobid,
  jobname,
  schedule,
  command,
  active
FROM cron.job
ORDER BY jobid;

-- 5. История последних запусков
SELECT
  j.jobname,
  r.start_time,
  r.end_time,
  r.status,
  r.return_message,
  EXTRACT(EPOCH FROM (r.end_time - r.start_time)) AS duration_sec
FROM cron.job_run_details r
JOIN cron.job j USING (jobid)
ORDER BY r.start_time DESC
LIMIT 20;

-- 6. Пауза / возобновление задачи
SELECT cron.alter_job(
  job_id   := (SELECT jobid FROM cron.job WHERE jobname = 'cleanup-old-notifications'),
  active   := FALSE            -- деактивировать
);

-- 7. Удаление задачи
SELECT cron.unschedule('refresh-monthly-sales');`,
    beforeTables: [
      {
        label: "cron.job (до регистрации)",
        data: {
          columns: ["jobid", "jobname", "schedule", "active"],
          rows: [
            { jobid: "—", jobname: "(пусто)", schedule: "—", active: "—" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["jobid", "jobname", "schedule", "active", "последний_запуск", "статус"],
      rows: [
        { jobid: 1, jobname: "refresh-monthly-sales", schedule: "0 3 1 * *", active: true, последний_запуск: "2024-12-01 03:00:02", статус: "succeeded" },
        { jobid: 2, jobname: "cleanup-old-notifications", schedule: "0 4 * * 5", active: true, последний_запуск: "2024-11-29 04:00:01", статус: "succeeded" },
      ],
    },
  },
  {
    id: "task-45",
    shortTitle: "postgres_fdw — объединение локальных и удалённых данных",
    taskTitle: "Задача 45 — Foreign Data Wrapper + postgres_fdw",
    taskDescription:
      "Настройте postgres_fdw к тестовой копии базы. Создайте foreign table orders_remote. Объедините локальные заказы за 2026 год и удалённые за 2025 год, посчитайте общую выручку по месяцам.",
    description:
      "postgres_fdw позволяет обращаться к таблицам другой PostgreSQL-базы как к локальным. CREATE SERVER описывает соединение, USER MAPPING — учётные данные. IMPORT FOREIGN SCHEMA автоматически импортирует схему. Планировщик по возможности пушит WHERE и GROUP BY на удалённый сервер (pushdown), минимизируя трафик.",
    query: `-- 1. Подключаем расширение
CREATE EXTENSION IF NOT EXISTS postgres_fdw;

-- 2. Описываем удалённый сервер
--    (для теста — та же база, другая схема или порт)
CREATE SERVER remote_db_2025
  FOREIGN DATA WRAPPER postgres_fdw
  OPTIONS (
    host     'db-archive.internal',   -- хост удалённой БД
    port     '5432',
    dbname   'shopdb_2025'
  );

-- 3. Маппинг учётных данных
CREATE USER MAPPING FOR app_user
  SERVER remote_db_2025
  OPTIONS (
    user     'readonly_user',
    password 'secret'
  );

-- 4a. Импорт отдельной таблицы вручную
CREATE FOREIGN TABLE orders_remote (
  id           BIGINT,
  customer_id  BIGINT,
  order_date   DATE,
  status       TEXT,
  total_amount NUMERIC(12, 2)
)
SERVER remote_db_2025
OPTIONS (schema_name 'public', table_name 'orders');

-- 4b. Или импортируем всю схему разом
IMPORT FOREIGN SCHEMA public
  LIMIT TO (orders, order_items, products)
  FROM SERVER remote_db_2025
  INTO archive_2025;

-- 5. Объединение локальных (2026) + удалённых (2025) заказов
WITH combined AS (
  -- Локальные заказы 2026 года
  SELECT
    DATE_TRUNC('month', order_date)  AS month,
    total_amount,
    'local'                          AS source
  FROM orders
  WHERE order_date >= '2026-01-01'
    AND order_date <  '2027-01-01'

  UNION ALL

  -- Удалённые заказы 2025 года (через FDW)
  SELECT
    DATE_TRUNC('month', order_date)  AS month,
    total_amount,
    'remote'                         AS source
  FROM orders_remote
  WHERE order_date >= '2025-01-01'
    AND order_date <  '2026-01-01'
)
SELECT
  TO_CHAR(month, 'YYYY-MM')         AS period,
  source,
  COUNT(*)                          AS orders_count,
  SUM(total_amount)                 AS total_revenue,
  ROUND(AVG(total_amount), 2)       AS avg_order
FROM combined
GROUP BY period, source
ORDER BY period, source;

-- 6. Проверяем pushdown-план
EXPLAIN (ANALYZE, VERBOSE)
SELECT COUNT(*), SUM(total_amount)
FROM orders_remote
WHERE order_date >= '2025-06-01';
-- В плане должно быть: Foreign Scan on orders_remote
-- и строчка "Remote SQL: SELECT ... WHERE order_date >= ..."`,
    beforeTables: [
      {
        label: "orders (локальная БД, 2026)",
        data: {
          columns: ["id", "order_date", "total_amount", "source"],
          rows: [
            { id: 5001, order_date: "2026-01-15", total_amount: 45000, source: "local" },
            { id: 5002, order_date: "2026-01-28", total_amount: 12000, source: "local" },
            { id: 5003, order_date: "2026-02-10", total_amount: 78000, source: "local" },
          ],
        },
      },
      {
        label: "orders_remote (FDW, 2025)",
        data: {
          columns: ["id", "order_date", "total_amount", "source"],
          rows: [
            { id: 1001, order_date: "2025-11-05", total_amount: 33000, source: "remote" },
            { id: 1002, order_date: "2025-11-20", total_amount: 15000, source: "remote" },
            { id: 1003, order_date: "2025-12-01", total_amount: 92000, source: "remote" },
          ],
        },
      },
    ],
    afterTable: {
      columns: ["period", "source", "orders_count", "total_revenue", "avg_order"],
      rows: [
        { period: "2025-11", source: "remote", orders_count: 2, total_revenue: 48000, avg_order: "24000.00" },
        { period: "2025-12", source: "remote", orders_count: 1, total_revenue: 92000, avg_order: "92000.00" },
        { period: "2026-01", source: "local", orders_count: 2, total_revenue: 57000, avg_order: "28500.00" },
        { period: "2026-02", source: "local", orders_count: 1, total_revenue: 78000, avg_order: "78000.00" },
      ],
    },
  },
];
