// const { response } = require("express");
// const RecipeSchema = require("../models/recipeModel");
import { response } from "express";
import RecipeSchema from "../models/recipeModel.js";
import UserSchema from "../models/userModel.js";
import auth from "../middlewares/auth.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

async function createRecipe(req, res) {
  const recipe = new RecipeSchema({
    title: req.body.title,
    image: req.body.image,
    prepTime: req.body.prepTime,
    servings: req.body.servings,
    ingredientList: req.body.ingredientList,
    description: req.body.description,
    keywords: [""],
  });
  recipe.save();
  UserSchema.updateOne(
    { _id: req.body.userId },
    {
      $push: { recipes: recipe._id },
    }
  )
    .exec()
    .then((result) => {
      return res.status(200).json({
        statusMessage: "Recipe added to Your virtual recipe book",
        user: result,
        recipe: recipe,
      });
    })
    .catch((err) => {
      console.log("Error occured", err);
      res.status(404).json({ response: "Error try again" });
    });
}

async function addKeyword(req, res) {
  const recipe = await RecipeSchema.findOne({
    _id: req.params.id,
  }).exec();
  RecipeSchema.updateOne(
    { _id: req.params.id },
    {
      $push: { keywords: req.body.keywords.toString() },
    }
  )
    .exec()
    .then((result) => {
      return res.status(200).json({
        statusMessage: "Recipe added to Your virtual recipe book",
        user: result,
        recipe: recipe,
      });
    })
    .catch((err) => {
      console.log("Error occured", err);
      res.status(404).json({ response: "Error try again" });
    });
}

async function getMyRecipes(req, res) {
  // const data = await UserSchema.aggregate([
  //   {
  //     $lookup: {
  //       from: "recipes",
  //       localField: "recipes",
  //       foreignField: "_id",
  //       as: "userRecipes",
  //     },
  //   },
  //   { $match: { _id: ObjectId(req.body.userId) } },
  // ]).exec();

  // console.log(data);

  // return res.status(200).json({ userWithRecipes: data });

  RecipeSchema.find()
    .sort(" name")
    .then((result) => {
      return res.status(200).json({ recipes: result });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(404).json({ response: "Something went wrong" });
    });
}

export function getRecipeById(req, res) {
  RecipeSchema.findOne({ _id: req.params.id })
    .then((result) => {
      return res.status(200).json({ recipe: result });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(404).json({ response: "Something went wrong" });
    });
}
export { createRecipe, getMyRecipes, addKeyword };
