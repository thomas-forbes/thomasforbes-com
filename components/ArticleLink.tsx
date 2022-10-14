import Link from 'next/link'
import { dispDate } from '../utils/funcs'
import { Article } from '../utils/types'

export default function ArticleLink({ article }: { article: Article }) {
  return (
    <div className="space-y-2 flex flex-col" key={article.title}>
      <Link href={article.link || ''}>
        <h3 className="text-2xl font-bold text-slate-300 hover:text-slate-500 duration-200 cursor-pointer">
          {article.title}
        </h3>
      </Link>
      <p className="text-slate-500">{article.description}</p>
      <p className="text-gray-500 font-mono">{dispDate(article.createdAt)}</p>
    </div>
  )
}
