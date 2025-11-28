-- CreateEnum
CREATE TYPE "BusType" AS ENUM ('AC', 'NON_AC');

-- CreateEnum
CREATE TYPE "StopType" AS ENUM ('BOARDING', 'DROPPING');

-- CreateTable
CREATE TABLE "Bus" (
    "id" SERIAL NOT NULL,
    "bus_type" "BusType" NOT NULL DEFAULT 'NON_AC',
    "bus_model" TEXT NOT NULL,
    "bus_number" TEXT NOT NULL,
    "bus_operator_id" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "seat_number" TEXT NOT NULL,
    "seat_col" INTEGER NOT NULL,
    "seat_row" INTEGER NOT NULL,
    "bus_id" INTEGER NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusOperator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,

    CONSTRAINT "BusOperator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusStop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BusStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripStop" (
    "id" SERIAL NOT NULL,
    "stop_id" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "stop_order" INTEGER,
    "stop_type" "StopType" NOT NULL,

    CONSTRAINT "TripStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "route" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "bus_id" INTEGER NOT NULL,
    "estimated_time" TIMESTAMP(3) NOT NULL,
    "start_city_id" INTEGER NOT NULL,
    "end_city_id" INTEGER NOT NULL,
    "trip_stop_id" INTEGER NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusOperator_name_key" ON "BusOperator"("name");

-- AddForeignKey
ALTER TABLE "Bus" ADD CONSTRAINT "Bus_bus_operator_id_fkey" FOREIGN KEY ("bus_operator_id") REFERENCES "BusOperator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripStop" ADD CONSTRAINT "TripStop_stop_id_fkey" FOREIGN KEY ("stop_id") REFERENCES "BusStop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_start_city_id_fkey" FOREIGN KEY ("start_city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_end_city_id_fkey" FOREIGN KEY ("end_city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_trip_stop_id_fkey" FOREIGN KEY ("trip_stop_id") REFERENCES "TripStop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
