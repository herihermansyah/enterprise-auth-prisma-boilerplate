"use client";

import React from "react";
import {Button} from "./ui/button";
import {toast} from "sonner";

type DeleteProps = {
  id: string;
  onDelete: (id: string) => Promise<{success?: boolean; error?: string} | void>;
  label: string;
};

function Delete({id, onDelete, label}: DeleteProps) {
  async function handleDelete() {
    try {
      await onDelete(id);
      toast.success(`${label} berhasil`);
    } catch {
      toast.error(`gagal  ${label}`);
    }
  }
  return (
    <div>
      <Button onClick={handleDelete}>delete</Button>
    </div>
  );
}

export default Delete;
