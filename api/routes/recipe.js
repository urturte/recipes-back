// const express = require("express");
import express from "express";
const router = express.Router();
import * as recipeController from "../controllers/recipe.js";
// const recipeController = require("../controllers/recipe");
import auth from "../middlewares/auth.js";

router.post(
  "/newRecipe",
  // auth,
  recipeController.createRecipe
);

router.get(
  "/myRecipes",
  //  auth,
  recipeController.getMyRecipes
);

router.get(
  "/recipe/:id",
  //  auth,
  recipeController.getRecipeById
);

export { router };
