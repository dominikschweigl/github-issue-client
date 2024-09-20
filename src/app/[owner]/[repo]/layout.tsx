import Navigation from "@/components/layout/Navigation";
import PageContent from "@/components/layout/PageContent";
import RepositorySubNavigation from "@/components/layout/RepositorySubNavigation";
import { GitHubRepository } from "@/lib/types";
import { notFound } from "next/navigation";
import { Octokit } from "octokit";
import React, { ReactNode } from "react";

type layoutProps = {
  children: ReactNode;
  params: {
    owner: string;
    repo: string;
  };
};

export default async function layout({ children, params }: layoutProps) {
  const repository = await getRepository(params.owner, params.repo);

  return (
    <>
      <Navigation
        repository={repository}
        subnavigation={
          repository && (
            <RepositorySubNavigation
              repositoryURL={repository.full_name}
              hasIssues={repository.has_issues}
              hasDiscussions={repository.has_discussions}
            />
          )
        }
      />
      <PageContent>{children}</PageContent>
    </>
  );
}

async function getRepository(owner: string, repo: string): Promise<GitHubRepository> {
  const octokit = new Octokit({});

  try {
    const repository = await octokit.request("GET /repos/{owner}/{repo}", {
      owner: owner,
      repo: repo,
    });
    return repository.data;
  } catch {
    notFound();
  }
}
