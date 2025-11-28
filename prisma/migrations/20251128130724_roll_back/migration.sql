/*
  Warnings:

  - The primary key for the `item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[sku]` on the table `item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."feature" DROP CONSTRAINT "feature_itemId_fkey";

-- DropForeignKey
ALTER TABLE "public"."imageGallery" DROP CONSTRAINT "imageGallery_itemId_fkey";

-- DropForeignKey
ALTER TABLE "public"."order" DROP CONSTRAINT "order_itemId_fkey";

-- AlterTable
ALTER TABLE "feature" ALTER COLUMN "itemId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "imageGallery" ALTER COLUMN "itemId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "item" DROP CONSTRAINT "item_pkey",
ADD COLUMN     "sku" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "item_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "item_id_seq";

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "itemId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "item_sku_key" ON "item"("sku");

-- AddForeignKey
ALTER TABLE "feature" ADD CONSTRAINT "feature_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imageGallery" ADD CONSTRAINT "imageGallery_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
