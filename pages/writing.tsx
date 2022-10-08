import ArticleLink from '../components/ArticleLink'
import BaseScreen from '../components/BaseScreen'
import Card from '../components/Card'

export default function Writing() {
  return (
    <BaseScreen className="flex flex-col items-center space-y-6">
      <h1 className="text-6xl font-bold text-center hover:scale-125 duration-150">
        Writing
      </h1>
      <p className="text-slate-300 text-center">Some of my thoughts</p>
      {/* ARTICLES */}
      <Card className="max-w-2xl w-full space-y-5">
        {[
          {
            title: '1',
            description: 'test',
            link: '/test',
            createdAt: new Date(),
          },
          {
            title: '2',
            description: 'test',
            link: '/test',
            createdAt: new Date(),
          },
          {
            title: '3',
            description: 'test',
            link: '/test',
            createdAt: new Date(),
          },
          {
            title: 'more than 3',
            description: 'test',
            link: '/test',
            createdAt: new Date(),
          },
        ]
          .slice(0, 3)
          .map((article, idx) => (
            <ArticleLink article={article} divider={idx > 0} />
          ))}
      </Card>
    </BaseScreen>
  )
}
