import { defineCollection, z } from 'astro:content'

export const collections = {
  docs: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      summary: z.string(),
      category: z.string(),
      tags: z.array(z.string()),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      author: z.string(),
      heroImage: z.string().optional(),
    }),
  }),
}
