import {auth} from "@/auth";
import React from "react";
import {NavUser} from "./nav-user";

async function SidebarInfo() {
  const session = await auth();

  if (!session?.user) return null;

  const userData = {
    email: session.user.email || "",
    image: session.user.image || "",
    role: session.user.role || "",
    name: session.user.name || "",
    id: session.user.id || "",
  };
  return (
    <div>
      <NavUser user={userData} />
    </div>
  );
}

export default SidebarInfo;
