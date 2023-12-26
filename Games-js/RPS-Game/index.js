const computerChoiceDisplay= document.getElementById("Computer-choice");
const userChoiceDisplay = document.getElementById("user-choice");
const resultDisplay = document.getElementById("result");
const possibleChoice = document.querySelectorAll("button");
let userChoice
let computerChoice
let result


possibleChoice.forEach(possibleChoice=>possibleChoice.addEventListener('click',(e)=>{
    userChoice=e.target.id
    userChoiceDisplay.innerHTML = userChoice
    genratepossiblechoice()
    getresult()
}))

function genratepossiblechoice(){
    const randomnumber = Math.floor(Math.random()*3)+1

    if(randomnumber === 1){
        computerChoice = 'rock'
    }

    if(randomnumber === 2){
        computerChoice = 'scissors'
    }

    if(randomnumber === 3){
        computerChoice = 'paper'
    }

    computerChoiceDisplay.innerHTML = computerChoice
}


function getresult(){
    if(computerChoice === userChoice){
        result = "Its a draw"
    }
    if(computerChoice ==='rock' && userChoice==='paper'){
        result = "You win"
    }
    if(computerChoice ==='rock' && userChoice==='scissors'){
        result = "You lost"
    }

    if(computerChoice ==='paper' && userChoice==='scissors'){
        result = "You win"
    }
    if(computerChoice ==='paper' && userChoice==='rock'){
        result = "You lost"
    }

    if(computerChoice ==='scissors' && userChoice==='rock'){
        result = "You win"
    }
    if(computerChoice ==='scissors' && userChoice==='paper'){
        result = "You lost"
    }

    resultDisplay.innerHTML  = result
}