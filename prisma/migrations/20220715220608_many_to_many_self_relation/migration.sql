-- CreateTable
CREATE TABLE "_Subscribers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Subscribers_AB_unique" ON "_Subscribers"("A", "B");

-- CreateIndex
CREATE INDEX "_Subscribers_B_index" ON "_Subscribers"("B");

-- AddForeignKey
ALTER TABLE "_Subscribers" ADD CONSTRAINT "_Subscribers_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Subscribers" ADD CONSTRAINT "_Subscribers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
