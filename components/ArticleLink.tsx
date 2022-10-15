import Link from 'next/link'
import { dispDate } from '../utils/funcs'
import { Article } from '../utils/types'

export default function ArticleLink({ article }: { article: Article }) {
  return (
    <Link href={article.link || ''}>
      <div
        className="space-y-2 flex flex-col group cursor-pointer"
        key={article.title}
      >
        <h3 className="text-2xl font-bold text-slate-300 group-hover:text-slate-500 duration-200 ">
          {article.title}
        </h3>
        <p className="text-slate-500">{article.description}</p>
        <p className="text-gray-500 font-mono">{dispDate(article.createdAt)}</p>
      </div>
    </Link>
  )
}
