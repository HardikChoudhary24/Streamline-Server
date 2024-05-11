import { Room } from "@prisma/client";
import { prisma } from "../../clients/db";
import { GraphqlContext, SendInvite } from "../interfaces";
import { generateInviteToken } from "../../services/InviteUserService";
import { Resend } from "resend";
import InviteEmail from "../../emails/InviteEmail";
const queries = {
  getAllRoomsForUser: async (
    parent: any,
    args: any,
    context: GraphqlContext
  ) => {
    if (!context.user?.id) throw new Error("User not authenticated");
    const allRoomsOfUser = await prisma.roomParticipants.findMany({
      where: { memberId: context.user.id },
      select: { room: true },
    });
    console.log(allRoomsOfUser);

    return allRoomsOfUser.map((room) => room.room);
  },
};

const mutations = {
  createRoom: async (
    parent: any,
    { roomName }: { roomName: string },
    context: GraphqlContext
  ) => {
    if (!context.user?.id) throw new Error("User not authenticated");

    const rooms = await prisma.room.findFirst({
      where: { roomName, ownerId: context.user?.id },
    });
    if (rooms) throw new Error("Workspace with this name already exists!");

    const room = await prisma.room.create({
      data: {
        ownerId: context.user.id,
        roomName: roomName,
      },
    });
    await prisma.roomParticipants.create({
      data: { roomId: room.id, memberId: context.user.id },
    });

    return room;
  },
  sendInvite: async (
    parent: any,
    { payload }: { payload: SendInvite },
    context: GraphqlContext
  ) => {
    if (!context.user?.id) throw new Error("User not authenticated");

    const isEmailInvited = await prisma.invites.findFirst({
      where: {
        invitedBy: context.user.email,
        invitedEmail: payload.inviteEmail,
      },
    });

    if (isEmailInvited) {
      return { success: false, mssg: "Email already invited!" };
    }
    const invitedUser = await prisma.user.findUnique({
      where: { email: payload.inviteEmail },
      select: { MemberOf: true },
    });
    if (
      invitedUser?.MemberOf.find((room) => room.roomId === payload.workspaceId)
    ) {
      return { success: false, mssg: "Already a member of the workspace!" };
    }

    const token = generateInviteToken();

    await prisma.invites.create({
      data: {
        invitedBy: context.user?.id,
        invitedEmail: payload.inviteEmail,
        token,
        roomId:payload.workspaceId
      },
    });
    
    const workspaceName = await prisma.room.findUnique({where:{id:payload.workspaceId},select:{roomName:true}})
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: payload.inviteEmail,
      subject: "StreamLine Invitation",
      react: InviteEmail({
        invitedByUsername: context.user?.name,
        inviteLink: `http://localhost:3000/dashboard/join?token=${token}`,
        WorkspaceName: workspaceName?.roomName,
        invitedByEmail: context.user.email,
      }),
    });

    return {success:true,mssg:"Invite Sent"};
  },
};
const room = {
  // owner: async (parent: Room) => {
  //   console.log('inside')
  //   return await prisma.user.findUnique({ where: { id: parent.ownerId } });
  // },
};
export const resolvers = { queries, mutations, room };
