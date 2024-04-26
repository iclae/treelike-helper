import treeData from './treeData';
import { findData } from '../index';

test('test findData', () => {
  expect(findData(treeData, '2-1-3-2-1')).toEqual({
    key: '2-1-3-2-1',
    title: '2-1-3-2-1',
  });
});

test('test findData with null result', () => {
  expect(findData(treeData, 'non-existent-key')).toBeNull();
});

test('test findData with custom options', () => {
  const customOptions = {
    childrenKeyName: 'children',
    keyName: 'id',
  };
  expect(findData(treeData, '3', customOptions)).toBeNull();
});