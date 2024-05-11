import { prisma } from "../../clients/db";
import { decodeJWT, generateJWT } from "../../services/JWT";
import { CreateUserPayload, GraphqlContext, LoginPayload } from "../interfaces";
import bcrypt from "bcryptjs";

const queries = {
  authenticate: async (parent: any, { payload }: { payload: LoginPayload }) => {
    if (!payload.email && !payload.password)
      throw new Error("No valid email or password");

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (user && (await bcrypt.compare(payload.password, user.password))) {
      const room = await prisma.roomParticipants.findFirst({
        where: { memberId: user.id },
      });
      return {
        token: generateJWT(user),
        success: true,
        url: !room ? "/dashboard/user-role" : "/dashboard/drafts",
      };
    }

    return { token: "", success: false, url: "" };
  },
  verifyToken: async (parent: any, args: any, contextValue: GraphqlContext) => {
    const id = contextValue.user?.id;
    if (id) return { success: true };
    return { success: false };
  },
  getCurrentUser: async (
    parent: any,
    args: any,
    contextValue: GraphqlContext
  ) => {
    const id = contextValue.user?.id;
    if (!id) throw new Error("User not Authenticated");

    const user = await prisma.user.findUnique({
      where: { id: contextValue.user?.id },
    });

    return { ...user, password: "" };
  },
};

const mutations = {
  createUser: async (
    parent: any,
    { payload }: { payload: CreateUserPayload },
    contextValue: GraphqlContext
  ) => {
    let user;
    if (!payload) return null;
    if (payload.email) {
      user = await prisma.user.findUnique({
        where: { email: payload.email },
      });
    }

    if (user) {
      return { user: user, userExist: true };
    }

    const encPassword = await bcrypt.hash(payload.password, 10);

    user = await prisma.user.create({
      data: {
        name: payload.name,
        profileImageURL: payload?.name,
        email: payload.email,
        password: encPassword,
        userName: payload.userName,
      },
    });

    return { user: user, userExist: false };
  },
};

export const resolvers = { queries, mutations };
