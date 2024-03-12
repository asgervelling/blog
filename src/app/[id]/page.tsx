"use client";
import Link from "next/link";
import PostControls from "~/components/PostControls";
import PostSkeleton from "~/components/PostSkeleton";

import { api } from "~/trpc/react";

type PageProps = {
  params: { id: string };
};

/**
 * A page where a user can read a full post.
 */
export default function Page({ params }: PageProps) {
  const postQuery = api.post.getById.useQuery(params);
  const post = postQuery.data;

  if (!post) return <PostSkeleton />;

  return (
    <div>
      <div className="flex justify-end">
        <PostControls post={post} />
      </div>
      <h1 className="text-4xl">{post.title}</h1>
      <Paragraphs text={post.content} />
      <div className="pt-8">
        <Link href="/" className="text-blue-800 underline hover:text-blue-500">
          Back to posts
        </Link>
      </div>
    </div>
  );
}

/**
 * Create paragraphs by splitting `text` on newlines.
 */
function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((paragraph, i) => (
        <p key={i} className="pt-4">{paragraph}</p>
      ))}
    </>
  );
}
