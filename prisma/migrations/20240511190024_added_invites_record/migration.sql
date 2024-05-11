-- CreateTable
CREATE TABLE "Invites" (
    "invitedEmail" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "Invites_pkey" PRIMARY KEY ("invitedEmail","token")
);
