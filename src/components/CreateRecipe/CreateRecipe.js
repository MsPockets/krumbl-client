import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import RecipeForm from '../shared/RecipeForm'
import Layout from '../shared/Layout'
import messages from '../AutoDismissAlert/messages'

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

  const createRecipe = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/recipes`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      },
      data: { recipe }
    })
      .then(res => setCreatedRecipeId(res.data.recipe.id))
      .then(() => props.msgAlert({
        heading: 'Post Success',
        message: messages.creteRecipeSuccess,
        variant: 'success'
      }))
      .catch(error => props.msgAlert({
        heading: 'Failed to post: ' + error.message,
        message: messages.createRecipeFailure,
        variant: 'danger'
      }))
  }

  if (createdRecipeId) {
    return <Redirect to={`/recipes/${createdRecipeId}`} />
  }

  return (
    <Layout>
      <RecipeForm
        recipe={recipe}
        handleChange={handleChange}
        handleSubmit={createRecipe}
        cancelPath="/"
      />
    </Layout>
  )
}

export default RecipeCreate
