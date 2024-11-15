import React from 'react'
import { Login } from './Authentication'
// import { Login } from './Authentication'

describe('<Login />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Login />)
  })
})