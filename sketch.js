var spaceShip, spaceShipImage;
var asteroid, asteroidImage, asteroid1Image; 
var enemySpaceShip, enemySpaceShipImage;
var powerups;
var bg, bgImage;
var bullet, bulletImage;
var laser,laserImage;
var asteroidGroup;
var gameState = "Start";
var p1Score = 0;
var p2Score = 0;
var enemyLife = 10;
var playerLife = 10;


function preload(){
  bgImage = loadImage('Images/1253106.jpg');

  spaceShipImage = loadImage('Images/spaceship.png');
  asteroidImage = loadImage('Images/asteroid.png');
  enemySpaceShipImage = loadImage('Images/spacecraftart.png');
  bulletImage = loadImage('Images/bullet.png');
  laserImage = loadImage('Images/pngegg.png');

  asteroid1Image = loadImage('Images/asteroid1.png');
}
function setup() {
  createCanvas(1200, 600);


  spaceShip = createSprite(150,300);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.17;
  spaceShip.visible = false;

  enemySpaceShip = createSprite(1000,300);
  enemySpaceShip.addImage(enemySpaceShipImage);
  enemySpaceShip.scale = 0.37;
  enemySpaceShip.visible = false;
  
  bullet = createSprite(500,spaceShip.y,30,5);
  bullet.addImage(bulletImage);
  bullet.scale = 0.5;
  bullet.visible = false;

  laser = createSprite(1000,enemySpaceShip.y,30,5);
  laser.addImage(laserImage);
  laser.scale = 0.2;
  laser.visible = false;

  asteroidGroup = createGroup();

}

function draw() {
  background(0, 0, 0);
  if(gameState === "Start"){
    textSize(50);
    fill("white");
    text("PRESS 'ENTER' TO START THE GAME",200,200);
    if(keyDown("enter")){
      gameState = "Play";
    }
  }
  else if(gameState === "Play"){

    background(bgImage);
    enemySpaceShip.visible = true;
    spaceShip.visible = true;
    spawnAsteroids();
    movePlayer();
    moveEnemy();

    if(keyDown("space")){
      bullet.x = spaceShip.x - 20;
      bullet.y = spaceShip.y
      bullet.velocityX = 15;
      bullet.visible = true;
    }
    if(keyDown("shift")){
      laser.x = enemySpaceShip.x - 20;
      laser.y = enemySpaceShip.y
      laser.velocityX = -15;
      laser.visible = true;
    }

    if(asteroidGroup.isTouching(bullet)){
      asteroidGroup.destroyEach();
      bullet.visible = false;
      gameState = "end";
    }
    else if(asteroidGroup.isTouching(laser) ){
      asteroidGroup.destroyEach();
      laser.visible = false;
      gameState = "end";
    }

    if(bullet.isTouching(enemySpaceShip)){
      bullet.visible = false;
      
      p1Score = p1Score + 5;
      //enemyLife = enemyLife - 0.5;
    }
    if(laser.isTouching(spaceShip)){
      laser.visible = false;

      p2Score = p2Score + 5;
      //playerLife = playerLife - 0.5;
    }
    if(p1Score === 500 || p2Score === 500){
      gameState = "end";
    }
    textSize(25);
    fill("white");
    text("Player Score: " + p1Score,100,100);
    text("Enemy Score: " + p2Score,900,100);

  }

  else{
    spaceShip.visible = false;
    enemySpaceShip.visible = false;
    asteroidGroup.destroyEach();

    fill("red");
    textSize(40);
    text("GAME OVER !!!",500,300);
    text("Press 'R' to Restart!!!",450,400);
  }
  if(gameState === "end" && keyDown("r")){
    restart();
  }
  drawSprites();
}

function spawnAsteroids(){
  if(frameCount%100 === 0){
    var randX = Math.round(random(1200,250));
    var randY = Math.round(random(100,-100));

    asteroid = createSprite(randX,randY,70,70);
    asteroid.addImage(asteroidImage);
    asteroid.scale = 0.1;

    asteroid.setCollider("circle",100,100,100);
    if(asteroid.x < 600 && asteroid.y < 300){
      asteroid.velocityX = 5;
      asteroid.velocityY = 4; 
      asteroid.addImage(asteroid1Image);
    }
    if(asteroid.x < 600 && asteroid.y > 300){
      asteroid.velocityX = 7;
      asteroid.velocityY = -4;
    }
  if(asteroid.x > 600 && asteroid.y < 300){
    asteroid.velocityX = -6;
    asteroid.velocityY = 3;
    }
  if(asteroid.x = 600 ){
    asteroid.velocityY = 7;
    }
  asteroidGroup.add(asteroid);
}
}

function movePlayer(){
  if(keyDown("w")){
    spaceShip.y = spaceShip.y - 5;
  }
  if(keyDown("s")){
    spaceShip.y = spaceShip.y + 5;
  }
  if(keyDown("a")){
    spaceShip.x = spaceShip.x - 5;
  }
  if(keyDown("d")){
    spaceShip.x = spaceShip.x + 5;
  }
}

function moveEnemy(){
  if(keyDown(UP_ARROW)){
    enemySpaceShip.y = enemySpaceShip.y - 5;
  }
  if(keyDown(DOWN_ARROW)){
    enemySpaceShip.y = enemySpaceShip.y + 5;
  }
  if(keyDown(LEFT_ARROW)){
    enemySpaceShip.x = enemySpaceShip.x - 5;
  }
  if(keyDown(RIGHT_ARROW)){
    enemySpaceShip.x = enemySpaceShip.x + 5;
  }
}

function restart(){
  gameState = "Start";
  p1Score = 0;
  p2Score = 0;
  spaceShip.visible = false;
  enemySpaceShip.visible = false;
}