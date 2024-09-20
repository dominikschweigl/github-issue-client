import { GitHubComment, GitHubDiscussion } from "@/lib/types";
import { CircleCheck } from "lucide-react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Post from "@/components/layout/Post";
import { notFound } from "next/navigation";
import TimeAgo from "javascript-time-ago";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type PageParams = {
  params: {
    owner: string;
    repo: string;
    id: number;
  };
};

export default async function Page({ params }: PageParams) {
  const [discussion, comments] = await getIssue(params.owner, params.repo, params.id);
  const timeAgo = new TimeAgo("en-US");

  const UserAvatar = () => (
    <Avatar className="w-4 h-4 translate-y-1">
      <AvatarImage src={discussion.user?.avatar_url} />
      <AvatarFallback className="bg-gray-400 text-gray-50 text-[8px]">
        {discussion.user?.login[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );

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
            <UserAvatar />
            {discussion.user?.login} asked this question {timeAgo.format(new Date(discussion.created_at))} in{" "}
            {discussion.category.name}
          </p>
        ) : (
          <p className="flex gap-1 flex-nowrap text-gray-400">
            <UserAvatar />
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

async function getIssue(
  owner: string,
  repo: string,
  issueNumber: number
): Promise<[GitHubDiscussion, GitHubComment[]]> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/discussions/${issueNumber}`);
    if (!response.ok) notFound();
    const discussion: GitHubDiscussion = await response.json();

    const responseComments = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/discussions/${issueNumber}/comments`
    );
    if (!responseComments.ok) notFound();
    const comments: GitHubComment[] = await responseComments.json();

    return [discussion, comments];
  } catch {
    notFound();
  }
}
