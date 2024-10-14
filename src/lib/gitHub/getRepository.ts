import { GitHubRepository } from "@/lib/types";
import { notFound } from "next/navigation";
import { Octokit } from "octokit";

export async function getRepository(owner: string, repo: string): Promise<GitHubRepository> {
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
