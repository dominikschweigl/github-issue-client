import { GitHubComment, GitHubIssue } from "@/lib/types";
import { Octokit } from "octokit";
import { notFound } from "next/navigation";

export async function getIssue(
  owner: string,
  repo: string,
  issueNumber: number
): Promise<[GitHubIssue, GitHubComment[]]> {
  try {
    const octokit = new Octokit({});

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

    return [issue.data, comments.data];
  } catch {
    notFound();
  }
}
