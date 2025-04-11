-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Puppy" ("arrivalTime", "breed", "createdAt", "id", "name", "notes", "ownerName", "ownerPhone", "service", "serviceEndTime", "serviceStartTime", "status", "updatedAt") SELECT "arrivalTime", "breed", "createdAt", "id", "name", "notes", "ownerName", "ownerPhone", "service", "serviceEndTime", "serviceStartTime", "status", "updatedAt" FROM "Puppy";
DROP TABLE "Puppy";
ALTER TABLE "new_Puppy" RENAME TO "Puppy";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
