import { deleteData } from '../index'

const treeData = [
  { key: 1 },
  { key: 2, children: [{ key: 22, children: [{ key: 33 }] }] },
]

describe('deleteData', () => {
  test('unsearch targetKey', () => {
    expect(deleteData([{ key: '1' }], '')).toEqual([{ key: '1' }])
    expect(deleteData([], '1')).toEqual([])
    expect(deleteData([{ key: '1' }], '2')).toEqual([{ key: '1' }])
  })

  test('delete Data', () => {
    expect(deleteData(treeData, 2)).toEqual([{ key: 1 }])

    expect(deleteData(treeData, 22)).toEqual([
      { key: 1 },
      { key: 2, children: [] },
    ])

    expect(deleteData(treeData, 22, { deleteEmptyParent: true })).toEqual([
      { key: 1 },
      { key: 2 },
    ])

    expect(deleteData(treeData, 33, { deleteEmptyParent: true })).toEqual([
      { key: 1 },
      { key: 2, children: [{ key: 22 }] },
    ])
  })
})
