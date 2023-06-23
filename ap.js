const gameBoard = document.querySelector(".gameBoard");
const cnt = gameBoard.getContext("2d");
const scoreText = document.querySelector(".score");
const reset = document.querySelector("#reset");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boradColor= "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor= "red";
const unitsize =25;
let running = false;
let xVelocity = unitsize;
let yVelocity = 0;
let foodX;
let foodY;
let score =0;
let snake =[
    {x:unitsize * 4, y:0},
    {x:unitsize * 3, y:0},
    {x:unitsize * 2, y:0},
    {x:unitsize, y:0},
    {x:0, y:0},
];
window.addEventListener("keydown", changeDirection);
reset.addEventListener("click", resetGame);

gameStart();
function gameStart(){
    running=true;
    scoreText.textContent=score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if (running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameover();
            nextTick();
        }, 170);
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    cnt.fillStyle=boradColor;
    cnt.fillRect(0,0,gameWidth, gameHeight)
};
function createFood(){
    function rand(){
    let randome = Math.round(Math.random()* (gameWidth/unitsize-1))*unitsize;
    return randome;
    }
    foodX=rand();
    foodY=rand();
};

function drawFood(){
    cnt.fillStyle="red";
  cnt.fillRect(foodX, foodY, unitsize, unitsize);
};

function changeDirection(event){
    const keyPressed = event.keyCode;
    const paused =32;
    const LEFT=37;
    const UP=38;
    const RIGHT= 39;
    const DOWN =40;

    const goingUp = (yVelocity==-unitsize);
    const goinDown = (yVelocity==unitsize);
    const goingRight= (xVelocity==unitsize);
    const goingLeft= (xVelocity==-unitsize);

    switch(true){
        case(keyPressed==LEFT && !goingRight):
        xVelocity=-unitsize;
        yVelocity=0;
        break;

        case(keyPressed==RIGHT && !goingLeft):
        xVelocity=unitsize;
        yVelocity=0;
        break;

        case(keyPressed==UP && !goinDown):
        yVelocity=-unitsize;
        xVelocity=0;
        break;

        case(keyPressed==DOWN && !goingUp):
        yVelocity=unitsize;
        xVelocity=0;
        break;
    }
};


function drawSnake() {
    cnt.fillStyle=snakeColor;
    cnt.strokeStyle=snakeBorder;
    snake.forEach(sp=>{
        cnt.fillRect(sp.x, sp.y, unitsize, unitsize);
        cnt.strokeRect(sp.x, sp.y, unitsize, unitsize);
    })
    
};

function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity};
        snake.unshift(head);
        
        if(snake[0].x==foodX && snake[0].y==foodY){
            score++;
            scoreText.textContent=score;
            createFood();
        }else{
            snake.pop();
        };
    }
    
    function displayGameOver(){
        cnt.font="50px MV Boli"; 
        cnt.fillStyle="black";
        cnt.textAlign= "center";
        cnt.fillText("GAME OVER!",gameHeight/2, gameWidth/2); 
        
    }
    function checkGameover(){
        switch(true){
            case(snake[0].x<0):
            running=false;
            break;
            
            case(snake[0].x>gameWidth):
            running=false;
            break;
            
            case(snake[0].y>gameHeight):
            running=false;
            break;
            
            case(snake[0].y<0):
            running=false;
            break;
        }
        
        for (let i=1; i<snake.length; i++){
            if (snake[i].x==snake[0].x && snake[i].y==snake[0].y){
                running= false;
                break;
            }
        }
    }

    function resetGame() {
     score=0;
     xVelocity= unitsize;
     yVelocity =0;
     snake =[
        {x:unitsize * 4, y:0},
        {x:unitsize * 3, y:0},
        {x:unitsize * 2, y:0},
        {x:unitsize, y:0},
        {x:0, y:0},
    ];
    gameStart();
    };