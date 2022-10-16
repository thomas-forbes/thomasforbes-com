import Project from './Project'

export default function TopProjects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* GOOD COLOURS: https://tailwindcss.com/docs/background-image#linear-gradients */}
      {/* TODO: MAYBE DIFFERENT ANIMATION PARAMS */}
      <Project
        title="This Site"
        description="My home made personal website"
        image={require('../public/images/projects/site.png')}
        link={'/'}
        className="from-sky-500 to-indigo-500"
        descClassName="text-sky-200"
        tagsClassName="bg-sky-400"
        tags={['Next.js', 'Tailwind CSS', 'MDX']}
      />
      <Project
        title="Cerebyte"
        description="Generate active recall questions from any text"
        image={require('../public/images/projects/cerebyte.png')}
        link={'https://cerebyte.io'}
        className="from-violet-500 to-fuchsia-500"
        descClassName="text-violet-200"
        tagsClassName="bg-violet-400"
        tags={['Next.js', 'Chakra UI', 'GPT-3']}
      />
    </div>
  )
}
