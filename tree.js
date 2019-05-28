/* eslint-disable no-param-reassign */
/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
/* eslint-disable brace-style */

let root = null;
let lastState = null;
let msg = '';

class Node {
  constructor(d, height, y, parent, loc, canvasWidth) {
    if (d instanceof Node) { // if parameter passed is a node then use all properties of the node to be cloned
      this.data = d.data;
      this.left = d.left;
      this.right = d.right;
      this.parent = d.parent;
      this.loc = d.loc;
      this.height = d.height;
      this.balanceFactor = d.balanceFactor;
      this.x = d.x;
      this.y = d.y;
      this.highlighted = d.highlighted;
    }
    else {
      this.data = d;
      this.left = null;
      this.right = null;
      this.parent = parent;
      this.loc = loc;
      this.height = height;
      this.balanceFactor = 0;
      this.x = canvasWidth / 2;
      this.y = y;
      this.highlighted = false;
    }
  }
}

// CLONE THE CURRENT TREE INCLUDING ITS CHILD AND THE CHILD OF ITS CHILD AND SO ON..
function treeClone(node) {
  if (node == null) return null;
  const neww = new Node(node);
  neww.left = treeClone(node.left);
  neww.right = treeClone(node.right);
  return neww;
}

// DELAY CODE EXECUTION FOR SPECIFIED MILLISECONDS
function sleep(ms) {
  const start = Date.now();
  while (Date.now() < start + ms);
}

// UNHIGHLIGHT ALL NODES
function unhighlightAll(node) {
  if (node !== null) {
    node.highlighted = false;
    unhighlightAll(node.left);
    unhighlightAll(node.right);
  }
}

// GET CURRENT HEIGHT/LEVEL OF A NODE
function getHeight(node) {
  if (node == null) return 0;
  return node.height;
}

// SEARCH AN ELEMENT IN THE TREE
function search(curr, key) {
  if (!curr) { // if current node is null then element does not exist in the tree
    msg = 'Searching for ' + key + ' : (Element not found)';
    self.postMessage([root, msg, '']);
    return 0;
  }
  unhighlightAll(root);
  curr.highlighted = true;
  self.postMessage([root, msg, '']);
  if (key < curr.data) { // if key < current node's data then look at the left subtree
    msg = 'Searching for ' + key + ' : ' + key + ' < ' + curr.data + '. Looking at left subtree.';
    self.postMessage([root, msg, '']);
    sleep(1000);
    search(curr.left, key);
  }
  else if (key > curr.data) { // if key > current node's data then look at the right subtree
    msg = 'Searching for ' + key + ' : ' + key + ' > ' + curr.data + '. Looking at right subtree.';
    self.postMessage([root, msg, '']);
    sleep(1000);
    search(curr.right, key);
  }
  else { // notify the main thread that an element is found and highlight that element
    msg = 'Searching for ' + key + ' : ' + key + ' == ' + curr.data + '. Element found!';
    self.postMessage([root, msg, '']);
    sleep(1000);
  }
  return 0;
}

