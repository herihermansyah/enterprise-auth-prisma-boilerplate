"use server"

import prisma from "@/lib/prisma";
import {supabase} from "@/lib/supabase";

export async function changeAvatar(id: string, formData: FormData) {
  const avatarFile = (formData.get("avatar") as File) || null;

  if (avatarFile && avatarFile.size > 0) {
    const user = await prisma.user.findUnique({
      where: {id},
      select: {image: true},
    });

    const ext = avatarFile.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${ext}`;

    const {error} = await supabase.storage
      .from("avatar")
      .upload(fileName, avatarFile, {
        upsert: true,
        contentType: avatarFile.type,
      });

    if (error) {
      throw new Error("gagal upload avatar");
    }

    if (user?.image) {
      const oldPath = user.image.split("/").pop();
      if (oldPath) {
        await supabase.storage.from("avatar").remove([oldPath]);
      }
    }

    const {data} = supabase.storage.from("avatar").getPublicUrl(fileName);
    await prisma.user.update({
      where: {id: id},
      data: {image: data.publicUrl},
    });
  }
}
