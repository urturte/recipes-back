import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import { router as recipeRoutes } from "./api/routes/recipe.js";
import { router as userRoutes } from "./api/routes//user.js";
import mongoose from "mongoose";

// const bodyParser = require("body-parser");
// const recipeRoutes = require("./api/routes/recipe");
// const mongoose = require("mongoose");
// require("dotenv").config();

mongoose.set("strictQuery", false);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

mongoose
  .connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true })
  .then(console.log("connected"))
  .catch((err) => {
    console.log("Connection error");
    console.log(err);
  });

app.use(recipeRoutes);
app.use(userRoutes);
app.listen(8080);
