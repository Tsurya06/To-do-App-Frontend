import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { TodoApp } from '../pages/todo/Todo'

export default function Router() {
  return (
    <Routes>
      <Route path="/dashboard" element={<TodoApp />} />
      <Route path="/todo" element={<TodoApp />} />
      <Route path="*" element={<>Page not found</>} />
    </Routes>  
  )
}
