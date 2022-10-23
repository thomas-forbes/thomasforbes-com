import { useRouter } from 'next/router'

export default function NavBar({ className }: { className?: string }) {
  const router = useRouter()

  const links: { title: string; href: string }[] = [
    { title: 'Home', href: '/' },
  ].concat(
    router.pathname
      .split('/')
      .slice(1, -1)
      .map((link, idx, arr) => ({
        title: link
          .split('-')
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(' '),
        href: '/' + arr.slice(0, idx + 1).join('/'),
      }))
  )
  return (
    <div className={'flex flex-row ' + className}>
      {links.map((link, idx, arr) => (
        <div
          key={link.href}
          onClick={() => router.push(link.href)}
          className={`cursor-pointer text-center flex justify-center items-center border-slate-700 py-2 bg-slate-800 hover:bg-slate-700 duration-300 z-${
            idx * 10
          } ${idx > 0 && '-ml-4'} ${
            idx == arr.length - 1
              ? 'border rounded-xl px-4'
              : 'border-l border-y rounded-l-xl pr-6 pl-4'
          }`}
        >
          {link.title}
        </div>
      ))}
    </div>
  )
}
