/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
/* eslint-disable brace-style */
export default class Node {
  constructor(p5, data, height, x, y, parent, loc) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = parent;
    this.loc = loc;
    this.height = height;
    this.balanceFactor = 0;
    this.x = p5.width / 2;
    this.y = y;
    this.highlighted = false;
  }

  display(p5) {
    p5.ellipseMode(p5.CENTER);
    p5.textAlign(p5.CENTER);
    p5.textSize(15);
    p5.stroke('white');
    p5.strokeWeight(3);
    if (this.left != null) p5.line(this.x, this.y, this.left.x, this.left.y);
    if (this.right != null) p5.line(this.x, this.y, this.right.x, this.right.y);
    p5.noStroke();
    p5.fill('red');
    if (this.highlighted) p5.ellipse(this.x, this.y, 40, 40);
    p5.fill('white');
    p5.ellipse(this.x, this.y, 30, 30);
    p5.fill('black');
    p5.text(this.data, this.x, this.y + 5);
  }

  static display(p5, curr) {
    if (curr != null) {
      curr.display(p5);
      Node.display(p5, curr.left);
      Node.display(p5, curr.right);
    }
  }

  static search(curr, key) {
    if (curr == null) return null;
    if (key < curr.data) return Node.search(curr.left, key);
    else if (key > curr.data) return Node.search(curr.right, key);
    else return curr;
  }

  static pop(startingNode, key) {
    let node = startingNode;
    if (!node) {console.log('specified number does not exist'); return null;}
    else {
      if (key < node.data) node.left = Node.pop(node.left, key);
      else if (key > node.data) node.right = Node.pop(node.right, key);
      else {
        if (!node.left && !node.right) {
          node = null;
        }
        else if (!node.left) { // if node has RIGHT child
          let del = node;
          node = node.right;
          del = null;
          node.y -= 40;
        }
        else if (!node.right) { // if node has LEFT child
          let del = node;
          node = node.left;
          del = null;
          node.y -= 40;
        }
        else { // if node has TWO children
          let largestLeft = node.left;
          while (largestLeft.right) largestLeft = largestLeft.right;
          node.data = largestLeft.data;
          node.left = Node.pop(node.left, largestLeft.data);
        }
      }
    }
    if (node == null) return node;

    node.height = Math.max(Node.getHeight(node.left), Node.getHeight(node.right)) + 1;

    return node;
  }

  static getHeight(node) {
    if (node == null) return 0;
    return node.height;
  }

  static push(p5, node, data, posX, posY, parent, loc) {
    let curr = node;

    if (curr == null) {
      curr = new Node(p5, data, 1, posX, posY, parent, loc);
    }
    else if (data < curr.data) {
      curr.left = Node.push(p5, curr.left, data, posX, posY + 40, curr, 'left');
    }
    else if (data > curr.data) {
      curr.right = Node.push(p5, curr.right, data, posX, posY + 40, curr, 'right');
    }

    curr.height = Math.max(Node.getHeight(curr.left), Node.getHeight(curr.right)) + 1;

    return curr;
  }

  static updatePosition(node, p5) {
    if (node != null) {
      if (node.loc == 'left') {
        console.log('updating node ' + node.data + ' position');
        console.log(node.data + '.x = ' + node.parent.data + '.x ' + ' - (2 ^ '  + (Node.getHeight(node.right) + 1) + ' * 10)');
        node.x = node.parent.x - (p5.pow(2, Node.getHeight(node.right) + 1) * 10);
      }
      else if (node.loc == 'right') {
        console.log('updating node ' + node.data + ' position');
        console.log(node.data + '.x = ' + node.parent.data + '.x ' + ' + (2 ^ '  + (Node.getHeight(node.left) + 1) + ' * 10)');
        node.x = node.parent.x + (p5.pow(2, Node.getHeight(node.left) + 1) * 10);
      }
      Node.updatePosition(node.left, p5);
      Node.updatePosition(node.right, p5);
    }
  }

  static printPreOrder(p5, node) {
    if (node !== null) {
      // console.log(node);
      p5.msg += node.data + ' ';
      this.printPreOrder(p5, node.left);
      this.printPreOrder(p5, node.right);
    }
  }

  static printInOrder(p5, node) {
    if (node !== null) {
      this.printInOrder(p5, node.left);
      // console.log(node);
      p5.msg += node.data + ' ';
      this.printInOrder(p5, node.right);
    }
  }

  static printPostOrder(p5, node) {
    if (node !== null) {
      this.printPostOrder(p5, node.left);
      this.printPostOrder(p5, node.right);
      p5.msg += node.data + ' ';
      // console.log(node);
    }
  }

  static unhighlightAll(node) {
    if (node !== null) {
      node.highlighted = false;
      this.unhighlightAll(node.left);
      this.unhighlightAll(node.right);
    }
  }
}
