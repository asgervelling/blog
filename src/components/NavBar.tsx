"use client";
import Link from "next/link";
import { PlusCircledIcon, PersonIcon } from "@radix-ui/react-icons";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function NavBar() {
  const iconSize = 24;
  const { isLoaded, isSignedIn } = useUser();

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex w-full">
        <NavigationMenuItem>
          <NavigationMenuLink>
            <PlusCircledIcon height={iconSize} width={iconSize} />
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink>
            <ClerkLoading>
              <div>Clerk is loading</div>
            </ClerkLoading>
            <ClerkLoaded>
              <SignedIn>
                  <UserButton />
                </SignedIn>
            </ClerkLoaded>
            <SignedOut>
                <SignInButton />
              </SignedOut>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
