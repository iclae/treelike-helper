import cloneDeep from 'lodash/fp/cloneDeep'
import { pickOptions, PickOptions } from './conf'
import findKeyPath from './findKeyPath'

export default function updateThroughData(
  treelikeData: TreelikeDataItem[],
  targetKey: NSType,
  iteratee: (item: TreelikeDataItem) => TreelikeDataItem,
  options: PickOptions<'childrenKeyName' | 'keyName' | 'includeSelf'> = {}
): TreelikeDataItem[] {
  const _options = pickOptions(
    ['childrenKeyName', 'keyName', 'includeSelf'],
    options
  )
  const { childrenKeyName } = _options

  const newTreelikeData = cloneDeep(treelikeData)
  const path = findKeyPath(treelikeData, targetKey, _options)
  let curr = newTreelikeData
  for (let index = 0; index < path.length; index++) {
    const key = path[index]
    if (!_options.includeSelf && index === path.length - 1) {
      break
    }
    if (key !== childrenKeyName) {
      curr[key as number] = iteratee(curr[key as number])
    }
    // TODO: type?
    // @ts-ignore
    curr = curr[key]
  }
  return newTreelikeData
}
