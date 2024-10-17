import { FC } from "react";
import { NavigationLink } from "@/constants/NavigationContent";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const NavLinkComponent: FC<NavigationLink> = ({ title, href, icon }) => {
  return (
    <li>
      <NavLink
        to={href}
        end
        className={({ isActive }) =>
          cn(
            "flex w-full gap-2 items-center hover:bg-slate-100 text-slate-500 rounded-sm transition-all py-1 px-2 max-md:w-full",
            isActive ? "font-medium bg-slate-300 hover:bg-slate-200 text-foreground" : ""
          )
        }
      >
        {icon} <span className="text-xsm">{title}</span>
      </NavLink>
    </li>
  );
};

export default NavLinkComponent;
