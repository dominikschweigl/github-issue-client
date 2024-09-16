import { GitHubRepoTree } from "@/lib/types";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { File, Folder } from "lucide-react";
import React from "react";

type CodeTreeProps = {
  tree: GitHubRepoTree | undefined;
};

export default function CodeTree({ tree }: CodeTreeProps) {
  if (!tree || tree.tree.length === 0) return "empty repository";

  return (
    <div className="flex flex-col border rounded-lg overflow-clip">
      <div
        className={`
            h-10 bg-white bg-opacity-[3%]`}
      ></div>
      {tree.tree
        .sort((a, b) => a.type?.localeCompare(b.type || "") || -1)
        .reverse()
        .map((item, index) => (
          <div
            key={index}
            className={`${
              index < tree.tree.length ? "border-t" : ""
            } py-2.5 px-4 flex items-center gap-3 flex-nowrap text-sm`}
          >
            <ItemIcon type={item.type} />
            {item.path}
          </div>
        ))}
    </div>
  );
}

function ItemIcon({ type }: { type: string | undefined }) {
  if (type === "tree") {
    return <Folder className="w-4 h-4" />;
  } else if (type === "blob") {
    return <File className="w-4 h-4" />;
  } else {
    return <QuestionMarkIcon className="w-4 h-4" />;
  }
}
