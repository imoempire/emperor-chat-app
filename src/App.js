import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'

export default function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/signin" element={<SignIn/>} />
    <Route path="/" element={<Home/>} />
  </Routes>
  </BrowserRouter>
}
