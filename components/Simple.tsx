import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export const Card = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={twMerge(
        `border border-solid border-slate-200 border-opacity-10 bg-slate-800 highlight-white/5 shadow-lg rounded-xl py-6 px-8 ${className}`
      )}
    >
      {children}
    </div>
  )
}

export const Bubble = ({
  children,
  className,
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) => {
  return (
    <div
      className={twMerge(
        `border border-slate-700 shadow-lg rounded-xl p-6 ${className}`
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
