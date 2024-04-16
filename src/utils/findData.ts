import { pickOptions, PickOptions } from './conf'
import get from 'lodash/fp/get'
import findKeyPath from './findKeyPath'

export default function findData(
  treelikeData: TreelikeDataItem[],
  targetKey: NSType,
  options: PickOptions<'childrenKeyName' | 'keyName'> = {}
): TreelikeDataItem | null {
  const _options = pickOptions(['childrenKeyName', 'keyName'], options)

  return get(findKeyPath(treelikeData, targetKey, _options))(treelikeData)
}
