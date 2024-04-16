import { pickOptions, PickOptions } from './conf'

export default function filterTreeData(
  treelikeData: TreelikeDataItem[],
  filterFunc: (
    item: TreelikeDataItem,
    index: number,
    array: TreelikeDataItem[]
  ) => boolean,
  options: PickOptions<'childrenKeyName'> = {}
): TreelikeDataItem[] {
  const { childrenKeyName } = pickOptions(['childrenKeyName'], options)
  const newTreelikeData: TreelikeDataItem[] = treelikeData.filter(filterFunc)
  const recursiveFilter = (data: Array<TreelikeDataItem>) => {
    return data.map(item => {
      const newItem = { ...item }
      if (
        Array.isArray(item[childrenKeyName]) &&
        item[childrenKeyName].length > 0
      ) {
        newItem[childrenKeyName] = newItem[childrenKeyName].filter(filterFunc)
        if (newItem[childrenKeyName].length > 0) {
          newItem[childrenKeyName] = recursiveFilter(newItem[childrenKeyName])
        }
      }
      return newItem
    })
  }
  return recursiveFilter(newTreelikeData)
}
