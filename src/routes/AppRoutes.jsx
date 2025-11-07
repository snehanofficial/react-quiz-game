import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import QuizPage from '../pages/QuizPage'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Layout />}>
            <Route path='' element={<QuizPage />} />        
        </Route>
    </Routes>
  )
}
