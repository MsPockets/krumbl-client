import React from 'react'
import { Link } from 'react-router-dom'

const RecipeForm = ({ recipe, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder="Pallella, Zucchini Bread"
      value={recipe.title}
      name="title"
      onChange={handleChange}
    />

    <label>Ingredients</label>
    <textarea
      placeholder="5 g Smoked Paprika, 2 1/2 cups Flour"
      value={recipe.ingredients}
      name="ingredients"
      onChange={handleChange}
    />

    <label>Description</label>
    <textarea
      type="text"
      placeholder="How do you turn the ingredients into the dish?"
      value={recipe.description}
      name="description"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default RecipeForm
