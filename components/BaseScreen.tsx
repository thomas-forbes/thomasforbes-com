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
  const iconProps = { size: 22, className: 'text-slate-300' } //hover:scale-105 duration-75' }
  // Requires js to show email -> less spam
  const [mailLink, setMailLink] = useState(
    'mailto:enablejavascript@example.com'
  )
  useEffect(() => {
    setMailLink(`mailto:${window.atob('dGhvbWFzQHRob21hc2ZvcmJlcy5jb20=')}`)
  }, [])
  return (
    <div className="flex-1 w-full pt-16 px-8 dark flex flex-col justify-between">
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
          <>
            {/* {idx > 0 && ' · '} */}
            <a
              href={link.href}
              rel="noreferrer"
              target="_blank"
              className="hover:scale-105 hover:brightness-125 duration-200 p-6"
            >
              {link.icon}
              {/* {link.text} */}
            </a>
          </>
        ))}
      </footer>
    </div>
  )
}
