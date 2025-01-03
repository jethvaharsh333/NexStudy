"use client";
import * as React from "react"
import Link from "next/link";

import { cn } from "@/lib/utils";
import Logo from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import NexStudy from "@/public/logo.svg";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { useEffect, useState } from "react";


const components: { title: string; href: string; description: string }[] = [
  {
    title: "Features",
    href: "#features",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Student",
    href: "#student",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Teacher",
    href: "#teacher",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Testimonials",
    href: "#testimonials",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Insiders",
    href: "#inside-platform",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
]

const NavLink = () => {
  const pathname = usePathname();

  const NavLinks = [
    { id: 1, name: 'Features', path: '/#features' },
    { id: 2, name: 'Student', path: '/#student' },
    { id: 3, name: 'Teacher', path: '/#teacher' },
    { id: 4, name: 'Testimonials', path: '/#testimonials' },
    { id: 5, name: 'Insiders', path: '/#inside-platform' },
  ];

  return (
    <div className="flex md:flex-row w-full items-center justify-center font-light lg:pe-9 flex-col pt-10 md:pt-0">
      <div className="md:hidden h-[50px] flex justify-center mb-24">
        <NexStudy className="w-40 h-10 "/>
      </div>

      <div className="w-full md:hidden h-full flex items-center justify-center mb-3">
        <ul className="flex flex-col self-center justify-center font-semibold items-center md:flex-row gap-y-5 gap-x-10 lg:gap-x-16 lg:text-lg xl:text-[20px] text-slate-800 text-lg">
          {NavLinks.map((link) => (
            <li
              key={link.id}
            >
              <Link href={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full max-md:hidden h-full flex items-center justify-center">
        <NavigationMenu className="flex justify-center ">
          <NavigationMenuList className="flex gap-x-3 justify-center items-center lg:max-w-4xl max-md:flex-col">
            <NavigationMenuItem className="flex ">
              <NavigationMenuTrigger>Site overview</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-y-0 md:w-[400px] lg:w-[200px] px-2 font-medium text-sm py-2">
                  <ListItem href="/#features" title="Features" ></ListItem>
                  <ListItem href="/#student" title="Student"></ListItem>
                  <ListItem href="/#teacher" title="Teacher"></ListItem>
                  <ListItem href="/#testimonials" title="Testimonials"></ListItem>
                  {/* <ListItem href="/#inside-platform" title="What's Inside?"></ListItem> */}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/explore-courses" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Explore courses
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex justify-center md:ms-8">
        <LoginButton>
          <Button size="lg">Sign in</Button>
        </LoginButton>
      </div>
    </div>
  );
};

export default NavLink;


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-md font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-md leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"