/*
  Warnings:

  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "customer" DROP CONSTRAINT "customer_userId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_customerId_fkey";

-- DropTable
DROP TABLE "customer";

-- CreateTable
CREATE TABLE "shippingInformation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "governorate" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "shippingInformation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shippingInformation" ADD CONSTRAINT "shippingInformation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "shippingInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
