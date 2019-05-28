/* eslint-disable func-names */
/* eslint-disable prefer-destructuring */

// BEGIN PREDEFINED DATASETS
/* TODO: enable users to autofill tree with one of these datasets */
// let num = [30, 15, 37, 7, 26, 19, 28, 32, 45, 34, 42, 36, 35, 31, 33, 6, 5, 4, 3, 29];
// let num = [1000, 500, 2000, 505, 506, 1999, 1998, 504, 499, 498, 497, 496];
// let num = [1000, 500, 2000, 505, 506, 1999, 504, 499, 1996, 2001];
// let num = [1000, 500, 2000, 499];
// END PREDEFINED DATASETS

let tree = null;
let insertForm;
let insertButton;
let deleteForm;
let deleteButton;
let searchForm;
let searchButton;
let printInOrderButton;
let printPreOrderButton;
let printPostOrderButton;
let undoButton;
let lastMsg = '';
let printOutput = '';
let value;
let worker;
let payload;

function enableUI() {
  insertForm.removeAttribute('disabled');
  insertButton.removeAttribute('disabled');
  deleteForm.removeAttribute('disabled');
  deleteButton.removeAttribute('disabled');
  searchForm.removeAttribute('disabled');
  searchButton.removeAttribute('disabled');
  printPreOrderButton.removeAttribute('disabled');
  printInOrderButton.removeAttribute('disabled');
  printPostOrderButton.removeAttribute('disabled');
  undoButton.removeAttribute('disabled');
}

function disableUI() {
  insertForm.attribute('disabled', '');
  insertButton.attribute('disabled', '');
  deleteForm.attribute('disabled', '');
  deleteButton.attribute('disabled', '');
  searchForm.attribute('disabled', '');
  searchButton.attribute('disabled', '');
  printPreOrderButton.attribute('disabled', '');
  printInOrderButton.attribute('disabled', '');
  printPostOrderButton.attribute('disabled', '');
  undoButton.attribute('disabled', '');
}

function undo() {
  payload = ['Undo'];
  worker.postMessage(payload);
  worker.onmessage = function (event) {
    tree = event.data[0];
    lastMsg = event.data[1];
  }
  undoButton.attribute('disabled', ''); // disabled undo button after use.
}

function displayNode(curr) {
  if (curr != null) {
    ellipseMode(CENTER);
    textAlign(CENTER);
    stroke('white');
    strokeWeight(3);
    if (curr.left != null) line(curr.x, curr.y, curr.left.x, curr.left.y);
    if (curr.right != null) line(curr.x, curr.y, curr.right.x, curr.right.y);
    noStroke();
    fill('red');
    if (curr.highlighted) ellipse(curr.x, curr.y, 40, 40);
    fill('white');
    ellipse(curr.x, curr.y, 30, 30);
    fill('black');
    text(curr.data, curr.x, curr.y + 5);
    displayNode(curr.left);
    displayNode(curr.right);
  }
}

function printPreOrder() {
  disableUI();
  lastMsg = '';
  printOutput = '';
  payload = ['Print Pre Order'];
  worker.postMessage(payload); // send message 'Print Pre Order' to the worker thread to print all elements pre-orderly
  worker.onmessage = function (event) {
    tree = event.data[0];
    lastMsg = event.data[1];
    printOutput += event.data[2]; 
    if (event.data[3] === 'Finished') enableUI();
  };
  return 0;
}

function printInOrder() {
  disableUI();
  lastMsg = '';
  printOutput = '';
  payload = ['Print In Order'];
  worker.postMessage(payload); // send message 'Print In Order' to the worker thread to print all elements in-orderly
  worker.onmessage = function (event) {
    tree = event.data[0];
    lastMsg = event.data[1];
    printOutput += event.data[2]; 
    if (event.data[3] === 'Finished') enableUI();
  };
  return 0;
}

function printPostOrder() {
  disableUI();
  lastMsg = '';
  printOutput = '';
  payload = ['Print Post Order'];
  worker.postMessage(payload); // send message 'Print Post Order' to the worker thread to print all elements post-orderly
  worker.onmessage = function (event) {
    tree = event.data[0];
    lastMsg = event.data[1];
    printOutput += event.data[2]; 
    if (event.data[3] === 'Finished') enableUI();
  };
  return 0;
}

