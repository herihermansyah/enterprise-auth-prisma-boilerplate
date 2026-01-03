import prisma from "@/lib/prisma";

export async function getDataById(id: string) {
  return prisma.user.findUnique({
    where: {id},
    include: {
      addresses: true,
      banks: true,
    },
  });
}
