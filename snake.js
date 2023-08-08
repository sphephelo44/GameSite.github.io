document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas")
  const ctx = canvas.getContext("2d")
  const blockSize = 10
  const grid_columns = 30
  const grid_rows = 17
  let snakeX = 50
  let snakeY = 50
  let velocityX = 0
  let velocityY = 0
  let foodX
  let foodY
  let gameFps
  let snakeBody = []
  canvas.width = blockSize * grid_columns
  canvas.height = blockSize * grid_rows
  document.querySelector("#btns-section").addEventListener("click", snakeDirection)

  const placeFood = () => {
    foodX = Math.floor(Math.random() * grid_columns) * blockSize
    foodY = Math.floor(Math.random() * grid_rows) * blockSize
  }
  placeFood()
  const update = () => {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "orange"
    ctx.fillRect(foodX, foodY, blockSize, blockSize)
    
    if (snakeX === foodX && snakeY === foodY) {
      snakeBody.push([foodX, foodY])
      placeFood()
    }

      for (let i = snakeBody.length -1; i > 0; i--) {
        snakeBody[i] = snakeBody[i -1]
        console.log(i)
      }

      if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
      }

    ctx.fillStyle = "pink"
    snakeX += velocityX
    snakeY += velocityY
    ctx.fillRect(snakeX, snakeY, blockSize, blockSize)
    for (let i = 0; i < snakeBody.length; i++) {
      ctx.fillStyle = "pink"
      ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    if (snakeX + blockSize > canvas.width || snakeX < 0) clearInterval(gameFps)
    if (snakeY + blockSize > canvas.height || snakeY < 0) clearInterval(gameFps)
    
    for (let i = 0; i < snakeBody.length; i++) {
      if (snakeX === snakeBody[i][0] || snakeY === snakeBody[i][1]) {
        clearInterval(gameFps)
        console.log(`first: ${snakeBody[i][0]} second: ${snakeBody[i][1]}`)
      }
    }
  }

  function snakeDirection(e) {
    const id = e.target.id
    if (id === "up-btn" && velocityY === 0) {
      velocityX = 0
      velocityY = -blockSize
    } else if (id === "right-btn" && velocityX === 0) {
      velocityY = 0
      velocityX = blockSize
    } else if (id === "down-btn" && velocityY === 0) {
      velocityX = 0
      velocityY = blockSize
    } else if (id === "left-btn" && velocityX === 0) {
      velocityY = 0
      velocityX = -blockSize
    }
  }
  gameFps = setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    update()
  }, 1000/5);
  //placeFood()
})