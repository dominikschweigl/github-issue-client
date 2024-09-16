import Navigation from "@/components/layout/Navigation";
import RepositorySubNavigation from "@/components/layout/RepositorySubNavigation";
import { GitHubRepository, GitHubRepoTree } from "@/lib/types";
import { Octokit } from "octokit";
import React from "react";

type PageParams = {
  params: {
    owner: string;
    repo: string;
  };
};

export default async function Page({ params }: PageParams) {
  const [repository, tree] = await getRepository(params.owner, params.repo);

  return (
    <>
      <Navigation
        repository={repository}
        subnavigation={
          <RepositorySubNavigation repositoryURL={repository.full_name} activeTab="code" hasIssues={repository.has_issues} hasDiscussions={repository.has_discussions} />
        }
      />
      <div className="pt-4 px-3 sm:px-4 md:px-6">
        {tree.tree.length > 0
          ? tree.tree
              .sort((a, b) => a.type?.localeCompare(b.type || "") || -1)
              .reverse()
              .map((item, index) => <p key={index}>{item.path}</p>)
          : "empty repository"}
      </div>
    </>
  );
}

async function getRepository(owner: string, repo: string): Promise<[GitHubRepository, GitHubRepoTree]> {
  const octokit = new Octokit({});

  const repository = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: owner,
    repo: repo,
  });

  const tree = await octokit.request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
    owner: owner,
    repo: repo,
    tree_sha: repository.data.default_branch,
  });

  return [repository.data, tree.data];
}
