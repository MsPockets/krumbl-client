import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// importing all custom components for the app
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import CreateRecipe from '../CreateRecipe/CreateRecipe'
import Recipes from '../Recipes/Recipes'
import Recipe from '../Recipe/Recipe'
import RecipeEdit from '../RecipeEdit/RecipeEdit'

// we want to have state at the highest level possible in our app
// so that `App` is a class component
class App extends Component {
  constructor () {
    super()
    // setup state: hold a reference to the user and all message alerts
    this.state = {
      user: null,
      msgAlerts: []
    }
  }
  // this method is passed as a prop to `SignIn` and `SignUp`
  // It is used to set the user on the state after successful sign in
  // sign in happens automatically after successful sign up
  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })
  // the spread (...) operator allows us to create a copy of the current msg alerts and add a new one to that array
  // this then sets the state with the updated array
  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }
  siteStyle = {
    background: 'url(./img/background.jpg)',
    minHeight: '100vh'
  }
  // render the app
  render () {
    // destructure from the state
    const { msgAlerts, user } = this.state
    // we have to return JSX
    return (
      <div style={this.siteStyle}>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-recipe' render={({ match }) => (
            <CreateRecipe match={ match } msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/recipes/:id/edit' render={({ match }) => (
            <RecipeEdit match={ match } msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/recipes' render={({ match }) => (
            <Recipes match={ match } msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/recipes/:id' render={({ match }) => (
            <Recipe match={ match } msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </div>
    )
  }
}

export default App
