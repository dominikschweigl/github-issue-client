import ListTable from "@/components/layout/ListTable";
import { GitHubRepoTree } from "@/lib/types";
import { Octokit } from "octokit";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { File, Folder } from "lucide-react";
import React from "react";
import parse from "html-react-parser";

type PageParams = {
  params: {
    owner: string;
    repo: string;
  };
};

export default async function Page({ params }: PageParams) {
  const [tree, readme] = await getTree(params.owner, params.repo);

  const readmeContent = parse(readme);

  const fileList = tree?.tree
    .sort((a, b) => a.type?.localeCompare(b.type || "") || -1)
    .reverse()
    .map((item, index) => (
      <div key={index} className={`flex items-center gap-3 flex-nowrap text-sm`}>
        <ItemIcon type={item.type} />
        {item.path}
      </div>
    ));

  return (
    <div className="flex flex-col gap-4">
      <ListTable items={fileList} emptyMessage="Empty Repository." />
      {readme && (
        <ListTable
          items={[
            <div key={1} className="px-4 py-2">
              {readmeContent}
            </div>,
          ]}
          head={<p className="font-medium">README.md</p>}
        />
      )}
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

async function getTree(owner: string, repo: string): Promise<[GitHubRepoTree, string]> {
  const octokit = new Octokit({});

  const repository = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: owner,
    repo: repo,
  });

  //wrong type in octokit due to header accept value
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const readme: any = await octokit.request("GET /repos/{owner}/{repo}/readme", {
    owner: owner,
    repo: repo,
    headers: {
      accept: "application/vnd.github.html+json",
    },
  });

  const tree = await octokit.request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
    owner: owner,
    repo: repo,
    tree_sha: repository.data.default_branch,
  });

  return [tree.data, readme.data];
}
