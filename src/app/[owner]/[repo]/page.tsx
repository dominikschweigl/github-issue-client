import ListTable from "@/components/layout/ListTable";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { File, Folder } from "lucide-react";
import React from "react";
import parse from "html-react-parser";
import { getRepositoryReadme } from "@/lib/gitHub/getRepositoryReadme";
import { getRepositoryTree } from "@/lib/gitHub/getRepositoryTree";

type PageParams = {
  params: {
    owner: string;
    repo: string;
  };
};

export default async function Page({ params }: PageParams) {
  const tree = await getRepositoryTree(params.owner, params.repo);
  const readme = await getRepositoryReadme(params.owner, params.repo);

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
