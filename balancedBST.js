class Node {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    // this.array = array;
    this.cleanArray = this.cleanArray(array);
    this.end = this.cleanArray.length - 1;
    this.root = this.buildTree(this.cleanArray, 0, this.end);
  }

  // sort and remove duplicate from the array
  cleanArray(array) {
    // remove duplicate
    let uniqueArray = [...new Set(array)];
    // sort the array
    let sortedArray = uniqueArray.sort((a, b) => a - b);
    return sortedArray;
  }

  // build the ballanced binary tree
  buildTree(array, start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  insert(key) {
    this.root = this.insertValue(this.root, key);
  }

  insertValue(root, key) {
    if (root == null) {
      root = new Node(key);
      return root;
    }

    if (key > root.data) {
      root.right = this.insertValue(root.right, key);
    } else if (key < root.data) {
      root.left = this.insertValue(root.left, key);
    }

    return root;
  }
}

// visualize binary search tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let tree = new Tree(arr);
prettyPrint(tree.root);
console.log("Insert 6 into the tree:");
tree.insert(5);

prettyPrint(tree.root);
