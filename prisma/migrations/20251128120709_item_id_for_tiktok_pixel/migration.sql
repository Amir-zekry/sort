/*
  Warnings:

  - The `itemId` column on the `feature` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `itemId` column on the `imageGallery` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `item` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `itemId` column on the `order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "public"."feature" DROP CONSTRAINT "feature_itemId_fkey";

-- DropForeignKey
ALTER TABLE "public"."imageGallery" DROP CONSTRAINT "imageGallery_itemId_fkey";

-- DropForeignKey
ALTER TABLE "public"."order" DROP CONSTRAINT "order_itemId_fkey";

-- AlterTable
ALTER TABLE "feature" DROP COLUMN "itemId",
ADD COLUMN     "itemId" INTEGER;

-- AlterTable
ALTER TABLE "imageGallery" DROP COLUMN "itemId",
ADD COLUMN     "itemId" INTEGER;

-- AlterTable
ALTER TABLE "item" DROP CONSTRAINT "item_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "item_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "order" DROP COLUMN "itemId",
ADD COLUMN     "itemId" INTEGER;

-- AddForeignKey
ALTER TABLE "feature" ADD CONSTRAINT "feature_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imageGallery" ADD CONSTRAINT "imageGallery_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
