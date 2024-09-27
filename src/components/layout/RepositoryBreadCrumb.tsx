import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";
import { GitHubRepository } from "@/lib/types";
import { UserAvatar } from "./UserAvatar";

type RepositoryBreadCrumbProps = {
  repository: GitHubRepository;
};

export default function RepositoryBreadCrumb({ repository }: RepositoryBreadCrumbProps) {
  return (
    <div className="flex gap-2 items-center">
      <UserAvatar user={repository.owner} />
      <Breadcrumb>
        <BreadcrumbList className=" flex-nowrap ">
          <BreadcrumbItem>{repository.owner.login}</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{repository.name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
