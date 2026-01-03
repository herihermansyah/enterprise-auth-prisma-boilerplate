"use client";
import React, {useState} from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {updateRole} from "../actions/updateUser.action";
import {Role} from "@/generated/prisma/enums";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

function ChangeRole({id}: {id: string}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  async function handleChangeRole(formData: FormData) {
    const role = formData.get("role") as Role;
    try {
      await updateRole(id, role);
      toast.success("update role berhasil");
      router.refresh();
    } catch {
      toast.error("update role gagal");
    }
  }
  return (
    <Dialog open={open} onOpenChange={() => setOpen((v) => !v)}>
      <DialogTrigger asChild>
        <Button variant="outline">Change Role</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-100">
        <form className="flex flex-col gap-5" action={handleChangeRole}>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>change your role</DialogDescription>
          </DialogHeader>
          <Select name="role">
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Change Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USER">user</SelectItem>
              <SelectItem value="ADMIN">admin</SelectItem>
            </SelectContent>
          </Select>
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

export default ChangeRole;
