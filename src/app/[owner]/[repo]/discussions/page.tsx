import { GitHubDiscussion, GitHubRepository } from "@/lib/types";
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
    <div className="pt-4 px-3 sm:px-4 md:px-6">
      <p>{repository.full_name}</p>
      {/* TODO: add discussions*/}
    </div>
  );
}

async function getRepository(owner: string, repo: string): Promise<[GitHubRepository, GitHubDiscussion[]]> {
  const octokit = new Octokit({});

  const repository = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: owner,
    repo: repo,
  });

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/discussions`);
  const discussions = await response.json();

  return [repository.data, discussions];
}
