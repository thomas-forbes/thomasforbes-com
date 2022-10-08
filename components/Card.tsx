import { ReactNode } from 'react'

export default function Card({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`border border-solid border-slate-200 border-opacity-10 bg-slate-800 highlight-white/5 shadow-lg rounded-xl p-6 md:p-8 ${className}`}
    >
      {children}
    </div>
  )
}
