"use client";
import Link from "next/link";
import { PlusCircledIcon, PersonIcon } from "@radix-ui/react-icons";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";

export default function NavBar() {
  const iconSize = 24;

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">
              <Button variant="ghost" className="flex gap-1">
                <PlusCircledIcon height={iconSize} width={iconSize} />
                <p>Create</p>
              </Button>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink>
            <div id="cont" className="h-8 w-8">
              <SignedIn>
                <ClerkLoading>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </ClerkLoading>
                <ClerkLoaded>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "h-8 w-8",
                      },
                    }}
                  />
                </ClerkLoaded>
              </SignedIn>
              <SignedOut>
                <ClerkLoading>
                  <Skeleton className="h-full w-16 bg-purple-300" />
                </ClerkLoading>
                <SignInButton>
                  <Button variant="ghost" className="w-16">
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
