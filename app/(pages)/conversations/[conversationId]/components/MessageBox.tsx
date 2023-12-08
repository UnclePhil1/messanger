"use client";
import clsx from "clsx";
import { FullMessageType } from "../../../../types";
import { useSession } from "next-auth/react";
import Avatar from "../../../../components/avatar";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email) //filter out the sender
    .map((user) => user.name)
    .join(", ");

  const container = clsx(
    `w-full flex gap-3 p-4`,
    isOwn && `justify-end items-end`
  );

  const avatar = clsx(isOwn && `order-2`);

  const body = clsx(`flex flex-col gap-2`, isOwn && `items-end`);

  const message = clsx(
    `text-sm w-fit overflow-hidden`,
    isOwn ? "bg-primary text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-sm text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              onClick={() => setImageModalOpen(true)}
              src={data.image}
              alt="Image"
              height={250}
              width={250}
              className="object-cover cursor-pointer hover: scale-110 transition translate w-auto h-auto"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="font-light text-[12px] text-green-600">{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
