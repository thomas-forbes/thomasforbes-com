import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import ArticleList from '../components/ArticleList'
import BaseScreen from '../components/BaseScreen'
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
    <span className="decoration-dashed underline">{text}</span>
  </span>
)

interface props {
  articles: Article[]
  location: { city: string; country: string; emoji: string }
}

export default function Home({ location, articles }: props) {
  return (
    <BaseScreen className="flex flex-col items-center space-y-10">
      {/* TOP INFO */}
      <h1 className="pt-8 text-6xl font-bold text-center hover:scale-125 duration-150">
        Thomas Forbes
      </h1>
      <p className="text-lg text-slate-100 text-center">
        I am an Irish secondary school student trying to be a full stack
        entrepreneur
        {/* <ToolTip
            text="full stack entrepreneur"
            toolText="Being pro at all roles"
          /> */}
      </p>
      {/* MAIN STUFF */}
      <div className="flex flex-col space-y-6  max-w-4xl w-full">
        {/* ABOUT / EMAIL / WRITING */}
        <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
          {/* COL 1 */}
          <div className="basis-2/12 flex flex-col sm:flex-row lg:flex-col sm:space-x-6 sm:space-y-0 space-y-6 lg:space-y-6 lg:space-x-0 space-x-0 w-full">
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
                    <span className="mr-2">{item.emoji}</span>
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
            <Bubble className="flex flex-col items-center justify-center flex-auto sm:flex-1 lg:flex-auto space-y-3 lg:h-fit">
              <h2 className="text-xl font-semibold text-center">
                Stay up to date
              </h2>
              <p className="text-slate-400 text-center">
                Get notified when I do something interesting
              </p>
              <div className="w-full flex space-x-3">
                <input
                  type="email"
                  placeholder="example@example.com"
                  className="min-w-0 flex-auto appearance-none rounded-md border px-3 py-2 shadow-md shadow-zinc-800/5 focus:outline-none focus:ring-4 border-zinc-700 bg-zinc-700/[0.15] text-zinc-200 placeholder:text-zinc-500 focus:border-cyan-600 focus:ring-cyan-600/10 sm:text-sm duration-300"
                />
                {/* Would be cool to when submitted change color to green and make text a check mark */}
                <button
                  className="rounded-md py-2 px-3 text-sm outline-offset-2 font-semibold bg-cyan-800 hover:bg-cyan-700 active:bg-cyan-800 active:text-white/70 duration-200 hover:ring-cyan-600/10 hover:ring-4"
                  type="submit"
                >
                  Join
                </button>
              </div>
            </Bubble>
          </div>
          {/* COL 2 */}
          <div className="basis-10/12 h-full">
            <Card className="space-y-5">
              {/* TOP LINK */}
              <Link href="/writing">
                <h2 className="text-2xl font-semibold hover:text-slate-500 duration-300 cursor-pointer">
                  Writing &rarr;
                </h2>
              </Link>
              {/* ARTICLES */}
              <ArticleList articles={articles} len={2} />
              {articles.length > 2 && (
                <div className="flex flex-col space-y-2">
                  <Link href="/writing">
                    <p className="text-md text-center font-semibold text-zinc-400 hover:text-zinc-500 duration-300 cursor-pointer">
                      Read more...
                    </p>
                  </Link>
                </div>
              )}
            </Card>
          </div>
        </div>
        {/* WORK */}
        <Card className="space-y-6">
          {/* TOP LINK */}
          <Link href="/work">
            <h2 className="text-2xl font-semibold hover:text-slate-500 duration-300 cursor-pointer">
              My Work &rarr;
            </h2>
          </Link>
          {/* PROJECTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* GOOD COLOURS: https://tailwindcss.com/docs/background-image#linear-gradients */}
            {/* TODO: MAYBE DIFFERENT ANIMATION PARAMS */}
            <Project
              title="This Site"
              description="My personal website, built with Next.js and Tailwind CSS."
              image={require('../public/images/projects/site.png')}
              className="from-sky-500 to-indigo-500"
              descriptionClassName="text-sky-200"
            />
            <Project
              title="Cerebyte"
              description="AI Question Generator"
              image={require('../public/images/projects/cerebyte.png')}
              className="from-violet-500 to-fuchsia-500"
              descriptionClassName="text-violet-200"
            />
          </div>
        </Card>
      </div>
    </BaseScreen>
  )
}

const Project = ({
  title = '',
  description = '',
  image,
  className = '',
  descriptionClassName = '',
}: {
  title?: string
  description?: string
  image: string
  className?: string
  descriptionClassName?: string
}) => (
  <Link href="/writing" passHref={true}>
    <div
      className={twMerge(
        'rounded-xl flex flex-col items-center justify-between bg-gradient-to-b overflow-hidden duration-300 group cursor-pointer drop-shadow-md hover:drop-shadow-2xl shadow-[#141414]',
        className
      )}
    >
      {/* TEXT */}
      <div className="p-6 pb-4 space-y-3 text-center">
        <h3 className="text-2xl font-bold text-md">{title}</h3>
        <p className={descriptionClassName}>{description}</p>
      </div>
      {/* IMAGE */}
      <div className="relative rounded-t-xl overflow-hidden w-10/12 shadow-xl group-hover:drop-shadow-[0_55px_55px_rgba(0,0,0,0.25)] shadow-[#141414] translate-y-8 group-hover:translate-y-0 duration-300 group-hover:scale-105 hover:bottom-0">
        <Image src={image} layout="responsive" />
      </div>
    </div>
  </Link>
)

export const getStaticProps = async () => {
  const env = process.env.NODE_ENV

  let loc = { city: 'Earth', country: 'MW', emoji: '🌍' }
  // Don't want to spam the API when developing
  if (env == 'production') {
    const locData = await (
      await fetch('https://nomadlist.com/@thomasforbes.json')
    ).json()
    loc = {
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

  return {
    props: {
      location: loc,
      articles: await getArticles(),
    },
  }
}