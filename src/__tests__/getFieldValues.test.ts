import { getFieldValues, getFieldValueSet } from '../index'

const treeData = [
  { key: '1', title: '1' },
  { key: '1.1', title: '1' },
  {
    key: '2',
    title: '2',
    children: [
      { key: '2-1', title: '2-1', expand: true },
      {
        key: '2-2',
        title: '2-2',
        children: [{ key: '2-2-1', title: '2-2-1', expand: true }],
      },
      { key: '2-2-2', title: '2-2-2' },
    ],
  },
]

describe('getFieldValues', () => {
  test('getFieldValues', () => {
    expect(getFieldValues(treeData, 'key')).toEqual([
      '1',
      '1.1',
      '2',
      '2-1',
      '2-2',
      '2-2-1',
      '2-2-2',
    ])
    expect(getFieldValues(treeData, item => item.title)).toEqual([
      '1',
      '1',
      '2',
      '2-1',
      '2-2',
      '2-2-1',
      '2-2-2',
    ])
    expect(
      getFieldValues(treeData, item => {
        if (item.expand) {
          return item
        } else {
          return null
        }
      }).filter(item => !!item)
    ).toEqual([
      { key: '2-1', title: '2-1', expand: true },
      { key: '2-2-1', title: '2-2-1', expand: true },
    ])
  })
})

describe('getFieldValueSet', () => {
  test('getFieldValueSet', () => {
    expect(getFieldValueSet(treeData, 'key')).toEqual(
      new Set(['1', '1.1', '2', '2-1', '2-2', '2-2-1', '2-2-2'])
    )
    expect(getFieldValueSet(treeData, item => item.title)).toEqual(
      new Set(['1', '2', '2-1', '2-2', '2-2-1', '2-2-2'])
    )
  })
})
