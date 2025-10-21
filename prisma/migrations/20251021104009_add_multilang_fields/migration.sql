/*
  Warnings:

  - You are about to drop the column `description` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Artwork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "description_en" TEXT,
ADD COLUMN     "description_ru" TEXT,
ADD COLUMN     "description_uz" TEXT,
ADD COLUMN     "title_en" TEXT NOT NULL DEFAULT 'No title',
ADD COLUMN     "title_ru" TEXT NOT NULL DEFAULT 'No title',
ADD COLUMN     "title_uz" TEXT NOT NULL DEFAULT 'No title';
