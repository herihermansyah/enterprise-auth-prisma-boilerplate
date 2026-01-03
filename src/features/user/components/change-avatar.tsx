"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import React from "react";
import {changeAvatar} from "../actions/avatar.action";
import {useRouter} from "next/navigation";

type ChangeAvatarProps = {
  id: string;
  src: string | null | undefined;
  alt: string;
};

function ChangeAvatar({id, src, alt}: ChangeAvatarProps) {
  const {refresh} = useRouter();
  async function handleUpdateAvatar(formData: FormData) {
    await changeAvatar(id, formData);
    refresh();
  }
  return (
    <div className="flex flex-col gap-2">
      <Avatar>
        <AvatarImage
          className="object-cover"
          src={src ?? ""}
          alt={alt}
          loading="eager"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Avatar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-100">
          <form className="flex flex-col gap-5" action={handleUpdateAvatar}>
            <DialogHeader>
              <DialogTitle>Edit Avatar</DialogTitle>
              <DialogDescription>change your avatar</DialogDescription>
            </DialogHeader>
            <Avatar>
              <AvatarImage
                className="object-cover"
                src={src ?? ""}
                alt={alt}
                loading="eager"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Input name="avatar" accept="image/*" type="file" />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChangeAvatar;
