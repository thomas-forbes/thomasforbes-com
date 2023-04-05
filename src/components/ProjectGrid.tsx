import { useEffect, useState } from 'react'
import { useMedia } from 'react-use'
import { ProjectType } from '../utils/types'
import ProjectView from './ProjectView'

// Violet, Indigo, Blue, Sky, Cyan, Teal, Emerald, Green, Lime, Yellow, Amber, Orange, Red, Stone, Gray, Neutral, Zinc, Gray, Slate
const colours = [
  {
    className: 'from-rose-500 to-pink-700',
    descClassName: 'text-rose-200',
    tagsClassName: 'bg-rose-400',
  },
  {
    className: 'from-fuchsia-500 to-purple-700',
    descClassName: 'text-fuchsia-200',
    tagsClassName: 'bg-fuchsia-400',
  },
  {
    className: 'from-purple-500 to-violet-700',
    descClassName: 'text-purple-200',
    tagsClassName: 'bg-purple-400',
  },
  {
    className: 'from-blue-500 to-sky-700',
    descClassName: 'text-blue-200',
    tagsClassName: 'bg-blue-400',
  },
  {
    className: 'from-sky-500 to-cyan-700',
    descClassName: 'text-sky-200',
    tagsClassName: 'bg-sky-400',
  },
  {
    className: 'from-emerald-500 to-green-700',
    descClassName: 'text-emerald-200',
    tagsClassName: 'bg-emerald-400',
  },
  {
    className: 'from-lime-500 to-green-700',
    descClassName: 'text-lime-200',
    tagsClassName: 'bg-lime-400',
  },
  {
    className: 'from-yellow-500 to-amber-700',
    descClassName: 'text-yellow-200',
    tagsClassName: 'bg-yellow-400',
  },
  {
    className: 'from-pink-500 to-red-700',
    descClassName: 'text-pink-200',
    tagsClassName: 'bg-pink-400',
  },
]

const coloursN: { [key: string]: any } = {
  blue: [
    {
      className: 'from-blue-500 to-sky-700 hover:ring-blue-500/20',
      descClassName: 'text-blue-200',
      tagsClassName: 'bg-blue-400',
    },
    {
      className: 'from-sky-500 to-cyan-700 hover:ring-sky-500/20',
      descClassName: 'text-sky-200',
      tagsClassName: 'bg-sky-400',
    },
    {
      className: 'from-cyan-500 to-teal-700 hover:ring-cyan-500/20',
      descClassName: 'text-cyan-200',
      tagsClassName: 'bg-cyan-400',
    },
  ],
  purple: [
    {
      className: 'from-fuchsia-500 to-purple-700 hover:ring-fuchsia-500/20',
      descClassName: 'text-fuchsia-200',
      tagsClassName: 'bg-fuchsia-400',
    },
    {
      className: 'from-purple-500 to-violet-700 hover:ring-purple-500/20',
      descClassName: 'text-purple-200',
      tagsClassName: 'bg-purple-400',
    },
    {
      className: 'from-violet-500 to-blue-700 hover:ring-violet-500/20',
      descClassName: 'text-violet-200',
      tagsClassName: 'bg-violet-400',
    },
  ],
  red: [
    {
      className: 'from-rose-500 to-pink-700 hover:ring-rose-500/20',
      descClassName: 'text-rose-200',
      tagsClassName: 'bg-rose-400',
    },

    {
      className: 'from-pink-500 to-red-700 hover:ring-pink-500/20',
      descClassName: 'text-pink-200',
      tagsClassName: 'bg-pink-400',
    },
    {
      className: 'from-red-500 to-orange-700 hover:ring-red-500/20',
      descClassName: 'text-red-200',
      tagsClassName: 'bg-red-400',
    },
  ],
}

const projects: ProjectType[] = [
  {
    title: 'This Site',
    description: 'My home made personal website',
    image: require('../../public/images/projects/site.png'),
    link: 'https://github.com/thomas-forbes/thomasforbes-com',
    tags: ['Next.js', 'Tailwind CSS', 'MDX'],
  },
  {
    title: 'joinfounders.co',
    description: 'Building the landing page',
    // link: 'https://joinfounders.co',
    link: 'https://founders-site.vercel.app',
    image: require('../../public/images/projects/founders.jpeg'),
    tags: ['Astro', 'Tailwind CSS'],
  },
  {
    title: 'Examfinder.ie',
    description: 'Irish exam paper finder',
    image: require('../../public/images/projects/examfinder.png'),
    link: 'https://examfinder.ie',
    tags: ['Next.js', 'Tailwind CSS', 'Material UI'],
  },
  {
    title: 'Kreoh',
    description: 'AI Question Generator',
    image: require('../../public/images/projects/kreoh.png'),
    link: 'https://kreoh.com',
    tags: ['Next.js', 'Chakra UI', 'GPT-3'],
  },
  {
    title: 'Dotheylike.me',
    description: 'Find out if someone likes you 😉',
    image: require('../../public/images/projects/dotheylike.me.png'),
    link: 'https://dotheylike.me',
    tags: ['Next.js', 'Tailwind CSS', 'GPT-3'],
  },
  {
    title: 'Good Cycling Days',
    description: 'Find the best days to cycle',
    image: require('../../public/images/projects/gcd.png'),
    link: 'https://goodcyclingdays.com',
    tags: ['React Native', 'Firebase', 'Tailwind CSS'],
  },
  {
    title: 'Allmycontact.info',
    description: 'Share contact information with QR codes',
    image: require('../../public/images/projects/amci.png'),
    link: 'https://allmycontact.info',
    tags: ['React Native', 'Tailwind CSS'],
  },
]

export default function ProjectGrid() {
  const isLg = useMedia('(min-width: 1024px)', true)
  const isMd = useMedia('(min-width: 768px)', true)

  const lgColours = ['blue', 'red', 'purple']
  const mdColours = ['blue', 'purple']
  const [selColours, setSelColours] = useState<string[]>(lgColours)

  useEffect(() => {
    if (isLg) setSelColours(lgColours)
    else if (isMd) setSelColours(mdColours)
    else setSelColours(lgColours)
  }, [isMd, isLg])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, idx) => (
        <ProjectView
          key={project.title}
          {...project}
          {...coloursN?.[selColours[idx % selColours.length]]?.[
            Math.floor(idx / selColours.length)
          ]}
          containerClassName="snap-center"
        />
      ))}
    </div>
  )
}
