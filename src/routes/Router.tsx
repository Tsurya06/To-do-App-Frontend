import { Route, Routes } from 'react-router-dom'
import PencilLoader from '../util/PencilLoader'
import { AddTask } from '../pages/task/AddTask'
import TaskList from '../pages/task/TaskList'
import { AddProject } from '../pages/project/AddProject'
import ProjectList from '../pages/project/ProjectList'
import UserList from '../pages/user/UserList'
import NotificationList from '../pages/notification/NotificationList'
import TaskDetails from '../pages/task/TaskDetails'
import { AddUser } from '../pages/user/AddUser'
import UserDetails from '../pages/user/UserDetails'

export default function Router() {
  return (
    <Routes>
      <Route path="/tasks/add" element={<AddTask />} />
      <Route path="/tasks/all" element={<TaskList />} />
      <Route path="/projects/add" element={<AddProject />} />
      <Route path="/projects/all" element={<ProjectList />} />
      <Route path="/users/add" element={<AddUser />} />
      <Route path="/users/all" element={<UserList />} />
      <Route path="/users/:id" element={<UserDetails />} />
      <Route path="/notifications" element={<NotificationList />} />
      <Route path="/tasks/:id" element={<TaskDetails />} />
      <Route path="*" element={<PencilLoader/>} />
    </Routes>  
  )
}
