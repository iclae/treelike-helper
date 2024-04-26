import get from 'lodash/fp/get'
import { pickOptions, PickOptions } from '../utils/conf'
import findKeyPath from './findKeyPath'

export default function findParentData(
  treelikeData: TreelikeDataItem[],
  targetKey: NSType,
  options: PickOptions<'childrenKeyName' | 'keyName'> = {}
): TreelikeDataItem | null {
  const _options = pickOptions(['childrenKeyName', 'keyName'], options)
  const path = findKeyPath(treelikeData, targetKey, _options)
  const parentPath = path.slice(0, -2)
  if (parentPath.length === 0) return null

  return get(parentPath)(treelikeData)
}
