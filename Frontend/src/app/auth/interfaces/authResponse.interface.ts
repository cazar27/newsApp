import { User } from "./user.interface";

export interface AuthResponse {
  ok: boolean,
  user: User,
  token: string,
  error?: string
}

export interface UsersResponse {
  users: User[],
  ok?: boolean,
  error?: Error
}
