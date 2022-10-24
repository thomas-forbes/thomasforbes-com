import Link from 'next/link'
import { ReactNode } from 'react'
import { Twemoji } from 'react-emoji-render'

import ArticleList from '../components/ArticleList'
import BaseScreen, { useMailLink } from '../components/BaseScreen'
import EmailSignUp from '../components/index/emailSignUp'
import TopProjects from '../components/Projects'
import { Bubble, Card } from '../components/Simple'
import getArticles from '../utils/getArticles'
import { Article } from '../utils/types'

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
    <span className="decoration-dashed underline underline-offset-4">
      {text}
    </span>
  </span>
)

interface props {
  articles: Article[]
  location: { city: string; country: string; emoji: string }
  subscribers: number
}

export default function Home({ location, articles, subscribers }: props) {
  const mailLink = useMailLink()
  return (
    <BaseScreen className="flex flex-col items-center space-y-14">
      {/* TOP INFO */}
      <div className="space-y-8">
        <h1 className="pt-8 text-7xl sm:text-8xl font-bold text-center from-sky-400 to-fuchsia-400 bg-clip-text !text-transparent !bg-gradient-to-r">
          Thomas Forbes
        </h1>
        <p className="sm:text-lg font-mono text-slate-300 text-center">
          I am an Irish secondary school student trying to be a full stack
          entrepreneur
          {/* <ToolTip
            text="full stack entrepreneur"
            toolText="Being pro at all roles"
          /> */}
        </p>
      </div>
      {/* FREELANCE */}
      <div className="flex flex-row justify-center items-center space-x-2">
        <div className="w-[0.55rem] h-[0.55rem] rounded-xl block bg-green-600 animate-pulse" />
        <a href={mailLink}>
          <p className="text-base sm:text-lg text-slate-300 hover:text-slate-100 duration-200 font-mono cursor-pointer underline underline-offset-4 p-2 text-center">
            Available for freelance work &rarr;
          </p>
        </a>
      </div>
      {/* MAIN STUFF */}
      <div className="flex flex-col space-y-6 max-w-5xl w-full">
        {/* ABOUT / EMAIL / BLOG */}
        <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
          {/* COL 1 */}
          <div className="basis-2/12 flex flex-col sm:flex-row lg:flex-col sm:space-x-6 sm:space-y-0 space-y-6 lg:space-y-6 lg:space-x-0 space-x-0 w-full h-full">
            {/* ABOUT ME */}
            <Bubble className="flex flex-col items-center justify-center flex-auto sm:flex-1 lg:flex-auto space-y-3 lg:h-fit">
              <h2 className="text-2xl font-semibold">About Me</h2>
              <ul className="flex flex-col w-fit space-y-1">
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
                    emoji: location.emoji,
                    text: `Currently in ${location.city}, ${location.country}`,
                    toolTip: (
                      <div className="flex flex-row items-center space-x-1">
                        <a
                          href="https://nomadlist.com/@thomasforbes"
                          target="_blank"
                          rel="noreferrer"
                          className="underline"
                        >
                          Nomad List
                        </a>
                        <div className="w-2 h-2 rounded-xl block bg-green-600 animate-pulse ml-1" />
                      </div>
                    ),
                  },
                  { emoji: '👨‍💻', text: 'Indie Hacker' },
                ].map((item, idx) => (
                  <li
                    className={`text-slate-400 flex flex-row items-center ${
                      idx == 0 && 'z-10'
                    }`}
                    key={item.text}
                  >
                    <Twemoji text={item.emoji} className="mr-2" />
                    {item?.toolTip ? (
                      <ToolTip text={item.text}>{item.toolTip}</ToolTip>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Bubble>
            {/* EMAIL SIGN UP */}
            <EmailSignUp subscribers={subscribers} />
          </div>
          {/* COL 2 */}
          <Card className="basis-10/12 space-y-5 flex flex-col">
            {/* TOP LINK */}
            <Link href="/blog">
              <h2 className="text-2xl font-semibold hover:text-slate-500 duration-300 cursor-pointer">
                Blog &rarr;
              </h2>
            </Link>
            {/* ARTICLES */}
            <ArticleList articles={articles} len={3} />
            <Link href="/blog">
              <p className="text-lg text-center font-semibold text-zinc-400 hover:text-zinc-500 hover:scale-105 duration-300 cursor-pointer">
                Read More...
              </p>
            </Link>
          </Card>
        </div>
        {/* WORK */}
        <Card className="space-y-6 px-4 md:px-8 flex flex-col">
          {/* TOP LINK */}
          <Link href="/work">
            <h2 className="text-2xl font-semibold hover:text-slate-500 duration-300 cursor-pointer">
              My Work &rarr;
            </h2>
          </Link>
          {/* PROJECTS */}
          <TopProjects maxLen={3} />
          {/* MAYBE VIEW ALL */}
          <Link href="/work">
            <p className="text-lg text-center font-semibold text-zinc-400 hover:text-zinc-500 hover:scale-105 duration-300 cursor-pointer">
              View All...
            </p>
          </Link>
        </Card>
      </div>
    </BaseScreen>
  )
}

export const getStaticProps = async () => {
  const isProd = () => process.env.NODE_ENV === 'production'

  // Don't want to spam the API when developing
  const getLoc = async () => {
    const locData = await (
      await fetch('https://nomadlist.com/@thomasforbes.json')
    ).json()
    return {
      city: locData.location.now.city || 'Earth',
      country: locData.location.now.country_code,
      emoji: String.fromCodePoint(
        ...(locData.location.now.country_code === 'UK'
          ? 'GB'
          : locData.location.now.country_code
        )
          .toUpperCase()
          .split('')
          .map((char: string) => 127397 + char.charCodeAt(0))
      ),
    }
  }

  const getSubscribers = async () => {
    const res = await fetch(
      `https://api.convertkit.com/v3/forms/3398023/subscriptions?api_secret=${process.env.CONVERTKIT_API_SECRET}`,
      {
        method: 'GET',
      }
    )
    return (await res.json())?.total_subscriptions || 0
  }

  return {
    props: {
      location: isProd()
        ? await getLoc()
        : { city: 'Earth', country: 'MW', emoji: '🌍' },
      articles: await getArticles(),
      subscribers: isProd() ? await getSubscribers() : 69,
    },
    revalidate: 3600,
  }
}
