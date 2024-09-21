import { GitHubRepoSearch } from "@/lib/types";
import { Octokit } from "octokit";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

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

  useEffect(() => {
    setLoading(true);
    searchRepository(debouncedQuery).then((res) => {
      setSearchResult(res);
      setLoading(false);
    });
  }, [debouncedQuery]);

  return {
    query: query,
    handleSearch: handleSearch,
    searchResult: searchResult,
    loading: loading,
  };
}

async function searchRepository(query: string): Promise<GitHubRepoSearch> {
  const octokit = new Octokit();

  const search = await octokit.request("GET /search/repositories", {
    q: query || "sort=stars",
  });

  return search.data;
}
