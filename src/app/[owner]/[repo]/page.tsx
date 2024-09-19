import ListTable from "@/components/layout/ListTable";
import Navigation from "@/components/layout/Navigation";
import PageContent from "@/components/layout/PageContent";
import RepositorySubNavigation from "@/components/layout/RepositorySubNavigation";
import { GitHubRepository, GitHubRepoTree } from "@/lib/types";
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
  const [repository, tree] = await getRepository(params.owner, params.repo);

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
    <>
      <Navigation
        repository={repository}
        subnavigation={
          repository && (
            <RepositorySubNavigation
              repositoryURL={repository.full_name}
              activeTab="code"
              hasIssues={repository.has_issues}
              hasDiscussions={repository.has_discussions}
            />
          )
        }
      />
      <PageContent>
        {repository ? (
          <ListTable items={fileList} />
        ) : (
          <div className="flex justify-center text-2xl text-center font-black font-mono pt-16">
            The Repository {params.owner}/{params.repo} does not exits.
          </div>
        )}
      </PageContent>
    </>
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

async function getRepository(
  owner: string,
  repo: string
): Promise<[GitHubRepository | undefined, GitHubRepoTree | undefined]> {
  const octokit = new Octokit({});

  try {
    const repository = await octokit.request("GET /repos/{owner}/{repo}", {
      owner: owner,
      repo: repo,
    });

    const tree = await octokit.request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
      owner: owner,
      repo: repo,
      tree_sha: repository.data.default_branch,
    });

    return [repository.data, tree.data];
  } catch {
    return [undefined, undefined];
  }
}
