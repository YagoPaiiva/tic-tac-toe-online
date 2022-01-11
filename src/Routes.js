/* eslint-disable import/no-anonymous-default-export */
import React from "react"
import { Routes, Route } from 'react-router-dom'
import  Home  from './pages/Home'

export default () => {
  return (
  <Routes>
    <Route exact path="/" element={<Home />} />
  </Routes>
  )
} 