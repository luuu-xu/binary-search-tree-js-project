const { Node, Tree, sortArrayAndRemoveDuplicates } = require("./Tree");

describe("Node factory function", () => {
  test("has data when created with value", () => {
    const n = Node(3);
    expect(n.data).toBe(3);
  });

  test("has left node or right node when children is added", () => {
    const n = Node(3);
    const n1 = Node(2);
    n.left = n1;
    expect(n.left.data).toBe(2);
    expect(n.right).toBeNull();
  });
});

describe("Tree.buildTree(array)", () => {
  test("returns null when input is an empty array", () => {
    const t = Tree();
    expect(t.root).toBeNull();
  });

  test("builds a single node tree", () => {
    const t = Tree([1]);
    expect(t.root.data).toBe(1);
  });

  test("builds a BST when input is an array of odd size", () => {
    const t = Tree([1, 7, 4]);
    // t.prettyPrint(t.root);
    expect(t.root.data).toBe(4);
    expect(t.root.left.data).toBe(1);
  });

  test("builds a BST when input array has even size with duplicates", () => {
    const t = Tree([1, 7, 4, 9, 4, 7]);
    // t.prettyPrint(t.root);
    expect(t.root.data).toBe(7);
    expect(t.root.left.left.data).toBe(1);
  });
});

describe("sortArrayAndRemoveDuplicates(array)", () => {
  test("sorts array correctly with Merge Sort method and removes duplicates", () => {
    expect(sortArrayAndRemoveDuplicates([1, 7, 4])).toEqual([1, 4, 7]);
    expect(sortArrayAndRemoveDuplicates([1, 7, 4, 9])).toEqual([1, 4, 7, 9]);
    expect(sortArrayAndRemoveDuplicates([1, 7, 4, 9, 9, 1])).toEqual([1, 4, 7, 9]);
  });

});

describe("Tree.insert(value)", () => {
  const t = Tree();

  test("inserts a value to an empty tree", () => {
    t.insert(4);
    // t.prettyPrint();
    expect(t.root.data).toBe(4);
  });

  test("inserts a value which is the new smallest/largest number", () => {
    t.insert(2);
    // t.prettyPrint();
    expect(t.root.left.data).toBe(2);
    t.insert(7);
    // t.prettyPrint();
    expect(t.root.right.data).toBe(7);
  });

  test("does not insert a value which is already inside the tree", () => {
    // t.prettyPrint();
    t.insert(4);
    t.insert(2);
    expect(t.root.data).toBe(4);
    expect(t.root.left.data).toBe(2);
  });

  test("inserts a value which is inside the range of exsited numbers in the tree", () => {
    t.insert(3);
    // t.prettyPrint();
    expect(t.root.left.right.data).toBe(3);
  });
});

describe("Tree.deleteNode(value)", () => {
  const t = Tree([2, 3, 4, 5, 6, 7, 8]);

  test("does not delete a node that is not in the tree", () => {
    const rootSnap = t.root;
    t.deleteNode(1);
    expect(t.root).toStrictEqual(rootSnap);
  });

  test("deletes a leaf node", () => {
    t.deleteNode(2);
    expect(t.root.left.left).toBeNull();
  });

  test("deletes a node with one child", () => {
    t.deleteNode(3);
    expect(t.root.left.data).toBe(4);
  });

  test("deletes a node with two children", () => {
    t.deleteNode(7);
    // t.prettyPrint();
    expect(t.root.right.data).toBe(8);
    expect(t.root.right.right).toBeNull();
  });
});

describe("Tree.find(value)", () => {
  const t = Tree([2, 3, 4, 5, 6, 7, 8]);

  test("returns null when trying to find a non-exsitant node", () => {
    expect(t.find(1)).toBeNull();
  });

  test("returns the node with the value", () => {
    expect(t.find(5).left).toStrictEqual(t.root.left);
  });
});

describe("Tree.levelOrder(callback)", () => {
  const t = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  t.prettyPrint();

  test("returns an array of values in breadth-first order if callback is not provided", () => {
    expect(t.levelOrder()).toEqual([5, 3, 8, 2, 4, 7, 9, 1, 6]);
  });

  test("provide each value to the callback function in level order", () => {
    let valueArray = [];
    t.levelOrder((value) => valueArray.push(value));
    expect(valueArray).toEqual([5, 3, 8, 2, 4, 7, 9, 1, 6]);
  });
});

describe("Tree.inorder(callback)", () => {
  const t = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  test("returns an array of values in in-order if callback function is not provided", () => {
    expect(t.inorder()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test("provides each value to the callback function in inorder", () => {
    let valueArray = [];
    t.inorder((value) => valueArray.push(value));
    expect(valueArray).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});

describe("Tree.preorder(callback)", () => {
  const t = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  test("returns an array of values in in-order if callback function is not provided", () => {
    expect(t.preorder()).toEqual([5, 3, 2, 1, 4, 8, 7, 6, 9]);
  });

  test("provides each value to the callback function in preorder", () => {
    let valueArray = [];
    t.preorder((value) => valueArray.push(value));
    expect(valueArray).toEqual([5, 3, 2, 1, 4, 8, 7, 6, 9]);
  });
});

describe("Tree.postorder(callback)", () => {
  const t = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  test("returns an array of values in in-order if callback function is not provided", () => {
    expect(t.postorder()).toEqual([1, 2, 4, 3, 6, 7, 9, 8, 5]);
  });

  test("provides each value to the callback function in postorder", () => {
    let valueArray = [];
    t.postorder((value) => valueArray.push(value));
    expect(valueArray).toEqual([1, 2, 4, 3, 6, 7, 9, 8, 5]);
  });
});