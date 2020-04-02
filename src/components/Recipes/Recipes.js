import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'

const Recipes = props => {
  const [recipes, setRecipes] = useState([])
  console.log(props.user.token)
  useEffect(() => {
    axios({
      url: `${apiUrl}/recipes`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setRecipes(res.data.recipes))
      .catch(console.error)
  }, [])

  const RecipesList = recipes.reverse().map(recipe => (
    <div key={recipe.id}>
      <h4>
        <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
      </h4>
      <p>Ingredients: {recipe.ingredients}</p>
      <p>Directions: {recipe.description}</p>
    </div>
  ))

  return (
    <Layout>
      <h4>Check out the latest recipes!</h4>
      <ul>
        {RecipesList}
      </ul>
    </Layout>
  )
}

export default Recipes