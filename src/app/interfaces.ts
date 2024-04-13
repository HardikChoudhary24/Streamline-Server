import { introspectionFromSchema } from "graphql";

export interface JWTUser {
  id: string;
  firstName: string;
  email: string;
}

export interface GraphqlContext {
  user?: JWTUser;
}

export interface CreateUserPayload {
  email: string;
  userName: string;
  firstName: string;
  lastName?: string;
  profileImageURL?: string;
  password: string;
}
export interface LoginPayload {
  email: string
  password: string
}