import treeData from './treeData';
import { findKeyPath } from '../index';

test('test findKeyPath', () => {
  // layer 1
  expect(findKeyPath(treeData, '1')).toEqual([0]);
  // layer 2
  expect(findKeyPath(treeData, '2-1')).toEqual([1, 'children', 0]);
  // layer 3
  expect(findKeyPath(treeData, '2-3-1')).toEqual([
    1,
    'children',
    2,
    'children',
    0,
  ]);
  // layer deep
  expect(findKeyPath(treeData, '2-1-3-2-2')).toEqual([
    1,
    'children',
    0,
    'children',
    2,
    'children',
    1,
    'children',
    1,
  ]);
});
