import Link from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'

export default function Home() {
  const iconProps = { size: 22, className: 'text-slate-300' } //hover:scale-105 duration-75' }
  return (
    <div className="w-full h-full flex flex-col justify-between pt-16 pb-5 px-2 dark">
      {/* MAIN CONTENT */}
      <div className="flex flex-col items-center space-y-6">
        {/* TOP INFO */}
        <h1 className="text-6xl font-bold text-center hover:scale-125 duration-150">
          Thomas Forbes
        </h1>
        <p className="text-slate-300">
          I am an Irish secondary school student trying to be a full-stack
          entrepreneur.
        </p>
        {/* ABOUT ME */}
        <div className="flex flex-row justify-between">
          <section>
            <h2 className="text-2xl font-semibold my-3">About Me</h2>
            <ul>
              {[
                {
                  emoji: '🧑',
                  text: `${Math.abs(
                    new Date(
                      Date.now() - new Date(2005, 8, 10).getTime()
                    ).getUTCFullYear() - 1970
                  )} years old`,
                },
                { emoji: '🇮🇪', text: 'Living in Ireland' },
                { emoji: '👨‍💻', text: 'Indie Hacker' },
              ].map((item) => (
                <li className="text-slate-300 flex flex-row items-center">
                  <span className="mr-2">{item.emoji}</span>
                  {item.text}
                  {item.text.includes('years old') && (
                    <div
                      className="w-2 h-2 rounded-xl block bg-green-600 animate-pulse
                  ml-1"
                    ></div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
        {/* WRITING */}
        <div className="border border-solid border-slate-200 border-opacity-10 bg-slate-800 highlight-white/5 shadow-lg rounded-xl p-6 md:p-8 space-y-6">
          {/* TOP LINK */}
          <Link href="/">
            <h4 className="text-slate-500 uppercase hover:text-white duration-200">
              Writing &rarr;
            </h4>
          </Link>
          {/* ARTICLES */}
        </div>
      </div>
      {/* FOOTER */}
      <footer className="self-center">
        <div className="flex flex-row items-center">
          {[
            {
              text: 'Email',
              href: 'mailto:thomas@thomasforbes.com',
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
                className="hover:scale-125 hover:brightness-125 duration-150 p-6"
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
