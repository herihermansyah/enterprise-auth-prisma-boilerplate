import SidebarInfo from "@/components/sidebar-info";
import {Card, CardContent} from "@/components/ui/card";
import {SidebarProvider} from "@/components/ui/sidebar";
import React from "react";

function page() {
  return (
    <Card className="container mx-auto my-10">
      <CardContent>
        <SidebarProvider className="flex justify-center items-center flex-col gap-5">
          <SidebarInfo />
          <p className="capitalize">ini untuk user</p>
        </SidebarProvider>
      </CardContent>
    </Card>
  );
}

export default page;
