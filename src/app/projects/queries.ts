export const queries = `#graphql
    getAllProjects(roomId:string):[Project]
    getVideoSignedUrl(videoType:String!):String
    getImageSignedUrl(imageType:String!):String
`;
