import { produce } from 'immer';
// @ts-ignore
import { set, get, cloneDeep } from 'lodash';

type NSType = number | string;

type TreelikeDataItem = {
  key?: NSType;
  [key: string]: any;
};

// 对树形数据做一些修改
function mapTreeData(
  treelikeData: TreelikeDataItem[],
  mapFunc: (item: TreelikeDataItem) => TreelikeDataItem,
  childrenKey: string = 'children'
): TreelikeDataItem[] {
  const recursiveMap = (data: Array<TreelikeDataItem>) => {
    return data.map(item => {
      const newItem = mapFunc(item);
      if (item[childrenKey] && Array.isArray(item[childrenKey])) {
        newItem[childrenKey] = recursiveMap(item[childrenKey]);
      }
      return newItem;
    });
  };

  return recursiveMap(treelikeData);
}

// 查找嵌套数组中的 key
function findKeyPath(
  treelikeData: TreelikeDataItem[],
  targetKey: NSType,
  childrenKey: string = 'children'
): Array<NSType> {
  const recursiveSearch = (_treelikeData: TreelikeDataItem[] = []) => {
    let path: Array<NSType> = [];
    const hasKey = _treelikeData.some((dataItem, index) => {
      if (dataItem.key === targetKey) {
        path.push(index);
        return true;
      }
      if (Array.isArray(dataItem[childrenKey])) {
        path.push(index, childrenKey);
        const searchResult = recursiveSearch(
          dataItem[childrenKey] as TreelikeDataItem[]
        );
        if (searchResult.hasKey) {
          path = [...path, ...searchResult.path];
        } else {
          path.pop(); // 移除 'childrenKey'
          path.pop(); // 移除 index
        }
        return searchResult.hasKey;
      }
      return false;
    });
    return { hasKey, path };
  };

  const searchResult = recursiveSearch(treelikeData);
  return searchResult.path;
}

// 根据 key 查找数据
function findData(
  treelikeData: TreelikeDataItem[],
  targetKey: NSType,
  childrenKey: string = 'children'
): TreelikeDataItem | null {
  const path = findKeyPath(treelikeData, targetKey, childrenKey);
  return get(treelikeData, path);
}

// 根据 key 查找父节点(并非父数组)
function findParentData(
  treelikeData: TreelikeDataItem[],
  targetKey: NSType,
  childrenKey: string = 'children'
): TreelikeDataItem | null {
  const path = findKeyPath(treelikeData, targetKey, childrenKey);
  const parentPath = path.slice(0, -2);
  if (parentPath.length === 0) return null;
  return get(treelikeData, parentPath);
}

// findSearchData
function findSearchData(
  treelikeData: TreelikeDataItem[],
  searchKey: string,
  { childrenKey = 'children', searchField = 'title' } = {}
): TreelikeDataItem[] {
  let result = [];
  let i = 0;

  while (i < treelikeData.length) {
    const item = treelikeData[i];
    // 如果当前节点的title包含searchKey
    if (item[searchField].includes(searchKey)) {
      // 直接将当前节点加入到结果中
      result.push(item);
    } else if (item[childrenKey] && item[childrenKey].length > 0) {
      // 否则，如果当前节点有子节点，就在子节点中进行深度搜索
      let childrenResult: TreelikeDataItem[] = findSearchData(
        item[childrenKey],
        searchKey,
        {
          childrenKey,
          searchField,
        }
      );
      if (childrenResult.length > 0) {
        // 如果在子节点中找到了包含searchKey的节点，那么就将当前节点（包括找到的子节点）加入到结果中
        result.push({ ...item, [childrenKey]: childrenResult });
      }
    }
    i++;
  }

  return result;
}

// 向树形数据中添加叶子节点
function addData(
  treelikeData: TreelikeDataItem[],
  parentKey: NSType,
  data: TreelikeDataItem | TreelikeDataItem[],
  childrenKey: string = 'children'
): TreelikeDataItem[] {
  const path = findKeyPath(treelikeData, parentKey, childrenKey);
  return produce(treelikeData, draft => {
    let target: TreelikeDataItem = draft;
    let i = 0;
    while (i < path.length) {
      target = target[path[i]];
      i++;
    }
    if (target) {
      if (!target[childrenKey]) target[childrenKey] = [];
      if (Array.isArray(data)) {
        target[childrenKey].push(...data);
      } else {
        target[childrenKey].push(data);
      }
    }
  });
}

