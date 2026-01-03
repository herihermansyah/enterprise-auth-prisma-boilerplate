import {CardType, Currency} from "@/generated/prisma/enums";
import z from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("email tidak valid"),
    password: z.string().min(6, "min 6 character"),
    confirmPassword: z.string().min(6, "min 6 character"),
  })
  .refine((item) => item.password === item.confirmPassword, {
    message: "password tidak cocok",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("email atau password salah"),
  password: z.string().min(6, "min 6 character"),
});

export const updateSchema = z.object({
  name: z.string().min(1, "min  character"),
  fullName: z.string().min(5, "min 5 character"),
  gender: z.string().min(1, "min 1 character"),
  phone: z.string().min(5, "min 5 character"),
  username: z.string().min(5, "min 5 character"),
  birthDate: z
    .string()
    .date("wajib di isi")
    .transform((val) => new Date(val)),
});

export const addressSchema = z.object({
  state: z.string().min(5, "min 5 character"),
  city: z.string().min(5, "min 5 character"),
  province: z.string().min(5, "min 5 character"),
  country: z.string().min(5, "min 5 character"),
});

export const banksSchema = z.object({
  cardExpire: z.string().min(5, "min 5 character"),
  cardNumber: z.string().min(5, "min 5 character"),
  cardType: z.nativeEnum(CardType).default(CardType.VISA),
  currency: z.nativeEnum(Currency).default(Currency.IDR),
  iban: z.string().min(5, "min 5 character"),
});
