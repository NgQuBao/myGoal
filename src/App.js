import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Page/HomePage'

import FormLogin from './Form/FormLogin'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<FormLogin />} />
        <Route path='/home' element={<HomePage isShowUser={false} />} />
        <Route path='/users' element={<HomePage isShowUser={true} />} />
      </Routes>
    </Router>
  )
}

export default App
