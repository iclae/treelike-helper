import get from '../utils/get'
import { pickOptions, PickOptions } from '../utils/conf'
import findKeyPath from './findKeyPath'

export default function findParentData(
  treelikeData: TreelikeDataItem[],
  targetKey: NSType,
  options: PickOptions<'childrenKeyName' | 'keyName'> = {}
): TreelikeDataItem | undefined {
  const _options = pickOptions(['childrenKeyName', 'keyName'], options)
  const path = findKeyPath(treelikeData, targetKey, _options)
  if (path.length < 3) return void 0

  const parentPath = path.slice(0, -2)

  return get(treelikeData, parentPath)
}
