class Population
{
  constructor(mutationRate, maxPop)
  {
    this.population = [];
    this.generation = 1;
    this.mutationRate = mutationRate;
    this.finished = false;
    this.toUpdate = false;
    this.velocity = 1;
    this.maxMoves = 5;
    this.reachedWin = false;

    for (var i = 0; i < maxPop; i++)
    {
      this.population[i] = new Player(this.maxMoves);
    }
  }

  naturalSelection()
  {
    var sum = 0;
    for (var o of this.population)
    {
      sum += o.fitness;
    }
    //normalizing the probability into the range 0-1
    for (var i = 0; i < this.population.length; i++)
    {
      this.population[i].prob = this.population[i].fitness / sum;
    }
  }

  generate()
  {
    if (this.finishedGeneration())
    {
      //add 5 moves every 5 generation (if not won)
      if (!this.reachedWin)
        if (++this.generation % 5 == 0)
          this.maxMoves += 5;

      var newPop = []
      for (var i = 0; i < this.population.length; i++)
      {
        //normalizes the probability
        this.naturalSelection();

        var parent1 = this.pickOne();
        var parent2 = this.pickOne();

        var childDNA = parent1.crossover(parent2);


        var child = new Player(this.maxMoves, childDNA);
        child.mutate(this.mutationRate);

        newPop[i] = child;

      }
      this.population = newPop;
      initRoads();
    }

  }

  finishedGeneration()
  {
    var finished = true;
    var won = true;
    for (var o of this.population)
    {
      if (!o.won)
      {
        won = false;
      }
      if (!o.finished)
      {
        finished = false;
      }
    }
    this.reachedWin = won;
    return finished;
  }

  calculateFitness()
  {
    for (var i = 0; i < this.population.length; i++)
    {
      if (!this.finished)
        this.population[i].calculateFitness();
    }
  }

  maxFitness()
  {
    let maxFitness = 0;
    for (let i = 0; i < this.population.length; i++)
    {
      if (this.population[i].fitness > maxFitness)
      {
        maxFitness = this.population[i].fitness;
      }
    }
    return maxFitness;
  }

  currentMax()
  {
    let maxFitness = -1;
    var current;
    for (let i = 0; i < this.population.length; i++)
    {
      if (this.population[i].fitness > maxFitness)
      {
        maxFitness = this.population[i].fitness;
        current = this.population[i];
      }
    }
    return current;
  }

  drawDebug()
  {

    for (var o of this.population)
    {
      if (!o.finished)
      {
        o.draw(color(255, 0, 0));
        // o.drawFitness(color(255, 0, 0));
      }

      if (o.won)
      {
        o.draw(color(255, 255, 255));
        // o.drawFitness(color(255, 255, 255));
      }
    }

    var cm = this.currentMax();
    if (cm.dead)
      cm.draw(color(0, 0, 255));
    else
      cm.draw(color(0, 255, 0));
  }

  draw()
  {
    var cm = this.currentMax();
    if (cm.dead)
      cm.draw(color(0, 0, 255));
    else
      cm.draw(color(0, 255, 0));

    for (var o of this.population)
    {
      if (o.won)
        o.draw(color(255, 255, 255));
    }

  }

  update()
  {

    for (var i = 0; i < this.velocity; i++)
    {
      for (var o of this.population)
      {
        if (!o.finished)
        {
          o.update();
        }
      }
    }
  }


  //pick one element of the population basing on its fitness and so to its probability
  pickOne()
  {
    var select = 0;
    var selector = Math.random();
    while (selector > 0)
    {
      selector -= this.population[select].prob;
      select++;
    }
    select--;
    return this.population[select];
  }
}