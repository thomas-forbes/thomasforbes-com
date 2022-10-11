import { Article } from '../utils/types'
import ArticleLink from './ArticleLink'

interface props {
  articles: Article[]
}

export default function ArticleList({ articles }: props) {
  return (
    <div className={'space-y-5 ' + ''}>
      {articles?.slice(0, 3)?.map((article, idx) => (
        <ArticleLink article={article} divider={idx > 0} key={article.title} />
      ))}
    </div>
  )
}
