-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_budgets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL
);
INSERT INTO "new_budgets" ("createdAt", "endDate", "id", "label", "startDate", "userId") SELECT "createdAt", "endDate", "id", "label", "startDate", "userId" FROM "budgets";
DROP TABLE "budgets";
ALTER TABLE "new_budgets" RENAME TO "budgets";
PRAGMA foreign_key_check("budgets");
PRAGMA foreign_keys=ON;
