export default function get(data: TreelikeDataItem, path: NSType[], defaultValue: any = void 0) {
  if (!path || path.length === 0) return defaultValue

  let target = data
  for (const key of path) {
    if (!target) return defaultValue
    target = target[key]
  }
  return target ? target : defaultValue
}
