import { APP_NAME } from "@reverse-proxy/constants/app";
import Link from "next/link";
import { FC } from "react";

const links: { id: string; href: string; label: string }[] = [];

export const Navbar: FC = () => {
  return (
    <nav className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">{APP_NAME}</div>
        <div className="hidden space-x-4 md:flex">
          {links.map(({ id, href, label }) => {
            return (
              <Link key={id} href={href} className="hover:underline">
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
