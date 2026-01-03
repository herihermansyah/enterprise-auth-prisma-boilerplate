"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import React, {useState} from "react";
import z from "zod";
import {addressSchema} from "../schemas/user-schema";
import {AddAddress} from "../actions/addAddress.action";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

type FormError = z.inferFlattenedErrors<typeof addressSchema>["fieldErrors"];

function FormAddAddress({id}: {id: string}) {
  const [error, setError] = useState<FormError | undefined>(undefined);
  const router = useRouter();
  const initialForm = [
    {name: "state", type: "text", placholder: "state..."},
    {name: "city", type: "text", placholder: "city..."},
    {name: "province", type: "text", placholder: "province..."},
    {name: "country", type: "text", placholder: "country..."},
  ];

  async function handleAddAddress(formData: FormData) {
    const result = await AddAddress(formData, id);
    if (result?.messages) {
      setError(result.messages);
      return
    }

    toast.success("berhasil add address");

    setTimeout(() => {
      router.push(`/profile/${id}/preview`);
    }, 1000);
  }
  return (
    <Card>
      <CardHeader>add address </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-5" action={handleAddAddress}>
          {initialForm.map((item, index) => (
            <div key={index}>
              <Input
                name={item.name}
                type={item.type}
                placeholder={item.placholder}
              />
              {error && [item.name as keyof FormError] && (
                <p>{error[item.name as keyof FormError]}</p>
              )}
            </div>
          ))}
          <Button type="submit">add address</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default FormAddAddress;
