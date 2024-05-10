import { produce } from 'immer'
import { pickOptions, PickOptions } from '../utils/conf'
import findKeyPath from './findKeyPath'

export default function addData(
  treelikeData: TreelikeDataItem[],
  parentKey: NSType,
  data: TreelikeDataItem | TreelikeDataItem[],
  options: PickOptions<'childrenKeyName' | 'keyName'> = {}
): TreelikeDataItem[] {
  const _options = pickOptions(['childrenKeyName', 'keyName'], options)
  const path = findKeyPath(treelikeData, parentKey, _options)
  if (!path.length) return treelikeData;

  const { childrenKeyName } = _options
  const _data = Array.isArray(data) ? data : [data]

  return produce(treelikeData, draft => {
    let target: TreelikeDataItem = draft
    let i = 0
    while (i < path.length) {
      target = target[path[i]]
      i++
    }
    if (target) {
      if (!target[childrenKeyName]) target[childrenKeyName] = []
      target[childrenKeyName].push(..._data)
    }
  })
}
