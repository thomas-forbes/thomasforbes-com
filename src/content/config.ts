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
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    tags: z.array(z.union([z.literal('fav'), z.literal('forever')])).optional(),
    priority: z.number().optional(),
  }),
})
/* TEMPLATE
---
title: 'title'
pubDate: '2021-01-01'
# updatedDate: '2021-01-01'
tags: []
priority: 0
*/

export const collections = { blog }
