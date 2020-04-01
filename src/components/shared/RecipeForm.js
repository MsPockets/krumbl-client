import React from 'react'
import { Link } from 'react-router-dom'

const RecipeForm = ({ recipe, handleSubmit, handleChange, cancelPath }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        placeholder="Pallella, Zucchini Bread"
        name="title"
        value={recipe.title}
        onChange={handleChange}
      />
      <br></br>
      <label>Ingredients</label>
      <textarea
        placeholder="5 g Smoked Paprika, 2 1/2 cups Flour"
        name="ingredients"
        value={recipe.ingredients}
        onChange={handleChange}
      />
      <br></br>
      <label>Description</label>
      <textarea
        placeholder="How do you turn the ingredients into the dish?"
        name="description"
        value={recipe.description}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
      <Link to={cancelPath}>
        <button>Cancel</button>
      </Link>
    </form>
  </div>
)

export default RecipeForm
