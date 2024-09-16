import Navigation from "@/components/layout/Navigation";
import RepositorySubNavigation from "@/components/layout/RepositorySubNavigation";
import { GitHubIssues, GitHubRepository } from "@/lib/types";
import { Octokit } from "octokit";
import React from "react";

type PageParams = {
  params: {
    owner: string;
    repo: string;
  };
};

export default async function Page({ params }: PageParams) {
  const [repository] = await getRepository(params.owner, params.repo);

  return (
    <>
      <Navigation
        repository={repository}
        subnavigation={
          <RepositorySubNavigation repositoryURL={repository.full_name} activeTab="issues" hasIssues={repository.has_issues} hasDiscussions={repository.has_discussions} />
        }
      />
      <div className="pt-4 px-3 sm:px-4 md:px-6">
        <p>{repository.full_name}</p>
        {/* TODO: add issues*/}
      </div>
    </>
  );
}

async function getRepository(owner: string, repo: string): Promise<[GitHubRepository, GitHubIssues]> {
  const octokit = new Octokit({});

  const repository = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: owner,
    repo: repo,
  });

  const issues = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: owner,
    repo: repo,
  });

  return [repository.data, issues.data];
}
