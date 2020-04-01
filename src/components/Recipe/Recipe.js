// import React, { useState, useEffect } from 'react'
// import { Link, Redirect } from 'react-router-dom'
// import axios from 'axios'

// import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'

// const Recipe = props => {
//   const [recipe, setRecipe] = useState(null, [])
//   const deleted = useState(false)
//   useEffect(() => {
//     axios(`${apiUrl}/recipes`)
//       .then(res => setRecipe(recipe), [])
//       .catch(console.error)
//   }, [])
//   axios(`${apiUrl}/recipes/${this.props.match.params.id}`)
//     .then(res => this.setState({ recipe: res.data.recipe.id }))
//     .catch(console.error)

//   const destroy = () => {
//     axios({
//       url: `${apiUrl}/recipes/${this.props.match.params.id}`,
//       method: 'DELETE'
//     })
//       .then(() => this.setState({ deleted: true }))
//       .catch(console.error)
//   }

//   if (!recipe) {
//     return <p>Loading...</p>
//   }

//   if (deleted) {
//     return <Redirect to={
//       { pathname: '/', state: { msg: 'Recipe succesfully deleted!' } }
//     } />
//   }

//   return (
//     <Layout>
//       <h4>{recipe.title}</h4>
//       <p>Ingredients: {recipe.ingredients}</p>
//       <p>Directions: {recipe.description}</p>
//       <button onClick={destroy}>🗑</button>
//       <Link to={`/recipes/${this.props.match.params.id}/edit`}>
//         <button>Edit</button>
//       </Link>
//       <Link to="/recipes">Back to all Recipes</Link>
//     </Layout>
//   )
// }

// export default Recipe

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

    if (deleted) {
      return <Redirect to={
        { pathname: '/recipes', state: { msg: 'Recipe succesfully deleted!' } }
      } />
    }

    return (
      <Layout>
        <h4>{recipe.title}</h4>
        <p>Ingredients: {recipe.ingredients}</p>
        <p>Directions: {recipe.description}</p>
        <button onClick={this.destroy}>Delete Recipe</button>
        <Link to={`/recipes/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to="/recipes">Back to all Recipes</Link>
      </Layout>
    )
  }
}

export default Recipe
