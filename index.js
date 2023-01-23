const express = require("express");
const app = express();
require("dotenv").config();
const {UserRouter} = require("./Routers/user.router")
const {TodoRouter} = require("./Routers/todos.router")
const cors = require("cors")
const {connection} = require("./Config/db")

app.use(express.json());
app.use(cors())


app.get("/", (req, res) => {
  res.send({ msg: `Welcome to my application which is running at port ${process.env.PORT}` });
});

app.use("/todos", TodoRouter)
app.use("/users", UserRouter)

app.listen(7500, async() => {
  try {
    await connection;
    console.log(`Listening at PORT ${process.env.PORT}`);
  } catch (err) {
    console.log("Error while connecting to the server");
    console.log("Error", err);
  }
});
