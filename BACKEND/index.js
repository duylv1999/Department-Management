const express = require('express')
const app = express()
const cors = require("cors")
const route = require("./src/routes")

// middleware 
app.use(cors());
app.use(express.json())

// Routers init
route(app)

app.listen (5000, () => {
    console.log('server has started on port 5000')
});