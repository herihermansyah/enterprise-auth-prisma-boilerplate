import NextAuth from "next-auth";
import prisma from "./lib/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter";
import type {Adapter} from "next-auth/adapters";
import authConfig from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import {loginSchema} from "./features/user/schemas/user-schema";
import bcrypt from "bcryptjs";

export const {handlers, signIn, signOut, auth} = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  ...authConfig,
  providers: [
    ...authConfig.providers.filter((p) => p.id !== "credentials"),
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (parsed.success) {
          const {email, password} = parsed.data;
          const user = await prisma.user.findUnique({
            where: {email},
          });
          if (!user || !user?.password) return null;

          const isPasswordMatch = await bcrypt.compare(password, user.password);

          if (isPasswordMatch) return user;
        }

        return null;
      },
    }),
  ],
});
