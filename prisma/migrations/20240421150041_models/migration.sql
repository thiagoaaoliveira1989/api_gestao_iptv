-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servidor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "servidor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "informacoes" (
    "id" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "expirationDate" TIMESTAMP(3),
    "monthlyFeeValue" DECIMAL(65,30) NOT NULL,
    "paymentStatus" BOOLEAN NOT NULL,
    "clientStatus" INTEGER NOT NULL,
    "numberOfScreens" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,

    CONSTRAINT "informacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "informacoes_userId_serverId_key" ON "informacoes"("userId", "serverId");

-- AddForeignKey
ALTER TABLE "informacoes" ADD CONSTRAINT "informacoes_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "servidor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informacoes" ADD CONSTRAINT "informacoes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
