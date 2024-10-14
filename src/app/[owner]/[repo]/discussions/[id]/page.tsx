import { CircleCheck } from "lucide-react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Post from "@/components/layout/Post";
import TimeAgo from "javascript-time-ago";
import { UserAvatar } from "@/components/layout/UserAvatar";
import { getDiscussion } from "@/lib/gitHub/getDiscussion";

type PageParams = {
  params: {
    owner: string;
    repo: string;
    id: number;
  };
};

export default async function Page({ params }: PageParams) {
  const [discussion, comments] = await getDiscussion(params.owner, params.repo, params.id);
  const timeAgo = new TimeAgo("en-US");

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">
        {discussion.title}
        <span className="text-gray-500 font-light"> #{discussion.number}</span>
      </h1>
      <div className="flex gap-3 items-center">
        {discussion.answer_chosen_by !== null && (
          <Badge variant={"secondary"} className="py-1.5 gap-1">
            <CircleCheck className="h-4 w-4 text-green-500" />
            <p>Answered by {discussion.answer_chosen_by.login}</p>
          </Badge>
        )}
        {discussion.category.is_answerable ? (
          <p className="flex gap-1 flex-nowrap text-gray-400">
            <UserAvatar user={discussion.user} className="w-4 h-4 translate-y-1" />
            {discussion.user?.login} asked this question {timeAgo.format(new Date(discussion.created_at))} in{" "}
            {discussion.category.name}
          </p>
        ) : (
          <p className="flex gap-1 flex-nowrap text-gray-400">
            <UserAvatar user={discussion.user} className="w-4 h-4 translate-y-1" />
            {discussion.user?.login} started this conversation{" "}
            {timeAgo.format(new Date(discussion.created_at))} in {discussion.category.name}
          </p>
        )}
      </div>
      <Separator className="mb-2" />
      {
        <Post
          body={discussion.body}
          gitHubReactions={discussion.reactions}
          user={discussion.user}
          creationTime={new Date(discussion.created_at)}
          authorAssociation={discussion.author_association}
        />
      }
      <div className="flex gap-4 items-center">
        <p>{discussion.comments} comments</p>
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
