import BlogPostPreview from "~/components/BlogPostPreview";
import { api } from "~/trpc/server";

export default async function Home() {
  const posts = await api.post.getAll.query();

  return (
    <>{posts?.map((post, i) => <BlogPostPreview key={i} post={post} />)}</>
  );
}
