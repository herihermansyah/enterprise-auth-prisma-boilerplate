import FormAddAddress from "@/features/user/components/Form-Add-Address";
import React from "react";

async function page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  return (
    <div className="container mx-auto mt-5">
      <FormAddAddress id={id} />
    </div>
  );
}

export default page;
