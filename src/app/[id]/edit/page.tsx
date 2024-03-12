"use client";
import { CreatePostForm } from "~/components/CreatePostForm";
import PostSkeleton from "~/components/PostSkeleton";
import { api } from "~/trpc/react";

type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  const postQuery = api.post.getById.useQuery(params);
  const post = postQuery.data;

  if (!post) return <PostSkeleton />;

  return (
    <CreatePostForm post={post} />
  );
}
