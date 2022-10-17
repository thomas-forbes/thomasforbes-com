import BaseScreen from '../components/BaseScreen'
import NavBar from '../components/NavBar'
import { Card } from '../components/Simple'
import TopProjects from '../components/TopProjects'

const gradients = ['from-teal-500 to-sky-500']

export default function Work() {
  return (
    <BaseScreen className="flex flex-col items-center">
      <div className="flex flex-col items-center max-w-4xl space-y-6 w-full">
        <NavBar className="self-start" />
        <h1 className="text-6xl pb-4 font-bold text-center hover:scale-125 duration-150">
          My Work
        </h1>
        {/* <p className="text-slate-300 text-center"></p> */}
        {/* BEST */}
        <Card className="w-full space-y-6 px-4 md:px-8 flex flex-col">
          <h2 className="text-2xl font-semibold">My Favourite</h2>
          <TopProjects />
        </Card>
        {/* OTHER */}
        {/* <Card className="w-full space-y-6 px-4 md:px-8 flex flex-col">
          <h2 className="text-2xl font-semibold">Other</h2>
        </Card> */}
      </div>
    </BaseScreen>
  )
}

// export async function getStaticProps() {
//   const articles = await getArticles()
//   return { props: { articles } }
// }
