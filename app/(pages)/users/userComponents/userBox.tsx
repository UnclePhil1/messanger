"use client";
import React, { useCallback, useState } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import Avatar from "../../../components/avatar";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversation", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);
  return (
    <div
      onClick={handleCick}
      className="
    w-full
    relative
    flex
    justify-start
    items-center
    space-x-3
    bg-white
    p-3
  hover:bg-neutral-100
  rounded-lg
  transition
  cursor-pointer
    "
    >
      <Avatar user={data} />
      <div className="">
        <div><p className="text-[16px] font-medium">{data.name}</p></div>
      </div>
    </div>
  );
};

export default UserBox;
