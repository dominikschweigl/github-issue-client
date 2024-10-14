import { Octokit } from "octokit";
import { GitHubRepoTree } from "../types";

export async function getRepositoryTree(owner: string, repo: string): Promise<GitHubRepoTree> {
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

  return tree.data;
}
