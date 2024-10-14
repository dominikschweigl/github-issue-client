import { GitHubIssue } from "@/lib/types";
import { Octokit } from "octokit";
import { notFound } from "next/navigation";

export async function getRepositoryIssues(
  owner: string,
  repo: string,
  page: number,
  state: string
): Promise<[GitHubIssue[], number]> {
  try {
    const octokit = new Octokit({});

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

    return [issues.data, (link?.last?.page && Number.parseInt(link?.last?.page)) || page];
  } catch {
    notFound();
  }
}
