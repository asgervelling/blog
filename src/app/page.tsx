import { unstable_noStore as noStore } from "next/cache";

import BlogPostPreview from "~/components/BlogPostPreview";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();
  const posts = await api.post.getAll.query();

  return (
    <>{posts?.map((post, i) => <BlogPostPreview key={i} post={post} />)}</>
  );
}
