require('dotenv').config();
const prisma = require('../src/config/prisma');

async function main() {
  await prisma.role.upsert({
    where: { roleid: 1 },
    update: {},
    create: { roleid: 1, rolename: 'admin' },
  });

  await prisma.role.upsert({
    where: { roleid: 2 },
    update: {},
    create: { roleid: 2, rolename: 'customer' },
  });

  console.log('Seed roles done: admin (1), customer (2)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });