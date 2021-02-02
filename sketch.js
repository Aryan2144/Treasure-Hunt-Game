var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

var star1Img, star2Img, star3Img,star1, star2, star3, starG;

var end;

var PLAY = 1;
var END = 0;

var gameState = PLAY;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  star1Img = loadImage("star.png")
  star2Img = loadImage("star.png")
  star3Img = loadImage("star.png")
  
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.setCollider("rectangle", 0, 0, 1000, 1000);
  
//creating Groups
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
  
starG = new Group();

}

function draw() {

  console.warn("Press Space to restart the game");
  
  if(gameState === PLAY)
    {
  
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

  //increasing score if boy touches any treasure
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;
    }
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach(); 
      treasureCollection = treasureCollection +150;
    }
  //making the game end if boy touches the sword
    else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState = END;
        
        boy.addAnimation("SahilRunning", endImg);
        boy.scale = 1;
        
        boy.x = 200;
        boy.y = 200;
        

      }
    }
      
   if(treasureCollection === 250 || treasureCollection > 250)  
     {
       star1 = createSprite(25, 30, 10, 10);
       star1.addImage("star", star1Img);
       starG.add(star1);
     }
      
   if(treasureCollection === 500 || treasureCollection > 500)  
     {
       star2 = createSprite(75, 30, 10, 10);
       star2.addImage("star", star2Img);
       starG.add(star2);
     }
  
   if(treasureCollection === 1000 || treasureCollection > 1000)  
     {
       star3 = createSprite(125, 30, 10, 10);
       star3.addImage("star", star3Img);
       starG.add(star3);
     }
      
  }

  //stopping and destroying all sprite if game is over
  if(gameState === END){
    boy.x = 200;
    boy.y = 200;
    
    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
    
    path.velocityY = 0;
    
    cashG.destroyEach();
    jwelleryG.destroyEach();
    diamondsG.destroyEach();
    swordGroup.destroyEach();
    
    if(keyDown("space"))
      {
        reset();
      }
  
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}

function reset()
{
  gameState = PLAY;
  boy.addAnimation("SahilRunning",boyImg);
  treasureCollection = 0;  
  boy.scale=0.08;
  boy.x = 70;
  boy.y = 330;
  starG.destroyEach();
  path.velocityY = 4;
  
}