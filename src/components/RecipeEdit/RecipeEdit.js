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
    axios({
      url: `${apiUrl}/recipes/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setRecipe(res.data.recipe))
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
  const recipeStyle = {
    backgroungColor: '#f0f0f0',
    boxShadow: '2px 4px gray',
    borderRadius: '20px',
    border: '2px solid gray',
    padding: '10px',
    width: '85vw',
    margin: '10px'
  }
  return (
    <div style={recipeStyle}>
      <Layout>
        <RecipeForm
          recipe={recipe}
          handleChange={handleChange}
          handleSubmit={editRecipe}
          cancelPath={`/recipes/${props.match.params.id}`}
        />
      </Layout>
    </div>
  )
}
export default RecipeEdit
