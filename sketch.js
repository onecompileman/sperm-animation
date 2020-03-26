let sperms = [];

// called 1 time, good for variable initialization
function setup() {
  createCanvas(innerWidth, innerHeight);
}

// 60 fps
function draw() {
  background(50);

  sperms = sperms.filter(sperm => {
    sperm.display();
    sperm.update();

    return sperm.headPosition.x < width + 200;
  });
}

function mousePressed() {
  sperms.push(
    new Sperm(
      createVector(mouseX, mouseY),
      color(random(0, 255), random(0, 255), random(0, 255))
    )
  );
}

class Sperm {
  constructor(headPosition, col) {
    this.headPosition = headPosition;
    this.col = col;
    this.tailsLength = 25;
    this.tails = [];

    this.velocity = createVector(3, 0);
  }

  display() {
    this.tails.forEach(tail => {
      push();
      fill(this.col);
      ellipse(tail.x, tail.y, 4, 4);
      pop();
    });

    push();
    fill(color(240, 240, 240));
    ellipse(this.headPosition.x, this.headPosition.y, 20, 20);
    pop();
  }

  update() {
    this.tails.push(this.headPosition.copy());

    if (this.tails.length === this.tailsLength) {
      this.tails.splice(0, 1);
    }

    // Update head pos
    this.velocity = createVector(3, random(-2, 2));
    this.headPosition.add(this.velocity);
  }
}
