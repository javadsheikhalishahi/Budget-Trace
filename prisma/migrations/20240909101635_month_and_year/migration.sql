/*
  Warnings:

  - You are about to drop the column `expensive` on the `MonthHistory` table. All the data in the column will be lost.
  - You are about to drop the column `expensive` on the `YearHistory` table. All the data in the column will be lost.
  - Added the required column `id` to the `MonthHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expense` to the `YearHistory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MonthHistory" (
    "id" INTEGER NOT NULL,
    "userID" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "income" REAL NOT NULL DEFAULT 0,
    "expense" REAL NOT NULL DEFAULT 0,

    PRIMARY KEY ("userID", "year", "month", "day")
);
INSERT INTO "new_MonthHistory" ("day", "income", "month", "userID", "year") SELECT "day", "income", "month", "userID", "year" FROM "MonthHistory";
DROP TABLE "MonthHistory";
ALTER TABLE "new_MonthHistory" RENAME TO "MonthHistory";
CREATE TABLE "new_YearHistory" (
    "userID" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "income" REAL NOT NULL,
    "expense" REAL NOT NULL,

    PRIMARY KEY ("userID", "year", "month")
);
INSERT INTO "new_YearHistory" ("income", "month", "userID", "year") SELECT "income", "month", "userID", "year" FROM "YearHistory";
DROP TABLE "YearHistory";
ALTER TABLE "new_YearHistory" RENAME TO "YearHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
