// use the DOM for representing the html
const startText = document.getElementById("startText");
console.log(startGame);

let gameRunning = false;
document.addEventListener("keydown", startGame);
// start the game
function startGame() {
  gameRunning = true;
  startText.style.display = "none";
  // without removing the event listener, the game will keep starting whenever a key is pressed, the game should start once until its finished
  document.removeEventListener("keydown", startGame);
}
