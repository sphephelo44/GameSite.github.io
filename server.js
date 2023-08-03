const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises
const eventEmitter = require("events")
const host = "localhost"
const eventsLogger = require("./middleware/logEvents")
const port = process.env.PORT || 4444

class MyEmitter extends eventEmitter {}
const emitter = new MyEmitter()

const serveFile = async (filePath, contentType, res) => {
  try {
    const data = await fsPromises.readFile(filePath, "utf-8")
    res.writeHead(200, {"content-type": contentType})
    res.end(data)
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.end()
  }
}
const server = http.createServer((req, res) => {
  //console.log(req.method, req.url)
  eventsLogger(`${req.url}\t${req.method}`, "reqLogs.log")
  const extension = path.extname(req.url)
  let contentType
    emitter.emit("log", )
  switch (extension) {
    case ".css":
      contentType = "text/css"
      break;
    case ".js":
      contentType = "text/javascript"
      break;
    default:
      contentType = "text/html"
    }
    
    let filePath = contentType === "text/html" && req.url === "/"
    ? path.join(__dirname, "index.html"): contentType === "text/html" && req.url.slice(-1) === "/"
    ? path.join(__dirname, "index.html"): contentType === "text/html"
    ? path.join(__dirname, req.url): path.join(__dirname, req.url)
    if(!extension && req.url.slice(-1) != "/") filePath += ".html"
    
    const fileExists = fs.existsSync(filePath)
    if(fileExists) {
      serveFile(filePath, contentType, res)
    } else {
      serveFile(path.join(__dirname, "404.html"), contentType, res)
    }
  })

  server.listen(port, host, (err) => {
    if (err) console.log(err)
    console.log(`server is running at http://${host}:${port}`)
  })