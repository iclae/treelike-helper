import treeData from './treeData';
import { findData } from '../index';

test('test findData', () => {
  expect(findData(treeData, '2-1-3-2-1')).toEqual({
    key: '2-1-3-2-1',
    title: '2-1-3-2-1',
  });
});
