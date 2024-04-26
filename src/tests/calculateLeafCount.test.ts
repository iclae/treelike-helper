import { calculateLeafCount } from '../index'

test('calculateLeafCount should return the correct count', () => {
  const treelikeData = [
    { key: '1', children: [{ key: '1-1', children: [{ key: '1-1-1' }] }] },
    { key: '2', children: [{ key: '2-1' }, { key: '2-2' }] },
    { key: '3' },
  ]

  const count = calculateLeafCount(treelikeData)

  expect(count).toBe(4)
})

test('calculateLeafCount should handle empty treelikeData', () => {
  const treelikeData: any[] = []

  const count = calculateLeafCount(treelikeData)

  expect(count).toBe(0)
})

test('calculateLeafCount should handle treelikeData with no children', () => {
  const treelikeData = [{ key: '1' }, { key: '2' }, { key: '3' }]

  const count = calculateLeafCount(treelikeData)

  expect(count).toBe(3)
})

test('caculateLeafCount should handle treelikeData with empty children', () => {
  const treelikeData = [
    { key: '1', children: [{ key: '1-1' }, { key: '1-2' }] },
    { key: '2', children: [] },
    {
      key: '3',
      children: [
        {
          key: '3-1',
          children: [
            { key: '3-1-1' },
            { key: '3-1-2' },
            { key: '3-1-3', children: [] },
          ],
        },
      ],
    },
  ]

  const count = calculateLeafCount(treelikeData)

  expect(count).toBe(6)
})
