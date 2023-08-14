import treeData from './treeData';
import { calculateLeafCount } from '../index';

test('test calculateLeafCount', () => {
  expect(calculateLeafCount(treeData)).toEqual(10);
});
