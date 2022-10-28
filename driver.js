const { Tree } = require("./Tree");

// You can create a function if you want that returns an array of random numbers each time you call it.
function makeRandomNumberArray(start, end, number) {
  return Array.from({length: number}, () => (Math.floor(Math.random() * (end - start))) + start);
}

// Create a binary search tree from an array of random numbers. 
const array = makeRandomNumberArray(1, 100, 10);
console.log("Random array generated: ", array);
const tree = Tree(array);
console.log("Tree is created.");

// Confirm that the tree is balanced by calling isBalanced.
console.log("Checking if tree is balanced...");
console.log(tree.isBalanced() ? "Tree is balanced." : "Tree is not balanced.");

// Print out all elements in level, pre, post, and in order.
const levelOrderPrint = tree.levelOrder();
console.log("Level order print: ", levelOrderPrint);

const inorderPrint = tree.inorder();
console.log("Inorder print: ", inorderPrint);

const preorderPrint = tree.preorder();
console.log("Preorder print: ", preorderPrint);

const postorderPrint = tree.postorder();
console.log("Postorder print: ", postorderPrint);

// Unbalance the tree by adding several numbers > 100.
const addCount = Math.floor(Math.random() * 10);
const addArray = makeRandomNumberArray(100, 200, addCount);
console.log("Adding numbers...", addArray);
addArray.forEach((number) => tree.insert(number));
console.log("Random numbers added.");

// Confirm that the tree is unbalanced by calling isBalanced.
console.log("Checking if tree is balanced...");
console.log(tree.isBalanced() ? "Tree is balanced." : "Tree is not balanced.");

// Balance the tree by calling rebalance.
console.log("Rebalancing the tree...");
tree.rebalance();

// Confirm that the tree is balanced by calling isBalanced.
console.log("Checking if tree is balanced...");
console.log(tree.isBalanced() ? "Tree is balanced." : "Tree is not balanced.");

// Print out all elements in level, pre, post, and in order.
const newLevelOrderPrint = tree.levelOrder();
console.log("Level order print: ", newLevelOrderPrint);

const newInorderPrint = tree.inorder();
console.log("Inorder print: ", newInorderPrint);

const newPreorderPrint = tree.preorder();
console.log("Preorder print: ", newPreorderPrint);

const newPostorderPrint = tree.postorder();
console.log("Postorder print: ", newPostorderPrint);
