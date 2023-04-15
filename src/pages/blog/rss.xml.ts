import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

const parser = new MarkdownIt()

export async function get(context: APIContext) {
  const posts = await getCollection('blog')
  return rss({
    title: "Thomas's Blog",
    description: 'Some of my thoughts',
    site: context.site!.href,
    items: posts.map((post) => ({
      ...post.data,
      content: sanitizeHtml(parser.render(post.body)),
      link: `/blog/${post.slug}/`,
    })),
  })
}
