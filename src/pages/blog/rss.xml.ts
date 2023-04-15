import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function get(context: APIContext) {
  const posts = await getCollection('blog')
  return rss({
    title: "Thomas's Blog",
    description: 'Some of my thoughts',
    site: context.site!.href,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
    })),
  })
}
