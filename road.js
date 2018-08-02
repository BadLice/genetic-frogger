class Road
{
  constructor(y, h, col, objs)
  {
    this.y = y;
    this.h = h;
    this.col = col;
    this.objs = [];
    this.addedCar1 = false;
    this.addedCar1 = false;
    this.addedTurtle3 = false;
    this.addedTrunk1 = false;
    this.addedTrunk2 = false;
    this.cicles = 0;
  }

  draw()
  {
    push()
    noStroke();
    fill(this.col)
    rectMode(CORNER)
    translate(0, this.y)
    rect(0, 0, width, this.h + 1)
    pop()

    this.drawObjs();
  }

  update()
  {
    this.updateObjs();
  }

  drawObjs()
  {
    if (this.objs.length > 0)
    {
      for (var o of this.objs)
      {
        o.draw();
      }
    }
  }

  updateObjs()
  {
    if (this.objs.length > 0)
    {
      //pushing object when nedded
      if (this.objs[0] instanceof Car1)
      {
        if (this.cicles > this.objs[0].d)
        {
          this.objs.push(this.nextCar1());
          this.cicles = 0;
        }
        if (this.objs[0].x + (this.objs[0].w / 2) < 0)
        {
          this.objs.splice(0, 1);
          this.addedCar1 = false;
        }
      }

      if (this.objs[0] instanceof Car2)
      {
        if (this.cicles > this.objs[0].d)
        {
          this.objs.push(this.nextCar2());
          this.cicles = 0;
        }
        if (this.objs[0].x - (this.objs[0].w / 2) > width)
        {
          this.objs.splice(0, 1);
          this.addedCar2 = false;
        }
      }

      if (this.objs[0] instanceof Turtle3)
      {
        if (this.cicles > this.objs[0].d)
        {
          this.objs.push(this.nextTurtle3());
          this.cicles = 0;
        }
        if (this.objs[0].x + (this.objs[0].w / 2) < 0)
        {
          this.objs.splice(0, 1);
          this.addedTurtle3 = false;
        }
      }

      if (this.objs[0] instanceof Turtle2)
      {
        if (this.cicles > this.objs[0].d)
        {
          this.objs.push(this.nextTurtle2());
          this.cicles = 0;
        }
        if (this.objs[0].x + (this.objs[0].w / 2) < 0)
        {
          this.objs.splice(0, 1);
          this.addedTurtle2 = false;
        }
      }

      if (this.objs[0] instanceof Trunk1)
      {
        if (this.cicles > this.objs[0].d)
        {
          this.objs.push(this.nextTrunk1());
          this.cicles = 0;
        }
        if (this.objs[0].x - (this.objs[0].w / 2) > width)
        {
          this.objs.splice(0, 1);
          this.addedTrunk1 = false;
        }
      }

      if (this.objs[0] instanceof Trunk2)
      {
        if (this.cicles > this.objs[0].d)
        {
          this.objs.push(this.nextTrunk2());
          this.cicles = 0;
        }
        if (this.objs[0].x - (this.objs[0].w / 2) > width)
        {
          this.objs.splice(0, 1);
          this.addedTrunk2 = false;
        }
      }

      if (this.objs[0] instanceof Trunk3)
      {
        if (this.cicles > this.objs[0].d)
        {
          this.objs.push(this.nextTrunk3());
          this.cicles = 0;
        }
        if (this.objs[0].x - (this.objs[0].w / 2) > width)
        {
          this.objs.splice(0, 1);
          this.addedTrunk3 = false;
        }
      }


      //moving object
      for (var o of this.objs)
      {
        o.update();
      }
    }
    this.cicles++
  }

  initCars1()
  {
    this.objs.push(this.nextCar1())
  }
  initCars2()
  {
    this.objs.push(this.nextCar2());
  }
  initTurtle3()
  {
    this.objs.push(this.nextTurtle3());
  }
  initTurtle2()
  {
    this.objs.push(this.nextTurtle2());
  }
  initTrunk1()
  {
    this.objs.push(this.nextTrunk1());
  }
  initTrunk2()
  {
    this.objs.push(this.nextTrunk2());
  }
  initTrunk3()
  {
    this.objs.push(this.nextTrunk3());
  }
  initWin()
  {
    for (var i = 0; i < 5; i++)
    {
      this.objs.push(new Win((width / 5 * i) + (35 * 3) / 2 + 25, this.y + this.h / 2 - 32));
    }
  }

  nextCar1()
  {
    return new Car1(width + 40, this.y + (this.h / 2));
  }
  nextCar2()
  {
    return new Car2(-40, this.y + (this.h / 2));
  }
  nextTurtle3()
  {
    return new Turtle3(width + 120, this.y + (this.h / 2));
  }
  nextTurtle2()
  {
    return new Turtle2(width + 120, this.y + (this.h / 2));
  }
  nextTrunk1()
  {
    return new Trunk1(-120, this.y + (this.h / 2));
  }
  nextTrunk2()
  {
    return new Trunk2(-200, this.y + (this.h / 2));
  }
  nextTrunk3()
  {
    return new Trunk3(-200, this.y + (this.h / 2));
  }
}