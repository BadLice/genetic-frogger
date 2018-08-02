class Player
{
  constructor(nMoves, childDNA)
  {
    this.x = (width / 2);
    this.y = height - 28;
    this.w = 35;
    this.speed = floor(height / 14);
    this.canMove = true;
    this.col = color(255, 0, 0);
    this.roadCount = 0;
    this.countdown = 1;
    this.attached = false;
    this.attachedObj = undefined;
    this.attachedDist = 0;
    this.won = false;
    this.dead = false;

    this.fitness = 0;
    this.nMoves = nMoves;
    this.dnaIndex = 0;
    this.finished = false;
    this.fpsCount = 0;
    this.fpsInterval = 10;
    this.movesCount = 0;
    this.dna = [];

    if (childDNA === undefined)
    {
      for (var i = 0; i < this.nMoves; i++)
      {
        this.dna.push(
        {
          move: random(1),
          fpsInterval: random(1)
        });
      }
    }
    else
    {
      //need this for otherwise dna is assigned by reference and avery player will got the same dna
      for (var i = 0; i < this.nMoves; i++)
      {
        if (i < childDNA.length)
          this.dna.push(
          {
            move: childDNA[i].move,
            fpsInterval: childDNA[i].fpsInterval
          });
        else
          this.dna.push(
          {
            move: random(1),
            fpsInterval: random(1)
          });
      }

    }
  }

  update()
  {
    this.moveDna();
    // this.moveKeyboard();
    var coll = this.collision();
    if (this.roadCount > 6)
    {
      if (!coll[0] || this.x + this.w / 2 < 0 || this.x - this.w / 2 > width || coll[1] instanceof Win)
      {
        if (coll[1] instanceof Win)
        {
          this.win();
        }
        else
        {
          this.die();
        }
      }
      else
      {
        //coll[1] -> contiene ll'oggetto con cui è in collisione (tronco o tartaruga)
        if (!this.attached || this.attachedObj != coll[1])
        {

          this.attached = true;
          this.attachedObj = coll[1];
          this.attachedDist = this.attachedObj.x - this.x;
        }
      }
    }
    else
    {
      this.attached = false;
      if (coll[0])
      {
        this.die();
      }
    }

    this.scorr();
    this.calculateFitness();

  }

  scorr()
  {
    if (this.attached)
    {
      for (var i = 0; i < this.attachedObj.speed; i++)
      {
        this.x += 1 * this.attachedObj.dir;
      }
    }
  }

  collision()
  {
    for (var r of roads)
    {
      for (var o of r.objs)
      {
        var coll = o.collision(this.x, this.y, this.w, this.w);
        if (coll[0])
          return coll;
      }
    }
    return [false, 0];
  }

  //moves using kayboard (for humans,not used)
  moveKeyboard()
  {
    if (keyIsPressed)
    {
      if (this.canMove)
      {
        if (!this.reachedEdges(keyCode))
        {
          //update road counter
          if (keyCode === UP_ARROW)
          {
            this.roadCount++;
          }

          if (keyCode === DOWN_ARROW)
          {
            this.roadCount--;
          }

          //effectively move the player
          for (var i = 0; i < this.speed; i++)
          {
            this.canMove = false;
            //update collision
            if (keyCode === UP_ARROW)
            {
              this.y -= 1;
            }

            if (keyCode === DOWN_ARROW)
            {
              this.y += 1;
            }

            if (keyCode === LEFT_ARROW)
            {
              this.x -= 1;
            }

            if (keyCode === RIGHT_ARROW)
            {
              this.x += 1;
            }
          }
        }
      }
    }
    else
    {
      this.canMove = true;
    }
  }

  //moves using dna
  moveDna()
  {
    if (!this.finished)
    {
      //makes a move every 30 fps (0.5 seconds);
      if (this.dnaIndex < this.dna.length)
      {
        if (this.fpsCount >= map(this.dna[this.dnaIndex].fpsInterval, 0, 1, 0, 60))
        {
          this.fpsCount = 0;
          if (this.canMove)
          {
            this.movesCount++;
            var k = this.getKeyCode(this.dna[this.dnaIndex].move);

            if (!this.reachedEdges(k))
            {

              //update road counter
              if (k === UP_ARROW)
              {
                this.roadCount++;
              }

              if (k === DOWN_ARROW)
              {
                this.roadCount--;
              }

              //effectively move the player
              for (var i = 0; i < this.speed; i++)
              {
                this.canMove = false;
                //update collision
                if (k === UP_ARROW)
                {
                  this.y -= 1;
                }

                if (k === DOWN_ARROW)
                {
                  this.y += 1;
                }

                if (k === LEFT_ARROW)
                {
                  this.x -= 1;
                }

                if (k === RIGHT_ARROW)
                {
                  this.x += 1;
                }
              }

            }
          }
          else
          {
            this.canMove = true;
          }
          this.dnaIndex++;
        }
        else
        {
          this.fpsCount++;
        }
      }
      else
      {
        this.finished = true;
      }
    }
  }


  //gets corresponding keycode of dna value
  getKeyCode(val)
  {
    if (val < 1 / 5)
      return UP_ARROW;

    if (val < 2 / 5)
      return DOWN_ARROW;

    if (val < 3 / 5)
      return RIGHT_ARROW;

    if (val < 4 / 5)
      return LEFT_ARROW;

    return 60; //random number = no key
  }

  reachedEdges(key)
  {
    var left = 0,
      right = 0,
      up = 0,
      down = 0;
    switch (key)
    {
      case UP_ARROW:
        up = this.speed;
        break;
      case DOWN_ARROW:
        down = this.speed;
        break;
      case LEFT_ARROW:
        left = this.speed;
        break;
      case RIGHT_ARROW:
        right = this.speed;
        break;

    }
    return (this.x + (this.w / 2) + right > width || this.x - (this.w / 2) - left < 0 || this.y + (this.w / 2) + down > height || this.y - (this.w / 2) - up < 0);
  }

  draw(col)
  {
    if (col === undefined)
    {
      col = this.col;
    }

    push();
    translate(this.x, this.y);

    rectMode(CENTER);
    stroke(72);
    strokeWeight(4)
    fill(col);
    rect(0, 0, this.w, this.w);
    pop();
  }

  drawFitness(col)
  {
    if (col === undefined)
    {
      col = this.col;
    }


    push();
    translate(this.x, this.y);
    stroke(72);
    strokeWeight(4)
    fill(col);
    this.calculateFitness();
    text(this.fitness * 1000000, -15, 0);
    pop();
  }

  die()
  {
    this.dead = true;
    this.won = false;
    this.finished = true;
    this.calculateFitness();

  }

  win()
  {
    this.won = true;
    this.dead = false;
    this.finished = true;
    this.calculateFitness();
  }

  crossover(parent)
  {
    var childDNA = [];
    var r = random(this.dna.length);
    for (var i = 0; i < this.dna.length; i++)
    {
      if (i < r)
        childDNA.push(this.dna[i]);
      else
        childDNA.push(parent.dna[i]);
    }
    return childDNA;
  }

  mutate(mr)
  {
    for (var i = 0; i < this.dna.length; i++)
    {
      if (random(1) < mr)
        this.dna[i] = {
          move: random(1),
          fpsInterval: random(1)
        };
    }
  }

  calculateFitness()
  {
    this.fitness = pow(1 / this.y, 2);

    if (this.won)
    {
      this.fitness = pow(100000000 / this.y * this.movesCount, 2);
    }

    if (this.dead)
      this.fitness *= 0.9;
  }

  reset()
  {
    resetSketch();
  }
}