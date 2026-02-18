/*
  Warnings:

  - You are about to drop the column `customerId` on the `order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_customerId_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "customerId",
ADD COLUMN     "shippingInfoId" TEXT;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_shippingInfoId_fkey" FOREIGN KEY ("shippingInfoId") REFERENCES "shippingInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
