import fs from 'fs'
import path from 'path'
import { Article } from './types'

export default async function getArticles(): Promise<Article[]> {
  const articleDirectory = path.join(process.cwd(), 'src/pages/blog')
  const files = await fs.promises.readdir(articleDirectory)
  const articles = (
    await Promise.all(
      files.map(async (filePath) => ({
        module: await import(`../pages/blog/${filePath}`),
        link: '/blog/' + filePath.replace('.mdx', ''),
      }))
    )
  )
    .filter((m) => m.module?.meta)
    .map((m) => ({ ...m.module.meta, link: m.link }))
  return articles
}
