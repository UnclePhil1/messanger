"use client";
import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  href: string;
  label: string;
  icon: any;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li className="list-none" onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
            group
            flex
            rounded-md
            p-3
            text-sm
            leading-6
            font-semibold
            text-gray-500
            hover:text-primary
            hover:bg-gray-100
            `,
          active && "bg-gray-100 text-black"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default MobileItem;
