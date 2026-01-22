-- AlterTable
ALTER TABLE "order_status_history" ADD COLUMN "comment" TEXT;

-- Update default status in orders table
UPDATE "orders" SET "status" = 'Заявка создана' WHERE "status" = 'Заявка принята';

