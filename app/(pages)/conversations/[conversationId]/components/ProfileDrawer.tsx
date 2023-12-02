"use client";
import { Conversation, User } from "@prisma/client";
import React, { Fragment, useMemo } from "react";
import useOtherUser from "../../../../hooks/useOtherUser";
import { format } from "date-fns";
import { Transition, Dialog } from "@headlessui/react";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const otherUser = useOtherUser(data);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), 'PP');
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return "Active";
  }, [data]);

  return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-500'
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-500"
                    leaveFrom="opacity-10"
                    leaveTo="opacity-0"
                >
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-40"
                    />
                </Transition.Child>
            </Dialog>
        </Transition.Root>
  );
};

export default ProfileDrawer;