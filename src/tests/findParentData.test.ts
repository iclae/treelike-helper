import treeData from './treeData';
import { findParentData } from '../index';

test('test findParentData', () => {
  expect(findParentData(treeData, '2')).toBe(null);
  expect(findParentData(treeData, '2-2')?.key).toBe('2');
  expect(findParentData(treeData, '2-2-1')?.key).toBe('2-2');
  expect(findParentData(treeData, '2-1-3-2-1')?.key).toBe('2-1-3-2');
});
