import { type ReactElement } from "react";
export interface GroupTopic {
  topic: TopicData;
  totalCount?: number;
  comments: comments[];
  members: Members[];
}

export interface Members {
  id: number;
  name: string;
}

export interface TopicData {
  id: number;
  name: string;
  topics: Topics[];
  members: Members[];
}

interface Topics {
  id: number;
  name: string;
  author: Author;
  comments: comments[];
}

interface Author {
  id: number;
  name: string;
}

export interface comments {
  author: author;
  body: string;
  id: number;
  createdAt?: Date;
  commentLikes: commentLikes[];
}

export interface Publication {
  body: string;
}

interface author {
  id: number;
  name: string;
  avatar: avatar;
}

interface avatar {
  id?: string;
  path: string;
}
export interface commentLikes {
  id: number;
  author_id: number;
  comment_id: number;
}

// interface CommentAuthor {
//   id: number;
//   name: string;
// }

export interface ReducerAction {
  type: string;
  payload?: TopicData;
}

export interface ChildrenType {
  children?: ReactElement | ReactElement[];
}
