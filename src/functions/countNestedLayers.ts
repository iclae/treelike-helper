import { pickOptions, PickOptions } from '../utils/conf'

export default function countNestedLayers(
  treelikeData: TreelikeDataItem[],
  options: PickOptions<'childrenKeyName'> = {}
): number {
  const { childrenKeyName } = pickOptions(['childrenKeyName'], options)

  let maxDepth = 0
  let i = 0
  while (i < treelikeData.length) {
    let depth = 1
    let item = treelikeData[i]
    if (item[childrenKeyName] && item[childrenKeyName].length > 0) {
      depth += countNestedLayers(item[childrenKeyName])
    }
    maxDepth = Math.max(maxDepth, depth)
    i++
  }
  return maxDepth
}
