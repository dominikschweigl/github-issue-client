"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { CircleDot, Code, MessagesSquare } from "lucide-react";
import { usePathname } from "next/navigation";

type RepositorySubNavigationProps = {
  repositoryURL: string;
  hasIssues: boolean;
  hasDiscussions: boolean;
};

export default function RepositorySubNavigation({
  repositoryURL,
  hasIssues,
  hasDiscussions,
}: RepositorySubNavigationProps) {
  const pathname = usePathname();
  const subcategory = pathname.split("/")[3] || "code";
  const [active, setActive] = useState(subcategory);

  return (
    <div className="flex gap-4 font-normal">
      <Link href={`/${repositoryURL}`}>
        <Button
          data-active={active === "code"}
          variant={"ghost"}
          size={"sm"}
          className="rounded-b-none border-white data-[active=true]:border-b-2 data-[active=true]:translate-y-px"
          onClick={() => setActive("code")}
        >
          <Code className="h-4 w-4" />
          Code
        </Button>
      </Link>

      {hasIssues && (
        <Link href={`/${repositoryURL}/issues`}>
          <Button
            data-active={active === "issues"}
            variant={"ghost"}
            size={"sm"}
            className="rounded-b-none border-white data-[active=true]:border-b-2 data-[active=true]:translate-y-px"
            onClick={() => setActive("issues")}
          >
            <CircleDot className="h-4 w-4" />
            Issues
          </Button>
        </Link>
      )}
      {hasDiscussions && (
        <Link href={`/${repositoryURL}/discussions`}>
          <Button
            data-active={active === "discussions"}
            variant={"ghost"}
            size={"sm"}
            className="rounded-b-none border-white data-[active=true]:border-b-2 data-[active=true]:translate-y-px"
            onClick={() => setActive("discussions")}
          >
            <MessagesSquare className="h-4 w-4" />
            Discussions
          </Button>
        </Link>
      )}
    </div>
  );
}
