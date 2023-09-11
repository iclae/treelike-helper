# treelike-helper

[![NPM version](https://img.shields.io/npm/v/treelike-helper.svg?style=flat)](https://npmjs.org/package/treelike-helper)
[![NPM downloads](http://img.shields.io/npm/dm/treelike-helper.svg?style=flat)](https://npmjs.org/package/treelike-helper)

## API

#### mapTreeData

**param**: 

1. treelikeData(Array): treelike data
2. mapFunc(iteratee): item => item
3. [childrenKey='children'] (string): childrenKey, default 'children'

**return**:

treelikeData(Array): treelike data

**eg**:

```js
const treeData = [
  { id: '1', title: '1' },
  { id: '2', title: '2', children: [{ id: '2-1', title: '2-1' }] },
]
mapTreeData(treeData, item => {
  return {
    ...item,
    name: item.title,
    key: item.id,
  };
});
=> 
[
  { id: '1', title: '1', key: '1', name: '1' },
  {
    id: '2',
    title: '2',
    key: '2',
    name: '2',
    children: [{ id: '2-1', title: '2-1', key: '2-1', name: '2-1' }],
  },
]
```

---

#### filterTreeData

**param**: 

1. treelikeData(Array): treelike data
2. filterFunc(iteratee): item => item
3. [childrenKey='children'] (string): childrenKey, default 'children'

**return**:

treelikeData(Array): treelike data

**eg**:

```js
const treeData = [
  { id: '1', title: '1', hasPermission: true },
  { id: '2', title: '2' },
  {
    id: '3',
    title: '3',
    hasPermission: true,
    children: [
      { id: '3-1', title: '3-1' },
      { id: '3-2', title: '3-2', hasPermission: true },
      { id: '3-3', title: '3-3', hasPermission: false },
    ],
  },
]
filterTreeData(treeData, item => !!item.hasPermission);
=> 
[
  { id: '1', title: '1', hasPermission: true },
  {
    id: '3',
    title: '3',
    hasPermission: true,
    children: [{ id: '3-2', title: '3-2', hasPermission: true }],
  },
]
```



---

#### mapFilterTreeData

**param**: 

1. treelikeData(Array): treelike data
2. filterFunc(iteratee): item => item
3. mapFunc(iteratee): item => item
4. [childrenKey='children'] (string): childrenKey, default 'children'

**return**:

treelikeData(Array): treelike data

**eg**:

```js
const treeData = [
  { id: '1', title: '1', hasPermission: true },
  { id: '2', title: '2' },
  {
    id: '3',
    title: '3',
    hasPermission: true,
    children: [
      { id: '3-1', title: '3-1' },
      { id: '3-2', title: '3-2', hasPermission: true },
      { id: '3-3', title: '3-3', hasPermission: false },
    ],
  },
]
mapFilterTreeData(treeData, item => !!item.hasPermission), item => ({ ...item, subTitle: 'already filter data' });
=> 
[
  {
    id: '1',
    title: '1',
    hasPermission: true,
    subTitle: 'already filter data',
  },
  {
    id: '3',
    title: '3',
    hasPermission: true,
    subTitle: 'already filter data',
    children: [
      {
        id: '3-2',
        title: '3-2',
        hasPermission: true,
        subTitle: 'already filter data',
      },
    ],
  },
]
```

---

#### findKeyPath

**param**: 

1. treelikeData(Array): treelike data
2. targetKey(string): to find key
3. [childrenKey='children'] (string): childrenKey, default 'children'

**return**:

path(Array): key path

**eg**:

`findKeyPath([{ key: '1', children: [{ key: '1-1' }] }], '1-1')`

=> ['0', 'children', '0']

---

#### findData

**param**: 

1. treelikeData(Array): treelike data
2. targetKey(string): to find key
3. [childrenKey='children'] (string): childrenKey, default 'children'

**return**:

data: tree node item

**eg**: 

`findData([{ key: '1', children: [{ key: '1-1' }] }], '1-1')`

=> { key: '1-1' }

---

#### findParentData

**param**: 

1. treelikeData(Array): treelike data
2. targetKey(string): to find key
3. [childrenKey='children'] (string): childrenKey, default 'children'

**return**:

data (Object | null): parent data

**eg**:

```js
const treeData = [
  {
    key: '1',
    title: '1',
    children: [
      {
        key: '1-1',
        title: '1-1',
        children: [{ key: '1-1-1', title: '1-1-1' }],
      },
    ],
  },
];
findParentData(treeData, '1'); // => null
findParentData(treeData, '1-1').title; // => '1'
findParentData(treeData, '1-1-1').key; // => '1-1'
```

---

#### findSearchData

**param**: 

1. treelikeData(Array): treelike data
2. search(string): to search
3. [options={}] (Object): option
4. [options.childrenKey = 'children'] (string) : childrenKey, default 'children'
5. [options.searchField = 'title'] (string) : title or name or key or other

**return**:

newSearchTreelikeData(Array): treelike data

**eg**:

```js
const treeData = [
  { key: '1', title: 'layer1' },
  {
    key: '2',
    title: '2',
    children: [
      { key: '2-1', title: '2-1' },
      {
        key: '2-2',
        title: '2-2',
        children: [{ key: '2-2-1', title: '2-2-1' }],
      },
      {
        key: '2-2-2',
        title: '2-2-2',
      },
    ],
  },
];
findSearchData(treeData, 'lay')
// [
//   { key: '1', title: 'layer1' },
// ]
findSearchData(treeData, '2-2-1')
// [
//   {
//     key: '2',
//     title: '2',
//     children: [
//       {
//         key: '2-2',
//         title: '2-2',
//         children: [{ key: '2-2-1', title: '2-2-1' }],
//       },
//     ],
//   },
// ]
findSearchData(treeData, '2-2')
// [
//   {
//     key: '2',
//     title: '2',
//     children: [
//       {
//         key: '2-2',
//         title: '2-2',
//         children: [{ key: '2-2-1', title: '2-2-1' }],
//       },
//       {
//         key: '2-2-2',
//         title: '2-2-2',
//       },
//     ],
//   },
// ]
```



---

#### addData

**param**: 

1. treelikeData(Array): treelike data
2. parentKey(string|number): to add parentKey
3. data(Object | Array): to add data or dataArray
4. [childrenKey='children'] (string): childrenKey, default 'children'

**return**:

newTreelikeData(Array): treelike data

**eg**:

```js
const treeData = [
  { key: '1', children: [{ key: '1-1', children: [{ key: '1-1-1' }] }] },
];
const newTreeData = addData(treeData, '1-1', { key: '1-1-2' });
// newTreeData: [{ key: '1', children: [{ key: '1-1', children: [{ key: '1-1-1' }, { key: '1-1-2' }] }] }]
const newTreeData2 = addData(treeData, '1-1', [
  { key: '1-1-2' },
  { key: '1-1-3' },
]);
// newTreeData2: [{ key: '1', children: [{ key: '1-1', children: [{ key: '1-1-1' }, { key: '1-1-2' }, { key: '1-1-3' }] }] }]
```

---

#### deleteData

**param**: 

1. treelikeData(Array): treelike data
2. targetKey(string|number): to delete key
3. [options={}] (Object): option
4. [options.childrenKey = 'children'] (string) : childrenKey, default 'children'
5. [options.deleteEmptyParent = false] (boolean) : when parent array empty, should delete children

**return**:

newTreelikeData(Array): treelike data

**eg**:

```js
const treeData = [
  { key: 1 },
  { key: 2, children: [{ key: 22, children: [{ key: 33 }] }] },
];
deleteData(treeData, 2) // => [{ key: 1 }]
deleteData(treeData, 22, { deleteEmptyParent: true }) // => [{key:1}, {key:2}]
```

---

#### updateData

**param**: 

1. treelikeData(Array): treelike data
2. targetKey(string|number): to update key
3. data(Object | iteratee): to update data or updateFunc
4. [childrenKey='children'] (string): childrenKey, default 'children'

**return**:

newTreelikeData(Array): treelike data

**eg**:

```js
const treeData = [
  { key: '1', title: '1', children: [{ key: '1-1', title: '1-1' }] },
];
updateData(treeData, '1-1', { title: 'update 1-1' });
// or
updateData(treeData, '1-1', item => ({ ...item, title: 'update 1-1' }));
```

---

#### updateThroughData

**param**: 

1. treelikeData(Array): treelike data
2. targetKey(string|number): target key
3. iteratee(iteratee):  updateFunc
4. [options={}] (Object): option
5. [options.childrenKey = 'children'] (string) : childrenKey, default 'children'
6. [options.includeSelf = false] (boolean) :  this update should include target key item

**return**:

newTreelikeData(Array): treelike data

**eg**:

```js
const treeData = [
  { key: '1', children: [{ key: '1-1', children: [{ key: '1-1-1' }] }] },
];
const newTreeData1 = updateThroughData(treeData, '1-1-1', item => {
  return {
    ...item,
    title: item.key,
  };
});
treeData[0].title // undefined
newTreeData1[0].title // '1'
newTreeData1[0].children[0].title // '1-1'
newTreeData1[0].children[0].children[0].title // undefined
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
newTreeData2[0].children[0].children[0].title // '1-1-1'
```



---

#### getFieldValues

**param**: 

1. treelikeData(Array): treelike data
2. field(string|iteratee): to get field
3. [childrenKey='children'] (string): childrenKey, default 'children'

**return**

values(Array)

**eg**:

```js
const treeData = [
  { key: '1', title: '1' },
  { key: '1.1', title: '1' },
  {
    key: '2',
    title: '2',
    children: [
      { key: '2-1', title: '2-1', , expand: true },
      {
        key: '2-2',
        title: '2-2',
        children: [{ key: '2-2-1', title: '2-2-1', expand: true }],
      },
      { key: '2-2-2', title: '2-2-2' },
    ],
  },
];
getFieldValues(treeData, 'title') // ['1', '1','2', '2-1', '2-2', '2-2-1', '2-2-2']
getFieldValues(treeData, item => item.title) // ['1', '1','2', '2-1', '2-2', '2-2-1', '2-2-2']
getFieldValues(treeData, item => {
      if (item.expand) {
        return item;
      } else {
        return null;
      }
    }).filter(item => !!item) 
// => 
[
  { key: '2-1', title: '2-1', expand: true },
  { key: '2-2-1', title: '2-2-1', expand: true },
]
```

---

#### getFieldValueSet

**param**: 

1. treelikeData(Array): treelike data
2. field(string|iteratee): to get field
3. [childrenKey='children'] (string): childrenKey, default 'children'

**return**

values(Array)

**eg**:

```js
const treeData = [
  { key: '1', title: '1' },
  { key: '1.1', title: '1' },
  {
    key: '2',
    title: '2',
    children: [
      { key: '2-1', title: '2-1' },
      {
        key: '2-2',
        title: '2-2',
        children: [{ key: '2-2-1', title: '2-2-1' }],
      },
      { key: '2-2-2', title: '2-2-2' },
    ],
  },
];
getFieldValueSet(treeData, 'title') // new Set(['1', '2', '2-1', '2-2', '2-2-1', '2-2-2'])
getFieldValueSet(treeData, item => item.title) // new Set(['1', '2', '2-1', '2-2', '2-2-1', '2-2-2'])
```



---

#### calculateLeafCount

**param**: 

1. treelikeData(Array): treelike data
2. [childrenKey='children'] (string): childrenKey, default 'children'

**return**:

count(number): leaf count

**eg**:

```js
const treeData = [
  { key: '1', children: [{ key: '1-1' }, { key: '1-2' }] },
  { key: '2' },
  {
    key: '3',
    children: [
      {
        key: '3-1',
        children: [{ key: '3-1-1' }, { key: '3-1-2' }, { key: '3-1-3' }],
      },
    ],
  },
]

const count = calculateLeafCount(treeData)
// => 6
```

---

#### countNestedLayers

**param**: 

1. treelikeData(Array): treelike data
2. [childrenKey='children'] (string): childrenKey, default 'children'

**return**:

layer(number): data layer

**eg**:

```js
countNestedLayers([]) // 0
countNestedLayers([{ key: '1', title: '1' }]) // 1
countNestedLayers([{ key: '1', children: [{ key: '1-1' }] }]) // 2
```



## LICENSE

MIT
