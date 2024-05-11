export const types = `#graphql
    type Room{
        id: ID!
        ownerId:User
        roomName:String
        # project:[Project]
        # participants:[RoomParticipant!]
    }

    type SendInviteResponse{
        success:Boolean
        mssg:String
    }

    input SendInvite{
        inviteEmail:String
        workspaceId:String
    }
`;