const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth=100
const blockHeight=20
const balldiameter = 20
const boardWidth= 560
const boardHeight= 300
let score = 0

let xDirection = 2
let yDirection = 2

const UserStart = [230, 10]
let currentposition = UserStart

const ballstart = [270, 40]
let ballcurrentposition = ballstart

let timerId
//create block
class Block{
    constructor(xAxis,yAxis){
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight=[xAxis+blockWidth,yAxis]
        this.topLeft=[xAxis,yAxis+blockHeight]
        this.topRight=[xAxis+blockWidth,yAxis+blockHeight]

    }
}

const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210)
]


function addblock(){
for(let i=0;i<blocks.length;i++){
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0]+'px'
    block.style.bottom = blocks[i].bottomLeft[1]+'px'
    grid.appendChild(block)
}
}

addblock()

// add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)


//draw user
function drawUser(){
    user.style.left = currentposition[0]+'px'
    user.style.bottom = currentposition[1]+'px'
}

//draw ball
function drawball(){
    ball.style.left = ballcurrentposition[0]+'px'
    ball.style.bottom = ballcurrentposition[1]+'px'
}

//move user
function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentposition[0]>0){
            currentposition[0] -= 10
            drawUser()
            }
            break;

            case 'ArrowRight':
                if(currentposition[0]<boardWidth-blockWidth){
                currentposition[0] += 10
                drawUser()
                }
                break;
    }

}

document.addEventListener('keydown',moveUser)

//add ball

const ball = document.createElement('div')
ball.classList.add('ball')
drawball()
grid.appendChild(ball)

//move ball
function moveball(){
    ballcurrentposition[0] += xDirection
    ballcurrentposition[1] += yDirection
    drawball()
    checkforcollisions()
}

timerId = setInterval(moveball,20)

function checkforcollisions(){

    //check for block collisions
    for(let i = 0;i<blocks.length;i++){
        if(
            (ballcurrentposition[0] > blocks[i].bottomLeft[0] && ballcurrentposition[0] < blocks[i].bottomRight[0])&&
            ((ballcurrentposition[1] + balldiameter) > blocks[i].bottomLeft[1] && ballcurrentposition[1] < blocks[i].topLeft[1])
        )
        {
            const allblock = Array.from(document.querySelectorAll('.block'))
            allblock[i].classList.remove('block')
            blocks.splice(i,1)
            changedirection()
            score++
            scoreDisplay.innerHTML = score


            //check for win

            if(blocks.length === 0){
                scoreDisplay.innerHTML = "YOU WIN"
                document.removeEventListener('keydown',moveUser)
            }
        }
    }
    
    //check for wall collisions
    if(ballcurrentposition[0]>= (boardWidth-balldiameter) ||
    ballcurrentposition[1]>=(boardHeight-balldiameter) ||
    ballcurrentposition[0]<=0
    )
    {
        changedirection()
        
    }
    
    //check for user collisions
        if(
           (ballcurrentposition[0] > currentposition[0] && ballcurrentposition[0] < currentposition[0] + blockWidth) &&
           (ballcurrentposition[1] > currentposition[1] && ballcurrentposition[1] < currentposition[1] + blockHeight)
           )
           {
            changedirection()
           }


    //check for game over
    if(ballcurrentposition[1]<=0){
        clearInterval(timerId)
        scoreDisplay.innerHTML = "YOU LOSE"
        document.removeEventListener('keydown',moveUser)
    }
}

function changedirection(){
    if(xDirection === 2 && yDirection === 2){
        yDirection = -2
        return
    }

    if(xDirection === 2 && yDirection === -2){
        xDirection = -2
        return
    }

    if(xDirection === -2 && yDirection === -2){
        yDirection = 2
        return
    }

    if(xDirection === -2 && yDirection === 2){
        xDirection = 2
        return
    }
}
