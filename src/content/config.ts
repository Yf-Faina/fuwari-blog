import { defineCollection, z } from 'astro:content'

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    published: z.date(),
    updated: z.date().optional(),
    draft: z.boolean().optional().default(false),
    description: z.string().optional().default(''),
    image: z.string().optional().default(''),
    tags: z.array(z.string()).optional().default([]),
    category: z.string().optional().default(''),
    lang: z.string().optional().default(''),

    /* For internal use */
    prevTitle: z.string().default(''),
    prevSlug: z.string().default(''),
    nextTitle: z.string().default(''),
    nextSlug: z.string().default(''),
  }),
})

const specCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // 你可以根据spec文件夹下文件的实际frontmatter定义更多属性
    published: z.date(),
  }),
})

export const collections = {
  posts: postsCollection,
  spec: specCollection,
}
