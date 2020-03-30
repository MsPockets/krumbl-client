import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'

class Recipe extends Component {
  constructor (props) {
    super(props)

    this.state = {
      recipe: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/recipes/${this.props.match.params.id}`)
      .then(res => this.setState({ recipe: res.data.recipe }))
      .catch(console.error)
  }

  destroy = () => {
    axios({
      url: `${apiUrl}/recipes/${this.props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }

  render () {
    const { recipe, deleted } = this.state

    if (!recipe) {
      return <p>Loading...</p>
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/', state: { msg: 'Recipe succesfully deleted!' } }
      } />
    }

    return (
      <Layout>
        <h4>{recipe.title}</h4>
        <p>Date relased: {recipe.year}</p>
        <p>Directed by: {recipe.director}</p>
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
