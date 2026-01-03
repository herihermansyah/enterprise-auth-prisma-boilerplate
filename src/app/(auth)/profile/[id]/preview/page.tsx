import AccountInfo from "@/components/Account-Info";
import React from "react";

async function page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;

  return (
    <div className="container mx-auto mt-5">
      <AccountInfo id={id} />
    </div>
  );
}

export default page;
