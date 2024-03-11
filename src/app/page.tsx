import { unstable_noStore as noStore } from "next/cache";
import BlogPostPreview from "~/components/BlogPostPreview";

import { api } from "~/trpc/server";

export default async function Home() {
  noStore();
  const posts = await api.post.getAll.query();
  console.log(`Fetched ${posts.length} posts`);

  return (
    <>
      {posts &&
        posts.map((post, i) => (
          <BlogPostPreview key={i} post={post} />
        ))}
    </>
  );
}

// async function CrudShowcase() {
//   const latestPost = await api.post.getLatest.query();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
