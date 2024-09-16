import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { CircleDot, Code, MessagesSquare } from "lucide-react";

type RepositorySubNavigationProps = {
  repositoryURL: string;
  activeTab: "code" | "issues" | "discussions";
  hasIssues: boolean;
  hasDiscussions: boolean;
};

export default function RepositorySubNavigation({ repositoryURL, activeTab, hasIssues, hasDiscussions }: RepositorySubNavigationProps) {
  return (
    <div className="flex gap-4 font-normal">
      <Link href={`/${repositoryURL}`}>
        <Button
          data-active={activeTab === "code"}
          variant={"ghost"}
          size={"sm"}
          className="rounded-b-none border-white data-[active=true]:border-b-2 data-[active=true]:translate-y-px"
        >
          <Code className="h-4 w-4" />
          Code
        </Button>
      </Link>

      {hasIssues && (
        <Link href={`/${repositoryURL}/issues`}>
          <Button
            data-active={activeTab === "issues"}
            variant={"ghost"}
            size={"sm"}
            className="rounded-b-none border-white data-[active=true]:border-b-2 data-[active=true]:translate-y-px"
          >
            <CircleDot className="h-4 w-4" />
            Issues
          </Button>
        </Link>
      )}
      {hasDiscussions && (
        <Link href={`/${repositoryURL}/discussions`}>
          <Button
            data-active={activeTab === "discussions"}
            variant={"ghost"}
            size={"sm"}
            className="rounded-b-none border-white data-[active=true]:border-b-2 data-[active=true]:translate-y-px"
          >
            <MessagesSquare className="h-4 w-4" />
            Discussions
          </Button>
        </Link>
      )}
    </div>
  );
}
