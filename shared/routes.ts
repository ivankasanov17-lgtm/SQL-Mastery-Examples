import { z } from 'zod';
import { insertExampleSchema, examples, concepts } from './schema';

export const api = {
  examples: {
    list: {
      method: 'GET' as const,
      path: '/api/examples',
      responses: {
        200: z.array(z.custom<typeof examples.$inferSelect>()),
      },
    },
  },
  concepts: {
    list: {
      method: 'GET' as const,
      path: '/api/concepts',
      responses: {
        200: z.array(z.custom<typeof concepts.$inferSelect>()),
      },
    },
    getByDialect: {
      method: 'GET' as const,
      path: '/api/concepts/:dialect',
      responses: {
        200: z.array(z.custom<typeof concepts.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};
