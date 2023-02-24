import React from 'react'
import LoginForm from './LoginForm'
import Contain from './Contain'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/home' element={<Contain />} />
      </Routes>
    </Router>
  )
}

export default App
