import { defineCollection, z } from 'astro:content';

const examples = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number(),
    prev: z.string().optional(), // Slug of previous example
    next: z.string().optional(), // Slug of next example
  }),
});

export const collections = {
  examples,
};
