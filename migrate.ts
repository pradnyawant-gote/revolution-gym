import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const sql = postgres(process.env.DATABASE_URL!, { max: 1 });
  const db = drizzle(sql);
  
  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migrations complete!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
