var PLAY = 0;
var END = 1;
var COMPLETE = 2;
var START = 3;
var gameState = START;
var quince, quinceImg;
var ground, groundImg;
var flowerGroup, ghostGroup;
var flowerImg, ghostImg;
var flowerCount = 0;
var deathCount = 0;

function preload(){
  quinceImg = loadAnimation("Run_1.png","Run_2.png");

  groundImg = loadImage("bg_grave.png");
  flowerImg = loadImage("Pink_Flower.png");
  ghostImg = loadImage("Grave_Ghost.png");
}

function setup() {
   //createCanvas(600,600);
   createCanvas(displayWidth - 20, displayHeight-10);
   //ground = createSprite(300, 0, 600, 2000);
   ground = createSprite(displayWidth/2, 0, 600, 2000);
   ground.addImage("ground",groundImg);
   ground.scale = 1;
   ground.y = ground.height /2;
  
   //quince = createSprite(300, 100, 15, 25);
   quince = createSprite(displayWidth/2, 100, 15, 25)
   quince.addAnimation("RunQuince",quinceImg);
   quince.scale = 0.5;
  

  flowerGroup = new Group();
  ghostGroup = new Group();
}

function draw() {
  background(0);
  drawSprites();
  //text("Flowers: " + flowerCount, 500,50);
  //text("Death Count: " + deathCount, 40,50);
  textSize(20);
  fill("white");
  text("Flowers: " + flowerCount, displayWidth - 150, displayHeight-720);
  text("Death Count: " + deathCount, 40 ,displayHeight-720);
  if(gameState === START){
    textSize(12);
    /*
    text("Help Quince gather enough flowers to make a bouquet for her deceased dog Stone.", 90, 250);
      text("Directions -", 275, 285);
    text("Use the left and right arrow keys to collect flowers.", 170, 300);
    text("Be careful though! Ghosts can decrease Quince's flower count.", 150, 315);
    text("If you get below 0 flowers, Quince's death count will increase.", 155, 330);
    text("Try to get as few deaths as possible!", 200, 345);
    text("Gather 30 flowers to complete the bouquet.", 190, 360);
    text("Good luck!", 275, 375);
    text("Press the up arrow key to start.", 225, 410);
    */
    text("Help Quince gather enough flowers to make a bouquet for her deceased dog Stone.",displayWidth/3, 250);
    text("Directions -", displayWidth/2.1, 285);
    text("Use the left and right arrow keys to collect flowers.", displayWidth/2.5, 300);
    text("Be careful though! Ghosts can decrease Quince's flower count.", displayWidth/2.7, 315);
    text("If you get below 0 flowers, Quince's death count will increase.", displayWidth/2.65, 330);
    text("Try to get as few deaths as possible!", displayWidth/2.35, 345);
    text("Gather 30 flowers to complete the bouquet.", displayWidth/2.43, 360);
    text("Good luck!", displayWidth/2.1, 375);
    text("Press the up arrow key to start.", displayWidth/2.28, 410);

    ground.velocityY = -5;
    if (ground.y < 0){
      ground.y = ground.height/2;
    }

    if (keyIsDown(UP_ARROW)){
      gameState = PLAY;
    }
  }

  if (gameState === PLAY){
  
  ground.velocityY = -5;
  if (ground.y < 0){
    ground.y = ground.height/2;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    quince.x = quince.x +8;
  }
  if (keyIsDown(LEFT_ARROW)) {
    quince.x = quince.x -8;
  }

  if(flowerGroup.isTouching(quince)){
    flowerGroup.destroyEach();
    flowerCount = flowerCount+1;
  }

  if(ghostGroup.isTouching(quince)){
    ghostGroup.destroyEach();
    flowerCount = flowerCount-10;
  }

  if(flowerCount >= 0){
    spawnGhosts();
  }

  if(flowerCount >= 10){
    spawnGhosts();
    spawnGhosts2();
  }

  if(flowerCount >= 20){
    spawnGhosts();
    spawnGhosts2();
    spawnGhosts3();
  }

  spawnFlower();
  if(flowerCount < 0){
    gameState = END;
    deathCount = deathCount+1;
  }

  if(flowerCount >= 30){
    gameState = COMPLETE;
  }
}

if (gameState === END){
  //text("Game Over", 275, 300);
  //text("Press the down arrow key to play again", 200, 315);
  textSize(12);
  text("Game Over", displayWidth/2.1, 300);
  text("Press the down arrow key to play again", displayWidth/2.35, 315);
  flowerGroup.setVelocityYEach(0);
  ghostGroup.setVelocityYEach(0);
  
  flowerGroup.setLifetimeEach(-1);
  ghostGroup.setLifetimeEach(-1);
  if (keyIsDown(DOWN_ARROW)){
    gameState = PLAY;
    flowerCount = 0;
    
    flowerGroup.destroyEach();
    ghostGroup.destroyEach();
    
    //quince.x = 300;
    quince.x = displayWidth/2;
  }
}

if (gameState === COMPLETE){
  textSize(12);
  //text("Congrats! You have helped Quince deliver the bouquet to Stone's grave Safely!", 100, 300);
  //text("If you wish to play again to get fewer deaths, press the down arrow key.", 140, 315);
  text("Congrats! You have helped Quince deliver the bouquet to Stone's grave Safely!", displayWidth/3, 300);
  text("If you wish to play again to get fewer deaths, press the down arrow key.", displayWidth/2.8, 315);
  flowerGroup.setVelocityYEach(0);
  ghostGroup.setVelocityYEach(0);

  if (keyIsDown(DOWN_ARROW)){
    flowerCount = 0;
    deathCount = 0;
    flowerGroup.destroyEach();
    ghostGroup.destroyEach();
    //quince.x = 300;
    quince.x = displayWidth/2;
    gameState = START;
  }
  flowerGroup.setLifetimeEach(-1);
  ghostGroup.setLifetimeEach(-1);
}
  //drawSprites();
}

