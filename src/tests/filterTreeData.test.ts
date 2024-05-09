import { filterTreeData } from '../index'

describe('filterTreeData', () => {
  const filterFunc = (item: TreelikeDataItem) => item.hasPermission

  test('filterTreeData', () => {
    const treelikeData: TreelikeDataItem[] = [
      { id: '1', title: '1', hasPermission: true },
      { id: '2', title: '2' },
      {
        id: '3',
        title: '3',
        hasPermission: true,
        children: [
          { id: '3-1', title: '3-1' },
          { id: '3-2', title: '3-2', hasPermission: true },
          { id: '3-3', title: '3-3', hasPermission: false },
        ],
      },
      {
        id: '4',
        title: '4',
        hasPermission: false,
        children: [
          { id: '4-1', title: '4-1' },
          { id: '4-2', title: '4-2', hasPermission: true },
        ],
      },
    ]

    const expectedResult: TreelikeDataItem[] = [
      { id: '1', title: '1', hasPermission: true },
      {
        id: '3',
        title: '3',
        hasPermission: true,
        children: [{ id: '3-2', title: '3-2', hasPermission: true }],
      },
    ]

    expect(filterTreeData(treelikeData, filterFunc)).toEqual(expectedResult)
  })

  test('filterTreeData with subs', () => {
    const treelikeDataWithSubs: TreelikeDataItem[] = [
      { id: '1' },
      { id: '2', hasPermission: true },
      {
        id: '3',
        hasPermission: true,
        subs: [{ id: '3-1', hasPermission: true }],
      },
    ]

    const expectedResultWithSubs: TreelikeDataItem[] = [
      { id: '2', hasPermission: true },
      {
        id: '3',
        hasPermission: true,
        subs: [{ id: '3-1', hasPermission: true }],
      },
    ]

    expect(
      filterTreeData(treelikeDataWithSubs, filterFunc, {
        childrenKeyName: 'subs',
      })
    ).toEqual(expectedResultWithSubs)
  })
})
