import { Room } from "@prisma/client";
import { prisma } from "../../clients/db";
import { GraphqlContext } from "../interfaces";

const queries = {
  getAllRoomsForUser: async (
    parent: any,
    args: any,
    context: GraphqlContext
  ) => {
    if (!context.user?.id) throw new Error("User not authenticated");
    const allRoomsOfUser = await prisma.roomParticipants.findMany({
      where: { memberId: context.user.id },
      select:{room:true}
    });
    console.log(allRoomsOfUser)

    return allRoomsOfUser.map(room=>room.room);
  },
};

const mutations = {
  createRoom: async (
    parent: any,
    { roomName }: { roomName: string },
    context: GraphqlContext
  ) => {
    if (!context.user?.id) throw new Error("User not authenticated");

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
};
const room = {
  owner: async (parent: Room) => {
    console.log('inside')
    return await prisma.user.findUnique({ where: { id: parent.ownerId } });
  },
};
export const resolvers = { queries, mutations,room };
