import { Prisma } from "@prisma/client";

import { db } from "~/server/db";
import type { Post } from "@prisma/client";

type BlogPostPreviewProps = {
  post: Post;
};

export default async function BlogPostPreview({
  post,
}: BlogPostPreviewProps) {
  function fmtDate(date: Date): string {
    return `${date.toLocaleString()}`;
  }

  return <div className="bg-stone-200">
    <h5 className="text-md font-bold">{post.title}</h5>
    <p className="text-sm font-light italic">{fmtDate(post.createdAt)}</p>
  </div>
}
