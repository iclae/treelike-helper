import { mapTreeData } from '../index';

test('test mapTreeData', () => {
  expect(
    mapTreeData(
      [
        { id: '1', title: '1' },
        { id: '2', title: '2', children: [{ id: '2-1', title: '2-1' }] },
      ],
      item => {
        return {
          ...item,
          name: item.title,
          key: item.id,
        };
      }
    )
  ).toEqual([
    { id: '1', title: '1', name: '1', key: '1' },
    {
      id: '2',
      title: '2',
      name: '2',
      key: '2',
      children: [{ id: '2-1', title: '2-1', name: '2-1', key: '2-1' }],
    },
  ]);
});
