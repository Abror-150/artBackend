-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_artworkId_fkey";

-- DropForeignKey
ALTER TABLE "public"."orderItem" DROP CONSTRAINT "orderItem_artworkId_fkey";

-- DropForeignKey
ALTER TABLE "public"."orderItem" DROP CONSTRAINT "orderItem_orderId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;
