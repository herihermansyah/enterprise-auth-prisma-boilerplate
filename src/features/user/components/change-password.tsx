"use client";

import React from "react";
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
import {Label} from "@/components/ui/label";
import {changePassword} from "../actions/changePassword.action";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

function ChangePassword({id}: {id: string}) {
  const {refresh} = useRouter();
  async function handleChangePassword(formData: FormData) {
    try {
      await changePassword(id, formData);
      toast.success("ganti password barhasil");
      refresh();
    } catch {
      toast.error("ganti password gagal");
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-100">
        <form action={handleChangePassword}>
          <DialogHeader>
            <DialogTitle>Change Your Password</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="oldPassword">Old Password</Label>
              <Input id="oldPassword" type="password" name="oldPassword" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" name="newPassword" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePassword;
