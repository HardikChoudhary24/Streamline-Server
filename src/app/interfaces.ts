import { introspectionFromSchema } from "graphql";

export interface JWTUser {
  id: string;
  name: string;
  email: string;
}

export interface GraphqlContext {
  user?: JWTUser;
}

export interface CreateUserPayload {
  email: string;
  userName: string;
  name: string;
  profileImageURL?: string;
  password: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}
export interface SendInvite {
  inviteEmail: string;
  workspaceId: string;
}

export interface CreateProjectPayload {
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  roomId: string;
}
