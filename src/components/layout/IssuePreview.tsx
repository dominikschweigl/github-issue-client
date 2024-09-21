import TimeAgo from "javascript-time-ago";
import { GitHubIssue } from "@/lib/types";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { CircleCheck, CircleDot, CircleSlash } from "lucide-react";
import React, { ReactNode } from "react";
import Link from "next/link";
import { UserAvatar } from "./UserAvatar";

type IssuePreviewProps = {
  repoName: string;
  issue: GitHubIssue;
};

export default function IssuePreview({ repoName, issue }: IssuePreviewProps) {
  const closed = issue.closed_at ? new Date(issue.closed_at) : new Date();
  const opened = issue.created_at ? new Date(issue.created_at) : new Date();
  const timeAgo = new TimeAgo("en-US");

  return (
    <div>
      <div className={`flex items-start gap-3 flex-nowrap text-sm`}>
        <IssueIcon state={issue.state} state_reason={issue.state_reason} />
        <div className="flex flex-col gap-1">
          <Link
            href={`/${repoName}/issues/${issue.number}`}
            className="font-semibold text-[16px] hover:underline underline-offset-4"
          >
            {issue.title}
          </Link>
          <div className="flex items-center gap-1 flex-nowrap text-xs text-gray-400">
            {issue.state === "open" && (
              <>
                <p>
                  #{issue.number} opened {timeAgo.format(opened)} by
                </p>
                <UserAvatar user={issue.user} className="w-3 h-3" />
                <p>{issue.user?.login}</p>
              </>
            )}
            {issue.state === "closed" && (
              <>
                <p>#{issue.number} by</p>
                <UserAvatar user={issue.user} className="w-3 h-3" />
                <p>
                  {issue.user?.login} was closed {timeAgo.format(closed)}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function IssueIcon({
  state,
  state_reason,
}: {
  state: string | undefined;
  state_reason: string | null | undefined;
}): ReactNode {
  const layout = "w-4 h-4 mt-[3px] shrink-0 ";
  if (state === "open") {
    return <CircleDot className={layout + "stroke-green-500"} />;
  } else if (state === "closed" && state_reason === "not_planned") {
    return <CircleSlash className={layout + "stroke-gray-500"} />;
  } else if (state === "closed") {
    return <CircleCheck className={layout + "stroke-purple-500"} />;
  } else {
    return <QuestionMarkIcon className={layout + "stroke-red-500"} />;
  }
}
