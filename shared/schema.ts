import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const examples = pgTable("examples", {
  id: serial("id").primaryKey(),
  dialect: text("dialect").notNull(), // 'SQL', 'SQLite', 'T-SQL', 'PostgreSQL'
  title: text("title").notNull(),
  description: text("description").notNull(),
  code: text("code").notNull(),
});

export const concepts = pgTable("concepts", {
  id: serial("id").primaryKey(),
  dialect: text("dialect").notNull(), // 'SQL', 'SQLite', 'T-SQL', 'PostgreSQL'
  name: text("name").notNull(),
  description: text("description").notNull(),
  exampleCode: text("example_code").notNull(),
});

export const insertExampleSchema = createInsertSchema(examples).omit({ id: true });
export const insertConceptSchema = createInsertSchema(concepts).omit({ id: true });

export type Example = typeof examples.$inferSelect;
export type InsertExample = z.infer<typeof insertExampleSchema>;
export type Concept = typeof concepts.$inferSelect;
export type InsertConcept = z.infer<typeof insertConceptSchema>;
