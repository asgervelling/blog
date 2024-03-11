import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import type { Post } from "@prisma/client";
import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/server";


/**
 * DayJS is a tiny library (2kb) that can format dates nicely.
 * To extend it with the fromNow function
 * we need to extend DayJS with the relativeTime plugin.
 */
dayjs.extend(relativeTime);

type BlogPostPreviewProps = {
  post: Post;
};

/**
 * Display the post's title, a bit of its content and a link to read more. \
 * As a user, if this post is `writtenByMe`, I can edit or delete it.
 */
export default async function BlogPostPreview({
  post,
}: BlogPostPreviewProps) {
  const user = await currentUser();
 
  return (
    <div className="rounded-sm bg-stone-200">
      <h5 className="text-md font-bold">{post.title}</h5>
      <p className="text-sm font-light italic">{`${dayjs(post.createdAt).fromNow()}`}</p>
      <p>Read more [Not implemented]</p>
      {isWrittenBy(user, post) ? <>Written by me</> : null}
    </div>
  );
}

/**
 * True if `user` is logged in, and `user`'s ID matches that of `post`.
 */
function isWrittenBy(user: User | null, post: Post): boolean {
  return user !== null && user.id === post.userId;
}
