import Link from 'next/link'
import { dispDate } from '../utils/funcs'
import { Article } from '../utils/types'

export default function ArticleLink({
  article,
  divider = false,
}: {
  article: Article
  divider?: boolean
}) {
  return (
    <div className="space-y-2 flex flex-col" key={article.title}>
      {divider && (
        // Make sure the mb here + space-y here = the space-y for the article view
        <div className="border-b-2 opacity-50 w-11/12 self-center h-[1px] border-gray-700 mb-3" />
      )}
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
