import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { CircleDot, Code, GitPullRequestArrow } from "lucide-react";

export default function RepositorySubNavigation() {
  return (
    <div className="flex gap-4 font-normal">
      <Link href={"."}>
        <Button variant={"ghost"} size={"sm"}>
          <Code className="h-4 w-4" />
          Code
        </Button>
      </Link>
      <Link href={"./issues"}>
        <Button variant={"ghost"} size={"sm"}>
          <CircleDot className="h-4 w-4" />
          Issues
        </Button>
      </Link>
      <Link href={"./discussions"}>
        <Button variant={"ghost"} size={"sm"}>
          <GitPullRequestArrow className="h-4 w-4" />
          Discussions
        </Button>
      </Link>
    </div>
  );
}
