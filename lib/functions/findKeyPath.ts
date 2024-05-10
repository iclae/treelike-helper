import { pickOptions, PickOptions } from '../utils/conf'

export default function findKeyPath(
  treelikeData: TreelikeDataItem[],
  targetKey: NSType,
  options: PickOptions<'childrenKeyName' | 'keyName'> = {}
): Array<NSType> {
  const { childrenKeyName, keyName } = pickOptions(
    ['childrenKeyName', 'keyName'],
    options
  )

  const recursiveSearch = (_treelikeData: TreelikeDataItem[] = []) => {
    let path: Array<NSType> = []
    const hasKey = _treelikeData.some((dataItem, index) => {
      if (dataItem[keyName] === targetKey) {
        path.push(index)
        return true
      }
      if (Array.isArray(dataItem[childrenKeyName])) {
        const searchResult = recursiveSearch(
          dataItem[childrenKeyName] as TreelikeDataItem[]
        )
        if (searchResult.hasKey) {
          path = [...path, index, childrenKeyName, ...searchResult.path]
        }
        return searchResult.hasKey
      }
      return false
    })
    return { hasKey, path }
  }

  const searchResult = recursiveSearch(treelikeData)
  return searchResult.path
}
