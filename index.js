const express = require("express");
const fs = require("fs");
const status = require("express-status-monitor"); // it provide the status of memory using by node js
const { Stream } = require("stream");
const zlib = require("zlib");
const app = express();
const PORT=8000;

app.use(status());

// for zip the file
// readStream --> zip with help of zipper --> write stream
fs.createReadStream("./sample.txt").pipe(                       // worked as a pipeline stream without waiting or storing in user memory
    zlib.createGzip().pipe(fs.createWriteStream("./sample.zip"))
);

app.get("/",(req,res)=>{
    // fs.readFile("./sample.txt",(err,data)=>{
    //     res.end(data);
    // })
    const status = fs.createReadStream("./sample.txt","utf-8");
    Stream.on("data",(chunk)=> res.write(chunk)); // data read and move in the form of chunks and write.// it provide transfer encoding:chunked (length header) means data coming in the form of chunk so length does not omitted hence no close happen
    Stream.on("end",()=>res.end());
});
app.listen(PORT,()=>console.log("Server started at port:${PORT}"));