import { FC } from "react";
import { NavigationLink } from "@/constants/NavigationContent";
import { NavLink, NavLinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

const NavLinkComponent: FC<NavigationLink> = ({ title, href, icon }) => {
  return (
    <li>
      <NavLink
        to={href}
        end
        className={({ isActive }) =>
          cn(
            "flex gap-2 items-center hover:bg-slate-100 text-slate-400 rounded-md transition-all py-1 px-2 w-[150px] max-md:w-full tracking-tight",
            isActive ? "bg-brand text-white font-semibold hover:bg-orange-500" : ""
          )
        }
      >
        {icon} {title}
      </NavLink>
    </li>
  );
};

export default NavLinkComponent;
