"use client";

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {User} from "@/generated/prisma/client";
import React, {useState} from "react";
import {updateUser} from "../actions/updateUser.action";
import z from "zod";
import {updateSchema} from "../schemas/user-schema";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

type FormError = z.inferFlattenedErrors<typeof updateSchema>["fieldErrors"];

type UserWithUpdate = User;

type UpdateFormProps = {
  user: UserWithUpdate;
};

function FormUpdateUser({user}: UpdateFormProps) {
  const [error, setError] = useState<FormError | undefined>(undefined);
  const updateWithId = updateUser.bind(null, user.id);

  const initialForm = [
    {name: "name", type: "text", placeholder: "name...", value: user.name},
    {
      name: "fullName",
      type: "text",
      placeholder: "fullName...",
      value: user.fullName,
    },
    {
      name: "gender",
      type: "text",
      placeholder: "gender...",
      value: user.gender,
    },
    {name: "phone", type: "text", placeholder: "phone...", value: user.phone},
    {
      name: "username",
      type: "text",
      placeholder: "username...",
      value: user.username,
    },
    {
      name: "birthDate",
      type: "date",
      placeholder: "date...",
      value: user.birthDate
        ? new Date(user.birthDate).toISOString().split("T")[0]
        : "",
    },
  ];

  const router = useRouter();

  async function handleUpdateUser(formData: FormData) {
    try {
      const result = await updateWithId(formData);
      if (result?.messages) {
        setError(result.messages);
        toast.error("update gagal");
        return;
      }
      toast.success("update berhasil");
      setTimeout(() => {
        router.push(`/profile/${user.id}/preview`);
      }, 1000);
    } catch {
      toast.error("kesalahan sistem");
      return;
    }
  }
  return (
    <Card>
      <CardHeader>update : {user.email}</CardHeader>
      <CardContent>
        <form className="flex flex-col gap-5" action={handleUpdateUser}>
          {initialForm.map((item, index) => (
            <div key={index}>
              <Input
                name={item.name}
                type={item.type}
                placeholder={item.placeholder}
                defaultValue={item.value ?? ""}
              />
              {error && [item.name as keyof FormError] && (
                <span className="text-red-500 text-sm">
                  {error[item.name as keyof FormError]}
                </span>
              )}
            </div>
          ))}
          <Button type="submit">update user</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default FormUpdateUser;
