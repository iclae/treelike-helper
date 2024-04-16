import treeData from './treeData'
import { findKeyPath } from '../index'

test('test findKeyPath', () => {
  // layer 1
  expect(findKeyPath(treeData, '1')).toEqual([0])
  // layer 2
  expect(findKeyPath(treeData, '2-1')).toEqual([1, 'children', 0])
  // layer 3
  expect(findKeyPath(treeData, '2-3-1')).toEqual([
    1,
    'children',
    2,
    'children',
    0,
  ])
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
  ])
  // other children key
  expect(
    findKeyPath([{ key: '1', subs: [{ key: '2' }] }], '2', {
      childrenKeyName: 'subs',
    })
  ).toEqual([0, 'subs', 0])
  // other target key
  expect(
    findKeyPath([{ id: '1', children: [{ id: '2' }] }], '2', {
      keyName: 'id',
    })
  ).toEqual([0, 'children', 0])
  // both
  expect(
    findKeyPath([{ id: '1', subs: [{ id: '2' }] }], '2', {
      keyName: 'id',
      childrenKeyName: 'subs',
    })
  ).toEqual([0, 'subs', 0])
})
