export interface TagType {
  id: number;
  name: string;
  color: string;
}

export interface NotificationType {
  id: number;
  senderId: string;
  receivedId: string;
  message: string;
  seen: boolean;
}

export interface CommentType {
  id: number;
  content: string;
  createdAt: Date;
  postId: number;
  userId: string;
  parentId: number | null;
  reactions: ReactionCommentType[];
}

export interface CommentType2 {
  id: number;
  content: string;
  createdAt: Date;
  postId: number;
  userId: string;
  parentId: number | null;
  reactions: ReactionCommentType[];
  childrens: CommentType[];
}

export interface ReactionCommentType {
  id: number;
  userId: string;
  commentId: number;
}

export interface TagPostType {
  postId: number;
  tagId: number;
}

export interface PostType {
  id: number;
  title: string;
  content: string;
  readingTime: number;
  picturePost: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
}

export interface UserType {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
}


export interface PostTypeBody extends PostType {
  tags: TagPostType[];
  comments: CommentType[];
  _count: {
    comments: number;
    reactions: number;
  };
}

export interface PostTypeDetail extends PostType {
  tags: TagPostType[];
  comments: CommentType[]
  reactions: ReactionType[];
  saves: SaveType[];
}

export interface PostTypeDetail2 extends PostType {
  tags: TagPostType[];
  comments: CommentType2[]
  reactions: ReactionType[];
  saves: SaveType[];
}

export interface ReactionType {
  id: number;
  userId: string;
  postId: number;
  reactTypeId: number;
}

export interface HeartReactionType {
  id: number;
  userId: string;
  postId: number;
}

export interface UnicornReactionType {
  id: number;
  userId: string;
  postId: number;
}

export interface ExplodingReactionType {
  id: number;
  userId: string;
  postId: number;
}

export interface RaisehandReactionType {
  id: number;
  userId: string;
  postId: number;
}

export interface FireReactionType {
  id: number;
  userId: string;
  postId: number;
}

export interface SaveType {
  userId: string;
  postId: number;
}
