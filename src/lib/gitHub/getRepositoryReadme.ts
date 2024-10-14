import { Octokit } from "octokit";

export async function getRepositoryReadme(owner: string, repo: string): Promise<string> {
  const octokit = new Octokit({});

  //wrong type in octokit due to header accept value
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const readme: any = await octokit.request("GET /repos/{owner}/{repo}/readme", {
    owner: owner,
    repo: repo,
    headers: {
      accept: "application/vnd.github.html+json",
    },
  });

  return readme.data;
}
