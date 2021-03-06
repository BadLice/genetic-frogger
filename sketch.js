var player;
var roads = [];
var peep;
var mutationRate = 0.01;
var maxPop = 500;
var bestEver = null;
var showDebug = false;
var speed = 100;
var vel;
var highlightsBtn;

function setup()
{
  createCanvas(780, 800);
  initRoads();
  peep = new Population(mutationRate, maxPop);
  vel = createSlider(1, 100, 100);
  vel.position(width - 150, 10);
  // highlightsBtn = createButton("Show highlights");
  // highlightsBtn.mousePressed(peep.showHighLihts);
  // highlightsBtn.position(width - 300, 10);


}

function draw()
{
  if (peep.delay)
  {
    //0.5s of pause
    delay(0.5);
    peep.delay = false;
  }
  for (var i = 0; i < speed; i++)
  {
    background(0);
    drawAndUpdateRoads()

    if (this.speed > 10)
      showDebug = false;

    if (showDebug)
    {
      displayInfo();
      peep.drawDebug();
    }
    else
    {
      peep.draw();
      info();
    }
    peep.update();
    peep.generate();
  }

  this.speed = vel.value();

}

function initRoads()
{
  for (var i = 0; i < 14; i++)
  {
    roads[i] = new Road(height - (height / 14 * (i + 1)), floor(height / 14), color(0, 0, 0));
  }

  roads[0].col = color(255, 0, 255)
  roads[6].col = color(255, 0, 255)
  for (var i = 7; i < 12; i++)
  {
    roads[i].col = color(0, 0, 100);
  }
  roads[12].col = color(0, 255, 0);
  roads[13].col = color(0, 255, 0);

  roads[1].initCars1();
  roads[2].initCars2();
  roads[3].initCars1();
  roads[4].initCars2();
  roads[5].initCars1();
  roads[7].initTurtle3();
  roads[8].initTrunk1();
  roads[9].initTrunk2();
  roads[10].initTurtle2();
  roads[11].initTrunk3();
  roads[12].initWin();

  for (var i = 0; i < width; i++)
  {
    roads[1].update();
    roads[2].update();
    roads[5].update();
    roads[7].update();
    roads[8].update();
    roads[11].update();
  }

  for (var i = 0; i < width / 2; i++)
  {
    roads[3].update();
    roads[9].update();
    roads[10].update();
  }

  for (var i = 0; i < width / 5; i++)
  {
    roads[4].update();
  }
}

function drawAndUpdateRoads()
{
  for (var i = 0; i < 14; i++)
  {
    roads[i].update();
    roads[i].draw();
  }
}

function displayInfo()
{
  var best = peep.currentMax();
  if (best.fitness > bestEver)
    bestEver = best.fitness;

  fill(255, 255, 255, 150)
  rect(1, 1, 380, 120)
  textSize(20);
  fill(0, 0, 0);
  text("Best fitness: " + sqrt(bestEver) / 100, 10, 20);
  text("Generation: " + peep.generation, 10, 40);
  text(" Improve rate: " + map(best.fitness, 0, bestEver, 0, 1), 10, 60);
  text("Mutation rate: " + (mutationRate * 100) + "%", 10, 80);
  text("Population: " + maxPop, 10, 100);
  text("Moves number: " + peep.population[0].dna.length, 10, 120);


  precBest = best.fitness;

}

function info()
{
  textSize(20);
  fill(0, 0, 0);
  if (this.speed <= 10)
  {
    if (peep.highlights)
      text("You are watching highlights", 10, 20);
    else
    {
      text("Generation: " + peep.generation, 10, 20);
      text("Press a key for debug, press 'B' for highlights", 10, 40);
    }
  }
  else
  {
    text("Generation: " + peep.generation, 10, 20);
  }

}

function delay(s)
{
  var time = new Date().getTime();
  while (new Date().getTime() - time < s * 1000);
}

function keyPressed()
{
  if (keyCode == 66)
  {
    if (peep.best5.length > 0)
      peep.showHighLihts();
  }
  else
  {
    if (!this.highlights)
      showDebug = !showDebug;
  }

}