/*
  Warnings:

  - Added the required column `roomId` to the `Invites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invites" ADD COLUMN     "roomId" TEXT NOT NULL;
