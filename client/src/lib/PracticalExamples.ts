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
];
