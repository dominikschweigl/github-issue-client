import { CircleCheck, CircleDot } from "lucide-react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Post from "@/components/layout/Post";
import { getIssue } from "@/lib/gitHub/getIssue";

type PageParams = {
  params: {
    owner: string;
    repo: string;
    id: number;
  };
};

export default async function Page({ params }: PageParams) {
  const [issue, comments] = await getIssue(params.owner, params.repo, params.id);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">
        {issue.title}
        <span className="text-gray-500 font-light"> #{issue.number}</span>
      </h1>
      <div className="flex gap-2">
        <Badge
          className={`text-white text-sm gap-1 ${issue.state === "open" ? "bg-green-500" : "bg-purple-500"}`}
        >
          {issue.state === "open" ? <CircleDot className="h-4 w-4" /> : <CircleCheck className="h-4 w-4" />}
          {issue.state.charAt(0).toUpperCase() + issue.state.slice(1)}
        </Badge>
        <p className="text-gray-500">{issue.comments} comments</p>
      </div>
      <Separator className="mb-2" />
      {
        <Post
          body={issue.body}
          gitHubReactions={issue.reactions}
          user={issue.user}
          creationTime={new Date(issue.created_at)}
          authorAssociation={issue.author_association}
        />
      }
      <div className="flex gap-4 items-center">
        <p>{issue.comments} comments</p>
        <Separator className="flex-1" />
      </div>
      {comments.map((c) => (
        <Post
          key={c.id}
          body={c.body}
          gitHubReactions={c.reactions}
          user={c.user}
          creationTime={new Date(c.created_at)}
          authorAssociation={c.author_association}
        />
      ))}
    </div>
  );
}
