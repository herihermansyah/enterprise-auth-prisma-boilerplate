"use server";

import prisma from "@/lib/prisma";
import {banksSchema} from "../schemas/user-schema";
import {revalidatePath} from "next/cache";

export async function addBanks(formData: FormData, userId: string) {
  const rowData = Object.fromEntries(formData.entries());
  const parsed = banksSchema.safeParse(rowData);

  if (!parsed.success) {
    return {
      messages: parsed.error.flatten().fieldErrors,
    };
  }

  const {cardExpire, cardNumber, cardType, currency, iban} = parsed.data;

  await prisma.bank.create({
    data: {
      cardExpire,
      cardNumber,
      cardType,
      currency,
      iban,
      user: {
        connect: {id: userId},
      },
    },
  });

  revalidatePath(`/profile/${userId}/addbank`);
}

export async function deleteBank(id: string) {
  await prisma.bank.delete({
    where: {id},
  });
  revalidatePath(`/profile/${id}/preview`);
}
