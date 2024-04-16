import treeData from './treeData'
import { addData } from '../index'

test('test addData', () => {
  const newTreeData = addData(treeData, '2-1-3-2', {
    key: '2-1-3-2-4',
    title: 'add leaf',
  })
  expect(
    newTreeData[1].children[0].children[2].children[1].children.length
  ).toBe(4)

  expect(treeData[1].children[0].children[2].children[1].children.length).toBe(
    3
  )

  expect(
    newTreeData[1].children[0].children[2].children[1].children[3]
  ).toEqual({
    key: '2-1-3-2-4',
    title: 'add leaf',
  })

  expect(newTreeData[0]).toBe(treeData[0])
  const newTreeData2 = addData(treeData, '2-1-3-2', [
    { key: '2-1-3-2-4', title: 'add leaf' },
    { key: '2-1-3-2-5', title: 'add leaf' },
  ])
  expect(
    newTreeData2[1].children[0].children[2].children[1].children.length
  ).toBe(5)

  const newTreeData3 = addData(
    [{ id: '1', subs: [{ id: '2' }] }],
    '2',
    { id: '3', title: 'add leaf' },
    {
      childrenKeyName: 'subs',
      keyName: 'id',
    }
  )
  expect(newTreeData3).toEqual([
    { id: '1', subs: [{ id: '2', subs: [{ id: '3', title: 'add leaf' }] }] },
  ])
})
