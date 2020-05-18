import React from 'react'
import { Link } from 'react-router-dom'

const RecipeForm = ({ recipe, handleSubmit, handleChange, cancelPath, addIngredient }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        required="true"
        placeholder="Pallella, Zucchini Bread"
        name="title"
        value={recipe.title}
        onChange={handleChange}
      />

      <br></br>

      <label>Ingredients</label>
      <form id="ingredinet-form">
        <input
          placeholder="Paprika, Flour, Water"
          name="name"
          value={recipe.ingredients}
          onChange={handleChange}
        />
        <input
          required="true"
          name
          placeholder="1, 1.5, .75"
          value={recipe.ingredients.quantity}
          onChange={handleChange}
        />
        <select required="true" label="Measurement" value={recipe.ingredients.measurement} name="measurement">
          <option value="g">Grams</option>
          <option value="ml">Milliliters</option>
          <option value="Cups">Cups</option>
          <option value="tsp">Teaspoons</option>
          <option value="Tbsp">Tablespoons</option>
          <option value="Quarts">Quarts</option>
          <option value="Gallons">Gallons</option>
        </select>

        <button onClick={addIngredient}>➕</button>
      </form>

      <br></br>

      <label>Description</label>
      <textarea
        required="true"
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
