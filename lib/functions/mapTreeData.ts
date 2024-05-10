import { pickOptions, PickOptions } from '../utils/conf'

export default function mapTreeData(
  treelikeData: TreelikeDataItem[],
  mapFunc: (
    item: TreelikeDataItem,
    index: number,
    array: TreelikeDataItem[]
  ) => TreelikeDataItem,
  options: PickOptions<'childrenKeyName'> = {}
): TreelikeDataItem[] {
  const { childrenKeyName } = pickOptions(['childrenKeyName'], options)
  const recursiveMap = (data: Array<TreelikeDataItem>) => {
    return data.map((item, ...rest) => {
      const newItem = mapFunc(item, ...rest)
      if (
        Array.isArray(item[childrenKeyName]) &&
        item[childrenKeyName].length > 0
      ) {
        newItem[childrenKeyName] = recursiveMap(item[childrenKeyName])
      }
      return newItem
    })
  }

  return recursiveMap(treelikeData)
}
