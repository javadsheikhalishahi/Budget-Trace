-- CreateTable
CREATE TABLE "MonthHistory" (
    "userID" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "income" REAL NOT NULL,
    "expensive" REAL NOT NULL,

    PRIMARY KEY ("userID", "year", "month", "day")
);

-- CreateTable
CREATE TABLE "YearHistory" (
    "userID" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "income" REAL NOT NULL,
    "expensive" REAL NOT NULL,

    PRIMARY KEY ("userID", "year", "month")
);
