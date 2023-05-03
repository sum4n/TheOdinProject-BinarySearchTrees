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

  // insert node
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
    // if rood.data == key, return root
    return root;
  }

  // delete node
  delete(key) {
    this.root = this.deleteValue(this.root, key);
  }

  deleteValue(root, key) {
    if (root == null) return root;

    if (key > root.data) {
      root.right = this.deleteValue(root.right, key);
    } else if (key < root.data) {
      root.left = this.deleteValue(root.left, key);
    } else {
      // if key == root.data, this root will get deleted
      // node with only 1 child or no child
      if (root.left == null) {
        return root.right;
      } else if (root.right == null) {
        return root.left;
      }

      // get the smallest value in the right subtree
      // for node with two children
      root.data = this.minValue(root.right);

      // delete the minValue
      root.right = this.deleteValue(root.right, root.data);
    }

    return root;
  }

  minValue(root) {
    let minv = root.data;
    while (root.left != null) {
      minv = root.left.data;
      root = root.left;
    }
    return minv;
  }

  // find node
  find(key) {
    let result = this.findValue(this.root, key);
    if (result != null && result.data == key) {
      return result;
    } else {
      return `${key} not found in the tree.`;
    }
  }

  findValue(root, key) {
    if (root == null || root.data == key) return root;

    if (key > root.data) {
      return this.findValue(root.right, key);
    } else if (key < root.data) {
      return this.findValue(root.left, key);
    }
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
tree.insert(6);
prettyPrint(tree.root);

console.log("Delete 4 from the tree:");
tree.delete(4);
prettyPrint(tree.root);

console.log(tree.find(7));
console.log(tree.find(321));
