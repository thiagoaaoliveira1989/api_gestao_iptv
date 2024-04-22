/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `servidor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "servidor_name_key" ON "servidor"("name");