// 删除树形数据中的节点
function deleteData(
  treelikeData: TreelikeDataItem[],
  targetKey: NSType,
  { deleteEmptyParent = false, childrenKey = 'children' } = {}
): TreelikeDataItem[] {
  const path = findKeyPath(treelikeData, targetKey, childrenKey);
  const parentPath = path.slice(0, -1);
  return produce(treelikeData, draft => {
    let i = 0;
    let target: TreelikeDataItem = draft;
    while (i < parentPath.length) {
      target = target[parentPath[i]];
      i++;
    }
    if (target) {
      if (parentPath.length) {
        target = target.filter(
          (item: TreelikeDataItem) => item.key !== targetKey
        );
        set(draft, parentPath, target);
        if (deleteEmptyParent && target.length === 0) {
          // 删除空的父节点
          const upPath = parentPath.slice(0, -1);
          const upTarget = get(draft, upPath);
          if (upTarget.children.length === 0) {
            delete upTarget.children;
            set(draft, upPath, upTarget);
          }
        }
      } else {
        // 最上层，直接删除
        draft.splice(
          draft.findIndex((item: TreelikeDataItem) => item.key === targetKey),
          1
        );
      }
    }
  });
}

// 更新树形数据中的节点
function updateData(
  treelikeData: TreelikeDataItem[],
  targetKey: NSType,
  data: TreelikeDataItem | ((item: TreelikeDataItem) => TreelikeDataItem),
  childrenKey: string = 'children'
): TreelikeDataItem[] {
  const path = findKeyPath(treelikeData, targetKey, childrenKey);
  return produce(treelikeData, draft => {
    let target: TreelikeDataItem = draft;
    let i = 0;
    while (i < path.length) {
      target = target[path[i]];
      i++;
    }
    if (target) {
      if (typeof data === 'function') {
        target = data(target);
      } else {
        target = data;
      }
      set(draft, path, target);
    }
  });
}

function updateThroughData(
  treelikeData: TreelikeDataItem[],
  targetKey: NSType,
  iteratee: (item: TreelikeDataItem) => TreelikeDataItem,
  { childrenKey = 'children', includeSelf = false } = {}
): TreelikeDataItem[] {
  const newTreelikeData = cloneDeep(treelikeData);
  const path = findKeyPath(treelikeData, targetKey, childrenKey);
  let curr = newTreelikeData;
  for (let index = 0; index < path.length; index++) {
    const key = path[index];
    if (!includeSelf && index === path.length - 1) {
      break;
    }
    if (key !== childrenKey) {
      curr[key] = iteratee(curr[key]);
    }
    curr = curr[key];
  }
  return newTreelikeData;
}

//获取树形数据中的某个字段的值的集合
function getFieldValues(
  treelikeData: TreelikeDataItem[],
  field: string | ((item: TreelikeDataItem) => any),
  childrenKey: string = 'children'
): Array<any> {
  let values: Array<any> = [];

  function recursiveGet(data: TreelikeDataItem[]) {
    data.forEach(item => {
      const value = typeof field === 'function' ? field(item) : item[field];
      values.push(value);
      if (item[childrenKey] && item[childrenKey].length > 0) {
        recursiveGet(item[childrenKey]);
      }
    });
  }

  recursiveGet(treelikeData);

  return values;
}
// 获取树形数据中的某个字段的值的Set（去重）
function getFieldValueSet(
  treelikeData: TreelikeDataItem[],
  field: string | ((item: TreelikeDataItem) => any),
  childrenKey: string = 'children'
): Set<any> {
  let values: Set<any> = new Set();

  function recursiveGet(data: TreelikeDataItem[]) {
    data.forEach(item => {
      const value = typeof field === 'function' ? field(item) : item[field];
      values.add(value);
      if (item[childrenKey] && item[childrenKey].length > 0) {
        recursiveGet(item[childrenKey]);
      }
    });
  }

  recursiveGet(treelikeData);

  return values;
}

// 计算叶子节点数量
function calculateLeafCount(
  treelikeData: Array<TreelikeDataItem>,
  childrenKey: string = 'children'
): number {
  let count = 0;

  for (let i = 0; i < treelikeData.length; i++) {
    const node = treelikeData[i];

    if (node[childrenKey] && Array.isArray(node[childrenKey])) {
      count += calculateLeafCount(node[childrenKey]);
    } else {
      count += 1;
    }
  }

  return count;
}

// 计算树形数据的深度
const countNestedLayers = (
  treelikeData: TreelikeDataItem[],
  childrenKey = 'children'
): number => {
  let maxDepth = 0;
  let i = 0;
  while (i < treelikeData.length) {
    let depth = 1;
    let item = treelikeData[i];
    if (item[childrenKey] && item[childrenKey].length > 0) {
      depth += countNestedLayers(item[childrenKey]);
    }
    maxDepth = Math.max(maxDepth, depth);
    i++;
  }
  return maxDepth;
};

export {
  mapTreeData,
  findKeyPath,
  findData,
  findParentData,
  findSearchData,
  addData,
  deleteData,
  updateData,
  updateThroughData,
  getFieldValues,
  getFieldValueSet,
  calculateLeafCount,
  countNestedLayers,
};
