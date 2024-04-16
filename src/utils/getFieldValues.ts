import { pickOptions, PickOptions } from './conf'

export default function getFieldValues(
  treelikeData: TreelikeDataItem[],
  field: string | ((item: TreelikeDataItem) => any),
  options: PickOptions<'childrenKeyName'> = {}
): Array<any> {
  const { childrenKeyName } = pickOptions(['childrenKeyName'], options)

  const values: Array<any> = []

  function recursiveGet(data: TreelikeDataItem[]) {
    data.forEach(item => {
      const value = typeof field === 'function' ? field(item) : item[field]
      values.push(value)
      if (item[childrenKeyName] && item[childrenKeyName].length > 0) {
        recursiveGet(item[childrenKeyName])
      }
    })
  }

  recursiveGet(treelikeData)
  return values
}
