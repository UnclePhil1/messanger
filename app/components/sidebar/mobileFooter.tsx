"use client";

import useConversation from "../../hooks/useConversation";
import useRoutes from "../../hooks/useRoute";
import MobileItem from "./mobileItems";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className="w-[100%] py-2 px-4 fixed bottom-0 bg-white flex justify-around items-center lg:hidden shadow-md">
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          href={route.href}
          label={route.label}
          icon={route.icon}
          active={route.active}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
