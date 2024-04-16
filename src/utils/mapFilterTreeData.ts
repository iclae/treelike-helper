import { pickOptions, PickOptions } from './conf'

export default function mapFilterTreeData(
  treelikeData: TreelikeDataItem[],
  filterFunc: (
    item: TreelikeDataItem,
    index: number,
    array: TreelikeDataItem[]
  ) => boolean,
  mapFunc: (
    item: TreelikeDataItem,
    index: number,
    array: TreelikeDataItem[]
  ) => TreelikeDataItem,
  options: PickOptions<'childrenKeyName'> = {}
): TreelikeDataItem[] {
  const { childrenKeyName } = pickOptions(['childrenKeyName'], options)

  const newTreelikeData = treelikeData.filter(filterFunc)
  const recursiveMap = (data: Array<TreelikeDataItem>) => {
    return data.map((item, ...rest) => {
      const newItem = mapFunc(item, ...rest)
      if (
        Array.isArray(item[childrenKeyName]) &&
        item[childrenKeyName].length > 0
      ) {
        newItem[childrenKeyName] = newItem[childrenKeyName].filter(filterFunc)
        if (newItem[childrenKeyName].length > 0) {
          newItem[childrenKeyName] = recursiveMap(newItem[childrenKeyName])
        }
      }
      return newItem
    })
  }
  return recursiveMap(newTreelikeData)
}
