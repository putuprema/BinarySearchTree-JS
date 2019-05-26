/* eslint-disable no-param-reassign */
import Node from './tree.js';

const myApp = new p5((p5) => {
  let root = null;
  let num = [30, 15, 37, 7, 26, 19, 28, 32, 45, 34, 42, 36, 35, 31, 33, 6, 5, 4, 3, 29];
  // let num = [1000, 500, 2000, 505, 506, 1999, 1998, 504, 499, 498, 497, 496];
  // let num = [1000, 500, 2000, 505, 506, 1999, 504, 499, 1996, 2001];
  // let num = [1000, 500, 2000, 499];
  let i = 0;
  let maxHeight = 1;
  let consolePrinting = true;

  let insertForm;
  let deleteForm;
  let searchForm;
  let msg = '';
  let mode = -1; // set animation mode, 1 for insert, 2 for delete, 3 for search
  let curr = null; // variable for node traversal
  let parentOfCurr = null;
  let value;

  const printPreOrder = () => {
    Node.printPreOrder(p5, root);
    console.log(msg);
    msg = '';
    return 0;
  };

  const printInOrder = () => {
    Node.printInOrder(p5, root);
    console.log(msg);
    msg = '';
    return 0;
  };

  const printPostOrder = () => {
    Node.printPostOrder(p5, root);
    console.log(msg);
    msg = '';
    return 0;
  };

  const insert = () => {
    value = parseInt(insertForm.value(), 10);
    insertForm.value('');
    if (isNaN(value) == true) return undefined;
    // root = Node.push(root, value, width / 2, 50, null, 'root');
    // if (root.left != null) {
    //   Node.updatePosition(root.left);
    // }
    // if (root.right != null) {
    //   Node.updatePosition(root.right);
    // }
    // return 0;

    mode = 1;
    curr = root;
  };

  const del = () => {
    const value = deleteForm.value();
    deleteForm.value('');
    if (isNaN(value) == true) return undefined;
    root = Node.pop(root, value);
    if (root == null) return 0;
    if (root.left != null) {
      Node.updatePosition(root.left);
    }
    if (root.right != null) {
      Node.updatePosition(root.right);
    }
    return 0;
  };

  const find = () => {
    value = parseInt(searchForm.value(), 10);
    searchForm.value('');
    if (isNaN(value) == true) return undefined;
    // const node = Node.search(root, value);
    // if (node == null) console.log('Element not found');
    // else console.log(node);
    // return 0;

    mode = 3;
    curr = root;
  }

  p5.setup = () => {
    insertForm = p5.createInput();
    insertForm.position(0, 70);
    insertForm.size(60);
    const insertButton = p5.createButton('Insert');
    insertButton.position(insertForm.x + insertForm.width, 70);
    insertButton.mousePressed(insert);

    deleteForm = p5.createInput();
    deleteForm.position(insertButton.x + insertButton.width + 10, 70);
    deleteForm.size(60);
    const deleteButton = p5.createButton('Delete');
    deleteButton.position(deleteForm.x + deleteForm.width, 70);
    deleteButton.mousePressed(del);

    searchForm = p5.createInput();
    searchForm.position(deleteButton.x + deleteButton.width + 10, 70);
    searchForm.size(60);
    const searchButton = p5.createButton('Find');
    searchButton.position(searchForm.x + searchForm.width, 70);
    searchButton.mousePressed(find);

    const printPreOrderButton = p5.createButton('Print Pre Order');
    printPreOrderButton.position(searchButton.x + searchButton.width + 10, 70);
    printPreOrderButton.mousePressed(printPreOrder);
    const printInOrderButton = p5.createButton('Print In Order');
    printInOrderButton.position(printPreOrderButton.x + printPreOrderButton.width + 10, 70);
    printInOrderButton.mousePressed(printInOrder);
    const printPostOrderButton = p5.createButton('Print Post Order');
    printPostOrderButton.position(printInOrderButton.x + printInOrderButton.width + 10, 70);
    printPostOrderButton.mousePressed(printPostOrder);

    const canvas = p5.createCanvas(1024, 768);
    canvas.position(0, 110);
  };

  p5.draw = () => {
    p5.frameRate(1);

    if (mode == -1) {
      Node.unhighlightAll(root);
      p5.noLoop();
    }

    switch (mode) {
      case 1: {
        if (root != null && curr != null) curr.highlighted = true;
        if (parentOfCurr != null) parentOfCurr.highlighted = false;
        if (curr == null) {
          msg = 'Found a null node. Inserted ' + value + '.';
          root = Node.push(p5, root, value, p5.width / 2, 50, null, 'root');
          mode = -1;
          curr = null;
          parentOfCurr = null;
          if (root.left != null) Node.updatePosition(root.left, p5);
          if (root.right != null) Node.updatePosition(root.right, p5);
        }
        else if (value < curr.data) {
          msg = value + ' < ' + curr.data + '. Looking at left subtree.';
          parentOfCurr = curr;
          curr = curr.left;
        }
        else if (value > curr.data) {
          msg = value + ' > ' + curr.data + '. Looking at right subtree.';
          parentOfCurr = curr;
          curr = curr.right;
        }
        break;
      }
      case 2: {
        break;
      }
      case 3: {
        if (root == null) {msg = 'Tree is empty'; mode = -1;}
        else {
          if (curr != null) curr.highlighted = true;
          if (parentOfCurr != null) parentOfCurr.highlighted = false;
          if (curr == null) {
            msg = 'Searching for ' + value + ' : (Element not found)';
            mode = -1;
            curr = null;
            parentOfCurr = null;
          }
          else if (value < curr.data) {
            msg = 'Searching for ' + value + ' : ' + value + ' < ' + curr.data + '. Looking at left subtree.';
            parentOfCurr = curr;
            curr = curr.left;
          }
          else if (value > curr.data) {
            msg = 'Searching for ' + value + ' : ' + value + ' > ' + curr.data + '. Looking at right subtree.';
            parentOfCurr = curr;
            curr = curr.right;
          }
          else {
            msg = 'Searching for ' + value + ' : ' + value + ' == ' + curr.data + '. Element found!';
            mode = -1;
            curr = null;
            parentOfCurr = null;
          }
        }
        break;
      }
      default: {
        break;
      }
    }

    p5.background(0);
    Node.display(p5, root);
    p5.fill('white');
    p5.textAlign(p5.LEFT);
    p5.text(msg, 30, 50);
  };

  p5.mousePressed = () => {
    p5.loop();
  }
});