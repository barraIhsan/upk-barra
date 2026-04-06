import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/client";

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting database seeding...");

  // Get admin password from environment variable
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "admin123";
  const adminUsername = process.env.SEED_ADMIN_USERNAME || "admin";

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { username: adminUsername },
  });

  if (existingAdmin) {
    console.log(`Admin user '${adminUsername}' already exists. Skipping seed.`);
    return;
  }

  // Create admin user (root/principal)
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.create({
    data: {
      username: adminUsername,
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log(`Admin user created:`, {
    id: admin.id,
    username: admin.username,
    role: admin.role,
  });

  // Create subjects
  const subjects = await Promise.all([
    prisma.subject.upsert({
      where: { name: "Math" },
      update: {},
      create: { name: "Math" },
    }),
    prisma.subject.upsert({
      where: { name: "English" },
      update: {},
      create: { name: "English" },
    }),
    prisma.subject.upsert({
      where: { name: "Science" },
      update: {},
      create: { name: "Science" },
    }),
    prisma.subject.upsert({
      where: { name: "IT" },
      update: {},
      create: { name: "IT" },
    }),
  ]);

  console.log(
    `Sample subjects created:`,
    subjects.map((s) => s.name),
  );

  console.log("Database seeding completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