function insert() {
  value = parseInt(insertForm.value(), 10);
  insertForm.value('');
  if (isNaN(value) === true) return undefined;
  disableUI();
  payload = ['Insert', value, width];
  worker.postMessage(payload); // send message 'Insert', inputted value and canvas width to ask the Tree to insert new element
  worker.onmessage = function (event) {
    tree = event.data[0]; // receive our tree modifications from the worker thread so the browser's main thread can display changes at each step in the algo instead of the final change
    lastMsg = event.data[1]; // also receive message from the worker thread after each step in the algorithm is done
    if (event.data[2] === 'Finished') {
      enableUI();
      undoButton.removeAttribute('disabled'); // enable undo button after insert operation
    }
  };
  return 0;
}

function del() {
  value = parseInt(deleteForm.value(), 10);
  deleteForm.value('');
  if (isNaN(value) === true) return undefined;
  disableUI();
  payload = ['Delete', value];
  worker.postMessage(payload); // send message 'Delete' and inputted value to ask the Tree to delete an element
  worker.onmessage = function (event) {
    tree = event.data[0]; // receive our tree modifications from the worker thread so the browser's main thread can display changes at each step in the algo instead of the final change
    lastMsg = event.data[1]; // also receive message from the worker thread after each step in the algorithm is done
    if (event.data[2] === 'Finished') {
      enableUI();
      undoButton.removeAttribute('disabled'); // enable undo button after delete operation
    }
  };
  return 0;
}

function find() {
  value = parseInt(searchForm.value(), 10);
  searchForm.value('');
  if (isNaN(value) === true) return undefined;
  disableUI();
  payload = ['Find', value];
  worker.postMessage(payload); // send message 'Find' and inputted value to ask the Tree to find an element
  worker.onmessage = function (event) {
    tree = event.data[0]; // receive our tree modifications from the worker thread so the browser's main thread can display changes at each step in the algo instead of the final change
    lastMsg = event.data[1]; // also receive message from the worker thread after each step in the algorithm is done
    if (event.data[2] === 'Finished') enableUI();
  };
  return 0;
}

function setup() {
  // INITIALIZE WEB WORKER THREAD FOR THE TREE ALGORITHMS AND VISUALIZATION
  worker = new Worker('tree.js');

  // BEGIN INSERT FORM AND BUTTON
  insertForm = createInput();
  insertForm.position(0, 70);
  insertForm.size(60);
  insertButton = createButton('Insert');
  insertButton.position(insertForm.x + insertForm.width, 70);
  insertButton.mousePressed(insert);
  // END INSERT FORM AND BUTTON

  // BEGIN DELETE FORM AND BUTTON
  deleteForm = createInput();
  deleteForm.position(insertButton.x + insertButton.width + 10, 70);
  deleteForm.size(60);
  deleteButton = createButton('Delete');
  deleteButton.position(deleteForm.x + deleteForm.width, 70);
  deleteButton.mousePressed(del);
  // END DELETE FORM AND BUTTON


  // BEGIN SEARCH FORM AND BUTTON
  searchForm = createInput();
  searchForm.position(deleteButton.x + deleteButton.width + 10, 70);
  searchForm.size(60);
  searchButton = createButton('Find');
  searchButton.position(searchForm.x + searchForm.width, 70);
  searchButton.mousePressed(find);
  // END SEARCH FORM AND BUTTON

  // BEGIN PRINT BUTTONS
  printPreOrderButton = createButton('Print Pre Order');
  printPreOrderButton.position(searchButton.x + searchButton.width + 10, 70);
  printPreOrderButton.mousePressed(printPreOrder);
  printInOrderButton = createButton('Print In Order');
  printInOrderButton.position(printPreOrderButton.x + printPreOrderButton.width + 10, 70);
  printInOrderButton.mousePressed(printInOrder);
  printPostOrderButton = createButton('Print Post Order');
  printPostOrderButton.position(printInOrderButton.x + printInOrderButton.width + 10, 70);
  printPostOrderButton.mousePressed(printPostOrder);
  // END PRINT BUTTONS

  // BEGIN UNDO BUTTON TO REVERT TO PREVIOUS STATE
  undoButton = createButton('Undo');
  undoButton.position(printPostOrderButton.x + printPostOrderButton.width + 10, 70);
  undoButton.mousePressed(undo);
  undoButton.attribute('disabled', '');
  // END UNDO BUTTON TO REVERT TO PREVIOUS STATE

  // SET CANVAS AND TEXT SIZE
  const canvas = createCanvas(1024, 500);
  canvas.position(0, 110);
  textSize(15);
}

function draw() {
  background(0);
  displayNode(tree);
  fill('white');
  textAlign(LEFT);
  text(lastMsg, 30, 50);
  text(printOutput, 30, 70);
}
