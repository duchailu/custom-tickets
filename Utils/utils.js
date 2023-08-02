export const getDate = (timestamp) => {
  const date = new Date(timestamp)
  const year = date.getFullYear().toString().slice(-2) // Get the last two digits of the year
  return `${date.getDate() < 10 ? 0 : ''}${date.getDate()}-${date.getMonth() < 10 ? 0 : ''}${
    date.getMonth() + 1
  }-${year}`
}
