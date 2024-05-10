import { findKeyPath } from '../lib/main'
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

describe('findKeyPath', () => {
  test('test findKeyPath', () => {
    // empty
    expect(findKeyPath([{ key: 1 }], '')).toEqual([])
    // unfind key
    expect(findKeyPath([], '1')).toEqual([])
    expect(findKeyPath([{ key: 2 }], '1')).toEqual([])
    // layer 1
    expect(findKeyPath(treeData, '1')).toEqual([0])
    // layer 2
    expect(findKeyPath(treeData, '2-1')).toEqual([1, 'children', 0])
    // layer 3
    expect(findKeyPath(treeData, '2-3-1')).toEqual([
      1,
      'children',
      2,
      'children',
      0,
    ])
    // layer deep
    expect(findKeyPath(treeData, '2-1-3-2-2')).toEqual([
      1,
      'children',
      0,
      'children',
      2,
      'children',
      1,
      'children',
      1,
    ])
    // other children key
    expect(
      findKeyPath([{ key: '1', subs: [{ key: '2' }] }], '2', {
        childrenKeyName: 'subs',
      })
    ).toEqual([0, 'subs', 0])
    // other target key
    expect(
      findKeyPath([{ id: '1', children: [{ id: '2' }] }], '2', {
        keyName: 'id',
      })
    ).toEqual([0, 'children', 0])
    // both
    expect(
      findKeyPath([{ id: '1', subs: [{ id: '2' }] }], '2', {
        keyName: 'id',
        childrenKeyName: 'subs',
      })
    ).toEqual([0, 'subs', 0])
  })
})
