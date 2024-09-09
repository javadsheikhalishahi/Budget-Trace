/*
  Warnings:

  - You are about to drop the column `id` on the `MonthHistory` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MonthHistory" (
    "userID" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "income" REAL NOT NULL DEFAULT 0,
    "expense" REAL NOT NULL DEFAULT 0,

    PRIMARY KEY ("userID", "year", "month", "day")
);
INSERT INTO "new_MonthHistory" ("day", "expense", "income", "month", "userID", "year") SELECT "day", "expense", "income", "month", "userID", "year" FROM "MonthHistory";
DROP TABLE "MonthHistory";
ALTER TABLE "new_MonthHistory" RENAME TO "MonthHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
