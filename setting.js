"use strict";
const score = document.querySelector(".prScore");
const startScreen = document.querySelector(".startScreen");
const sms = document.querySelector(".sms");
const gameArea = document.querySelector(".gameArea");
const btScore = document.querySelector(".btScore");
const board = document.querySelector(".score");
const move = document.querySelector("#move");
const bg = document.querySelector("#bg");
const cr = document.querySelector("#cr");
const crImg = document.querySelector(".startImg");
const bgCover = document.querySelector(".carGame");
const select = document.querySelector(".select");
const mobile = document.querySelector(".mobile");
const pc = document.querySelector(".pc");
const controler = document.querySelector(".controler");
// keys
const up = document.querySelector(".up");
const down = document.querySelector(".down");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
/////////////////////////////////////////////////////////
let car;
let bestScore = 0;
let player = { speed: 5, controle: 4 };
let keys = {
  ArrowRight: false,
  ArrowLeft: false,
  ArrowUp: false,
  ArrowDown: false,
};
down.addEventListener("mousedown", () => (keys.ArrowDown = true));
down.addEventListener("mouseup", () => (keys.ArrowDown = false));
up.addEventListener("mousedown", () => (keys.ArrowUp = true));
up.addEventListener("mouseup", () => (keys.ArrowUp = false));
left.addEventListener("mousedown", () => (keys.ArrowLeft = true));
left.addEventListener("mouseup", () => (keys.ArrowLeft = false));
right.addEventListener("mousedown", () => (keys.ArrowRight = true));
right.addEventListener("mouseup", () => (keys.ArrowRight = false));

mobile.addEventListener("click", () => {
  select.classList.add("none");
  controler.classList.remove("none");
  startScreen.classList.remove("none");
  gameArea.classList.add("height");
});
pc.addEventListener("click", () => {
  startScreen.classList.remove("none");
  select.classList.add("none");
});

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyUp);
function keydown(e) {
  e.preventDefault();
  keys[e.key] = true;
}
function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
}

startScreen.addEventListener("click", start);
// game start function
function start() {
  clean();
  startScreen.classList.add("hide");
  gameArea.classList.remove("hide");
  board.classList.remove("hide");
  Elmntcreation();
  setTimeout(() => {
    player.speed += 2;
  }, 40000);
  setTimeout(() => {
    player.speed += 2;
    player.controle += 1;
  }, 12000);
  setTimeout(() => {
    player.speed += 2;
    player.controle += 1;
  }, 20000);
  setTimeout(() => {
    player.speed += 2;
    player.controle += 1;
  }, 35000);
  window.requestAnimationFrame(playGame);
}
//Default settings for start
function clean() {
  player.start = true;
  player.score = 0;
  player.speed = 5;
  player.controle = 4;
  gameArea.innerHTML = "";
}
// Game play loop
function playGame() {
  if (player.start) {
    const ratio = gameArea.getBoundingClientRect();
    player.maxY = ratio.height;
    player.maxX = ratio.width;
    player.carY = car.offsetTop;
    player.carX = car.offsetLeft;
    controller(car);
    scoreCal();

    window.requestAnimationFrame(playGame);
  }
}
//Game controller ==>
function controller(car) {
  // let car = document.querySelector(".car");

  if (keys.ArrowDown && player.carY < player.maxY - 95) {
    car.style.top = `${player.carY + player.controle}px`;
    move.play();
  }

  if (keys.ArrowUp && player.carY > 90) {
    car.style.top = `${player.carY - player.controle}px`;
    move.play();
  }
  if (keys.ArrowLeft && player.carX > 5) {
    car.style.left = `${player.carX - player.controle}px`;
    move.play();
  }
  if (keys.ArrowRight && player.carX < player.maxX - 65) {
    car.style.left = `${player.carX + player.controle}px`;
    move.play();
  }
  animat(car);
}
//Score collect
function scoreCal() {
  player.score++;
  score.innerHTML = `Score : ${player.score} `;
  if (player.score > bestScore) {
    bestScore = player.score;
    btScore.innerHTML = `Best : ${bestScore}`;
  } else {
    btScore.innerHTML = `Best : ${bestScore}`;
  }
}

//Game animation creat
function animat(car) {
  const lins = document.querySelectorAll(".roadLine");
  const enemeyCar = document.querySelectorAll(".enemyCar");
  lins.forEach((value, i) => {
    if (value.y >= 750) {
      value.y -= 800;
    }
    value.y += player.speed;
    value.style.top = value.y + "px";
  });

  enemeyCar.forEach((value) => {
    if (isColide(car, value)) {
      endGame();
    }
    if (value.y >= 800) {
      value.y -= 960;
      let randomImg = Math.trunc(Math.random() * 5 + 1);
      value.style.backgroundImage = `url(img/car${randomImg}.png)`;
      let randomLeft = Math.trunc(Math.random() * 290);
      value.style.left = randomLeft + "px";
    }
    value.y += player.speed;
    value.style.top = value.y + "px";
  });
}
// creat elmnt to play game
function Elmntcreation() {
  // make main car icon ih feild
  car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);
  // make road lines
  for (let x = 0; x < 8; x++) {
    let line = document.createElement("div");
    line.setAttribute("class", "roadLine");
    line.y = x * 100;
    line.style.top = line.y + "px";
    gameArea.appendChild(line);
  }
  // make enemey car line in feild
  for (let x = 0; x < 4; x++) {
    let enemy = document.createElement("div");
    enemy.setAttribute("class", "enemyCar");
    enemy.y = x * 600 * -1;
    enemy.style.top = enemy.y + "px";
    let randomImg = Math.trunc(Math.random() * 5 + 1);
    enemy.style.backgroundImage = `url(img/car${randomImg}.png)`;
    let randomLeft = Math.trunc(Math.random() * 290);
    enemy.style.left = randomLeft + "px";
    gameArea.appendChild(enemy);
  }
  // option maker
  // setTimeout(optional, 1000);
  if (player.start) {
    bg.play();
    setTimeout(() => {
      if (player.start) bg.play();
    }, 44000);
    setTimeout(() => {
      if (player.start) bg.play();
    }, 89000);
    setTimeout(() => {
      if (player.start) bg.play();
    }, 135000);
    setTimeout(() => {
      if (player.start) bg.play();
    }, 180000);
  }
}
// function optional() {
//   let option = document.createElement("div");
//   option.setAttribute("class", "option");
//   option.y = -50;
//   option.style.top = option.y + "px";
//   let randomImg = Math.trunc(Math.random() * 3 + 1);
//   option.style.backgroundImage = `url(img/car${randomImg}.png)`;
//   let randomLeft = Math.trunc(Math.random() * 290);
//   option.style.left = randomLeft + "px";
//   gameArea.appendChild(option);
//   let opIcon = document.querySelector(".option");

//   opIcon.y += player.speed - 2;
//   value.style.top = value.y + "px";
// }
// GAme end function ->
function endGame() {
  player.start = false;
  startScreen.classList.remove("hide");
  board.classList.add("hide");
  cr.play();
  bg.pause();
  let randomImg = Math.trunc(Math.random() * 3 + 1);
  console.log(randomImg);
  crImg.style.backgroundImage = `url(img/crush${randomImg}.png)`;
  sms.innerHTML = `Game over <br/> Your score : ${player.score} <br/> Best : ${bestScore}`;
}
// car Crush or car colide ==>
function isColide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return !(
    aRect.top > bRect.bottom - 3 ||
    aRect.bottom < bRect.top + 5 ||
    aRect.left > bRect.right - 10 ||
    aRect.right < bRect.left + 10
  );
}
