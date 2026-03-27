import { db } from "./index";

async function main() {
  await db.message.createMany({
    data: [
      { text: "Hello from the seed script!" },
      { text: "This is a second message." },
    ],
  });

  console.log("Seeded database with sample messages.");
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
