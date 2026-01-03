"use server";

import prisma from "@/lib/prisma";
import {registerSchema} from "../schemas/user-schema";
import bcrypt from "bcryptjs";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function registerAction(formData: FormData) {
  const rowData = Object.fromEntries(formData.entries());
  const parsed = registerSchema.safeParse(rowData);

  if (!parsed.success) {
    return {
      messages: parsed.error.flatten().fieldErrors,
    };
  }

  const {email, password} = parsed.data;

  const exist = await prisma.user.findFirst({
    where: {email},
  });

  if (exist) {
    return {
      messages: {
        ...(exist.email === email && {email: ["email sudah terdaftar"]}),
      },
    };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashPassword,
    },
  });

  revalidatePath("/signup");
  redirect("/login");
}
