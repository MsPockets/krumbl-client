import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import messages from '../AutoDismissAlert/messages'

class Recipe extends Component {
  constructor (props) {
    super(props)

    this.state = {
      recipe: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}${this.props.match.url}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ recipe: res.data.recipe }))
      .catch(error => {
        this.setState({ recipe: '', deleted: '' })
        this.props.msgAlert({
          heading: 'Failed to load: ' + error.message,
          message: messages.viewRecipeFailure,
          variant: 'danger'
        })
      })
  }

  destroy = () => {
    axios({
      url: `${apiUrl}${this.props.match.url}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .then(() => this.props.msgAlert({
        heading: 'Delete Success',
        message: messages.deleteRecipeSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ recipe: '', deleted: '' })
        this.props.msgAlert({
          heading: 'Failed to delete: ' + error.message,
          message: messages.deleteRecipeFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { recipe, deleted } = this.state
    if (!recipe) {
      return <p>Loading...</p>
    }
    const recipeStyle = {
      boxShadow: '2px 4px gray',
      borderRadius: '20px',
      border: '2px solid gray',
      padding: '10px',
      width: '85vw',
      margin: '10px',
      background: 'white',
      color: 'black'
    }
    if (deleted) {
      return <Redirect to={
        { pathname: '/recipes', state: { msg: 'Recipe succesfully deleted!' } }
      } />
    }
    return (
      <Layout>
        <div style={recipeStyle}>
          <h4>{recipe.title}</h4>
          <p>Ingredients: {recipe.ingredients.name} {recipe.ingredients.quantity} {recipe.ingredients.measurement} </p>
          <p>Directions: {recipe.description}</p>
          <br></br>
          {recipe.editable && (
            <button onClick={this.destroy}>Delete</button>
          )}
          {recipe.editable && (
            <Link to={`/recipes/${this.props.match.params.id}/edit`}>
              <button>Edit</button>
            </Link>
          )}
          <br></br>
          <Link to="/recipes">Back to all Recipes</Link>
        </div>
      </Layout>
    )
  }
}

export default Recipe
