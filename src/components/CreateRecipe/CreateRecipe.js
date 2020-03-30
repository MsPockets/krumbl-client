import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import RecipeForm from '../shared/RecipeForm'
import Layout from '../shared/Layout'

const RecipeCreate = props => {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    description: ''
  })
  const [createdRecipeId, setCreatedRecipeId] = useState(null)

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedRecipe = Object.assign({ ...recipe }, updatedField)

    setRecipe(editedRecipe)
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/recipes`,
      method: 'POST',
      data: { recipe }
    })
      .then(res => setCreatedRecipeId(res.data.recipe.id))
      .catch(console.error)
  }

  if (createdRecipeId) {
    return <Redirect to={`/recipes/${createdRecipeId}`} />
  }

  return (
    <Layout>
      <RecipeForm
        Recipe={recipe}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </Layout>
  )
}

export default RecipeCreate
