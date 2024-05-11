/*
  Warnings:

  - The primary key for the `Invites` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Invites" DROP CONSTRAINT "Invites_pkey",
ADD CONSTRAINT "Invites_pkey" PRIMARY KEY ("invitedEmail", "invitedBy");
