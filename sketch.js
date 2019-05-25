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

function printPreOrder() {
  Node.printPreOrder(root);
  console.log(msg);
  msg = '';
  return 0;
}

function printInOrder() {
  Node.printInOrder(root);
  console.log(msg);
  msg = '';
  return 0;
}

function printPostOrder() {
  Node.printPostOrder(root);
  console.log(msg);
  msg = '';
  return 0;
}

function insert() {
  const value = insertForm.value();
  insertForm.value('');
  if (value == '') return undefined;
  root = Node.push(root, value, width / 2, 50, null, 'root');
  if (root.left != null) {
    Node.updatePosition(root.left);
  }
  if (root.right != null) {
    Node.updatePosition(root.right);
  }
  return 0;
}

function del() {
  const value = deleteForm.value();
  deleteForm.value('');
  if (value == '') return undefined;
  root = Node.pop(root, value);
  if (root == null) return 0;
  if (root.left != null) {
    Node.updatePosition(root.left);
  }
  if (root.right != null) {
    Node.updatePosition(root.right);
  }
  return 0;
}

function find() {
  const value = searchForm.value();
  searchForm.value('');
  if (value == '') return undefined;
  const node = Node.search(root, value);
  if (node == null) console.log('Element not found');
  else console.log(node);
  return 0;
}

function setup() {
  insertForm = createInput();
  insertForm.position(0, 70);
  insertForm.size(60);
  const insertButton = createButton('Insert');
  insertButton.position(insertForm.x + insertForm.width, 70);
  insertButton.mousePressed(insert);

  deleteForm = createInput();
  deleteForm.position(insertButton.x + insertButton.width + 10, 70);
  deleteForm.size(60);
  const deleteButton = createButton('Delete');
  deleteButton.position(deleteForm.x + deleteForm.width, 70);
  deleteButton.mousePressed(del);

  searchForm = createInput();
  searchForm.position(deleteButton.x + deleteButton.width + 10, 70);
  searchForm.size(60);
  const searchButton = createButton('Find');
  searchButton.position(searchForm.x + searchForm.width, 70);
  searchButton.mousePressed(find);

  const printPreOrderButton = createButton('Print Pre Order');
  printPreOrderButton.position(searchButton.x + searchButton.width + 10, 70);
  printPreOrderButton.mousePressed(printPreOrder);
  const printInOrderButton = createButton('Print In Order');
  printInOrderButton.position(printPreOrderButton.x + printPreOrderButton.width + 10, 70);
  printInOrderButton.mousePressed(printInOrder);
  const printPostOrderButton = createButton('Print Post Order');
  printPostOrderButton.position(printInOrderButton.x + printInOrderButton.width + 10, 70);
  printPostOrderButton.mousePressed(printPostOrder);

  const canvas = createCanvas(1024, 768);
  canvas.position(0, 110);
  // for (let i = 0; i < num.length; i += 1) {
  //   console.log('INSERTING ' + num[i]);
  //   root = Node.push(root, num[i], width / 2, 50, null, 'root');

  //   if (root.left != null) {
  //     Node.updatePosition(root.left);
  //   }
  //   if (root.right != null) {
  //     Node.updatePosition(root.right);
  //   }
  // }

}

function draw() {
  frameRate(2);
  // if (i !== num.length) {
  //   console.log('INSERTING ' + num[i]);
  //   root = Node.push(root, num[i], width / 2, 50, null, 'root');

  //   if (root.left != null) {
  //     Node.updatePosition(root.left);
  //   }
  //   if (root.right != null) {
  //     Node.updatePosition(root.right);
  //   }
  //   i++;
  // }
  // if (i === num.length && consolePrinting) {
  //   console.log('------'); Node.printPreOrder(root); consolePrinting = false;
  // }

  // if (i >= 0) {
  //   console.log('INSERTING ' + num[i]);
  //   root = Node.pop(root, num[i]);

  //   if (root.left != null) {
  //     Node.updatePosition(root.left);
  //   }
  //   if (root.right != null) {
  //     Node.updatePosition(root.right);
  //   }
  //   i--;
  // }
  background(0);
  Node.display(root);
  noLoop();
}

function mousePressed() {
  loop();
}
