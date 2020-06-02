import React from 'react'
import { Link } from 'react-router-dom'

// const { name } = recipe && recipe.ingredients ? recipe.ingredients.name : null
// const { quantity } = recipe && recipe.ingredients ? recipe.ingredients.quantity : null
// const { measurement } = recipe && recipe.ingredients ? recipe.ingredients.measurement : null

const RecipeForm = ({ recipe, handleSubmit, handleChange, cancelPath, addIngredient }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        type="text"
        required={true}
        placeholder="Pallella, Zucchini Bread"
        name="title"
        value={recipe.title}
        onChange={handleChange}
      />

      <br></br>

      <label>Ingredients</label>
      <div id="ingredient">
        <input
          type="text"
          placeholder="Paprika, Flour, Water"
          name="name"
          value={recipe.ingredients.name}
          onChange={handleChange}
        />
        <input
          type="float"
          required={true}
          name="quantity"
          placeholder="1, 1.5, .75"
          value={recipe.ingredients.quantity}
          onChange={handleChange}
        />
        <select required={true} label="Measurement" value={recipe.ingredients.measurement} onChange={handleChange} name="measurement">
          <option value="g">Grams</option>
          <option value="oz">Ounces</option>
          <option value="ml">Milliliters</option>
          <option value="Cups">Cups</option>
          <option value="tsp">Teaspoons</option>
          <option value="Tbsp">Tablespoons</option>
          <option value="Quarts">Quarts</option>
          <option value="Gallons">Gallons</option>
        </select>

        <button onClick={addIngredient}>➕</button>
      </div>

      <br></br>

      <label>Description</label>
      <textarea
        required={true}
        placeholder="How do you turn the ingredients into the dish?"
        name="description"
        value={recipe.description}
        onChange={handleChange}
      />
      <br></br>
      <button type="submit">Submit</button>
      <Link to={cancelPath}>
        <button>Cancel</button>
      </Link>
    </form>
  </div>
)

export default RecipeForm
