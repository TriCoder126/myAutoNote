class Heap {
  constructor() {
    this._arrayHeap = [];
    this._cap = 0;
  }

  size() {
    return this._arrayHeap.length;
  }

  _getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  _leftChildIndex(index) {
    return (index * 2) + 1;
  }

  _rightChildIndex(index) {
    return (index * 2) + 2;
  }

  _leftChild(index) {
    return this._arrayHeap[this._leftChildIndex(index)];
  }

  _rightChild(index) {
    return this._arrayHeap[this._rightChildIndex(index)];
  }

  _swim(index) {
    let done = false;
    while (index > 0 && !done) {
      let parentIndex = this._getParentIndex(index);
      let current     = this._arrayHeap[index];
      let parent      = this._arrayHeap[parentIndex];
      if (current < parent) {
        this._swap(parentIndex, index);
        index = parentIndex
      }
      else {
        done = true;
      }
    }
  }

  _sink(index) {
    let current = this._arrayHeap[index];
    if (this._rightChildIndex(index) < this._cap) {
      let left    = this._leftChildIndex(index);
      let right   = this._rightChildIndex(index);
      let smallerChild, smallerIndex;
      if (this._arrayHeap[left] < this._arrayHeap[right]) {
        smallerChild = this._arrayHeap[left];
        smallerIndex = left;
      } else {
        smallerChild = this._arrayHeap[right];
        smallerIndex = right;
      }
      if (current > smallerChild) {
        this._swap(index, smallerIndex);
        this._sink(smallerIndex);
      }
    } else if (this._leftChildIndex(index) < this._cap) {
      if (current > this._leftChild(index)) {
        let leftIndex = this._leftChildIndex(index);
        this._swap(index, leftIndex);
        this._sink(leftIndex);
      }
    }
  }

  _swap(i, j) {
    const temp = this._arrayHeap[i];
    this._arrayHeap[i] = this._arrayHeap[j];
    this._arrayHeap[j] = temp;
  }

  insert(element) {
    this._arrayHeap.push(element);
    this._cap += 1;
    this._swim(this._cap - 1);
  }

  extractMin() {
    this._swap(0, this._cap - 1);
    this._cap -= 1;
    const element = this._arrayHeap.pop();
    this._sink(0);
    return element;
  }
}

// heap = new Heap();
// heap.insert(5);
// heap.insert(3);
// heap.insert(2);
// heap.insert(8);
// while (heap._arrayHeap.length != 0) {
//   console.log(heap._arrayHeap);
//   console.log('result:  ' + heap.extractMin());
// }


_heap = new Heap();

class Node {
  constructor (frequency) {
    this.freq = frequency;
  }

  valueOf() {
    return this.freq;
  }
}

class InternalNode extends Node {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
    this.freq = left.freq + right.freq;
  }
}

class LeafNode extends Node {
  constructor(character, frequency) {
    super(frequency);
    this.char = character;
  }

}

function parseText(text) {
  result = {};
  for (let c of text) {
    if (c in result)
      result[c] += 1;
    else
      result[c] = 1;
  }
  return result;
}


function constructCodeTree(frequencyMap) {
  for (let character in frequencyMap) {
    if (frequencyMap.hasOwnProperty(character)) {
      _heap.insert(new LeafNode(character, frequencyMap[character]));
    }
  }
  while (_heap.size() > 1) {
    let node1 = _heap.extractMin();
    let node2 = _heap.extractMin();
    let newNode;
    if (node1 < node2) {
      newNode = new InternalNode(node1, node2);
    } else {
      newNode = new InternalNode(node2, node1);
    }
    _heap.insert(newNode);
  }
  return _heap.extractMin();
}

function encodeText(tree, text) {
  let encodingMap = {};
  let result = "";
  function fillMap(treeNode, path) {
    if (treeNode instanceof LeafNode) {
      encodingMap[treeNode.char] = path;
    } else {
      fillMap(treeNode.left, path + "0");
      fillMap(treeNode.right, path + "1");
    }
  }
  fillMap(tree,"");
  for (let char of text) {
    result += encodingMap[char];
  }
  return result;
}

function serialize(enc, enc_tree) {
  let extra = "";
  extra = (7 - ((3 + enc.length + enc_tree.length) % 8)).toString(2);
  console.log('extra-' + extra);
  for (var i = 0; i < 3 - extra.length; i++) {
    extra = '0' + extra;
  }
  
  binaryString = _bufferRightWithZeros(enc_tree + extra + enc);
  let front = 0;
  let back = 8;
  let result = "";
  console.log("serialize: " + binaryString);
  while (back <= binaryString.length) {
    result += String.fromCharCode(parseInt(binaryString.slice(front,back),2));
    front += 8;
    back += 8;
  }
  console.log(result);
  return result;
}

