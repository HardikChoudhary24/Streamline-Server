export const queries = `#graphql
    getCurrentUser:User
    authenticate(payload:LoginPayload):AuthenticateResponse
    verifyToken:VerifyTokenResponse
`;
