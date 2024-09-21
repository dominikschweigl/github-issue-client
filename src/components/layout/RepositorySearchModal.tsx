"use client";

import React, { ReactNode, useState } from "react";
import { UserAvatar } from "@/components/layout/UserAvatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandDialog,
} from "@/components/ui/command";
import Link from "next/link";
import useSearchRepository from "@/hooks/useSearchRepository";
import { LoadingSpinner } from "../ui/loadingspinner";

type RepositorySearchModalProps = {
  isDialog?: boolean;
  children?: ReactNode;
};

export default function RepositorySearchModal({ isDialog, children }: RepositorySearchModalProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { loading, query, handleSearch, searchResult } = useSearchRepository();

  const CommandWrapper = isDialog ? CommandDialog : Command;

  return (
    <>
      {isDialog && children !== undefined && <div onClick={() => setOpen((prev) => !prev)}>{children}</div>}
      <CommandWrapper
        open={open}
        onOpenChange={setOpen}
        shouldFilter={false}
        className="rounded-lg border shadow-md md:min-w-[450px]"
      >
        <CommandInput placeholder="Search for a Repository..." onValueChange={handleSearch} value={query} />
        <CommandList>
          {loading ? (
            <CommandEmpty>
              <LoadingSpinner className="mx-auto" />
            </CommandEmpty>
          ) : (
            <CommandEmpty>No repositories found.</CommandEmpty>
          )}

          <CommandGroup>
            {searchResult?.items.map((repo) => (
              <Link key={repo.id} href={`/${repo.full_name}`}>
                <CommandItem className="gap-3 cursor-pointer p-2">
                  <UserAvatar user={repo.owner} className="h-7 w-7" />
                  <div className="flex flex-col">
                    <p className="font-medium">{repo.full_name}</p>
                    <p className="text-gray-400 truncate max-w-[380px]">{repo.description}</p>
                  </div>
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandWrapper>
    </>
  );
}
