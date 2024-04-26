import { pickOptions, PickOptions } from '../utils/conf'

export default function calculateLeafCount(
  treelikeData: TreelikeDataItem[],
  options: PickOptions<'childrenKeyName'> = {}
): number {
  const { childrenKeyName } = pickOptions(['childrenKeyName'], options)
  let count = 0

  for (let i = 0; i < treelikeData.length; i++) {
    const node = treelikeData[i]

    if (node[childrenKeyName] && Array.isArray(node[childrenKeyName]) && node[childrenKeyName].length > 0) {
      count += calculateLeafCount(node[childrenKeyName])
    } else {
      count += 1
    }
  }

  return count
}
