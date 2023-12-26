const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.result')
let currentShooterindex = 202
let width = 15
let direction =1
let invaderId
let goingRight =true
let alienRemoved = []
let results =0

for(let i=0; i<225;i++){
    const square = document.createElement('div')
    grid.appendChild(square)
}

const Squares = Array.from(document.querySelectorAll('.grid div'))


const alienInavder = [
    0,1,2,3,4,5,6,7,8,9,15,16,17,18,19,20,21,22,23,24,30,31,32,33,34,35,36,37,38,39
]

function draw(){

    for(let i=0; i <alienInavder.length; i++){
        if(!alienRemoved.includes(i)) {
            Squares[alienInavder[i]].classList.add('invader')
    }
}
}

draw()

function remove(){
    for(let i=0; i <alienInavder.length; i++){
        Squares[alienInavder[i]].classList.remove('invader')
    }
}

Squares[currentShooterindex].classList.add('shooter')

function moveshooter(e){
    Squares[currentShooterindex].classList.remove('shooter')
    switch(e.key){
        case 'ArrowLeft':
            if(currentShooterindex % width !==0) currentShooterindex -=1
            break

            case 'ArrowRight':
                if(currentShooterindex % width < width -1 ) currentShooterindex +=1
                break
    }
    Squares[currentShooterindex].classList.add('shooter')
}

document.addEventListener('keydown',moveshooter)


function moveInvader(){
    const leftEdge = alienInavder[0] % width ===0
    const rightEdge = alienInavder[alienInavder.length -1] % width === width-1
    remove()


    if(rightEdge && goingRight){
        for(let i=0;i<alienInavder.length;i++){
            alienInavder[i]+=width+1
            direction=-1
            goingRight=false
        }
    }
    
    if(leftEdge && !goingRight){
        for(let i=0; i < alienInavder.length; i++){
            alienInavder[i]+=width-1
            direction=1
            goingRight=true
        }
    }

    for(let i=0;i<alienInavder.length;i++){
        alienInavder[i]+=direction
    }
    draw()

    if(Squares[currentShooterindex].classList.contains('invader','shooter')){
        resultDisplay.innerHTML = "GAME OVER"
        clearInterval(invaderId)
    }
  
  for(let i=0;i<alienInavder.length;i++){
    if(alienInavder[i] >(Squares.length)){
        resultDisplay.innerHTML = "GAME OVER"
        clearInterval(invaderId)
    }
    }

    if(alienRemoved.length === alienInavder.length){
        resultDisplay.innerHTML = "YOU WIN"
        clearInterval(invaderId)
    }
}

invaderId=setInterval(moveInvader,300)


function shoot(e){
    let laserId
    let currentLaserIndex = currentShooterindex
    function moveLaser(){
        Squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        Squares[currentLaserIndex].classList.add('laser')


        if(Squares[currentLaserIndex].classList.contains('invader'))
        {
            Squares[currentLaserIndex].classList.remove('laser')
            Squares[currentLaserIndex].classList.remove('invader')
            Squares[currentLaserIndex].classList.add('boom')

            setTimeout(() =>  {Squares[currentLaserIndex].classList.remove('boom')},300)
            clearInterval(laserId)

            let alienRemoved = alienInavder.indexOf(currentLaserIndex)
           alienRemoved.push(alienRemoved)
            results++
            resultDisplay.innerHTML=results

        }

    }

    switch(e.key)
    {
        case 'ArrowUp':
            laserId = setInterval(moveLaser,100)
    }
}

document.addEventListener('keydown',shoot)