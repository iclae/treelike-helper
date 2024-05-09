import { produce } from 'immer'
import set from '../utils/set'
import get from '../utils/get'
import { pickOptions, PickOptions } from '../utils/conf'
import findKeyPath from './findKeyPath'

export default function deleteData(
  treelikeData: TreelikeDataItem[],
  targetKey: NSType,
  options: PickOptions<'childrenKeyName' | 'keyName' | 'deleteEmptyParent'> = {}
): TreelikeDataItem[] {
  const _options = pickOptions(
    ['childrenKeyName', 'keyName', 'deleteEmptyParent'],
    options
  )
  const path = findKeyPath(treelikeData, targetKey, _options)
  if (!path.length) return treelikeData

  const { childrenKeyName, keyName, deleteEmptyParent } = _options
  const parentPath = path.slice(0, -1)

  return produce(treelikeData, draft => {
    let i = 0
    let target: TreelikeDataItem = draft
    while (i < parentPath.length) {
      target = target[parentPath[i]]
      i++
    }
    if (target) {
      if (parentPath.length) {
        target = target.filter(
          (item: TreelikeDataItem) => item[keyName] !== targetKey
        )
        set(draft, parentPath, target)
        if (deleteEmptyParent && target.length === 0) {
          // 删除空的父节点
          const upPath = parentPath.slice(0, -1)
          const upTarget = get(draft, upPath)
          if (upTarget[childrenKeyName].length === 0) {
            delete upTarget[childrenKeyName]
            set(draft, upPath, upTarget)
          }
        }
      } else {
        // 最上层，直接删除
        draft.splice(
          draft.findIndex(
            (item: TreelikeDataItem) => item[keyName] === targetKey
          ),
          1
        )
      }
    }
  })
}
