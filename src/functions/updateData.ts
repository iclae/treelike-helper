import { produce } from 'immer'
import set from 'lodash/set'
import { pickOptions, PickOptions } from '../utils/conf'
import findKeyPath from './findKeyPath'

export default function updateData(
  treelikeData: TreelikeDataItem[],
  targetKey: NSType,
  data: TreelikeDataItem | ((item: TreelikeDataItem) => TreelikeDataItem),
  options: PickOptions<'childrenKeyName' | 'keyName'> = {}
): TreelikeDataItem[] {
  const _options = pickOptions(['childrenKeyName', 'keyName'], options)

  const path = findKeyPath(treelikeData, targetKey, _options)
  return produce(treelikeData, draft => {
    let target: TreelikeDataItem = draft
    let i = 0
    while (i < path.length) {
      target = target[path[i]]
      i++
    }
    if (target) {
      if (typeof data === 'function') {
        target = data(target)
      } else {
        target = data
      }
      set(draft, path, target)
    }
  })
}
