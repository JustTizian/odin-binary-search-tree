class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
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
}

let myTree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

