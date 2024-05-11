/*
  Warnings:

  - A unique constraint covering the columns `[invitedBy]` on the table `Invites` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invitedBy` to the `Invites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invites" ADD COLUMN     "invitedBy" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Invites_invitedBy_key" ON "Invites"("invitedBy");
