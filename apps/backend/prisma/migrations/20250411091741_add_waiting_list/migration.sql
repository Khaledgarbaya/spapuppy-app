/*
  Warnings:

  - Added the required column `waitingListId` to the `Puppy` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "WaitingList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WaitingList_date_key" ON "WaitingList"("date");

-- Create a default waiting list for today
INSERT INTO "WaitingList" ("id", "date", "createdAt", "updatedAt")
VALUES ('default', datetime('now', 'start of day'), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Create new Puppy table with waitingListId
CREATE TABLE "new_Puppy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "ownerPhone" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'waiting',
    "arrivalTime" TEXT NOT NULL,
    "serviceStartTime" TEXT,
    "serviceEndTime" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "waitingListId" TEXT NOT NULL DEFAULT 'default',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    FOREIGN KEY ("waitingListId") REFERENCES "WaitingList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Copy data from old table to new table
INSERT INTO "new_Puppy" (
    "id", "name", "breed", "ownerName", "ownerPhone", "service", "notes",
    "status", "arrivalTime", "serviceStartTime", "serviceEndTime", "position",
    "createdAt", "updatedAt"
)
SELECT 
    "id", "name", "breed", "ownerName", "ownerPhone", "service", "notes",
    "status", "arrivalTime", "serviceStartTime", "serviceEndTime", "position",
    "createdAt", "updatedAt"
FROM "Puppy";

-- Drop old table and rename new one
DROP TABLE "Puppy";
ALTER TABLE "new_Puppy" RENAME TO "Puppy";

-- Create index for waitingListId
CREATE INDEX "Puppy_waitingListId_idx" ON "Puppy"("waitingListId");
