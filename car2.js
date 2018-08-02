class Car2 extends Obj
{
  constructor(x, y)
  {
    var w = 40;
    var h = 40;
    var col = color(floor(random(255)), floor(random(255)), floor(random(255)));
    super(x, y, w, h, col);
    this.speed = 1;
    //distance from next car2
    this.d = 360 / this.speed;
    this.walked = 0;
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
    return [super.collision(x, y, w, h), 1]
  }
}