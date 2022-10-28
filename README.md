# Binary Search Tree

This is the Binary Search Tree factory function that comes with a few functions solution to a project from The Odin Project.

## Written in JavaScript with tests in Jest.

### Following functions are realized:

1. **buildTree(array)**: takes an array of data (e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.
2. **insert(value)**: inserts a new node containing value to its appropriate position.
3. **deleteNode(value)**: deletes the node containing value.
4. **find(value)**: finds and returns the found node with value.
5. **levelOrder(callback)**: traverses the tree in Breadth-first Level Order and provides the node as arguments to the callback function; returns an array of values if no function is given.
6. **inorder(callback)**: similar to above function, but traversing in Depth-first Inorder.
7. **preorder(callback)**: similar to above function, but traversing in Depth-first Preorder.
8. **postorder(callback)**: similar to above function, but traversing in Depth-first Postorder.
9. **height(value)**: returns the height of the node containing the given value. Height is defined as the number of edges in longest path from a given node to a leaf node.
10. **depth(value)**: returns the depth of the node containing the given value. Depth is defined as the number of edges in path from a given node to the tree’s root node.
11. **isBalanced()**: checks if the tree is balanced. A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1.
12. **rebalance()**: rebalances an unbalanced tree.

### driver.js does the following:

1. Create a binary search tree from an array of random numbers. You can create a function if you want that returns an array of random numbers each time you call it.
2. Confirm that the tree is balanced by calling isBalanced.
3. Print out all elements in level, pre, post, and in order.
4. Unbalance the tree by adding several numbers > 100.
5. Confirm that the tree is unbalanced by calling isBalanced.
6. Balance the tree by calling rebalance.
7. Confirm that the tree is balanced by calling isBalanced.
8. Print out all elements in level, pre, post, and in order.
