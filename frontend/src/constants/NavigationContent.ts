import React from "react";

// React Icons
import { RiHome3Line } from "react-icons/ri";
import { RiTaskLine } from "react-icons/ri";
import { RiSettings3Line } from "react-icons/ri";
import { RiFolder2Line } from "react-icons/ri";
import { RiTeamLine } from "react-icons/ri";

export type NavigationLink = {
  title: string;
  href: string;
  icon: React.ReactElement;
};

export const navigationLinks: NavigationLink[] = [
  {
    title: "Home",
    href: "/",
    icon: React.createElement(RiHome3Line),
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: React.createElement(RiTaskLine),
  },
  {
    title: "Settings",
    href: "/settings",
    icon: React.createElement(RiSettings3Line),
  },
  {
    title: "Projects",
    href: "/projects",
    icon: React.createElement(RiFolder2Line),
  },
  {
    title: "Team",
    href: "/team",
    icon: React.createElement(RiTeamLine),
  },
];
