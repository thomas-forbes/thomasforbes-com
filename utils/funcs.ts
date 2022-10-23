export const dispDate = (num: number) => {
  const d = new Date(num)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}
