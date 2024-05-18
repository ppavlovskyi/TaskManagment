export interface User {
  login: boolean;
  response: ResponseUser;
  error: ResponseError | null;
  users: SimpleUser[];
}

export interface ResponseUser {
  name: string;
  userId: string;
  token: string;
}

export interface UserLoginBody {
  email: string;
  password: string;
}

export interface UserRegisterBody extends UserLoginBody {
  name: string;
}

export interface ResponseError {
  message: string;
  data?: FieldError[];
}

export interface FieldError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  validation?: ResponseError | null;
}

export interface TaskAddDto {
  title: string;
  description: string;
  location: Location;
  date: string;
  assignee: string;
  status: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  location: Location;
  date: string;
  assignee: string;
  status: string;
}

export interface Location {
  name: string;
  longitude: number;
  latitude: number;
}

export interface SimpleUser {
  _id: string;
  name: string;
}
