import FormAddBanks from "@/features/user/components/Form-Add-Banks";
import React from "react";

async function page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  return (
    <div className="container mx-auto mt-5">
      <FormAddBanks id={id} />
    </div>
  );
}

export default page;
