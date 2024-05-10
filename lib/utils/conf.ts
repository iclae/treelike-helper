const DEFAULT_KEY_NAME = 'key'
const DEFAULT_CHILDREN_KEY_NAME = 'children'
const DEFAULT_SEARCH_KEY_NAME = 'title'
const DEFAULT_DELETE_EMPTY_PARENT = false
const DEFAULT_INCLUDE_SELF = false

type Options = {
  keyName: string
  childrenKeyName: string
  searchKeyName: string
  deleteEmptyParent: boolean
  includeSelf: boolean
}

type Keys = keyof Options
type PartialOptions = Partial<Options>
export type PickOptions<K extends Keys> = Pick<PartialOptions, K>
type Result<K extends Keys> = Pick<Options, K>
type PartialRecord<K extends Keys> = Partial<Result<K>>

const DEFAULT_OPTIONS: Options = {
  keyName: DEFAULT_KEY_NAME,
  childrenKeyName: DEFAULT_CHILDREN_KEY_NAME,
  searchKeyName: DEFAULT_SEARCH_KEY_NAME,
  deleteEmptyParent: DEFAULT_DELETE_EMPTY_PARENT,
  includeSelf: DEFAULT_INCLUDE_SELF,
}

export function pickOptions<K extends Keys>(
  pickKeys: K[] = [],
  options: PartialRecord<K> = {}
): Result<K> {
  const defaultOptions = pickKeys.reduce((acc, key) => {
    acc[key] = DEFAULT_OPTIONS[key]
    return acc
  }, {} as Result<K>)
  return Object.assign({}, defaultOptions, options)
}
