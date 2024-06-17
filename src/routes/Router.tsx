import { Route, Routes } from 'react-router-dom'
import { TodoApp } from '../pages/todo/AddTodo'
import PencilLoader from '../util/PencilLoader'
import TodoTable from '../pages/todo/todo-table/TodoTable'

export default function Router() {
  return (
    <Routes>
      <Route path="/dashboard" element={<TodoTable />} />
      <Route path="/add-todos" element={<TodoApp />} />
      <Route path="*" element={<PencilLoader/>} />
    </Routes>  
  )
}
