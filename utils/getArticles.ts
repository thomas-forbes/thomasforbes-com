import fs from 'fs'
import path from 'path'
import { Article } from './types'

export default async function getArticles(): Promise<Article[]> {
  const articleDirectory = path.join(process.cwd(), 'pages/blog')
  const articles = (
    await Promise.all(
      fs.readdirSync(articleDirectory).map(async (filePath) => ({
        module: await import(`../pages/blog/${filePath}`),
        link: '/blog/' + filePath.replace('.mdx', ''),
      }))
    )
  )
    .filter((m) => m.module?.meta)
    .map((m) => ({ ...m.module.meta, link: m.link }))
  return articles
}
