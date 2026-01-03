import {getDataById} from "@/features/user/actions/getData.action";
import FormUpdateUser from "@/features/user/components/Form-Update-User";
import React from "react";

async function page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const value = await getDataById(id);

  if (!value) return null;
  return (
    <div className="container mx-auto mt-5">
      <FormUpdateUser user={value} />
    </div>
  );
}

export default page;
