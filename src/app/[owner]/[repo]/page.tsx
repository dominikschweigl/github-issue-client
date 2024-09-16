import CodeTree from "@/components/layout/CodeTree";
import Navigation from "@/components/layout/Navigation";
import PageContent from "@/components/layout/PageContent";
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
          repository && (
            <RepositorySubNavigation
              repositoryURL={repository.full_name}
              activeTab="code"
              hasIssues={repository.has_issues}
              hasDiscussions={repository.has_discussions}
            />
          )
        }
      />
      <PageContent>
        {repository ? (
          <CodeTree tree={tree} />
        ) : (
          <div className="flex justify-center text-2xl text-center font-black font-mono pt-16">
            THIS REPOSITORY DOES NOT EXIST
          </div>
        )}
      </PageContent>
    </>
  );
}

async function getRepository(
  owner: string,
  repo: string
): Promise<[GitHubRepository | undefined, GitHubRepoTree | undefined]> {
  const octokit = new Octokit({});

  try {
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
  } catch {
    return [undefined, undefined];
  }
}
