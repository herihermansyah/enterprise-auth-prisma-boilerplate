import {getDataById} from "@/features/user/actions/getData.action";
import {notFound} from "next/navigation";
import React from "react";
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "./ui/card";
import {Button} from "./ui/button";
import Link from "next/link";
import {SignOut} from "./sign-out-button";
import Delete from "./delete-data";
import {deleteAddress} from "@/features/user/actions/addAddress.action";
import {deleteBank} from "@/features/user/actions/addBanks.action";
import ChangeRole from "@/features/user/components/Change-Role";
import ChangeAvatar from "@/features/user/components/change-avatar";
import ChangePassword from "@/features/user/components/change-password";

async function AccountInfo({id}: {id: string}) {
  const user = await getDataById(id);

  if (!user) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>profile info</CardTitle>
        <CardAction className="flex items-center gap-5">
          <ChangePassword id={id} />
          <SignOut />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <Card className="px-5 relative flex flex-col">
          <div className="md:absolute static top-5 right-5">
            <ChangeAvatar
              id={id}
              src={user.image ?? ""}
              alt={user.name ?? ""}
            />
          </div>
          <div className="flex flex-col gap-5">
            <p>User Model</p>
            <p>Name : {user.name ?? "-"}</p>
            <p>Email : {user.email ?? "-"}</p>
            <div className="flex items-center gap-5">
              <p>
                Role : <span className="lowercase">{user.role ?? "-"}</span>
              </p>
              <div>
                <ChangeRole id={id} />
              </div>{" "}
            </div>
            <p>Full Name : {user.fullName ?? "-"}</p>
            <p>Gender : {user.gender ?? "-"}</p>
            <p>Phone : {user.phone ?? "-"} </p>
            <p>UserName : {user.username ?? "-"}</p>
            <p>
              Birth Date :{" "}
              {user.birthDate
                ? new Date(user.birthDate).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <Link href={`/profile/${user.id}/updateuser`}>
            <Button>update user</Button>
          </Link>
        </Card>
        <Card className="px-5">
          <p>Address Model</p>
          <Link href={`/profile/${user.id}/addaddress`}>
            <Button>add address</Button>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {user.addresses.map((item, index) => (
              <Card className="px-5" key={item.id}>
                <p>Address {index + 1}</p>
                <p>State : {item.state}</p>
                <p>City : {item.city}</p>
                <p>Province : {item.province}</p>
                <p>Country : {item.country}</p>
                <Delete
                  id={item.id}
                  onDelete={deleteAddress}
                  label="delete address"
                />
              </Card>
            ))}
          </div>
        </Card>
        <Card className="px-5">
          <p>Bank Model</p>
          <Link href={`/profile/${user.id}/addbank`}>
            <Button>add address</Button>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {user.banks.map((item, index) => (
              <Card key={index} className="px-5">
                <p>Bank {index + 1}</p>
                <p>Card Expire : {item.cardExpire}</p>
                <p>Card Number : {item.cardNumber}</p>
                <p>Card Type : {item.cardType}</p>
                <p>Currency : {item.currency}</p>
                <p>iban : {item.iban}</p>
                <Delete
                  id={item.id}
                  onDelete={deleteBank}
                  label="delete bank"
                />
              </Card>
            ))}
          </div>
        </Card>
      </CardContent>
    </Card>
  );
}

export default AccountInfo;