function spawnFlower(){
  if (frameCount % 140 === 0){
    //var flower = createSprite(Math.round(random(15,585)), 600, 10, 10);
    var flower = createSprite(Math.round(random(15,displayWidth-15)), displayHeight, 10, 10);
    flower.addImage("flower",flowerImg);
    flower.scale = 0.2;
    flower.velocityY=-5;
    flower.lifetime = 170;
    flowerGroup.add(flower);
}
}

function spawnGhosts(){
  if (frameCount % 200 === 0){
    //var ghost = createSprite(Math.round(random(100,500)), 600, 20, 20);
    var ghost = createSprite(Math.round(random(100,displayWidth-100)), displayHeight, 20, 20);
    ghost.addImage("ghost",ghostImg);
    ghost.scale = 0.1;

    ghost.velocityY=-5;
    ghost.lifetime = 170;
    ghostGroup.add(ghost);
  }
}

function spawnGhosts2(){
  if (frameCount % 80 === 0){
    //var ghost = createSprite(Math.round(random(100,500)), 600, 20, 20);
    var ghost = createSprite(Math.round(random(100,displayWidth-100)), displayHeight, 20, 20);
    ghost.addImage("ghost",ghostImg);
    ghost.scale = 0.1;

    ghost.velocityY=-7;
    ghost.lifetime = 170;
    ghostGroup.add(ghost);
  }
}

function spawnGhosts3(){
  if (frameCount % 50 === 0){
    //var ghost = createSprite(Math.round(random(100,500)), 600, 20, 20);
    var ghost = createSprite(Math.round(random(100,displayWidth-100)), displayHeight, 20, 20);
    ghost.addImage("ghost",ghostImg);
    ghost.scale = 0.1;

    ghost.velocityY=-9;
    ghost.lifetime = 170;
    ghostGroup.add(ghost);
  }
}