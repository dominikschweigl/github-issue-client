import ListTable from "@/components/layout/ListTable";
import Navigation from "@/components/layout/Navigation";
import PageContent from "@/components/layout/PageContent";
import RepositorySubNavigation from "@/components/layout/RepositorySubNavigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GitHubIssues, GitHubRepository } from "@/lib/types";
import { AvatarImage } from "@radix-ui/react-avatar";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import TimeAgo from "javascript-time-ago";
import { CheckIcon, CircleCheck, CircleDot, CircleSlash } from "lucide-react";
import { Octokit } from "octokit";
import React, { ReactNode } from "react";
import en from "javascript-time-ago/locale/en";
import Link from "next/link";
import { Button } from "@/components/ui/button";

TimeAgo.addDefaultLocale(en);

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
  const currentPage = Number.parseInt(searchParams?.page || "1");
  const issuesState = searchParams?.state || "open";
  const [repository, issues, pages] = await getRepositoryIssues(
    params.owner,
    params.repo,
    currentPage,
    issuesState
  );

  const issueList = issues.map((issue, index) => {
    const closed = issue.closed_at ? new Date(issue.closed_at) : new Date();
    const opened = issue.created_at ? new Date(issue.created_at) : new Date();
    const timeAgo = new TimeAgo("en-US");

    return (
      <div key={index}>
        <div className={`flex items-start gap-3 flex-nowrap text-sm`}>
          <IssueIcon state={issue.state} state_reason={issue.state_reason} />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[16px]">{issue.title}</p>
            <div className="flex items-center gap-1 flex-nowrap text-xs text-gray-500">
              {issue.state === "open" && (
                <>
                  <p>
                    #{issue.number} opened {timeAgo.format(opened)} by
                  </p>
                  <Avatar className="w-3 h-3">
                    <AvatarImage src={issue.user?.avatar_url} />
                    <AvatarFallback className="bg-gray-400 text-gray-50">
                      {issue.user?.login[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p>{issue.user?.login}</p>
                </>
              )}
              {issue.state === "closed" && (
                <>
                  <p>#{issue.number} by</p>
                  <Avatar className="w-3 h-3">
                    <AvatarImage src={issue.user?.avatar_url} />
                    <AvatarFallback className="bg-gray-400 text-gray-50">
                      {issue.user?.login[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p>
                    {issue.user?.login} was closed {timeAgo.format(closed)}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });

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
    <>
      <Navigation
        repository={repository}
        subnavigation={
          <RepositorySubNavigation
            repositoryURL={repository.full_name}
            activeTab="issues"
            hasIssues={repository.has_issues}
            hasDiscussions={repository.has_discussions}
          />
        }
      />
      <PageContent>
        <ListTable head={listHead} items={issueList} page={currentPage} pages={pages} />
      </PageContent>
    </>
  );
}

function IssueIcon({
  state,
  state_reason,
}: {
  state: string | undefined;
  state_reason: string | null | undefined;
}): ReactNode {
  const layout = "w-4 h-4 mt-[3px] shrink-0 ";
  if (state === "open") {
    return <CircleDot className={layout + "stroke-green-500"} />;
  } else if (state === "closed" && state_reason === "not_planned") {
    return <CircleSlash className={layout + "stroke-gray-500"} />;
  } else if (state === "closed") {
    return <CircleCheck className={layout + "stroke-purple-500"} />;
  } else {
    return <QuestionMarkIcon className={layout + "stroke-red-500"} />;
  }
}

async function getRepositoryIssues(
  owner: string,
  repo: string,
  page: number,
  state: string
): Promise<[GitHubRepository, GitHubIssues, number]> {
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
}
