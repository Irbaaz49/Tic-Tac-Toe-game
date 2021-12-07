const selectBox = document.querySelector(".select-box");
const selectXBtn = document.querySelector(".playerX");
const selectOBtn = document.querySelector(".playerY");
const playBoard = document.querySelector(".play-board");
const allBox = document.querySelectorAll("section span");
const players = document.querySelector(".players");
const resultBox = document.querySelector(".result-box"),
  wonText = resultBox.querySelector(".won-text"),
  replayBtn = resultBox.querySelector("button");
let clickBOx = new Audio("music/click.wav");
let drawn = new Audio("music/draw.wav");
let replay = new Audio("music/repaly.mp3");
let select = new Audio("music/mixkit-retro-game-notification-212.wav");
let won = new Audio("music/K3RTHA7-game-win-horns.mp3");

// console.log(selectBox,selectOBtn,selectXBtn);

window.onload = () => {
  // once window is loaded

  for (let i = 0; i < allBox.length; i++) {
    // console.log("this")
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }

  selectXBtn.addEventListener("click", function () {
    selectBox.classList.add("hide"); // hide the select box after choosing the character
    playBoard.classList.add("show");
    select.play();
  });
  selectOBtn.addEventListener("click", function () {
    selectBox.classList.add("hide"); // hide the select box after choosing the character
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
    select.play();
  });
};

let playerXIcon = "X"; // class name of fontawsome cross icon
let playerOIcon = "O"; //class name of fontawsome circle icon
let playerSign = "X";
runBot = true;
function clickedBox(element) {
  clickBOx.play();
  // console.log(element)
  if (players.classList.contains("player")) {
    playerSign = "O";
    element.innerHTML = `<i>${playerOIcon}</i>`;
    players.classList.remove("active");
    element.setAttribute("id", playerSign);
  } else {
    element.innerHTML = `<i>${playerXIcon}</i>`;
    element.setAttribute("id", playerSign);
    players.classList.add("active");
  }
  selectWinner();
  element.style.pointerEvents = "none";
  playBoard.style.pointerEvents = "none";
  let randomDelaytime = (Math.random() * 1000 + 200).toFixed(); //generating random time delay so bot will delay randomly to select the box
  // console.log(randomDelaytime);
  setTimeout(() => {
    bot(runBot); //calling bot function
  }, randomDelaytime); // passing random delay time
}

function bot() {
  let array = [];
  if (runBot) {
    playerSign = "O";

    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        array.push(i);
        // console.log(i + " " + "has no children")
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]; // getting random index from array so bot will select random unselected box
    if (array.length > 0) {
      if (players.classList.contains("player")) {
        playerSign = "X";
        allBox[randomBox].innerHTML = `<i>${playerXIcon}</i>`;
        allBox[randomBox].setAttribute("id", playerSign);
        players.classList.add("active");
      } else {
        allBox[randomBox].innerHTML = `<i>${playerOIcon}</i>`;
        players.classList.remove("active");
        allBox[randomBox].setAttribute("id", playerSign);
      }
      selectWinner();
    }
    allBox[randomBox].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";
    playerSign = "X";
  }
}

function getIdVal(classname) {
  return document.querySelector(".box" + classname).id;
}

function checkIdSign(val1, val2, val3, sign) {
  if (
    getIdVal(val1) == sign &&
    getIdVal(val2) == sign &&
    getIdVal(val3) == sign
  ) {
    return true;
  }
}

function selectWinner() {
  if (
    checkIdSign(1, 2, 3, playerSign) ||
    checkIdSign(4, 5, 6, playerSign) ||
    checkIdSign(7, 8, 9, playerSign) ||
    checkIdSign(1, 4, 7, playerSign) ||
    checkIdSign(2, 5, 8, playerSign) ||
    checkIdSign(3, 6, 9, playerSign) ||
    checkIdSign(1, 5, 9, playerSign) ||
    checkIdSign(3, 5, 7, playerSign)
  ) {
    runBot = false;
    bot(runBot);
    setTimeout(() => {
      resultBox.style.display = "flex";
      playBoard.style.display = "none";
      //    resultBox.classList.add("show");
      //    playBoard.classList.remove("show");
    }, 700);
    won.play();
    wonText.innerHTML = `Player<p>${playerSign}</p> won the game!`;
    // console.log(playerSign + " " + "is the winner")
  } else {
    if (
      getIdVal(1) != "" &&
      getIdVal(2) != "" &&
      getIdVal(3) != "" &&
      getIdVal(4) != "" &&
      getIdVal(5) != "" &&
      getIdVal(6) != "" &&
      getIdVal(7) != "" &&
      getIdVal(8) != "" &&
      getIdVal(9) != ""
    ) {
      runBot = false;
      bot(runBot);
      setTimeout(() => {
        resultBox.style.display = "flex";
        playBoard.style.display = "none";
        // resultBox.classList.add("show");
        // playBoard.classList.remove("show");
      }, 700);
      drawn.play();
      wonText.textContent = "Match has been drawn!";
    }
  }
}

replayBtn.onclick = () => {
  replay.play();
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};

const canvas = document.getElementById("canvas1");

const ctx = canvas.getContext("2d");
console.log(ctx);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
const mouse = {
  x: null,
  y: null,
};

canvas.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  // drawCircle();
  for (let i = 0; i < 10; i++) {
    particlesArray.push(new Particle());
  }
  
});

// canvas.addEventListener("mousemove", function (event) {
//   mouse.x = event.x;
//   mouse.y = event.y;
//   // drawCircle();
//   // for (let i = 0; i < 1; i++) {
   
//   // }

//   particlesArray.push(new Particle());
// });

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.size =  5;                 // Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.fillStyle = "white"; // rgb(114, 73, 73)
    // ctx.strokeStyle = "black";
    // ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    // ctx.stroke();
    ctx.fill();
  }
}
// function init(){
//     for (let i = 0; i < 100; i++) {
//         particlesArray.push(new Particle());

//   }
// }
// init();
// console.log(particlesArray)

function handleParticle() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if(distance < 100){
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(172, 50, 50, 0.575)';
        ctx.lineWidth = 0.8;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  // ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  requestAnimationFrame(animate);
}
animate();
