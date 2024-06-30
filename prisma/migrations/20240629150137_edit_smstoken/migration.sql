/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `SmsToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SmsToken_token_key" ON "SmsToken"("token");
