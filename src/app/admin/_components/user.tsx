"use client";

import AnimatedButton from "@/components/ui/animated-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircleIcon } from "@phosphor-icons/react";
import SignOutButton from "./signOut-button";

// TODO: on not found page, check if admin - go to dashboard else go to homepage

export default function User() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AnimatedButton
          aria-label="User drop down button"
          className="bg-background shadow-border ring-border hover:ring-purple-60 rounded-lg p-3 shadow ring"
        >
          <UserCircleIcon
            weight="fill"
            aria-hidden
            className="size-4 cursor-pointer sm:size-5 lg:size-6.5"
          />
        </AnimatedButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-sub-background border-border text-body">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
