import treeData from './treeData'
import { findParentData } from '../index'

describe('findParentData', () => {
  test('findParentData', () => {
    expect(findParentData(treeData, '2')).toBeUndefined()
    expect(findParentData(treeData, '2-2')?.key).toBe('2')
    expect(findParentData(treeData, '2-2-1')?.key).toBe('2-2')
    expect(findParentData(treeData, '2-1-3-2-1')?.key).toBe('2-1-3-2')
  })
})
