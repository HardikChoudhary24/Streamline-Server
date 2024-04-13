export const types = `#graphql
    type User{
        id:ID!
        firstName:String!
        lastName:String
        userName:String!
        profileImageURL:String
        email:String!
    }

    input CreateUserPayload{
        email:String!
        userName:String!
        firstName:String!
        password:String!
        lastName:String
        profileImageURL:String
    }

    input LoginPayload{
        email:String!
        password:String!
    }

    type CreateUserResponse{
        user:User
        userExist:Boolean
    }

    type AuthenticateResponse{
        token:String
        success:Boolean
    }
`;
