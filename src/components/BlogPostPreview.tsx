import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { Post } from "@prisma/client";

/**
 * DayJS is a tiny library (2kb) that can format dates nicely.
 * To extend it with the fromNow function
 * (date -> str, i.e. myDate -> "[n] hours ago"),
 * we need to extend DayJS with the relativeTime plugin.
 */
dayjs.extend(relativeTime);

type BlogPostPreviewProps = {
  post: Post;
};

/**
 * Display the post's title, a bit of its content and a link to read more.
 */
export default async function BlogPostPreview({ post }: BlogPostPreviewProps) {
  return (
    <div className="bg-stone-200">
      <h5 className="text-md font-bold">{post.title}</h5>
      <p className="text-sm font-light italic">{`${dayjs(post.createdAt).fromNow()}`}</p>
      <p>Read more [Not implemented]</p>
    </div>
  );
}