// DELETE AN ELEMENT FROM THE TREE
function pop(startingNode, key) {
  let node = startingNode;
  if (!node) { // if current node is null then element to delete does not exist in the tree
    msg = 'Searching for ' + key + ' : (Element not found)';
    self.postMessage([root, msg, '']);
    return null;
  }
  else {
    unhighlightAll(root);
    node.highlighted = true;
    self.postMessage([root, msg, '']);
    if (key < node.data) { // if key < current node's data then look at the left subtree
      msg = 'Searching for ' + key + ' : ' + key + ' < ' + node.data + '. Looking at left subtree.';
      self.postMessage([root, msg, '']);
      sleep(1000);
      node.left = pop(node.left, key);
    }
    else if (key > node.data) { // if key > current node's data then look at the right subtree
      msg = 'Searching for ' + key + ' : ' + key + ' > ' + node.data + '. Looking at right subtree.';
      self.postMessage([root, msg, '']);
      sleep(1000);
      node.right = pop(node.right, key);
    }
    else {
      msg = key + ' == ' + node.data + '. Found node to delete.'; // notify the main thread that node to delete is found.
      self.postMessage([root, msg, '']);
      sleep(1000);
      if (!node.left && !node.right) { // if node has no child (is a leaf) then just delete it.
        msg = 'Node to delete is a leaf. Delete it.';
        node = null;
        self.postMessage([root, msg, '']);
      }
      else if (!node.left) { // if node has RIGHT child then set parent of deleted node to right child of deleted node
        msg = 'Node to delete has no left child.\nSet parent of deleted node to right child of deleted node';
        self.postMessage([root, msg, '']);
        sleep(1000);
        // CODE FOR BLINKING ANIMATION AND BLA BLA BLA..
        for (let i = 0; i < 2; i += 1) {
          node.right.highlighted = true;
          node.parent.highlighted = true;
          self.postMessage([root, msg, '']);
          sleep(500);
          node.right.highlighted = false;
          node.parent.highlighted = false;
          self.postMessage([root, msg, '']);
          sleep(500);
        }
        // END CODE FOR BLINKING ANIMATION AND BLA BLA BLA..
        let del = node;
        node.right.parent = node.parent;
        node.right.loc = node.loc;
        node = node.right;
        del = null;
        node.y -= 40;
      }
      else if (!node.right) { // if node has LEFT child then set parent of deleted node to left child of deleted node
        msg = 'Node to delete has no right child.\nSet parent of deleted node to left child of deleted node';
        self.postMessage([root, msg, '']);
        sleep(1000);
        for (let i = 0; i < 2; i += 1) {
          node.left.highlighted = true;
          node.parent.highlighted = true;
          self.postMessage([root, msg, '']);
          sleep(500);
          node.left.highlighted = false;
          node.parent.highlighted = false;
          self.postMessage([root, msg, '']);
          sleep(500);
        }
        let del = node;
        node.left.parent = node.parent;
        node.left.loc = node.loc;
        node = node.left;
        del = null;
        node.y -= 40;
      }
      else { // if node has TWO children then find largest node in the left subtree. Copy the value of it into node to delete. After that, recursively delete the largest node in the left subtree
        msg = 'Node to delete has two children.\nFind largest node in left subtree.';
        self.postMessage([root, msg, '']);
        sleep(1000);
        let largestLeft = node.left;
        while (largestLeft.right) {
          unhighlightAll(root);
          largestLeft.highlighted = true;
          self.postMessage([root, msg, '']);
          sleep(500);
          largestLeft = largestLeft.right;
        }
        unhighlightAll(root);
        largestLeft.highlighted = true;
        msg = 'Largest node in left subtree is ' + largestLeft.data + '.\nCopy largest value of left subtree into node to delete.';
        self.postMessage([root, msg, '']);
        sleep(1000);
        // CODE FOR BLINKING ANIMATION AND BLA BLA BLA...
        for (let i = 0; i < 2; i += 1) {
          largestLeft.highlighted = true;
          node.highlighted = true;
          self.postMessage([root, msg, '']);
          sleep(500);
          largestLeft.highlighted = false;
          node.highlighted = false;
          self.postMessage([root, msg, '']);
          sleep(500);
        }
        // END CODE FOR BLINKING ANIMATION AND BLA BLA BLA...
        node.data = largestLeft.data;
        unhighlightAll(root);
        self.postMessage([root, msg, '']);
        sleep(1000);
        msg = 'Recursively delete largest node in left subtree';
        self.postMessage([root, msg, '']);
        sleep(1000);
        node.left = pop(node.left, largestLeft.data);
      }
    }
  }
  if (node == null) return node;

  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1; // update the heights of all nodes traversed by the pop() function

  return node; // return the modifications back to the caller
}

// INSERT AN ELEMENT TO THE TREE
function push(node, data, posY, parent, loc, canvasWidth) {
  let curr = node;

  if (curr != null) { // highlight current node in each recursion step
    curr.highlighted = true;
    self.postMessage([root, msg, '']);
  }

  if (curr == null) { // if current node is null then place the new node there
    msg = 'Found a null node. Inserted ' + data + '.';
    curr = new Node(data, 1, posY, parent, loc, canvasWidth);
  }
  else if (data < curr.data) { // if new data < current node's data, then go to left subtree
    msg = data + ' < ' + curr.data + '. Looking at left subtree.';
    self.postMessage([root, msg, '']);
    sleep(1000);
    curr.highlighted = false;
    curr.left = push(curr.left, data, posY + 40, curr, 'left', canvasWidth);
  }
  else if (data > curr.data) { // if new data > current node's data, then go to right subtree
    msg = data + ' > ' + curr.data + '. Looking at right subtree.';
    self.postMessage([root, msg, '']);
    sleep(1000);
    curr.highlighted = false;
    curr.right = push(curr.right, data, posY + 40, curr, 'right', canvasWidth);
  }

  curr.height = Math.max(getHeight(curr.left), getHeight(curr.right)) + 1; // update the heights of all nodes traversed by the push() function

  return curr; // return the modifications back to the caller
}

// AFTER INSERT OR DELETE, ALWAYS UPDATE ALL NODES POSITION IN THE CANVAS
// FORMULA FOR DETERMINING NODE POSITION IS: (NODE'S PARENT POSITION - ((2 ^ (NODE'S CURRENT HEIGHT + 1)) * 10)))
function updatePosition(node) {
  if (node != null) {
    if (node.loc === 'left') node.x = node.parent.x - ((2 ** (getHeight(node.right) + 1)) * 10);
    else if (node.loc === 'right') node.x = node.parent.x + ((2 ** (getHeight(node.left) + 1)) * 10);
    if (node.parent != null) node.y = node.parent.y + 40;
    if (node.left != null) node.left.parent = node; // update parent information of current node
    if (node.right != null) node.right.parent = node; // update parent information of current node
    updatePosition(node.left);
    updatePosition(node.right);
  }
}

