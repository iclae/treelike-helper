import { pickOptions, PickOptions } from './conf'

export default function findSearchData(
  treelikeData: TreelikeDataItem[],
  search: string,
  options: PickOptions<'childrenKeyName' | 'searchKeyName'> = {}
): TreelikeDataItem[] {
  const _options = pickOptions(['childrenKeyName', 'searchKeyName'], options)
  const { childrenKeyName, searchKeyName } = _options

  let result = []
  let i = 0

  while (i < treelikeData.length) {
    const item = treelikeData[i]
    // 如果当前节点的 searchKeyName 包含 search
    if (item[searchKeyName].includes(search)) {
      // 直接将当前节点加入到结果中
      result.push(item)
    } else if (item[childrenKeyName] && item[childrenKeyName].length > 0) {
      // 否则，如果当前节点有子节点，就在子节点中进行深度搜索
      const childrenResult: TreelikeDataItem[] = findSearchData(
        item[childrenKeyName],
        search,
        _options
      )
      if (childrenResult.length > 0) {
        // 如果在子节点中找到了包含search的节点，那么就将当前节点（包括找到的子节点）加入到结果中
        result.push({ ...item, [childrenKeyName]: childrenResult })
      }
    }
    i++
  }

  return result
}
