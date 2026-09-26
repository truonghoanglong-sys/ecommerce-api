const prisma = require('../config/prisma');

async function getAllMemberships() {
  return prisma.memberShip.findMany();
}

async function createMembership({ mname, score }) {
  return prisma.memberShip.create({ data: { mname, score } });
}

async function updateMembership(mid, { mname, score }) {
  return prisma.memberShip.update({
    where: { mid: Number(mid) },
    data: { mname, score },
  });
}

async function deleteMembership(mid) {
  return prisma.memberShip.delete({ where: { mid: Number(mid) } });
}

module.exports = {
  getAllMemberships,
  createMembership,
  updateMembership,
  deleteMembership,
};