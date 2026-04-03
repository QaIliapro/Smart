-- CreateTable
CREATE TABLE "RepairService" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "free" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "RepairPrice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "price" REAL,
    "free" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "RepairPrice_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "RepairService" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
