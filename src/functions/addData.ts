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
  const { childrenKeyName } = _options

  const path = findKeyPath(treelikeData, parentKey, _options)
  return produce(treelikeData, draft => {
    let target: TreelikeDataItem = draft
    let i = 0
    while (i < path.length) {
      target = target[path[i]]
      i++
    }
    if (target) {
      if (!target[childrenKeyName]) target[childrenKeyName] = []
      if (Array.isArray(data)) {
        target[childrenKeyName].push(...data)
      } else {
        target[childrenKeyName].push(data)
      }
    }
  })
}
