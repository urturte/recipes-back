// const mongoose = require("mongoose");
import mongoose from "mongoose";

// const recipeSchema = mongoose.Schema({
//   title: { type: String, required: true },
//   image: { type: String, required: true },
//   prepTime: { type: String },
//   servings: { type: Number },
//   ingredientList: { type: Array, required: true },
//   description: { type: Array, required: true },
// });

const RecipeSchema = mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  prepTime: { type: String },
  servings: { type: Number },
  ingredientList: { type: String },
  description: { type: String },
  keywords: { type: Array },
});

export default mongoose.model("Recipe", RecipeSchema);
// module.exports = mongoose.model("Recipe", recipeSchema);
