import { updateData } from '../lib/main'
import { describe, test, expect } from 'vitest'

const treeData = [
  { key: '1', title: '1' },
  {
    key: '2',
    title: '2',
    children: [
      {
        key: '2-1',
        title: '2-1',
        children: [
          { key: '2-1-1', title: '2-1-1' },
          { key: '2-1-2', title: '2-1-2' },
          {
            key: '2-1-3',
            title: '2-1-3',
            children: [
              {
                key: '2-1-3-1',
                title: '2-1-3-1',
              },
              {
                key: '2-1-3-2',
                title: '2-1-3-2',
                children: [
                  { key: '2-1-3-2-1', title: '2-1-3-2-1' },
                  { key: '2-1-3-2-2', title: '2-1-3-2-2' },
                  { key: '2-1-3-2-3', title: '2-1-3-2-3' },
                ],
              },
            ],
          },
        ],
      },
      {
        key: '2-2',
        title: '2-2',
        children: [{ key: '2-2-1', title: '2-2-1' }],
      },
      {
        key: '2-3',
        title: '2-3',
        children: [
          {
            key: '2-3-1',
            title: '2-3-1',
          },
        ],
      },
    ],
  },
  { key: '3', title: '3' },
] as any[]

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
