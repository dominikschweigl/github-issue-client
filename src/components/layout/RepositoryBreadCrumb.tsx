import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { GitHubRepository } from "@/lib/types";

type RepositoryBreadCrumbProps = {
  repository: GitHubRepository;
};

export default function RepositoryBreadCrumb({ repository }: RepositoryBreadCrumbProps) {
  return (
    <div className="flex gap-2">
      <Avatar>
        <AvatarImage src={repository.owner.avatar_url} />
        <AvatarFallback>{repository.owner.login[0]}</AvatarFallback>
      </Avatar>
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
