"use server";

import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";

/**
 * A server action used in a client component must be
 * defined in its own file with the "use server" marking.
 * revalidatePath() must be used in a server action.
 */
export async function revalidatePathServerAction(path: string) {
  revalidatePath(path);
}

export async function deletePost(postId: string) {
  "use server";
  const post = await api.post.getById.query({ id: postId });
  console.log("Post with id " + postId + ": " + post)
  return api.post.delete.mutate({ id: postId });
}