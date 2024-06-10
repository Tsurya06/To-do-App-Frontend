import { Route, Routes } from 'react-router-dom'
import { TodoApp } from '../pages/todo/Todo'
import PencilLoader from '../util/PencilLoader'

export default function Router() {
  return (
    <Routes>
      <Route path="/dashboard" element={<TodoApp />} />
      <Route path="/todo" element={<TodoApp />} />
      <Route path="*" element={<PencilLoader/>} />
    </Routes>  
  )
}
