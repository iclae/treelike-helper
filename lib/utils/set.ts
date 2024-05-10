export default function set(
  data: TreelikeDataItem,
  path: NSType[],
  value: TreelikeDataItem
) {
  if (path.length === 0) {
    return value
  }

  const [key, ...rest] = path

  data[key] = set(data[key], rest, value)

  return data
}
