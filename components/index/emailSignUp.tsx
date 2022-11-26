import { useState } from 'react'
import { Bubble } from '../Simple'

export default function EmailSignUp({ subscribers }: { subscribers: number }) {
  const [email, setEmail] = useState('')
  const [emailFeedback, setEmailFeedback] = useState({ colour: '', text: '' })
  const [loading, setLoading] = useState(false)

  const subscribeEmail = async () => {
    setEmailFeedback({ colour: '', text: '' })
    setLoading(true)
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
    const data = await response.json()
    if (data.error)
      setEmailFeedback({ colour: 'text-red-400', text: data.error })
    else
      setEmailFeedback({
        colour: 'text-green-400',
        text: 'Thanks for subscribing :)',
      })
    setLoading(false)
  }
  return (
    <Bubble className="flex flex-col items-center justify-center flex-auto sm:flex-1 lg:flex-auto space-y-3 lg:h-fit">
      <h2 className="text-2xl font-semibold text-center">Stay up to date</h2>
      <p className="text-slate-400 text-center">
        Join {subscribers || 'some'} others and get notified when I do something
        interesting
      </p>
      <div className="w-full flex flex-row space-x-3">
        <input
          type="email"
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-auto appearance-none rounded-md border px-3 py-2 shadow-md shadow-zinc-800/5 focus:outline-none focus:ring-4 border-zinc-700 bg-zinc-700/[0.15] text-zinc-200 placeholder:text-zinc-500 focus:border-sky-600 focus:ring-sky-600/10 sm:text-sm duration-300"
        />
        {/* Would be cool to when submitted change color to green and make text a check mark */}
        <button
          className={`w-14 rounded-md py-2 px-3 text-sm outline-offset-2 font-semibold active:bg-sky-700 ${
            loading ? 'bg-sky-700' : 'bg-sky-500 hover:bg-sky-600'
          } active:text-white/70 duration-200 hover:ring-sky-600/10 hover:ring-4 flex justify-center items-center`}
          type="submit"
          onClick={subscribeEmail}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            'Join'
          )}
        </button>
      </div>
      {emailFeedback.text && (
        <p className={`text-center text-xs ${emailFeedback.colour} font-bold`}>
          {emailFeedback.text}
        </p>
      )}
    </Bubble>
  )
}
