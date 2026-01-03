"use client";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import React, {useState} from "react";
import z from "zod";
import {banksSchema} from "../schemas/user-schema";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {addBanks} from "../actions/addBanks.action";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

type FormError = z.inferFlattenedErrors<typeof banksSchema>["fieldErrors"];

function FormAddBanks({id}: {id: string}) {
  const [error, setError] = useState<FormError | undefined>(undefined);
  const router = useRouter();

  const selectForm = [
    {
      name: "cardType",
      placeholder: "select card type",
      option: [
        {
          value: "VISA ",
        },
        {
          value: "MASTERCARD",
        },
        {
          value: "DINERS",
        },
        {
          value: "JCB",
        },
        {
          value: "PAYPAL",
        },
      ],
    },
    {
      name: "currency",
      placeholder: "select currency",
      option: [{value: "IDR"}, {value: "USD"}],
    },
  ];

  async function handleAddBank(formData: FormData) {
    const result = await addBanks(formData, id);

    if (result?.messages) {
      setError(result.messages);
      return;
    }

    toast.success("berhasil add bank");

    setTimeout(() => {
      router.push(`/profile/${id}/preview`);
    }, 1000);
  }

  return (
    <Card>
      <CardHeader>add bank</CardHeader>
      <CardContent>
        <form className="flex flex-col gap-5" action={handleAddBank}>
          <Input name="cardExpire" type="date" placeholder="card expire..." />
          {error?.cardExpire && <p>{error.cardExpire}</p>}
          <Input name="cardNumber" type="text" placeholder="card number..." />
          {error?.cardNumber && <p>{error.cardNumber}</p>}
          <Input name="iban" type="text" placeholder="iban..." />
          {error?.iban && <p>{error.iban}</p>}

          {selectForm.map((item, index) => (
            <Select name={item.name} key={index}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder={item.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {item.option.map((i) => (
                  <SelectItem key={i.value} value={i.value}>
                    {i.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
          <Button type="submit">add bank</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default FormAddBanks;
