export interface LoginData {
  username: string;
  password: string;
}

export interface Task {
  _id: string;
  name: string;
  status: 'todo' | 'inprogress' | 'done';
  description: string;
}
