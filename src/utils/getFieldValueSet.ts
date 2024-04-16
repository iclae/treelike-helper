import { pickOptions, PickOptions } from './conf'

export default function getFieldValueSet(
  treelikeData: TreelikeDataItem[],
  field: string | ((item: TreelikeDataItem) => any),
  options: PickOptions<'childrenKeyName'> = {}
): Set<any> {
  const { childrenKeyName } = pickOptions(['childrenKeyName'], options)

  const values: Set<any> = new Set()

  function recursiveGet(data: TreelikeDataItem[]) {
    data.forEach(item => {
      const value = typeof field === 'function' ? field(item) : item[field]
      values.add(value)
      if (item[childrenKeyName] && item[childrenKeyName].length > 0) {
        recursiveGet(item[childrenKeyName])
      }
    })
  }

  recursiveGet(treelikeData)
  return values
}
