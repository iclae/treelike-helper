import { findSearchData } from '../index'

const treeData = [
  { key: '1', title: 'layer1' },
  {
    key: '2',
    title: '2',
    children: [
      { key: '2-1', title: '2-1' },
      {
        key: '2-2',
        title: '2-2',
        children: [{ key: '2-2-1', title: '2-2-1' }],
      },
      {
        key: '2-2-2',
        title: '2-2-2',
      },
    ],
  },
]

describe('findSearchData', () => {
  test('unfindSearchData', () => {
    expect(findSearchData(treeData, 'unfind')).toEqual([])
    expect(findSearchData(treeData, '')).toEqual(treeData)
    expect(findSearchData([], '1')).toEqual([])
  })
  test('findSearchData', () => {
    expect(findSearchData(treeData, 'lay')).toEqual([
      { key: '1', title: 'layer1' },
    ])
    expect(findSearchData(treeData, '2-2-1')).toEqual([
      {
        key: '2',
        title: '2',
        children: [
          {
            key: '2-2',
            title: '2-2',
            children: [{ key: '2-2-1', title: '2-2-1' }],
          },
        ],
      },
    ])
    expect(findSearchData(treeData, '2-2')).toEqual([
      {
        key: '2',
        title: '2',
        children: [
          {
            key: '2-2',
            title: '2-2',
            children: [{ key: '2-2-1', title: '2-2-1' }],
          },
          {
            key: '2-2-2',
            title: '2-2-2',
          },
        ],
      },
    ])
  })
})
