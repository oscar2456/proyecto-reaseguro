-- CreateTable
CREATE TABLE "OscarBarriosContrato" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "montoPrima" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OscarBarriosContrato_pkey" PRIMARY KEY ("id")
);
