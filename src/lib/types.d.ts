import { Endpoints } from "@octokit/types";

type GitHubRepository = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];

type GitHubRepoTree = Endpoints["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"]["response"]["data"];

type GitHubIssue = Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"][0];

type GitHubComment = Endpoints["GET /repos/{owner}/{repo}/issues/comments"]["response"]["data"][0];

type GitHubReactions = GitHubComment["reactions"];

type GitHubUser = GitHubComment["user"];

type GitHubAuthorAssociation = GitHubComment["author_association"];

type GitHubDiscussion = Endpoints["GET /teams/{team_id}/discussions"]["response"]["data"][0];
