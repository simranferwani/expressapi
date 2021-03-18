//creating server
const path = require("path");
const http = require("http");
const fs = require("fs");
http
  .createServer((req, res) => {
    if (req.url === "/") {
      fs.readFile("./public/index.html", "UTF-8", (err, html) => {
        res.writeHead(200, { "Content-type": "text/html" });
        res.end(html);
      });
    } else if (req.url.match(".css$")) {
      let cssPath = path.join(__dirname, "public", req.url);
      console.log(cssPath);

      let fileStream = fs.createReadStream(cssPath, "UTF-8");
      res.writeHead(200, { "Content-type": "text/css" });
      fileStream.pipe(res);
    } else if (req.url.match(".jpg$")) {
      let imagePath = path.join(__dirname, "public", req.url);
      let fileStream = fs.createReadStream(imagePath);
      res.writeHead(200, { "Content-type": "text/jpg" });
      fileStream.pipe(res);
    } else {
      res.writeHead(404, { "Content-type": "text/html" });
      res.end("Content not found");
    }

    console.log(req.url);
  })
  .listen(4000);
