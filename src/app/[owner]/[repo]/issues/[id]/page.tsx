import Navigation from "@/components/layout/Navigation";
import PageContent from "@/components/layout/PageContent";
import RepositorySubNavigation from "@/components/layout/RepositorySubNavigation";
import { GitHubComment, GitHubIssue, GitHubRepository } from "@/lib/types";
import { CircleCheck, CircleDot } from "lucide-react";
import { Octokit } from "octokit";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Post from "@/components/layout/Post";

type PageParams = {
  params: {
    owner: string;
    repo: string;
    id: number;
  };
};

export default async function Page({ params }: PageParams) {
  const [repository, issue, comments] = await getIssue(params.owner, params.repo, params.id);

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
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl">
            {issue.title}
            <span className="text-gray-500 font-light"> #{issue.number}</span>
          </h1>
          <div className="flex gap-2">
            <Badge
              className={`text-white text-sm gap-1 ${
                issue.state === "open" ? "bg-green-500" : "bg-purple-500"
              }`}
            >
              {issue.state === "open" ? (
                <CircleDot className="h-4 w-4" />
              ) : (
                <CircleCheck className="h-4 w-4" />
              )}
              {issue.state.charAt(0).toUpperCase() + issue.state.slice(1)}
            </Badge>
            <p className="text-gray-500">{issue.comments} comments</p>
          </div>
          <Separator className="mb-2" />
          {
            <Post
              body={issue.body}
              gitHubReactions={issue.reactions}
              user={issue.user}
              creationTime={new Date(issue.created_at)}
              authorAssociation={issue.author_association}
            />
          }
          {comments.map((c) => (
            <Post
              key={c.id}
              body={c.body}
              gitHubReactions={c.reactions}
              user={c.user}
              creationTime={new Date(c.created_at)}
              authorAssociation={c.author_association}
            />
          ))}
        </div>
      </PageContent>
    </>
  );
}

async function getIssue(
  owner: string,
  repo: string,
  issueNumber: number
): Promise<[GitHubRepository, GitHubIssue, GitHubComment[]]> {
  const octokit = new Octokit({});

  const repository = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: owner,
    repo: repo,
  });

  const issue = await octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}", {
    owner: owner,
    repo: repo,
    issue_number: issueNumber,
  });

  const comments = await octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}/comments", {
    owner: owner,
    repo: repo,
    issue_number: issueNumber,
  });

  return [repository.data, issue.data, comments.data];
}
