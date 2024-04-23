/*
  Warnings:

  - A unique constraint covering the columns `[deviceId]` on the table `informacoes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "informacoes_deviceId_key" ON "informacoes"("deviceId");
