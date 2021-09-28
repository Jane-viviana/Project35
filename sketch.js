var hotairBallonbg;
var hotairBallonImg;
var database;
var position;
var balloon;

function preload(){
   hotairBallonImg = loadAnimation("pro-C35 images/Hot Air Ballon-02.png,Hot Air Ballon-03.png,Hot Air Ballon-04.png")
   hotairBallonbg = loadImage("pro-C35 images/Hot Air Ballon-01.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);

  balloon = createSprite(250,450,150,150);
  balloon.addAnimation("hotairballoon", hotairballonImg);

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readPosition, showError);
  
}

function draw() {
  background(hotairballonbg);
  
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotairballoon",hotairBallonImg);
    changePosition(-3,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotairballoon",hotairBallonImg);
    changePosition(3,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotairballoon", hotairBallonImg);
    changePosition(0,-3);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotairballoon", hotairBallonImg);
    changePosition(0,3);
  }
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**USE ARROW KEYS TO MOVE HOTAIRBALLOON**");
  
}

function changePosition(x,y){
 database.ref('balloon/position').set({
   'x':position.x+x,
   'y':position.y+y
 })
}

function readPosition(data){
  position = data.val()
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("ERROR IN CODE");
}
