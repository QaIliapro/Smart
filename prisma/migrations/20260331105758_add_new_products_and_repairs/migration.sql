-- CreateTable
CREATE TABLE "NewProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "category" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "specs" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "colors" TEXT NOT NULL,
    "gradient" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RepairRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "device" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "NewProduct_slug_key" ON "NewProduct"("slug");
