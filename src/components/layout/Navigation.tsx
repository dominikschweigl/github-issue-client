import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { GitHubLogoIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import RepositoryBreadCrumb from "./RepositoryBreadCrumb";

type NavigationProps = {
  avatar?: string;
  route: string[];
  subnavigation?: React.ReactNode | undefined;
};

export default function Navigation({ avatar, route, subnavigation }: NavigationProps) {
  return (
    <header className="sticky top-0 min-h-16 pt-3 px-3 sm:px-4 md:px-6 border-b bg-background flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <nav className="font-medium flex items-center gap-5 text-sm">
          <Link href="/" className="flex items-center gap-2  font-semibold text-base">
            <GitHubLogoIcon className="h-7 w-7" />
            <span className={route.length ? "sr-only" : ""}>GitHub Issue Viewer</span>
          </Link>
          {route.length > 0 && <RepositoryBreadCrumb avatar={avatar} route={route} />}
        </nav>
        <div className="flex items-center gap-4 ml-auto md:gap-2 lg:gap-4">
          <Button variant={"secondary"}>
            <MagnifyingGlassIcon className="h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
      {subnavigation}
    </header>
  );
}
