const game_start = () => {
  Array.from(document.querySelectorAll(".btn")).forEach(btn => btn.addEventListener("click", btn_clicked))
}
document.querySelector(".restart-btn").addEventListener("click", restartGame)
function btn_clicked(e) {
  const id = e.target.id
  const game_choices = ["rock", "paper", "scissors"]
  const computer_choice = Math.floor(Math.random() * game_choices.length)
  document.querySelector("#player-display").innerText = `player:\t${id}`
  document.querySelector("#computer-display").innerText = `computer:\t${game_choices[computer_choice]}`
  displayResult(id, game_choices[computer_choice])
}
function displayResult(player, computer) {
  const result = player === computer
  ? "tie": player === "rock" && computer === "scissors"
  ? "player wins": player === "paper" && computer === "rock"
  ? "player wins": player === "scissors" && computer === "paper"
  ? "player wins": computer === "rock" && player === "scissors"
  ? "computer wins": computer === "paper" && player === "rock"
  ? "computer wins": "computer wins"
  document.querySelector("#result-display").innerText = `result:\t${result}`
  updateScore(result)
}
function updateScore(result) {
  let player_score = document.querySelector(".player-score").innerText
  let computer_score = document.querySelector(".computer-score").innerText
  if (result === "player wins") player_score++
  if (result === "computer wins") computer_score++
  document.querySelector(".player-score").innerText = `\t${player_score}`
  document.querySelector(".computer-score").innerText = `\t${computer_score}`
}
function restartGame() {
  document.querySelector(".player-score").innerText = `\t0`
  document.querySelector(".computer-score").innerText = `\t0`
  document.querySelector("#player-display").innerText = "player:"
  document.querySelector("#computer-display").innerText = "computer:"
  document.querySelector("#result-display").innerText = "result:"
}
game_start()