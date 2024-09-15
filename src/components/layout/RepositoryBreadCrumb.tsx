import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

type RepositoryBreadCrumbProps = {
  avatar?: string;
  route: string[];
};

export default function RepositoryBreadCrumb({ avatar, route }: RepositoryBreadCrumbProps) {
  return (
    <div className="flex gap-2">
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback>{route[0][0]}</AvatarFallback>
      </Avatar>
      <Breadcrumb>
        <BreadcrumbList className=" flex-nowrap ">
          {route.slice(0, -1).map((item) => (
            <>
              <BreadcrumbItem>{item}</BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ))}
          <BreadcrumbItem>{route.at(-1)}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
