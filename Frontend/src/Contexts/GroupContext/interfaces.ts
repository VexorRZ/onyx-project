import { type ReactElement } from "react";

export interface Groups {
  administrator: administrator;
  length: number;
  id: number;
  is_private: boolean;
  members: members[];
  moderators: moderators[];
  name: string;
  topics: topics[];
  avatar: avatar;
  navigateAvailable?: boolean;
  bans?: bans[];
  requesters?: requesters[];
}

interface avatar {
  id: string;
  path: string;
}
export interface members {
  id: number;
  name: string;
  avatar: avatar;
  group_as_member: GroupAsMember;
  permitted_to_add_in_groups: boolean;
  surname: string;
}

interface GroupAsMember {
  id: number;
  createdAt: Date;
}

interface moderators {
  id: number;
  name: string;
}

interface administrator {
  id: number;
  name: string;
}

interface bans {
  id: number;
  banned_id: number;
}

interface requesters {
  id: number;
  requester_id: number;
}

export interface topics {
  id: number;
  name: string;
  is_closed?: boolean;
  comments: comments[];
}
export interface comments {
  author: author;
  body: string;
  id: number;
  createdAt?: Date;
  likes: likes[];
}

export interface likes {
  id: number;
  author_id: number;
  comment_id: number;
}

interface author {
  id: number;
  name: string;
}
export interface ReducerAction {
  type: string;
  payload?: Groups;
}

export interface ChildrenType {
  children?: ReactElement | ReactElement[];
}
