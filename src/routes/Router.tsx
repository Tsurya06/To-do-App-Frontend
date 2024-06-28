import { Route, Routes } from 'react-router-dom'
import { AddTodo } from '../pages/todo/AddTodo'
import PencilLoader from '../util/PencilLoader'
import TodoTable from '../pages/todo/todo-table/TodoTable'

export default function Router() {
  return (
    <Routes>
      <Route path="/all-todos" element={<TodoTable />} />
      <Route path="/add-todos" element={<AddTodo />} />
      <Route path="*" element={<PencilLoader/>} />
    </Routes>  
  )
}
