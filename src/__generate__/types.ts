export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Author = {
  __typename?: 'Author';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type CreatePostInput = {
  authorId: Scalars['ID']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  published: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};

export type CreatePostResponse = {
  __typename?: 'CreatePostResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  post?: Maybe<Post>;
  success: Scalars['Boolean']['output'];
};

export type DeletePostResponse = {
  __typename?: 'DeletePostResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: CreatePostResponse;
  deletePost: DeletePostResponse;
  updatePost: UpdatePostResponse;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['ID']['input'];
  input: UpdatePostInput;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<Author>;
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  published: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  post?: Maybe<Post>;
  posts: Array<Post>;
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};

export type UpdatePostInput = {
  authorId?: InputMaybe<Scalars['ID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostResponse = {
  __typename?: 'UpdatePostResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  post?: Maybe<Post>;
  success: Scalars['Boolean']['output'];
};

export type GetAllPostQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, title: string, content?: string | null, published: boolean, author?: { __typename?: 'Author', id: string, name?: string | null, email: string } | null }> };

export type DeletePostMutationVariables = Exact<{
  deletePostId: Scalars['ID']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'DeletePostResponse', code: number, success: boolean, message: string } };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'CreatePostResponse', code: number, success: boolean, message: string, post?: { __typename?: 'Post', id: string, title: string, content?: string | null, published: boolean, author?: { __typename?: 'Author', id: string, name?: string | null, email: string } | null } | null } };

export type PostQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', title: string, published: boolean, id: string, content?: string | null, author?: { __typename?: 'Author', id: string, name?: string | null, email: string } | null } | null };

export type GetPostToUpdateQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPostToUpdateQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, title: string, content?: string | null, published: boolean, author?: { __typename?: 'Author', id: string } | null } | null };

export type UpdatePostMutationVariables = Exact<{
  updatePostId: Scalars['ID']['input'];
  input: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'UpdatePostResponse', code: number, success: boolean, message: string, post?: { __typename?: 'Post', id: string, title: string, content?: string | null, published: boolean } | null } };
