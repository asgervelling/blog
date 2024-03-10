"use client";
import Link from "next/link";
import { PlusCircledIcon, PersonIcon } from "@radix-ui/react-icons";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";

export default function NavBar() {
  const iconSize = 32;

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex w-full">
        <NavigationMenuItem>
          <NavigationMenuLink>
            <PlusCircledIcon width={iconSize} height={iconSize} />
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink>
            <PersonIcon width={iconSize} height={iconSize} />
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
