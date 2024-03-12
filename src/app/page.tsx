import React from "react";

import BlogPostPreview from "~/components/BlogPostPreview";
import { api } from "~/trpc/server";

export default async function Home() {
  const posts = await api.post.getAll.query();

  return (
    <div className="space-y-4">
      {posts?.map((post, i) => (
        <React.Fragment key={i}>
          <BlogPostPreview post={post} />
          {i < posts.length ? <hr /> : <></>}
        </React.Fragment>
      ))}
    </div>
  );
}
