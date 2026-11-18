export interface LoginData {
  username: string;
  password: string;
}

export interface Task {
  _id: string | undefined;
  name: string;
  status: 'todo' | 'inprogress' | 'done';
  description: string;
}

export interface SocketData {
  message: string;
  action: 'new' | 'update' | 'delete';
  data?: Task;
}
