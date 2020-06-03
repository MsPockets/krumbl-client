import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import messages from '../AutoDismissAlert/messages'

const Recipes = props => {
  const [recipes, setRecipes] = useState([])
  useEffect(() => {
    axios({
      url: `${apiUrl}/recipes`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setRecipes(res.data.recipes))
      .catch(error => {
        this.props.msgAlert({
          heading: 'Failed to view: ' + error.message,
          message: messages.viewRecipeFailure,
          variant: 'danger'
        })
      })
  }, [])
  const recipeStyle = {
    boxShadow: '2px 4px gray',
    borderRadius: '20px',
    border: '2px solid gray',
    padding: '10px',
    width: '600px',
    margin: '10px',
    backgroundColor: '#f0f0f0'
  }
  const titleStyle = {
    display: 'flex',
    justifyContent: 'center'
  }
  const ingredientsStyle = {
    margin: '5px',
    fontSize: '14px'
  }
  const directionStyle = {
    margin: '5px',
    fontSize: '12px'
  }
  const mainBoard = {
    display: 'flex',
    justifyContent: 'center'
  }
  const RecipesList = recipes.reverse().map(recipe => (
    <div style={recipeStyle} key={recipe.id}>
      <h4 style={titleStyle}>
        <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
      </h4>
      <p style={ingredientsStyle}>Ingredients: {recipe.ingredients}</p>
      <p style={directionStyle}>Directions: {recipe.description}</p>
    </div>
  ))
  const postBoard = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  }
  return (
    <div style={mainBoard}>
      <Layout>
        <div>
          <h4 style={titleStyle}>Check out the latest recipes!</h4>
          <ul style={postBoard}>
            {RecipesList}
          </ul>
        </div>
      </Layout>
    </div>
  )
}

export default Recipes
