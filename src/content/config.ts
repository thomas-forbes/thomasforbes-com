import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .or(z.date())
      .optional()
      .transform((val) => (val ? new Date(val) : undefined)),
    tags: z.array(z.union([z.literal('fav'), z.literal('fav')])).optional(),
  }),
})

const forever = defineCollection({
  schema: z.object({
    title: z.string(),
    updatedDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
})

export const collections = { blog, forever }
