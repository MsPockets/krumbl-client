import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => (
  <nav>
    <NavLink to='/recipes'>Home</NavLink>
    <NavLink to='/recipes'>Recipes</NavLink>
    <NavLink to='/create-recipe'>Create a recipe!</NavLink>
  </nav>
)

export default Nav
