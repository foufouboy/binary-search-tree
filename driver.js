import Tree from "./binary-tree.js";

// driver for my implementation of BST module //

// utils functions

function randomArray(n = 15, max = 100) {
    const res = [];
    for (; n; n--) res.push(Math.floor(Math.random() * max));
    return res;
}

function printBalanced(tree) {
    if (myTree.isBalanced()) {
        console.log("My BST is balanced !");
    } else {
        console.log("My BST is unbalanced !");
    }
}

function printAllTraversal() {
    console.log("level, pre, in and post order traversal :")

    console.log(myTree.preorder());
    console.log(myTree.inorder());
    console.log(myTree.postorder());
    console.log(myTree.levelOrder());
}

// creating random arrays

const initArr = randomArray();
const sortedArr = [...initArr].sort((a, b) => a - b);
const myTree = Tree();

myTree.balancedFrom(sortedArr);

printBalanced(myTree);

printAllTraversal();

// inserting some more random values

for (let i = 0; i < 100; i++) {
    myTree.insert(Math.floor(Math.random() * 100));
}

printBalanced(myTree);

myTree.rebalance();

printBalanced(myTree);

printAllTraversal();

// ...testing it all away
