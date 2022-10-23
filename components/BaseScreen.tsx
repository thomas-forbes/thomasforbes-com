import { ReactNode, useEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'

export default function BaseScreen({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const iconProps = {
    size: 24,
    className: 'text-slate-400 group-hover:text-slate-300 duration-300',
  }
  // Requires js to show email -> less spam
  const [mailLink, setMailLink] = useState(
    'mailto:enablejavascript@example.com'
  )
  useEffect(() => {
    setMailLink(`mailto:${window.atob('dGhvbWFzQHRob21hc2ZvcmJlcy5jb20=')}`)
  }, [])
  return (
    <div className="flex-1 w-full pt-8 px-4 sm:px-8 dark flex flex-col justify-between selection:bg-transparent selection:text-sky-400">
      <div className={className}>{children}</div>
      {/* FOOTER */}
      <footer className="self-center py-3 flex flex-row items-center">
        {[
          {
            text: 'Email',
            href: mailLink,
            icon: <IoMdMail {...iconProps} />,
          },
          {
            text: 'Twitter',
            href: 'https://twitter.com/ThomasForbesy',
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
          <a
            href={link.href}
            rel="noreferrer"
            target="_blank"
            className="hover:scale-110 duration-300 p-6 group"
            key={link.href}
          >
            {link.icon}
            {/* {link.text} */}
          </a>
        ))}
      </footer>
    </div>
  )
}
