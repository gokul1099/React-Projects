const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Hello there")
})

app.listen(process.env.PORT, () => {
    console.log(`app is running in ${process.env.PORT}`)
})