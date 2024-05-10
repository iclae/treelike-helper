import { updateThroughData } from '../lib/main'
import { describe, test, expect } from 'vitest'

const treeData: any[] = [
  { key: '1', children: [{ key: '1-1', children: [{ key: '1-1-1' }] }] },
]

describe('updateThroughData', () => {
  test('unfind key', () => {
    expect(updateThroughData([{ key: '1' }], '', item => item)).toEqual([
      { key: '1' },
    ])
    expect(updateThroughData([], '1', item => item)).toEqual([])
    expect(updateThroughData([{ key: '1' }], '2', item => item)).toEqual([
      { key: '1' },
    ])
  })

  test('updateThroughData normal', () => {
    const newTreeData1 = updateThroughData(treeData, '1-1-1', item => {
      return {
        ...item,
        title: item.key,
      }
    })
    expect(newTreeData1).toEqual([
      {
        key: '1',
        title: '1',
        children: [{ key: '1-1', title: '1-1', children: [{ key: '1-1-1' }] }],
      },
    ])
    expect(treeData[0].title).not.toBe('1')
  })

  test('updateThroughData includeSelf', () => {
    const newTreeData2 = updateThroughData(
      treeData,
      '1-1-1',
      item => {
        return {
          ...item,
          title: item.key,
        }
      },
      { includeSelf: true }
    )
    expect(newTreeData2).toEqual([
      {
        key: '1',
        title: '1',
        children: [
          {
            key: '1-1',
            title: '1-1',
            children: [{ key: '1-1-1', title: '1-1-1' }],
          },
        ],
      },
    ])
    expect(treeData[0].children[0].children[0].title).not.toBe('1-1-1')
  })
})
