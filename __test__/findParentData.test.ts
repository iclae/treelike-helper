import { findParentData } from '../lib/main'
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

describe('findParentData', () => {
  test('findParentData', () => {
    expect(findParentData(treeData, '2')).toBeUndefined()
    expect(findParentData(treeData, '2-2')?.key).toBe('2')
    expect(findParentData(treeData, '2-2-1')?.key).toBe('2-2')
    expect(findParentData(treeData, '2-1-3-2-1')?.key).toBe('2-1-3-2')
  })
})
