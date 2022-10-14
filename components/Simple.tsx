import { ReactNode } from 'react'

export const Card = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={`border border-solid border-slate-200 border-opacity-10 bg-slate-800 highlight-white/5 shadow-lg rounded-xl py-6 px-8 ${className}`}
    >
      {children}
    </div>
  )
}

export const Bubble = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={`border border-slate-700 shadow-lg rounded-xl p-6 ${className}`}
    >
      {children}
    </div>
  )
}
