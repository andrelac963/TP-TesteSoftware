-- CreateTable
CREATE TABLE "Apartment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "numberOfPeople" INTEGER NOT NULL,
    "cleaningPeriod" INTEGER NOT NULL,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resident" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cleaningOrder" INTEGER NOT NULL,
    "apartmentId" INTEGER NOT NULL,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resident" ADD CONSTRAINT "Resident_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
