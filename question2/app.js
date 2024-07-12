const express = require('express')
const app = express();
const PORT = 9876


app.get('/')
app.listen(PORT, (req, res) => {
    console.log(`server started at ${"http://localhost:9876"}`);

})