import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'

const ToolTip = ({
  children,
  toolText,
  text,
}: {
  children?: ReactNode
  toolText?: string
  text: string
}) => (
  <span className="has-tooltip relative border-b border-slate-400 border-dashed">
    <span className="tooltip left-1/2 text-sm whitespace-pre -translate-x-1/2 rounded-xl shadow-lg px-3 py-1 bg-slate-800 -mt-7 duration-200">
      {children ? children : toolText}
    </span>
    {text}
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
    <div className="w-full h-full flex flex-col justify-between pt-16 pb-5 px-2 dark">
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
        <div className="flex flex-row max-w-4xl w-full space-x-5">
          {/* WRITING */}
          <div className="flex-1 border border-solid border-slate-200 border-opacity-10 bg-slate-800 highlight-white/5 shadow-lg rounded-xl p-6 md:p-8 space-y-6">
            {/* TOP LINK */}
            <Link href="/">
              <h4 className="text-slate-500 uppercase hover:text-white duration-300">
                Writing &rarr;
              </h4>
            </Link>
            {/* ARTICLES */}
            <div className="flex flex-col space-y-5">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Ur momma so fat</h3>
                <p className="text-slate-400">
                  The story of the heaviest object in the world...
                </p>
                <p className="text-slate-600">February 20, 2069</p>
              </div>
            </div>
          </div>
          {/* ABOUT ME */}
          <div className="border border-slate-700 shadow-lg rounded-xl p-6 space-y-3">
            <h2 className="text-2xl font-semibold">About Me</h2>
            <ul>
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
  )
}

export const getStaticProps = async () => {
  const locData = await (
    await fetch('https://nomadlist.com/@thomasforbes.json')
  ).json()
  const loc = {
    city: locData.location.now.city || 'Earth',
    country:
      locData.location.now.country_code === 'UK'
        ? 'GB'
        : locData.location.now.country_code,
  }

  return {
    props: {
      location: loc,
    },
  }
}
