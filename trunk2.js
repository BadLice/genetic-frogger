class Trunk2 extends Obj
{
  constructor(x, y)
  {
    var w = 350;
    var h = 40;
    var col = color(150, 0, 0);
    super(x, y, w, h, col);
    this.speed = 4;
    //distance from next car1
    this.d = 600 / this.speed;
    this.walked = 0;
    this.dir = 1; //-1=from right to left,1 viceversa
  }

  update()
  {
    for (var i = 0; i < this.speed; i++)
    {
      this.x += 1;
      this.walked++;
    }
  }

  collision(x, y, w, h)
  {
    return [super.collision(x, y, w, h), this];
  }
}