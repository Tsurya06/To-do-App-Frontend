export type ReqType = {
  body?: loginSignupType | any;
  params?: any;
  id?: string | undefined;
};

export type TaskType = {
  id?: string;
  title?: string;
  description?: string;
  status?: 'To Do' | 'In Progress' | 'Completed' | 'On Hold';
  priority?: 'High' | 'Medium' | 'Low';
  assigneeId?: string;
  projectId?: string;
  tags?: string[];
  subtasks?: TaskType[];
  comments?: CommentType[];
  dueDate?: string;
};

export type ProjectType = {
  id?: string;
  title: string;
  description: string;
  status: "Not Started" | "In Progress" | "Completed" | "On Hold";
  startDate: string;
  endDate: string;
  managerId: string;
  teamMembers: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type UserType = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  password?: string;
};

export type NotificationType = {
  id?: string;
  userId: string;
  message: string;
  type: 'task_update' | 'assignment' | 'comment' | 'deadline';
  taskId?: string;
  projectId?: string;
  timestamp: string;
  isRead: boolean;
};

export type CommentType = {
  id?: string;
  text: string;
  timestamp: string;
  user?: {
    id: string;
    name: string;
  };
  taskId: string;
};

export type loginSignupType = { name: string; email: string; password: string };
