import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import RecipeForm from '../shared/RecipeForm'
import Layout from '../shared/Layout'

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
      .catch(console.error)
  }, [])

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedRecipe = Object.assign({ ...recipe }, updatedField)

    setRecipe(editedRecipe)
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/recipes/${props.match.params.id}`,
      method: 'PATCH',
      data: { recipe }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }
  if (updated) {
    return <Redirect to={`/recipes/${props.match.params.id}`} />
  }

  return (
    <Layout>
      <RecipeForm
        Recipe={recipe}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/recipes/${props.match.params.id}`}
      />
    </Layout>
  )
}
export default RecipeEdit
