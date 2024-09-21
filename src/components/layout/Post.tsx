import { GitHubAuthorAssociation, GitHubReactions, GitHubUser } from "@/lib/types";
import React from "react";
import { Badge } from "../ui/badge";
import TimeAgo from "javascript-time-ago";
import { marked } from "marked";
import parse from "html-react-parser";
import { UserAvatar } from "./UserAvatar";

type CommentProps = {
  body: string | null | undefined;
  gitHubReactions: GitHubReactions;
  creationTime: Date;
  user: GitHubUser;
  authorAssociation: GitHubAuthorAssociation;
};

export default async function Post({
  body,
  gitHubReactions,
  user,
  authorAssociation,
  creationTime,
}: CommentProps) {
  const timeAgo = new TimeAgo("en-US");

  const reactions = [
    { name: "thumbsUp", count: gitHubReactions?.["+1"] || 0, emoji: "👍" },
    { name: "thumbsDown", count: gitHubReactions?.["-1"] || 0, emoji: "👎" },
    { name: "rocket", count: gitHubReactions?.rocket || 0, emoji: "🚀" },
    { name: "hooray", count: gitHubReactions?.hooray || 0, emoji: "🎉" },
    { name: "heart", count: gitHubReactions?.heart || 0, emoji: "❤️" },
    { name: "confused", count: gitHubReactions?.confused || 0, emoji: "😕" },
    { name: "laugh", count: gitHubReactions?.laugh || 0, emoji: "😄" },
  ];

  const content = parse(await marked.parse(body || ""));

  return (
    <div className="flex flex-col border rounded-lg overflow-clip">
      <div className="flex justify-between bg-white bg-opacity-[5%] py-2.5 px-4 border-b">
        <div className="flex flex-nowrap gap-2">
          <UserAvatar user={user} />
          <p className="text-sm font-medium">
            {user?.login} <span className="text-gray-400 font-normal">{timeAgo.format(creationTime)}</span>
          </p>
        </div>
        {authorAssociation !== "NONE" && (
          <Badge variant={"secondary"} className="text-gray-400">
            {authorAssociation[0] + authorAssociation.toLowerCase().slice(1)}
          </Badge>
        )}
      </div>
      <div className="px-4 py-4 markdown-body">{content}</div>
      <div className="flex gap-2 px-4">
        {reactions.map((r) => {
          if (r.count > 0)
            return (
              <Badge key={r.name} variant={"secondary"} className="mb-2">
                {r.emoji} {r.count}
              </Badge>
            );
        })}
      </div>
    </div>
  );
}
