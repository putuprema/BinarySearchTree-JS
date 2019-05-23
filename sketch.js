let root;

function setup() {
  createCanvas(800, 600);
  // // push(root, 5);
  // Node.push(5);
  // // console.log(root);
  // Node.push(6);
  // // console.log(root);
  // Node.push(3);
  // // console.log(root);
  // Node.printInOrder(root);

  let num = [30, 15, 37, 7, 26, 19, 28, 32, 45, 34, 42, 36, 35];
  // console.log(num);
  for (let i = 0; i < num.length; i += 1) Node.push(num[i]);
  Node.printPreOrder(root);
  console.log('DELETING A NODE');
  Node.pop(root, 37);
  console.log('AFTER DELETION:');
  Node.printPreOrder(root);
  noLoop();
}

function draw() {
  // Node.push(5);
}
