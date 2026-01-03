"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function changePassword(id: string, formData: FormData) {
  const oldPassword = formData.get("oldPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (newPassword !== confirmPassword) {
    throw new Error("password tidak cocok");
  }

  const user = await prisma.user.findUnique({
    where: {id},
    select: {password: true},
  });

  if (!user || !user.password) {
    throw new Error("user tidak ditemukan");
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new Error("password lama salah");
  }

  const hashNewPassword = await bcrypt.hash(newPassword, 10);
  
  await prisma.user.update({
    where: {id},
    data: {
      password: hashNewPassword,
    },
  });
}
