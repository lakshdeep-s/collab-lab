import React from "react";

// React Icons
import { RiHome3Fill } from "react-icons/ri";
import { RiTaskFill } from "react-icons/ri";
import { RiSettings3Fill } from "react-icons/ri";
import { RiFolder2Fill } from "react-icons/ri";
import { RiTeamFill } from "react-icons/ri";

export type NavigationLink = {
  title: string;
  href: string;
  icon: React.ReactElement;
};

export const navigationLinks: NavigationLink[] = [
  {
    title: "Home",
    href: "/",
    icon: React.createElement(RiHome3Fill),
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: React.createElement(RiTaskFill),
  },
  {
    title: "Settings",
    href: "/settings",
    icon: React.createElement(RiSettings3Fill),
  },
  {
    title: "Projects",
    href: "/projects",
    icon: React.createElement(RiFolder2Fill),
  },
  {
    title: "Team",
    href: "/team",
    icon: React.createElement(RiTeamFill),
  },
];
