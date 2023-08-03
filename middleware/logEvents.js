const path = require("path")
const fsPROMISES = require("fs").promises
const FS = require("fs")

const eventsLogger = async (message, fileName) => {
const date = new Date()
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"]
const dateTime = `${date.getFullYear()} ${months[date.getMonth()]} ${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
const logItem = `\n${dateTime}\t${message}`
  try {
    if(!FS.existsSync(path.join(__dirname, "..", "logs"))) await fsPROMISES.mkdir(path.join(__dirname, "..", "logs"))
  await fsPROMISES.appendFile(path.join(__dirname, "..", "logs", fileName), logItem)
  } catch (e) {
    console.log(e)
  }
}

module.exports = eventsLogger