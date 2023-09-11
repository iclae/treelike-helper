import { filterTreeData } from '../index';

test('test filterTreeData', () => {
  expect(
    filterTreeData(
      [
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
      ],
      item => !!item.hasPermission
    )
  ).toEqual([
    { id: '1', title: '1', hasPermission: true },
    {
      id: '3',
      title: '3',
      hasPermission: true,
      children: [{ id: '3-2', title: '3-2', hasPermission: true }],
    },
  ]);
});
