// import mergeSort from "../3-project-recursion/assignment";
const mergeSort = require("../3-project-recursion/assignment");

function Node(value) {
  return {
    data: value,
    left: null,
    right: null
  }
}

function Tree(array) {
  // let root = array ? buildTree(array) : null;

  function prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node) {
      if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
      }
      console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
      if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
      }
    }
  }

  function buildTree(inputArray) {
    // Removes duplicates and sort array first.
    const array = sortArrayAndRemoveDuplicates(inputArray);

    // buildBST function where Node is created with value at midIndex, and set left and right recursively.
    function buildBST(array, startIndex, endIndex) {
      // base case where startIndex is larger than endIndex, meaning the input has only one value. 
      if (startIndex > endIndex) {
        return null;
      }
      const midIndex = Math.ceil((startIndex + endIndex) / 2);
      const node = Node(array.at(midIndex));
      node.left = buildBST(array, startIndex, midIndex - 1);
      node.right = buildBST(array, midIndex + 1, endIndex);
      return node;
    }
    return buildBST(array, 0, array.length - 1);
  }

  function insert(value) {
    function insertBSTRec(node, value) {
      // Base case: node is null, thus return a new Node(value).
      if (!node) {
        node = Node(value);
        return node;
      }
      // Otherwise, traverse down the tree, recursively calling insertBSTRec().
      if (value < node.data) {
        node.left = insertBSTRec(node.left, value);
      } else if (value > node.data) {
        node.right = insertBSTRec(node.right, value);
      }
      // Return the node changed or unchanged.
      return node;
    }
    this.root = insertBSTRec(this.root, value);
  }

  function deleteNode(value) {
    // Find the minimum value among the tree of nodes below the node including itself.
    function minValue(node) {
      let minValue = node.data;
      while (node.left) {
        minValue = node.left.data;
        node = node.left;
      }
      return minValue;
    }

    function deleteBSTRec(node, value) {
      // Base case: node is empty.
      if (!node) {
        return node;
      }
      // Otherwise, traverse down the tree, recursively calling deleteBSTRec().
      if (value < node.data) {
        node.left = deleteBSTRec(node.left, value);
      } else if (value > node.data) {
        node.right = deleteBSTRec(node.right, value);
      } 
      // Find the node where node.data equals value, the node to be deleted.
        else {
        // Case 1 and Case 2: deleting a leaf node, or a node with one child.
        if (!node.left) {
          return node.right;
        } else if (!node.right) {
          return node.left;
        } 
        // Case 3: deleting a node with two chidlren.
        // Finding the next smallest node with minValue(node).
        // Setting node.data to be the next smallest value found with minValue(node).
        node.data = minValue(node.right);
        // Go ahead and delete the found minValue from right side of the node, node.right.
        node.right = deleteBSTRec(node.right, node.data);
      }
      return node;
    }
    this.root = deleteBSTRec(this.root, value);
  }

  function find(value) {
    function DFSPreorderRec(node, value) {
      // Base case: node is empty or node.data is equal to the value.
      if (!node || node.data === value) {
        return node;
      } 
      // Traverse to the left if value is smaller than the node data.
      if (value < node.data) {
        return DFSPreorderRec(node.left, value);
      // To the right otherwise.
      } else {
        return DFSPreorderRec(node.right, value);
      }
    }
    return DFSPreorderRec(this.root, value);
  }

  function levelOrder(callback) {
    function BFTIte(node, callback) {
      // Base case: node is empty, return.
      if (!node) {
        return;
      }
      // Queue where nodes are waiting to be FIFO.
      let queue = [node];
      // Array to keep values in it when callback is not provided.
      let valueArray = [];
      while (queue.length > 0) {
        let item = queue.shift();
        let value = item.data;
        // Either callback or push the value into the array.
        callback ? callback(value) : valueArray.push(value);
        // When node has no children, skip to next iteration.
        if (!item.left && !item.right) {
          continue;
        }
        if (item.left) {
          queue.push(item.left);
        }
        if (item.right) {
          queue.push(item.right);
        }
      }
      // Returns the valueArray if callback is not provided.
      return callback ? null : valueArray;
    }
    return BFTIte(this.root, callback);
  }

  function inorder(callback) {
    let valueArray = [];
    function inorderRec(node, callback) {
      // Base case: node is empty.
      if (!node) {
        return;
      } else {
        inorderRec(node.left, callback);
        callback? callback(node.data) : valueArray.push(node.data);
        inorderRec(node.right, callback);
      }
      return callback ? null : valueArray;
    }
    return inorderRec(this.root, callback);
  }

  function preorder(callback) {
    let valueArray = [];
    function preorderRec(node, callback) {
      // Base case: node is empty.
      if (!node) {
        return;
      } else {
        callback? callback(node.data) : valueArray.push(node.data);
        preorderRec(node.left, callback);
        preorderRec(node.right, callback);
      }
      return callback ? null : valueArray;
    }
    return preorderRec(this.root, callback);
  }

  function postorder(callback) {
    let valueArray = [];
    function postorderRec(node, callback) {
      // Base case: node is empty.
      if (!node) {
        return;
      } else {
        postorderRec(node.left, callback);
        postorderRec(node.right, callback);
        callback? callback(node.data) : valueArray.push(node.data);
      }
      return callback ? null : valueArray;
    }
    return postorderRec(this.root, callback);
  }

  function height(value) {
    function heightRec(node) {
      // Base case: node is empty.
      if (!node) {
        return -1;
      } else {
        const leftHeight = heightRec(node.left);
        const rightHeight = heightRec(node.right);
        return leftHeight >= rightHeight ? leftHeight + 1 : rightHeight + 1;
      }
    }
    return this.find(value) ? heightRec(this.find(value)) : null;
  }

  function depth(value) {
    function depthRec(node, value, depth) {
      // Base case: node is empty or node.data is equal to the value.
      if (!node || node.data === value) {
        return depth;
      } 
      // Traverse to the left if value is smaller than the node data, depth plus 1.
      if (value < node.data) {
        return depthRec(node.left, value, depth + 1);
      // To the right otherwise.
      } else {
        return depthRec(node.right, value, depth + 1);
      }
    }
    return this.find(value) ? depthRec(this.root, value, 0) : null;
  }

  function isBalanced() {
    function heightRec(node) {
      // Base case: node is empty.
      if (!node) {
        return -1;
      } else {
        const leftHeight = heightRec(node.left);
        const rightHeight = heightRec(node.right);
        return leftHeight >= rightHeight ? leftHeight + 1 : rightHeight + 1;
      }
    }

    function isBalancedRec(node) {
      // Base case: node is empty.
      if (!node) {
        return true;
      } else {
        const leftHeight = heightRec(node.left);
        const rightHeight = heightRec(node.right);
        // The node is balanced if left and right height difference is smaller or equal to 1.
        const balancedResult = Math.abs(leftHeight - rightHeight) <= 1;
        // The node is not "balanced" if either left or right side is not balanced.
        return balancedResult && isBalancedRec(node.left) && isBalancedRec(node.right);
      }
    }
    return isBalancedRec(this.root);
  }

  function rebalance() {
    const valuesArray = this.levelOrder();
    this.root = buildTree(valuesArray);
  }

  return {
    root: buildTree(array),
    prettyPrint,
    buildTree,
    insert,
    deleteNode,
    find,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance
  }
}

function sortArrayAndRemoveDuplicates(array) {
  const arrayDuplicatesRemoved = [... new Set(array)];
  return mergeSort(arrayDuplicatesRemoved);
}

module.exports = { Node, Tree, sortArrayAndRemoveDuplicates };