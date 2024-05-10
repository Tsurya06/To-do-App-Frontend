import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { TodoApp } from '../pages/todo/Todo'

export default function Router() {
  return (
    <Routes>
      <Route path="/dashboard" element={<TodoApp />} />
    </Routes>  
  )
}
