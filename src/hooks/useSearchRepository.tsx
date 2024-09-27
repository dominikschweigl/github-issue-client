import { GitHubRepoSearch } from "@/lib/types";
import { Octokit } from "octokit";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { toast } from "sonner";
import { CircleX } from "lucide-react";

type UseSearchRepositoryResult = {
  query: string;
  handleSearch: (s: string) => void;
  searchResult: GitHubRepoSearch | null;
  loading: boolean;
};

export default function useSearchRepository(): UseSearchRepositoryResult {
  const [query, setQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<GitHubRepoSearch | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const debouncedQuery = useDebounce(query, 300);

  const handleSearch = (s: string) => {
    setQuery(s);
  };

  const displayToast = (e: string) =>
    toast(e, {
      description: "The search will be retried in a short moment.",
      icon: <CircleX color="red" />,
      className: "gap-4",
    });

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();

    searchRepository(debouncedQuery, controller, displayToast).then((search) => {
      if (search) {
        setSearchResult(search);
        setLoading(false);
      }
    });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  return {
    query: query,
    handleSearch: handleSearch,
    searchResult: searchResult,
    loading: loading,
  };
}

async function searchRepository(
  query: string,
  controller: AbortController,
  onError: (e: string) => void
): Promise<GitHubRepoSearch | undefined> {
  try {
    const octokit = new Octokit({
      log: { error: onError, warn: onError, info: console.log, debug: console.log },
    });

    const search = await octokit.request("GET /search/repositories", {
      q: query || "stars:>1",
      sort: "stars",
      request: {
        signal: controller.signal,
      },
    });

    return search.data;
  } catch {
    /*catches abort error, others are caught by octokit logger */
  }
}
