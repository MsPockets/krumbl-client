import React from 'react'
import Layout from '../shared/Layout'
import { RecipesList } from '../Recipes/Recipes'
// import CreateRecipe from '../CreateRecipe/CreateRecipe'

const Home = () => (
  <Layout>
    <h4>Welcome to Krumbl!</h4>
    <h6>Here are some of the latest recipes</h6>
    <ul>
      {RecipesList}
    </ul>
  </Layout>
)

export default Home
