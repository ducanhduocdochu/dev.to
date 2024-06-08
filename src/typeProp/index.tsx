export interface TagType {
  id: number;
  name: string;
  color: string;
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

export interface PostTypeTab extends PostType {
  
}

export interface PostTypeBody extends PostType{
  tags: TagPostType[]
}

export interface PostTypeDetail extends PostType{
  tags: TagPostType[]
  // comments: CommentType[]
  reactions: ReactionType[]
  saves: SaveType[]
}

export interface ReactionType {
  id: number;
  userId: string;
  postId: string;
  reactTypeId: string;
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

export interface CommentType {
  id: number;
  content: string;
  createdAt: Date;
  postId: number;
  userId: string;
  parentId?: number;
}

export interface SaveType {
  id: number;
  userId: string;
  postId: number;
}
