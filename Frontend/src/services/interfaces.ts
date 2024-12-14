export interface Response {
  numberOfTopics?: number;
  group?: Groups;
  isOwner?: object;
  numberOfMembers?: number;
  findTopics: Topics[];
  members: Members[];
}

export interface Groups {
  administrator: administrator;
  id: number;
  is_private: boolean;
  moderators: moderators[];
  name: string;
  topics: Topics[];
  isMember?: boolean;
  avatar: avatar;
  members: Members[];
}

export interface Members {
  id: string;
  name: string;
  avatar: avatar;
}
interface moderators {
  id: number;
  name: string;
  avatar: avatar;
}

interface administrator {
  id: number;
  name: string;
  avatar: avatar;
}

export interface Topics {
  id: number;
  name: string;
  is_closed?: boolean;
  comments: comments[];
}

export interface comments {
  author: author;
  body: string;
  id?: number;
  createdAt?: Date | number;
  commentLikes: commentLikes[];
}

interface commentLikes {
  author_id: number;
  comment_id: number;
  like: boolean;
}

interface author {
  id: number;
  name: string;
  user_avatar_id?: string;
  avatar?: avatar;
}
interface avatar {
  path: string | null;
}

export interface notification {
  id: number;
  type: string;
  sender_id: number;
  sender_name: string;
  group_id: number;
  group_name: string;
  topic_id: number;
  topic_name: string;
  receiver_id: number;
  receiver_name: string;
  viewed: boolean;
  comment_id?: string;
}
