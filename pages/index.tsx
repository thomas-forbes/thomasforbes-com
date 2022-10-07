import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import BaseScreen from '../components/BaseScreen'

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
  const iconProps = { size: 22, className: 'text-slate-300' } //hover:scale-105 duration-75' }

  // Requires js to show email -> less spam
  const [mailLink, setMailLink] = useState(
    'mailto:enablejavascript@example.com'
  )
  useEffect(() => {
    setMailLink(`mailto:${window.atob('dGhvbWFzQHRob21hc2ZvcmJlcy5jb20=')}`)
  }, [])
  return (
    <BaseScreen>
      <div className="flex flex-col justify-between h-full">
        {/* MAIN CONTENT */}
        <div className="flex flex-col items-center space-y-6">
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
          <div className="flex flex-row justify-between"></div>
          {/* MAIN CONTENT */}
          <div className="flex flex-col max-w-4xl w-full lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
            {/* ABOUT ME */}
            <div className="flex flex-col items-center border border-slate-700 shadow-lg rounded-xl p-6 md:p-8 space-y-3">
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
            <div className="flex-auto border border-solid border-slate-200 border-opacity-10 bg-slate-800 highlight-white/5 shadow-lg rounded-xl p-6 md:p-8 space-y-3">
              {/* TOP LINK */}
              <Link href="/writing">
                <h2 className="text-2xl font-semibold hover:text-slate-500 duration-300 cursor-pointer">
                  Writing &rarr;
                </h2>
              </Link>
              {/* ARTICLES */}
              {[
                {
                  title: 'Ur momma soooo fat',
                  description:
                    'The legendary story of the heaviest object in the universe',
                  link: '/writing/ur-momma-so-fat',
                  createdAt: '2069-04-20',
                },
              ].map((article) => (
                <div className="flex flex-col space-y-5">
                  <div className="space-y-2">
                    <Link href={article.link}>
                      <h3 className="text-2xl font-bold text-slate-300 hover:text-slate-500 duration-200 cursor-pointer">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-slate-500">{article.description}</p>
                    <p className="text-gray-500 font-mono">
                      {article.createdAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* FOOTER */}
        <footer className="self-center">
          <div className="flex flex-row items-center">
            {[
              {
                text: 'Email',
                href: mailLink,
                icon: <IoMdMail {...iconProps} />,
              },
              {
                text: 'Twitter',
                href: 'https://twitter.com/FoldedCode',
                icon: <FaTwitter {...iconProps} />,
              },
              {
                text: 'Github',
                href: 'https://github.com/Folded-Code',
                icon: <FaGithub {...iconProps} />,
              },
              {
                text: 'LinkedIn',
                href: 'https://www.linkedin.com/in/thomas-forbes/',
                icon: <FaLinkedin {...iconProps} />,
              },
            ].map((link, idx) => (
              <>
                {/* {idx > 0 && ' · '} */}
                <a
                  href={link.href}
                  target="_blank"
                  className="hover:scale-105 hover:brightness-125 duration-200 p-6"
                >
                  {link.icon}
                  {/* {link.text} */}
                </a>
              </>
            ))}
          </div>
        </footer>
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
