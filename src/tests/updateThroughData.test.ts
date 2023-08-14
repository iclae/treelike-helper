import { updateThroughData } from '../index';

const treeData: any[] = [
  { key: '1', children: [{ key: '1-1', children: [{ key: '1-1-1' }] }] },
];

test('test updateThroughData', () => {
  const newTreeData1 = updateThroughData(treeData, '1-1-1', item => {
    return {
      ...item,
      title: item.key,
    };
  });
  expect(newTreeData1).toEqual([
    {
      key: '1',
      title: '1',
      children: [{ key: '1-1', title: '1-1', children: [{ key: '1-1-1' }] }],
    },
  ]);
  expect(treeData[0].title).not.toBe('1');
  expect(newTreeData1[0].title).toBe('1');
  expect(newTreeData1[0].children[0].title).toBe('1-1');
  expect(newTreeData1[0].children[0].children[0].title).not.toBe('1-1-1');

  const newTreeData2 = updateThroughData(
    treeData,
    '1-1-1',
    item => {
      return {
        ...item,
        title: item.key,
      };
    },
    { includeSelf: true }
  );
  expect(newTreeData2[0].children[0].children[0].title).toBe('1-1-1');
});
