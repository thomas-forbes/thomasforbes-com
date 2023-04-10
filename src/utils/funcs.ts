export const formatDate = (date: Date, time = false) => {
  return date
    .toLocaleString('en-IE', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC',
    })
    .replace(
      /(\d+)\/(\d+)\/(\d+),\s(\d+):(\d+):(\d+)/,
      `$3-$2-$1${time ? ' $4:$5:$6 UTC' : ''}`
    )
}
