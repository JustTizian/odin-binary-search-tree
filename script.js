import Tree from "./tree.js";

const myTree = new Tree([10, 16, 27, 56, 76, 87, 92, 99]);

console.log(myTree.isBalanced());

myTree.levelOrder((node) => console.log(node.data));

console.log("------------");

myTree.preOrder((node) => console.log(node.data));

console.log("------------");

myTree.postOrder((node) => console.log(node.data));

console.log("------------");

myTree.inOrder((node) => console.log(node.data));

console.log("------------");

myTree.insert(120, 140, 156, 1023)

console.log(myTree.isBalanced())

myTree.rebalance()

console.log(myTree.isBalanced())

myTree.levelOrder((node) => console.log(node.data));

console.log("------------");

myTree.preOrder((node) => console.log(node.data));

console.log("------------");

myTree.postOrder((node) => console.log(node.data));

console.log("------------");

myTree.inOrder((node) => console.log(node.data));

console.log("------------");

