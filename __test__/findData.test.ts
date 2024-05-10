import { findData } from '../lib/main'
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
