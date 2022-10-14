import { Article } from '../utils/types'
import ArticleLink from './ArticleLink'

interface props {
  articles: Article[]
  len?: number
}

export default function ArticleList({ articles, len }: props) {
  return (
    <div className={'space-y-5 ' + ''}>
      {articles
        ?.sort((a, b) => b.createdAt - a.createdAt)
        ?.slice(0, len || articles.length)
        ?.map((article, idx) => (
          <ArticleLink article={article} key={article.title} />
        ))}
    </div>
  )
}
