const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const connectDb = require('./database/connectDB');
const app = express();

connectDb();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/',require("./routes/userRoutes"));
app.listen(port, () => {
    console.log(`Server started at link http://localhost:${port}`);
})