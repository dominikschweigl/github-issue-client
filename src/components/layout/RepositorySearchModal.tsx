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
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { Toaster } from "../ui/sonner";

type RepositorySearchModalProps = {
  isDialog?: boolean;
  children?: ReactNode;
};

export default function RepositorySearchModal({ isDialog, children }: RepositorySearchModalProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { loading, query, handleSearch, searchResult } = useSearchRepository();

  const CommandWrapper = isDialog ? CommandDialog : Command;
  const commandProps = isDialog ? { open: open, onOpenChange: setOpen } : {};
  return (
    <>
      {isDialog && children !== undefined && <div onClick={() => setOpen((prev) => !prev)}>{children}</div>}
      <CommandWrapper {...commandProps} className="rounded-lg border shadow-md w-full  max-w-[540px]">
        {isDialog && (
          <>
            <DialogTitle className="hidden">Repository Search</DialogTitle>
            <DialogDescription className="hidden">search for a repository</DialogDescription>
          </>
        )}
        <CommandInput placeholder="Search for a Repository..." onValueChange={handleSearch} value={query} />
        <CommandList>
          {loading ? (
            <CommandEmpty>
              <LoadingSpinner className="mx-auto" />
            </CommandEmpty>
          ) : (
            <>
              <CommandEmpty>No repositories found.</CommandEmpty>
              <CommandGroup>
                {searchResult?.items.map((repo) => (
                  <Link key={repo.id + `${isDialog}`} href={`/${repo.full_name}`}>
                    <CommandItem className="gap-3 cursor-pointer p-2 ">
                      <UserAvatar user={repo.owner} className="h-7 w-7" />
                      <div className="flex flex-col">
                        <p className="font-medium">{repo.full_name}</p>
                        <p className="text-gray-400 line-clamp-1">{repo.description}</p>
                      </div>
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandWrapper>
      <Toaster />
    </>
  );
}
