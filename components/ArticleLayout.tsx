import { MDXProvider } from '@mdx-js/react'
import { ReactNode } from 'react'

import { dispDate } from '../utils/funcs'
import { Article } from '../utils/types'
import BaseScreen from './BaseScreen'
import NavBar from './NavBar'
import { Card } from './Simple'

const components = {
  p: (props: any) => <p {...props} className="text-md" />,
  h1: (props: any) => <h2 {...props} className="text-4xl font-bold pt-8" />,
  h2: (props: any) => <h3 {...props} className="text-3xl font-bold pt-4" />,
  h3: (props: any) => <h4 {...props} className="text-2xl font-bold pt-2" />,
  code: (props: any) => (
    <code {...props} className={props.className + ' language- text-md'} />
  ),
  pre: (props: any) => (
    <pre {...props} className={props.className + ' rounded-md'} />
  ),
}

export default function ArticleLayout({
  children,
  meta,
}: {
  children: ReactNode
  meta: Article
}) {
  return (
    <BaseScreen className="flex flex-col items-center">
      <main className="flex flex-col items-center max-w-2xl space-y-6 w-full">
        <NavBar className="self-start" />
        {/* TITLE */}
        <h1 className="text-6xl font-bold text-center max-w-xl">
          {meta.title}
        </h1>
        {/* DESCRIPTION + CREATED AT */}
        <div className="flex flex-col items-center space-y-3">
          <p className="text-gray-300 text-center text-lg">
            {meta.description}
          </p>
          <p className="text-gray-500 font-mono">{dispDate(meta.createdAt)}</p>
        </div>
        {/* ARTICLE */}
        <Card className="w-full">
          <MDXProvider components={components}>
            <div className="space-y-4">{children}</div>
          </MDXProvider>
        </Card>
      </main>
    </BaseScreen>
  )
}
