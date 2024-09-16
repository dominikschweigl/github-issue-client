import { Endpoints } from "@octokit/types";

export type GitHubRepository = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];

export type GitHubRepoTree = Endpoints["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"]["response"]["data"];

export type GitHubIssues = Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"];

export enum GitHubStatusCodes {
  OK = 200,
  MOVED_PERMANTENTLY = 301,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}
