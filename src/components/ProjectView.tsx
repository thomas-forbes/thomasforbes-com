import splitbee from '@splitbee/web'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export default function Project({
  title = '',
  description = '',
  image,
  link = '',
  descClassName = '',
  tagsClassName = '',
  className = '',
  tags = [],
}: {
  title?: string
  description?: string
  image: string
  className?: string
  descClassName?: string
  tagsClassName?: string
  link?: string
  tags?: string[]
}) {
  return (
    <Link href={link} target="_blank" rel="noreferrer">
      <div
        className={twMerge(
          `rounded-xl flex flex-col items-center justify-between bg-gradient-to-b overflow-hidden duration-300 group cursor-pointer shadow-lg hover:shadow-2xl shadow-gray-900 h-full hover:scale-105 hover:ring-4 ring-offset-2 ring-offset-slate-800`,
          className
        )}
        onClick={() => splitbee.track(`Project ${title}`)}
      >
        {/* TEXT */}
        <div className="px-2 pt-6 pb-4 text-center items-center flex flex-col space-y-2 w-full">
          <h3 className="text-2xl font-bold text-md">{title}</h3>
          <p className={twMerge('text-sm', descClassName)}>{description}</p>
          <div className="flex flex-row flex-wrap justify-center gap-3 group-hover:gap-5 duration-300">
            {tags.map((tag) => (
              <p
                className={twMerge(
                  `h-fit bg-opacity-50 text-xs shadow-lg rounded-md px-2 py-1`,
                  tagsClassName
                )}
                key={tag}
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
        {/* IMAGE */}
        {image && (
          <div className="h-40 overflow-hidden max-w-[80%] rounded-t-lg w-full shadow-xl group-hover:drop-shadow-[0_55px_55px_rgba(0,0,0,0.25)] shadow-[#141414] translate-y-8 group-hover:translate-y-0 duration-300 group-hover:scale-105">
            <Image alt={`${title} image`} src={image} />
          </div>
        )}
      </div>
    </Link>
  )
}
