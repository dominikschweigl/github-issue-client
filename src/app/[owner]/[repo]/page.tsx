import ListTable from "@/components/layout/ListTable";
import { GitHubRepoTree } from "@/lib/types";
import { Octokit } from "octokit";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { File, Folder } from "lucide-react";
import React from "react";

type PageParams = {
  params: {
    owner: string;
    repo: string;
  };
};

export default async function Page({ params }: PageParams) {
  const tree = await getTree(params.owner, params.repo);

  const fileList = tree?.tree
    .sort((a, b) => a.type?.localeCompare(b.type || "") || -1)
    .reverse()
    .map((item, index) => (
      <div key={index} className={`flex items-center gap-3 flex-nowrap text-sm`}>
        <ItemIcon type={item.type} />
        {item.path}
      </div>
    ));

  return <ListTable items={fileList} />;
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

async function getTree(owner: string, repo: string): Promise<GitHubRepoTree> {
  const octokit = new Octokit({});

  const repository = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: owner,
    repo: repo,
  });

  const tree = await octokit.request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
    owner: owner,
    repo: repo,
    tree_sha: repository.data.default_branch,
  });

  return tree.data;
}
