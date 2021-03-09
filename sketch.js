var spaceShip, spaceShipImage;
var asteroid, asteroidImage; 
var enemySpaceShip, enemySpaceShipImage;
var powerups;
var bg, bgImage;
var bullet, bulletImage;
var laser,laserImage;


function preload(){
  bgImage = loadImage('Images/1253106.jpg');

  spaceShipImage = loadImage('Images/spaceship.png');
  asteroidImage = loadImage('Images/asteroid.png');
  enemySpaceShipImage = loadImage('Images/Daco_234062.png');
  bulletImage = loadImage('Images/bullet.png');
  laserImage = loadImage('Images/pngegg.png');
}
function setup() {
  createCanvas(1200, 600);

  bg = createSprite(600,300,1200,600);
  bg.addImage(bgImage);

  spaceShip = createSprite(150,300);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.17;

  enemySpaceShip = createSprite(1000,300);
  enemySpaceShip.addImage(enemySpaceShipImage);
  enemySpaceShip.scale = 0.17;
 
}

function draw() {
  background(0, 0, 0);
  spawnAsteroids();
  movePlayer();
  moveEnemy();
  drawSprites();
}

function spawnAsteroids(){
  if(frameCount%120 === 0){
    var randX = Math.round(random(1200,250));
    var randY = Math.round(random(100,-100));

    asteroid = createSprite(randX,randY,70,70);
    asteroid.addImage(asteroidImage);
    asteroid.scale = 0.1;
    if(asteroid.x < 600 && asteroid.y < 300){
      asteroid.velocityX = 5;
      asteroid.velocityY = 4; 
    }
    if(asteroid.x < 600 && asteroid.y > 300){
      asteroid.velocityX = 7;
      asteroid.velocityY = -4;
    }
  if(asteroid.x > 600 && asteroid.y < 300){
    asteroid.velocityX = -6;
    asteroid.velocityY = 3;
    }
  if(asteroid.x > 600 && asteroid.y > 300){
    asteroid.velocityX = -4;
    asteroid.velocityY = -7;
    }
 
    //asteroid.velocityX = -4;
    //asteroid.velocityY = 5;
  console.log(asteroid.x,asteroid.y);
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