import DiscussionPreview from "@/components/layout/DiscussionPreview";
import ListTable from "@/components/layout/ListTable";
import { GitHubDiscussion } from "@/lib/types";
import { notFound } from "next/navigation";
import React from "react";

type PageParams = {
  params: {
    owner: string;
    repo: string;
  };
  searchParams?: {
    [key: string]: string;
  };
};

export default async function Page({ params, searchParams }: PageParams) {
  const currentPage =
    Number.parseInt(searchParams?.page || "1") > 0 ? Number.parseInt(searchParams?.page || "1") : 1;

  const [discussions, pages] = await getDiscussions(params.owner, params.repo, currentPage);

  const discussionItems = discussions.map((d) => (
    <DiscussionPreview key={d.number} repoName={params.owner.concat("/", params.repo)} discussion={d} />
  ));

  return (
    <>
      <ListTable items={discussionItems} page={currentPage} pages={pages} />
    </>
  );
}

async function getDiscussions(
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