// PRINT ALL NODES PRE-ORDERLY. THE ROUTE IS C - L - R
function printPreOrder(node) {
  if (node !== null) {
    unhighlightAll(root);
    node.highlighted = true;
    msg = node.data;
    self.postMessage([root, msg + ' ', '']);
    sleep(1000);

    printPreOrder(node.left);

    unhighlightAll(root);
    node.highlighted = true;
    self.postMessage([root, '', '']);
    sleep(1000);

    printPreOrder(node.right);

    unhighlightAll(root);
    node.highlighted = true;
    self.postMessage([root, '', '']);
    sleep(1000);
  }
}

// PRINT ALL NODES IN-ORDERLY. THE ROUTE IS L - C - R
function printInOrder(node) {
  if (node !== null) {
    unhighlightAll(root);
    node.highlighted = true;
    self.postMessage([root, '', '']);
    sleep(1000);

    printInOrder(node.left);

    msg = node.data;
    self.postMessage([root, msg + ' ', '']);
    unhighlightAll(root);
    node.highlighted = true;
    self.postMessage([root, '', '']);
    sleep(1000);

    printInOrder(node.right);

    unhighlightAll(root);
    node.highlighted = true;
    self.postMessage([root, '', '']);
    sleep(1000);
  }
}

// PRINT ALL NODES POST-ORDERLY. THE ROUTE IS L - R - C
function printPostOrder(node) {
  if (node !== null) {
    unhighlightAll(root);
    node.highlighted = true;
    self.postMessage([root, '', '']);
    sleep(1000);

    printPostOrder(node.left);

    unhighlightAll(root);
    node.highlighted = true;
    self.postMessage([root, '', '']);
    sleep(1000);

    printPostOrder(node.right);

    msg = node.data;
    unhighlightAll(root);
    node.highlighted = true;
    self.postMessage([root, msg + ' ', '']);
    sleep(1000);
  }
}

// EVENT LISTENER TO LISTEN COMMANDS FROM THE MAIN THREAD. THE TREE WILL EXECUTE EVERYTHING THE MAIN THREAD WANTS.
// AT EACH STEP IN THE ALGORITHM. THE TREE WILL NOTIFY THE MAIN THREAD ABOUT CHANGES IN THE TREE SO THE MAIN THREAD CAN DISPLAY THE CHANGES STEP-BY-STEP TO USERS FOR EASIER UNDESTANDING
self.addEventListener('message', (event) => {
  switch (event.data[0]) {
    case 'Insert': {
      lastState = treeClone(root);
      const value = event.data[1];
      const canvasWidth = event.data[2];
      root = push(root, value, 50, null, 'root', canvasWidth);
      updatePosition(root);
      self.postMessage([root, msg, 'Finished']);
      break;
    }
    case 'Delete': {
      lastState = treeClone(root);
      const key = event.data[1];
      if (root == null) {
        self.postMessage([root, 'Tree is empty', 'Finished']);
      }
      else {
        root = pop(root, key);
        updatePosition(root);
        unhighlightAll(root);
        self.postMessage([root, msg, 'Finished']);
      }
      break;
    }
    case 'Find': {
      const key = event.data[1];
      if (root == null) {
        self.postMessage([root, 'Tree is empty', 'Finished']);
      }
      else {
        search(root, key);
        unhighlightAll(root);
        self.postMessage([root, msg, 'Finished']);
      }
      break;
    }
    case 'Print Pre Order': {
      if (root == null) {
        self.postMessage([root, 'Tree is empty', 'Finished']);
      }
      else {
        printPreOrder(root);
        unhighlightAll(root);
        self.postMessage([root, '', 'Finished']);
      }
      break;
    }
    case 'Print In Order': {
      if (root == null) {
        self.postMessage([root, 'Tree is empty', 'Finished']);
      }
      else {
        printInOrder(root);
        unhighlightAll(root);
        self.postMessage([root, '', 'Finished']);
      }
      break;
    }
    case 'Print Post Order': {
      if (root == null) {
        self.postMessage([root, 'Tree is empty', 'Finished']);
      }
      else {
        printPostOrder(root);
        unhighlightAll(root);
        self.postMessage([root, '', 'Finished']);
      }
      break;
    }
    case 'Undo': {
      root = treeClone(lastState);
      updatePosition(root);
      self.postMessage([root, '', 'Finished']);
      break;
    }
    default: break;
  }
});
