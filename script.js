let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnText = document.querySelector("#turn");

let oScore = document.querySelector("#o-score");
let xScore = document.querySelector("#x-score");
let drawScore = document.querySelector("#draw-score");

let turnO = true;
let count = 0;

let oCount = 0;
let xCount = 0;
let drawCount = 0;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const resetGame = () => {
  turnO = true;
  count = 0;
  turnText.innerText = "Turn: O";
  msgContainer.classList.add("hide");

  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
    box.classList.remove("win");
  });
};

boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    box.innerText = turnO ? "O" : "X";
    box.disabled = true;
    count++;

    let isWinner = checkWinner();
    if (isWinner) return;

    if (count === 9) {
      gameDraw();
      return;
    }

    turnO = !turnO;
    turnText.innerText = `Turn: ${turnO ? "O" : "X"}`;
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a,b,c] = pattern;
    let v1 = boxes[a].innerText;
    let v2 = boxes[b].innerText;
    let v3 = boxes[c].innerText;

    if (v1 && v1 === v2 && v2 === v3) {
      pattern.forEach(i => boxes[i].classList.add("win"));
      showWinner(v1);
      return true;
    }
  }
  return false;
};

const showWinner = (winner) => {
  msg.innerText = `🎉 Winner is ${winner}`;
  msgContainer.classList.remove("hide");

  if (winner === "O") {
    oCount++;
    oScore.innerText = oCount;
  } else {
    xCount++;
    xScore.innerText = xCount;
  }

  boxes.forEach(box => box.disabled = true);
};

const gameDraw = () => {
  msg.innerText = "😐 Game Draw!";
  msgContainer.classList.remove("hide");

  drawCount++;
  drawScore.innerText = drawCount;

  boxes.forEach(box => box.disabled = true);
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
