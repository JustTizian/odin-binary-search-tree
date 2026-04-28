class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  constructor(array) {
    this.root = this.#buildTree(array, 0, array.length - 1);
  }

  #buildTree(array, start, end) {
    if (start > end) {
      return null;
    }

    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid]);

    root.left = this.#buildTree(array, start, mid - 1);
    root.right = this.#buildTree(array, mid + 1, end);

    return root;
  }

  includes(value) {
    return this.#includesHelper(value, this.root);
  }

  #includesHelper(value, node) {
    if (!node) {
      return false;
    }

    if (node.data === value) {
      return true;
    }

    if (value < node.data) {
      return this.#includesHelper(value, node.left);
    }

    if (value > node.data) {
      return this.#includesHelper(value, node.right);
    }
  }

  height(value) {
    const node = this.#findNode(value);
    if (!node) return undefined;
    return this.#heightHelper(node);
  }

  #heightHelper(node) {
    if (!node) return -1;
    const left = this.#heightHelper(node.left);
    const right = this.#heightHelper(node.right);
    return 1 + Math.max(left, right);
  }

  isBalanced() {
    return this.#isBalancedHelper(this.root);
  }

  #isBalancedHelper(node) {
    if (!node) {
      return true;
    }

    const leftSubtreeHeight = this.#heightHelper(node.left);
    const rightSubtreeHeight = this.#heightHelper(node.right);

    if (Math.abs(leftSubtreeHeight - rightSubtreeHeight) > 1) {
      return false;
    }

    const leftSubtreeBalanced = this.#isBalancedHelper(node.left);
    const rightSubtreeBalanced = this.#isBalancedHelper(node.right);

    return leftSubtreeBalanced && rightSubtreeBalanced;
  }

  depth(value) {
    return this.#depthHelper(value, 0, this.root);
  }

  #depthHelper(value, count, node) {
    if (!node) {
      return undefined;
    }

    if (node.data === value) {
      return count;
    }

    if (value < node.data) {
      return this.#depthHelper(value, count + 1, node.left);
    }

    if (value > node.data) {
      return this.#depthHelper(value, count + 1, node.right);
    }
  }

  #findNode(value) {
    return this.#findNodeHelper(value, this.root);
  }

  #findNodeHelper(value, node) {
    if (!node) {
      return null;
    }

    if (node.data === value) {
      return node;
    }

    if (value < node.data) {
      return this.#findNodeHelper(value, node.left);
    }

    if (value > node.data) {
      return this.#findNodeHelper(value, node.right);
    }
  }

  insert(value) {
    this.root = this.#insertHelper(value, this.root);
  }

  #insertHelper(value, root) {
    if (!root) {
      return new Node(value);
    }

    if (value < root.data) {
      root.left = this.#insertHelper(value, root.left);
    } else {
      root.right = this.#insertHelper(value, root.right);
    }

    return root;
  }

  delete(value) {
    this.root = this.#deleteHelper(value, this.root);
  }

  #deleteHelper(value, root) {
    if (!root) {
      return root;
    }

    if (root.data > value) {
      root.left = this.#deleteHelper(value, root.left);
    } else if (root.data < value) {
      root.right = this.#deleteHelper(value, root.right);
    } else {
      if (!root.left) {
        return root.right;
      }
      if (!root.right) {
        return root.left;
      }

      const SUCC = this.#getSuccessor(root);
      root.data = SUCC.data;
      root.right = this.#deleteHelper(SUCC.data, root.right);
    }

    return root;
  }

  #getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  levelOrder(callback) {
    this.#levelOrderHelper([this.root], callback);
  }

  #levelOrderHelper(queue, callback) {
    if (queue.length) {
      const node = queue.shift();
      callback(node);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }

      this.#levelOrderHelper(queue, callback);
    }
  }

  levelOrderIterative(callback) {
    if (!callback) {
      throw new Error("No callback provided!");
    }

    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      callback(node);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  inOrder(callback) {
    this.#inOrderHelper(this.root, callback);
  }

  #inOrderHelper(root, callback) {
    if (root.left) {
      this.#inOrderHelper(root.left, callback);
    }

    callback(root);

    if (root.right) {
      this.#inOrderHelper(root.right, callback);
    }
  }

  preOrder(callback) {
    this.#preOrderHelper(this.root, callback);
  }

  #preOrderHelper(root, callback) {
    callback(root);

    if (root.left) {
      this.#preOrderHelper(root.left, callback);
    }

    if (root.right) {
      this.#preOrderHelper(root.right, callback);
    }
  }

  postOrder(callback) {
    this.#postOrderHelper(this.root, callback);
  }

  #postOrderHelper(root, callback) {
    if (root.left) {
      this.#postOrderHelper(root.left, callback);
    }

    if (root.right) {
      this.#postOrderHelper(root.right, callback);
    }

    callback(root);
  }

  rebalance() {
    const sortedValues = [];
    this.inOrder((node) => sortedValues.push(node.data));
    
    const newTree = new Tree(sortedValues);
    this.root = newTree.root;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

