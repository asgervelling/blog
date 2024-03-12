import BlogPostPreview from "~/components/BlogPostPreview";
import { api } from "~/trpc/server";

export default async function Home() {
  const posts = await api.post.getAll.query();

  return (
    <div className="space-y-4">
      {posts?.map((post, i) => (
        <BlogPostPreview
          key={i}
          post={post}
          className={`${i === 0 ? "" : "border-t-[1px] border-t-stone-400"}`}
        />
      ))}
    </div>
  );
}
