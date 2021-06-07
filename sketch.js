var monkey , monkey_running, monkeyCollide, backGround, backGroundImg;
var ground, invisiGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup, replay, qwer;
var score = 0;
var playButton;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monkeyCollide = loadAnimation("monkey_1.png");
    
  backGroundImg = loadAnimation("background.jpg") 
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup(){
 createCanvas(displayWidth, displayHeight);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 
  monkey = createSprite(80,displayHeight/2+249,10,10);
  monkey.scale = 0.2;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
    
  ground = createSprite(displayWidth/2,displayHeight/3+50,displayWidth,displayHeight);
  ground.scale = 1.5;
  ground.addAnimation("ground", backGroundImg);
  
  invisiGround = createSprite(665,displayHeight/1.4+210,displayWidth+1,7);
  invisiGround.visible = false;

  playButton = createButton("PLAY");
  playButton.position(200,200);

  replay = createButton("PLAY AGAIN");
  replay.position(displayWidth/2, displayHeight/2);
  replay.mousePressed(reset);
  
}

function draw(){

  background("skyblue");
  fill("black");
  text("SURVIVAL TIME: "+score, 470, 20);
  text("BANANAS COLLECTED: "+bananaScore,300,20);

  if(mousePressedOver(playButton)){
    gameState === PLAY
  }

  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);

    replay.hide();
    
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 650) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.7
  
    if (ground.x < 600){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
   }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.changeAnimation("collide", monkeyCollide);

    replay.show();
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);

  }

  background.depth = monkey.depth;
  monkey.depth = monkey.depth+1;
  
  drawSprites(); 
  
  monkey.collide(invisiGround);
}


function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(displayWidth/1, displayHeight/2+160, 50, 50)
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 250;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

    
  }
  

  
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(displayWidth/1, displayHeight/1.1, 50, 50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.17;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
    
  }
  
  
}

function reset(){

  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  monkey.changeAnimation("monkey", monkey_running);
  score = 0;
  bananaScore = 0;
  gameState = PLAY;

}