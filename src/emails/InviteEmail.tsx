import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";
interface InviteUserEmailProps {
  invitedByUsername?: string;
  invitedByEmail?: string;
  WorkspaceName?: string;

  inviteLink?: string;
}

export const InviteEmail = ({
  invitedByUsername,
  invitedByEmail,
  WorkspaceName,
  inviteLink,
}: InviteUserEmailProps) => {
  const previewText = `Join ${WorkspaceName} on StreamLine`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb1yY5ySVpXM04qVG2VV87YUbqX_x1ATvAYA&usqp=CAU"
                }
                width="80"
                height="80"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Join <strong>{WorkspaceName}</strong> on{" "}
              <strong>StreamLine</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-blue-600 no-underline"
              >
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>{WorkspaceName}</strong>{" "}
              workspace on <strong>StreamLine</strong>.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you were not expecting this invitation, you can ignore this
              email. If you are concerned about your account's safety, please
              reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// VercelInviteUserEmail.PreviewProps = {
//   username: "alanturing",
//   userImage: `${baseUrl}/static/vercel-user.png`,
//   invitedByUsername: "Alan",
//   invitedByEmail: "alan.turing@example.com",
//   teamName: "Enigma",
//   teamImage: `${baseUrl}/static/vercel-team.png`,
//   inviteLink: "https://vercel.com/teams/invite/foo",
//   inviteFromIp: "204.13.186.218",
//   inviteFromLocation: "São Paulo, Brazil",
// } as VercelInviteUserEmailProps;

export default InviteEmail;
