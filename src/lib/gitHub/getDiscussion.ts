import { notFound } from "next/navigation";
import { GitHubComment, GitHubDiscussion } from "@/lib/types";

export async function getDiscussion(
  owner: string,
  repo: string,
  issueNumber: number
): Promise<[GitHubDiscussion, GitHubComment[]]> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/discussions/${issueNumber}`);
    if (!response.ok) notFound();
    const discussion: GitHubDiscussion = await response.json();

    const responseComments = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/discussions/${issueNumber}/comments`
    );
    if (!responseComments.ok) notFound();
    const comments: GitHubComment[] = await responseComments.json();

    return [discussion, comments];
  } catch {
    notFound();
  }
}
