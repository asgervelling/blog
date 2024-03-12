import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { currentUser } from "@clerk/nextjs";

import type { Post } from "@prisma/client";
import type { User } from "@clerk/nextjs/server";
import Link from "next/link";

import PostControls from "./PostControls";

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
export default async function BlogPostPreview({ post }: BlogPostPreviewProps) {
  const user = await currentUser();

  return (
    <div>
      <div className="flex justify-between gap-4">
        <h2 className="text-md font-bold capitalize">{post.title}</h2>
        {isWrittenBy(user, post) && <PostControls post={post} />}
      </div>
      <p className="pb-2 text-xs font-light capitalize italic">{`${dayjs(post.createdAt).fromNow()}`}</p>
      <TextPreview text={post.content} />
      <Link
        href={`/${post.id}`}
        className="text-blue-800 underline visited:text-purple-600 hover:text-blue-500"
      >
        Read more
      </Link>
    </div>
  );
}

function TextPreview({ text }: { text: string }) {
  const minCharsForFade = 120;
  const maxChars = 180;
  const displayText = text.slice(0, maxChars);

  if (text.length > minCharsForFade) {
    return (
      <p className="bg-gradient-to-b from-black to-white bg-clip-text text-transparent">
        {displayText}
      </p>
    );
  } else {
    return <p>{displayText}</p>;
  }
}

/**
 * True if `user` is logged in, and `user`'s ID matches that of `post`.
 */
function isWrittenBy(user: User | null, post: Post): boolean {
  return user !== null && user.id === post.userId;
}
