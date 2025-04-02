require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const userRouter = require("./src/api/routes/user.route");
const teamsRouter = require("./src/api/routes/team.route");
const { connectCloudinary } = require("./src/config/cloudinary");

const app = express();

connectDB();
connectCloudinary();

app.use(express.json());

app.use("api/v1/users", userRouter);
app.use("api/v1/teams", teamsRouter);


app.listen(3000, () => {
    console.log("Servidor levantado en: http://localhost:3000")
});