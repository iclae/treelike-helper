import { deleteData } from '../index';

const treeData = [
  { key: 1 },
  { key: 2, children: [{ key: 22, children: [{ key: 33 }] }] },
];

test('test deleteData', () => {
  expect(deleteData(treeData, 2)).toEqual([{ key: 1 }]);

  expect(deleteData(treeData, 22)).toEqual([
    { key: 1 },
    { key: 2, children: [] },
  ]);

  expect(deleteData(treeData, 22, { deleteEmptyParent: true })).toEqual([
    { key: 1 },
    { key: 2 },
  ]);

  expect(deleteData(treeData, 33, { deleteEmptyParent: true })).toEqual([
    { key: 1 },
    { key: 2, children: [{ key: 22 }] },
  ]);
});
