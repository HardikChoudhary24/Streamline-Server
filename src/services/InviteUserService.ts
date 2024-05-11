import { SendInvite } from "../app/interfaces";

export const generateInviteToken = (length = 16) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  const token = Array.from(array, (byte) => {
    return byte.toString(16).padStart(2, "0");
  }).join("");
  return token.slice(0, length);
};
export const inviteUser = ({ inviteEmail, workspaceId }: SendInvite) => {};
