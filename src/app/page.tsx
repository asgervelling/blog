import { unstable_noStore as noStore } from "next/cache";

import { CreatePost } from "~/components/create-post";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  const posts = await api.post.getAll.query();
  console.log(`Fetched ${posts.length} post${posts.length > 1 ? "s" : ""}`);

  return (
    <ul>
      {posts &&
        posts.map((post, i) => (
          <li key={i}>
            {post.name}, {post.createdAt.toLocaleDateString()}
          </li>
        ))}
    </ul>
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
