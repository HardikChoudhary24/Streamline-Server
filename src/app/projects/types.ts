export const types = `#graphql
    type Project{
        id:ID!
        videoUrl:String!
        thumbnailUrl:String
        title:String
        description:String
        room:Room
    }

    input CreateProjectPayload{
        videoUrl:String!
        thumbnailUrl:String
        title:String
        description:String
        roomId:String
    }
`;
