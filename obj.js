class Obj
{
  constructor(x, y, w, h, col)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = col;
  }

  draw()
  {
    push();
    fill(this.col);
    stroke(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
  update()
  {
    return;
  }
  collision(x, y, w, h)
  {
    return (x >= this.x - (this.w / 2) && x <= this.x + (this.w / 2) && y >= this.y - (this.h / 2) && y <= this.y + (this.h / 2));
  }
}