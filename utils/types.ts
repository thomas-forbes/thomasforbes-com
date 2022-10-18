export interface Article {
  title: string
  description: string
  link: string
  createdAt: number // unix timestamp ms
}

export interface ProjectType {
  title: string
  description: string
  link: string
  image?: string
  tags: string[]
}
