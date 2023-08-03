const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const blockSize = 10
function renderGame() {
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "pink"
  ctx.fillRect(50, 50, blockSize, blockSize)
}

renderGame()