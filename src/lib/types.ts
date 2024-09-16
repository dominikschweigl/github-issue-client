import { Endpoints } from "@octokit/types";

export type GitHubRepository = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];

export type GitHubRepoTree = Endpoints["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"]["response"]["data"];

export type GitHubIssues = Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"];
