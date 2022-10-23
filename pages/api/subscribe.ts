import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = JSON.parse(req.body)

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/3398023/subscribe`,
      {
        body: JSON.stringify({
          email,
          api_key: process.env.CONVERTKIT_API_KEY,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    )
    const data = await response.json()
    if (response.status >= 400) {
      return res.status(400).json({
        error: data.message,
      })
    }

    return res.status(201).json({ error: '' })
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || error?.toString() })
  }
}
