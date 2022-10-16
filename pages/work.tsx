import Image from 'next/image'
import BaseScreen from '../components/BaseScreen'
import NavBar from '../components/NavBar'
import { Card } from '../components/Simple'
import TopProjects from '../components/TopProjects'

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
          <h2 className="text-2xl font-semibold hover:text-slate-500 duration-300 cursor-pointer">
            My Favourite
          </h2>
          <TopProjects />
        </Card>
        {/* OTHER */}
        <Card className="w-full space-y-6 px-4 md:px-8 flex flex-col">
          <h2 className="text-2xl font-semibold hover:text-slate-500 duration-300 cursor-pointer">
            Other
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-row px-6 py-4 space-x-4 items-center border border-transparent hover:border-slate-700 rounded-xl duration-150">
              {/* IMAGE */}
              <div className="relative h-11 w-11 overflow-hidden rounded-xl">
                <Image
                  src={require('../public/images/projects/allmycontact.info.png')}
                  objectFit="contain"
                  layout="fill"
                />
              </div>
              {/* TEXT */}
              <div className="flex flex-col">
                <p className="text-white font-bold">Allmycontact.info</p>
                <p className="text-zinc-400 font-mono text-xs">
                  Easily share your contact info with QR codes
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </BaseScreen>
  )
}

// export async function getStaticProps() {
//   const articles = await getArticles()
//   return { props: { articles } }
// }
