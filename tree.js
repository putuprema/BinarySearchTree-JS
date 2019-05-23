/* eslint-disable brace-style */
class Node {
  constructor(data, height) {
    this.data = data;
    this.left = undefined;
    this.right = undefined;
    this.height = height;
  }

  print() {
    console.log(this.data);
  }

  static pop(startingNode, key) {
    let nodeToDelete = startingNode;
    let parentOfDeleted = startingNode;
    let nodeLoc = 0; // 0 is left, 1 is right
    while (nodeToDelete != undefined) {
      if (key < nodeToDelete.data) {
        nodeLoc = 0;
        parentOfDeleted = nodeToDelete;
        nodeToDelete = nodeToDelete.left;
      } else if (key > nodeToDelete.data) {
        nodeLoc = 1;
        parentOfDeleted = nodeToDelete;
        nodeToDelete = nodeToDelete.right;
      } else break;
    }

    // console.log(parentOfDeleted);
    // console.log(nodeToDelete);

    if (nodeToDelete.left == undefined && nodeToDelete.right == undefined) {
      nodeToDelete = undefined;
      if (nodeLoc == 0) parentOfDeleted.left = undefined;
      else if (nodeLoc == 1) parentOfDeleted.right = undefined;
    }
    else if (nodeToDelete.left == undefined) { // if nodeToDelete has right child
      if (nodeLoc == 0) parentOfDeleted.left = nodeToDelete.right;
      else if (nodeLoc == 1) parentOfDeleted.right = nodeToDelete.right;
      nodeToDelete = undefined;
    }
    else if (nodeToDelete.right == undefined) { // if nodeToDelete has left child
      if (nodeLoc == 0) parentOfDeleted.left = nodeToDelete.left;
      else if (nodeLoc == 1) parentOfDeleted.right = nodeToDelete.left;
      nodeToDelete = undefined;
    }
    else { // if nodeToDelete has both child
      let largestLeft = nodeToDelete.left;
      while (largestLeft.right != undefined) largestLeft = largestLeft.right;
      // console.log(largestLeft);
      nodeToDelete.data = largestLeft.data;
      Node.pop(nodeToDelete.left, largestLeft.data);
    }
  }

  static push(data) {
    if (root == undefined) {root = new Node(data, 0); console.log('test');}
    else {
      let startNode = root;
      let height = startNode.height;
      let parentOfNew = root;
      let dataLoc = 0; // 0 is left, 1 is right
      while (startNode != undefined) {
        if (data < startNode.data) {
          dataLoc = 0;
          parentOfNew = startNode;
          startNode = startNode.left;
          height += 1;
        } else if (data > startNode.data) {
          dataLoc = 1;
          parentOfNew = startNode;
          startNode = startNode.right;
          height += 1;
        }
      }
      let newNode = new Node(data, height);
      if (dataLoc == 0) {
        parentOfNew.left = newNode;
      } else if (dataLoc == 1) {
        parentOfNew.right = newNode;
      }
    }
  }

  static printPreOrder(node) {
    if (node !== undefined) {
      console.log(node);
      this.printPreOrder(node.left);
      this.printPreOrder(node.right);
    }
  }

  static printInOrder(node) {
    if (node !== undefined) {
      this.printInOrder(node.left);
      console.log(node);
      this.printInOrder(node.right);
    }
  }

  static printPostOrder(node) {
    if (node !== undefined) {
      this.printPostOrder(node.left);
      this.printPostOrder(node.right);
      console.log(node);
    }
  }
}
