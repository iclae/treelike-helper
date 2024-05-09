import { countNestedLayers } from '../index'

describe('countNestedLayers', () => {
  test('countNestedLayers', () => {
    expect(countNestedLayers([])).toBe(0)
    expect(countNestedLayers([{ key: '1', title: '1' }])).toBe(1)
    expect(countNestedLayers([{ key: '1', children: [{ key: '1-1' }] }])).toBe(
      2
    )
    expect(
      countNestedLayers([
        { key: '1', children: [{ key: '1-1', children: [{ key: '1-1-1' }] }] },
      ])
    ).toBe(3)
    expect(
      countNestedLayers([
        {
          key: '1',
          children: [
            {
              key: '1-1',
              children: [
                {
                  key: '1-1-1',
                  children: [
                    {
                      key: '1-1-1-1',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ])
    ).toBe(4)
  })
})
