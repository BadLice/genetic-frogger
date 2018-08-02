class Turtle2 extends Obj
{
  constructor(x, y)
  {
    var w = 93;
    var h = 40;

    super(x, y, w, h);
    this.speed = 2;
    //distance from next car1
    this.d = 250 / this.speed;
    this.walked = 0;
    this.dir = -1; //-1=from right to left,1 viceversa
    this.canDisappear = false; //(random(1) < 0.3);
    this.show = true;
    this.cicles = random(100, 250);
    this.defaultColor = color(0, 255, 0);
  }

  update()
  {
    for (var i = 0; i < this.speed; i++)
    {
      this.x -= 1;
      this.walked++;
    }

    if (this.canDisappear)
    {
      this.cicles--;
      if (this.cicles <= 0)
      {
        this.show = !this.show;
        this.cicles = 200;
      }
    }
  }

  draw()
  {
    if (this.cicles < 60)
    {
      this.col = color(255, 0, 0);
    }
    else
    {
      this.col = this.defaultColor;
    }
    if (this.show)
    {
      super.draw();
    }
  }

  collision(x, y, w, h)
  {
    if (this.show)
      return [super.collision(x, y, w, h), this];
    else
      return [false, false];
  }
}