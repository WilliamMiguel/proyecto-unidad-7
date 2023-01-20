-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_songs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "playlistId" INTEGER,
    CONSTRAINT "songs_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlists" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_songs" ("album", "artist", "duration", "genre", "id", "is_public", "name", "playlistId", "year") SELECT "album", "artist", "duration", "genre", "id", "is_public", "name", "playlistId", "year" FROM "songs";
DROP TABLE "songs";
ALTER TABLE "new_songs" RENAME TO "songs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
