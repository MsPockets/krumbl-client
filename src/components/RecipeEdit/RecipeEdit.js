import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import RecipeForm from '../shared/RecipeForm'
import Layout from '../shared/Layout'
import messages from '../AutoDismissAlert/messages'

const RecipeEdit = props => {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    description: ''
  })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/recipes/${recipe.id}`)
      .then(res => setRecipe(recipe))
      .catch(error => {
        props.msgAlert({
          heading: 'Failed to get recipe to update: ' + error.message,
          message: messages.editRecipeFailure,
          variant: 'danger'
        })
      })
  }, [])

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedRecipe = Object.assign({ ...recipe }, updatedField)
    setRecipe(editedRecipe)
  }

  const editRecipe = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/recipes/${props.match.params.id}`,
      method: 'PATCH',
      data: { recipe },
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => setUpdated(true))
      .then(() => props.msgAlert({
        heading: 'Edit Success',
        message: messages.editRecipeSuccess,
        variant: 'success'
      }))
      .catch(error => {
        props.msgAlert({
          heading: 'Failed to update: ' + error.message,
          message: messages.editRecipeFailure,
          variant: 'danger'
        })
      })
  }
  if (updated) {
    return <Redirect to={`/recipes/${props.match.params.id}`} />
  }

  return (
    <Layout>
      <RecipeForm
        recipe={recipe}
        handleChange={handleChange}
        handleSubmit={editRecipe}
        cancelPath={`/recipes/${props.match.params.id}`}
      />
    </Layout>
  )
}
export default RecipeEdit
