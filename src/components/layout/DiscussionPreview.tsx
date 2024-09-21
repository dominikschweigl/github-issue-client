import { GitHubDiscussion } from "@/lib/types";
import TimeAgo from "javascript-time-ago";
import { CircleCheck, MessageSquare } from "lucide-react";
import Link from "next/link";
import React from "react";
import { UserAvatar } from "./UserAvatar";

type DiscussionPreviewProps = {
  repoName: string;
  discussion: GitHubDiscussion;
};

export default function DiscussionPreview({ repoName, discussion }: DiscussionPreviewProps) {
  const timeAgo = new TimeAgo("en-US");

  const emojis = new Map<string, string>([
    [":rocket:", "🚀"],
    [":thought_balloon:", "💭"],
    [":pray:", "🙏"],
    [":sparkling_heart:", "💖"],
    [":ship:", "🚢"],
    [":raised_hands:", "🙌"],
    ["ballot_box", "🗳️"],
  ]);

  return (
    <div className="flex justify-between py-1">
      <div className="flex flex-nowrap gap-3">
        <div className="h-11 w-11 text-center content-center bg-slate-800 border rounded-md">
          {emojis.get(discussion.category.emoji) || "❔"}
        </div>
        <div className="flex flex-col gap-1">
          <Link
            href={`/${repoName}/discussions/${discussion.number}`}
            className="font-semibold text-[16px] hover:underline underline-offset-4"
          >
            {discussion.title}
          </Link>
          {discussion.category.is_answerable ? (
            <p className="flex gap-1 flex-nowrap text-xs text-gray-400">
              <UserAvatar user={discussion.user} className="w-3 h-3 translate-y-0.5" />
              {discussion.user?.login} asked {timeAgo.format(new Date(discussion.created_at))} in{" "}
              {discussion.category.name} •{" "}
              <span className={discussion.answer_chosen_at != null ? "text-green-500" : ""}>
                {discussion.answer_chosen_at != null ? "Answered" : "Unanswered"}
              </span>
            </p>
          ) : (
            <p className="flex gap-1 flex-nowrap text-xs text-gray-400">
              <UserAvatar user={discussion.user} className="w-3 h-3 translate-y-0.5" />
              {discussion.user?.login} started {timeAgo.format(new Date(discussion.created_at))} in{" "}
              {discussion.category.name}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 flex-nowrap text-gray-400">
        {discussion.category.is_answerable ? (
          <CircleCheck
            className={`h-4 w-4 ${discussion.answer_chosen_at !== null ? "text-green-500" : ""}`}
          />
        ) : (
          <MessageSquare className="h-4 w-4" />
        )}
        <p className="min-w-5 text-end text-sm">{discussion.comments}</p>
      </div>
    </div>
  );
}
