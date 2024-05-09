import { pickOptions, PickOptions } from '../utils/conf'
import get from '../utils/get'
import findKeyPath from './findKeyPath'

export default function findData(
  treelikeData: TreelikeDataItem[],
  targetKey: NSType,
  options: PickOptions<'childrenKeyName' | 'keyName'> = {}
): TreelikeDataItem | null {
  const _options = pickOptions(['childrenKeyName', 'keyName'], options)

  return get(treelikeData, findKeyPath(treelikeData, targetKey, _options))
}
