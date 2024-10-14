import Navigation from "@/components/layout/Navigation";
import PageContent from "@/components/layout/PageContent";
import RepositorySubNavigation from "@/components/layout/RepositorySubNavigation";
import { getRepository } from "@/lib/gitHub/getRepository";
import React, { ReactNode } from "react";

type layoutProps = {
  children: ReactNode;
  params: {
    owner: string;
    repo: string;
  };
};

export default async function layout({ children, params }: layoutProps) {
  const repository = await getRepository(params.owner, params.repo);

  return (
    <>
      <Navigation
        repository={repository}
        subnavigation={
          repository && (
            <RepositorySubNavigation
              repositoryURL={repository.full_name}
              hasIssues={repository.has_issues}
              hasDiscussions={repository.has_discussions}
            />
          )
        }
      />
      <PageContent>{children}</PageContent>
    </>
  );
}
