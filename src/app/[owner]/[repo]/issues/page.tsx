import ListTable from "@/components/layout/ListTable";
import { GitHubIssue, GitHubRepository } from "@/lib/types";
import { CheckIcon } from "lucide-react";
import { Octokit } from "octokit";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import IssuePreview from "@/components/layout/IssuePreview";
import { notFound } from "next/navigation";

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
  const [repository, issues, pages] = await getRepositoryIssues(
    params.owner,
    params.repo,
    currentPage,
    issuesState
  );

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

async function getRepositoryIssues(
  owner: string,
  repo: string,
  page: number,
  state: string
): Promise<[GitHubRepository, GitHubIssue[], number]> {
  try {
    const octokit = new Octokit({});

    const repository = await octokit.request("GET /repos/{owner}/{repo}", {
      owner: owner,
      repo: repo,
    });

    const allowedStates = ["open", "closed"];
    const issues = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: owner,
      repo: repo,
      page: page,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state: allowedStates.includes(state) ? state : "open",
    });

    const parse = await import("parse-link-header");
    const link = parse.default(issues.headers.link);

    return [repository.data, issues.data, (link?.last?.page && Number.parseInt(link?.last?.page)) || page];
  } catch {
    notFound();
  }
}
