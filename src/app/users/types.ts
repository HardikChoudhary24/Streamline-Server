export const types = `#graphql
    type User{
        id:ID!
        name:String
        userName:String!
        profileImageURL:String
        email:String!
    }

    input CreateUserPayload{
        email:String!
        name:String
        userName:String!
        password:String!
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
        url:String
    }
    type VerifyTokenResponse{
        success:Boolean
    }
`;
