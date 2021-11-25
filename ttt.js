console.log("hello");

let music = new Audio('music.mp3');
let audioTurn =new Audio("img/ting.mp3")
let gameOver = new Audio("img/gameover.mp3");


let turn = "X";

let isGameOver =false;

const changeTurn = ()=>{
    return turn === "X"?"0":"X"
}

const checkWin = () =>{
    let boxtexts = document.getElementsByClassName('boxText');
    console.log(boxtexts)
    let wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8]
        [0,4,8],
        [2,4,6],    ]
wins.forEach (e=>{
    let boxtexts = document.getElementsByClassName('boxText');
    if((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText)&&(boxtexts[e[2]].innerText === boxtexts[e[1]].innerText)&&(boxtexts[e[0]].innerText !== "")){
        document.querySelector('.info').innerText = boxtexts[e[0]].innerText + "WON"
        isGameOver = true;
    }

})
}

let boxes =document.getElementsByClassName("box");

Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxText');
element.addEventListener('click', ()=>{
    if(boxtext.innerText === ''){
        boxtext.innerText = turn;
        turn = changeTurn();
        audioTurn.play();
        checkWin();
        document.getElementsByClassName("info")[0].innerText = 'Turn for' + turn;
    }
})
})
