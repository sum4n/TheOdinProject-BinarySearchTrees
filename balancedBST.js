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

  // breadth first level order traversal of the tree
  // if callback, provide each node as arguement
  // if not, return array of values in level order traversal
  levelOrder(callback) {
    let root = this.root;
    // array to populate with node values
    let levelOrderArray = [];

    if (root == null) return;
    // queue for breadth first approach
    let queue = [];
    queue.push(root);

    while (queue.length != 0) {
      let current = queue[0];
      // console.log(queue[0].data);

      // if there is a callback, provide each node as argument.
      // if not populate the array to return it later.
      if (callback) {
        callback(current.data);
      } else {
        levelOrderArray.push(current.data);
      }

      // enqueue nodes
      if (current.left != null) queue.push(current.left);
      if (current.right != null) queue.push(current.right);
      // console.log(queue);

      // dequeue/delete the first item form the queue
      queue.shift();
    }

    // if there is no callback argument, return the levelorder array
    if (!callback) {
      return levelOrderArray;
    }
  }

  // level order function with recurssion
  // populate queue with root and execute until queue becoumes empty.
  levelOrderRecurssion(callback, queue = [this.root], list = []) {
    if (queue.length != 0) {
      // work with the first node in the queue
      let currentNode = queue[0];
      if (callback) {
        callback(currentNode.data);
      } else {
        list.push(currentNode.data);
      }

      // enqueue child nodes in the queue
      if (currentNode.left != null) queue.push(currentNode.left);
      if (currentNode.right != null) queue.push(currentNode.right);

      // dequeue first node in the queue
      queue.shift();

      return this.levelOrderRecurssion(callback, queue, list);
    }

    if (!callback) {
      return list;
    }
  }

  // inorder traversal
  inorder(callback, root = this.root, arr = []) {
    if (root == null) return;

    this.inorder(callback, root.left, arr);

    if (callback) {
      callback(root.data);
    } else {
      arr.push(root.data);
    }

    this.inorder(callback, root.right, arr);

    return arr;
  }

  // preorder traversal
  preorder(callback, root = this.root, arr = []) {
    if (root == null) return;

    if (callback) {
      callback(root.data);
    } else {
      arr.push(root.data);
    }

    this.preorder(callback, root.left, arr);

    this.preorder(callback, root.right, arr);

    return arr;
  }

  // postorder traversal
  postorder(callback, root = this.root, arr = []) {
    if (root == null) return;

    this.postorder(callback, root.left, arr);

    this.postorder(callback, root.right, arr);

    if (callback) {
      callback(root.data);
    } else {
      arr.push(root.data);
    }

    return arr;
  }

  // accepts a node and returns its height
  height(item) {
    let node = this.find(item);
    if (typeof node == "object") {
      return `Height of node ${item} is: ${this.getHeight(node)}`;
    } else {
      return `${item} not found in the tree`;
    }
  }

  // find height of a node
  getHeight(node, nodeHeight = -1) {
    if (node == null) return nodeHeight;
    // increment nodeHeight in each recurssion call
    nodeHeight++;

    // recurssively call height with left and right
    let left = this.getHeight(node.left, nodeHeight);
    let right = this.getHeight(node.right, nodeHeight);

    // get the max height
    return Math.max(left, right);
  }

  // accepts a node and returns its depth
  depth(item) {
    let root = this.root;
    let node = this.find(item);

    if (typeof node == "object") {
      return `Depth of ${item} is ${this.getDepth(node.data, root)}`;
    } else {
      return `${item} not found in the tree`;
    }
  }

  // find depth of a node
  getDepth(node, root, nDepth = -1) {
    if (root == null) return;

    // increament the depth in each recurssive call
    nDepth++;

    // console.log(node, root.data, nDepth);
    if (node == root.data) return nDepth;

    if (node > root.data) {
      return this.getDepth(node, root.right, nDepth);
    }

    if (node < root.data) {
      return this.getDepth(node, root.left, nDepth);
    }

    return nDepth;
  }

  // check if the tree is balanced
  isBalanced(node = this.root, nodeHeight = -1) {
    if (node == null) return nodeHeight;
    // increment nodeHeight in each recurssion call
    nodeHeight++;

    // recurssively get left and right nodes
    let left = this.getHeight(node.left, nodeHeight);
    let right = this.getHeight(node.right, nodeHeight);

    // if the difference is more than 1, tree is not balanced
    if (Math.abs(left - right) >= 2) {
      return false;
    } else {
      return true;
    }
  }

  // rebalance tree
  rebalance() {
    // get sorted array through inorder() function
    let array = this.inorder();
    // console.log(array);
    let end = array.length - 1;

    return this.buildTree(array, 0, end);
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

// Driver script
let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let tree = new Tree(arr);
prettyPrint(tree.root);

lineBreak();
console.log("Insert 6 into the tree:");
tree.insert(6);
prettyPrint(tree.root);

lineBreak();
console.log("Delete 4 from the tree:");
tree.delete(4);
prettyPrint(tree.root);

lineBreak();
console.log("find() function:");
console.log(tree.find(7));
console.log(tree.find(321));

lineBreak();
console.log("levelOrder() with no argument: ");
console.log(tree.levelOrder());
console.log("levelOrder() with argument: ");
tree.levelOrder(lvlOrderCallback);

lineBreak();
console.log("levelOrderRecurssion() with recurssion with no argument: ");
console.log(tree.levelOrderRecurssion());
console.log("levelOrderRecurssion with argument: ");
tree.levelOrderRecurssion(lvlOrderCallback);

lineBreak();
console.log("Inorder without callback:");
console.log(tree.inorder());
console.log("Inorder with callback");
tree.inorder(lvlOrderCallback);

lineBreak();
console.log("Preorder without callback:");
console.log(tree.preorder());
console.log("Preorder with callback");
tree.preorder(lvlOrderCallback);

lineBreak();
console.log("Postorder without callback:");
console.log(tree.postorder());
console.log("Postorder with callback");
tree.postorder(lvlOrderCallback);

lineBreak();
console.log("Height of node ->");
console.log(tree.height(8));
console.log(tree.height(6345));
console.log(tree.height(98327));

lineBreak();
console.log("Depth of node ->");
console.log(tree.depth(6345));
console.log(tree.depth(324));
console.log(tree.depth(9));
console.log(tree.depth(7));
console.log(tree.depth(1));
console.log(tree.depth(2342));

lineBreak();
console.log("Check tree balance ->");
// tree.insert(7778);
// tree.insert(7888);
prettyPrint(tree.root);
console.log(`The tree is balanced: ${tree.isBalanced()}`);
console.log();
console.log("Inserting 7777 and 7778 into tree.");
tree.insert(7777);
tree.insert(7778);
prettyPrint(tree.root);
console.log(`The tree is balanced: ${tree.isBalanced()}`);

lineBreak();
console.log("Rebalance the tree ->");
tree.root = tree.rebalance();
prettyPrint(tree.root);
console.log(`The tree is balanced: ${tree.isBalanced()}`);
// The callback function for various functions

function lvlOrderCallback(value) {
  console.log(value);
}
// lineBreak function to separate the results
function lineBreak() {
  console.log("---------------------------------");
  console.log("---------------------------------");
}
