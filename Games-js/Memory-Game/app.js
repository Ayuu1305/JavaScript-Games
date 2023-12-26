const cardArray = [
    {
        Name: 'fries',
        img: 'fries.png'
    },

    {
        Name: 'cheeseburger',
        img: 'cheeseburger.png'
    },

    {
        Name: 'hotdog',
        img: 'hotdog.png'
    },

    {
        Name: 'ice-cream',
        img: 'ice-cream.png'
    },

    {
        Name: 'ice-milkshake',
        img: 'milkshake.png'
    },

    {
        Name: 'pizza',
        img: 'pizza.png'
    },

    {
        Name: 'fries',
        img: 'fries.png'
    },

    {
        Name: 'cheeseburger',
        img: 'cheeseburger.png'
    },

    {
        Name: 'hotdog',
        img: 'hotdog.png'
    },

    {
        Name: 'ice-cream',
        img: 'ice-cream.png'
    },

    {
        Name: 'ice-milkshake',
        img: 'milkshake.png'
    },

    {
        Name: 'pizza',
        img: 'pizza.png'
    },
]

cardArray.sort(()=>0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
let cardchosen = []
let cardchosenIds = []
const cardwon = []

function createBoard(){
    for(let i=0; i<cardArray.length; i++){
       const card = document.createElement('img')
        card.setAttribute('src','blank.png');
        card.setAttribute('data-id',i);
        card.addEventListener('click' , flipcard)
        gridDisplay.appendChild(card)
    }
}

createBoard()

function checkmatch(){
    const cards = document.querySelectorAll('img')
    const optionOneId = cardchosenIds[0]
    const optionTwoId = cardchosenIds[1]
   
    if(optionOneId==optionTwoId){
        cards[optionOneId].setAttribute('src','blank.png')
        cards[optionTwoId].setAttribute('src','blank.png')
        alert("you have clicked the same image");
    }

    if(cardchosen[0] == cardchosen[1]){
        alert('You found a Match!');
        cards[optionOneId].setAttribute('src','white.png')
        cards[optionTwoId].setAttribute('src','white.png')
        cards[optionOneId].removeEventListener('click',flipcard)
        cards[optionTwoId].removeEventListener('click',flipcard)
        cardwon.push(cardchosen)
    }
    else{
        cards[optionOneId].setAttribute('src','blank.png')
        cards[optionTwoId].setAttribute('src','blank.png')
        alert("Sorry try again")
    }
    resultDisplay.textContent = cardwon.length

    cardchosen= []
    cardchosenIds=[]

    if(cardwon.length==cardArray.length/2){
        resultDisplay.innerHTML = 'Congratulations you found them all!'
    }
}

function flipcard(){

    let cardId = this.getAttribute('data-id');
   cardchosen.push(cardArray[cardId].Name)
   cardchosenIds.push(cardId)
    this.setAttribute('src',cardArray[cardId].img)
    if(cardchosen.length === 2){
    setTimeout(checkmatch,500)
    }
}
