import { deleteData } from '../index'

const treeData = [
  { key: 1 },
  { key: 2, children: [{ key: 22, children: [{ key: 33 }] }] },
]

test('test deleteData', () => {
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

test('test deleteData with empty treeData', () => {
  expect(deleteData([], 2)).toEqual([])

  expect(deleteData([], 22)).toEqual([])

  expect(deleteData([], 22, { deleteEmptyParent: true })).toEqual([])

  expect(deleteData([], 33, { deleteEmptyParent: true })).toEqual([])
})

test('test deleteData with non-existent targetKey', () => {
  expect(deleteData(treeData, 99)).toEqual(treeData)

  expect(deleteData(treeData, 99, { deleteEmptyParent: true })).toEqual(
    treeData
  )
})

test('test deleteData with deleteEmptyParent option', () => {
  const treeDataWithEmptyParent = [{ key: 1 }, { key: 2, children: [] }]

  expect(
    deleteData(treeDataWithEmptyParent, 2, { deleteEmptyParent: true })
  ).toEqual([{ key: 1 }])

  expect(
    deleteData(treeDataWithEmptyParent, 1, { deleteEmptyParent: true })
  ).toEqual([{ key: 2, children: [] }])
})
