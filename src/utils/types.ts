export interface Article {
  title: string
  description: string
  link: string
  createdAt: number // unix timestamp ms
  priority?: number
}

export interface ProjectType {
  title: string
  description: string
  link: string
  image?: string
  tags: string[]
}
