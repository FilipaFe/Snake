const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class snakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width/tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;
new Audio

function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();

    if(score >2){
        speed = 11;
    }
    if(score > 5){
        speed = 15
    }
    if(score >10){
        speed = 20
    }

    setTimeout(drawGame,1000/speed);
}

function isGameOver(){
    let gameOver = false; // let game over be false by default

    if (yVelocity === 0 && xVelocity === 0){
        return gameOver;
    }
    //walls
    if(headX < 0 || headX > tileCount-1 || headY < 0 || headY > tileCount-1){
        gameOver = true;
    }

    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    if(gameOver){
        ctx.fillStyle = 'white';
        ctx.font = '50px Verdana';
        ctx.fillText("Game Over!", canvas.width/7.7, canvas.height/1.9);
    }
    return gameOver;
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = '10px verdana';
    ctx.fillText("Score: " + score, canvas.width - 50, 10 )
}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawSnake(){
   
    ctx.fillStyle = 'green';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);

    }
    snakeParts.push(new snakePart (headX, headY)); // put an item at the end of the list next to the head
    while (snakeParts.length>tailLength){
        snakeParts.shift(); // remove the furtherst item from the snake parts if we have more than our tailSize
    }
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY*tileCount, tileSize, tileSize);
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize);
}

function checkAppleCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score ++;
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    if(event.keyCode == 38){
        if( yVelocity == 1)
        return;
        yVelocity = -1;
        xVelocity = 0;
    }
    if(event.keyCode == 40){
        if(yVelocity == -1)
        return;
        xVelocity = 0;
        yVelocity = 1;
    }
    if(event.keyCode == 39){
        if(xVelocity == -1)
        return;
        xVelocity = 1;
        yVelocity = 0;
    }
    if(event.keyCode == 37){
        if(xVelocity == 1)
        return;
        xVelocity = -1;
        yVelocity = 0;
    }
}


drawGame();