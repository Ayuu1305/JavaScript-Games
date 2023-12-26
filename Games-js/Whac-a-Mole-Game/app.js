const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const Score = document.querySelector('#score')

let result = 0
let hitpostion
let currenttime=60
function randomSquare()
{
    squares.forEach(square =>{
        square.classList.remove('mole')
    })

    let randomSquare = squares[Math.floor(Math.random()*9)]
   randomSquare.classList.add('mole')

   hitpostion=randomSquare.id
    
}

squares.forEach(square =>{
    square.addEventListener('mousedown' , ()=>{
        if(square.id == hitpostion){
            result++
            Score.textContent = result
            hitpostion = null
        }
    })
})


function moveMole(){
    
    timeid = setInterval(randomSquare,500)
}
moveMole()

function countdown(){
    currenttime--
    timeLeft.textContent=currenttime
    if(currenttime == 0)
    {
        clearInterval(countdowntimerid)
        clearInterval(timeid)
        alert("GAMEOVER! Your final score is " +result)
    }
}

let countdowntimerid=setInterval(countdown,1000)