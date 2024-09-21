import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { GitHubUser } from "@/lib/types";

type UserAvatarProps = {
  user?: GitHubUser;
  className?: string;
};

export const UserAvatar = ({ user, className }: UserAvatarProps) => (
  <Avatar className={className}>
    <AvatarImage src={user?.avatar_url} />
    <AvatarFallback className="bg-gray-400 text-gray-50 text-[8px]">
      {user?.login[0].toUpperCase()}
    </AvatarFallback>
  </Avatar>
);
