import treeData from './treeData'
import { updateData } from '../index'

describe('updateData', () => {
  test('unfind key', () => {
    expect(updateData([{ key: '1' }], '', { key: '2' })).toEqual([{ key: '1' }])
    expect(updateData([], '1', { key: '1' })).toEqual([])
    expect(updateData([{ key: '1' }], '2', { key: '2' })).toEqual([
      { key: '1' },
    ])
  })

  test('update data with object', () => {
    const data = {
      key: '1',
      title: 'update1',
      children: [{ key: '1-1', title: '1-1' }],
      plus: 'plus',
    }
    const newTreeData = updateData(treeData, '1', data)
    expect(newTreeData[0]).toEqual(data)
    expect(treeData[0].title).not.toBe(data.title)
  })

  test('update data with function', () => {
    const newTreeData2 = updateData(treeData, '2-1-3-2-1', item => {
      return {
        ...item,
        title: 'update 2-1-3-2-1',
      }
    })
    expect(
      newTreeData2[1].children[0].children[2].children[1].children[0].title
    ).toBe('update 2-1-3-2-1')
    expect(
      treeData[1].children[0].children[2].children[1].children[0].title
    ).toBe('2-1-3-2-1')
  })
})
