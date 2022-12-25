const fs = require('fs')
const path = require('path')
const slugify = require('slugify')

const mdxFiles = fs.readdirSync('./pages/blog')

mdxFiles.forEach((file) => {
  const filePath = path.join('./pages/blog', file)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const meta = fileContent.match(/export const meta = {([\s\S]*?)}/)
  const title = meta[1].match(/title: '(.*)'/)[1]
  const slug = slugify(title, { lower: true })
  const newFilePath = path.join('./pages/blog', `${slug}.mdx`)
  console.log(newFilePath)
  fs.renameSync(filePath, newFilePath)
})
