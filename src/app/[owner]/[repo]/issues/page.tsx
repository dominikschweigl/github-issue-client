import ListTable from "@/components/layout/ListTable";
import { CheckIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import IssuePreview from "@/components/layout/IssuePreview";
import { getRepository } from "@/lib/gitHub/getRepository";
import { getRepositoryIssues } from "@/lib/gitHub/getRepositoryIssues";

type PageParams = {
  params: {
    owner: string;
    repo: string;
  };
  searchParams?: {
    [key: string]: string;
  };
};

export default async function Page({ params, searchParams }: PageParams) {
  let currentPage = Number.parseInt(searchParams?.page || "1");
  currentPage = currentPage > 0 ? currentPage : 1;
  const issuesState = searchParams?.state || "open";

  const repository = await getRepository(params.owner, params.repo);
  const [issues, pages] = await getRepositoryIssues(params.owner, params.repo, currentPage, issuesState);

  const issueList = issues.map((issue, index) => (
    <IssuePreview key={index} repoName={repository.full_name} issue={issue} />
  ));

  const listHead = (
    <div className="flex items-center gap-4">
      <Link href={`?page=${issuesState === "open" ? currentPage : 1}&state=open`}>
        <Button
          variant={"link"}
          className={`p-0 h-auto flex gap-1 items-center ${issuesState === "closed" ? "text-gray-400" : ""}`}
        >
          {issuesState === "open" && <CheckIcon className="h-4 w-4" />}
          <p>{repository.open_issues} Open</p>
        </Button>
      </Link>
      <Link href={`?page=${issuesState === "closed" ? currentPage : 1}&state=closed`}>
        <Button
          variant={"link"}
          className={`p-0 h-auto flex gap-1 items-center ${issuesState === "open" ? "text-gray-400" : ""}`}
        >
          {issuesState === "closed" && <CheckIcon className="h-4 w-4" />}
          Closed
        </Button>
      </Link>
    </div>
  );

  return (
    <ListTable head={listHead} items={issueList} page={currentPage} pages={pages} emptyMessage="No Issues." />
  );
}
