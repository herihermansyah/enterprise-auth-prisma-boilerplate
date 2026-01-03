"use server";

import prisma from "@/lib/prisma";
import {addressSchema} from "../schemas/user-schema";
import {revalidatePath} from "next/cache";

export async function AddAddress(formData: FormData, userId: string) {
  const rowData = Object.fromEntries(formData.entries());
  const parsed = addressSchema.safeParse(rowData);

  if (!parsed.success) {
    return {
      messages: parsed.error.flatten().fieldErrors,
    };
  }

  const {state, city, province, country} = parsed.data;

  await prisma.address.create({
    data: {
      state,
      city,
      province,
      country,
      user: {
        connect: {id: userId},
      },
    },
  });

  revalidatePath(`/profile/${userId}/addaddress`);
}

export async function deleteAddress(id: string) {
  await prisma.address.delete({
    where: {id},
  });
  revalidatePath(`/profile/${id}/preview`);
}
