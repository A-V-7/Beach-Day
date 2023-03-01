function preload(){
    bg1 = loadImage("./assets/bg.jpg");
    bg2 = loadImage("./assets/bg2.png");
    play = loadImage("./assets/play.png");
    logo = loadImage("./assets/logo.png");
    score = loadImage("./assets/score.png");
    livesImg= loadImage("./assets/lives.png");
    haha= loadImage("./assets/haha.png");
    resetImg = loadImage("./assets/reset.png");

    level1text = loadImage("./assets/level1text.png");

    girlRunning = loadAnimation("./assets/girlrunning1.png","./assets/girlrunning2.png","./assets/girlrunning3.png","./assets/girlrunning4.png","./assets/girlrunning5.png","./assets/girlrunning6.png");

    bottle = loadImage("./assets/bottle.png");
    can = loadImage("./assets/can.png");
    chips = loadImage("./assets/chips.png");
    peel = loadImage("./assets/peel.png");

    crab = loadImage("./assets/crab.png");
    jelly = loadImage("./assets/jellyfish.png");
}

function setup(){
    createCanvas(windowWidth, windowHeight);

    gameState = "start";

    playButton = createSprite(width/2,height-250);
    playButton.addImage(play);
    playButton.scale = 0.75;

    reset = createSprite(width/2,height-275);
    reset.addImage(resetImg);
    reset.scale = 0.2;

    infinitebg = createSprite(width/2,height/2);
    infinitebg.addImage(bg2);
    infinitebg.scale = 2.2;
    infinitebg.velocityX = -4;

    ground = createSprite(width/2,height-50,width,20);
    ground.visible = false;

    girl = createSprite(150,height-200);
    girl.addAnimation("running",girlRunning);
    girl.scale = 0.8;
    girl.setCollider("rectangle",0,0,150,200);

    trashGroup= createGroup();
    trashCount = 0;

    obstacleGroup = createGroup();
    life = 3;

}

function draw(){
   if(gameState == "start"){
    background(bg1);

    drawSprites();
    girl.visible = false;
    infinitebg.visible = false;
    reset.visible = false;

    push();
    imageMode(CENTER);
    image(logo,width/2,height-430,600,200);
    pop();

    if(keyDown("enter")){
        gameState = "level1intro";
    }

    
   }

   if(gameState == "level1intro"){
    background(bg1);
    push();
    imageMode(CENTER);
    image(level1text,width/2,height/2,1000,700);
    pop();

    if(keyDown("space")){
        gameState = "level1";
    }

   }

   if(gameState == "level1"){
    background("purple");
    drawSprites();
    playButton.visible = false;
    reset.visible = false;
    girl.visible = true;
    infinitebg.visible = true;

    if(keyDown("up")&&girl.y >200){
        girl.velocityY = -30;
    }
    girl.velocityY +=2;
    girl.collide(ground);

    if(infinitebg.x < 0){
        infinitebg.x = infinitebg.width/2;
    }

    image(score,40,50,100,30);
    textSize(25);
    fill("blue");
    text(trashCount,150,73);
    createtrash();
    for(var i = 0;i<trashGroup.length;i++){
        if(girl.isTouching(trashGroup[i])){
            trashGroup[i].destroy();
            trashCount +=1;
        }
    }

    image(livesImg,45,100,80,30);
    textSize(25);
    fill("orange");
    text(life,150,125);
    createObstacles();
    for(var i = 0;i<obstacleGroup.length;i++){
        if(girl.isTouching(obstacleGroup[i])){
            life -= 1;
            image(haha,obstacleGroup[i].x,obstacleGroup[i].y,100,30);
            obstacleGroup[i].remove();
        }
    }

    if(life==0){
        gameState = "gameOver";
    }

    if(trashCount >= 15){
        gameState = "level2intro";
    }
    
   }

   if(gameState == "gameOver"){
    background(bg1);

    fill("lightseagreen");
    rectMode(CENTER);
    rect(width/2,height/2,250,100);

    textSize(40);
    fill("white");
    textAlign(CENTER);
    text("Game Over!",width/2,height/2);

    drawSprites();
    girl.visible = false;
    infinitebg.visible = false;
    playButton.visible = false;

    if(keyDown("space")){
        gameState = "level1";
    }
    
   }

}

function createtrash(){
    if(frameCount%(Math.round(random(70,120)))==0){
        trash = createSprite(width,height-100);
        trash.velocityX = -4;
        var rand = Math.round(random(1,4));
        switch(rand){
            case 1: trash.addImage(bottle)
            trash.scale = 0.3
            break
            case 2: trash.addImage(can)
            trash.scale = 0.3
            break
            case 3: trash.addImage(chips)
            trash.scale = 0.2
            break
            case 4: trash.addImage(peel)
            trash.scale = 0.3
            break
            default: break
        }
        trash.lifetime = 2000;
        trashGroup.add(trash);
    }
}

function createObstacles(){
    if(frameCount%(Math.round(random(125,150)))==0){
        obstacle = createSprite(width,height-100);
        obstacle.velocityX = -4;
        var rand = Math.round(random(1,2));
        switch(rand){
            case 1: obstacle.addImage(crab)
            break
            case 2: obstacle.addImage(jelly)
            break
            default: break
        }
        obstacle.scale = 0.25;
        obstacle.lifetime = 2000;
        obstacleGroup.add(obstacle);
    }
}
