import ArticleList from '../components/ArticleList'
import BaseScreen from '../components/BaseScreen'
import Card from '../components/Card'
import NavBar from '../components/NavBar'
import getArticles from '../utils/getArticles'
import { Article } from '../utils/types'

interface props {
  articles: Article[]
}

export default function Writing({ articles }: props) {
  return (
    <BaseScreen className="flex flex-col items-center">
      <div className="flex flex-col items-center max-w-2xl space-y-6 w-full">
        <NavBar className="self-start" />
        <h1 className="text-6xl font-bold text-center hover:scale-125 duration-150">
          Writing
        </h1>
        <p className="text-slate-300 text-center">Some of my thoughts</p>
        {/* ARTICLES */}
        <Card className="max-w-2xl w-full">
          <ArticleList articles={articles} />
        </Card>
      </div>
    </BaseScreen>
  )
}

export async function getStaticProps() {
  const articles = await getArticles()
  return { props: { articles } }
}