function _bufferWithZeros(str) {
  let len = str.length;
  for (let j = 0; j < 8 - len; j++)
    str = '0' + str;
  return str;
}

function _bufferRightWithZeros(str) { // align eight byte boundary
  let len = str.length;
  for (let i = 0; i < 8 - (len % 8); i++)
    str += '0';
  return str;
}

function decodeText(treeCursor, path) {
  //console.log("path" + path);
  //let path = "";
  let result = "";
  const extra = parseInt(path.substring(0, 3), 2);
  console.log('extra' + extra);
  const root = treeCursor;
  let i = 3;
  while ( i <=  path.length - extra) {
    if (treeCursor instanceof LeafNode) {
      result += treeCursor.char;
      treeCursor = root;
    }
    if (path.charAt(i) == 0) {
      treeCursor = treeCursor.left;
      i++;
    } else {
      treeCursor = treeCursor.right;
      i++;
    }
  }
  return result;
}

function serializeTree(tree) {
  result = "";
  function serializeTreeH(tree) {
    if (tree instanceof LeafNode) {
      result += '1';
      let code = tree.char.charCodeAt(0).toString(2);
      result += _bufferWithZeros(code);
    } else {
      result += '0';
      serializeTreeH(tree.left);
      serializeTreeH(tree.right);
    }
  }
  serializeTreeH(tree);
  return result;
}

function toBin(text) {
  let bin = "";
  let code = "";
  for (let char of text) {
    code = char.charCodeAt(0).toString(2);
    code = _bufferWithZeros(code);
    bin += code;
  }
  return bin;
}

function deserializeTree(path) {
  let result = "";
  let pos = 0;
  function deserializeTreeH() {
    if (path.charAt(pos++) == 0) {
      let left = deserializeTreeH();
      let right = deserializeTreeH();
      return new InternalNode(left, right, 0);
    } else {
      //console.log(String.fromCharCode(parseInt(path.slice(pos, pos + 8),2)));
      const tmp = new LeafNode(String.fromCharCode(parseInt(path.slice(pos, pos + 8),2)), 0);
      pos += 8;
      return tmp;
    }
  }
  return [deserializeTreeH(), pos];
}

function packText(text) {
  let obj = parseText(text);
  let tree = constructCodeTree(obj);
  console.log(JSON.stringify(tree));
  let enc = encodeText(tree, text);
  let enc_tree = serializeTree(tree);
  let ser = serialize(enc, enc_tree);
  console.log(ser.length);
  return ser;
}

function unpackText(stream) {
  const bin = toBin(stream);
  //console.log(bin);
  const res = deserializeTree(bin);
  console.log(JSON.stringify(res[0]));	
  const tree = res[0];
  console.log(bin.substring(res[1]));
  console.log("hello" + res[1]);
  return decodeText(tree, bin.substring(res[1] ));
}
/*
let text = "How to prepare a peanut butter and jelly sandwich?`Preparation`Pull two slices of bread out of the package`Lay the slices down adjacent to each other `Get the peanut butter and jelly out of the fridge`Open both jars`Take a knife out of your utensil drawerAssembly`Jelly````Scoop up a small mound of jelly from the jelly jar``Scrape the mound onto the left-most slice of bread and spread it around evenly`Peanut Putter````Scoop up a small mound of peanut putter from the peanut butter jar``Scrape the mound onto the right-most slice of bread and spread it around evenly`Bread````Carefully pick up one slice of bread only holding the sides``Flip it over and place it onto the other sliceClean Up`Clean up your work surface by screwing the lids back onto the jars and washing the knifeNow you can eat your sandwich!!!`VocabularyUtensil- an implement, container, or other article, especially for household use.Slice-a small cross-section of bread"

console.log("input: " + text);
let obj = parseText(text);
console.log("frequencies: " + JSON.stringify(obj));
let dat_tree = constructCodeTree(obj);
console.log("tree: " + JSON.stringify(dat_tree));

let enc = encodeText(dat_tree, text);
console.log("encoded: " + enc);
let ser = serialize(enc);
console.log("serialized: " + ser);
let dat_ser_tree = serializeTree(dat_tree);
console.log("serialized tree: " + dat_ser_tree);
let full_encoding = dat_ser_tree + ser;
console.log(full_encoding);
let dat_out_tree = deserializeTree(full_encoding);
console.log("output_tree: " + JSON.stringify(dat_out_tree));
let dec = decodeText(dat_out_tree, ser);
console.log("output: " + dec);
console.log((1 - full_encoding.length / text.length) * 100 + "% reduction");
*/
let text = "@Jay when comparing objects for equality (==, ===), it will always compare references (whether the 2 operands point to the same exact object in memory). You need to define method like .isEqual and call it normally a.isEqual(b)";
let bin = packText(text);
//console.log(bin);
console.log(unpackText(bin))