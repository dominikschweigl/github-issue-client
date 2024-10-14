import { GitHubDiscussion } from "@/lib/types";
import { notFound } from "next/navigation";

export async function getRepositoryDiscussions(
  owner: string,
  repo: string,
  page: number
): Promise<[GitHubDiscussion[], number]> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/discussions?page=${page}`);
    if (!response.ok) {
      notFound();
    }

    const discussions: GitHubDiscussion[] = await response.json();
    discussions.sort((a, b) => Number.parseInt(a.created_at) - Number.parseInt(b.created_at));

    const parse = await import("parse-link-header");
    const links = parse.default(response.headers.get("link"));

    return [discussions, (links?.last?.page && Number.parseInt(links?.last?.page)) || page];
  } catch {
    notFound();
  }
}
