"use server";

import prisma from "@/lib/prisma";
import {updateSchema} from "../schemas/user-schema";
import {revalidatePath} from "next/cache";
import {Role} from "@/generated/prisma/enums";

export async function updateUser(id: string, formData: FormData) {
  const rowData = Object.fromEntries(formData.entries());
  const parsed = updateSchema.safeParse(rowData);

  if (!parsed.success) {
    return {
      messages: parsed.error.flatten().fieldErrors,
    };
  }

  const {name, fullName, gender, phone, username, birthDate} = parsed.data;

  const exist = await prisma.user.findFirst({
    where: {username},
  });

  if (exist) {
    return {
      messages: {
        ...(exist.username === username && {
          username: ["username sudah digunakan"],
        }),
      },
    };
  }

  await prisma.user.update({
    where: {id},
    data: {
      name,
      fullName,
      gender,
      phone,
      username,
      birthDate: birthDate ? new Date(birthDate) : null,
    },
  });

  revalidatePath(`/profile/${id}/updateuser`);
}

export async function updateRole(id: string, role: Role) {
  await prisma.user.update({
    where: {id},
    data: {
      role: role,
    },
  });
  revalidatePath(`/profile/${id}/preview`);
}
