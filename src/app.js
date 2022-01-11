import React from 'react'
import Routes from './Routes'
import { BrowserRouter } from 'react-router-dom'

export default function App () {

  return(
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}