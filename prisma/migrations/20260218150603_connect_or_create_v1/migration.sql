/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "customer_number_key" ON "customer"("number");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
