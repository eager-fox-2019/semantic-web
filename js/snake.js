
//initialization
const CANVAS_BORDER_COLOUR = 'black'
const CANVAS_BACKGROUND_COLOUR = '#283747'
const SNAKE_COLOR = ' #FFC300'
const SNAKE_BORDER_COLOR = '#283747'


//snake
let snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150},
]

// //initialize firebase
let playerName = localStorage.getItem('name')
console.log(playerName)
let dx = 10 //horizontal velocity
let dy = 0 //vertical velocity
let speed = Number(localStorage.getItem("speed"))
// console.log(speed)
let score = 0

var gameCanvas = document.getElementById('gameCanvas')
var ctx = gameCanvas.getContext('2d') // its a must!

function clearCanvas(){
    ctx.fillStyle = CANVAS_BACKGROUND_COLOUR
    ctx.strokeStyle = CANVAS_BORDER_COLOUR
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height) // draw the box
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height) // stroke the box
}

//create food before game starts
createFood()

//add controls
document.addEventListener('keydown', changeDirection)

var getName = document.getElementById('username')
getName.innerHTML = playerName

//draw the snake
drawSnake()

//loop the process
main()

function writeHighScore(){
    var firebaseRef = firebase.database().ref()
    if(firebaseRef.child(playerName)){
        var scoreRef = firebaseRef.child(playerName)
        var test = 0
        scoreRef.once("value", function(snapshot){
            var scoreFromDB = snapshot.val()
            test = scoreFromDB
            console.log(scoreFromDB)
        })
        if(test < score){
            firebaseRef.child(playerName).set(score)
        }
        else{
            return
        }
        console.log(test)
    }
    // firebaseRef.child(playerName).set(score)
}


//main function
function main(){
    if(didGameEnd()) {
        writeHighScore()
        document.getElementById("alwaysTop").style.display = "inline";
        document.getElementById('score-died').innerHTML = score
        return
    }
    
    setTimeout(function onTick(){
        changingDirection = false
        clearCanvas()
        drawFood()
        advanceSnake(speed)
        drawSnake()
        main()
    }, speed)
    return
}

//control the direction
function changeDirection(event){
    const LEFT_KEY = 37
    const RIGHT_KEY = 39
    const UP_KEY = 38
    const DOWN_KEY = 40

    const A_KEY = 65
    const D_KEY = 68
    const W_KEY = 87
    const S_KEY = 83

    if(changingDirection) return

    changingDirection = true

    const keyPressed = event.keyCode
    const goingUp = dy === -10
    const goingDown = dy === 10
    const goingRight = dx === 10
    const goingLeft = dx === -10

    if((keyPressed === LEFT_KEY || keyPressed === A_KEY) && !goingRight){
        dx = -10
        dy = 0
    }
    if((keyPressed === RIGHT_KEY || keyPressed === D_KEY) && !goingLeft){
        dx = 10
        dy = 0
    }
    if((keyPressed === UP_KEY || keyPressed === W_KEY) && !goingDown){
        dx = 0
        dy = -10
    }
    if((keyPressed === DOWN_KEY || keyPressed === S_KEY) && !goingUp){
        dx = 0
        dy = 10
    }

}

//draw snake by part
function drawSnakePart(snakePart){
    ctx.fillStyle = SNAKE_COLOR
    ctx.strokeStyle = SNAKE_BORDER_COLOR

    ctx.fillRect(snakePart.x, snakePart.y, 10, 10) // draw the body
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10) // stroke the body
}

//draw snake
function drawSnake(){
    snake.forEach(drawSnakePart)
}

//move snake
function advanceSnake(){
    const head = {x: snake[0].x + dx, y: snake[0].y + dy}
    snake.unshift(head)

    const didEatFood = snake[0].x === foodX && snake[0].y === foodY
    if(didEatFood){
        score += 10
        document.getElementById('score').innerHTML = score
        createFood()
    }
    else{
        snake.pop()
    }
}

//generate random location
function randomTen(min, max){
    return Math.round((Math.random() * (max-min) + min) / 10) * 10
}

//create food for snake
function createFood(){
    foodX = randomTen(0, gameCanvas.width - 10)
    foodY = randomTen(0, gameCanvas.height - 10)

    snake.forEach(function isFoodOnSnake(part){
        const foodIsOnSnake = part.x == foodX && part.y == foodY
        if(foodIsOnSnake){
            createFood()
        }
    })
}

//draw the food
function drawFood(){
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'darkred'
    ctx.fillRect(foodX, foodY, 10, 10)
    ctx.strokeRect(foodX, foodY, 10, 10)
}

//determines if its game over
function didGameEnd() {
    for(let x=4; x<snake.length; x++){
        const didCollide = snake[x].x === snake[0].x && snake[x].y === snake[0].y
        if(didCollide){
            return true
        }
    }

    const hitLeftWall = snake[0].x < 0
    const hitRightWall = snake[0].x > gameCanvas.width - 10
    const hitTopWall = snake[0].y < 0
    const hitBottomWall = snake[0].y > gameCanvas.height - 10

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}

