import { Category, Comment, Post, User } from "@prisma/client";

export type PostWithCategories = Post & {
  categories: Category[];
};

export type PostWithCategoriesAndUser = Post & {
  categories: Category[];
  user: User;
};

export type PostWithCategoriesAndUserEssence = Post & {
  categories: Category[];
  user: UserEssence;
};

export type UserEssence = {
  username: string;
  image: string;
  name: string;
};

export type PostWithCategoriesAndUserEssenceAndCommentCount = Post & {
  categories: Category[];
  user: UserEssence;
  _count: {
    comments: number;
  };
};

export interface GetPostsResponse {
  posts: PostWithCategoriesAndUserEssenceAndCommentCount[];
  count: number;
}

export type CommentWithUser = Comment & {
  user: User;
};

export type CardListType =
  | "HOME"
  | "PROFILE"
  | "STORIES_PUBLISHED"
  | "STORIES_DRAFTS";

export type CardMode = "DASHBOARD" | "PUBLIC";
