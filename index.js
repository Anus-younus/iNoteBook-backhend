const conectToMongo = require('./db');
const express = require('express');

conectToMongo()
const app = express()
const port = 5000
//Avaliabe Routes

app.use(express.json())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (res, req) =>  {
    res.send("hello world");
})

app.listen(port, () => {
    console.log("port is running at " + port);
})