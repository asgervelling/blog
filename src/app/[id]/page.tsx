import Link from "next/link";
import { notFound } from "next/navigation";

import { api } from "~/trpc/server";

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
        <Link href="/" className="text-blue-800 underline hover:text-blue-500">
          Back to posts
        </Link>
      </div>
    </div>
  );
}
