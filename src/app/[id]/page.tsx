import { notFound } from "next/navigation";

import { api } from "~/trpc/server";
import BlueLink from "~/components/BlueLink";

type PageProps = {
  params: { id: string };
};

/**
 * A page where a user can read a full post.
 */
export default async function Page({ params }: PageProps) {
  const post = await api.post?.getById.query(params);

  if (!post) return notFound();

  return (
    <div>
      <h1 className="text-4xl">{post.title}</h1>
      <p className="pt-4">{post.content}</p>
      <div className="pt-8">
        <BlueLink href="/">Back to posts</BlueLink>
      </div>
    </div>
  );
}
