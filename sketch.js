let root = null;
let num = [30, 15, 37, 7, 26, 19, 28, 32, 45, 34, 42, 36, 35, 31, 33, 6, 5, 4, 3, 29];
// let num = [1000, 500, 2000, 505, 506, 1999, 1998, 504, 499, 498, 497, 496];
// let num = [1000, 500, 2000, 505, 506, 1999, 504, 499, 1996, 2001];
// let num = [1000, 500, 2000, 499];
let i = 0;
let maxHeight = 1;
let consolePrinting = true;

function setup() {
  createCanvas(1024, 768);
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
  if (i !== num.length) {
    console.log('INSERTING ' + num[i]);
    root = Node.push(root, num[i], width / 2, 50, null, 'root');

    if (root.left != null) {
      Node.updatePosition(root.left);
    }
    if (root.right != null) {
      Node.updatePosition(root.right);
    }
    i++;
  }
  if (i === num.length && consolePrinting) {
    console.log('------'); Node.printPreOrder(root); consolePrinting = false;
  }

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
