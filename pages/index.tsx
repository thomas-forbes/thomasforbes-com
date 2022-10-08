import Link from 'next/link'
import { ReactNode } from 'react'
import ArticleLink from '../components/ArticleLink'
import BaseScreen from '../components/BaseScreen'
import Card from '../components/Card'

const ToolTip = ({
  children,
  toolText,
  text,
}: {
  children?: ReactNode
  toolText?: string
  text: string
}) => (
  <span className="has-tooltip relative">
    <span className="tooltip left-1/2 text-sm whitespace-pre -translate-x-1/2 rounded-xl shadow-lg px-3 py-1 bg-slate-800 -mt-7 duration-300">
      {children ? children : toolText}
    </span>
    <span className="decoration-dashed underline">{text}</span>
  </span>
)

export default function Home(props: any) {
  return (
    <BaseScreen className="flex flex-col items-center space-y-6">
      {/* TOP INFO */}
      <h1 className="text-6xl font-bold text-center hover:scale-125 duration-150">
        Thomas Forbes
      </h1>
      <p className="text-slate-300 text-center">
        I am an Irish secondary school student trying to be a full stack
        entrepreneur
        {/* <ToolTip
            text="full stack entrepreneur"
            toolText="Being pro at all roles"
          /> */}
      </p>
      {/* MAIN CONTENT */}
      <div className="flex flex-col max-w-4xl w-full lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
        {/* ABOUT ME */}
        <div className="flex flex-col items-center border border-slate-700 shadow-lg rounded-xl p-6 md:p-8 space-y-3 h-fit">
          <h2 className="text-2xl font-semibold">About Me</h2>
          <ul className="flex flex-col sm:flex-row lg:flex-col sm:space-x-3 sm:space-y-0 space-y-1 lg:space-y-1 lg:space-x-0 space-x-0 w-fit">
            {[
              {
                emoji: '🧑',
                text: `${Math.abs(
                  new Date(
                    Date.now() - new Date(2005, 8, 10).getTime()
                  ).getUTCFullYear() - 1970
                )} years old`,
                toolTip: (
                  <div className="flex flex-row items-center space-x-1">
                    Alive
                    <div className="w-2 h-2 rounded-xl block bg-green-600 animate-pulse ml-1" />
                  </div>
                ),
              },
              {
                emoji: String.fromCodePoint(
                  ...props.location.country
                    .toUpperCase()
                    .split('')
                    .map((char: string) => 127397 + char.charCodeAt(0))
                ),
                text: `Currently in ${props.location.city}, ${props.location.country}`,
                toolTip: (
                  <div className="flex flex-row items-center space-x-1">
                    <a
                      href="https://nomadlist.com/@thomasforbes"
                      target="_blank"
                      className="underline"
                    >
                      Nomad List
                    </a>
                    <div className="w-2 h-2 rounded-xl block bg-green-600 animate-pulse ml-1" />
                  </div>
                ),
              },
              { emoji: '👨‍💻', text: 'Indie Hacker' },
            ].map((item) => (
              <li
                className="text-slate-300 flex flex-row items-center"
                key={item.text}
              >
                <span className="mr-2">{item.emoji}</span>
                {item?.toolTip ? (
                  <ToolTip text={item.text}>{item.toolTip}</ToolTip>
                ) : (
                  <span>{item.text}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* WRITING */}
        <Card className="flex-auto space-y-6">
          {/* TOP LINK */}
          <Link href="/writing">
            <h2 className="text-2xl font-semibold hover:text-slate-500 duration-300 cursor-pointer">
              Writing &rarr;
            </h2>
          </Link>
          {/* ARTICLES */}
          <div className="flex flex-col space-y-5">
            {[
              {
                title: 'Ur momma soooo fat',
                description:
                  'The legendary story of the heaviest object in the universe',
                link: '/writing/ur-momma-so-fat',
                createdAt: new Date('2069-04-20'),
              },
              {
                title: 'test',
                description: 'test',
                link: '/test',
                createdAt: new Date(),
              },
            ].map((article, idx) => (
              <ArticleLink article={article} divider={idx > 0} />
            ))}
          </div>
        </Card>
      </div>
    </BaseScreen>
  )
}

export const getStaticProps = async () => {
  // const locData = await (
  //   await fetch('https://nomadlist.com/@thomasforbes.json')
  // ).json()
  // const loc = {
  //   city: locData.location.now.city || 'Earth',
  //   country:
  //     locData.location.now.country_code === 'UK'
  //       ? 'GB'
  //       : locData.location.now.country_code,
  // }
  const loc = { city: 'Dublin', country: 'IE' }

  return {
    props: {
      location: loc,
    },
  }
}
