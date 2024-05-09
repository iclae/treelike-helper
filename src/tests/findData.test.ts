import treeData from './treeData'
import { findData } from '../index'

describe('findData', () => {
  test('unfind data', () => {
    expect(findData(treeData, 'unfind')).toBeUndefined()
    expect(findData(treeData, '')).toBeUndefined()
    expect(findData([], '1')).toBeUndefined()
    expect(
      findData(treeData, '1', { keyName: 'id', childrenKeyName: 'subs' })
    ).toBeUndefined()
  })
  test('findData', () => {
    expect(findData(treeData, '2-1-3-2-1')).toEqual({
      key: '2-1-3-2-1',
      title: '2-1-3-2-1',
    })
  })

  test('test findData with custom options', () => {
    const customOptions = {
      keyName: 'id',
      childrenKeyName: 'subs',
    }
    expect(
      findData(
        [{ id: '1', subs: [{ id: '3' }] }, { id: '2' }],
        '3',
        customOptions
      )
    ).toEqual({ id: '3' })
  })
})
