import { Endpoints } from "@octokit/types";

type GitHubRepository = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];

type GitHubRepoTree = Endpoints["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"]["response"]["data"];

type GitHubIssue = Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"][0];

type GitHubComment = Endpoints["GET /repos/{owner}/{repo}/issues/comments"]["response"]["data"][0];

type GitHubReactions = GitHubComment["reactions"];

type GitHubUser = GitHubComment["user"];

type GitHubAuthorAssociation = GitHubComment["author_association"];

type GitHubDiscussion = {
  repository_url: string;
  category: GitHubDiscussionCategory;
  answer_html_url: null | string;
  answer_chosen_at: string | null;
  answer_chosen_by: GitHubUser | null;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: GitHubUser;
  labels: string[];
  state: State;
  state_reason: null;
  locked: boolean;
  comments: number;
  created_at: string;
  updated_at: string;
  author_association: GitHubAuthorAssociation;
  active_lock_reason: null;
  body: string;
  reactions: GitHubReactions;
  timeline_url: string;
};

type GitHubDiscussionCategory = {
  id: number;
  node_id: string;
  repository_id: number;
  emoji: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  slug: string;
  is_answerable: boolean;
};
