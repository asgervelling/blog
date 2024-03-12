import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { currentUser } from "@clerk/nextjs";

import type { Post } from "@prisma/client";
import type { User } from "@clerk/nextjs/server";
import { cn } from "~/lib/utils";
import Link from "next/link";

/**
 * DayJS is a tiny library (2kb) that can format dates nicely.
 * To extend it with the fromNow function
 * we need to extend DayJS with the relativeTime plugin.
 */
dayjs.extend(relativeTime);

type BlogPostPreviewProps = {
  post: Post;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Display the post's title, a bit of its content and a link to read more. \
 * As a user, if this post is `writtenByMe`, I can edit or delete it.
 */
export default async function BlogPostPreview({
  post,
  ...attrs
}: BlogPostPreviewProps) {
  const user = await currentUser();

  return (
    <div className={cn("rounded-sm bg-stone-100", attrs.className)} {...attrs}>
      {/* Use H2 as titles, as they are SEO-friendly when
          combined placed under an H1. Don't skip straight to H3. */}
      <h2 className="text-md font-bold capitalize">{post.title}</h2>
      <p className="text-sm font-light capitalize italic">{`${dayjs(post.createdAt).fromNow()}`}</p>
      <Link
        href={`/${post.id}`}
        className="text-blue-800 underline visited:text-purple-600 hover:text-blue-500"
      >
        Read more
      </Link>
      {isWrittenBy(user, post) ? <>Written by me</> : null}
      <p>ID: {post.id}</p>
    </div>
  );
}

/**
 * True if `user` is logged in, and `user`'s ID matches that of `post`.
 */
function isWrittenBy(user: User | null, post: Post): boolean {
  return user !== null && user.id === post.userId;
}
