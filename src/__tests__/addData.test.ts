import { addData } from '../index'

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

describe('addData', () => {
  test('unsearch parentKey', () => {
    expect(addData([{ key: '1' }], '', { key: '2' })).toEqual([{ key: '1' }])
    expect(addData([], '1', { key: '1' })).toEqual([])
    expect(addData([{ key: '1' }], '2', { key: '2' })).toEqual([{ key: '1' }])
  })

  test('add data', () => {
    const newTreeData = addData(treeData, '2-1-3-2', {
      key: '2-1-3-2-4',
      title: 'add leaf',
    })
    expect(
      newTreeData[1].children[0].children[2].children[1].children[3]
    ).toEqual({
      key: '2-1-3-2-4',
      title: 'add leaf',
    })
    expect(
      treeData[1].children[0].children[2].children[1].children.length
    ).toBe(3)
  })

  test('add data with array', () => {
    const newTreeData = addData(treeData, '2-1-3-2', [
      { key: '2-1-3-2-4', title: 'add leaf' },
      { key: '2-1-3-2-5', title: 'add leaf' },
    ])
    expect(
      newTreeData[1].children[0].children[2].children[1].children[3]
    ).toEqual({
      key: '2-1-3-2-4',
      title: 'add leaf',
    })
    expect(
      newTreeData[1].children[0].children[2].children[1].children[4]
    ).toEqual({
      key: '2-1-3-2-5',
      title: 'add leaf',
    })
    expect(
      treeData[1].children[0].children[2].children[1].children.length
    ).toBe(3)
  })

  test('add data with no children', () => {
    const treeData = [
      { key: '1' },
      { key: '2', children: [{ key: '2-1' }] },
    ] as any[]

    expect(addData(treeData, '1', { key: '1-1' })).toEqual([
      { key: '1', children: [{ key: '1-1' }] },
      { key: '2', children: [{ key: '2-1' }] },
    ])
    expect(addData(treeData, '2-1', { key: '2-1-1' })).toEqual([
      { key: '1' },
      { key: '2', children: [{ key: '2-1', children: [{ key: '2-1-1' }] }] },
    ])
    expect(treeData[1].children[0].children).toBeUndefined()
  })

  test('add data with options', () => {
    const treeData = [
      { id: '1', subs: [{ id: '2' }] },
      { id: '3', subs: [{ id: '4' }] },
    ]

    const newTreeData = addData(
      treeData,
      '2',
      { id: '5', title: 'add leaf' },
      {
        childrenKeyName: 'subs',
        keyName: 'id',
      }
    )

    expect(newTreeData).toEqual([
      { id: '1', subs: [{ id: '2', subs: [{ id: '5', title: 'add leaf' }] }] },
      { id: '3', subs: [{ id: '4' }] },
    ])
  })
})
