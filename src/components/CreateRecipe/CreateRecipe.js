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
    ingredients: [{
      name: '',
      quantity: '',
      measurement: ''
    }],
    description: ''
  })

  const [createdRecipeId, setCreatedRecipeId] = useState(null)

  const handleChange = event => {
    console.log(event.target.value)
    const updatedField = { [event.target.name]: event.target.value }
    const editedRecipe = Object.assign({ ...recipe }, updatedField)
    console.log(editedRecipe)
    setRecipe(editedRecipe)
  }
  // const addIngredient = event => {
  // }
  const createRecipe = event => {
    event.preventDefault()
    console.log(recipe.ingredients)
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
  const recipeStyle = {
    boxShadow: '2px 4px gray',
    borderRadius: '20px',
    border: '2px solid gray',
    padding: '10px',
    width: '600px',
    margin: '10px'
  }
  return (
    <div style={recipeStyle}>
      <Layout>
        <div>
          <h4>Create a recipe!</h4>
          <RecipeForm
            recipe={recipe}
            handleChange={handleChange}
            handleSubmit={createRecipe}
            cancelPath="/recipes"
          />
        </div>
      </Layout>
    </div>
  )
}

export default RecipeCreate
