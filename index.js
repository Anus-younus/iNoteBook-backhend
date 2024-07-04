const conectToMongo = require('./db');
const express = require('express');

conectToMongo()
const app = express()
const port = 5000

app.get('/', (res, req) =>  {
    res.send("hello world");
})

app.listen(port, () => {
    console.log("port is running at " + port);
})