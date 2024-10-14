import DiscussionPreview from "@/components/layout/DiscussionPreview";
import ListTable from "@/components/layout/ListTable";
import { getRepositoryDiscussions } from "@/lib/gitHub/getRepositoryDiscussions";
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

  const [discussions, pages] = await getRepositoryDiscussions(params.owner, params.repo, currentPage);

  const discussionItems = discussions.map((d) => (
    <DiscussionPreview key={d.number} repoName={params.owner.concat("/", params.repo)} discussion={d} />
  ));

  return (
    <>
      <ListTable items={discussionItems} page={currentPage} pages={pages} emptyMessage="No Discussions." />
    </>
  );
}
