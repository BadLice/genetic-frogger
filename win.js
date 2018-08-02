class Win extends Obj
{
  constructor(x, y)
  {
    var w = 35 * 3;
    var h = 120;
    var col = color(0, 0, 255);
    super(x, y, w, h, col);
    this.speed = 2;
    //distance from next car1
    this.d = 250 / this.speed;
    this.walked = 0;
    this.dir = 0; //-1=from right to left,1 viceversa,0 stop
  }

  collision(x, y, w, h)
  {
    return [super.collision(x, y, w, h), this];
  }

}